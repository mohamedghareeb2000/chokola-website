import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import {createClient} from 'next-sanity'

import {MENU_PRODUCTS} from '../src/data/menuProducts.js'
import {DEFAULT_SITE_CONTENT} from '../src/data/siteContent.js'

const DOCUMENT_TYPE = 'menuProduct'
const HOME_PAGE_DOCUMENT_TYPE = 'homePage'
const HOME_PAGE_DOCUMENT_ID = 'homePage'
const ARRAY_ITEM_TYPES = {
  'navigation.links': 'linkItem',
  'hero.highlights': 'heroHighlight',
  'hero.slides': 'heroSlide',
  'menu.categories': 'menuCategoryMeta',
  'about.highlights': 'aboutHighlight',
  'contact.cards': 'contactCard',
  'footer.socialLinks': 'socialLink',
  'footer.contactItems': 'contactCard',
  'footer.hours': 'footerHours',
}

function loadEnvFile(filePath) {
  const envPath = resolve(process.cwd(), filePath)
  const contents = readFileSync(envPath, 'utf8')

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmed.indexOf('=')

    if (separatorIndex === -1) {
      continue
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    const rawValue = trimmed.slice(separatorIndex + 1).trim()
    const value = rawValue.replace(/^["']|["']$/g, '')

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

function normalizeKeyPart(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function productKey(product) {
  return [product.category, product.title].map(normalizeKeyPart).join('__')
}

function legacyProductKey(product) {
  return `${product.category}::${product.title}`.toLowerCase()
}

function toSanityFields(product) {
  return {
    sourceKey: productKey(product),
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    featured: Boolean(product.featured),
    order: product.order,
  }
}

function toArrayKey(item, index) {
  if (item && typeof item === 'object') {
    return normalizeKeyPart(item.id || item.label || item.name || item.term || item.value || index)
  }

  return normalizeKeyPart(item || index)
}

function prepareSanityValue(value, path = []) {
  if (Array.isArray(value)) {
    const itemType = ARRAY_ITEM_TYPES[path.join('.')]

    return value.map((item, index) => {
      const preparedItem = prepareSanityValue(item, path)

      if (!itemType || !preparedItem || typeof preparedItem !== 'object') {
        return preparedItem
      }

      return {
        _key: toArrayKey(item, index),
        _type: itemType,
        ...preparedItem,
      }
    })
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, itemValue]) => [key, prepareSanityValue(itemValue, [...path, key])]),
    )
  }

  return value
}

loadEnvFile('.env.local')

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_WRITE_TOKEN in .env.local',
  )
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-06',
  useCdn: false,
})

async function seedMenuProducts() {
  const existingProducts = await client.fetch(/* groq */ `
    *[_type == $type] {
      _id,
      sourceKey,
      title,
      category
    }
  `, {type: DOCUMENT_TYPE})

  const existingBySourceKey = new Map()
  const existingByLegacyKey = new Map()

  for (const existingProduct of existingProducts) {
    if (existingProduct.sourceKey) {
      existingBySourceKey.set(existingProduct.sourceKey, existingProduct)
    }

    existingByLegacyKey.set(legacyProductKey(existingProduct), existingProduct)
  }

  let transaction = client.transaction()
  let createdCount = 0
  let updatedCount = 0

  for (const product of MENU_PRODUCTS) {
    const document = toSanityFields(product)
    const existingProduct =
      existingBySourceKey.get(document.sourceKey) || existingByLegacyKey.get(legacyProductKey(product))

    if (existingProduct?._id) {
      transaction = transaction.patch(existingProduct._id, (patch) => patch.set(document))
      updatedCount += 1
    } else {
      transaction = transaction.create({
        _type: DOCUMENT_TYPE,
        ...document,
      })
      createdCount += 1
    }
  }

  await transaction.commit()

  console.log(`Seeded Sanity menu products. Created: ${createdCount}. Updated: ${updatedCount}.`)
}

async function seedHomePageContent() {
  await client.createOrReplace({
    _id: HOME_PAGE_DOCUMENT_ID,
    _type: HOME_PAGE_DOCUMENT_TYPE,
    title: 'Homepage Content',
    ...prepareSanityValue(DEFAULT_SITE_CONTENT),
  })

  console.log('Seeded Sanity homepage content.')
}

async function seedSanityContent() {
  await seedHomePageContent()
  await seedMenuProducts()
}

seedSanityContent().catch((error) => {
  console.error(`Failed to seed Sanity content: ${error.message}`)
  process.exit(1)
})

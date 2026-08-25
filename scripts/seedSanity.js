import {createReadStream, existsSync, readFileSync} from 'node:fs'
import {basename, resolve} from 'node:path'
import {createClient} from 'next-sanity'

import {MENU_PRODUCTS} from '../src/data/menuProducts.js'
import {DEFAULT_SITE_CONTENT} from '../src/data/siteContent.js'

const SITE_SETTINGS_DOCUMENT_ID = 'siteSettings'
const DEVELOPMENT_DATASET = 'development'

function loadEnvFile(filePath) {
  const envPath = resolve(process.cwd(), filePath)

  if (!existsSync(envPath)) {
    return
  }

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

function toArrayKey(value, fallback) {
  return normalizeKeyPart(value || fallback)
}

function publicPath(filePath) {
  return resolve(process.cwd(), 'public', filePath.replace(/^\//, ''))
}

function priceNumber(value) {
  const parsed = Number.parseFloat(String(value || '').replace(/[^0-9.]/g, ''))
  return Number.isFinite(parsed) ? parsed : 0
}

function productsForCategory(categoryName) {
  return MENU_PRODUCTS
    .filter((product) => product.category === categoryName)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((product, index) => ({
      _key: toArrayKey(product.title, index),
      _type: 'menuCategoryProduct',
      productName: product.title,
      shortDescription: product.description,
      price: priceNumber(product.price),
      order: product.order || index + 1,
      active: true,
    }))
}

function platformForSocial(label) {
  if (label === 'Twitter') return 'X'
  return label
}

loadEnvFile('.env.local')

const {apiVersion, dataset, projectId} = await import('../src/sanity/env.js')
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN in .env.local')
}

if (dataset !== DEVELOPMENT_DATASET) {
  throw new Error(`Refusing to seed "${dataset}". Set NEXT_PUBLIC_SANITY_DATASET=${DEVELOPMENT_DATASET}.`)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion,
  useCdn: false,
})

const uploadedImages = new Map()

async function imageField(filePath) {
  if (!filePath) return undefined

  const localPath = publicPath(filePath)

  if (!existsSync(localPath)) {
    return undefined
  }

  if (uploadedImages.has(localPath)) {
    return uploadedImages.get(localPath)
  }

  const filename = basename(localPath)
  const existingAsset = await client.fetch(
    /* groq */ `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`,
    {filename},
  )
  const asset =
    existingAsset ||
    (await client.assets.upload('image', createReadStream(localPath), {
      filename,
      source: {
        name: 'local-seed',
        id: `chokola-${filename}`,
      },
    }))
  const field = {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }

  uploadedImages.set(localPath, field)
  return field
}

async function siteSettingsDocument() {
  const {navigation, hero, about, menu, branch, contact, footer} = DEFAULT_SITE_CONTENT
  const phoneCard = contact.cards.find((card) => card.icon === 'phone') || contact.cards[0]
  const whatsappCard = contact.cards.find((card) => card.icon === 'messageCircle') || contact.cards[1]
  const locationCard = contact.cards.find((card) => card.icon === 'mapPin') || contact.cards[2]
  const footerPhone = footer.contactItems.find((item) => item.icon === 'phone') || footer.contactItems[0]
  const footerAddress = footer.contactItems.find((item) => item.icon === 'mapPin') || footer.contactItems[1]

  return {
    _id: SITE_SETTINGS_DOCUMENT_ID,
    _type: 'siteSettings',
    logo: await imageField(navigation.logo),
    logoAlt: navigation.logoAlt,
    navigationItems: navigation.links.map((item, index) => ({
      _key: toArrayKey(item.label, index),
      _type: 'navigationItem',
      label: item.label,
      link: item.href,
      order: index + 1,
      active: true,
    })),
    contactButtonLabel: navigation.contactCta.label,
    contactButtonLink: navigation.contactCta.href,
    subtitle: hero.eyebrow,
    titleLineOne: hero.titleLine1,
    titleLineTwo: hero.titleLine2,
    description: hero.description,
    heroImage: await imageField(hero.image),
    heroImageAlt: hero.imageAlt,
    primaryCta: {
      _type: 'ctaLink',
      label: hero.primaryCta.label,
      link: hero.primaryCta.href,
    },
    secondaryCta: {
      _type: 'ctaLink',
      label: hero.secondaryCta.label,
      link: hero.secondaryCta.href,
    },
    heroStatistics: hero.highlights.map((item, index) => ({
      _key: toArrayKey(item.label, index),
      _type: 'heroStatistic',
      label: item.label,
      value: item.value,
      type: item.icon === 'star' ? 'rating' : item.icon === 'none' ? 'badge' : 'number',
      order: index + 1,
      active: true,
    })),
    aboutTitle: about.title,
    aboutDescription: about.paragraphs.join('\n\n'),
    largeImage: await imageField(about.mainImage),
    largeImageAlt: about.mainImageAlt,
    smallImage: await imageField(about.secondaryImage),
    smallImageAlt: about.secondaryImageAlt,
    smallImageCaption: about.secondaryImageCaption,
    aboutFeatures: about.highlights.map((item, index) => ({
      _key: toArrayKey(item.term, index),
      _type: 'aboutFeature',
      title: item.term,
      description: item.detail,
      order: index + 1,
      active: true,
    })),
    menuTitle: menu.title,
    menuSubtitle: menu.eyebrow,
    menuDescription: menu.description,
    branchImage: await imageField(branch.image),
    branchImageAlt: branch.imageAlt,
    branchTitle: branch.eyebrow,
    branchSubtitle: branch.name,
    branchDescription: branch.description,
    statusText: branch.openLabel,
    address: branch.address,
    locationDescription: branch.hoursLabel,
    phoneDisplay: branch.phone,
    phoneLink: phoneCard?.href || `tel:${branch.phone.replace(/\D/g, '')}`,
    directionsButtonLabel: branch.directionsLabel,
    directionsUrl: branch.mapsUrl,
    branchFeatures: branch.amenities.map((label, index) => ({
      _key: toArrayKey(label, index),
      _type: 'branchFeature',
      label,
      order: index + 1,
      active: true,
    })),
    contactTitle: contact.title,
    subtitleLineOne: contact.statementLine1,
    subtitleLineTwo: contact.statementLine2,
    contactDescription: contact.description,
    contactPhoneDisplay: phoneCard?.value || branch.phone,
    contactPhoneLink: phoneCard?.href || `tel:${branch.phone.replace(/\D/g, '')}`,
    whatsappDisplay: whatsappCard?.value || branch.phone,
    whatsappLink: whatsappCard?.href || `https://wa.me/${branch.phone.replace(/\D/g, '')}`,
    contactAddress: locationCard?.value || branch.address,
    contactReasons: contact.form.reasonOptions.map((label, index) => ({
      _key: toArrayKey(label, index),
      _type: 'contactReason',
      label,
      order: index + 1,
      active: true,
    })),
    footerLogo: await imageField(footer.logo),
    footerLogoAlt: footer.logoAlt,
    useNavigationLogo: true,
    footerDescription: footer.description,
    footerPhoneDisplay: footerPhone?.value || branch.phone,
    footerPhoneLink: footerPhone?.href || `tel:${branch.phone.replace(/\D/g, '')}`,
    footerAddress: footerAddress?.value || branch.address,
    copyrightText: footer.copyright,
    socialLinks: footer.socialLinks.map((item, index) => ({
      _key: toArrayKey(item.label, index),
      _type: 'socialLink',
      platform: platformForSocial(item.label),
      url: item.href,
      order: index + 1,
      active: true,
    })),
    footerInformationBlocks: footer.hours.map((item, index) => ({
      _key: toArrayKey(item.label, index),
      _type: 'footerInformationBlock',
      title: item.label,
      description: item.value,
      order: index + 1,
      active: true,
    })),
  }
}

async function seedSiteSettings() {
  await client.createOrReplace(await siteSettingsDocument())
  console.log('Seeded development Site Settings singleton.')
}

async function seedMenuCategories() {
  const existingCategories = await client.fetch(/* groq */ `
    *[_type == "menuCategory"] {
      _id,
      "slug": slug.current
    }
  `)
  const existingBySlug = new Map(existingCategories.map((category) => [category.slug, category]))

  let createdCount = 0
  let updatedCount = 0

  for (const [index, category] of DEFAULT_SITE_CONTENT.menu.categories.entries()) {
    const document = {
      _type: 'menuCategory',
      categoryName: category.name,
      slug: {
        _type: 'slug',
        current: category.id,
      },
      categoryImage: await imageField(category.image),
      categoryImageAlt: category.alt,
      imageDescription: category.description,
      order: index + 1,
      active: true,
      products: productsForCategory(category.name),
    }
    const existing = existingBySlug.get(category.id)

    if (existing?._id) {
      await client.patch(existing._id).set(document).commit()
      updatedCount += 1
    } else {
      await client.create(document)
      createdCount += 1
    }
  }

  console.log(`Seeded development Menu Categories. Created: ${createdCount}. Updated: ${updatedCount}.`)
}

async function seedSanityContent() {
  await seedSiteSettings()
  await seedMenuCategories()
}

seedSanityContent().catch((error) => {
  console.error(`Failed to seed Sanity development content: ${error.message}`)
  process.exit(1)
})

import ChokolaLandingPage from './HomePageClient'
import {buildMenuCategories, MENU_PRODUCTS} from '../data/menuProducts'
import {DEFAULT_SITE_CONTENT} from '../data/siteContent'
import {client} from '../sanity/lib/client'
import {normalizeMenuCategories, normalizeSiteSettings} from '../sanity/lib/normalizeContent'
import {ACTIVE_MENU_CATEGORIES_QUERY, SITE_SETTINGS_QUERY} from '../sanity/lib/queries'

export default async function Page() {
  let siteContent = DEFAULT_SITE_CONTENT
  let menuCategories = buildMenuCategories(MENU_PRODUCTS, siteContent.menu.categories)

  try {
    const [settings, categories] = await Promise.all([
      client.fetch(SITE_SETTINGS_QUERY),
      client.fetch(ACTIVE_MENU_CATEGORIES_QUERY),
    ])

    siteContent = normalizeSiteSettings(settings)
    menuCategories = categories?.length ? normalizeMenuCategories(categories) : menuCategories
  } catch (error) {
    siteContent = DEFAULT_SITE_CONTENT
  }

  return <ChokolaLandingPage menuCategories={menuCategories} siteContent={siteContent} />
}

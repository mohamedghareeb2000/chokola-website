import ChokolaLandingPage from './HomePageClient'
import {buildMenuCategories, MENU_PRODUCTS} from '../data/menuProducts'
import {DEFAULT_SITE_CONTENT} from '../data/siteContent'

export default function Page() {
  const siteContent = DEFAULT_SITE_CONTENT
  const menuCategories = buildMenuCategories(MENU_PRODUCTS, siteContent.menu.categories)

  return <ChokolaLandingPage menuCategories={menuCategories} siteContent={siteContent} />
}

import {menuCategory, menuCategoryProduct} from './menuCategory.jsx'
import {
  aboutFeature,
  branchFeature,
  contactReason,
  ctaLink,
  footerInformationBlock,
  heroStatistic,
  navigationItem,
  siteSettings,
  socialLink,
} from './siteSettings.jsx'

export const schema = {
  types: [
    siteSettings,
    navigationItem,
    ctaLink,
    heroStatistic,
    aboutFeature,
    branchFeature,
    contactReason,
    socialLink,
    footerInformationBlock,
    menuCategory,
    menuCategoryProduct,
  ],
}

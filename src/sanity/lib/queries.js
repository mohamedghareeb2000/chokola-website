import {defineQuery} from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings" && _type == "siteSettings"][0] {
    logo,
    logoAlt,
    "navigationItems": navigationItems[active == true] | order(order asc) {
      _key,
      label,
      link,
      order,
      active
    },
    contactButtonLabel,
    contactButtonLink,
    subtitle,
    titleLineOne,
    titleLineTwo,
    description,
    heroImage,
    heroImageAlt,
    primaryCta {
      label,
      link
    },
    secondaryCta {
      label,
      link
    },
    "heroStatistics": heroStatistics[active == true] | order(order asc)[0...3] {
      _key,
      label,
      value,
      type,
      order,
      active
    },
    aboutTitle,
    aboutDescription,
    largeImage,
    largeImageAlt,
    smallImage,
    smallImageAlt,
    smallImageCaption,
    "aboutFeatures": aboutFeatures[active == true] | order(order asc)[0...3] {
      _key,
      title,
      description,
      order,
      active
    },
    menuTitle,
    menuSubtitle,
    menuDescription,
    branchImage,
    branchImageAlt,
    branchTitle,
    branchSubtitle,
    branchDescription,
    statusText,
    address,
    locationDescription,
    phoneDisplay,
    phoneLink,
    directionsButtonLabel,
    directionsUrl,
    "branchFeatures": branchFeatures[active == true] | order(order asc)[0...4] {
      _key,
      label,
      order,
      active
    },
    contactTitle,
    subtitleLineOne,
    subtitleLineTwo,
    contactDescription,
    contactPhoneDisplay,
    contactPhoneLink,
    whatsappDisplay,
    whatsappLink,
    contactAddress,
    "contactReasons": contactReasons[active == true] | order(order asc) {
      _key,
      label,
      order,
      active
    },
    footerLogo,
    footerLogoAlt,
    useNavigationLogo,
    footerDescription,
    footerPhoneDisplay,
    footerPhoneLink,
    footerAddress,
    copyrightText,
    "socialLinks": socialLinks[active == true] | order(order asc)[0...5] {
      _key,
      platform,
      url,
      order,
      active
    },
    "footerInformationBlocks": footerInformationBlocks[active == true] | order(order asc)[0...2] {
      _key,
      title,
      description,
      order,
      active
    }
  }
`)

export const ACTIVE_MENU_CATEGORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "menuCategory" && active == true]
  | order(order asc, categoryName asc) {
    _id,
    categoryName,
    "slug": slug.current,
    categoryImage,
    categoryImageAlt,
    imageDescription,
    order,
    active,
    "products": products[active == true] | order(order asc, productName asc) {
      _key,
      productName,
      shortDescription,
      price,
      order,
      active
    }
  }
`)

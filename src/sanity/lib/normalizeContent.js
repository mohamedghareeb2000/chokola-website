import {DEFAULT_SITE_CONTENT} from '../../data/siteContent.js'
import {urlFor} from './image.js'

const STAT_ICON_BY_TYPE = {
  number: 'cupcake',
  rating: 'star',
  badge: 'none',
}

const SOCIAL_ICON_BY_PLATFORM = {
  Instagram: 'instagram',
  Facebook: 'facebook',
  X: 'x',
  TikTok: 'music2',
  WhatsApp: 'messageCircle',
}

function imageUrl(source, fallback, width = 1400) {
  if (!source?.asset?._ref) {
    return fallback
  }

  try {
    return urlFor(source)?.width(width).quality(90).url() || fallback
  } catch (error) {
    return fallback
  }
}

function splitParagraphs(value) {
  return String(value || '')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function formatPrice(value) {
  return typeof value === 'number' ? `$${value.toFixed(2)}` : value
}

function categoryFallback(name) {
  return DEFAULT_SITE_CONTENT.menu.categories.find((category) => category.name === name) || {}
}

export function normalizeSiteSettings(settings) {
  if (!settings) {
    return {}
  }

  const footerLogoSource = settings.useNavigationLogo ? settings.logo : settings.footerLogo
  const footerLogoAlt = settings.useNavigationLogo ? settings.logoAlt : settings.footerLogoAlt

  return {
    navigation: {
      logo: imageUrl(settings.logo, DEFAULT_SITE_CONTENT.navigation.logo, 500),
      logoAlt: settings.logoAlt,
      links: (settings.navigationItems || []).map((item) => ({
        _key: item._key,
        label: item.label,
        href: item.link,
      })),
      contactCta: {
        label: settings.contactButtonLabel,
        href: settings.contactButtonLink,
      },
    },
    hero: {
      eyebrow: settings.subtitle,
      titleLine1: settings.titleLineOne,
      titleLine2: settings.titleLineTwo,
      description: settings.description,
      primaryCta: {
        label: settings.primaryCta?.label,
        href: settings.primaryCta?.link,
      },
      secondaryCta: {
        label: settings.secondaryCta?.label,
        href: settings.secondaryCta?.link,
      },
      highlights: (settings.heroStatistics || []).map((stat) => ({
        _key: stat._key,
        label: stat.label,
        value: stat.value,
        icon: STAT_ICON_BY_TYPE[stat.type] || 'none',
      })),
      image: imageUrl(settings.heroImage, DEFAULT_SITE_CONTENT.hero.image, 1600),
      imageAlt: settings.heroImageAlt,
    },
    about: {
      title: settings.aboutTitle,
      paragraphs: splitParagraphs(settings.aboutDescription),
      highlights: (settings.aboutFeatures || []).map((feature) => ({
        _key: feature._key,
        term: feature.title,
        detail: feature.description,
      })),
      mainImage: imageUrl(settings.largeImage, DEFAULT_SITE_CONTENT.about.mainImage, 1600),
      mainImageAlt: settings.largeImageAlt,
      secondaryImage: imageUrl(settings.smallImage, DEFAULT_SITE_CONTENT.about.secondaryImage, 900),
      secondaryImageAlt: settings.smallImageAlt,
      secondaryImageCaption: settings.smallImageCaption,
    },
    menu: {
      title: settings.menuTitle,
      eyebrow: settings.menuSubtitle,
      description: settings.menuDescription,
    },
    branch: {
      eyebrow: settings.branchTitle,
      name: settings.branchSubtitle,
      description: settings.branchDescription,
      image: imageUrl(settings.branchImage, DEFAULT_SITE_CONTENT.branch.image, 1400),
      imageAlt: settings.branchImageAlt,
      address: settings.address,
      phone: settings.phoneDisplay,
      phoneLink: settings.phoneLink,
      hoursLabel: settings.locationDescription,
      mapsUrl: settings.directionsUrl,
      mapsAriaLabel: `Open ${settings.branchSubtitle || 'Chokola'} directions in Google Maps`,
      directionsLabel: settings.directionsButtonLabel,
      amenities: (settings.branchFeatures || []).map((feature) => feature.label),
      openLabel: settings.statusText,
      closedLabel: settings.statusText,
      opensAtMinutes: 0,
      closesAtMinutes: 1440,
    },
    contact: {
      title: settings.contactTitle,
      statementLine1: settings.subtitleLineOne,
      statementLine2: settings.subtitleLineTwo,
      description: settings.contactDescription,
      cards: [
        {
          label: 'Call / WhatsApp',
          value: settings.contactPhoneDisplay,
          href: settings.contactPhoneLink,
          icon: 'phone',
        },
        {
          label: 'WhatsApp',
          value: settings.whatsappDisplay,
          href: settings.whatsappLink,
          icon: 'messageCircle',
        },
        {
          label: 'Location',
          value: settings.contactAddress,
          icon: 'mapPin',
        },
      ],
      form: {
        reasonOptions: (settings.contactReasons || []).map((reason) => reason.label),
      },
    },
    footer: {
      logo: imageUrl(footerLogoSource, DEFAULT_SITE_CONTENT.footer.logo, 600),
      logoAlt: footerLogoAlt || DEFAULT_SITE_CONTENT.footer.logoAlt,
      description: settings.footerDescription,
      socialLinks: (settings.socialLinks || []).map((social) => ({
        _key: social._key,
        label: social.platform,
        href: social.url,
        icon: SOCIAL_ICON_BY_PLATFORM[social.platform] || 'instagram',
      })),
      contactItems: [
        {
          label: 'Phone',
          value: settings.footerPhoneDisplay,
          href: settings.footerPhoneLink,
          icon: 'phone',
        },
        {
          label: 'Location',
          value: settings.footerAddress,
          icon: 'mapPin',
        },
      ],
      hours: (settings.footerInformationBlocks || []).map((block) => ({
        _key: block._key,
        label: block.title,
        value: block.description,
      })),
      copyright: settings.copyrightText,
    },
  }
}

export function normalizeMenuCategories(categories = []) {
  return categories.map((category) => {
    const fallback = categoryFallback(category.categoryName)

    return {
      id: category.slug || category._id,
      name: category.categoryName,
      image: imageUrl(category.categoryImage, fallback.image, 1400),
      alt: category.categoryImageAlt || fallback.alt,
      description: category.imageDescription || fallback.description,
      products: (category.products || []).map((product) => ({
        _key: product._key,
        name: product.productName,
        title: product.productName,
        description: product.shortDescription,
        price: formatPrice(product.price),
        order: product.order,
      })),
    }
  })
}

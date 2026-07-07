import {defineQuery} from 'next-sanity'

export const MENU_PRODUCTS_QUERY = defineQuery(/* groq */ `
  *[_type == "menuProduct"]
  | order(category asc, order asc, title asc) {
    _id,
    sourceKey,
    "name": title,
    title,
    description,
    price,
    category,
    featured,
    order,
    image
  }
`)

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "homePage" && _type == "homePage"][0] {
    _id,
    title,
    brand {
      name,
      subtitle,
      primary,
      secondary,
      background,
      accent,
      cream,
      gold,
      muted
    },
    navigation {
      links[] {
        _key,
        label,
        href
      },
      contactCta {
        label,
        href
      }
    },
    hero {
      eyebrow,
      titleLine1,
      titleLine2,
      description,
      primaryCta {
        label,
        href
      },
      secondaryCta {
        label,
        href
      },
      highlights[] {
        _key,
        label,
        value,
        icon
      },
      image,
      imageAlt,
      scrollCta {
        label,
        href
      },
      slides[] {
        _key,
        name,
        price,
        image,
        alt
      }
    },
    menu {
      title,
      eyebrow,
      description,
      tabAriaLabel,
      selectedCategoryLabel,
      favoritesSuffix,
      categories[] {
        _key,
        id,
        name,
        image,
        alt
      }
    },
    about {
      title,
      paragraphs[],
      highlights[] {
        _key,
        term,
        detail
      },
      atmosphereLabel,
      mainImage,
      mainImageAlt,
      mainImageCaption,
      secondaryImage,
      secondaryImageAlt,
      secondaryImageCaption,
      calloutTitle,
      calloutText
    },
    branch {
      eyebrow,
      name,
      description,
      image,
      imageAlt,
      address,
      phone,
      hoursLabel,
      mapsUrl,
      mapsAriaLabel,
      directionsLabel,
      amenities[],
      openLabel,
      closedLabel,
      opensAtMinutes,
      closesAtMinutes
    },
    contact {
      title,
      statementLine1,
      statementLine2,
      description,
      cards[] {
        _key,
        label,
        value,
        href,
        icon
      },
      form {
        nameLabel,
        namePlaceholder,
        emailLabel,
        emailPlaceholder,
        phoneLabel,
        phonePlaceholder,
        countryCode,
        countryLabel,
        reasonLabel,
        reasonPlaceholder,
        messageLabel,
        messagePlaceholder,
        submitLabel,
        submittingLabel,
        requiredFieldText,
        loadingText,
        successText,
        errorText,
        reviewErrorText,
        reasonOptions[]
      }
    },
    footer {
      description,
      navigationTitle,
      contactTitle,
      hoursTitle,
      socialLinks[] {
        _key,
        label,
        href,
        icon
      },
      contactItems[] {
        _key,
        label,
        value,
        href,
        icon
      },
      hours[] {
        _key,
        label,
        value
      },
      copyright
    }
  }
`)

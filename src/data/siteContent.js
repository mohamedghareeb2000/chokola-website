import {MENU_CATEGORY_META} from './menuProducts.js'

export const DEFAULT_SITE_CONTENT = {
  brand: {
    name: 'Chokola',
    subtitle: 'Dessert Lounge',
    primary: '#E7B5BB',
    secondary: '#4A2E2B',
    background: '#FFF5F0',
    accent: '#B07A8D',
    cream: '#EAD9C8',
    gold: '#C9A86A',
    muted: '#4A2E2B',
  },
  navigation: {
    links: [
      {label: 'Home', href: '#home'},
      {label: 'About Us', href: '#about'},
      {label: 'Menu', href: '#menu'},
      {label: 'Branch', href: '#branch'},
    ],
    contactCta: {label: 'Contact Us', href: '#contact'},
  },
  hero: {
    eyebrow: '• Crafted Fresh Daily',
    titleLine1: 'Dessert,',
    titleLine2: 'after dark.',
    description:
      'Late-night cravings. Weekend treats. Sweet celebrations. At Chokola, every dessert is handcrafted fresh using premium ingredients, rich chocolate, and bold flavors that are made to impress, from the first look to the last bite.',
    primaryCta: {label: 'Explore Menu', href: '#menu'},
    secondaryCta: {label: 'Find a Branch', href: '#branch'},
    highlights: [
      {label: 'Signature Desserts', value: '30+', icon: 'cupcake'},
      {label: 'Guest Rating', value: '4.9', icon: 'star'},
      {label: 'Made Daily', value: 'Fresh', icon: 'none'},
    ],
    image: '/waffle-dessert-transparent.png',
    imageAlt: 'Chocolate and cream waffle dessert with chocolate pieces',
    scrollCta: {label: 'Discover More', href: '#about'},
    slides: [
      {
        name: 'Chocolate Strawberry Cake',
        price: '$8.40',
        image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?auto=format&fit=crop&w=1400&q=90',
        alt: 'Chocolate strawberry dessert with cream and sauce',
      },
      {
        name: 'Velvet Cream Desserts',
        price: '$7.90',
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1400&q=90',
        alt: 'Pink frosted dessert with cream and sprinkles',
      },
      {
        name: 'Berry Dessert Cup',
        price: '$6.80',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1400&q=90',
        alt: 'Berry dessert cup with creamy layers',
      },
      {
        name: 'Chocolate Cake Slice',
        price: '$9.20',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1400&q=90',
        alt: 'Chocolate cake slice with rich cocoa texture',
      },
    ],
  },
  menu: {
    title: 'What are you craving today?',
    eyebrow: 'Pick Your Craving',
    description: 'Browse Chokola favorites and find your next sweet obsession. Crepes, waffles, shakes, cups, cheesecake, and more - explore the sweets made to match your mood.',
    tabAriaLabel: 'Dessert menu categories',
    selectedCategoryLabel: 'Tap to Explore',
    favoritesSuffix: 'Chokola favorites from the lounge menu.',
    categories: MENU_CATEGORY_META.map((category) => {
      const descriptions = {
        'Crepes & Waffles': 'Warm, golden, chocolate-drizzled favorites topped with fresh strawberries and made to share.',
        'Waffle Sticks': 'Crispy waffle favorites made for dipping, sharing, and loading with rich chocolate.',
        Shakes: 'Thick, creamy, and loaded with flavor - made for every kind of craving.',
        Cups: 'Layered, rich, and made to dig into - from Dubai chocolate to triple chocolate favorites.',
        Cheesecake: 'Smooth, creamy cheesecake with sweet toppings and dessert-shop energy.',
      }
      const images = {
        'Crepes & Waffles': '/category-crepes-waffles.png',
        'Waffle Sticks': '/category-waffle-sticks.jpeg',
        Shakes: '/category-shakes.png',
        Cups: '/category-cups.png',
        Cheesecake: '/category-cheesecake.png',
      }

      return {
        ...category,
        description: descriptions[category.name],
        image: images[category.name] || category.image,
      }
    }),
  },
  about: {
    title: 'More Than Dessert.',
    paragraphs: [
      'Chokola is where rich flavors, handcrafted desserts, and unforgettable moments come together.',
      'From warm crepes and crispy waffles to creamy cheesecakes, signature shakes, and loaded dessert cups, every creation is made fresh with premium ingredients and finished with attention to every detail.',
      "Whether you're celebrating with friends, grabbing a late-night treat, or satisfying your sweet tooth, Chokola is your go-to dessert destination.",
      'Because every great memory deserves something sweet.',
    ],
    highlights: [
      {term: 'Premium Ingredients', detail: 'Only the finest chocolate, fresh fruit, premium dairy, and carefully selected ingredients.'},
      {term: 'Made Fresh Daily', detail: 'Every dessert is prepared fresh when you order for the best flavor and quality.'},
      {term: 'Beautifully Crafted', detail: 'Every drizzle, topping, and presentation is designed to look as good as it tastes.'},
    ],
    atmosphereLabel: 'Chokola dessert lounge atmosphere',
    mainImage: '/about-chef-crepe-wide.png',
    mainImageAlt: 'Chef finishing a strawberry chocolate crepe under warm lounge lighting',
    mainImageCaption: 'Every dessert begins with premium ingredients and ends with a masterpiece.',
    secondaryImage: '/about-crepe-plate.png',
    secondaryImageAlt: 'Chocolate-drizzled strawberry crepe served on a white plate',
    secondaryImageCaption: 'Our chefs carefully prepare every crepe, waffle, cheesecake, shake, and dessert cup to deliver the perfect balance of flavor, texture, and presentation.',
  },
  branch: {
    eyebrow: 'Our Branch',
    name: 'Chokola Dessert Lounge',
    description: 'Inside Beachwood Place Mall. Your new dessert spot in Beachwood, Ohio. Come for the cravings, stay for the vibe - Chokola is made for sweet hangouts, dessert dates, celebrations, and late-night treats worth sharing.',
    image: '/branch-storefront.png',
    imageAlt: 'Warm Chokola dessert lounge storefront and entrance',
    address: '26300 Cedar Road, Space 1035, Beachwood, OH 44122',
    phone: '+1 (216) 816-6399',
    hoursLabel: 'Inside Beachwood Place Mall',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=26300%20Cedar%20Road%20Space%201035%20Beachwood%20OH%2044122',
    mapsAriaLabel: 'Open Chokola Dessert Lounge directions in Google Maps',
    directionsLabel: 'Get Directions',
    amenities: ['Beachwood Place Mall', 'Sweet Hangouts', 'Dessert Dates', 'Celebrations'],
    openLabel: 'Open Now',
    closedLabel: 'Closed Now',
    opensAtMinutes: 600,
    closesAtMinutes: 1440,
  },
  contact: {
    title: 'Contact Us',
    statementLine1: 'Got a sweet plan?',
    statementLine2: "Let’s make it happen.",
    description:
      'Have a question, craving, event idea, or collab in mind? Reach out to Chokola and we’ll help make it extra sweet.',
    cards: [
      {label: 'Call / WhatsApp', value: '+1 (216) 816-6399', href: 'tel:+12168166399', icon: 'phone'},
      {label: 'WhatsApp', value: '+1 (216) 816-6399', href: 'https://wa.me/12168166399', icon: 'messageCircle'},
      {label: 'Location', value: 'Inside Beachwood Place Mall, 26300 Cedar Road, Space 1035, Beachwood, OH 44122', icon: 'mapPin'},
    ],
    form: {
      nameLabel: 'Name',
      namePlaceholder: 'Your Name',
      emailLabel: 'Email',
      emailPlaceholder: 'example@email.com',
      phoneLabel: 'Contact Number',
      phonePlaceholder: 'Phone number',
      countryCode: '+1',
      countryLabel: 'US',
      reasonLabel: 'Reason for Contact',
      reasonPlaceholder: 'Choose a reason',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Your Message',
      submitLabel: 'Send Message',
      submittingLabel: 'Sending...',
      requiredFieldText: 'Please complete the required fields.',
      loadingText: 'Sending your message...',
      successText: 'Thank you. Your message has been received.',
      errorText: 'Something went wrong. Please try again.',
      reviewErrorText: 'Please review the form and try again.',
      reasonOptions: ['Menu question', 'Branch visit', 'Celebration or event', 'Collaboration', 'Feedback', 'Other'],
    },
  },
  footer: {
    description: 'Late-night cravings, weekend treats, and sweet celebrations handcrafted fresh at Chokola.',
    navigationTitle: 'Navigation',
    contactTitle: 'Contact',
    hoursTitle: 'Opening Hours',
    socialLinks: [
      {label: 'Instagram', href: 'https://instagram.com/chokola', icon: 'instagram'},
      {label: 'Facebook', href: 'https://facebook.com/chokola', icon: 'facebook'},
      {label: 'Twitter', href: 'https://x.com/chokola', icon: 'x'},
      {label: 'TikTok', href: 'https://tiktok.com/@chokola', icon: 'music2'},
      {label: 'WhatsApp', href: 'https://wa.me/1234567890', icon: 'messageCircle'},
    ],
    contactItems: [
      {label: 'Phone', value: '+1 (216) 816-6399', href: 'tel:+12168166399', icon: 'phone'},
      {label: 'Location', value: 'Beachwood Place Mall, 26300 Cedar Road, Space 1035, Beachwood, OH 44122', icon: 'mapPin'},
    ],
    hours: [
      {label: 'Branch', value: 'Inside Beachwood Place Mall'},
      {label: 'Visit', value: 'Come for the cravings, stay for the vibe.'},
    ],
    copyright: '© 2026 Chokola Dessert Lounge. All rights reserved.',
  },
}

export function mergeSiteContent(content = {}) {
  return mergeContentValue(DEFAULT_SITE_CONTENT, content || {})
}

function mergeContentValue(fallback, value) {
  if (Array.isArray(fallback)) {
    return Array.isArray(value) && value.length > 0 ? value : fallback
  }

  if (isPlainObject(fallback)) {
    return Object.fromEntries(
      Object.entries(fallback).map(([key, fallbackValue]) => [
        key,
        mergeContentValue(fallbackValue, value?.[key]),
      ]),
    )
  }

  return value ?? fallback
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

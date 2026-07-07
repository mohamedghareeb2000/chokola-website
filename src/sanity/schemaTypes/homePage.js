import {defineArrayMember, defineField, defineType} from 'sanity'

export const linkItem = defineType({
  name: 'linkItem',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'href', title: 'Href', type: 'string'}),
  ],
})

export const heroHighlight = defineType({
  name: 'heroHighlight',
  title: 'Hero Highlight',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'value', title: 'Value', type: 'string'}),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Cupcake', value: 'cupcake'},
          {title: 'Star', value: 'star'},
          {title: 'None', value: 'none'},
        ],
        layout: 'radio',
      },
    }),
  ],
})

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'price', title: 'Price', type: 'string'}),
    defineField({name: 'image', title: 'Image URL or Path', type: 'string'}),
    defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
  ],
})

export const menuCategoryMeta = defineType({
  name: 'menuCategoryMeta',
  title: 'Menu Category',
  type: 'object',
  fields: [
    defineField({name: 'id', title: 'ID', type: 'string'}),
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'image', title: 'Image Path', type: 'string'}),
    defineField({name: 'alt', title: 'Alt Text', type: 'string'}),
  ],
})

export const aboutHighlight = defineType({
  name: 'aboutHighlight',
  title: 'About Highlight',
  type: 'object',
  fields: [
    defineField({name: 'term', title: 'Term', type: 'string'}),
    defineField({name: 'detail', title: 'Detail', type: 'string'}),
  ],
})

export const contactCard = defineType({
  name: 'contactCard',
  title: 'Contact Card',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'value', title: 'Value', type: 'string'}),
    defineField({name: 'href', title: 'Href', type: 'string'}),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Phone', value: 'phone'},
          {title: 'WhatsApp', value: 'messageCircle'},
          {title: 'Email', value: 'mail'},
          {title: 'Location', value: 'mapPin'},
        ],
      },
    }),
  ],
})

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'href', title: 'Href', type: 'string'}),
    defineField({name: 'icon', title: 'Icon', type: 'string'}),
  ],
})

export const footerHours = defineType({
  name: 'footerHours',
  title: 'Footer Hours',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({name: 'value', title: 'Value', type: 'string'}),
  ],
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Homepage Content',
      readOnly: true,
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'object',
      fields: [
        defineField({name: 'name', title: 'Name', type: 'string'}),
        defineField({name: 'subtitle', title: 'Subtitle', type: 'string'}),
        defineField({name: 'primary', title: 'Primary Color', type: 'string'}),
        defineField({name: 'secondary', title: 'Secondary Color', type: 'string'}),
        defineField({name: 'background', title: 'Background Color', type: 'string'}),
        defineField({name: 'accent', title: 'Accent Color', type: 'string'}),
        defineField({name: 'cream', title: 'Cream Color', type: 'string'}),
        defineField({name: 'gold', title: 'Gold Color', type: 'string'}),
        defineField({name: 'muted', title: 'Muted Color', type: 'string'}),
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'object',
      fields: [
        defineField({
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [defineArrayMember({type: 'linkItem'})],
        }),
        defineField({name: 'contactCta', title: 'Contact CTA', type: 'linkItem'}),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'titleLine1', title: 'Title Line 1', type: 'string'}),
        defineField({name: 'titleLine2', title: 'Title Line 2', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text'}),
        defineField({name: 'primaryCta', title: 'Primary CTA', type: 'linkItem'}),
        defineField({name: 'secondaryCta', title: 'Secondary CTA', type: 'linkItem'}),
        defineField({
          name: 'highlights',
          title: 'Highlights',
          type: 'array',
          of: [defineArrayMember({type: 'heroHighlight'})],
        }),
        defineField({name: 'image', title: 'Image Path', type: 'string'}),
        defineField({name: 'imageAlt', title: 'Image Alt Text', type: 'string'}),
        defineField({name: 'scrollCta', title: 'Scroll CTA', type: 'linkItem'}),
        defineField({
          name: 'slides',
          title: 'Hero Slides',
          type: 'array',
          of: [defineArrayMember({type: 'heroSlide'})],
        }),
      ],
    }),
    defineField({
      name: 'menu',
      title: 'Menu Section',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text'}),
        defineField({name: 'tabAriaLabel', title: 'Tab Accessibility Label', type: 'string'}),
        defineField({name: 'selectedCategoryLabel', title: 'Selected Category Label', type: 'string'}),
        defineField({name: 'favoritesSuffix', title: 'Favorites Suffix', type: 'string'}),
        defineField({
          name: 'categories',
          title: 'Categories',
          type: 'array',
          of: [defineArrayMember({type: 'menuCategoryMeta'})],
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({
          name: 'paragraphs',
          title: 'Paragraphs',
          type: 'array',
          of: [defineArrayMember({type: 'text'})],
        }),
        defineField({
          name: 'highlights',
          title: 'Highlights',
          type: 'array',
          of: [defineArrayMember({type: 'aboutHighlight'})],
        }),
        defineField({name: 'atmosphereLabel', title: 'Atmosphere Label', type: 'string'}),
        defineField({name: 'mainImage', title: 'Main Image Path', type: 'string'}),
        defineField({name: 'mainImageAlt', title: 'Main Image Alt Text', type: 'string'}),
        defineField({name: 'mainImageCaption', title: 'Main Image Caption', type: 'text'}),
        defineField({name: 'secondaryImage', title: 'Secondary Image Path', type: 'string'}),
        defineField({name: 'secondaryImageAlt', title: 'Secondary Image Alt Text', type: 'string'}),
        defineField({name: 'secondaryImageCaption', title: 'Secondary Image Caption', type: 'text'}),
        defineField({name: 'calloutTitle', title: 'Callout Title', type: 'string'}),
        defineField({name: 'calloutText', title: 'Callout Text', type: 'text'}),
      ],
    }),
    defineField({
      name: 'branch',
      title: 'Branch Section',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'name', title: 'Name', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text'}),
        defineField({name: 'image', title: 'Image Path', type: 'string'}),
        defineField({name: 'imageAlt', title: 'Image Alt Text', type: 'string'}),
        defineField({name: 'address', title: 'Address', type: 'string'}),
        defineField({name: 'phone', title: 'Phone', type: 'string'}),
        defineField({name: 'hoursLabel', title: 'Hours Label', type: 'string'}),
        defineField({name: 'mapsUrl', title: 'Maps URL', type: 'url'}),
        defineField({name: 'mapsAriaLabel', title: 'Maps Accessibility Label', type: 'string'}),
        defineField({name: 'directionsLabel', title: 'Directions Label', type: 'string'}),
        defineField({
          name: 'amenities',
          title: 'Amenities',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
        defineField({name: 'openLabel', title: 'Open Label', type: 'string'}),
        defineField({name: 'closedLabel', title: 'Closed Label', type: 'string'}),
        defineField({name: 'opensAtMinutes', title: 'Opens At Minutes', type: 'number'}),
        defineField({name: 'closesAtMinutes', title: 'Closes At Minutes', type: 'number'}),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'statementLine1', title: 'Statement Line 1', type: 'string'}),
        defineField({name: 'statementLine2', title: 'Statement Line 2', type: 'string'}),
        defineField({name: 'description', title: 'Description', type: 'text'}),
        defineField({
          name: 'cards',
          title: 'Contact Cards',
          type: 'array',
          of: [defineArrayMember({type: 'contactCard'})],
        }),
        defineField({
          name: 'form',
          title: 'Form',
          type: 'object',
          fields: [
            defineField({name: 'nameLabel', title: 'Name Label', type: 'string'}),
            defineField({name: 'namePlaceholder', title: 'Name Placeholder', type: 'string'}),
            defineField({name: 'emailLabel', title: 'Email Label', type: 'string'}),
            defineField({name: 'emailPlaceholder', title: 'Email Placeholder', type: 'string'}),
            defineField({name: 'phoneLabel', title: 'Phone Label', type: 'string'}),
            defineField({name: 'phonePlaceholder', title: 'Phone Placeholder', type: 'string'}),
            defineField({name: 'countryCode', title: 'Country Code', type: 'string'}),
            defineField({name: 'countryLabel', title: 'Country Label', type: 'string'}),
            defineField({name: 'reasonLabel', title: 'Reason Label', type: 'string'}),
            defineField({name: 'reasonPlaceholder', title: 'Reason Placeholder', type: 'string'}),
            defineField({name: 'messageLabel', title: 'Message Label', type: 'string'}),
            defineField({name: 'messagePlaceholder', title: 'Message Placeholder', type: 'string'}),
            defineField({name: 'submitLabel', title: 'Submit Label', type: 'string'}),
            defineField({name: 'submittingLabel', title: 'Submitting Label', type: 'string'}),
            defineField({name: 'requiredFieldText', title: 'Required Field Text', type: 'string'}),
            defineField({name: 'loadingText', title: 'Loading Text', type: 'string'}),
            defineField({name: 'successText', title: 'Success Text', type: 'string'}),
            defineField({name: 'errorText', title: 'Error Text', type: 'string'}),
            defineField({name: 'reviewErrorText', title: 'Review Error Text', type: 'string'}),
            defineField({
              name: 'reasonOptions',
              title: 'Reason Options',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        defineField({name: 'description', title: 'Description', type: 'text'}),
        defineField({name: 'navigationTitle', title: 'Navigation Title', type: 'string'}),
        defineField({name: 'contactTitle', title: 'Contact Title', type: 'string'}),
        defineField({name: 'hoursTitle', title: 'Hours Title', type: 'string'}),
        defineField({
          name: 'socialLinks',
          title: 'Social Links',
          type: 'array',
          of: [defineArrayMember({type: 'socialLink'})],
        }),
        defineField({
          name: 'contactItems',
          title: 'Contact Items',
          type: 'array',
          of: [defineArrayMember({type: 'contactCard'})],
        }),
        defineField({
          name: 'hours',
          title: 'Hours',
          type: 'array',
          of: [defineArrayMember({type: 'footerHours'})],
        }),
        defineField({name: 'copyright', title: 'Copyright', type: 'string'}),
      ],
    }),
  ],
})

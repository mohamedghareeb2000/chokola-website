import {Icon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

const CategoryIcon = (props) => <Icon symbol="tag" {...props} />

export const menuCategoryProduct = defineType({
  name: 'menuCategoryProduct',
  title: 'Product',
  type: 'object',
  fields: [
    defineField({
      name: 'productName',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Store the numeric price only, for example 8.99.',
      validation: (rule) => rule.required().precision(2).min(0),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'productName',
      price: 'price',
    },
    prepare({title, price}) {
      return {
        title,
        subtitle: typeof price === 'number' ? `$${price.toFixed(2)}` : 'No price',
      }
    },
  },
})

export const menuCategory = defineType({
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  icon: CategoryIcon,
  fields: [
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'categoryName',
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return 'Required'
          return /^[a-z0-9-]+$/.test(slug.current) || 'Use lowercase letters, numbers, and hyphens only.'
        }),
    }),
    defineField({
      name: 'categoryImage',
      title: 'Category Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'categoryImageAlt',
      title: 'Category Image Alt Text',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imageDescription',
      title: 'Image Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [defineArrayMember({type: 'menuCategoryProduct'})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'},
        {field: 'categoryName', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'categoryName',
      subtitle: 'slug.current',
      media: 'categoryImage',
    },
  },
})

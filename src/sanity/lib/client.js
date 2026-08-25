import { createClient } from 'next-sanity'

import { sanityConfig } from '../env.js'

export const client = createClient({
  ...sanityConfig,
  useCdn: true,
  perspective: 'published',
})

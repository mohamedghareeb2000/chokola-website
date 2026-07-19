import {createImageUrlBuilder} from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null

export const urlFor = (source) => {
  if (!builder) {
    return null
  }

  return builder.image(source)
}

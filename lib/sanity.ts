import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'g3jd0ba2'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}



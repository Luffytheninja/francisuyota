import { sanityClient } from './sanity'
import { Project } from './projectsData'

export const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  category,
  youtubeId,
  poster,
  featured
}`

export async function getProjects(): Promise<Project[]> {
  return sanityClient.fetch(projectsQuery)
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return sanityClient.fetch(
    `*[_type == "project" && featured == true] | order(_createdAt desc) {
      _id,
      title,
      category,
      youtubeId,
      poster,
      featured
    }`
  )
}

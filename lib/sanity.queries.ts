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
  try {
    const projects = await sanityClient.fetch(projectsQuery, {}, {
      next: { revalidate: 0 },
      cache: 'no-store',
    });
    return projects || [];
  } catch (error) {
    console.error('Error fetching projects from Sanity:', error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await sanityClient.fetch(
      `*[_type == "project" && featured == true] | order(_createdAt desc) {
        _id,
        title,
        category,
        youtubeId,
        poster,
        featured
      }`,
      {},
      {
        next: { revalidate: 0 },
        cache: 'no-store',
      }
    );
    return projects || [];
  } catch (error) {
    console.error('Error fetching featured projects from Sanity:', error);
    return [];
  }
}


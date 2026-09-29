// Re-export from the single source of truth
export type { Project, Artist, Service, SocialLinks, BlogPost, ContactFormPayload, ContactFormResponse } from './types';

// Keep this file for backwards compatibility with existing imports of DEFAULT_PROJECTS
export { DEFAULT_PROJECTS, DEFAULT_ARTIST, DEFAULT_SERVICES, CLIENTS } from './sanity.queries';

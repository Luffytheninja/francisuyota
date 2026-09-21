/**
 * Global TypeScript interfaces for Francis Uyota portfolio.
 * Single source of truth for all data shapes across CMS + frontend.
 */

// ─── Project ─────────────────────────────────────────────────────────────────
export interface Project {
  _id: string;
  title: string;
  category: string;
  youtubeId: string;
  slug?: { current: string };
  poster?: any; // Sanity image reference — use urlFor() from lib/sanity.ts
  featured?: boolean;
  year?: string | number;
  description?: string;
  role?: string;
  client?: string;
  tags?: string[];
}

// ─── Artist / About ──────────────────────────────────────────────────────────
export interface Artist {
  _id: string;
  fullName: string;
  alias: string;
  tagline: string;
  bio: string; // Plain text bio paragraph
  bioBlocks?: any[]; // Portable Text blocks from Sanity
  disciplines: string[];
  basedIn: string;
  email: string;
  phone?: string;
  portrait?: any; // Sanity image reference
  cvPdfUrl?: string;
}

// ─── Service ─────────────────────────────────────────────────────────────────
export interface Service {
  _id: string;
  title: string;
  slug?: { current: string };
  description: string;
  icon?: string; // emoji or icon name
  image?: any; // Sanity image reference
  tags?: string[];
  pricing?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

// ─── Social Links ────────────────────────────────────────────────────────────
export interface SocialLinks {
  instagram?: string;
  youtube?: string;
  x?: string;
  behance?: string;
  linkedin?: string;
  vimeo?: string;
}

// ─── Blog Post (future) ──────────────────────────────────────────────────────
export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: any[]; // Portable Text
  coverImage?: any;
  publishedAt?: string;
  tags?: string[];
}

// ─── Contact Form ────────────────────────────────────────────────────────────
export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  projectType?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

import { sanityClient } from './sanity';
import { Project, Artist, Service } from './types';

// ─── Default fallback data ────────────────────────────────────────────────────

export const DEFAULT_ARTIST: Artist = {
  _id: 'default-artist',
  fullName: 'Francis Onabanjo',
  alias: 'Francis Uyota',
  tagline: 'Filmmaker & Creative Director',
  bio: 'Francis Uyota moves between the camera lens and the cutting room with an editor\'s precision and a painter\'s sense of mood. Working across narrative film, commercial fashion, and music visuals, his practice interrogates memory, sound, and visual identity — rooted in contemporary African culture and surrealist cinema.',
  disciplines: ['Filmmaking', 'Creative Direction', 'Directing'],
  basedIn: 'Nigeria — Worldwide',
  email: 'hello@uyota.film',
};

export const DEFAULT_SERVICES: Service[] = [
  {
    _id: 'service-1',
    title: 'Cinematography & Directing',
    description: 'Narrative films, short films, and high-impact visual stories crafted with deliberate lighting, distinct composition, and bespoke color science for international film festivals, broadcast, and digital release.',
    icon: '🎬',
    tags: ['Narrative Film', 'Short Film', 'DoP', 'Directing', 'Color Grading'],
    ctaLabel: 'Enquire for Film',
    ctaLink: '#contact',
  },
  {
    _id: 'service-2',
    title: 'Music Videos & Visualizers',
    description: 'Dynamic, artist-first visual pieces combining kinetic camera movements, neon light textures, and sharp editorial rhythms to elevate musical narratives into unforgettable cinematic experiences.',
    icon: '⚡',
    tags: ['Music Video', 'Visualizer', 'Performance', 'Post-Production', 'Editorial'],
    ctaLabel: 'Commission Visual',
    ctaLink: '#contact',
  },
  {
    _id: 'service-3',
    title: 'Fashion & Commercial Campaigns',
    description: 'Atmospheric brand films and capsule campaigns that highlight architectural silhouettes, tactile materials, and contemporary luxury aesthetics for discerning fashion and lifestyle brands.',
    icon: '✨',
    tags: ['Fashion Film', 'Brand Campaign', 'Commercial', 'Lookbook', 'Creative Direction'],
    ctaLabel: 'Start a Campaign',
    ctaLink: '#contact',
  },
  {
    _id: 'service-4',
    title: 'Creative Direction & Post-Production',
    description: 'End-to-end creative direction, storyboarding, and full post-production finishing — including offline edit, ACES color grading, sound design, and master delivery.',
    icon: '🎨',
    tags: ['Creative Direction', 'Storyboarding', 'Color Science', 'Mastering', 'Art Direction'],
    ctaLabel: 'Discuss Project',
    ctaLink: '#contact',
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    _id: 'project-money-eyed-god',
    title: 'Money Eyed God',
    category: 'short-film',
    videoUrl: '/videos/short-film/MANEYEYEDGOD EDIT.mp4',
    featured: true,
    year: '2024',
    description: 'A haunting narrative short exploring perception, spiritual currency, and ambition through textured cinematography and surreal visual rhythms.',
    role: 'Director & Cinematographer',
    client: 'Independent',
    tags: ['Short Film', 'Narrative', 'Surrealism', 'Cinematography'],
  },
  {
    _id: 'project-imad-eduso',
    title: 'Imad Eduso Capsule',
    category: 'fashion',
    videoUrl: '/videos/fashion/IMAD EDUSO CAPSULE ...mov',
    featured: true,
    year: '2024',
    description: 'A cinematic capsule campaign capturing architectural silhouettes, fluid textile drapes, and contemporary African luxury aesthetics.',
    role: 'Cinematographer & Creative Director',
    client: 'Imad Eduso',
    tags: ['Fashion', 'Campaign', 'Editorial', 'Commercial'],
  },
  {
    _id: 'project-soular',
    title: 'Soular (Round 2)',
    category: 'music-video',
    videoUrl: '/videos/music-videos/SOULAR(ROUND 2).mov',
    featured: true,
    year: '2024',
    description: 'High-octane musical visual piece driven by kinetic camera movements, neon light textures, and stylized color grading.',
    role: 'Director & DoP',
    client: 'Soular',
    tags: ['Music Video', 'Color Grading', 'Performance', 'Kinetic'],
  },
  {
    _id: 'project-nakel',
    title: 'Nakel Visualizer',
    category: 'music-video',
    videoUrl: '/videos/music-videos/NAKEL VISUALIZER.mov',
    year: '2023',
    description: 'An immersive music visualizer utilizing rich shadow play, moody atmospheric lighting, and rhythmic editorial cuts.',
    role: 'Director of Photography & Editor',
    client: 'Nakel',
    tags: ['Music Video', 'Visualizer', 'Atmospheric', 'Lighting'],
  },
  {
    _id: 'project-wtr',
    title: 'WTR (Where\'s The Roof)',
    category: 'documentary',
    videoUrl: '/videos/events/WTR.mov',
    year: '2023',
    description: 'An electrifying cultural document capturing the raw pulse, nocturnal energy, and kinetic crowd movement of youth culture.',
    role: 'Cinematographer & Editor',
    client: 'WTR Collective',
    tags: ['Documentary', 'Live Event', 'Culture', 'Night Energy'],
  },
];

export const CLIENTS = [
  'Whitechapel Gallery', 'Imad Eduso', 'Soular', 'Nakel',
  'Almanak Media', 'Red Bull Media', 'Universal Music', 'WTR Collective',
];

// ─── Sanity Query Strings ─────────────────────────────────────────────────────

const projectFields = `
  _id,
  title,
  slug,
  category,
  youtubeId,
  poster,
  featured,
  year,
  description,
  role,
  client,
  tags
`;

const artistFields = `
  _id,
  fullName,
  alias,
  tagline,
  bio,
  disciplines,
  basedIn,
  email,
  phone,
  portrait,
  cvPdfUrl
`;

const serviceFields = `
  _id,
  title,
  slug,
  description,
  icon,
  image,
  tags,
  pricing,
  ctaLabel,
  ctaLink
`;

// ─── Fetch Functions ──────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  try {
    const sanityProjects: Project[] = await sanityClient.fetch(
      `*[_type == "project"] | order(_createdAt desc) { ${projectFields} }`,
      {},
      { next: { revalidate: 60 }, cache: 'no-store' }
    );
    if (!sanityProjects || sanityProjects.length === 0) {
      return DEFAULT_PROJECTS;
    }

    // Normalize categories (e.g., "short-films" -> "short-film")
    const normalizedSanity: Project[] = sanityProjects.map((p) => ({
      ...p,
      category: p.category === 'short-films' ? 'short-film' : p.category,
    }));

    // Merge: include DEFAULT_PROJECTS and any unique Sanity projects
    const defaultTitles = new Set(DEFAULT_PROJECTS.map((p) => p.title.toLowerCase().trim()));
    const uniqueSanity = normalizedSanity.filter(
      (p) => !defaultTitles.has(p.title?.toLowerCase().trim())
    );

    return [...DEFAULT_PROJECTS, ...uniqueSanity];
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const all = await getProjects();
    const featured = all.filter((p) => p.featured);
    return featured.length > 0 ? featured : all;
  } catch {
    return DEFAULT_PROJECTS.filter((p) => p.featured);
  }
}

export async function getArtist(): Promise<Artist> {
  try {
    const artist = await sanityClient.fetch(
      `*[_type == "artist"][0] { ${artistFields} }`,
      {},
      { next: { revalidate: 60 } }
    );
    return artist ?? DEFAULT_ARTIST;
  } catch {
    return DEFAULT_ARTIST;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const services = await sanityClient.fetch(
      `*[_type == "service"] | order(_createdAt asc) { ${serviceFields} }`,
      {},
      { next: { revalidate: 60 } }
    );
    return services?.length > 0 ? services : DEFAULT_SERVICES;
  } catch {
    return DEFAULT_SERVICES;
  }
}

import { sanityClient } from './sanity';
import { Project, Artist, Service } from './types';

// ─── Default fallback data ────────────────────────────────────────────────────

export const DEFAULT_ARTIST: Artist = {
  _id: 'default-artist',
  fullName: 'Francis Onabanjo',
  alias: 'Francis Uyota',
  tagline: 'Filmmaker • Creative Director • Photographer',
  bio: 'Francis Uyota moves between the camera lens and the cutting room with an editor\'s precision and a painter\'s sense of mood. Working across film, creative direction, and photography, his practice interrogates memory, sound, and visual identity — rooted in Nigeria\'s visual culture and inflected with elements of surrealism.',
  disciplines: ['Filmmaking', 'Creative Direction', 'Photography'],
  basedIn: 'Ibadan, Nigeria — Worldwide',
  email: 'hello@uyota.film',
};

export const DEFAULT_SERVICES: Service[] = [
  {
    _id: 'service-1',
    title: 'Cinematography Studio — Ibadan',
    description: 'Our full-service production studio in Ibadan, Nigeria offers cinematography, colour grading, and post-production for narrative film, commercials, and music videos. Fully equipped with ARRI, RED, and Sony cameras, Zeiss and Cooke glass, and a DaVinci Resolve grading suite.',
    icon: '🎬',
    tags: ['ARRI', 'RED', 'DaVinci Resolve', 'Color Grading', 'Studio Production'],
    ctaLabel: 'Book the Studio',
    ctaLink: '#contact',
  },
  {
    _id: 'service-2',
    title: 'Freelance Shoots — Worldwide',
    description: 'Francis is available for international cinematography and creative direction engagements. Having shot across Lagos, London, and beyond, he brings cinematic precision and a distinctive visual language to every project — from editorial photography to feature film.',
    icon: '✈️',
    tags: ['Narrative Film', 'Music Video', 'Documentary', 'Commercial', 'Fashion Editorial'],
    ctaLabel: 'Enquire Now',
    ctaLink: '#contact',
  },
  {
    _id: 'service-3',
    title: 'Creative Direction',
    description: 'End-to-end creative direction for brands, artists, and institutions. From visual identity development through to campaign production, Francis delivers coherent, provocative, and culturally rooted visual narratives.',
    icon: '🎨',
    tags: ['Brand Identity', 'Campaign', 'Art Direction', 'Storyboarding', 'Visual Identity'],
    ctaLabel: 'Start a Project',
    ctaLink: '#contact',
  },
  {
    _id: 'service-4',
    title: 'Photography',
    description: 'Editorial, portrait, and documentary photography that captures the essence of a subject with honesty and artistry. Available for magazine commissions, artist portraits, event documentation, and gallery work.',
    icon: '📷',
    tags: ['Editorial', 'Portrait', 'Documentary', 'Gallery', 'Press'],
    ctaLabel: 'View Portfolio',
    ctaLink: '/#works',
  },
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    _id: 'default-1',
    title: 'Under the Hood',
    category: 'film',
    youtubeId: 'dQw4w9WgXcQ',
    featured: true,
    year: '2024',
    description: 'A tribute to the unsung heroes of Lagos, the film explores themes of death, loss, and rebirth, examining the relationship between human consciousness and visual RGB spectrums. Selected for the free-Writers to screening program at the Whitechapel Gallery, London.',
    role: 'Writer, Director, Cinematographer',
    client: 'Independent',
    tags: ['Narrative', 'Exhibition', 'London', 'Lagos'],
  },
  {
    _id: 'default-2',
    title: 'Uyota the Traveller',
    category: 'photography',
    youtubeId: 'L_LUpnjgPso',
    featured: true,
    year: '2024',
    description: 'A visual essay on movement, place, and belonging — featured in Almanak Media in connection with contemporary Nigerian visual artists.',
    role: 'Photographer & Creative Director',
    client: 'Almanak Media',
    tags: ['Photography', 'Travel', 'Nigerian Art'],
  },
  {
    _id: 'default-3',
    title: 'Lagos Nights',
    category: 'documentary',
    youtubeId: 'kJQP7kiw5Fk',
    year: '2024',
    description: 'Evocative night photography and textured shadows of the Lagos metropolis.',
    role: 'Director of Photography',
    client: 'Independent',
    tags: ['Documentary', 'Lagos', 'Night Photography'],
  },
  {
    _id: 'default-4',
    title: 'Frequencies',
    category: 'music-video',
    youtubeId: 'fJ9rUzIMcZQ',
    year: '2023',
    description: 'High-kinetic music video showcasing vibrant colour science and light textures.',
    role: 'DoP & Editor',
    client: 'Independent',
    tags: ['Music Video', 'Color', 'Energy'],
  },
  {
    _id: 'default-5',
    title: 'Consciousness',
    category: 'film',
    youtubeId: '9bZkp7q19f0',
    year: '2023',
    description: 'Short narrative exploring the boundaries of reality and perception through surrealist imagery.',
    role: 'Director & Cinematographer',
    client: 'Independent',
    tags: ['Surrealism', 'Narrative', 'Experimental'],
  },
  {
    _id: 'default-6',
    title: 'Editorial Series',
    category: 'photography',
    youtubeId: 'dQw4w9WgXcQ',
    year: '2023',
    description: 'Fashion editorial series exploring Nigerian identity and contemporary aesthetics.',
    role: 'Photographer',
    client: 'Independent',
    tags: ['Fashion', 'Editorial', 'Identity'],
  },
];

export const CLIENTS = [
  'Whitechapel Gallery', 'Almanak Media', 'BBC Storyville', 'Red Bull Media',
  'A24', 'Universal Music', 'Empire', 'FilmOne', 'Arte France', 'Nike Africa',
];

export const GEAR_LOCKER = [
  { category: 'Cameras', items: ['ARRI Alexa 35', 'ARRI Alexa Mini LF', 'RED V-Raptor 8K VV', 'Sony FX9 & FX6', '16mm Bolex H16'] },
  { category: 'Glass & Optics', items: ['Cooke Anamorphic /i Full Frame', 'Atlas Orion 2X Anamorphic', 'Zeiss Supreme Radiance', 'Leica R Vintage Cine-Mods', 'Laowa Periprobe 24mm Macro'] },
  { category: 'Lighting & Grip', items: ['Astera Titan & Helios Tubes', 'Aputure Electro Storm 2600W', 'ARRI SkyPanel S60-C', 'DJI Ronin 2 Pro Gimbal', 'Dana Dolly & EasyRig Vario 5'] },
  { category: 'Grading & Post', items: ['DaVinci Resolve Studio 19', 'Flanders Scientific XMP310 HDR Monitor', 'ACES Color Pipeline', 'Custom Film Emulation LUTs'] },
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
    const projects = await sanityClient.fetch(
      `*[_type == "project"] | order(_createdAt desc) { ${projectFields} }`,
      {},
      { next: { revalidate: 60 }, cache: 'no-store' }
    );
    return projects?.length > 0 ? projects : DEFAULT_PROJECTS;
  } catch {
    return DEFAULT_PROJECTS;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const projects = await sanityClient.fetch(
      `*[_type == "project" && featured == true] | order(_createdAt desc) { ${projectFields} }`,
      {},
      { next: { revalidate: 60 }, cache: 'no-store' }
    );
    return projects?.length > 0 ? projects : DEFAULT_PROJECTS.filter((p) => p.featured);
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

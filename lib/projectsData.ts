// Project interface aligned with Sanity Studio schema.
// Fields: _id (Sanity doc ID), title, category, youtubeId, poster (Sanity image ref), featured.
export interface Project {
  _id: string;
  title: string;
  category: string;
  youtubeId: string;
  poster?: any; // Sanity image reference — use urlFor() from lib/sanity.ts
  featured?: boolean;
}

export const CLIENTS = [
  'Netflix', 'BBC Storyville', 'Red Bull Media', 'A24', 'Universal Music', 'Empire', 'FilmOne', 'Arte France', 'Nike Africa', 'Alte Films'
];

export const GEAR_LOCKER = [
  { category: 'Cameras', items: ['ARRI Alexa 35', 'ARRI Alexa Mini LF', 'RED V-Raptor 8K VV', 'Sony FX9 & FX6', '16mm Bolex H16'] },
  { category: 'Glass & Optics', items: ['Cooke Anamorphic /i Full Frame', 'Atlas Orion 2X Anamorphic', 'Zeiss Supreme Radiance', 'Leica R Vintage Cine-Mods', 'Laowa Periprobe 24mm Macro'] },
  { category: 'Lighting & Grip', items: ['Astera Titan & Helios Tubes', 'Aputure Electro Storm 2600W', 'ARRI SkyPanel S60-C', 'DJI Ronin 2 Pro Gimbal', 'Dana Dolly & EasyRig Vario 5'] },
  { category: 'Grading & Post', items: ['DaVinci Resolve Studio 19', 'Flanders Scientific XMP310 HDR Monitor', 'ACES Color Pipeline', 'Custom Film Emulation LUTs'] },
];

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowDown, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { urlFor } from '@/lib/sanity';
import { trackShowreelOpen, trackProjectView } from '@/lib/analytics';

interface HeroSectionProps {
  projects: Project[];
  heroProject: Project | null;
  onOpenShowreel: () => void;
  onSelectProject: (project: Project) => void;
}

type FontType = 'slackey' | 'encode' | 'caprasimo';

const FONTS: FontType[] = ['slackey', 'encode', 'caprasimo'];

function getFontStyle(font: FontType): React.CSSProperties {
  switch (font) {
    case 'slackey':   return { fontFamily: 'var(--font-slackey)', fontWeight: 400 };
    case 'encode':    return { fontFamily: 'var(--font-encode-sans)', fontWeight: 900 };
    case 'caprasimo': return { fontFamily: 'var(--font-caprasimo)', fontWeight: 400 };
  }
}

export default function HeroSection({ projects, heroProject, onOpenShowreel, onSelectProject }: HeroSectionProps) {
  const [fontIndex, setFontIndex] = useState(0);
  const activeProject = heroProject ?? projects[0] ?? null;

  useEffect(() => {
    const id = setInterval(() => setFontIndex((i) => (i + 1) % FONTS.length), 1300);
    return () => clearInterval(id);
  }, []);

  const getThumbnail = (p: Project | null) => {
    if (!p) return '';
    if (p.poster) return urlFor(p.poster).width(1600).height(1200).url();
    if (p.youtubeId) return `https://img.youtube.com/vi/${p.youtubeId}/maxresdefault.jpg`;
    return '';
  };

  const handleVideoClick = () => {
    if (activeProject) {
      trackProjectView(activeProject.title, activeProject.category);
      onSelectProject(activeProject);
    } else {
      trackShowreelOpen();
      onOpenShowreel();
    }
  };

  const scrollToWorks = () => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[#FFFAB3] text-[#0B0D0C] flex flex-col items-center justify-start pt-28 sm:pt-36 pb-12 sm:pb-20 px-2 sm:px-4 md:px-6 overflow-hidden select-none"
    >
      {/* Subtle film grain for cheeky cinematic texture */}
      <div className="film-grain absolute inset-0 z-0 pointer-events-none opacity-20" />

      {/* Decorative cheeky Nigerian stickers/badges floating in corners on large screens */}
      {/* YouTube tag — links to channel */}
      <motion.a
        href="https://www.youtube.com/@francisuyota"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 180, damping: 12 }}
        whileHover={{ rotate: 0, scale: 1.1 }}
        className="hidden xl:flex absolute top-36 left-8 z-10 items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#50BF8E] text-[#0B0D0C] border-2 border-[#0B0D0C] text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#0B0D0C] cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 fill-[#0B0D0C]" />
        YouTube
      </motion.a>

      {/* Instagram tag — links to profile */}
      <motion.a
        href="https://www.instagram.com/francisuyota"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, scale: 0.8, rotate: 12 }}
        animate={{ opacity: 1, scale: 1, rotate: 6 }}
        transition={{ delay: 0.9, type: 'spring', stiffness: 180, damping: 12 }}
        whileHover={{ rotate: 0, scale: 1.1 }}
        className="hidden xl:flex absolute top-40 right-8 z-10 items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#DFB143] text-[#0B0D0C] border-2 border-[#0B0D0C] text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#0B0D0C] cursor-pointer"
      >
        ✦ Instagram
      </motion.a>

      {/* ── Center Balanced Hero Header Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-2 sm:px-4">
        {/* Giant cycling headline: center aligned & justified */}
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 140, damping: 14 }}
          className="w-full flex flex-col items-center justify-center text-center mb-4 sm:mb-6"
        >
          <h1
            className="text-[clamp(3.8rem,13vw,10.5rem)] font-black text-[#50BF8E] leading-[0.84] tracking-tight uppercase select-none transition-all duration-300 drop-shadow-sm"
            style={getFontStyle(FONTS[fontIndex])}
          >
            <span className="block sm:inline sm:mr-4">UYOTA</span>
            <span className="block sm:inline">STUDIO</span>
          </h1>
        </motion.div>

        {/* Subtitle & Tagline - centered & balanced */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-lg md:text-xl font-medium text-[#0B0D0C]/80 max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed"
          style={{ fontFamily: 'var(--font-encode-sans)' }}
        >
          Filmmaker · Creative Director · Photographer<br />
          <span className="text-xs sm:text-sm font-normal text-[#0B0D0C]/60 tracking-wider">
            Nigeria — Worldwide
          </span>
        </motion.p>

        {/* View Works Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex items-center justify-center mb-8 sm:mb-12 mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToWorks}
            className="flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full border-2 border-[#0B0D0C] bg-white/40 hover:bg-[#0B0D0C] text-[#0B0D0C] hover:text-[#FFFAB3] font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-[4px_4px_0px_#0B0D0C] active:shadow-[1px_1px_0px_#0B0D0C]"
          >
            View Works
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </div>

      {/* ── Responsive Dual-Mode Video Viewport ──
          - Vertical mode for mobile (< md: aspect-[4/5] / aspect-[9/14] portrait reel)
          - Horizontal mode for desktop (md+: aspect-[16/8] or aspect-[16/9] cinematic widescreen taking up most of the screen)
          - Reduced margins and responsive across screen sizes
          - Center balanced composition
      */}
      {activeProject && (
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45, type: 'spring', stiffness: 120, damping: 14 }}
          className="relative z-10 w-full flex justify-center items-center px-2 sm:px-4 md:px-6"
        >
          <div
            className="group relative w-full 
              /* Mobile: Vertical mode (tall / portrait reel matching mobile wireframe) */
              aspect-[4/5] sm:aspect-[9/12] max-w-sm sm:max-w-md
              /* Desktop: Horizontal mode (cinematic widescreen taking up most of screen) */
              md:aspect-[16/8] lg:aspect-[16/7.5] md:max-w-5xl lg:max-w-6xl md:h-auto
              rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0B0D0C] cursor-pointer shadow-2xl border-2 border-black/15 hover:border-black transition-all duration-500"
            data-cursor="WATCH"
            onClick={handleVideoClick}
          >
            {/* Thumbnail Poster */}
            {getThumbnail(activeProject) && (
              <Image
                src={getThumbnail(activeProject)}
                alt={activeProject.title}
                fill
                className="object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                priority
              />
            )}

            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors pointer-events-none" />

            {/* Cheeky Top Badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#0B0D0C]/85 backdrop-blur-md text-[#FFFAB3] border border-[#FFFAB3]/30 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-md">
                ✦ Director&apos;s Cut
              </span>
            </div>

            {/* Pulsing Cinematic Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 6 }}
                whileTap={{ scale: 0.92 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFFAB3] border-2 border-[#0B0D0C] flex items-center justify-center shadow-[4px_4px_0px_#0B0D0C] group-hover:scale-110 group-hover:bg-[#50BF8E] transition-all duration-300"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#0B0D0C] text-[#0B0D0C] ml-1" />
              </motion.div>
            </div>

            {/* Bottom Info Bar inside Viewport */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between pointer-events-none">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#50BF8E] text-[#0B0D0C] text-[10px] font-black uppercase tracking-widest mb-1.5">
                  {activeProject.category?.replace(/-/g, ' ')}
                </span>
                <h2
                  className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight"
                  style={{ fontFamily: 'var(--font-encode-sans)' }}
                >
                  {activeProject.title}
                </h2>
              </div>
              <span className="text-xs sm:text-sm font-mono font-bold text-white/70 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
                {activeProject.year}
              </span>
            </div>
          </div>
        </motion.div>
      )}

    </section>
  );
}

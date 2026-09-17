'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/projectsData';
import { urlFor } from '@/lib/sanity';

interface HeroSectionProps {
  projects: Project[];
  heroProject: Project | null;
  onOpenShowreel: () => void;
  onSelectProject: (project: Project) => void;
}

export default function HeroSection({ projects, heroProject, onOpenShowreel, onSelectProject }: HeroSectionProps) {
  const [currentFont, setCurrentFont] = useState<'slackey' | 'caprasimo'>('slackey');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const activeProject = projects[currentProjectIndex] ?? heroProject;

  // Helper: resolve thumbnail URL from Sanity poster or YouTube fallback
  const getThumbnail = (p: Project | null) => {
    if (!p) return '';
    if (p.poster) return urlFor(p.poster).width(1400).height(788).url();
    return `https://img.youtube.com/vi/${p.youtubeId}/maxresdefault.jpg`;
  };

  // Auto-cycle hero through portfolio every 6 seconds
  useEffect(() => {
    if (projects.length === 0) return;
    const timer = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-[#DFB143] text-[#141716] flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-8 lg:px-12 select-none"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center my-auto">
        {/* Massive Hero Typography cycling on hover between Slackey & Caprasimo */}
        <div
          className="relative text-center cursor-pointer mb-6 sm:mb-8"
          onMouseEnter={() => setCurrentFont((prev) => (prev === 'slackey' ? 'caprasimo' : 'slackey'))}
        >
          <motion.h1
            key={currentFont}
            initial={{ scale: 0.98, opacity: 0.9 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 220 }}
            className="text-7xl sm:text-9xl md:text-[14rem] lg:text-[17rem] font-black tracking-tight leading-none text-[#50BF8E] transition-all duration-300 drop-shadow-[0_6px_0px_rgba(20,23,22,0.12)]"
            style={{
              fontFamily: currentFont === 'slackey' ? 'var(--font-slackey)' : 'var(--font-caprasimo)',
            }}
          >
            UYOTA
          </motion.h1>

          <p className="text-xs sm:text-sm uppercase font-extrabold tracking-[0.25em] text-[#141716]/80 mt-[-8px] sm:mt-[-16px]">
            Director of Photography • Colorist • Visual Storyteller
          </p>
        </div>

        {/* Hero Video Box with Cycling Portfolio */}
        <div className="w-full max-w-4xl">
          <div
            className="group relative w-full aspect-video bg-[#0E100F] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl cursor-pointer border border-black/15"
            data-cursor="WATCH"
            onClick={onOpenShowreel}
          >
            {/* Cycling poster image */}
            {activeProject && (
              <motion.div
                key={activeProject._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={getThumbnail(activeProject)}
                  alt={activeProject.title}
                  fill
                  className="object-cover group-hover:opacity-100 transition-opacity duration-500"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </motion.div>
            )}

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

            {/* Top Bar: Title */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
              {activeProject && (
                <motion.div
                  key={activeProject.title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white"
                >
                  <span className="text-xs sm:text-sm font-black font-display-title text-[#D4F88D]">
                    {activeProject.title}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="text-[11px] sm:text-xs font-mono font-medium text-white/80 capitalize">
                    {activeProject.category.replace(/-/g, ' ')}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Manual Cycle Controls on Hover */}
            {projects.length > 1 && (
              <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                <button
                  onClick={handlePrev}
                  className="pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D4F88D] text-black flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black ml-1" />
              </motion.div>
            </div>

            {/* Bottom Progress Indicator Dots */}
            {projects.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none">
                {projects.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      idx === currentProjectIndex ? 'w-6 bg-[#D4F88D]' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Subtitle below the video */}
          <div className="text-center mt-6">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-black text-[#141716] tracking-tight font-display-title"
              style={{ fontFamily: 'var(--font-slackey)' }}
            >
              omo no food for fridge
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}


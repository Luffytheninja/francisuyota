'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { urlFor } from '@/lib/sanity';
import { trackProjectView } from '@/lib/analytics';

interface ShowcaseSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenArchive: () => void;
}

// Map each project category to its relevant brand color scheme
function getCategoryTheme(cat: string = '') {
  const c = cat.toLowerCase();
  if (c.includes('film') || c.includes('cinematography')) {
    return {
      border: 'border-[#50BF8E]',
      strokeColor: '#50BF8E',
      barBg: 'bg-[#50BF8E]',
      text: 'text-[#0B0D0C]',
      shadow: 'hover:shadow-[6px_6px_0px_#50BF8E]',
      accentBg: '#50BF8E',
    };
  }
  if (c.includes('photo') || c.includes('editorial')) {
    return {
      border: 'border-[#8ECDE2]',
      strokeColor: '#8ECDE2',
      barBg: 'bg-[#8ECDE2]',
      text: 'text-[#0B0D0C]',
      shadow: 'hover:shadow-[6px_6px_0px_#8ECDE2]',
      accentBg: '#8ECDE2',
    };
  }
  if (c.includes('doc')) {
    return {
      border: 'border-[#DFB143]',
      strokeColor: '#DFB143',
      barBg: 'bg-[#DFB143]',
      text: 'text-[#0B0D0C]',
      shadow: 'hover:shadow-[6px_6px_0px_#DFB143]',
      accentBg: '#DFB143',
    };
  }
  if (c.includes('music') || c.includes('commercial')) {
    return {
      border: 'border-[#D4F88D]',
      strokeColor: '#D4F88D',
      barBg: 'bg-[#D4F88D]',
      text: 'text-[#0B0D0C]',
      shadow: 'hover:shadow-[6px_6px_0px_#D4F88D]',
      accentBg: '#D4F88D',
    };
  }
  return {
    border: 'border-[#50BF8E]',
    strokeColor: '#50BF8E',
    barBg: 'bg-[#50BF8E]',
    text: 'text-[#0B0D0C]',
    shadow: 'hover:shadow-[6px_6px_0px_#50BF8E]',
    accentBg: '#50BF8E',
  };
}

export default function ShowcaseSection({ projects, onSelectProject, onOpenArchive }: ShowcaseSectionProps) {
  // Only display actual uploaded projects
  const uploadedProjects = projects;

  // Extract unique active categories present in the uploaded works
  const categories = useMemo(() => {
    const cats = new Set(uploadedProjects.map((p) => p.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [uploadedProjects]);

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return uploadedProjects;
    return uploadedProjects.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase());
  }, [uploadedProjects, activeCategory]);

  return (
    <section
      id="works"
      className="relative w-full bg-[#FFFAB3] text-[#0B0D0C] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading matching wireframe */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-black tracking-[0.2em] uppercase text-[#0B0D0C]/70 mb-2">
              Selected Works
            </p>
            <h2
              className="text-6xl sm:text-8xl md:text-9xl font-black text-[#0B0D0C] tracking-tight leading-none"
              style={{ fontFamily: 'var(--font-encode-sans)' }}
            >
              Works<span className="text-[#50BF8E]">...</span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            onClick={onOpenArchive}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B0D0C] hover:text-[#50BF8E] uppercase tracking-widest transition-colors group w-fit"
          >
            Full Archive ({uploadedProjects.length})
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Category Filter Pills (showing only categories with uploaded works) */}
        {categories.length > 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10"
          >
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border-2 ${
                    isSelected
                      ? 'bg-[#0B0D0C] text-[#FFFAB3] border-[#0B0D0C] shadow-[3px_3px_0px_#50BF8E]'
                      : 'bg-white/60 text-[#0B0D0C] border-black/15 hover:border-black'
                  }`}
                  style={{ fontFamily: 'var(--font-encode-sans)' }}
                >
                  {cat.replace(/-/g, ' ')}
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Responsive Layout Grid showing only uploaded works */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              // Wireframe layout cadence: item 0 is wide, 1 & 2 are pairs, 3 & 4 are pairs, 5 is wide, etc.
              const isFullWidth =
                filteredProjects.length === 1 ||
                idx === 0 ||
                (idx > 0 && idx % 5 === 0);

              // Choose aspect ratio based on wireframe rhythm
              let aspectClass = 'aspect-[16/9] sm:aspect-[16/8]';
              if (!isFullWidth) {
                // Alternating portrait / landscape pairs like wireframe
                aspectClass = (Math.floor(idx / 2) % 2 === 1)
                  ? 'aspect-[3/4]'
                  : 'aspect-[16/10]';
              }

              return (
                <div
                  key={project._id || `work-${idx}`}
                  className={isFullWidth ? 'sm:col-span-2' : 'sm:col-span-1'}
                >
                  <MediaCard
                    project={project}
                    aspect={aspectClass}
                    delay={idx * 0.05}
                    large={isFullWidth}
                    onSelect={() => {
                      trackProjectView(project.title, project.category);
                      onSelectProject(project);
                    }}
                  />
                </div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty state safeguard if no items in filter */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-[#0B0D0C]/60 font-semibold">
            No uploaded works found in this category.
          </div>
        )}

        {/* Mobile Archive Button */}
        <motion.div
          className="sm:hidden mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={onOpenArchive}
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-black bg-white/60 text-sm font-bold text-[#0B0D0C] hover:bg-[#0B0D0C] hover:text-[#FFFAB3] uppercase tracking-widest transition-all shadow-[3px_3px_0px_#0B0D0C]"
          >
            Full Archive ({uploadedProjects.length})
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Studio Services Teaser Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 sm:mt-24 p-8 sm:p-10 rounded-3xl border-2 border-black bg-[#0B0D0C] text-[#FFFAB3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[6px_6px_0px_#50BF8E]"
        >
          <div>
            <p className="text-[11px] font-black tracking-[0.2em] uppercase text-[#50BF8E] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 fill-[#50BF8E]" />
              Cinematography Studio · Nigeria — Worldwide
            </p>
            <h3
              className="text-2xl sm:text-3xl font-black text-white tracking-tight"
              style={{ fontFamily: 'var(--font-encode-sans)' }}
            >
              Available for Worldwide Engagements
            </h3>
            <p className="text-sm text-white/60 mt-1">
              Film · Music Video · Documentary · Creative Direction · Photography
            </p>
          </div>
          <Link
            href="/services"
            className="flex-shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#50BF8E] hover:bg-[#3DA376] text-[#0B0D0C] font-black text-sm uppercase tracking-widest transition-all shadow-[3px_3px_0px_#FFFAB3] hover:scale-105 active:scale-95"
          >
            View Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── MediaCard Component with Category Brand Strokes & Wireframe Bottom Bar ───

function MediaCard({
  project,
  aspect,
  delay = 0,
  large = false,
  onSelect,
}: {
  project: Project;
  aspect: string;
  delay?: number;
  large?: boolean;
  onSelect: () => void;
}) {
  const theme = getCategoryTheme(project.category);

  const thumb = project.poster
    ? urlFor(project.poster).width(large ? 1600 : 900).height(large ? 900 : 700).url()
    : project.youtubeId
    ? `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`
    : '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.012 }}
      className={`group relative w-full flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0B0D0C] cursor-pointer shadow-xl border-2 sm:border-[3px] ${theme.border} transition-all duration-300 ${theme.shadow}`}
      onClick={onSelect}
      data-cursor="WATCH"
    >
      {/* Media Viewport */}
      <div className={`relative w-full ${aspect} overflow-hidden bg-[#0B0D0C]`}>
        {thumb && (
          <Image
            src={thumb}
            alt={project.title}
            fill
            className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Play dot */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFFAB3] border-2 border-[#0B0D0C] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#50BF8E] transition-all duration-300">
          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-[#0B0D0C] text-[#0B0D0C] ml-0.5" />
        </div>
      </div>

      {/* Wireframe-exact Bottom Bar in Category Brand Color */}
      <div
        className={`w-full ${theme.barBg} ${theme.text} px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between border-t-2 ${theme.border}`}
      >
        <div className="truncate pr-2">
          <h3
            className="text-sm sm:text-base font-black tracking-tight truncate"
            style={{ fontFamily: 'var(--font-encode-sans)' }}
          >
            {project.title}
          </h3>
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
            {project.category?.replace(/-/g, ' ')}
          </span>
        </div>
        <span className="text-xs sm:text-sm font-mono font-black flex-shrink-0">
          {project.year || '2024'}
        </span>
      </div>
    </motion.div>
  );
}

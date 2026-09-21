'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ExternalLink, MapPin, User, Briefcase } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/lib/types';
import { urlFor } from '@/lib/sanity';
import { trackProjectView } from '@/lib/analytics';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  projects: Project[];
}

export default function ProjectModal({ project, onClose, onSelectProject, projects }: ProjectModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => { setIsPlaying(false); }, [project?._id]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!project) return null;

  const thumbnailUrl = project.poster
    ? urlFor(project.poster).width(1280).height(720).url()
    : `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`;

  const currentIndex = projects.findIndex((p) => p._id === project._id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  const metaItems = [
    project.role    && { icon: User,      label: 'Role',    value: project.role },
    project.client  && { icon: Briefcase, label: 'Client',  value: project.client },
    project.year    && { icon: MapPin,    label: 'Year',    value: String(project.year) },
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-start p-4 sm:p-8">
        {/* Backdrop dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#111312] rounded-3xl overflow-hidden shadow-2xl border border-white/12 z-10 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top bar */}
          <div className="sticky top-0 z-20 px-6 py-4 bg-[#111312]/95 backdrop-blur-md flex items-center justify-between border-b border-white/8">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#50BF8E]/20 border border-[#50BF8E]/40 text-[#50BF8E] text-[10px] font-black uppercase tracking-widest capitalize">
                {project.category.replace(/-/g, ' ')}
              </span>
              {project.year && (
                <span className="text-xs font-mono text-white/30">{project.year}</span>
              )}
            </div>
            <button
              onClick={onClose}
              data-cursor="CLOSE"
              className="p-2 rounded-full bg-white/8 hover:bg-white/15 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video / Thumbnail */}
          <div className="relative w-full aspect-video bg-black overflow-hidden">
            {!isPlaying ? (
              <div
                className="group relative w-full h-full cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <Image
                  src={thumbnailUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 1024px"
                  priority
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.93 }}
                    className="w-18 h-18 sm:w-20 sm:h-20 w-[72px] h-[72px] rounded-full bg-[#FFFAB3] flex items-center justify-center shadow-2xl"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&modestbranding=1&rel=0&color=white`}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Title + Meta */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <h2
                className="text-3xl sm:text-5xl font-black text-white tracking-tight capitalize"
                style={{ fontFamily: 'var(--font-encode-sans)' }}
              >
                {project.title}
              </h2>
              {metaItems.length > 0 && (
                <div className="flex flex-row sm:flex-col gap-3 flex-shrink-0">
                  {metaItems.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#F4F4F0]/30">{label}</span>
                      <span className="text-xs font-semibold text-[#F4F4F0]/70">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {project.description && (
              <p className="text-[#F4F4F0]/60 text-base leading-relaxed max-w-2xl">
                {project.description}
              </p>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/6 border border-white/10 text-[11px] text-[#F4F4F0]/50 font-semibold tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Whitechapel note */}
            {project.title === 'Under the Hood' && (
              <a
                href="https://www.whitechapelgallery.org/events/free-writers-to/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-[#DFB143]/10 border border-[#DFB143]/25 hover:border-[#DFB143]/50 transition-all group"
              >
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#DFB143] mb-0.5">Exhibition</p>
                  <p className="text-sm font-semibold text-[#F4F4F0]/80 group-hover:text-[#F4F4F0] transition-colors">
                    free-Writers to — Whitechapel Gallery, London (2024)
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#DFB143]/50 group-hover:text-[#DFB143] ml-auto flex-shrink-0 transition-colors" />
              </a>
            )}

            {/* Prev / Next navigation */}
            <div className="flex gap-4 pt-2">
              {prevProject && prevProject._id !== project._id && (
                <button
                  onClick={() => { trackProjectView(prevProject.title, prevProject.category); onSelectProject(prevProject); }}
                  className="flex-1 p-4 bg-white/4 hover:bg-white/8 rounded-2xl border border-white/8 hover:border-[#50BF8E]/30 flex items-center gap-3 cursor-pointer transition-all text-left group"
                  data-cursor="VIEW"
                >
                  <ChevronRight className="w-5 h-5 text-white/30 rotate-180 group-hover:text-[#50BF8E] transition-colors flex-shrink-0" />
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-widest text-[#F4F4F0]/25">Previous</span>
                    <p className="text-sm font-bold text-[#F4F4F0]/70 group-hover:text-[#50BF8E] transition-colors truncate">{prevProject.title}</p>
                  </div>
                </button>
              )}
              {nextProject && nextProject._id !== project._id && (
                <button
                  onClick={() => { trackProjectView(nextProject.title, nextProject.category); onSelectProject(nextProject); }}
                  className="flex-1 p-4 bg-white/4 hover:bg-white/8 rounded-2xl border border-white/8 hover:border-[#50BF8E]/30 flex items-center justify-between gap-3 cursor-pointer transition-all text-right group"
                  data-cursor="VIEW"
                >
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-widest text-[#F4F4F0]/25">Next</span>
                    <p className="text-sm font-bold text-[#F4F4F0]/70 group-hover:text-[#50BF8E] transition-colors truncate">{nextProject.title}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-[#50BF8E] transition-colors flex-shrink-0" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

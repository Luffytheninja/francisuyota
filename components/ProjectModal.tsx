'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/projectsData';
import { urlFor } from '@/lib/sanity';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  projects: Project[];
}

export default function ProjectModal({ project, onClose, onSelectProject, projects }: ProjectModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Reset player state when project changes
  useEffect(() => {
    setIsPlaying(false);
  }, [project?._id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const thumbnailUrl = project.poster
    ? urlFor(project.poster).width(1280).height(720).url()
    : `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`;

  // Find next project
  const currentIndex = projects.findIndex((p) => p._id === project._id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] overflow-y-auto bg-black/90 backdrop-blur-xl flex flex-col items-center justify-start text-white p-4 sm:p-8">
        {/* Backdrop / Dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0"
          onClick={onClose}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#0E100F] rounded-3xl overflow-hidden shadow-2xl border border-white/15 z-10 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="sticky top-0 z-20 px-6 py-4 bg-[#0E100F]/90 backdrop-blur-md flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full bg-[#D4F88D] text-black text-[10px] font-black uppercase tracking-wider capitalize">
                {project.category.replace(/-/g, ' ')}
              </span>
            </div>
            <button
              onClick={onClose}
              data-cursor="CLOSE"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Video / Thumbnail */}
          <div className="relative w-full aspect-video sm:aspect-[2.35/1] bg-black overflow-hidden">
            {!isPlaying ? (
              /* Thumbnail with Play button */
              <div
                className="group relative w-full h-full cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <Image
                  src={thumbnailUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1024px"
                  priority
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#D4F88D] text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 ml-1">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              /* YouTube iframe — loads only on tap */
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-1 font-display-title capitalize">
                {project.title}
              </h2>
            </div>

            {/* Next Project Teaser */}
            {nextProject && (
              <div
                onClick={() => onSelectProject(nextProject)}
                className="group p-6 bg-gradient-to-r from-white/5 to-[#3FA360]/20 rounded-2xl border border-white/15 flex items-center justify-between cursor-pointer hover:border-[#D4F88D] transition-all"
                data-cursor="VIEW"
              >
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#D4F88D]">Next Project</span>
                  <h4 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#D4F88D] transition-colors font-display-title">
                    {nextProject.title}
                  </h4>
                  <span className="text-xs text-white/60 font-light capitalize">
                    {nextProject.category.replace(/-/g, ' ')}
                  </span>
                </div>
                <ChevronRight className="w-8 h-8 text-[#D4F88D] group-hover:translate-x-2 transition-transform" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

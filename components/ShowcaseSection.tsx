'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/projectsData';
import { urlFor } from '@/lib/sanity';

interface ShowcaseSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenArchive: () => void;
}

export default function ShowcaseSection({ projects, onSelectProject, onOpenArchive }: ShowcaseSectionProps) {
  return (
    <section id="showcase" className="w-full bg-[#3FA360] text-white pt-20 pb-12 px-4 sm:px-8 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#D4F88D] font-display-title">
            Showcase
          </h2>
          <button
            onClick={onOpenArchive}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider bg-[#D4F88D] text-[#141716] hover:bg-[#c4eb74] shadow-md transition-all active:scale-95"
          >
            Categories
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="py-12 text-center text-[#D4F88D]/80 text-sm font-mono">
            No projects available yet. Add projects in Sanity Studio.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <ShowcaseCard
                key={project._id}
                project={project}
                index={index}
                onSelect={() => onSelectProject(project)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ShowcaseCard({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  const thumbnailUrl = project.poster
    ? urlFor(project.poster).width(600).height(800).url()
    : `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex flex-col bg-[#0E100F] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      data-cursor="PLAY"
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[3/4] bg-[#0E100F] overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-500 ${isHovered ? 'scale-105' : 'scale-100 opacity-90'}`}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-[#D4F88D] text-black flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 fill-black ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
          <h3 className="text-base sm:text-lg font-black text-white leading-tight truncate font-display-title">
            {project.title}
          </h3>
          <p className="text-[11px] font-light text-white/70 truncate font-editorial-body capitalize">
            {project.category.replace(/-/g, ' ')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

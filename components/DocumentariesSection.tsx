'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/projectsData';
import { urlFor } from '@/lib/sanity';

interface DocumentariesSectionProps {
  documentaries: Project[];
  onSelectProject: (project: Project) => void;
}

export default function DocumentariesSection({ documentaries, onSelectProject }: DocumentariesSectionProps) {
  return (
    <section id="documentaries" className="w-full bg-[#3FA360] text-white pt-8 pb-12 px-4 sm:px-8 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#D4F88D] font-display-title">
            Documentaries
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {documentaries.slice(0, 2).map((doc, index) => (
            <DocCard
              key={doc._id}
              project={doc}
              index={index}
              onSelect={() => onSelectProject(doc)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function DocCard({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  const thumbnailUrl = project.poster
    ? urlFor(project.poster).width(900).height(563).url()
    : `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col bg-[#0E100F] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl cursor-pointer transition-all duration-300 hover:scale-[1.015]"
      data-cursor="PLAY"
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-video sm:aspect-[16/10] bg-[#0E100F] overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={project.title}
          fill
          className={`object-cover transition-all duration-500 ${isHovered ? 'scale-105' : 'scale-100 opacity-90'}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 pointer-events-none ${
            isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-[#D4F88D] text-black flex items-center justify-center shadow-2xl">
            <Play className="w-6 h-6 fill-black ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight font-display-title">
            {project.title}
          </h3>
          <p className="text-xs font-light text-white/70 mt-0.5 font-editorial-body capitalize">
            {project.category.replace(/-/g, ' ')}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

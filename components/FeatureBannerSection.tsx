'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/projectsData';
import { urlFor } from '@/lib/sanity';

interface FeatureBannerSectionProps {
  project: Project;
  onOpenShowreel: () => void;
  onSelectProject: (p: Project) => void;
}

export default function FeatureBannerSection({ project, onOpenShowreel, onSelectProject }: FeatureBannerSectionProps) {
  const thumbnailUrl = project.poster
    ? urlFor(project.poster).width(1600).height(680).url()
    : `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`;

  return (
    <div className="w-full bg-[#3FA360] pb-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div
          className="group relative w-full aspect-video sm:aspect-[2.35/1] bg-[#0B0D0C] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
          data-cursor="WATCH"
          onClick={() => onSelectProject(project)}
        >
          {/* Background poster image */}
          <Image
            src={thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            sizes="(max-width: 768px) 100vw, 1600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D4F88D] text-black flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform"
            >
              <Play className="w-7 h-7 fill-black ml-1" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

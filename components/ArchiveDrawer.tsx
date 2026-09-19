'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/projectsData';
import { urlFor } from '@/lib/sanity';

interface ArchiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  projects: Project[];
}

export default function ArchiveDrawer({ isOpen, onClose, onSelectProject, projects }: ArchiveDrawerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!isOpen) return null;

  const dynamicCategories = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean))
  ).sort();
  const categories = ['All', ...dynamicCategories];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getThumbnail = (p: Project) => {
    if (p.poster) return urlFor(p.poster).width(96).height(96).url();
    return `https://img.youtube.com/vi/${p.youtubeId}/hqdefault.jpg`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] bg-black/85 backdrop-blur-md flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0"
          onClick={onClose}
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl h-full bg-[#0E100F] border-l border-white/10 text-white p-6 sm:p-10 flex flex-col justify-between overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#D4F88D]">
                Complete Filmography
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display-title mt-0.5">
                Archive &amp; Project Index
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Category Filter */}
          <div className="py-6 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-white/50 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#D4F88D] transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors capitalize ${
                    selectedCategory === cat
                      ? 'bg-[#D4F88D] text-black'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {cat.replace(/-/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Projects List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-2">
            {filteredProjects.length === 0 ? (
              <div className="py-12 text-center text-white/50 text-sm">
                No matching projects found.
              </div>
            ) : (
              filteredProjects.map((p, idx) => (
                <div
                  key={p._id}
                  onClick={() => {
                    onClose();
                    onSelectProject(p);
                  }}
                  className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#D4F88D]/40 transition-all flex items-center justify-between cursor-pointer"
                  data-cursor="VIEW"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-white/40">
                      0{idx + 1}
                    </span>
                    <div className="w-12 h-12 rounded-lg bg-black overflow-hidden relative shrink-0">
                      <Image
                        src={getThumbnail(p)}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-white group-hover:text-[#D4F88D] transition-colors font-display-title">
                        {p.title}
                      </h4>
                      <p className="text-xs text-white/60 font-light capitalize">
                        {p.category.replace(/-/g, ' ')}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-[#D4F88D] group-hover:translate-x-0.5 transition-all" />
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span>Showing {filteredProjects.length} of {projects.length} cinematic works</span>
            <span>DaVinci Studio 19 LUTs available</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

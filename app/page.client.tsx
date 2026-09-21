'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import Loader from '@/components/Loader';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import ContactSection from '@/components/ContactSection';
import ProjectModal from '@/components/ProjectModal';
import ShowreelModal from '@/components/ShowreelModal';
import ArchiveDrawer from '@/components/ArchiveDrawer';
import type { Project } from '@/lib/types';

interface PageClientProps {
  projects: Project[];
}

export default function PageClient({ projects }: PageClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const heroProject = projects[0] ?? null;

  return (
    <>
      {/* Cinematic zoom intro loader */}
      <Loader onComplete={() => {}} />

      <main className="relative bg-[#FFFAB3] text-[#0B0D0C] overflow-x-hidden selection:bg-[#50BF8E] selection:text-[#0B0D0C]">
        {/* Desktop contextual cursor */}
        <CustomCursor />

        {/* Global navigation */}
        <Navbar
          projectsCount={projects.length}
          onOpenShowreel={() => setIsShowreelOpen(true)}
          onOpenArchive={() => setIsArchiveOpen(true)}
        />

        {/* 1 – Hero: Center-balanced composition + responsive dual-mode video viewport */}
        <HeroSection
          projects={projects}
          heroProject={heroProject}
          onOpenShowreel={() => setIsShowreelOpen(true)}
          onSelectProject={(p) => setSelectedProject(p)}
        />

        {/* 2 – Editorial Statement: Wireframe black statement section */}
        <AboutSection />

        {/* 3 – Works: Selected project grid showing only uploaded works with category brand strokes */}
        <ShowcaseSection
          projects={projects}
          onSelectProject={(p) => setSelectedProject(p)}
          onOpenArchive={() => setIsArchiveOpen(true)}
        />

        {/* 4 – Contact: Wireframe sky-blue contact section with giant typography */}
        <ContactSection />

        {/* ── Modals & Drawers ── */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p) => setSelectedProject(p)}
          projects={projects}
        />

        <ShowreelModal
          isOpen={isShowreelOpen}
          onClose={() => setIsShowreelOpen(false)}
        />

        <ArchiveDrawer
          isOpen={isArchiveOpen}
          onClose={() => setIsArchiveOpen(false)}
          onSelectProject={(p) => setSelectedProject(p)}
          projects={projects}
        />
      </main>
    </>
  );
}

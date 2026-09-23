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
import { StackCard } from '@/components/StackedSections';
import type { Project } from '@/lib/types';

interface PageClientProps {
  projects: Project[];
}

const TOTAL_SECTIONS = 4;

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

        {/* Global navigation — sits above stack */}
        <Navbar
          projectsCount={projects.length}
          onOpenShowreel={() => setIsShowreelOpen(true)}
          onOpenArchive={() => setIsArchiveOpen(true)}
        />

        {/* ── Stacked Card Sections ── */}

        {/* 1 – Hero */}
        <StackCard index={0} total={TOTAL_SECTIONS}>
          <HeroSection
            projects={projects}
            heroProject={heroProject}
            onOpenShowreel={() => setIsShowreelOpen(true)}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        </StackCard>

        {/* 2 – About / Editorial Statement */}
        <StackCard index={1} total={TOTAL_SECTIONS}>
          <AboutSection />
        </StackCard>

        {/* 3 – Works */}
        <StackCard index={2} total={TOTAL_SECTIONS}>
          <ShowcaseSection
            projects={projects}
            onSelectProject={(p) => setSelectedProject(p)}
            onOpenArchive={() => setIsArchiveOpen(true)}
          />
        </StackCard>

        {/* 4 – Contact (last card — no scale-down) */}
        <StackCard index={3} total={TOTAL_SECTIONS}>
          <ContactSection />
        </StackCard>

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

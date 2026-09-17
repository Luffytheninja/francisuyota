'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/components/HeroSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import MoviesSection from '@/components/MoviesSection';
import DocumentariesSection from '@/components/DocumentariesSection';
import ViewMoreSection from '@/components/ViewMoreSection';
import FeatureBannerSection from '@/components/FeatureBannerSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import ProjectModal from '@/components/ProjectModal';
import ShowreelModal from '@/components/ShowreelModal';
import ArchiveDrawer from '@/components/ArchiveDrawer';
import { Project } from '@/lib/projectsData';

interface PageClientProps {
  projects: Project[];
}

export default function PageClient({ projects }: PageClientProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  const heroProject = projects[0] ?? null;
  const featureBannerProject = projects[1] ?? projects[0] ?? null;

  // Filter by Sanity category values
  const showcaseProjects = projects.filter(
    (p) => p.category === 'documentary' || p.category === 'music' || p.category === 'fashion' || p.category === 'short-films'
  );
  const eventsProjects = projects.filter((p) => p.category === 'events');
  const gradedProjects = projects.filter((p) => p.category === 'graded-edited');
  const picnicProjects = projects.filter((p) => p.category === 'picnic');

  return (
    <main className="relative min-h-screen bg-[#0E100F] text-[#141716] overflow-x-hidden">
      {/* Desktop Contextual Cursor */}
      <CustomCursor />

      {/* Global Minimal Header Navigation */}
      <Navbar
        onOpenShowreel={() => setIsShowreelOpen(true)}
        onOpenArchive={() => setIsArchiveOpen(true)}
      />

      {/* Section 1: Hero Showreel */}
      <HeroSection
        projects={projects}
        heroProject={heroProject}
        onOpenShowreel={() => setIsShowreelOpen(true)}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Section 2: Showcase — all projects grid */}
      <ShowcaseSection
        projects={projects}
        onSelectProject={(p) => setSelectedProject(p)}
        onOpenArchive={() => setIsArchiveOpen(true)}
      />

      {/* Section 3: Movies / Events placeholder */}
      <MoviesSection
        movies={eventsProjects.length > 0 ? eventsProjects : projects.slice(0, 2)}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Section 4: Documentaries */}
      <DocumentariesSection
        documentaries={
          projects.filter((p) => p.category === 'documentary').length > 0
            ? projects.filter((p) => p.category === 'documentary')
            : projects.slice(0, 2)
        }
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Section 5: View More */}
      <ViewMoreSection onOpenArchive={() => setIsArchiveOpen(true)} />

      {/* Section 6: Feature Visual Frame Banner */}
      {featureBannerProject && (
        <FeatureBannerSection
          project={featureBannerProject}
          onOpenShowreel={() => setIsShowreelOpen(true)}
          onSelectProject={(p) => setSelectedProject(p)}
        />
      )}

      {/* Section 7: About Me */}
      <AboutSection />

      {/* Section 8: Contact Me */}
      <ContactSection />

      {/* Interactive Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
        projects={projects}
      />

      {/* Interactive 4K Fullscreen Showreel Modal */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />

      {/* Complete Project Archive & Search Drawer */}
      <ArchiveDrawer
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        onSelectProject={(p) => setSelectedProject(p)}
        projects={projects}
      />
    </main>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenShowreel: () => void;
  onOpenArchive: () => void;
  projectsCount?: number;
}

export default function Navbar({ onOpenShowreel, onOpenArchive, projectsCount = 0 }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#0B0D0C]/85 backdrop-blur-md text-white border-b border-white/10 shadow-lg'
            : 'py-6 bg-transparent text-[#141716]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="group flex items-center gap-2"
          >
            <span
              className={`text-xl sm:text-2xl font-black tracking-tighter uppercase transition-colors duration-300 ${
                isScrolled ? 'text-[#D4F88D]' : 'text-[#141716] group-hover:text-[#43B07E]'
              }`}
              style={{ fontFamily: 'var(--font-slackey)' }}
            >
              UYOTA
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10">
              DoP / Cinematography
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <button
              onClick={() => scrollToSection('showcase')}
              className={`transition-colors hover:opacity-100 ${
                isScrolled ? 'text-white/80 hover:text-[#D4F88D]' : 'text-[#141716]/80 hover:text-black'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => scrollToSection('movies')}
              className={`transition-colors hover:opacity-100 ${
                isScrolled ? 'text-white/80 hover:text-[#D4F88D]' : 'text-[#141716]/80 hover:text-black'
              }`}
            >
              Work & Films
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`transition-colors hover:opacity-100 ${
                isScrolled ? 'text-white/80 hover:text-[#D4F88D]' : 'text-[#141716]/80 hover:text-black'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`transition-colors hover:opacity-100 ${
                isScrolled ? 'text-white/80 hover:text-[#D4F88D]' : 'text-[#141716]/80 hover:text-black'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Pill Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenArchive}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border transition-all ${
                isScrolled
                  ? 'border-white/20 text-white/90 hover:bg-white/10'
                  : 'border-black/20 text-black hover:bg-black/10'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#D4F88D]" />
              Index ({projectsCount < 10 ? `0${projectsCount}` : projectsCount})
            </button>

            <button
              onClick={onOpenShowreel}
              data-cursor="WATCH"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#141716] text-[#D4F88D] hover:bg-black hover:scale-105 active:scale-95 text-xs font-black tracking-wider uppercase shadow-md transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-[#D4F88D]" />
              <span className="hidden sm:inline">Watch Reel</span>
              <span className="sm:hidden">Reel</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0E100F] text-white pt-28 px-8 flex flex-col justify-between pb-12 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-black uppercase tracking-tight">
              <button
                onClick={() => scrollToSection('showcase')}
                className="text-left py-2 border-b border-white/10 hover:text-[#D4F88D] transition-colors"
              >
                01 / Videos & Showcase
              </button>
              <button
                onClick={() => scrollToSection('movies')}
                className="text-left py-2 border-b border-white/10 hover:text-[#D4F88D] transition-colors"
              >
                02 / Feature Films & Docs
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left py-2 border-b border-white/10 hover:text-[#D4F88D] transition-colors"
              >
                03 / About Cinematographer
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left py-2 border-b border-white/10 hover:text-[#D4F88D] transition-colors"
              >
                04 / Contact & Enquiries
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenArchive();
                }}
                className="text-left py-2 border-b border-white/10 text-[#D4F88D] flex items-center justify-between"
              >
                <span>Full Project Archive</span>
                <span className="text-sm font-normal text-white/50">{projectsCount} {projectsCount === 1 ? 'Project' : 'Projects'}</span>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShowreel();
                }}
                className="w-full py-4 rounded-xl bg-[#D4F88D] text-black font-black uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-black" />
                Play Full Showreel (2026)
              </button>
              <div className="flex justify-between text-xs text-white/50 pt-4">
                <span>Lagos / London / Worldwide</span>
                <span>hello@uyota.film</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Menu } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onOpenShowreel: () => void;
  onOpenArchive: () => void;
  projectsCount?: number;
}

const navLinks = [
  { label: '01 / Uyota Verse', href: '#hero', scroll: 'hero' },
  { label: '02 / Works', href: '#works', scroll: 'works' },
  { label: '03 / Services', href: '/services', scroll: null },
  { label: '04 / Contact', href: '#contact', scroll: 'contact' },
];

export default function Navbar({ onOpenShowreel, onOpenArchive, projectsCount = 0 }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string | null) => {
    setMenuOpen(false);
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? 'py-3 bg-[#FFFAB3]/90 backdrop-blur-lg border-b border-black/10 shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}
            className="group flex flex-col leading-none cursor-pointer"
          >
            <span
              className="text-base sm:text-lg font-black text-[#0B0D0C] tracking-tight group-hover:text-[#50BF8E] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-encode-sans)' }}
            >
              Francis Uyota
            </span>
            <span className="text-[10px] font-semibold text-[#0B0D0C]/60 tracking-widest uppercase">
              Filmmaker · Ibadan
            </span>
          </a>

          {/* Desktop Floating Nav Pill matching wireframe */}
          <nav className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#50BF8E] border border-black/15 shadow-md shadow-[#50BF8E]/20">
            {navLinks.map((link) =>
              link.scroll ? (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.scroll)}
                  className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-[#0B0D0C] hover:bg-black/10 transition-colors"
                  style={{ fontFamily: 'var(--font-encode-sans)' }}
                >
                  {link.label.split('/ ')[1]}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-[#0B0D0C] hover:bg-black/10 transition-colors"
                  style={{ fontFamily: 'var(--font-encode-sans)' }}
                >
                  {link.label.split('/ ')[1]}
                </Link>
              )
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Contact Me CTA from wireframe */}
            <button
              onClick={() => scrollTo('contact')}
              className="hidden lg:block text-xs font-bold tracking-widest uppercase text-[#0B0D0C] hover:text-[#50BF8E] transition-colors py-2 px-1"
              style={{ fontFamily: 'var(--font-encode-sans)' }}
            >
              Contact Me
            </button>

            {/* Showreel CTA */}
            <button
              onClick={onOpenShowreel}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B0D0C] hover:bg-[#1A1D1B] text-[#FFFAB3] text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-md hover:shadow-black/20 hover:scale-105 active:scale-95"
            >
              <Play className="w-3 h-3 fill-[#FFFAB3]" />
              Showreel
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-black/20 hover:border-black bg-black/5 text-[#0B0D0C] transition-all duration-200"
              aria-label="Toggle Menu"
            >
              <Menu className="w-4 h-4 text-[#0B0D0C]" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-Screen Menu Overlay ────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-[#FFFAB3] text-[#0B0D0C] flex flex-col"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-black/10">
              <span
                className="text-xl font-black text-[#0B0D0C]"
                style={{ fontFamily: 'var(--font-encode-sans)' }}
              >
                Francis Uyota
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2.5 rounded-full bg-black/5 hover:bg-black/10 text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-14 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                >
                  {link.scroll ? (
                    <button
                      onClick={() => scrollTo(link.scroll)}
                      className="group w-full text-left py-4 border-b border-black/10 flex items-baseline gap-4 hover:border-[#50BF8E] transition-colors"
                    >
                      <span className="text-xs font-mono text-black/40">{`0${i + 1}`}</span>
                      <span
                        className="text-4xl sm:text-6xl font-black uppercase text-black/80 group-hover:text-[#50BF8E] transition-colors tracking-tight"
                        style={{ fontFamily: 'var(--font-encode-sans)' }}
                      >
                        {link.label.split('/ ')[1]}
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group w-full text-left py-4 border-b border-black/10 flex items-baseline gap-4 hover:border-[#50BF8E] transition-colors"
                    >
                      <span className="text-xs font-mono text-black/40">{`0${i + 1}`}</span>
                      <span
                        className="text-4xl sm:text-6xl font-black uppercase text-black/80 group-hover:text-[#50BF8E] transition-colors tracking-tight"
                        style={{ fontFamily: 'var(--font-encode-sans)' }}
                      >
                        {link.label.split('/ ')[1]}
                      </span>
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Archive Link */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.38, duration: 0.4 }}
                onClick={() => { setMenuOpen(false); onOpenArchive(); }}
                className="group w-full text-left py-4 border-b border-black/10 flex items-baseline justify-between hover:border-[#50BF8E] transition-colors"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono text-black/40">05</span>
                  <span
                    className="text-4xl sm:text-6xl font-black uppercase text-[#0B0D0C] group-hover:text-[#50BF8E] transition-colors tracking-tight"
                    style={{ fontFamily: 'var(--font-encode-sans)' }}
                  >
                    Archive
                  </span>
                </div>
                <span className="text-sm font-mono text-black/40 self-center">
                  {projectsCount} Works
                </span>
              </motion.button>
            </div>

            {/* Menu Footer */}
            <div className="px-6 sm:px-14 pb-8 pt-6 border-t border-black/10 flex items-center justify-between">
              <button
                onClick={() => { setMenuOpen(false); onOpenShowreel(); }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#50BF8E] hover:bg-[#3DA376] text-black font-bold text-sm uppercase tracking-widest transition-all shadow-md active:scale-95"
              >
                <Play className="w-4 h-4 fill-black" />
                Watch Showreel
              </button>
              <div className="flex flex-col text-right text-xs text-black/50 font-medium">
                <span>Lagos / Ibadan</span>
                <span>Worldwide</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

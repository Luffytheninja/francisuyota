'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Globe, Camera, Film, Palette, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import type { Service } from '@/lib/types';
import Navbar from '@/components/Navbar';

interface ServicesClientProps {
  services: Service[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  '🎬': <Film className="w-7 h-7" />,
  '✈️': <Globe className="w-7 h-7" />,
  '🎨': <Palette className="w-7 h-7" />,
  '📷': <Camera className="w-7 h-7" />,
};

const GEAR = [
  { category: 'Cameras', items: ['ARRI Alexa 35', 'ARRI Alexa Mini LF', 'RED V-Raptor 8K', 'Sony FX9 & FX6', '16mm Bolex H16'] },
  { category: 'Optics', items: ['Cooke Anamorphic /i', 'Atlas Orion 2X', 'Zeiss Supreme Radiance', 'Leica R Vintage Cine-Mods'] },
  { category: 'Lighting', items: ['Astera Titan Tubes', 'Aputure Electro Storm 2600W', 'ARRI SkyPanel S60-C', 'DJI Ronin 2 Pro'] },
  { category: 'Post', items: ['DaVinci Resolve Studio 19', 'ACES Pipeline', 'Custom Film LUTs', 'HDR Monitoring'] },
];

export default function ServicesClient({ services }: ServicesClientProps) {
  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  return (
    <div className="relative min-h-screen bg-[#FFFAB3] text-[#0B0D0C]">
      <Navbar
        onOpenShowreel={() => {}}
        onOpenArchive={() => {}}
        projectsCount={0}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 px-5 sm:px-8 lg:px-12 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-1 bg-[#50BF8E]" />
              <span className="text-xs font-black tracking-[0.2em] uppercase text-[#0B0D0C]/70">
                What We Offer
              </span>
            </div>
            <h1
              className="text-5xl sm:text-7xl md:text-8xl font-black text-[#0B0D0C] tracking-tight leading-[0.88] mb-6"
              style={{ fontFamily: 'var(--font-encode-sans)' }}
            >
              Services &amp;<br />
              <span className="text-[#50BF8E]">Studio</span>
            </h1>
            <p className="text-base sm:text-lg text-[#0B0D0C]/75 max-w-xl leading-relaxed font-medium">
              A full-service cinematography studio based in Ibadan, Nigeria. Freelance shoots available worldwide — from Lagos to London and beyond.
            </p>
          </motion.div>

          {/* Studio location badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            {[
              { icon: MapPin, label: 'Ibadan Studio, Nigeria', color: '#0B0D0C' },
              { icon: Globe, label: 'Worldwide Freelance', color: '#0B0D0C' },
              { icon: Film, label: 'Film · MV · Docu · Commercial', color: '#0B0D0C' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border-2 border-black/15 text-xs font-bold uppercase tracking-wider text-[#0B0D0C] shadow-sm"
              >
                <Icon className="w-3.5 h-3.5" style={{ color }} />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services Grid ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              className="group flex flex-col p-8 sm:p-10 rounded-3xl bg-[#0B0D0C] text-[#FFFAB3] border-2 border-black hover:border-[#50BF8E] transition-all duration-300 hover:shadow-[6px_6px_0px_#50BF8E]"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-[#50BF8E] text-[#0B0D0C] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                {ICON_MAP[service.icon ?? ''] ?? <Film className="w-7 h-7" />}
              </div>

              {/* Tags */}
              {service.tags && service.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {service.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-bold tracking-wide text-[#FFFAB3]/70 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h3
                className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3 group-hover:text-[#50BF8E] transition-colors"
                style={{ fontFamily: 'var(--font-encode-sans)' }}
              >
                {service.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed flex-1 mb-8">
                {service.description}
              </p>

              {service.ctaLabel && (
                <a
                  href={service.ctaLink ?? '#contact'}
                  onClick={service.ctaLink?.startsWith('#') ? (e) => { e.preventDefault(); scrollToContact(); } : undefined}
                  className="self-start flex items-center gap-2 px-6 py-3 rounded-full bg-[#50BF8E] text-[#0B0D0C] text-xs font-black uppercase tracking-widest hover:bg-[#3DA376] transition-all duration-200 shadow-md active:scale-95"
                >
                  {service.ctaLabel}
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Gear Locker ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-12 border-t-2 border-black/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-xs font-black tracking-[0.2em] uppercase text-[#0B0D0C]/70 mb-2">What We Shoot With</p>
            <h2
              className="text-4xl sm:text-5xl font-black text-[#0B0D0C] tracking-tight"
              style={{ fontFamily: 'var(--font-encode-sans)' }}
            >
              Gear Locker
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {GEAR.map(({ category, items }, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="p-5 rounded-2xl bg-[#0B0D0C] text-[#FFFAB3] border-2 border-black shadow-[4px_4px_0px_#50BF8E]"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-[#50BF8E] mb-3">{category}</p>
                <ul className="flex flex-col gap-1.5">
                  {items.map((item) => (
                    <li key={item} className="text-xs text-white/80 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#50BF8E] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Whitechapel Highlight ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-5 sm:px-8 lg:px-12 border-t-2 border-black/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-3xl bg-[#0B0D0C] text-[#FFFAB3] border-2 border-black shadow-[6px_6px_0px_#DFB143]"
          >
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#DFB143] text-[#0B0D0C] text-[10px] font-black uppercase tracking-widest mb-5">
              ✦ Selected Exhibition
            </span>
            <h3
              className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-encode-sans)' }}
            >
              Under the Hood (2024)
            </h3>
            <p className="text-white/80 text-base max-w-2xl leading-relaxed mb-6 font-medium">
              Selected by artist Andrew Pierre Hart for the <em>free-Writers to</em> screening programme at the <strong className="text-white">Whitechapel Gallery, London</strong>. The film explores themes of death, loss, and rebirth — examining the relationship between human consciousness and visual RGB spectrums.
            </p>
            <a
              href="https://www.whitechapelgallery.org/events/free-writers-to/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#DFB143] hover:bg-[#c99e34] text-[#0B0D0C] text-xs font-black uppercase tracking-widest transition-all shadow-[2px_2px_0px_#FFFAB3] active:scale-95"
            >
              View Gallery Event
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 border-t-2 border-black/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <h2
              className="text-4xl sm:text-5xl font-black text-[#0B0D0C] tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-encode-sans)' }}
            >
              Ready to create?
            </h2>
            <p className="text-[#0B0D0C]/70 text-base font-semibold">Let&apos;s discuss your next project.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToContact}
              className="flex items-center gap-2 px-7 py-4 rounded-full bg-[#0B0D0C] hover:bg-[#1A1D1B] text-[#FFFAB3] font-black text-sm uppercase tracking-widest transition-all shadow-[4px_4px_0px_#50BF8E] active:scale-95"
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 px-7 py-4 rounded-full border-2 border-black bg-white/50 hover:bg-[#0B0D0C] text-[#0B0D0C] hover:text-[#FFFAB3] font-bold text-sm uppercase tracking-widest transition-all shadow-[3px_3px_0px_#0B0D0C]"
            >
              View Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

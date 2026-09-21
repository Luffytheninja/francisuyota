'use client';

import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-[#0B0D0C] text-[#FFFAB3] py-16 sm:py-24 px-5 sm:px-8 lg:px-12 relative overflow-hidden select-none">
      {/* Subtle film grain */}
      <div className="film-grain absolute inset-0 opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-start text-left relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-6 h-0.5 bg-[#50BF8E]" />
          <span
            className="text-xs sm:text-sm font-black tracking-[0.2em] uppercase text-[#50BF8E]"
            style={{ fontFamily: 'var(--font-encode-sans)' }}
          >
            Filmmaker &amp; Visionary
          </span>
          <Camera className="w-4 h-4 text-[#50BF8E]" />
        </motion.div>

        {/* Editorial Statement Copy matching wireframe */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 100, damping: 14 }}
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-[1.2] sm:leading-[1.18] tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-encode-sans)' }}
        >
          Francis Uyota moves between the camera lens and the cutting room with an editor&apos;s precision and a painter&apos;s sense of mood. Working across film, creative direction, and photography, his practice interrogates memory, sound, and visual identity.
        </motion.p>

        {/* Cheeky badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <span className="px-3.5 py-1.5 rounded-full bg-[#50BF8E]/15 border border-[#50BF8E]/40 text-[#50BF8E] text-xs font-bold uppercase tracking-wider">
            ✦ DaVinci Resolve · ARRI · 16mm
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#DFB143]/15 border border-[#DFB143]/40 text-[#DFB143] text-xs font-bold uppercase tracking-wider">
            ✦ Whitechapel Gallery Alum
          </span>
        </motion.div>
      </div>
    </section>
  );
}

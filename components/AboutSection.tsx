'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-[#F6F7F3] text-[#141716] py-20 sm:py-28 px-4 sm:px-8 lg:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Title Column matching wireframe */}
          <div className="lg:col-span-5">
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-[#141716] tracking-tight leading-none font-display-title">
              About me
            </h2>
          </div>

          {/* Right High-Contrast Editorial Bio Column matching wireframe */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-lg sm:text-xl text-[#141716]/90">
            <p className="font-light leading-relaxed font-editorial-body">
              <strong className="font-black text-[#141716]">Uyota</strong> is a Director of Photography and Colorist sculpting textured, emotionally resonant imagery. Combining mastery of large-format digital cinema sensors with vintage anamorphic glass, Uyota crafts visual languages that elevate cinematic storytelling.
            </p>

            <p className="font-light leading-relaxed font-editorial-body text-[#141716]/80">
              From commercial films and narrative cinema to intimate feature documentaries for global streaming networks, the work is anchored in deliberate lighting, organic shadow falloff, and evocative color science.
            </p>

            <p className="font-light leading-relaxed font-editorial-body text-[#141716]/80">
              Available globally for narrative features, commercial campaigns, and documentary productions.
            </p>
          </div>
        </div>

        {/* Cinematographer Video Frame Section (Empty Frame Placeholder) */}
        <div className="mt-16 sm:mt-20">
          <div
            className="group relative w-full aspect-video sm:aspect-[2.35/1] bg-[#0E100F] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-black/10 flex items-center justify-center cursor-pointer"
            data-cursor="PLAY"
          >
            {/* Ambient Background Glow / Empty Frame Canvas */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#141716] via-[#1B201D] to-[#0E100F] opacity-90" />

            {/* Subtle Crosshairs / Framing Grid Overlay */}
            <div className="absolute inset-8 sm:inset-12 border border-white/10 rounded-xl pointer-events-none flex items-center justify-center">
              <div className="w-4 h-4 border-t border-l border-[#D4F88D]/40 absolute top-0 left-0" />
              <div className="w-4 h-4 border-t border-r border-[#D4F88D]/40 absolute top-0 right-0" />
              <div className="w-4 h-4 border-b border-l border-[#D4F88D]/40 absolute bottom-0 left-0" />
              <div className="w-4 h-4 border-b border-r border-[#D4F88D]/40 absolute bottom-0 right-0" />
            </div>

            {/* Center Play Button in Empty Frame */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#D4F88D] text-black flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-black ml-1" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

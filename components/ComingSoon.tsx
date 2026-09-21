'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

interface ComingSoonProps {
  title: string;
  subtitle: string;
  description: string;
  accentColor?: string;
  backHref?: string;
}

export default function ComingSoon({
  title,
  subtitle,
  description,
  accentColor = '#50BF8E',
  backHref = '/',
}: ComingSoonProps) {
  return (
    <div className="relative min-h-screen bg-[#0B0D0C] text-[#F4F4F0] flex flex-col items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="coming-soon-grid absolute inset-0 pointer-events-none" />
      <div className="film-grain absolute inset-0 pointer-events-none opacity-50" />

      {/* Glow orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#F4F4F0]/40 hover:text-[#F4F4F0]/80 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Portfolio
          </Link>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border"
            style={{ color: accentColor, borderColor: `${accentColor}40`, backgroundColor: `${accentColor}10` }}
          >
            <Clock className="w-3.5 h-3.5" />
            Coming Soon · {subtitle}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-8xl font-black text-[#F4F4F0] tracking-tight leading-[0.85] mb-6"
          style={{ fontFamily: 'var(--font-encode-sans)' }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-[#F4F4F0]/50 leading-relaxed mb-10"
        >
          {description}
        </motion.p>

        {/* Email capture placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="w-full max-w-md flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            placeholder="Enter your email for updates"
            className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/15 text-[#F4F4F0] placeholder-white/30 focus:outline-none focus:border-[#50BF8E] text-sm transition-colors"
          />
          <button
            className="px-6 py-3.5 rounded-full font-bold text-sm uppercase tracking-widest text-black transition-all active:scale-95"
            style={{ backgroundColor: accentColor }}
          >
            Notify Me
          </button>
        </motion.div>

        {/* Francis label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 text-xs text-[#F4F4F0]/20 tracking-widest uppercase"
        >
          Francis Uyota · Ibadan, Nigeria
        </motion.p>
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';

interface ViewMoreSectionProps {
  onOpenArchive: () => void;
}

export default function ViewMoreSection({ onOpenArchive }: ViewMoreSectionProps) {
  return (
    <div className="w-full bg-[#3FA360] text-white pt-6 pb-16 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Massive View More Button matching wireframe typography */}
        <motion.button
          onClick={onOpenArchive}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center gap-4 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white hover:text-[#D4F88D] transition-colors duration-300 tracking-tight font-display-title"
          data-cursor="EXPAND"
        >
          <span>View More</span>
          <motion.span
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="inline-block text-[#D4F88D]"
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}

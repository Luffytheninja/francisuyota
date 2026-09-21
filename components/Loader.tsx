'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [isZooming, setIsZooming] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Phase 1: Show initial frame for 800ms
    const zoomTimer = setTimeout(() => {
      setIsZooming(true);
    }, 850);

    // Phase 2: Complete zoom and fade out loader after 2000ms
    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, 2200);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onClick={handleSkip}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden cursor-pointer select-none bg-[#50BF8E]"
        >
          {/* Zooming background circle expanding to off-white yellow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isZooming
                ? {
                    scale: 35,
                    opacity: 1,
                  }
                : {
                    scale: 0,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="absolute w-32 h-32 rounded-full bg-[#FFFAB3] pointer-events-none"
          />

          {/* UYOTA VERSE Text with dramatic zoom */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={
              isZooming
                ? {
                    scale: [1, 1.2, 28],
                    opacity: [1, 1, 0],
                    letterSpacing: ['0.02em', '0.08em', '0.25em'],
                  }
                : {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                  }
            }
            transition={
              isZooming
                ? {
                    duration: 1.3,
                    ease: [0.7, 0, 0.3, 1],
                  }
                : {
                    duration: 0.6,
                    ease: 'easeOut',
                  }
            }
            className="relative z-10 flex flex-col items-center justify-center text-center px-4"
          >
            <h1
              className="text-6xl sm:text-8xl md:text-9xl font-black uppercase text-[#FFFAB3] leading-[0.88] tracking-tight font-display-title drop-shadow-sm"
              style={{ fontFamily: 'var(--font-encode-sans)' }}
            >
              UYOTA<br />VERSE
            </h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

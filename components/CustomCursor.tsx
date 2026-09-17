'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'video' | 'drag' | 'close'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check for contextual cursor attributes on targets
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;

      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor') || 'VIEW';
        setCursorText(type);
        if (type === 'WATCH' || type === 'PLAY') {
          setCursorVariant('video');
        } else if (type === 'DRAG') {
          setCursorVariant('drag');
        } else if (type === 'CLOSE') {
          setCursorVariant('close');
        } else {
          setCursorVariant('hover');
        }
      } else {
        const interactive = target?.closest('a, button, input, select, textarea');
        if (interactive) {
          setCursorVariant('hover');
          setCursorText('');
        } else {
          setCursorVariant('default');
          setCursorText('');
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="custom-cursor-layer pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorVariant === 'video' ? 84 : cursorVariant === 'hover' && cursorText ? 76 : cursorVariant === 'hover' ? 32 : 12,
          height: cursorVariant === 'video' ? 84 : cursorVariant === 'hover' && cursorText ? 76 : cursorVariant === 'hover' ? 32 : 12,
          backgroundColor: cursorVariant === 'video' ? '#D4F88D' : cursorVariant === 'hover' ? 'rgba(255,255,255,0.9)' : '#141716',
          color: cursorVariant === 'video' ? '#0B0D0C' : '#0B0D0C',
          mixBlendMode: cursorVariant === 'default' ? 'normal' : 'normal',
          boxShadow: cursorVariant === 'video' ? '0 10px 30px rgba(0,0,0,0.3)' : 'none',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[11px] font-black tracking-widest uppercase text-center font-display-title"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}

'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * StackCard — wraps a single section in a sticky container.
 * As the NEXT card scrolls in, this card shrinks slightly via scale,
 * giving the impression it's being "stacked under" the new card.
 *
 * @param index - position in the stack (0-based)
 * @param total - total number of cards
 * @param children - section content
 */
export function StackCard({
  index,
  total,
  children,
}: {
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Track scroll progress within the sticky container's scroll range
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Scale the card down slightly as the next card scrolls on top
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  // Subtle brightness fade as card goes "under"
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ['brightness(1)', 'brightness(0.85)']
  );

  // Last card doesn't need to shrink — it stays full size
  const isLast = index === total - 1;

  // Top offset increases per card so each new card reveals slightly below header
  const stickyTop = 0; // all cards snap to top (under the fixed navbar)

  return (
    <div
      ref={ref}
      className="relative"
      // Each card gets scroll space equal to its own height so the next card
      // has room to scroll in on top
      style={{ paddingBottom: isLast ? 0 : '0px' }}
    >
      <div
        className="sticky"
        style={{ top: `${stickyTop}px`, zIndex: 10 + index }}
      >
        {isLast ? (
          // Last card: no scale transform needed
          <div className="origin-top">{children}</div>
        ) : (
          <motion.div
            style={{ scale, filter }}
            className="origin-top rounded-b-[2rem] overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </div>
    </div>
  );
}

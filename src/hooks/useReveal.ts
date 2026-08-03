'use client';

import type { CSSProperties } from 'react';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Scroll-reveal styling for a single element. Returns a ref plus the inline
 * style to spread — so it can decorate any semantic tag (h2, p, blockquote…)
 * without an extra wrapper. Fades + lifts on entry; snaps under reduced motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const [ref, inView] = useInView<T>();
  const reduce = useReducedMotion();
  const revealed = reduce || inView;

  const style: CSSProperties = {
    opacity: revealed ? 1 : 0,
    transform: revealed ? 'none' : 'translateY(26px)',
    transition: `opacity 0.9s var(--ease-out-expo) ${delay}ms, transform 0.9s var(--ease-out-expo) ${delay}ms`,
  };

  return { ref, style, revealed };
}

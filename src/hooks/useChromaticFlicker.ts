'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Occasional chromatic-aberration glitch on a big headline: every ~90ms there's
 * a brief magenta/green text-shadow split, then it settles. Ported from the
 * original `data-abr` flicker. Disabled under reduced motion.
 */
export function useChromaticFlicker<T extends HTMLElement = HTMLHeadingElement>() {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    let t = 0;
    const id = window.setInterval(() => {
      t = (t + 1) % 40;
      const k = t < 3 ? Math.random() * 5 - 2.5 : 0;
      el.style.textShadow = k
        ? `${k.toFixed(1)}px 0 #FF00FF, ${(-k).toFixed(1)}px 0 #00FF33`
        : 'none';
    }, 90);

    return () => window.clearInterval(id);
  }, [reduce]);

  return ref;
}

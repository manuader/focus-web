'use client';

import { useEffect, useRef } from 'react';
import { useMediaQuery, useReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Magnetic hover: the element eases toward the cursor while hovered and
 * springs back on leave. Realizes the intent of the original `data-magnet`
 * markers (the design tool never wired them up at runtime). Fine pointers
 * only, disabled under reduced motion.
 */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(
  strength = 0.35,
) {
  const ref = useRef<T>(null);
  const fine = useMediaQuery('(pointer: fine)');
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduce) return;

    // Transform transitions live in CSS (so button hover transitions aren't
    // clobbered); here we only drive the transform value.
    el.style.willChange = 'transform';

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      el.style.transform = '';
    };
  }, [fine, reduce, strength]);

  return ref;
}

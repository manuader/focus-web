'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useMediaQuery';

/**
 * Animate an integer from 0 → target with an ease-out cubic once `active`
 * flips true (typically when the stat scrolls into view). Mirrors the
 * original 1400ms count with `1 - (1 - p)^3` easing. Reduced motion snaps.
 */
export function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    if (reduce) {
      setValue(target);
      return;
    }

    let raf = 0;
    let startTime: number | null = null;
    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const p = Math.min(1, (now - startTime) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, reduce]);

  return value;
}

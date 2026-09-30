'use client';

import { useEffect, type RefObject } from 'react';

/** How long the glide from one step to the next takes, in ms. */
const GLIDE = 460;
/** How long it rests on a step before the wheel can move on, in ms. */
const HOLD = 240;

const easeInOut = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);

/**
 * Steps the wheel through a pinned section, one stop at a time.
 *
 * `stops` are points of the section's scroll progress (0 when it pins, 1
 * when it lets go). While the section is pinned, a wheel or trackpad
 * gesture glides the page to the next stop in its direction and rests
 * there for a moment; a wheel that keeps turning moves on at that pace, so
 * nothing is skipped and nothing is held for long. Before the first stop
 * going up, and past the last one going down, the page scrolls as usual.
 *
 * Touch gets the same stops from CSS snap points (see the markers in
 * Prisma.tsx); keys and the scrollbar stay native, and so does everything
 * with `off` (reduced motion).
 */
export function useScrollSteps(
  sectionRef: RefObject<HTMLElement | null>,
  stops: readonly number[],
  off: boolean,
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || off) return;
    const s = { busy: false, until: 0, raf: 0 };

    const geometry = () => {
      const r = section.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const range = Math.max(1, r.height - window.innerHeight);
      return { top, range, p: (window.scrollY - top) / range };
    };

    const glide = (to: number) => {
      const from = window.scrollY;
      const t0 = performance.now();
      s.busy = true;
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / GLIDE);
        // `instant`: html carries scroll-behavior: smooth.
        window.scrollTo({ top: from + (to - from) * easeInOut(k), behavior: 'instant' });
        if (k < 1) {
          s.raf = requestAnimationFrame(step);
          return;
        }
        s.raf = 0;
        s.until = performance.now() + HOLD;
        s.busy = false;
      };
      cancelAnimationFrame(s.raf);
      s.raf = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaY;
      if (e.ctrlKey || Math.abs(dy) <= Math.abs(e.deltaX)) return;
      const { top, range, p } = geometry();
      // Only while the section is pinned (with a hair of slack at the ends).
      if (p < -0.01 || p > 1.01) return;
      if (s.busy || e.timeStamp < s.until) {
        e.preventDefault();
        return;
      }
      const eps = 0.004;
      const next =
        dy > 0 ? stops.find((q) => q > p + eps) : [...stops].reverse().find((q) => q < p - eps);
      if (next === undefined) return;
      e.preventDefault();
      glide(top + next * range);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener('wheel', onWheel);
    };
  }, [sectionRef, stops, off]);
}

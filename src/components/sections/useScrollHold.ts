'use client';

import { useEffect, type RefObject } from 'react';

/** How long the page holds still once it has landed on the section, in ms. */
const HOLD = 2000;
/** How long the glide onto the section takes, in ms. */
const GLIDE = 520;
/** A new wheel gesture starts after this much quiet, in ms. */
const GESTURE_GAP = 220;
/** A wheel that never stops is let through this long after the hold, in ms. */
const TAIL = 900;

const easeOut = (x: number) => 1 - (1 - x) ** 3;

/**
 * Holds the page on a section for a moment as the wheel scrolls past it.
 *
 * Arriving at the section with a wheel or a trackpad (from above or from
 * below), the page glides until the section fills the screen and holds
 * there for a moment, long enough for what it shows to start. Vertical
 * wheel is swallowed while it holds; sideways wheel still reaches whatever
 * is inside (the case carousel). Once the hold is over, the gesture that
 * brought the reader in has to end first: the next one scrolls on as usual.
 *
 * It catches once per visit, and is ready again only when the section has
 * been left. Touch, keys and the scrollbar are left native, and so is
 * everything with `off` (reduced motion).
 */
export function useScrollHold(sectionRef: RefObject<HTMLElement | null>, off: boolean) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || off) return;

    const s = {
      armed: true,
      /** 'glide' while the page moves onto the section, 'hold' while it waits. */
      phase: '' as '' | 'glide' | 'hold',
      until: 0,
      lastWheel: 0,
      raf: 0,
    };

    const glide = (to: number) => {
      const from = window.scrollY;
      const t0 = performance.now();
      s.phase = 'glide';
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / GLIDE);
        // `instant`: html carries scroll-behavior: smooth.
        window.scrollTo({ top: from + (to - from) * easeOut(k), behavior: 'instant' });
        if (k < 1) {
          s.raf = requestAnimationFrame(step);
          return;
        }
        s.raf = 0;
        s.phase = 'hold';
        s.until = performance.now() + HOLD;
      };
      cancelAnimationFrame(s.raf);
      s.raf = requestAnimationFrame(step);
    };

    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaY;
      // Sideways is the carousel's; pinch-zoom is the browser's.
      if (e.ctrlKey || Math.abs(dy) <= Math.abs(e.deltaX)) return;
      const now = e.timeStamp;
      const gap = now - s.lastWheel;
      s.lastWheel = now;

      if (s.phase) {
        // Holding, and then until the gesture that brought the reader in is spent.
        if (s.phase === 'glide' || now < s.until || (gap < GESTURE_GAP && now < s.until + TAIL)) {
          e.preventDefault();
          return;
        }
        s.phase = '';
        return;
      }

      if (!s.armed) return;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // About to scroll into (or past) the point where the section fills the
      // screen, from either side: catch it there.
      const near =
        dy > 0
          ? r.top > -vh * 0.2 && r.top - dy < vh * 0.35
          : r.top < vh * 0.2 && r.top - dy > -vh * 0.35;
      if (!near) return;
      e.preventDefault();
      s.armed = false;
      glide(window.scrollY + r.top);
    };

    // Ready again once the reader has left the section behind.
    const onScroll = () => {
      // Left by keys or the scrollbar after the hold: nothing more to wait for.
      if (s.phase === 'hold' && performance.now() > s.until) s.phase = '';
      if (s.armed || s.phase) return;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.top > vh * 0.6 || r.bottom < vh * 0.4) s.armed = true;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
    };
  }, [sectionRef, off]);
}

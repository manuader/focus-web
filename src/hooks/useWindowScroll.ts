'use client';

import { useEffect, useRef } from 'react';

/**
 * Run a callback on scroll and resize, throttled to one call per animation
 * frame. The latest callback is always used (kept in a ref) so it never needs
 * to re-subscribe, and it fires once on mount to set the initial state.
 */
export function useWindowScroll(cb: () => void) {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => cbRef.current());
    };
    run();
    window.addEventListener('scroll', run, { passive: true });
    window.addEventListener('resize', run, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', run);
      window.removeEventListener('resize', run);
    };
  }, []);
}

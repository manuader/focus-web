'use client';

import { useEffect, useState } from 'react';

/**
 * Subscribe to a CSS media query. Starts `false` on the server / first paint
 * and resolves after mount, so effects gate on it as progressive enhancement.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return matches;
}

/** True when the user has requested reduced motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

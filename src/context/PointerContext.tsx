'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/** A single per-frame pointer sample: raw client coords + a smoothed follow. */
export interface PointerFrame {
  /** Raw pointer position (immediate). */
  x: number;
  y: number;
  /** Smoothed position (eased follow, matches the original lerp of 0.12). */
  sx: number;
  sy: number;
}

type FrameCallback = (frame: PointerFrame) => void;
type SuppressCallback = (suppressed: boolean) => void;

interface PointerContextValue {
  /** True only on fine pointers with motion allowed — gates all cursor effects. */
  enabled: boolean;
  /** Subscribe to the shared rAF loop. Returns an unsubscribe fn. */
  subscribe: (cb: FrameCallback) => () => void;
  /** Ask the custom cursor ring to hide (e.g. hero lens / spotlight take over). */
  suppressCursor: () => () => void;
  /** Observe whether the cursor ring should currently be hidden. */
  onSuppressChange: (cb: SuppressCallback) => () => void;
}

const PointerContext = createContext<PointerContextValue | null>(null);

const SMOOTHING = 0.12; // matches the original `+= (target - current) * 0.12`

export function PointerProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  // High-frequency state kept in refs so pointer motion never triggers React renders.
  const frame = useRef<PointerFrame>({
    x: 0,
    y: 0,
    sx: 0,
    sy: 0,
  });
  const subscribers = useRef(new Set<FrameCallback>());
  const suppressors = useRef(new Set<SuppressCallback>());
  const suppressCount = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    setEnabled(true);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    frame.current = { x: cx, y: cy, sx: cx, sy: cy };

    const onMove = (e: MouseEvent) => {
      frame.current.x = e.clientX;
      frame.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      const f = frame.current;
      f.sx += (f.x - f.sx) * SMOOTHING;
      f.sy += (f.y - f.sy) * SMOOTHING;
      subscribers.current.forEach((cb) => cb(f));
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const subscribe = useCallback((cb: FrameCallback) => {
    subscribers.current.add(cb);
    return () => {
      subscribers.current.delete(cb);
    };
  }, []);

  const notifySuppress = useCallback(() => {
    const suppressed = suppressCount.current > 0;
    suppressors.current.forEach((cb) => cb(suppressed));
  }, []);

  const suppressCursor = useCallback(() => {
    suppressCount.current += 1;
    notifySuppress();
    return () => {
      suppressCount.current = Math.max(0, suppressCount.current - 1);
      notifySuppress();
    };
  }, [notifySuppress]);

  const onSuppressChange = useCallback((cb: SuppressCallback) => {
    suppressors.current.add(cb);
    return () => {
      suppressors.current.delete(cb);
    };
  }, []);

  const value = useMemo<PointerContextValue>(
    () => ({ enabled, subscribe, suppressCursor, onSuppressChange }),
    [enabled, subscribe, suppressCursor, onSuppressChange],
  );

  return (
    <PointerContext.Provider value={value}>{children}</PointerContext.Provider>
  );
}

export function usePointer(): PointerContextValue {
  const ctx = useContext(PointerContext);
  if (!ctx) {
    throw new Error('usePointer must be used within a <PointerProvider>');
  }
  return ctx;
}

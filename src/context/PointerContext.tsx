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
  /** True whenever pointer-driven effects should run (real cursor or virtual). */
  enabled: boolean;
  /**
   * True when there is no real cursor and the position is being generated:
   * a slow drift the finger can take over. Sections read this to swap the
   * "move the cursor" affordances for touch ones.
   */
  virtual: boolean;
  /** Subscribe to the shared rAF loop. Returns an unsubscribe fn. */
  subscribe: (cb: FrameCallback) => () => void;
  /** Ask the custom cursor ring to hide (e.g. hero lens / spotlight take over). */
  suppressCursor: () => () => void;
  /** Observe whether the cursor ring should currently be hidden. */
  onSuppressChange: (cb: SuppressCallback) => () => void;
}

const PointerContext = createContext<PointerContextValue | null>(null);

const SMOOTHING = 0.12; // matches the original `+= (target - current) * 0.12`

/* ---- Virtual pointer (touch) ----------------------------------------------
   Half the site is built around a cursor: the hero lens, the disc in
   Superposición, the RGB split in Refracción, the spotlight in Foco. On a
   phone none of that could ever fire, so those sections used to sit still
   while the desktop ones breathed.

   Rather than write four separate touch fallbacks, the position itself is
   synthesised: an open Lissajous curve whose two periods do not divide into
   each other, so the path keeps drifting through new ground instead of
   retracing a visible loop. Every existing subscriber then works unchanged.

   Touching takes over — the finger is a better pointer than any animation —
   and on release the curve eases back in over ~1.3s rather than snapping. */
const DRIFT_X_MS = 17000;
const DRIFT_Y_MS = 23000;
const TOUCH_ATTACK = 0.22; // per frame, finger taking over
const TOUCH_RELEASE_MS = 1300; // finger letting go, handing back to the drift

export function PointerProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [virtual, setVirtual] = useState(false);

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
    const isVirtual = !fine;

    // Set even when the animation is off: the affordance copy follows the
    // device, and a phone should never be told to move a cursor it has not got.
    setVirtual(isVirtual);

    // Reduced motion means no drift and no lens: the sections all render their
    // resolved, fully legible state instead.
    if (reduce) return;

    setEnabled(true);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    frame.current = { x: cx, y: cy, sx: cx, sy: cy };

    const cleanups: Array<() => void> = [];

    if (!isVirtual) {
      const onMove = (e: MouseEvent) => {
        frame.current.x = e.clientX;
        frame.current.y = e.clientY;
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      cleanups.push(() => window.removeEventListener('mousemove', onMove));
    }

    // --- virtual-pointer state (unused on fine pointers) ---
    let phase = 0; // ms of drift elapsed
    let touchX = cx;
    let touchY = cy;
    let touchW = 0; // 0 = pure drift, 1 = pure finger
    let releasedAt = 0; // timestamp of the last touchend, 0 while held
    let held = false;

    if (isVirtual) {
      const track = (e: TouchEvent) => {
        const t = e.touches[0];
        if (!t) return;
        touchX = t.clientX;
        touchY = t.clientY;
        held = true;
        releasedAt = 0;
      };
      const release = () => {
        held = false;
        releasedAt = performance.now();
      };
      window.addEventListener('touchstart', track, { passive: true });
      window.addEventListener('touchmove', track, { passive: true });
      window.addEventListener('touchend', release, { passive: true });
      window.addEventListener('touchcancel', release, { passive: true });
      cleanups.push(() => {
        window.removeEventListener('touchstart', track);
        window.removeEventListener('touchmove', track);
        window.removeEventListener('touchend', release);
        window.removeEventListener('touchcancel', release);
      });
    }

    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64); // clamp: a backgrounded tab must not jump
      last = now;

      if (isVirtual) {
        phase += dt;
        const w = window.innerWidth;
        const h = window.innerHeight;
        // Amplitudes stay inside the viewport, so the lens and the discs never
        // park half-off the edge on a narrow screen.
        const ax = Math.min(w * 0.28, 260);
        const ay = Math.min(h * 0.2, 220);
        const dx = w / 2 + ax * Math.sin((phase / DRIFT_X_MS) * Math.PI * 2);
        const dy =
          h / 2 + ay * Math.sin((phase / DRIFT_Y_MS) * Math.PI * 2 + 1.1);

        if (held) {
          touchW += (1 - touchW) * TOUCH_ATTACK;
        } else if (touchW > 0) {
          const k = 1 - (now - releasedAt) / TOUCH_RELEASE_MS;
          // easeInOutSine on the way out, so the handover has no visible seam
          touchW = k <= 0 ? 0 : (1 - Math.cos(Math.PI * k)) / 2;
        }

        frame.current.x = dx + (touchX - dx) * touchW;
        frame.current.y = dy + (touchY - dy) * touchW;
      }

      const f = frame.current;
      f.sx += (f.x - f.sx) * SMOOTHING;
      f.sy += (f.y - f.sy) * SMOOTHING;
      subscribers.current.forEach((cb) => cb(f));
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    // A drift that runs on its own would otherwise keep a hidden tab busy.
    const onVisibility = () => {
      if (document.hidden) {
        if (rafId.current !== null) cancelAnimationFrame(rafId.current);
        rafId.current = null;
      } else if (rafId.current === null) {
        last = performance.now();
        rafId.current = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    cleanups.push(() =>
      document.removeEventListener('visibilitychange', onVisibility),
    );

    return () => {
      cleanups.forEach((fn) => fn());
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
    () => ({ enabled, virtual, subscribe, suppressCursor, onSuppressChange }),
    [enabled, virtual, subscribe, suppressCursor, onSuppressChange],
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

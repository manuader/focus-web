'use client';

import { useCallback, useEffect, useRef, type RefObject } from 'react';

/** A new wheel gesture starts after this much quiet, in ms. */
const GESTURE_GAP = 240;
/**
 * After landing on a case the wheel is held this long, so a reader turning
 * the deck notch after notch still sees the film start on every case (it
 * starts 0.85 s after the scroll rests).
 */
const HOLD = 700;
/** Wheel travel (px) a gesture needs before it turns the deck by one case. */
const WHEEL_STEP = 24;
/** Scroll has to rest this long before it is drawn onto the nearest case. */
const MAGNET_REST = 150;
/** How far past the nearest stop a drag or a rest still belongs to it, in steps. */
const TOUCH_COMMIT = 0.18;
/** A flick this fast (px/ms) turns to the next case however short it was. */
const TOUCH_FLICK = 0.45;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const easeOut = (x: number) => 1 - (1 - x) ** 4;
const easeInOut = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);

interface Drag {
  x: number;
  y: number;
  /** Scroll position when the finger came down. */
  from: number;
  anchor: number;
  /** '' until the drag shows a direction; 'x' is the deck's sideways swipe. */
  mode: '' | 'x' | 'y' | 'free';
  lastY: number;
  lastT: number;
  /** Finger speed along the scroll, in px/ms (positive scrolls down). */
  v: number;
}

/**
 * Stops at every case. The deck section scrolls through `count` resting
 * points (one per case); this makes each of them a place the scroll comes to
 * rest on, so nobody flies past a case before its film has had the chance to
 * start.
 *
 * - Wheel and trackpad: inside the deck, a gesture turns it by exactly one
 *   case. The page glides there and lands softly; the rest of that gesture
 *   (a trackpad's inertia, a wheel still spinning) is spent, so the next case
 *   needs a new gesture, and not before the case has held for a moment. Arriving at the deck from outside, the scroll is
 *   native until it comes close, then glides onto the edge case.
 * - Touch: inside the deck a vertical drag moves it one case at a time and
 *   settles on release, like a story. At the first case going up, and at the
 *   last one going down, the page scrolls natively and lets the reader out.
 *   A fling that arrives at the deck from outside stops at its first (or
 *   last) case.
 * - Anything else (keys, the scrollbar): when the scroll rests between two
 *   cases, it is drawn onto the nearest one.
 *
 * `off` (reduced motion) leaves the scroll entirely native. Returns `goTo`,
 * which glides the page to case `i`.
 */
export function useCaseStops(
  sectionRef: RefObject<HTMLElement | null>,
  count: number,
  off: boolean,
) {
  const s = useRef({
    raf: 0,
    gliding: false,
    /** The case the current glide is heading to. */
    goal: 0,
    /** When the last glide landed. */
    landed: 0,
    lastWheel: 0,
    anchor: 0,
    dir: 0,
    /** The wheel gesture already turned the deck: swallow the rest of it. */
    spent: false,
    /** Wheel travel of the current gesture. */
    acc: 0,
    drag: null as Drag | null,
    /** The last scroll input was a finger (its momentum may still be running). */
    touchy: false,
    prevY: 0,
    magnet: 0,
  });

  /** Scroll positions of the resting points, measured fresh each time. */
  const stops = useCallback(() => {
    const section = sectionRef.current;
    if (!section || count < 2) return null;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const span = section.offsetHeight - window.innerHeight;
    const step = span / (count - 1);
    return {
      top,
      step,
      at: (i: number) => top + clamp(i, 0, count - 1) * step,
      nearest: (y: number) => clamp(Math.round((y - top) / step), 0, count - 1),
      last: top + span,
    };
  }, [sectionRef, count]);

  const halt = useCallback(() => {
    cancelAnimationFrame(s.current.raf);
    s.current.gliding = false;
  }, []);

  /**
   * Animate the page scroll to `y` over `ms`, on the page's own frames. With
   * `native`, hand it to the browser's own smooth scroll instead: a wheel
   * scroll may still be animating, and setting the position frame by frame
   * over it makes the two fight (the page drifts away).
   */
  const glide = useCallback((y: number, ms: number, ease = easeOut, native = false) => {
    const g = s.current;
    cancelAnimationFrame(g.raf);
    if (native) {
      g.gliding = true;
      window.scrollTo({ top: y, behavior: 'smooth' });
      const t0 = performance.now();
      // Done when the page arrives (or stops trying).
      const watch = (now: number) => {
        if (Math.abs(window.scrollY - y) < 1.5 || now - t0 > 1400) {
          g.gliding = false;
          g.landed = now;
        } else g.raf = requestAnimationFrame(watch);
      };
      g.raf = requestAnimationFrame(watch);
      return;
    }
    const from = window.scrollY;
    const dist = y - from;
    if (Math.abs(dist) < 1 || ms <= 0) {
      window.scrollTo({ top: y, behavior: 'instant' });
      g.gliding = false;
      return;
    }
    const t0 = performance.now();
    g.gliding = true;
    const frame = (now: number) => {
      const k = Math.min(1, (now - t0) / ms);
      window.scrollTo({ top: from + dist * ease(k), behavior: 'instant' });
      if (k < 1) g.raf = requestAnimationFrame(frame);
      else {
        g.gliding = false;
        g.landed = now;
      }
    };
    g.raf = requestAnimationFrame(frame);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const p = stops();
      if (!p) return;
      const to = clamp(i, 0, count - 1);
      s.current.goal = to;
      const steps = Math.abs(window.scrollY - p.at(to)) / p.step;
      glide(p.at(to), off ? 0 : clamp(420 + steps * 240, 480, 1200), easeInOut);
    },
    [stops, glide, count, off],
  );

  useEffect(() => {
    if (off) return;
    const g = s.current;
    const vh = () => window.innerHeight;

    const onWheel = (e: WheelEvent) => {
      g.touchy = false;
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) || !e.deltaY) return;
      const p = stops();
      if (!p) return;
      const now = performance.now();
      const y = window.scrollY;
      const dy = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? vh() : 1);
      const dir = Math.sign(dy);
      // A new gesture needs a pause and a deck at rest: wheel input that keeps
      // coming while a glide is still landing belongs to the gesture that
      // started it.
      if ((now - g.lastWheel > GESTURE_GAP && !g.gliding) || dir !== g.dir) {
        g.dir = dir;
        g.spent = false;
        g.acc = 0;
        // Where this gesture starts from: above the deck, below it, or on a
        // case (the one a glide is still heading to, if there is one).
        g.anchor = g.gliding
          ? g.goal
          : y < p.at(0) - 2
            ? -1
            : y > p.last + 2
              ? count
              : p.nearest(y);
      }
      g.lastWheel = now;
      if (g.spent) {
        e.preventDefault();
        return;
      }
      const next = g.anchor + dir;
      if (next < 0 || next > count - 1) return; // leaving the deck
      const target = p.at(next);
      if (g.anchor >= 0 && g.anchor < count) {
        // On a case: the wheel does not scroll, it turns the deck by one,
        // once the case has held.
        e.preventDefault();
        if (now - g.landed < HOLD) return;
        g.acc += Math.abs(dy);
        if (g.acc < WHEEL_STEP) return;
      } else {
        // From outside: native until close to the deck, then land on it.
        const from = target - dir * vh() * 0.3;
        if (!(dir > 0 ? y + dy >= from : y + dy <= from)) return;
        e.preventDefault();
      }
      g.spent = true;
      g.goal = next;
      glide(target, 0, easeOut, true);
    };

    const onTouchStart = (e: TouchEvent) => {
      g.touchy = true;
      clearTimeout(g.magnet);
      if (e.touches.length !== 1) {
        g.drag = null;
        return;
      }
      const p = stops();
      const y = window.scrollY;
      if (!p || y < p.at(0) - 2 || y > p.last + 2) {
        g.drag = null;
        return;
      }
      halt();
      const tch = e.touches[0];
      g.drag = {
        x: tch.clientX,
        y: tch.clientY,
        from: y,
        anchor: p.nearest(y),
        mode: '',
        lastY: tch.clientY,
        lastT: performance.now(),
        v: 0,
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      const d = g.drag;
      const p = stops();
      if (!d || !p) return;
      const tch = e.touches[0];
      const dx = tch.clientX - d.x;
      const dy = d.y - tch.clientY;
      if (!d.mode) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        const out = (d.anchor === 0 && dy < 0) || (d.anchor === count - 1 && dy > 0);
        d.mode = Math.abs(dx) > Math.abs(dy) ? 'x' : out ? 'free' : 'y';
      }
      if (d.mode !== 'y') return;
      e.preventDefault();
      const now = performance.now();
      const v = (d.lastY - tch.clientY) / Math.max(1, now - d.lastT);
      d.v = d.v * 0.6 + v * 0.4;
      d.lastY = tch.clientY;
      d.lastT = now;
      const top = clamp(d.from + dy, p.at(d.anchor - 1), p.at(d.anchor + 1));
      window.scrollTo({ top, behavior: 'instant' });
    };

    const onTouchEnd = () => {
      const d = g.drag;
      g.drag = null;
      const p = stops();
      if (!d || !p || d.mode !== 'y') return;
      const moved = (window.scrollY - d.from) / p.step;
      let to = d.anchor;
      if (moved > TOUCH_COMMIT || d.v > TOUCH_FLICK) to += 1;
      else if (moved < -TOUCH_COMMIT || d.v < -TOUCH_FLICK) to -= 1;
      to = clamp(to, 0, count - 1);
      g.goal = to;
      glide(p.at(to), 460);
    };

    const onScroll = () => {
      const p = stops();
      if (!p) return;
      const y = window.scrollY;
      // A finger's fling that reaches the deck from outside stops at its
      // edge case instead of flying through it.
      if (g.touchy && !g.drag && !g.gliding) {
        const a = p.at(0);
        const b = p.last;
        const edge = g.prevY < a - 1 && y >= a ? a : g.prevY > b + 1 && y <= b ? b : null;
        if (edge !== null) {
          const html = document.documentElement;
          html.style.overflow = 'hidden';
          window.scrollTo({ top: edge, behavior: 'instant' });
          requestAnimationFrame(() => {
            html.style.overflow = '';
          });
        }
      }
      g.prevY = window.scrollY;
      // Resting between two cases: draw it onto the nearest one.
      clearTimeout(g.magnet);
      if (g.gliding || g.drag) return;
      g.magnet = window.setTimeout(() => {
        const q = stops();
        if (!q || g.gliding || g.drag || performance.now() - g.lastWheel < GESTURE_GAP) return;
        const now = window.scrollY;
        const slack = vh() * 0.2;
        if (now < q.at(0) - slack || now > q.last + slack) return;
        const i = q.nearest(now);
        if (Math.abs(now - q.at(i)) < 2) return;
        g.goal = i;
        glide(q.at(i), 420);
      }, MAGNET_REST);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(g.magnet);
      cancelAnimationFrame(g.raf);
    };
  }, [off, stops, glide, halt, count]);

  return goTo;
}

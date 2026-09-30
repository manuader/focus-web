'use client';

import { useEffect, useRef, type CSSProperties, type RefObject } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { SERVICES, COPY } from '@/lib/content';
import { SPECTRUM, NARROW_AT } from './spectrum';
import {
  createPrismScene,
  activeStep,
  stepProgress,
  rayWindow,
  type PrismScene,
} from './prismScene';
import styles from './servicios.module.css';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeInOut = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
/** The name lifts off this much scroll progress before its ray sets out. */
const LEAD_IN = 0.015;

interface Props {
  sectionRef: RefObject<HTMLElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
}

/**
 * The services prism for phones. The horizontal bench needs width a phone
 * does not have, so here the story is told in sequence instead: the prism
 * builds, then each service arrives as one ray of the spectrum, and when
 * all seven are in, a single white beam leaves the glass. The closing
 * caption lists them all at once.
 *
 * The caption sits above the prism, under the heading: number, name and
 * colour of the service whose ray is coming in. As the ray sets out, a
 * sweep of its colour crosses the name and carries a copy of it off: the
 * copy drops onto the ray's leading edge, rides it into the glass and
 * melts into the light. The service is that ray, and all of them together
 * are the white beam (your brand).
 *
 * The scene is a canvas (see prismScene.ts). A rAF loop runs only while the
 * section is on screen at phone width; it eases toward the scroll position
 * so the sequence glides instead of stepping, and keeps the idle motion
 * (dust, glints, the beam breathing) alive. Captions, the flying names and
 * the spectrum bar are written through refs, so React never re-renders
 * while scrolling.
 */
export function PrismaMovil({ sectionRef, headerRef }: Props) {
  const { t } = useTranslate();
  const reduce = useReducedMotion();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const legendRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLAnchorElement>(null);
  const segRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const slidesRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<Array<HTMLHeadingElement | null>>([]);
  const chipRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const scene: PrismScene | null = createPrismScene(canvas, SPECTRUM);
    if (!scene) return;

    const mql = window.matchMedia(`(max-width: ${NARROW_AT}px)`);
    const count = SERVICES.length;
    const t0 = performance.now();
    let raf = 0;
    let visible = false;
    let shown = 0;
    let primed = false;
    let step = -1;
    /** Where each service's name sits in the caption, in canvas px. */
    let from: Array<{ x: number; y: number }> = [];
    const flying = SERVICES.map(() => false);

    const progress = () => {
      const r = section.getBoundingClientRect();
      const stage = canvas.clientHeight || window.innerHeight;
      return Math.max(-0.3, Math.min(1.05, -r.top / Math.max(1, r.height - stage)));
    };

    const measure = () => {
      if (!mql.matches) return;
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      if (W < 10 || H < 10) return;
      const box = canvas.getBoundingClientRect();
      const head = headerRef.current?.getBoundingClientRect();
      const legend = legendRef.current?.getBoundingClientRect();
      // The caption is above the prism now: the glass gets the band below it.
      const top = legend ? legend.bottom : head?.bottom;
      scene.resize(
        {
          W,
          H,
          top: top !== undefined ? top - box.top + 10 : H * 0.36,
          bottom: H - 22,
        },
        Math.min(window.devicePixelRatio || 1, 2),
      );
      // The captions share one grid cell; the inactive ones are nudged down
      // by their transition, so their place is read off the cell.
      const cell = slidesRef.current?.getBoundingClientRect();
      from = SERVICES.map((_, i) => {
        const slide = slideRefs.current[i]?.getBoundingClientRect();
        const title = titleRefs.current[i]?.getBoundingClientRect();
        if (!cell || !slide || !title) return { x: W / 2, y: 0 };
        return {
          x: title.left + title.width / 2 - box.left,
          y: cell.top + (title.top - slide.top) + title.height / 2 - box.top,
        };
      });
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || !mql.matches) return;
      const target = progress();
      // Land where the reader is on the first frame; ease after that.
      if (!primed || reduce) {
        shown = target;
        primed = true;
      } else {
        shown += (target - shown) * 0.14;
        if (Math.abs(target - shown) < 1e-4) shown = target;
      }
      const clock = reduce ? 0 : (now - t0) / 1000;
      const { tag, rays, leads } = scene.render(shown, clock);

      const el = tagRef.current;
      if (el) {
        // As far out along the beam as it fits, clear of the glass and of
        // the screen edge.
        const half = el.offsetWidth / 2;
        const along = Math.max(half + 18, Math.min(tag.room * 0.58, tag.room - half - 12));
        const x = tag.x + Math.cos(tag.angle) * along;
        const y = tag.y + Math.sin(tag.angle) * along;
        el.style.transform =
          `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) ` +
          `translate(-50%, -50%) rotate(${tag.angle.toFixed(4)}rad)`;
        el.style.opacity = tag.opacity.toFixed(3);
        el.style.pointerEvents = tag.opacity > 0.5 ? 'auto' : 'none';
      }
      rays.forEach((r, i) => segRefs.current[i]?.style.setProperty('--lit', r.toFixed(3)));

      // Each name leaves the caption for its ray: it lifts off as a sweep of
      // its colour crosses the caption, lands on the ray's leading edge,
      // rides it toward the glass and melts into the light on the way.
      for (let i = 0; i < count; i++) {
        const chip = chipRefs.current[i];
        const title = titleRefs.current[i];
        if (!chip || !title) continue;
        const [a, b] = rayWindow(i);
        const k = reduce ? 0 : clamp01((shown - (a - LEAD_IN)) / (b - a + LEAD_IN));
        const on = k > 0 && k < 1;
        if (!on && !flying[i]) continue;
        flying[i] = on;
        const fly = easeInOut(clamp01(k / 0.5));
        const melt = clamp01((k - 0.55) / 0.42);
        title.style.setProperty('--sw', on ? fly.toFixed(3) : '0');
        if (!on) {
          chip.style.opacity = '0';
          continue;
        }
        const lead = leads[i];
        const s = lerp(1, 0.66, fly);
        // Riding just behind the leading edge, inside the light; while the
        // ray is still coming in from off screen, it waits whole on screen,
        // at the edge, for the ray to reach it.
        const half = (chip.offsetWidth * s) / 2;
        const d = Math.max(half + 8, Math.min(lead.front + half + 6, lead.room - half - 14));
        const tx = lead.x + Math.cos(lead.angle) * d;
        const ty = lead.y + Math.sin(lead.angle) * d;
        const o = from[i] ?? { x: tx, y: ty };
        const x = lerp(o.x, tx, fly);
        const y = lerp(o.y, ty, fly);
        // Reading the way the ray travels: toward the glass.
        const run = lead.angle + Math.PI;
        const angle = Math.atan2(Math.sin(run), Math.cos(run)) * fly;
        chip.style.transform =
          `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) ` +
          `rotate(${angle.toFixed(4)}rad) scale(${(s * (1 + melt * 0.9)).toFixed(3)}, ${(
            s *
            (1 - melt * 0.75)
          ).toFixed(3)})`;
        chip.style.opacity = (Math.min(1, k * 30) * (1 - melt)).toFixed(3);
        chip.style.setProperty('--m', melt.toFixed(3));
      }

      const next = activeStep(shown, count);
      if (next !== step) {
        step = next;
        slideRefs.current.forEach((s, i) => {
          if (s) s.dataset.on = i === step ? '1' : '0';
        });
      }

      // Idle motion keeps the loop alive; with reduced motion it only runs
      // until the scene has caught up with the scroll.
      if (!reduce || shown !== target) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          measure();
          kick();
        }
      },
      { rootMargin: '200px 0px' },
    );
    io.observe(section);

    const ro = new ResizeObserver(() => {
      measure();
      kick();
    });
    ro.observe(canvas);
    if (legendRef.current) ro.observe(legendRef.current);
    if (headerRef.current) ro.observe(headerRef.current);

    const onChange = () => {
      measure();
      kick();
    };
    mql.addEventListener('change', onChange);
    window.addEventListener('scroll', kick, { passive: true });
    // Rotis loads async and moves the heading, which moves the free band.
    document.fonts?.ready.then(onChange).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mql.removeEventListener('change', onChange);
      window.removeEventListener('scroll', kick);
    };
  }, [sectionRef, headerRef, reduce]);

  /** A keyboard user tabbing into a hidden caption is taken to its ray. */
  const goTo = (i: number) => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const range = section.offsetHeight - canvas.clientHeight;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + range * stepProgress(i, SERVICES.length), behavior: 'auto' });
  };

  return (
    <div className={styles.movil}>
      <canvas ref={canvasRef} className={styles.canvasM} aria-hidden="true" />

      {SERVICES.map((s, i) => (
        <span
          key={s.n}
          ref={(el) => {
            chipRefs.current[i] = el;
          }}
          className={styles.chipM}
          style={{ '--c': SPECTRUM[i] } as CSSProperties}
          aria-hidden="true"
        >
          {t(s.title)}
        </span>
      ))}

      <a
        ref={tagRef}
        href="#contacto"
        className={styles.tagM}
        aria-label={t(COPY.servicios.beamCta)}
        tabIndex={-1}
      >
        {t(COPY.servicios.beam)}
      </a>

      <div ref={legendRef} className={styles.legend}>
        <div className={styles.segs} aria-hidden="true">
          {SPECTRUM.map((c, i) => (
            <span
              key={c}
              ref={(el) => {
                segRefs.current[i] = el;
              }}
              className={styles.seg}
              style={{ '--c': c } as CSSProperties}
            />
          ))}
        </div>

        <div ref={slidesRef} className={styles.slides}>
          {SERVICES.map((s, i) => (
            <a
              key={s.n}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              href="#contacto"
              className={styles.slide}
              data-on={i === 0 ? '1' : '0'}
              style={{ '--c': SPECTRUM[i] } as CSSProperties}
              onFocus={() => goTo(i)}
            >
              <span className={styles.slideNum} aria-hidden="true">
                {s.n}
              </span>
              <span className={styles.slideText}>
                <h3
                  ref={(el) => {
                    titleRefs.current[i] = el;
                  }}
                  className={styles.slideTitle}
                >
                  {t(s.title)}
                </h3>
                <span className={styles.slideDetail}>{t(s.detail)}</span>
              </span>
            </a>
          ))}

          <div
            ref={(el) => {
              slideRefs.current[SERVICES.length] = el;
            }}
            className={`${styles.slide} ${styles.slideEnd}`}
            data-on="0"
          >
            <p className={styles.endList} aria-hidden="true">
              {SERVICES.map((s, i) => (
                <span key={s.n} style={{ '--c': SPECTRUM[i] } as CSSProperties}>
                  {t(s.title)}
                </span>
              ))}
            </p>
            <a
              href="#contacto"
              className={styles.endCta}
              onFocus={() => goTo(SERVICES.length)}
            >
              {t(COPY.servicios.beamCta)}
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

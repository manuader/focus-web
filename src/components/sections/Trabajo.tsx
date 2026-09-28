'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticLink } from '@/components/ui/MagneticLink';
import { WORKS, SERVICE_BY_ID, ACCENT_HEX, ACCENT_TEXT, COPY } from '@/lib/content';
import styles from './trabajo.module.css';
import ui from '@/components/ui/ui.module.css';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const pad2 = (n: number) => String(n).padStart(2, '0');
const easeInOut = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);

/** How far from the centre (in viewport widths) a card is fully out of focus. */
const FOCUS_REACH = 0.42;
/**
 * Share of each case's stretch of scroll spent travelling; the rest it holds
 * still in the centre, so every case gets its moment instead of sliding past.
 */
const TRAVEL = 0.64;

/**
 * The case gallery, as a lens pulling focus. Vertical scroll moves a
 * horizontal track while the section is pinned; the case in the centre of
 * the frame is sharp, in colour and full size, and its neighbours fall out
 * of focus the further they are from it: blurred, grey, smaller, turned
 * away. It is the brand's own idea, applied to its clients.
 *
 * Each logo is shown framed, on a mat with crop marks, rather than full
 * bleed: the marks come on every kind of background (white, cream, black,
 * blue) and the frame is what makes them read as one collection. Behind
 * the track, the name of the case in focus is set huge and a light in its
 * accent colour fills the room.
 *
 * Scroll sets a target; a short rAF loop eases the track toward it, so a
 * wheel's steps arrive as one glide. All of it is written through refs and
 * CSS custom properties; React never re-renders while scrolling.
 */
export function Trabajo() {
  const { t } = useTranslate();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const ghostRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const n = WORKS.length;
  /** The cases plus the empty frame at the end. */
  const total = n + 1;

  const motion = useRef({ centers: [] as number[], cur: 0, target: 0, raf: 0, active: -1, primed: false });

  const measure = useCallback(() => {
    motion.current.centers = itemRefs.current.map((el) =>
      el ? el.offsetLeft + el.offsetWidth / 2 : 0,
    );
  }, []);

  /** Place the track at `x` and grade every card by its distance to centre. */
  const apply = useCallback(
    (x: number) => {
      const m = motion.current;
      const track = trackRef.current;
      if (!track) return;
      track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;

      const vw = window.innerWidth;
      let best = 0;
      let bestD = Infinity;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = (m.centers[i] + x - vw / 2) / vw;
        const f = easeInOut(1 - clamp01(Math.abs(d) / FOCUS_REACH));
        el.style.setProperty('--f', f.toFixed(3));
        el.style.setProperty('--d', Math.max(-1, Math.min(1, d / FOCUS_REACH)).toFixed(3));
        if (Math.abs(d) < bestD) {
          bestD = Math.abs(d);
          best = i;
        }
      });

      if (best !== m.active) {
        m.active = best;
        ghostRefs.current.forEach((g, i) => {
          if (g) g.dataset.on = i === best ? '1' : '0';
        });
        if (glowRef.current) {
          glowRef.current.style.backgroundColor =
            best < n ? ACCENT_HEX[WORKS[best].accent] : 'var(--focus-magenta)';
        }
        if (countRef.current) {
          countRef.current.textContent = `${pad2(Math.min(best + 1, n))} / ${pad2(n)}`;
        }
      }
    },
    [n],
  );

  const tick = useCallback(() => {
    const m = motion.current;
    m.raf = 0;
    const gap = m.target - m.cur;
    m.cur = reduce || Math.abs(gap) < 0.2 ? m.target : m.cur + gap * 0.14;
    apply(m.cur);
    if (m.cur !== m.target) m.raf = requestAnimationFrame(tick);
  }, [apply, reduce]);

  useWindowScroll(() => {
    const section = sectionRef.current;
    const m = motion.current;
    if (!section || m.centers.length < 2) return;
    const r = section.getBoundingClientRect();
    const p = clamp01(-r.top / Math.max(1, r.height - window.innerHeight));

    // Stepped: travel between neighbours, then hold the one in the centre.
    const u = p * (total - 1);
    const k = Math.min(Math.floor(u), total - 2);
    const e = easeInOut(clamp01((u - k - (1 - TRAVEL) / 2) / TRAVEL));
    const c = m.centers[k] + (m.centers[k + 1] - m.centers[k]) * e;
    m.target = window.innerWidth / 2 - c;

    if (fillRef.current) fillRef.current.style.transform = `scaleX(${p.toFixed(4)})`;

    // Land where the reader is on the first frame; glide after that.
    if (!m.primed) {
      m.primed = true;
      m.cur = m.target;
    }
    if (!m.raf) m.raf = requestAnimationFrame(tick);
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const m = motion.current;
    const remeasure = () => {
      measure();
      m.primed = false;
      window.dispatchEvent(new Event('scroll'));
    };
    remeasure();
    document.fonts?.ready.then(remeasure).catch(() => {});
    const ro = new ResizeObserver(remeasure);
    ro.observe(section);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(m.raf);
      m.raf = 0;
    };
  }, [measure]);

  /** The framed plate leans toward the pointer, with a sheen that follows it. */
  const tilt = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${((0.5 - y) * 9).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((x - 0.5) * 11).toFixed(2)}deg`);
    el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
  };
  const untilt = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <section
      ref={sectionRef}
      id="trabajo"
      className={styles.trabajo}
      style={{ '--cases': total } as CSSProperties}
      aria-label={t(COPY.a11y.trabajo)}
    >
      <div className={styles.sticky}>
        {/* The room: a light in the accent of the case in focus, and its
            name set huge behind the track. */}
        <div ref={glowRef} className={styles.glow} aria-hidden="true" />
        <div className={styles.ghosts} aria-hidden="true">
          {[...WORKS.map((w) => w.client.replace(/^@/, '')), t(COPY.trabajo.nextName)].map(
            (name, i) => (
              <span
                key={i}
                ref={(el) => {
                  ghostRefs.current[i] = el;
                }}
                className={styles.ghost}
                data-on={i === 0 ? '1' : '0'}
              >
                {name}
              </span>
            ),
          )}
        </div>

        <div className={styles.header}>
          <div>
            <Eyebrow
              section
              line="var(--focus-green)"
              color="var(--focus-gray-300)"
              style={{ marginBottom: 20 }}
            >
              {t(COPY.trabajo.eyebrow)}
            </Eyebrow>
            <h2 className={styles.title}>{t(COPY.trabajo.title)}</h2>
          </div>
          <span className={styles.hint}>{t(COPY.trabajo.hint)} →</span>
        </div>

        <div className={styles.viewport}>
          <div ref={trackRef} className={styles.track}>
            {WORKS.map((w, i) => {
              const ig = w.href.includes('instagram.com');
              return (
                <a
                  key={w.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  style={{ '--accent': ACCENT_HEX[w.accent] } as CSSProperties}
                  onPointerMove={tilt}
                  onPointerLeave={untilt}
                >
                  {/* The ordinal is the position in WORKS, so adding a case
                      never means renumbering the ones already there. */}
                  <div className={styles.meta}>
                    <span className={styles.num} aria-hidden="true">
                      N° {pad2(i + 1)}
                    </span>
                    <span className={styles.cat} style={{ color: ACCENT_TEXT[w.accent] }}>
                      {t(w.category)}
                    </span>
                  </div>

                  <div className={styles.frame}>
                    <div className={styles.plate}>
                      <Image
                        src={w.img}
                        alt={`${t(w.category)}, ${w.client}`}
                        fill
                        sizes="(max-width: 700px) 72vw, 440px"
                        className={styles.plateImg}
                      />
                    </div>
                  </div>

                  <div className={styles.body}>
                    <h3 className={styles.name}>{w.client}</h3>
                    <ul className={styles.tags} aria-label={t(COPY.trabajo.services)}>
                      {w.services.map((id) => (
                        <li key={id} className={styles.tag}>
                          {t(SERVICE_BY_ID[id].title)}
                        </li>
                      ))}
                    </ul>
                    {w.desc && <p className={styles.desc}>{t(w.desc)}</p>}
                    <span className={styles.visit}>
                      {t(ig ? COPY.trabajo.visitIg : COPY.trabajo.visitSite)}
                      <span className={styles.arrow} aria-hidden="true">
                        ↗
                      </span>
                    </span>
                  </div>
                </a>
              );
            })}

            {/* The empty frame: the next case in the collection. */}
            <div
              ref={(el) => {
                itemRefs.current[n] = el;
              }}
              className={`${styles.card} ${styles.nextCard}`}
              style={{ '--accent': 'var(--focus-magenta)' } as CSSProperties}
            >
              <div className={styles.meta}>
                <span className={styles.num} aria-hidden="true">
                  N° {pad2(n + 1)}
                </span>
                <span className={styles.cat}>{t(COPY.trabajo.nextCat)}</span>
              </div>
              <div className={styles.frame}>
                <div className={`${styles.plate} ${styles.plateEmpty}`}>
                  <MagneticLink
                    href="#contacto"
                    accent="var(--focus-magenta)"
                    className={`${ui.btn} ${ui.btnGhost} ${styles.nextBtn}`}
                  >
                    {t(COPY.trabajo.cta)}
                    <span className={ui.btnLine} />
                  </MagneticLink>
                </div>
              </div>
              <div className={styles.body}>
                <p className={styles.name}>{t(COPY.trabajo.nextName)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.progressTrack}>
            <div ref={fillRef} className={styles.progressFill} />
          </div>
          <span ref={countRef} className={styles.count}>
            01 / {pad2(n)}
          </span>
        </div>
      </div>
    </section>
  );
}

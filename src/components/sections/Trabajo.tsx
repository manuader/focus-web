'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, type CSSProperties, type MouseEvent } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WORKS, SERVICE_BY_ID, ACCENT_HEX, ACCENT_TEXT, COPY } from '@/lib/content';
import styles from './trabajo.module.css';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const pad2 = (n: number) => String(n).padStart(2, '0');
const easeInOut = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);

/**
 * Share of each case's stretch of scroll spent travelling; the rest it holds
 * still in the centre, so every case gets its moment instead of sliding past.
 */
const TRAVEL = 0.64;
/** Centre to first neighbour, and neighbour to neighbour, in card widths. */
const SPREAD = 0.78;
const SPREAD_FAR = 0.46;
/** How far a neighbour turns away from the reader, in degrees. */
const TURN = 40;
/** Scroll has to rest this long before the case in the centre starts playing. */
const DWELL = 3000;
/** Rest before the deck settles on the nearest case and the wait begins. */
const SETTLE = 160;

type CardState = '' | 'wait' | 'play';

/**
 * The case gallery, as a deck seen through a lens. Vertical scroll turns the
 * deck while the section is pinned: the case in the centre faces the reader,
 * sharp and lit, and its neighbours turn away behind it, darker and out of
 * focus. Under it, its name and rubro fade in as it lands.
 *
 * Leave the scroll alone for three seconds and the logo in the centre fades
 * into a short film of the work itself: the site running on a phone, or the
 * account's feed and reels. Every film opens and closes on the same artwork
 * as the card, so the fade has no seam. Scroll again and it fades back to
 * the logo.
 *
 * Scroll sets a target; a short rAF loop eases the deck toward it, so a
 * wheel's steps arrive as one glide. All of it is written through refs,
 * inline transforms and data attributes; React never re-renders on scroll.
 */
export function Trabajo() {
  const { t } = useTranslate();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const captionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const n = WORKS.length;
  /** The cases plus the empty frame at the end. */
  const total = n + 1;

  const motion = useRef({
    cur: 0,
    target: 0,
    raf: 0,
    active: 0,
    primed: false,
    w: 0,
    settle: 0,
    dwell: 0,
    pause: 0,
  });

  /** Move a card between logo, the three-second wait, and its film. */
  const setState = useCallback((i: number, state: CardState) => {
    const card = cardRefs.current[i];
    if (card) card.dataset.state = state;
    if (stageRef.current) stageRef.current.dataset.playing = state === 'play' ? '1' : '0';
  }, []);

  /** Turn the deck to `pos` (a case index, fractional while travelling). */
  const apply = useCallback(
    (pos: number) => {
      const m = motion.current;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const o = i - pos;
        const a = Math.abs(o);
        const near = Math.min(a, 1);
        const far = Math.max(0, a - 1);
        const x = Math.sign(o) * (near * SPREAD + far * SPREAD_FAR) * m.w;
        const scale = 1 - 0.12 * near - 0.05 * Math.min(far, 2);
        el.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0) perspective(1100px) rotateY(${(
          -Math.sign(o) *
          near *
          TURN
        ).toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        el.style.zIndex = String(100 - Math.round(a * 10));
        el.style.visibility = a > 3.4 ? 'hidden' : 'visible';
        el.style.setProperty('--n', near.toFixed(3));
        el.style.setProperty('--far', Math.min(far, 2).toFixed(3));
        const cap = captionRefs.current[i];
        if (cap) {
          const f = clamp01(1 - a * 2.4);
          cap.style.opacity = f.toFixed(3);
          cap.style.transform = `translate3d(0, ${((1 - f) * 10).toFixed(1)}px, 0)`;
          cap.style.visibility = f === 0 ? 'hidden' : 'visible';
        }
      });

      const best = Math.max(0, Math.min(total - 1, Math.round(pos)));
      if (best !== m.active) {
        m.active = best;
        if (countRef.current) {
          countRef.current.textContent = `${pad2(Math.min(best + 1, n))} / ${pad2(n)}`;
          countRef.current.dataset.off = best >= n ? '1' : '0';
        }
      }
    },
    [n, total],
  );

  const tick = useCallback(() => {
    const m = motion.current;
    m.raf = 0;
    const gap = m.target - m.cur;
    m.cur = reduce || Math.abs(gap) < 0.0008 ? m.target : m.cur + gap * 0.14;
    apply(m.cur);
    if (m.cur !== m.target) m.raf = requestAnimationFrame(tick);
  }, [apply, reduce]);

  const glideTo = useCallback(
    (pos: number) => {
      const m = motion.current;
      m.target = pos;
      if (!m.raf) m.raf = requestAnimationFrame(tick);
    },
    [tick],
  );

  /** Fade every film back to its logo; the video itself stops once it is gone. */
  const rest = useCallback(() => {
    const m = motion.current;
    clearTimeout(m.settle);
    clearTimeout(m.dwell);
    cardRefs.current.forEach((card, i) => {
      if (!card || !card.dataset.state) return;
      const wasPlaying = card.dataset.state === 'play';
      setState(i, '');
      if (wasPlaying) {
        clearTimeout(m.pause);
        m.pause = window.setTimeout(() => videoRefs.current[i]?.pause(), 700);
      }
    });
  }, [setState]);

  useWindowScroll(() => {
    const section = sectionRef.current;
    const m = motion.current;
    if (!section) return;
    const r = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = clamp01(-r.top / Math.max(1, r.height - vh));

    // Stepped: travel between neighbours, then hold the one in the centre.
    const u = p * (total - 1);
    const k = Math.min(Math.floor(u), total - 2);
    const pos = k + easeInOut(clamp01((u - k - (1 - TRAVEL) / 2) / TRAVEL));

    // Land where the reader is on the first frame; glide after that.
    if (!m.primed) {
      m.primed = true;
      m.cur = pos;
    }
    glideTo(pos);

    // Any scroll sends the film away. Once it rests, the deck settles on the
    // nearest case and the wait for its film begins.
    rest();
    const onStage = r.top < vh * 0.35 && r.bottom > vh * 0.65;
    if (!onStage) return;
    m.settle = window.setTimeout(() => {
      const i = Math.max(0, Math.min(total - 1, Math.round(m.target)));
      glideTo(i);
      const video = videoRefs.current[i];
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData;
      if (!video || reduce || saveData) return;
      // Start fetching now, so three seconds later there is something to show.
      if (!video.getAttribute('src')) {
        video.src = video.dataset.src ?? '';
        video.load();
      }
      setState(i, 'wait');
      m.dwell = window.setTimeout(() => {
        clearTimeout(m.pause);
        video.currentTime = 0;
        video
          .play()
          .then(() => {
            // Scroll may have moved on while the video was getting ready.
            if (cardRefs.current[i]?.dataset.state === 'wait') setState(i, 'play');
            else video.pause();
          })
          .catch(() => setState(i, ''));
      }, DWELL - SETTLE);
    }, SETTLE);
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const m = motion.current;
    const remeasure = () => {
      m.w = cardRefs.current[0]?.offsetWidth ?? 0;
      m.primed = false;
      window.dispatchEvent(new Event('scroll'));
    };
    remeasure();
    const ro = new ResizeObserver(remeasure);
    ro.observe(section);
    // A tab in the background has no reader: stop the film. Back in view,
    // the wait starts over as if the scroll had just come to rest.
    const hidden = () => {
      if (document.hidden) rest();
      else window.dispatchEvent(new Event('scroll'));
    };
    document.addEventListener('visibilitychange', hidden);
    return () => {
      ro.disconnect();
      document.removeEventListener('visibilitychange', hidden);
      cancelAnimationFrame(m.raf);
      clearTimeout(m.settle);
      clearTimeout(m.dwell);
      clearTimeout(m.pause);
      m.raf = 0;
    };
  }, [rest]);

  /** Scroll the page to the point where case `i` sits in the centre. */
  const scrollToCase = useCallback(
    (i: number) => {
      const section = sectionRef.current;
      if (!section) return;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const span = section.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + (i / (total - 1)) * span,
        behavior: reduce ? 'auto' : 'smooth',
      });
    },
    [reduce, total],
  );

  /** A card off to the side is a way to get to it, not a link out yet. */
  const bringForward = (i: number) => (e: MouseEvent<HTMLElement>) => {
    if (i === motion.current.active) return;
    e.preventDefault();
    scrollToCase(i);
  };

  return (
    <section
      ref={sectionRef}
      id="trabajo"
      className={styles.trabajo}
      style={{ '--cases': total } as CSSProperties}
      aria-label={t(COPY.a11y.trabajo)}
    >
      <div ref={stageRef} className={styles.sticky} data-playing="0">
        <span className={`${styles.mark} ${styles.markTl}`} aria-hidden="true" />
        <span className={`${styles.mark} ${styles.markTr}`} aria-hidden="true" />
        <span className={`${styles.mark} ${styles.markBl}`} aria-hidden="true" />
        <span className={`${styles.mark} ${styles.markBr}`} aria-hidden="true" />

        <div className={styles.header}>
          <div>
            <Eyebrow
              section
              line="var(--focus-gray-400)"
              color="var(--focus-gray-300)"
              className={styles.eyebrow}
            >
              {t(COPY.trabajo.eyebrow)}
            </Eyebrow>
            <h2 className={styles.title}>{t(COPY.trabajo.title)}</h2>
          </div>
          <span ref={countRef} className={styles.count} data-off="0">
            01 / {pad2(n)}
          </span>
        </div>

        <div className={styles.body}>
          <div className={styles.deck}>
            {WORKS.map((w, i) => {
              const ig = w.href.includes('instagram.com');
              return (
                <a
                  key={w.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  style={{ '--accent': ACCENT_HEX[w.accent] } as CSSProperties}
                  aria-label={`${w.client}, ${t(w.category)}. ${w.services
                    .map((id) => t(SERVICE_BY_ID[id].title))
                    .join(', ')}. ${t(ig ? COPY.trabajo.visitIg : COPY.trabajo.visitSite)}`}
                  onClick={bringForward(i)}
                  onFocus={() => i !== motion.current.active && scrollToCase(i)}
                >
                  <span className={styles.face}>
                    <Image
                      src={w.img}
                      alt=""
                      fill
                      sizes="(max-width: 700px) 62vw, 420px"
                      className={styles.art}
                    />
                    {w.video && (
                      <video
                        ref={(el) => {
                          videoRefs.current[i] = el;
                        }}
                        className={styles.film}
                        data-src={w.video}
                        muted
                        loop
                        playsInline
                        preload="none"
                        disablePictureInPicture
                        aria-hidden="true"
                        tabIndex={-1}
                      />
                    )}
                    <span className={styles.sheen} />
                    {w.video && <span className={styles.wait} />}
                  </span>
                </a>
              );
            })}

            {/* The empty frame: the next case in the collection. */}
            <a
              ref={(el) => {
                cardRefs.current[n] = el;
              }}
              href="#contacto"
              className={`${styles.card} ${styles.next}`}
              style={{ '--accent': 'var(--focus-magenta)' } as CSSProperties}
              onClick={bringForward(n)}
              onFocus={() => n !== motion.current.active && scrollToCase(n)}
            >
              <span className={`${styles.face} ${styles.faceEmpty}`}>
                <span className={styles.plus} aria-hidden="true" />
                <span className={styles.nextLabel}>{t(COPY.trabajo.cta)}</span>
              </span>
            </a>
          </div>

          {/* One caption at a time, under the case in the centre. */}
          <div className={styles.captions}>
            {WORKS.map((w, i) => (
              <div
                key={w.id}
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
                className={styles.caption}
                aria-hidden="true"
              >
                <h3 className={styles.name}>{w.client}</h3>
                <p className={styles.cat} style={{ color: ACCENT_TEXT[w.accent] }}>
                  {t(w.category)}
                </p>
                <p className={styles.services}>
                  {w.services.map((id) => t(SERVICE_BY_ID[id].title)).join(' · ')}
                </p>
              </div>
            ))}
            <div
              ref={(el) => {
                captionRefs.current[n] = el;
              }}
              className={styles.caption}
              aria-hidden="true"
            >
              <p className={styles.name}>{t(COPY.trabajo.nextName)}</p>
              <p className={styles.cat} style={{ color: 'var(--focus-magenta)' }}>
                {t(COPY.trabajo.nextCat)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

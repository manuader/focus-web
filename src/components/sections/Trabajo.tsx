'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WORKS, SERVICE_BY_ID, ACCENT_TEXT, COPY } from '@/lib/content';
import styles from './trabajo.module.css';
import { useCaseStops } from './useCaseStops';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const pad2 = (n: number) => String(n).padStart(2, '0');
const easeInOut = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);
const easeOut = (x: number) => 1 - (1 - x) ** 3;

/**
 * Share of each case's stretch of scroll spent travelling; the rest it holds
 * still in the centre, so every case gets its moment instead of sliding past.
 */
const TRAVEL = 0.64;
/** Centre to first neighbour, and neighbour to neighbour, in card widths. */
const SPREAD = 0.8;
const SPREAD_FAR = 0.44;
/** How far a neighbour turns away from the reader, in degrees. */
const TURN = 42;
/** Scroll has to rest this long before the case in the centre starts playing. */
const DWELL = 850;
/** Rest before the deck settles on the nearest case and the wait begins. */
const SETTLE = 140;
/** A sideways drag this long, in px, turns the deck by one case on touch. */
const SWIPE = 44;

type CardState = '' | 'wait' | 'play';

/**
 * The case gallery, as a deck seen through a lens. Vertical scroll turns the
 * deck while the section is pinned: the case in the centre faces the reader,
 * sharp and lit, and its neighbours turn away behind it, darker and out of
 * focus. Under it, its name and rubro fade in as it lands.
 *
 * Let the scroll rest for under a second and the logo in the centre fades
 * into a short film of the work itself: a launch film of the site playing on
 * a phone, or the account's feed and reels. Every film opens and closes on
 * the same artwork as the card, so the fade has no seam. Scroll again and it
 * fades back to the logo.
 *
 * The deck is dealt in as the section scrolls into view: the cards rise from
 * below, the centre one first, and fan out into place. While it turns, the
 * cards lean into the travel. The scroll stops at every case (see
 * useCaseStops), so each film gets its moment; on touch, a sideways swipe
 * also turns the deck by one.
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
    vh: 0,
    /** How far the deck has been dealt in: 0 below the fold, 1 once pinned. */
    enter: 1,
    enterTarget: 1,
    settle: 0,
    dwell: 0,
    pause: 0,
  });
  const swipe = useRef({ x: 0, y: 0, on: false, moved: false });

  /** Move a card between logo, the three-second wait, and its film. */
  const setState = useCallback((i: number, state: CardState) => {
    const card = cardRefs.current[i];
    if (card) card.dataset.state = state;
    if (stageRef.current) stageRef.current.dataset.playing = state === 'play' ? '1' : '0';
  }, []);

  /**
   * Turn the deck to `pos` (a case index, fractional while travelling).
   * `enter` is how far it has been dealt in, `lean` how hard it is turning
   * (-1 to 1, signed by direction).
   */
  const apply = useCallback(
    (pos: number, enter: number, lean: number) => {
      const m = motion.current;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const o = i - pos;
        const a = Math.abs(o);
        const dir = Math.sign(o);
        const near = Math.min(a, 1);
        const far = Math.max(0, a - 1);
        // Dealt in from below: the centre card leads, the rest trail by distance.
        const q = 1 - easeOut(clamp01(enter * 1.55 - Math.min(a, 3) * 0.18));
        const x = dir * (near * SPREAD + far * SPREAD_FAR) * m.w * (1 + q * 0.5);
        const y = q * m.vh * 0.46;
        const scale = (1 - 0.12 * near - 0.05 * Math.min(far, 2)) * (1 - 0.2 * q);
        const ry = -dir * near * TURN - lean * 9 * (1 - near);
        const rz = lean * 2.2 + dir * q * 10;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
          1,
        )}px, 0) perspective(1000px) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(
          2,
        )}deg) scale(${scale.toFixed(4)})`;
        el.style.opacity = clamp01(1.25 - q * 1.25).toFixed(3);
        el.style.zIndex = String(100 - Math.round(a * 10));
        el.style.visibility = a > 3.4 || q >= 1 ? 'hidden' : 'visible';
        el.style.setProperty('--n', near.toFixed(3));
        el.style.setProperty('--far', Math.min(far, 2).toFixed(3));
        const cap = captionRefs.current[i];
        if (cap) {
          const f = clamp01(1 - a * 2.4) * clamp01(enter * 3 - 2);
          cap.style.opacity = f.toFixed(3);
          cap.style.transform = `translate3d(0, ${((1 - f) * 10).toFixed(1)}px, 0)`;
          cap.style.visibility = f === 0 ? 'hidden' : 'visible';
        }
      });

      stageRef.current?.style.setProperty('--enter', enter.toFixed(3));

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
    m.cur = reduce || Math.abs(gap) < 0.0008 ? m.target : m.cur + gap * 0.15;
    const rise = m.enterTarget - m.enter;
    m.enter = reduce || Math.abs(rise) < 0.002 ? m.enterTarget : m.enter + rise * 0.13;
    // What is left to travel is the lean: strongest mid-turn, none at rest.
    apply(m.cur, m.enter, reduce ? 0 : Math.max(-1, Math.min(1, (m.target - m.cur) * 1.7)));
    if (m.cur !== m.target || m.enter !== m.enterTarget) m.raf = requestAnimationFrame(tick);
  }, [apply, reduce]);

  const glideTo = useCallback(
    (pos: number) => {
      const m = motion.current;
      m.target = pos;
      if (!m.raf) m.raf = requestAnimationFrame(tick);
    },
    [tick],
  );

  /** Start fetching a case's film ahead of time, so it can start on cue. */
  const prime = useCallback(
    (i: number) => {
      const video = videoRefs.current[i];
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData;
      if (!video || reduce || saveData || video.getAttribute('src')) return;
      video.preload = 'auto';
      video.src = video.dataset.src ?? '';
      video.load();
    },
    [reduce],
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

    // Dealt in over the screen of scroll before the section pins.
    m.vh = vh;
    m.enterTarget = reduce ? 1 : clamp01(1 - r.top / vh);

    // Land where the reader is on the first frame; glide after that.
    if (!m.primed) {
      m.primed = true;
      m.cur = pos;
      m.enter = m.enterTarget;
    }
    glideTo(pos);

    // Any scroll sends the film away. Once it rests, the deck settles on the
    // nearest case and the wait for its film begins.
    rest();
    const onStage = r.top < vh * 0.35 && r.bottom > vh * 0.65;
    if (!onStage) return;
    // The wait is short: the film of the case being turned to is already on
    // its way by the time the deck lands on it.
    prime(Math.max(0, Math.min(total - 1, Math.round(pos))));
    m.settle = window.setTimeout(() => {
      const i = Math.max(0, Math.min(total - 1, Math.round(m.target)));
      glideTo(i);
      const video = videoRefs.current[i];
      if (!video || !video.getAttribute('src')) return;
      setState(i, 'wait');
      m.dwell = window.setTimeout(() => {
        clearTimeout(m.pause);
        video.currentTime = 0;
        video
          .play()
          .then(() => {
            // Scroll may have moved on while the video was getting ready.
            if (cardRefs.current[i]?.dataset.state === 'wait') {
              setState(i, 'play');
              prime(i + 1);
            } else video.pause();
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

  /** Glide the page to the point where case `i` sits in the centre. */
  const scrollToCase = useCaseStops(sectionRef, total, reduce);

  /** A card off to the side is a way to get to it, not a link out yet. */
  const bringForward = (i: number) => (e: MouseEvent<HTMLElement>) => {
    if (swipe.current.moved) {
      // The end of a swipe is not a tap on whatever was under the finger.
      swipe.current.moved = false;
      e.preventDefault();
      return;
    }
    if (i === motion.current.active) return;
    e.preventDefault();
    scrollToCase(i);
  };

  /** With a mouse, the case in the centre tips toward the pointer. */
  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || reduce || e.pointerType !== 'mouse') return;
    const r = stage.getBoundingClientRect();
    stage.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    stage.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const untilt = () => {
    stageRef.current?.style.setProperty('--px', '0');
    stageRef.current?.style.setProperty('--py', '0');
  };

  /** On touch the deck also turns the way it looks like it should: sideways. */
  const swipeStart = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') return;
    swipe.current = { x: e.clientX, y: e.clientY, on: true, moved: false };
  };
  const swipeEnd = (e: PointerEvent<HTMLDivElement>) => {
    const s = swipe.current;
    if (!s.on) return;
    s.on = false;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) < SWIPE || Math.abs(dx) < Math.abs(dy) * 1.3) return;
    s.moved = true;
    const to = motion.current.active + (dx < 0 ? 1 : -1);
    scrollToCase(Math.max(0, Math.min(total - 1, to)));
  };

  return (
    <section
      ref={sectionRef}
      id="trabajo"
      className={styles.trabajo}
      style={{ '--cases': total } as CSSProperties}
      aria-label={t(COPY.a11y.trabajo)}
    >
      <div
        ref={stageRef}
        className={styles.sticky}
        data-playing="0"
        style={{ '--dwell': `${DWELL - SETTLE}ms` } as CSSProperties}
        onPointerMove={tilt}
        onPointerLeave={untilt}
      >
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
          <div
            className={styles.deck}
            onPointerDown={swipeStart}
            onPointerUp={swipeEnd}
            onPointerCancel={() => {
              swipe.current.on = false;
            }}
          >
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
                      sizes="(max-width: 700px) 80vw, 600px"
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

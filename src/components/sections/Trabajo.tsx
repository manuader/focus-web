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
import { useMediaQuery, useReducedMotion } from '@/hooks/useMediaQuery';
import { Eyebrow } from '@/components/ui/Eyebrow';
import {
  WORKS,
  SERVICE_BY_ID,
  CASE_SERVICE_TITLE,
  ACCENT_TEXT,
  COPY,
} from '@/lib/content';
import { CaseStudyOverlay } from './CaseStudyOverlay';
import styles from './trabajo.module.css';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const pad2 = (n: number) => String(n).padStart(2, '0');
const easeOut = (x: number) => 1 - (1 - x) ** 3;

/** Centre to first neighbour, and neighbour to neighbour, in card widths. */
const SPREAD = 0.8;
const SPREAD_FAR = 0.44;
/** How far a neighbour turns away from the reader, in degrees. */
const TURN = 42;
/** A brief rest confirms the intended case without making impatient readers wait. */
const DWELL = 500;
/** Rest before the deck counts as settled and the wait begins. */
const SETTLE = 140;
/** A mouse drag this long, in px, is a drag and not a click. */
const DRAG = 6;

type CardState = '' | 'wait' | 'play' | 'details';

/**
 * The case gallery, as a deck seen through a lens, that turns sideways. The
 * deck is a horizontal scroller: a trackpad or a finger swipes it, a mouse
 * drags it or uses the arrows, and the page's own vertical scroll never
 * turns it. The case in the centre faces the reader, sharp and lit, and
 * its neighbours turn away behind it, darker and out of focus. Under it, its
 * name and rubro fade in as it lands.
 *
 * Let the deck rest for under a second and the logo in the centre fades into
 * a short film of the work itself: a launch film of the site playing on a
 * phone, or the account's feed and reels. Every film opens and closes on the
 * same artwork as the card, so the fade has no seam. Turn it again, or scroll
 * the page away, and it fades back to the logo.
 *
 * The scroller lays out a row of even slots and snaps each one to the
 * centre; inside its slot, every frame, each card gets the transform that fans it
 * into the deck (the offset from its place in the row, its turn and scale),
 * read from the scroller's position. The deck is dealt in as the section
 * scrolls into view, and the cards lean into the travel while it turns.
 *
 * The page keeps its native vertical scroll at all times; watching the film
 * is optional and never holds the reader inside the section. All of it is
 * written through refs, inline transforms and data attributes;
 * React never re-renders on scroll.
 */
export function Trabajo() {
  const { t } = useTranslate();
  const reduce = useReducedMotion();
  const touch = useMediaQuery('(hover: none), (pointer: coarse)');
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  /** The slots in the row (they snap), and the cards that turn inside them. */
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const turnRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const captionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  /** Case studies that reached their last frame keep their information open. */
  const endedRefs = useRef(new Set<number>());
  const n = WORKS.length;
  /** The cases plus the empty frame at the end. */
  const total = n + 1;

  const motion = useRef({
    raf: 0,
    active: -1,
    /** Card width, and the distance between two cards in the row. */
    w: 0,
    step: 1,
    vh: 0,
    /** Where the deck was on the last frame, to tell how fast it turns. */
    last: 0,
    lean: 0,
    /** How far the deck has been dealt in: 0 below the fold, 1 once in view. */
    enter: 1,
    enterTarget: 1,
    primed: false,
    settle: 0,
    dwell: 0,
    pause: 0,
  });
  const drag = useRef({ x: 0, left: 0, id: -1, on: false, moved: false, t: 0, v: 0 });

  /** The deck's position, as a case index (fractional while it turns). */
  const position = useCallback(() => {
    const deck = deckRef.current;
    return deck ? deck.scrollLeft / motion.current.step : 0;
  }, []);

  /** Move a card between logo, the short wait, and its film. */
  const setState = useCallback((i: number, state: CardState) => {
    const card = cardRefs.current[i];
    if (card) card.dataset.state = state;
    if (stageRef.current) {
      stageRef.current.dataset.playing = state === 'play' || state === 'details' ? '1' : '0';
    }
  }, []);

  /**
   * Fan the deck out around `pos`. `enter` is how far it has been dealt in,
   * `lean` how hard it is turning (-1 to 1, signed by direction).
   */
  const apply = useCallback(
    (pos: number, enter: number, lean: number) => {
      const m = motion.current;
      turnRefs.current.forEach((el, i) => {
        const slot = cardRefs.current[i];
        if (!el || !slot) return;
        const o = i - pos;
        const a = Math.abs(o);
        const dir = Math.sign(o);
        const near = Math.min(a, 1);
        const far = Math.max(0, a - 1);
        // Dealt in from below: the centre card leads, the rest trail by distance.
        const q = 1 - easeOut(clamp01(enter * 1.55 - Math.min(a, 3) * 0.18));
        // Where the deck wants the card, less where the row already put it.
        const x = dir * (near * SPREAD + far * SPREAD_FAR) * m.w * (1 + q * 0.5) - o * m.step;
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
        slot.style.zIndex = String(100 - Math.round(a * 10));
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
        // Straight on the DOM: React drops the clicks of a button whose
        // disabled prop is set, even after the DOM has enabled it.
        if (prevRef.current) prevRef.current.disabled = best <= 0;
        if (nextRef.current) nextRef.current.disabled = best >= total - 1;
      }
    },
    [n, total],
  );

  /**
   * One frame: read where the deck is and fan it out. Keeps running while
   * the deck turns, the lean dies down or the deal-in plays.
   */
  const tick = useCallback(() => {
    const m = motion.current;
    m.raf = 0;
    const pos = position();
    const v = pos - m.last;
    m.last = pos;
    // How fast it turns is the lean: strongest mid-turn, none at rest.
    const leanTarget = reduce ? 0 : Math.max(-1, Math.min(1, v * 9));
    m.lean =
      Math.abs(leanTarget - m.lean) < 0.002 ? leanTarget : m.lean + (leanTarget - m.lean) * 0.18;
    const rise = m.enterTarget - m.enter;
    m.enter = reduce || Math.abs(rise) < 0.002 ? m.enterTarget : m.enter + rise * 0.13;
    apply(pos, m.enter, m.lean);
    if (v !== 0 || m.lean !== 0 || m.enter !== m.enterTarget) m.raf = requestAnimationFrame(tick);
  }, [apply, position, reduce]);

  const frame = useCallback(() => {
    const m = motion.current;
    if (!m.raf) m.raf = requestAnimationFrame(tick);
  }, [tick]);

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
    endedRefs.current.clear();
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

  /**
   * Any movement, of the deck or of the page, sends the film away. Once
   * both rest with the deck in view, the wait for the centre case's film
   * begins.
   */
  const settle = useCallback(() => {
    const section = sectionRef.current;
    const m = motion.current;
    if (!section) return;
    rest();
    const r = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const onStage = r.top < vh * 0.35 && r.bottom > vh * 0.65;
    if (!onStage || drag.current.on) return;
    // The wait is short: the film of the case being turned to is already on
    // its way by the time the deck lands on it.
    prime(Math.max(0, Math.min(total - 1, Math.round(position()))));
    m.settle = window.setTimeout(() => {
      const i = Math.max(0, Math.min(total - 1, Math.round(position())));
      const video = videoRefs.current[i];
      if (!video || !video.getAttribute('src')) return;
      setState(i, 'wait');
      m.dwell = window.setTimeout(() => {
        clearTimeout(m.pause);
        video.currentTime = 0;
        endedRefs.current.delete(i);
        video
          .play()
          .then(() => {
            // The deck may have moved on while the video was getting ready.
            if (cardRefs.current[i]?.dataset.state === 'wait') {
              setState(i, 'play');
              prime(i + 1);
            } else video.pause();
          })
          .catch(() => setState(i, ''));
      }, DWELL - SETTLE);
    }, SETTLE);
  }, [position, prime, rest, setState, total]);

  useWindowScroll(() => {
    const section = sectionRef.current;
    const m = motion.current;
    if (!section) return;
    const r = section.getBoundingClientRect();
    const vh = window.innerHeight;
    // Dealt in over most of the screen of scroll before the section lands.
    m.vh = vh;
    m.enterTarget = reduce ? 1 : clamp01((vh - r.top) / (vh * 0.8));
    // Land where the reader is on the first frame; ease after that.
    if (!m.primed) {
      m.primed = true;
      m.enter = m.enterTarget;
    }
    frame();
    // Far from the deck there is nothing to start or stop.
    if (r.bottom < -vh || r.top > vh * 2) return;
    settle();
  });

  useEffect(() => {
    const section = sectionRef.current;
    const deck = deckRef.current;
    if (!section || !deck) return;
    const m = motion.current;
    const remeasure = () => {
      const first = cardRefs.current[0];
      const second = cardRefs.current[1];
      m.w = first?.offsetWidth ?? 0;
      m.step = Math.max(1, (second?.offsetLeft ?? 0) - (first?.offsetLeft ?? 0));
      m.last = position();
      m.primed = false;
      window.dispatchEvent(new Event('scroll'));
    };
    remeasure();
    const ro = new ResizeObserver(remeasure);
    ro.observe(section);
    const turn = () => {
      frame();
      settle();
    };
    deck.addEventListener('scroll', turn, { passive: true });
    // A tab in the background has no reader: stop the film. Back in view,
    // the wait starts over as if the scroll had just come to rest.
    const hidden = () => {
      if (document.hidden) rest();
      else settle();
    };
    document.addEventListener('visibilitychange', hidden);
    return () => {
      ro.disconnect();
      deck.removeEventListener('scroll', turn);
      document.removeEventListener('visibilitychange', hidden);
      cancelAnimationFrame(m.raf);
      clearTimeout(m.settle);
      clearTimeout(m.dwell);
      clearTimeout(m.pause);
      m.raf = 0;
    };
  }, [frame, position, rest, settle]);

  /** Turn the deck until case `i` sits in the centre. */
  const scrollToCase = useCallback(
    (i: number) => {
      const to = Math.max(0, Math.min(total - 1, i));
      deckRef.current?.scrollTo({
        left: to * motion.current.step,
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

  /**
   * Touch has no hover. One tap pauses the film and opens the case; the next
   * tap on the card resumes from that frame (or restarts an ended film).
   * Links inside the overlay are excluded so they remain one-tap actions.
   */
  const toggleTouchCase = (i: number) => (e: MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).closest('a')) return;
    if (i !== motion.current.active) {
      e.preventDefault();
      scrollToCase(i);
      return;
    }
    if (!touch) return;

    e.preventDefault();
    const card = cardRefs.current[i];
    const video = videoRefs.current[i];
    if (!card) return;

    clearTimeout(motion.current.settle);
    clearTimeout(motion.current.dwell);

    if (card.dataset.state !== 'details') {
      video?.pause();
      setState(i, 'details');
      return;
    }

    endedRefs.current.delete(i);
    if (!video) {
      setState(i, '');
      return;
    }
    if (video.ended || video.currentTime >= video.duration - 0.1) video.currentTime = 0;
    video
      .play()
      .then(() => setState(i, 'play'))
      .catch(() => setState(i, ''));
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

  /**
   * A mouse has no sideways scroll of its own, so it drags the deck. Touch
   * and trackpads scroll it natively; a mouse wheel scrolls the page.
   */
  const dragStart = (e: PointerEvent<HTMLDivElement>) => {
    const deck = deckRef.current;
    if (!deck || e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = {
      x: e.clientX,
      left: deck.scrollLeft,
      id: e.pointerId,
      on: false,
      moved: false,
      t: e.timeStamp,
      v: 0,
    };
  };
  const dragMove = (e: PointerEvent<HTMLDivElement>) => {
    const deck = deckRef.current;
    const d = drag.current;
    if (!deck || d.id !== e.pointerId || !(e.buttons & 1)) return;
    const dx = e.clientX - d.x;
    if (!d.on) {
      if (Math.abs(dx) < DRAG) return;
      d.on = true;
      deck.setPointerCapture(e.pointerId);
      deck.dataset.drag = '1';
      rest();
    }
    const left = d.left - dx;
    const dt = Math.max(1, e.timeStamp - d.t);
    d.v = (left - deck.scrollLeft) / dt;
    d.t = e.timeStamp;
    deck.scrollLeft = left;
  };
  const dragEnd = (e: PointerEvent<HTMLDivElement>) => {
    const deck = deckRef.current;
    const d = drag.current;
    if (!deck || d.id !== e.pointerId) return;
    d.id = -1;
    if (!d.on) return;
    d.on = false;
    // The end of a drag is not a click on whatever was under the pointer.
    d.moved = true;
    window.setTimeout(() => {
      d.moved = false;
    }, 0);
    // Released mid-throw, the deck goes on to the next case in that direction.
    const pos = position();
    const to = Math.abs(d.v) > 0.4 ? (d.v > 0 ? Math.ceil(pos) : Math.floor(pos)) : Math.round(pos);
    scrollToCase(to);
    // Snapping stays off until the glide has landed, or it would cut it short.
    const done = () => {
      delete deck.dataset.drag;
      deck.removeEventListener('scrollend', done);
    };
    deck.addEventListener('scrollend', done);
    window.setTimeout(done, 700);
  };

  return (
    <section
      ref={sectionRef}
      id="trabajo"
      className={styles.trabajo}
      aria-label={t(COPY.a11y.trabajo)}
    >
      <div
        ref={stageRef}
        className={styles.stage}
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
          <div className={styles.controls}>
            <span ref={countRef} className={styles.count} data-off="0">
              01 / {pad2(n)}
            </span>
            <button
              ref={prevRef}
              type="button"
              className={styles.arrow}
              aria-label={t(COPY.a11y.prevCase)}
              onClick={() => scrollToCase(motion.current.active - 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button
              ref={nextRef}
              type="button"
              className={styles.arrow}
              aria-label={t(COPY.a11y.nextCase)}
              onClick={() => scrollToCase(motion.current.active + 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.body}>
          {/* One identity block at a time, before the film: the reader knows
              whose case this is and what FOCUS did before watching it. */}
          <div className={styles.captions}>
            {WORKS.map((w, i) => {
              const service = w.caseStudy
                ? t(w.caseStudy.service)
                : w.services
                    .map((id) => t(CASE_SERVICE_TITLE[id] ?? SERVICE_BY_ID[id].title))
                    .join(' + ');

              return (
                <div
                  key={w.id}
                  ref={(el) => {
                    captionRefs.current[i] = el;
                  }}
                  className={`${styles.caption} ${styles.caseCaption}`}
                  aria-hidden="true"
                >
                  <div className={styles.caseIdentity}>
                    <p className={styles.caseCategory}>{t(w.category)}</p>
                    <h3 className={styles.name}>{w.client}</h3>
                  </div>
                  <p
                    className={styles.primaryService}
                    style={{ color: ACCENT_TEXT[w.accent] }}
                  >
                    {service}
                  </p>
                </div>
              );
            })}
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

          <div
            ref={deckRef}
            className={styles.deck}
            onPointerDown={dragStart}
            onPointerMove={dragMove}
            onPointerUp={dragEnd}
            onPointerCancel={dragEnd}
            onDragStart={(e) => e.preventDefault()}
            onClickCapture={(e) => {
              if (!drag.current.moved) return;
              drag.current.moved = false;
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {WORKS.map((w, i) => {
              const service = w.caseStudy
                ? t(w.caseStudy.service)
                : w.services
                    .map((id) => t(CASE_SERVICE_TITLE[id] ?? SERVICE_BY_ID[id].title))
                    .join(' + ');
              const face = (
                <span
                  ref={(el) => {
                    turnRefs.current[i] = el;
                  }}
                  className={styles.turn}
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
                        playsInline
                        preload="none"
                        disablePictureInPicture
                        aria-hidden="true"
                        tabIndex={-1}
                        onEnded={() => {
                          endedRefs.current.add(i);
                          setState(i, 'details');
                        }}
                      />
                    )}
                    <span className={styles.sheen} />
                    {w.video && <span className={styles.wait} />}
                    <CaseStudyOverlay work={w} />
                  </span>
                </span>
              );

              return (
                <article
                  key={w.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={`${styles.card} ${styles.caseCard}`}
                  tabIndex={0}
                  aria-label={`${w.client}, ${service}. ${t(w.category)}.`}
                  onClick={touch ? toggleTouchCase(i) : bringForward(i)}
                  onFocus={() => {
                    if (i !== motion.current.active) scrollToCase(i);
                    if (!touch) setState(i, 'details');
                  }}
                  onBlur={(e) => {
                    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                    if (!endedRefs.current.has(i)) settle();
                  }}
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') setState(i, 'details');
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType !== 'mouse') return;
                    if (!endedRefs.current.has(i)) settle();
                  }}
                >
                  {face}
                </article>
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
              <span
                ref={(el) => {
                  turnRefs.current[n] = el;
                }}
                className={styles.turn}
              >
                <span className={`${styles.face} ${styles.faceEmpty}`}>
                  <span className={styles.plus} aria-hidden="true" />
                  <span className={styles.nextLabel}>{t(COPY.trabajo.cta)}</span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SERVICES, COPY } from '@/lib/content';
import styles from './servicios.module.css';

/**
 * The spectrum, one stop per service. It runs through the brand's three
 * additive primaries (magenta, blue, green) rather than a literal rainbow:
 * the manual allows those three and nothing else, and red/orange/yellow
 * appear nowhere else on the site. Presentational, so it lives here rather
 * than in content.ts.
 */
const SPECTRUM = [
  '#FF00FF',
  '#C010FF',
  '#8020FF',
  '#0033FF',
  '#0080DD',
  '#00C088',
  '#00FF33',
] as const;

/** Which bands are light enough to need ink text instead of paper. */
const INK_TEXT = new Set([0, 5, 6]);

/** Below this the optical bench has no room; the bands stand on their own. */
const NARROW_AT = 760;

/** Where each ray meets the prism face, in viewBox units. */
const FACE_Y = (i: number) => 316 + i * 2;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/**
 * Services as an inverted prism: the spectrum goes in, one white beam comes
 * out. It is the refraction concept run backwards, and it sits immediately
 * before the Refracción section so that screen arrives already legible.
 *
 * Scroll-scrubbed. The section is 260vh with a sticky 100vh stage, and a
 * single progress value drives the whole sequence: the glass draws, the
 * bands slide in staggered, the rays sweep to the prism, it flashes, the
 * beam fans out and settles into a slow breath.
 *
 * Every frame writes straight to `style` through refs. No state changes
 * while scrolling or hovering, so React never re-renders during the
 * animation.
 */
export function Servicios() {
  const { t } = useTranslate();
  const reduce = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bandRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const fillRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const detailRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rayRefs = useRef<Array<SVGPolygonElement | null>>([]);
  const outlineRef = useRef<SVGPathElement>(null);
  const glassRef = useRef<SVGGElement>(null);
  const fanRef = useRef<SVGGElement>(null);
  const beamRef = useRef<SVGGElement>(null);
  const flashInRef = useRef<SVGCircleElement>(null);
  const flashOutRef = useRef<SVGCircleElement>(null);

  /** -1 none, 0..6 a band, 99 the beam (which lights every band). */
  const hoverRef = useRef(-1);
  const lastPRef = useRef(0);
  const narrowRef = useRef(false);
  const breathingRef = useRef(false);

  const scrub = useCallback(
    (p: number) => {
      lastPRef.current = p;
      const narrow = narrowRef.current;
      const hover = hoverRef.current;

      // The glass draws itself first, before anything travels through it.
      const pd = clamp01(p / 0.14);
      if (outlineRef.current) {
        outlineRef.current.style.strokeDashoffset = (100 * (1 - pd)).toFixed(2);
      }
      if (glassRef.current) glassRef.current.style.opacity = pd.toFixed(3);

      SERVICES.forEach((_, i) => {
        const band = bandRefs.current[i];
        if (!band) return;
        const bp = narrow ? 1 : clamp01((p - 0.03 - i * 0.028) / 0.09);
        const lit = hover === i || hover === 99;
        const dim = hover !== -1 && !lit;

        band.style.opacity = (bp * (dim ? 0.32 : 1)).toFixed(3);
        band.style.transform =
          bp >= 1 ? 'none' : `translateX(${(-44 * (1 - bp)).toFixed(1)}px)`;

        const fill = fillRefs.current[i];
        if (fill) {
          fill.style.transform = hover === i ? 'scaleY(1.14)' : 'scaleY(1)';
          fill.style.filter = lit
            ? `saturate(1.3) drop-shadow(0 0 14px ${SPECTRUM[i]})`
            : 'none';
        }
        const detail = detailRefs.current[i];
        if (detail) {
          // On touch there is no hover, so the detail is simply always there.
          const show = hover === i || narrow;
          detail.style.opacity = show ? '1' : '0';
          detail.style.transform = show ? 'none' : 'translateX(10px)';
        }

        const ray = rayRefs.current[i];
        if (ray) {
          const rp = clamp01((p - 0.15 - i * 0.045) / 0.32);
          ray.style.clipPath = `inset(0 ${(100 * (1 - rp)).toFixed(2)}% 0 0)`;
          ray.style.opacity = hover === -1 ? '.92' : lit ? '1' : '.14';
          ray.style.filter = lit ? `drop-shadow(0 0 10px ${SPECTRUM[i]})` : 'none';
        }
      });

      if (flashInRef.current) {
        flashInRef.current.style.opacity = (
          Math.max(0, 1 - Math.abs(p - 0.6) / 0.1) * 0.9
        ).toFixed(3);
      }
      if (fanRef.current) {
        const fp = clamp01((p - 0.56) / 0.17);
        fanRef.current.style.clipPath = `inset(0 ${(100 * (1 - fp)).toFixed(2)}% 0 0)`;
      }
      if (flashOutRef.current) {
        flashOutRef.current.style.opacity = Math.max(
          0,
          1 - Math.abs(p - 0.75) / 0.09,
        ).toFixed(3);
      }

      const wp = clamp01((p - 0.72) / 0.2);
      const beam = beamRef.current;
      if (beam) {
        beam.style.clipPath = `inset(0 ${(100 * (1 - wp)).toFixed(2)}% 0 0)`;
        // Once it has fully arrived it breathes, but only then: animating a
        // clipped element mid-sweep fights the scrub.
        if (wp >= 1 && !breathingRef.current && !reduce) {
          breathingRef.current = true;
          beam.style.animation = 'focBeamBreath 5.5s ease-in-out infinite';
        } else if (wp < 1 && breathingRef.current) {
          breathingRef.current = false;
          beam.style.animation = 'none';
        }
      }
    },
    [reduce],
  );

  /**
   * Point each ray at the band it belongs to. The bands are laid out by CSS,
   * so their real positions are measured and mapped into the SVG's viewBox
   * instead of being guessed; the rays then meet the glass in a tight fan.
   */
  const layoutRays = useCallback(() => {
    const right = rightRef.current;
    if (!right || narrowRef.current) return;
    const rr = right.getBoundingClientRect();
    if (rr.height < 40) return;
    const toViewBox = (px: number) => (px / rr.height) * 700;

    const boxes = bandRefs.current.map((b) => b?.getBoundingClientRect());
    boxes.forEach((box, i) => {
      const ray = rayRefs.current[i];
      if (!ray || !box) return;
      const top = toViewBox(box.top - rr.top);
      const bottom = toViewBox(box.bottom - rr.top);
      const prev = boxes[i - 1];
      const next = boxes[i + 1];
      // Meet the neighbours halfway so the fan has no gaps between rays.
      const midTop = prev ? (top + toViewBox(prev.bottom - rr.top)) / 2 - 0.6 : top;
      const midBottom = next
        ? (bottom + toViewBox(next.top - rr.top)) / 2 + 0.6
        : bottom;
      ray.setAttribute(
        'points',
        `0,${top.toFixed(1)} 22,${midTop.toFixed(1)} 465,${FACE_Y(i)} ` +
          `465,${FACE_Y(i) + 2} 22,${midBottom.toFixed(1)} 0,${bottom.toFixed(1)}`,
      );
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const measure = () => {
      const narrow = section.getBoundingClientRect().width < NARROW_AT;
      narrowRef.current = narrow;
      stage.dataset.narrow = narrow ? '1' : '0';
      layoutRays();
      scrub(lastPRef.current);
    };

    measure();
    // Rotis loads async and changes the band heights, which moves the rays.
    const settle = window.setTimeout(measure, 400);
    document.fonts?.ready.then(measure).catch(() => {});

    const ro = new ResizeObserver(measure);
    ro.observe(section);
    return () => {
      window.clearTimeout(settle);
      ro.disconnect();
    };
  }, [layoutRays, scrub]);

  useWindowScroll(() => {
    const section = sectionRef.current;
    if (!section) return;
    const r = section.getBoundingClientRect();
    if (r.bottom < -100 || r.top > window.innerHeight + 100) return;
    scrub(clamp01(-r.top / Math.max(1, r.height - window.innerHeight)));
  });

  const setHover = (h: number) => {
    hoverRef.current = h;
    scrub(lastPRef.current);
  };

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className={styles.prisma}
      aria-label="Servicios"
    >
      <div className={styles.sticky}>
        <div className={styles.header}>
          <div>
            <Reveal className={styles.eyebrow}>
              <Eyebrow section line="var(--focus-blue)" color="var(--focus-gray-300)">
                {t(COPY.servicios.eyebrow)}
              </Eyebrow>
            </Reveal>
            <h2 className={styles.title}>{t(COPY.servicios.title)}</h2>
          </div>
          <p className={styles.intro}>{t(COPY.servicios.intro)}</p>
        </div>

        <div ref={stageRef} className={styles.stage}>
          <div className={styles.bands}>
            {SERVICES.map((s, i) => (
              <a
                key={s.n}
                ref={(el) => {
                  bandRefs.current[i] = el;
                }}
                href="#contacto"
                className={`${styles.band} ${INK_TEXT.has(i) ? styles.bandInk : ''}`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(-1)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(-1)}
              >
                <span
                  ref={(el) => {
                    fillRefs.current[i] = el;
                  }}
                  className={styles.bandFill}
                  style={{
                    background: `linear-gradient(90deg, ${SPECTRUM[i]}b8, ${SPECTRUM[i]} 26%)`,
                  }}
                  aria-hidden="true"
                />
                <span className={styles.bandRow}>
                  <span className={styles.bandNum} aria-hidden="true">
                    {s.n}
                  </span>
                  <h3 className={styles.bandTitle}>{t(s.title)}</h3>
                  <span
                    ref={(el) => {
                      detailRefs.current[i] = el;
                    }}
                    className={styles.bandDetail}
                  >
                    {t(s.detail)}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <div ref={rightRef} className={styles.bench}>
            <svg
              viewBox="0 0 1000 700"
              preserveAspectRatio="none"
              aria-hidden="true"
              className={styles.svg}
            >
              <defs>
                {SPECTRUM.map((c, i) => (
                  <linearGradient key={c} id={`prRay${i}`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor={c} stopOpacity="1" />
                    <stop offset="1" stopColor={c} stopOpacity=".62" />
                  </linearGradient>
                ))}
                <radialGradient id="prFlash">
                  <stop offset="0" stopColor="#FFFFFF" stopOpacity=".95" />
                  <stop offset=".45" stopColor="#FFFFFF" stopOpacity=".32" />
                  <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="prHalo">
                  <stop offset="0" stopColor="#F6F6F4" stopOpacity=".07" />
                  <stop offset="1" stopColor="#F6F6F4" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="prGround">
                  <stop offset="0" stopColor="#F6F6F4" stopOpacity=".14" />
                  <stop offset=".6" stopColor="#F6F6F4" stopOpacity=".05" />
                  <stop offset="1" stopColor="#F6F6F4" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="prBeamCore" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#FFFFFF" stopOpacity=".97" />
                  <stop offset="1" stopColor="#FFFFFF" stopOpacity=".8" />
                </linearGradient>
                <linearGradient id="prBeamGlow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#FFFFFF" stopOpacity=".3" />
                  <stop offset="1" stopColor="#FFFFFF" stopOpacity=".05" />
                </linearGradient>
                <linearGradient id="prGlassFront" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F6F6F4" stopOpacity=".13" />
                  <stop offset=".45" stopColor="#9FB6FF" stopOpacity=".06" />
                  <stop offset="1" stopColor="#F6F6F4" stopOpacity=".02" />
                </linearGradient>
                <linearGradient id="prGlassSide" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F6F6F4" stopOpacity=".18" />
                  <stop offset="1" stopColor="#F6F6F4" stopOpacity=".04" />
                </linearGradient>
                <linearGradient id="prGlassBot" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F6F6F4" stopOpacity=".07" />
                  <stop offset="1" stopColor="#F6F6F4" stopOpacity=".02" />
                </linearGradient>
                <linearGradient id="prGlassBack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F6F6F4" stopOpacity=".05" />
                  <stop offset="1" stopColor="#F6F6F4" stopOpacity=".01" />
                </linearGradient>
                <linearGradient id="prRefl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F6F6F4" stopOpacity="0" />
                  <stop offset="1" stopColor="#F6F6F4" stopOpacity=".08" />
                </linearGradient>
                <linearGradient id="prInner" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#FFFFFF" stopOpacity=".35" />
                  <stop offset="1" stopColor="#FFFFFF" stopOpacity=".9" />
                </linearGradient>
              </defs>

              <circle cx="575" cy="330" r="400" fill="url(#prHalo)" />

              {SPECTRUM.map((c, i) => (
                <polygon
                  key={c}
                  ref={(el) => {
                    rayRefs.current[i] = el;
                  }}
                  className={styles.ray}
                  points={`0,${81 + i * 72} 22,${81 + i * 72} 465,${FACE_Y(i)} 465,${FACE_Y(i) + 2} 22,${144 + i * 72} 0,${135 + i * 72}`}
                  fill={`url(#prRay${i})`}
                />
              ))}

              <circle
                ref={flashInRef}
                className={styles.flash}
                cx="465"
                cy="323"
                r="70"
                fill="url(#prFlash)"
              />

              {/* Inside the glass: the spectrum has already become one thing. */}
              <g ref={fanRef} className={styles.wipe}>
                <polygon
                  points="465,316 664,328 664,362 465,330"
                  fill="url(#prInner)"
                  className={styles.screen}
                />
                <polygon
                  points="465,320 664,339 664,351 465,326"
                  fill="#FFFFFF"
                  opacity=".82"
                  className={styles.screen}
                />
              </g>

              <g ref={glassRef} className={styles.glass}>
                <ellipse cx="585" cy="596" rx="300" ry="28" fill="url(#prGround)" />
                <path
                  d="M560,80 L750,565 L370,565 Z"
                  transform="matrix(1,0,0,-1,0,1134)"
                  fill="url(#prRefl)"
                />
                <path
                  d="M606,56 L796,541 L416,541 Z"
                  fill="url(#prGlassBack)"
                  stroke="rgba(246,246,244,.2)"
                  strokeWidth="1"
                />
                <path
                  d="M560,80 L606,56 M750,565 L796,541 M370,565 L416,541"
                  stroke="rgba(246,246,244,.16)"
                  strokeWidth="1"
                  fill="none"
                />
                <path d="M750,565 L796,541 L606,56 L560,80 Z" fill="url(#prGlassSide)" />
                <path d="M370,565 L750,565 L796,541 L416,541 Z" fill="url(#prGlassBot)" />
                <path d="M560,80 L750,565 L370,565 Z" fill="url(#prGlassFront)" />
                <polygon points="556,96 564,114 452,462 441,450" fill="#FFFFFF" opacity=".09" />
                <polygon points="612,170 620,168 716,462 706,466" fill="#FFFFFF" opacity=".05" />
                <circle cx="560" cy="80" r="2.2" fill="#FFFFFF" opacity=".9" />
                <circle cx="750" cy="565" r="2.2" fill="#FFFFFF" opacity=".7" />
                <circle cx="370" cy="565" r="2.2" fill="#FFFFFF" opacity=".7" />
              </g>

              <circle
                ref={flashOutRef}
                className={styles.flash}
                cx="664"
                cy="345"
                r="60"
                fill="url(#prFlash)"
              />

              <g ref={beamRef} className={styles.wipe}>
                <polygon points="664,328 1000,252 1000,360 664,362" fill="url(#prBeamGlow)" />
                <polygon points="664,339 1000,282 1000,330 664,351" fill="url(#prBeamCore)" />
                <text
                  x="850"
                  y="330"
                  transform="rotate(-6.6 850 323)"
                  textAnchor="middle"
                  className={styles.beamLabel}
                >
                  {t(COPY.servicios.beam)}
                </text>
              </g>

              <path
                ref={outlineRef}
                className={styles.outline}
                d="M560,80 L750,565 L370,565 Z"
                pathLength={100}
                fill="none"
                stroke="rgba(246,246,244,.85)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <a
              href="#contacto"
              className={styles.beamHit}
              aria-label={t(COPY.servicios.beamCta)}
              onMouseEnter={() => setHover(99)}
              onMouseLeave={() => setHover(-1)}
              onFocus={() => setHover(99)}
              onBlur={() => setHover(-1)}
            />
          </div>
        </div>

        <div className={styles.foot}>
          <span>{t(COPY.servicios.footIn)}</span>
          <span className={styles.footScroll}>{t(COPY.servicios.footScroll)}</span>
        </div>
      </div>
    </section>
  );
}

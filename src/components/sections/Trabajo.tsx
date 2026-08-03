'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MagneticLink } from '@/components/ui/MagneticLink';
import { WORKS, ACCENT_HEX, COPY } from '@/lib/content';
import styles from './trabajo.module.css';
import ui from '@/components/ui/ui.module.css';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * Horizontal case gallery driven by vertical scroll: while the section is
 * pinned, scrolling advances the track sideways, updating a progress bar and
 * an NN / 06 counter. Cards bloom to color on hover and reveal their blurb.
 */
export function Trabajo() {
  const { t } = useTranslate();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const n = WORKS.length;

  useWindowScroll(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const r = section.getBoundingClientRect();
    const p = clamp01(-r.top / Math.max(1, r.height - window.innerHeight));
    const max = Math.max(0, track.scrollWidth - window.innerWidth + 80);
    track.style.transform = `translate3d(${(-p * max).toFixed(1)}px, 0, 0)`;
    if (fillRef.current) fillRef.current.style.width = `${(p * 100).toFixed(2)}%`;
    if (countRef.current) {
      countRef.current.textContent = `${pad2(Math.min(n, 1 + Math.floor(p * n)))} / ${pad2(n)}`;
    }
  });

  return (
    <section ref={sectionRef} id="trabajo" className={styles.trabajo} aria-label="Trabajo">
      <div className={styles.sticky}>
        <div className={styles.header}>
          <div>
            <Eyebrow line="var(--focus-green)" style={{ marginBottom: 20 }}>
              07 — {t(COPY.trabajo.eyebrow)}
            </Eyebrow>
            <h2 className={styles.title}>
              {t(COPY.trabajo.title)} <span className={styles.titleYear}>2024—26</span>
            </h2>
          </div>
          <span className={styles.hint}>{t(COPY.trabajo.hint)} →</span>
        </div>

        <div ref={trackRef} className={styles.track}>
          {WORKS.map((w) => (
            <a key={w.n} href="#contacto" className={styles.card}>
              <Image
                src={w.img}
                alt={`${w.category} — ${w.title}`}
                fill
                sizes="(max-width: 640px) 72vw, 480px"
                className={styles.cardImg}
              />
              <div className={styles.cardGrad} />
              <div className={styles.cardNum} aria-hidden="true">
                {w.n}
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardCat} style={{ color: ACCENT_HEX[w.accent] }}>
                  {w.category}
                </div>
                <div className={styles.cardTitle}>{w.title}</div>
                <div className={styles.cardMeta}>
                  <p>{t(w.desc)}</p>
                </div>
              </div>
            </a>
          ))}

          <div className={styles.endCard}>
            <MagneticLink
              href="#contacto"
              accent="var(--focus-magenta)"
              className={`${ui.btn} ${ui.btnGhost}`}
              style={{ padding: '22px 36px', fontSize: 12 }}
            >
              {t(COPY.trabajo.cta)}
              <span className={ui.btnLine} />
            </MagneticLink>
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

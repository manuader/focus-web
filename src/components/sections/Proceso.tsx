'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useReveal } from '@/hooks/useReveal';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { RingsMotif } from '@/components/ui/RingsMotif';
import { PROCESS, COPY } from '@/lib/content';
import styles from './proceso.module.css';

const CARD_BG = ['#111216', '#101114', '#0f1013', '#0d0e11'];
const STICKY_TOP = [96, 120, 144, 168];

const grade = (f: string): CSSProperties => ({ filter: f });

/** The distinct right-hand visual for each of the four movements. */
function Visual({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <div className={styles.right}>
          <Image
            src="/assets/img-01.jpg"
            alt=""
            fill
            sizes="50vw"
            className={styles.rightImg}
            style={grade('grayscale(1) brightness(0.45) contrast(1.2)')}
          />
          <div className={styles.miniLens} style={{ left: '24%', top: '30%', width: 180, height: 180 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img-01.jpg"
              alt=""
              style={{ width: 640, maxWidth: 'none', transform: 'translate(-160px, -160px)', filter: 'saturate(1.4)' }}
            />
          </div>
        </div>
      );
    case 1:
      return (
        <div className={styles.right}>
          <Image
            src="/assets/img-02.jpg"
            alt=""
            fill
            sizes="50vw"
            className={styles.rightImg}
            style={grade('grayscale(1) brightness(0.45) contrast(1.2)')}
          />
          <div className={styles.rLetter} style={{ color: 'var(--focus-magenta)', transform: 'translate(-4px, 0)' }}>
            R
          </div>
          <div className={styles.rLetter} style={{ color: 'var(--focus-blue)', transform: 'translate(0, 3px)' }}>
            R
          </div>
          <div className={styles.rLetter} style={{ color: 'var(--focus-green)', transform: 'translate(4px, -3px)' }}>
            R
          </div>
        </div>
      );
    case 2:
      return (
        <div className={styles.right} style={{ background: 'var(--focus-ink)' }}>
          <div
            className={styles.circle}
            style={{ left: '22%', top: '28%', background: 'var(--focus-magenta)', animation: 'focDrift 9s ease-in-out infinite' }}
          />
          <div
            className={styles.circle}
            style={{ left: '42%', top: '34%', background: 'var(--focus-blue)', mixBlendMode: 'difference', animation: 'focDrift 11s ease-in-out infinite reverse' }}
          />
        </div>
      );
    default:
      return (
        <div className={styles.right}>
          <Image
            src="/assets/img-03.jpg"
            alt=""
            fill
            sizes="50vw"
            className={styles.rightImg}
            style={grade('grayscale(1) brightness(0.35) contrast(1.25) blur(7px)')}
          />
          <div className={`${styles.miniLens} ${styles.miniLensStrong}`} style={{ left: '56%', top: '38%', width: 170, height: 170 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img-03.jpg"
              alt=""
              style={{ width: 700, maxWidth: 'none', transform: 'translate(-350px, -190px)', filter: 'saturate(1.45) contrast(1.1)' }}
            />
          </div>
          <RingsMotif radii={[30, 90, 160]} size={400} strokeWidth={1} dotRadius={10} className={styles.rings} />
        </div>
      );
  }
}

/** Four movements to focus, as a sticky stack of cards. */
export function Proceso() {
  const { t } = useTranslate();
  const title = useReveal<HTMLHeadingElement>(70);

  return (
    <section className={styles.proceso} id="proceso" aria-label="Proceso">
      <div className={styles.head}>
        <Reveal className={styles.eyebrow}>
          <Eyebrow line="var(--focus-magenta)">08 — {t(COPY.proceso.eyebrow)}</Eyebrow>
        </Reveal>
        <h2 ref={title.ref} className={styles.title} style={title.style}>
          {t(COPY.proceso.title1)}
          <br />
          {t(COPY.proceso.title2)}
        </h2>
      </div>

      <div className={styles.stack}>
        {PROCESS.map((step, i) => (
          <article
            key={step.label}
            className={styles.card}
            style={{ top: STICKY_TOP[i], background: CARD_BG[i] }}
          >
            <div className={styles.left}>
              <div className={styles.label} style={{ WebkitTextStroke: `1.5px ${step.stroke}` }}>
                {step.label}
              </div>
              <div>
                <div className={styles.name}>{step.name}</div>
                <p className={styles.desc}>{t(step.desc)}</p>
              </div>
            </div>
            <Visual index={i} />
          </article>
        ))}
      </div>
    </section>
  );
}

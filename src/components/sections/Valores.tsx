'use client';

import Image from 'next/image';
import { useTranslate } from '@/hooks/useTranslate';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { VALUES, ACCENT_HEX, COPY } from '@/lib/content';
import styles from './valores.module.css';

/** Four brand values; hovering a card blooms its two overlapping accent dots. */
export function Valores() {
  const { t } = useTranslate();

  return (
    <section className={styles.valores} aria-label="Valores">
      <div className={styles.cornerImg} aria-hidden="true">
        <Image src="/assets/img-04.jpg" alt="" fill sizes="520px" />
      </div>

      <div className={styles.inner}>
        <Reveal className={styles.eyebrow}>
          <Eyebrow section line="var(--focus-magenta)" color="var(--focus-gray-700)">
            {t(COPY.valores.eyebrow)}
          </Eyebrow>
        </Reveal>

        <div className={styles.grid}>
          {VALUES.map((v) => (
            <article key={v.n} className={styles.card}>
              <span className={styles.dot} style={{ background: ACCENT_HEX[v.dotA] }} />
              <span className={styles.dot2} style={{ background: ACCENT_HEX[v.dotB] }} />
              <div className={styles.num}>{v.n}</div>
              <h3 className={styles.name}>{v.name}</h3>
              <p className={styles.desc}>{t(v.desc)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

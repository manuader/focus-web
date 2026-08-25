'use client';

import Image from 'next/image';
import { useInView } from '@/hooks/useInView';
import { useTranslate } from '@/hooks/useTranslate';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { VALUES, ACCENT_HEX, COPY } from '@/lib/content';
import styles from './valores.module.css';

/**
 * One value card. The two accent dots bloom on hover — and on touch, where
 * there is no hover to give, the card arriving on screen stands in for it.
 */
function ValorCard({ value }: { value: (typeof VALUES)[number] }) {
  const { t } = useTranslate();
  const [ref, inView] = useInView<HTMLElement>({ rootMargin: '0px 0px -20% 0px' });

  return (
    <article ref={ref} className={styles.card} data-bloom={inView ? '1' : '0'}>
      <span className={styles.dot} style={{ background: ACCENT_HEX[value.dotA] }} />
      <span className={styles.dot2} style={{ background: ACCENT_HEX[value.dotB] }} />
      <div className={styles.num}>{value.n}</div>
      <h3 className={styles.name}>{value.name}</h3>
      <p className={styles.desc}>{t(value.desc)}</p>
    </article>
  );
}

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
            <ValorCard key={v.n} value={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { useTranslate } from '@/hooks/useTranslate';
import { useReveal } from '@/hooks/useReveal';
import { useCountUp } from '@/hooks/useCountUp';
import { STATS, type Stat as StatData } from '@/lib/content';
import styles from './cifras.module.css';

function Stat({ stat }: { stat: StatData }) {
  const { t } = useTranslate();
  const { ref, style, revealed } = useReveal<HTMLDivElement>();
  const value = useCountUp(stat.value, revealed);

  return (
    <div ref={ref} style={style}>
      <div className={styles.value}>
        <span>{value}</span>
        {stat.suffix ? <span className={styles.suffix}>{stat.suffix}</span> : null}
      </div>
      <div className={styles.label}>{t(stat.label)}</div>
    </div>
  );
}

/** Headline numbers that count up as they enter view. */
export function Cifras() {
  return (
    <section className={styles.cifras} aria-label="Cifras">
      <div className={styles.grid}>
        {STATS.map((stat) => (
          <Stat key={stat.label.es} stat={stat} />
        ))}
      </div>
      <div className={styles.imgWrap} aria-hidden="true">
        <Image src="/assets/img-04.jpg" alt="" fill sizes="100vw" className={styles.img} />
      </div>
    </section>
  );
}

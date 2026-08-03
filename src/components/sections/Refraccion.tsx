'use client';

import { useEffect, useRef } from 'react';
import { usePointer } from '@/context/PointerContext';
import { useTranslate } from '@/hooks/useTranslate';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { COPY } from '@/lib/content';
import styles from './refraccion.module.css';

const WORD = 'REFRACCIÓN';
const LAYERS = [
  { color: 'var(--focus-magenta)', factor: 0.09, abs: true },
  { color: 'var(--focus-blue)', factor: -0.07, abs: true },
  { color: 'var(--focus-green)', factor: 0.045, abs: false },
];

/**
 * The message split into its three additive-light layers. Moving the cursor
 * pulls each layer by a different factor; holding still lets them recombine
 * into white where they overlap.
 */
export function Refraccion() {
  const { t } = useTranslate();
  const { enabled, subscribe } = usePointer();
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current;
    if (!section) return;
    return subscribe(({ sx, sy }) => {
      const r = section.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= window.innerHeight) return;
      const nx = sx - window.innerWidth / 2;
      const ny = sy - (r.top + r.height / 2);
      LAYERS.forEach((layer, i) => {
        const el = layerRefs.current[i];
        if (!el) return;
        el.style.transform = `translate3d(${(nx * layer.factor).toFixed(1)}px, ${(ny * layer.factor * 0.6).toFixed(1)}px, 0)`;
      });
    });
  }, [enabled, subscribe]);

  return (
    <section ref={sectionRef} className={styles.refrac} aria-label="Refracción">
      <Eyebrow line="var(--focus-blue)" className={styles.eyebrow}>
        04 — Refracción
      </Eyebrow>

      <div className={styles.center}>
        <div className={styles.stack} aria-label={WORD}>
          {LAYERS.map((layer, i) => (
            <div
              key={layer.color}
              ref={(el) => {
                layerRefs.current[i] = el;
              }}
              className={`${styles.layer} ${layer.abs ? styles.layerAbs : ''}`}
              style={{ color: layer.color }}
              aria-hidden="true"
            >
              {WORD}
            </div>
          ))}
        </div>
        <div className={styles.para}>{t(COPY.refraccion.para)}</div>
        <div className={styles.hint}>{t(COPY.refraccion.hint)}</div>
      </div>
    </section>
  );
}

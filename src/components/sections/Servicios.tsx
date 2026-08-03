'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePointer } from '@/context/PointerContext';
import { useTranslate } from '@/hooks/useTranslate';
import { useReveal } from '@/hooks/useReveal';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SERVICES, COPY } from '@/lib/content';
import styles from './servicios.module.css';

/**
 * The services list. Rows nudge and recolor on hover (CSS), and a framed
 * "peek" of the discipline's image trails the cursor (fine pointers only).
 */
export function Servicios() {
  const { t } = useTranslate();
  const { enabled, subscribe } = usePointer();
  const title = useReveal<HTMLHeadingElement>(70);

  const peekRef = useRef<HTMLDivElement>(null);
  const onRef = useRef(false);
  const [peek, setPeek] = useState<{ src: string | null; on: boolean }>({
    src: null,
    on: false,
  });

  useEffect(() => {
    if (!enabled) return;
    const el = peekRef.current;
    if (!el) return;
    return subscribe(({ x, y }) => {
      if (!onRef.current) return;
      el.style.transform = `translate3d(${x + 28}px, ${y - 190}px, 0)`;
    });
  }, [enabled, subscribe]);

  const showPeek = (src: string) => {
    if (!enabled) return;
    onRef.current = true;
    setPeek({ src, on: true });
  };
  const hidePeek = () => {
    onRef.current = false;
    setPeek((p) => ({ ...p, on: false }));
  };

  return (
    <section className={styles.servicios} id="servicios" aria-label="Servicios">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <Reveal className={styles.eyebrow}>
              <Eyebrow line="var(--focus-blue)">06 — {t(COPY.servicios.eyebrow)}</Eyebrow>
            </Reveal>
            <h2 ref={title.ref} className={styles.title} style={title.style}>
              {t(COPY.servicios.title)}
            </h2>
          </div>
          <Reveal>
            <p className={styles.intro}>{t(COPY.servicios.intro)}</p>
          </Reveal>
        </div>

        <div className={styles.list}>
          {SERVICES.map((s) => (
            <a
              key={s.n}
              href="#contacto"
              className={styles.row}
              onMouseEnter={() => showPeek(s.img)}
              onMouseLeave={hidePeek}
            >
              <span className={styles.rowNum}>{s.n}</span>
              <span className={styles.rowTitle}>{t(s.title)}</span>
              <span className={styles.rowDetail}>{t(s.detail)}</span>
            </a>
          ))}
        </div>
      </div>

      {enabled ? (
        <div
          ref={peekRef}
          className={`${styles.peek} ${peek.on ? styles.peekOn : ''}`}
          aria-hidden="true"
        >
          {peek.src ? (
            <Image src={peek.src} alt="" fill sizes="300px" className={styles.peekImg} />
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

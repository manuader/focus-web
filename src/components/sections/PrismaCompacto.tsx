'use client';

import { useEffect, useRef } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { COPY } from '@/lib/content';
import { createPrismScene, type PrismScene } from './prismScene';
import { SPECTRUM } from './spectrum';
import styles from './servicios.module.css';

const FINAL_PROGRESS = 0.92;

/** The current prism, condensed into one self-playing editorial panel. */
export function PrismaCompacto() {
  const { t } = useTranslate();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tagRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const canvas = canvasRef.current;
    if (!panel || !canvas) return;

    const scene: PrismScene | null = createPrismScene(canvas, SPECTRUM);
    if (!scene) return;

    let raf = 0;
    let visible = false;
    let played = false;
    let progress = reduce ? FINAL_PROGRESS : -0.16;
    let startedAt = 0;

    const measure = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width < 10 || height < 10) return;
      scene.resize(
        { W: width, H: height, top: 24, bottom: height - 24 },
        Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(3.2e6 / (width * height))),
      );
    };

    const placeTag = (sceneFrame: ReturnType<PrismScene['render']>) => {
      const tag = tagRef.current;
      if (!tag) return;
      const half = tag.offsetWidth / 2;
      const along = Math.max(
        half + 16,
        Math.min(sceneFrame.tag.room * 0.56, sceneFrame.tag.room - half - 12),
      );
      const x = sceneFrame.tag.x + Math.cos(sceneFrame.tag.angle) * along;
      const y = sceneFrame.tag.y + Math.sin(sceneFrame.tag.angle) * along;
      tag.style.transform =
        `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) ` +
        `translate(-50%, -50%) rotate(${sceneFrame.tag.angle.toFixed(4)}rad)`;
      tag.style.opacity = sceneFrame.tag.opacity.toFixed(3);
      tag.style.pointerEvents = sceneFrame.tag.opacity > 0.5 ? 'auto' : 'none';
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible) return;

      if (!played && !reduce) {
        if (!startedAt) startedAt = now;
        const elapsed = (now - startedAt) / 1900;
        progress = Math.min(FINAL_PROGRESS, -0.16 + elapsed * (FINAL_PROGRESS + 0.16));
        if (progress >= FINAL_PROGRESS) played = true;
      } else {
        progress = FINAL_PROGRESS;
        played = true;
      }

      placeTag(scene.render(progress, reduce ? 0 : now / 1000));
      if (!reduce || !played) raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          measure();
          kick();
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: '120px 0px' },
    );
    const ro = new ResizeObserver(() => {
      measure();
      kick();
    });

    io.observe(panel);
    ro.observe(canvas);
    measure();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [reduce]);

  return (
    <div ref={panelRef} className={styles.prismPanel}>
      <p className={styles.prismEquation} aria-hidden="true">
        <span>7</span> {t({ es: 'disciplinas', en: 'disciplines' })} <i>→</i> <span>1</span>{' '}
        {t({ es: 'marca', en: 'brand' })}
      </p>
      <canvas ref={canvasRef} className={styles.prismCanvas} aria-hidden="true" />
      <a ref={tagRef} href="#contacto" className={styles.prismTag}>
        {t(COPY.servicios.beam)}
      </a>
    </div>
  );
}

'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { COPY } from '@/lib/content';
import { createPrismScene, type PrismScene } from './prismScene';
import { SPECTRUM } from './spectrum';
import styles from './servicios.module.css';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

interface Props {
  sectionRef: RefObject<HTMLElement | null>;
  onRays: (rays: readonly number[]) => void;
}

/** The current prism, driven in both directions by the section scroll. */
export function PrismaCompacto({ sectionRef, onRays }: Props) {
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
    let primed = false;
    let shown = -0.16;

    const progress = () => {
      const section = sectionRef.current;
      if (!section) return -0.16;
      const rect = section.getBoundingClientRect();
      const range = Math.max(1, rect.height - window.innerHeight);
      return clamp(-rect.top / range, -0.16, 0.96);
    };

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

      const target = progress();
      if (!primed || reduce) {
        shown = target;
        primed = true;
      } else {
        shown += (target - shown) * 0.18;
        if (Math.abs(target - shown) < 0.0001) shown = target;
      }

      const sceneFrame = scene.render(shown, reduce ? 0 : now / 1000);
      placeTag(sceneFrame);
      onRays(sceneFrame.rays);
      if (!reduce || shown !== target) raf = requestAnimationFrame(frame);
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
    const onScroll = () => kick();

    io.observe(panel);
    ro.observe(canvas);
    window.addEventListener('scroll', onScroll, { passive: true });
    measure();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [onRays, reduce, sectionRef]);

  return (
    <div ref={panelRef} className={styles.prismPanel}>
      <canvas ref={canvasRef} className={styles.prismCanvas} aria-hidden="true" />
      <a ref={tagRef} href="#contacto" className={styles.prismTag}>
        {t(COPY.servicios.beam)}
      </a>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { useChromaticFlicker } from '@/hooks/useChromaticFlicker';
import { Reveal } from '@/components/ui/Reveal';
import { MagneticLink } from '@/components/ui/MagneticLink';
import { ContactForm } from './ContactForm';
import { COPY, CONTACT } from '@/lib/content';
import styles from './contacto.module.css';
import ui from '@/components/ui/ui.module.css';

/** Closing call to action with a parallax field and the giant FOCUS outline. */
export function Contacto() {
  const { t } = useTranslate();
  const reduce = useReducedMotion();
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useChromaticFlicker<HTMLHeadingElement>();

  useWindowScroll(() => {
    if (reduce) return;
    const el = bgRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
    const p = (r.top + r.height / 2 - window.innerHeight / 2) * 0.14;
    el.style.transform = `translate3d(0, ${(-p).toFixed(1)}px, 0)`;
  });

  return (
    <section className={styles.contacto} id="contacto" aria-label="Contacto">
      <div ref={bgRef} className={styles.bgWrap} aria-hidden="true">
        <Image src="/assets/img-04.jpg" alt="" fill sizes="100vw" className={styles.bg} />
      </div>
      <div className={styles.overlay} />
      <div className={styles.ghost} aria-hidden="true">
        FOCUS
      </div>

      <div className={styles.inner}>
        <Reveal className={styles.eyebrow}>{t(COPY.contacto.eyebrow)}</Reveal>

        <Reveal>
          <h2 ref={titleRef} className={styles.title}>
            {t(COPY.contacto.title1)}
            <br />
            <span className={styles.titleAlt}>{t(COPY.contacto.title2)}</span>
          </h2>
        </Reveal>

        <div className={styles.actions}>
          <MagneticLink
            href={`mailto:${CONTACT.email}`}
            className={`${ui.btn} ${ui.btnSolid} ${styles.btnMail}`}
          >
            {CONTACT.email}
            <span className={ui.btnLine} style={{ width: 30 }} />
          </MagneticLink>

          <MagneticLink
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            accent="var(--focus-magenta)"
            className={`${ui.btn} ${ui.btnGhost} ${styles.btnWa}`}
            aria-label={`WhatsApp ${CONTACT.whatsapp}`}
          >
            WhatsApp
          </MagneticLink>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

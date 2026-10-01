'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { useWindowScroll } from '@/hooks/useWindowScroll';
import { useReducedMotion } from '@/hooks/useMediaQuery';
import { useChromaticFlicker } from '@/hooks/useChromaticFlicker';
import { Reveal } from '@/components/ui/Reveal';
import { MagneticLink } from '@/components/ui/MagneticLink';
import { FocusButtonContent } from '@/components/ui/FocusButtonContent';
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

  // The chat opens with the first line already typed, in whichever language
  // the visitor is reading.
  const waHref = `${CONTACT.whatsappHref}?text=${encodeURIComponent(
    t(COPY.contacto.waMensaje),
  )}`;

  return (
    <section className={styles.contacto} id="contacto" aria-label={t(COPY.a11y.contacto)}>
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

        {/* Three ways in, one row: write, message, or book time. */}
        <div className={`${ui.trackHead} ${styles.cta}`}>
          <h3 className={ui.trackLegend}>{t(COPY.contacto.cotiza)}</h3>

          <div className={styles.actions}>
            <MagneticLink
              href={`mailto:${CONTACT.email}`}
              className={`${ui.focusBtn} ${ui.focusBtnSecondary} ${styles.btn}`}
            >
              <FocusButtonContent>{CONTACT.email}</FocusButtonContent>
            </MagneticLink>

            <MagneticLink
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              accent="var(--focus-green)"
              className={`${ui.focusBtn} ${ui.focusBtnSecondary} ${styles.btn}`}
              aria-label={`WhatsApp ${CONTACT.whatsapp}`}
            >
              <FocusButtonContent>WhatsApp</FocusButtonContent>
            </MagneticLink>

            <MagneticLink
              href={CONTACT.meetingHref}
              target="_blank"
              rel="noopener noreferrer"
              accent="var(--focus-magenta)"
              className={`${ui.focusBtn} ${ui.focusBtnPrimary} ${ui.focusBtnInverted} ${styles.btn}`}
            >
              <FocusButtonContent>{t(COPY.contacto.agendar)}</FocusButtonContent>
            </MagneticLink>
          </div>
        </div>
      </div>
    </section>
  );
}

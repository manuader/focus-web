'use client';

import { useId, useState } from 'react';
import { useTranslate } from '@/hooks/useTranslate';
import { COPY, CONTACT } from '@/lib/content';
import styles from './contactForm.module.css';
import ui from '@/components/ui/ui.module.css';

/**
 * Project enquiry form.
 *
 * There is no backend on this site, so submitting composes a pre-filled
 * message and hands off to the visitor's own mail client. Nothing is sent
 * anywhere else and no third party sees the data. To move this to a real
 * endpoint later, replace the body of `onSubmit` with the fetch: the field
 * names below are already the payload.
 */
export function ContactForm() {
  const { t } = useTranslate();
  const f = COPY.contacto.form;
  const uid = useId();
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nombre = String(data.get('nombre') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const mensaje = String(data.get('mensaje') ?? '').trim();

    const subject = `${t(f.asunto)}: ${nombre}`;
    const body = `${t(f.nombre)}: ${nombre}\n${t(f.email)}: ${email}\n\n${mensaje}\n`;
    window.location.href =
      `mailto:${CONTACT.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.legend}>{t(f.legend)}</h3>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-nombre`}>
            {t(f.nombre)}
          </label>
          <input
            id={`${uid}-nombre`}
            className={styles.input}
            name="nombre"
            type="text"
            required
            autoComplete="name"
            placeholder={t(f.nombrePh)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${uid}-email`}>
            {t(f.email)}
          </label>
          <input
            id={`${uid}-email`}
            className={styles.input}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t(f.emailPh)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${uid}-mensaje`}>
          {t(f.mensaje)}
        </label>
        <textarea
          id={`${uid}-mensaje`}
          className={`${styles.input} ${styles.textarea}`}
          name="mensaje"
          rows={4}
          required
          placeholder={t(f.mensajePh)}
        />
      </div>

      <div className={styles.foot}>
        <button type="submit" className={`${ui.btn} ${ui.btnSolid} ${styles.submit}`}>
          {t(f.enviar)}
          <span className={ui.btnLine} style={{ width: 30 }} />
        </button>

        {sent ? (
          <p className={styles.ok} role="status">
            {t(f.ok)}{' '}
            <a href={`mailto:${CONTACT.email}`} className={styles.okMail}>
              {CONTACT.email}
            </a>
          </p>
        ) : (
          <p className={styles.nota}>{t(f.nota)}</p>
        )}
      </div>
    </form>
  );
}

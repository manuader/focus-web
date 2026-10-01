'use client';

import { useTranslate } from '@/hooks/useTranslate';
import { CASE_SERVICE_TITLE, COPY, SERVICE_BY_ID, type WorkCard } from '@/lib/content';
import { FocusButtonContent } from '@/components/ui/FocusButtonContent';
import styles from './trabajo.module.css';
import ui from '@/components/ui/ui.module.css';

/**
 * The single detail layout for every case card. A complete case study fills
 * every editorial field; a newly-added case still inherits the same shell
 * and CTA treatment without inventing missing claims or dates.
 */
export function CaseStudyOverlay({ work }: { work: WorkCard }) {
  const { t } = useTranslate();
  const study = work.caseStudy;
  const instagram = work.href.includes('instagram.com');
  const service = study
    ? t(study.service)
    : work.services
        .map((id) => t(CASE_SERVICE_TITLE[id] ?? SERVICE_BY_ID[id].title))
        .join(' + ');
  const solution = study?.solution ?? work.desc;
  const links = study?.links ?? [
    {
      label: instagram ? COPY.trabajo.visitIg : COPY.trabajo.visitSite,
      href: work.href,
    },
  ];

  return (
    <span className={styles.caseOverlay}>
      <span className={styles.caseIntro}>
        <span className={styles.overlayClient}>{work.client}</span>
        <span className={styles.overlayService}>{service}</span>
      </span>

      {work.notice && <span className={styles.caseNotice}>{t(work.notice)}</span>}

      {study?.challenge && (
        <span className={styles.caseSection}>
          <span className={styles.caseLabel}>
            {t({ es: 'El desafío', en: 'The challenge' })}
          </span>
          <span className={styles.caseCopy}>{t(study.challenge)}</span>
        </span>
      )}

      {solution && (
        <span className={styles.caseSection}>
          <span className={styles.caseLabel}>
            {t(
              study?.solution
                ? { es: 'Qué resolvimos', en: 'What we delivered' }
                : { es: 'El trabajo', en: 'The work' },
            )}
          </span>
          <span className={styles.caseCopy}>{t(solution)}</span>
        </span>
      )}

      {study?.period && <span className={styles.casePeriod}>{t(study.period)}</span>}

      <span
        className={`${styles.caseLinks} ${
          links.length === 1 ? styles.caseLinksSingle : ''
        } ${!study?.period ? styles.caseLinksPush : ''}`}
      >
        {links.map((link, linkIndex) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${ui.focusBtn} ${
              linkIndex === 0 ? ui.focusBtnPrimary : ui.focusBtnSecondary
            }`}
          >
            <FocusButtonContent>{t(link.label)}</FocusButtonContent>
          </a>
        ))}
      </span>
    </span>
  );
}

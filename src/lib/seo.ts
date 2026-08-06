/* ============================================================
   FOCUS — SEO / GEO
   Search engines read the metadata and the sitemap; generative
   engines lean on the JSON-LD, which is why the services and the
   client list are spelled out there as data rather than left for
   a model to infer from the marketing copy.
   ============================================================ */

import { SERVICES, WORKS, CONTACT } from './content';

/**
 * Canonical origin. Taken from the studio's own mail domain; the previous
 * value, focus.studio, was a placeholder from the design mock. Change it
 * here if the site ships on another domain, and robots, sitemap, canonical
 * and JSON-LD all follow.
 */
export const SITE_URL = 'https://focus-creatives.com';

export const SITE_NAME = 'FOCUS creatives';

export const SITE_DESCRIPTION =
  'Agencia de diseño integral y creación de contenido en Buenos Aires. ' +
  'Identidad de marca, dirección de arte, social media management, páginas web, ' +
  'contenido audiovisual y con inteligencia artificial, estrategia, editorial y packaging.';

/** Terms the studio should actually rank for, not a keyword dump. */
export const SITE_KEYWORDS = [
  'agencia de diseño',
  'diseño integral',
  'creación de contenido',
  'identidad de marca',
  'dirección de arte',
  'social media management',
  'community manager',
  'diseño de páginas web',
  'contenido con inteligencia artificial',
  'edición de reels',
  'branding Buenos Aires',
  'agencia creativa Argentina',
];

/**
 * Schema.org graph. ProfessionalService carries the local signals (city,
 * country, area served, contact points) and an explicit catalogue of what
 * the studio sells, so an assistant asked "who does social media in Buenos
 * Aires" has something concrete to quote.
 */
export function buildJsonLd(): string {
  const graph = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'FOCUS',
    url: SITE_URL,
    email: CONTACT.email,
    telephone: CONTACT.whatsapp,
    description: SITE_DESCRIPTION,
    slogan: 'El punto donde todo cambia',
    logo: `${SITE_URL}/assets/focus-logo-light.png`,
    image: `${SITE_URL}/og.png`,
    inLanguage: ['es-AR', 'en'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buenos Aires',
      addressCountry: 'AR',
    },
    areaServed: [
      { '@type': 'City', name: 'Buenos Aires' },
      { '@type': 'Country', name: 'Argentina' },
    ],
    knowsLanguage: ['es', 'en'],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: CONTACT.email,
        telephone: CONTACT.whatsapp,
        areaServed: 'AR',
        availableLanguage: ['Spanish', 'English'],
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title.es,
          description: s.detail.es,
        },
      })),
    },
    /* Real, publicly visible client work. Named so a generative engine can
       answer "who has FOCUS worked with" without guessing. */
    subjectOf: WORKS.map((w) => ({
      '@type': 'CreativeWork',
      name: w.title,
      about: w.category.es,
      description: w.desc.es,
      url: w.href,
    })),
  };

  return JSON.stringify(graph);
}

/* ============================================================
   FOCUS — Content & i18n dictionary
   All copy for the site, co-located ES/EN so translations stay
   in sync. Structural, language-independent data (accent colors,
   image sources, ordinals) lives here too, next to the strings
   it belongs with. Voice: Spanish (Río de la Plata), short and
   aphoristic, no exclamation marks, no em dashes.
   ============================================================ */

export type Lang = 'es' | 'en';

/** A value that exists in both languages. */
export type Localized<T = string> = Record<Lang, T>;

/** Brand accent used to tint a piece. */
export type Accent = 'magenta' | 'blue' | 'green';

export const ACCENT_HEX: Record<Accent, string> = {
  magenta: 'var(--focus-magenta)',
  blue: 'var(--focus-blue)',
  green: 'var(--focus-green)',
};

export interface NavLink {
  href: string;
  label: Localized;
}

export interface ServiceRow {
  n: string;
  /** Kept for when the image hover comes back; the rows currently
      show the animated circuit panel instead. */
  img: string;
  title: Localized;
  detail: Localized;
}

export interface WorkCard {
  n: string;
  img: string;
  accent: Accent;
  /** Where the card points: the account's reels, or the live site. */
  href: string;
  /** Rubro of the client, shown above the title. */
  category: Localized;
  title: string;
  desc: Localized;
}

export interface ValueCard {
  n: string;
  name: string;
  desc: Localized;
  dotA: Accent;
  dotB: Accent;
}

export const NAV_LINKS: NavLink[] = [
  { href: '#nosotros', label: { es: 'Sobre nosotros', en: 'About us' } },
  { href: '#servicios', label: { es: 'Servicios', en: 'Services' } },
  { href: '#trabajo', label: { es: 'Trabajo', en: 'Work' } },
];

/** Marquee words — Spanish brand vocabulary, unchanged across languages. */
export const TICKER_ITEMS = [
  'Identidad de marca',
  'Dirección de arte',
  'Social media management',
  'Contenido audiovisual',
  'Estrategia',
  'Editorial',
  'Packaging',
];

export const SERVICES: ServiceRow[] = [
  {
    n: '01',
    img: '/assets/img-01.jpg',
    title: { es: 'Identidad de marca', en: 'Brand identity' },
    detail: {
      es: 'Naming, isologotipo, sistema completo, manual',
      en: 'Naming, logo, full system, manual',
    },
  },
  {
    n: '02',
    img: '/assets/img-02.jpg',
    title: { es: 'Dirección de arte', en: 'Art direction' },
    detail: {
      es: 'Campañas, producción fotográfica, styling',
      en: 'Campaigns, photo production, styling',
    },
  },
  {
    n: '03',
    img: '/assets/img-03.jpg',
    title: { es: 'Social media management', en: 'Social media management' },
    detail: {
      es: 'Contenido, planificación, comunidad, métricas',
      en: 'Content, planning, community, metrics',
    },
  },
  {
    n: '04',
    img: '/assets/img-04.jpg',
    title: { es: 'Contenido audiovisual', en: 'Audiovisual content' },
    detail: {
      es: 'Piezas para social, film de marca, motion',
      en: 'Social pieces, brand film, motion',
    },
  },
  {
    n: '05',
    img: '/assets/img-05.jpg',
    title: { es: 'Estrategia', en: 'Strategy' },
    detail: {
      es: 'Posicionamiento, arquitectura, tono de voz',
      en: 'Positioning, architecture, tone of voice',
    },
  },
  {
    n: '06',
    img: '/assets/img-06.jpg',
    title: { es: 'Editorial y packaging', en: 'Editorial & packaging' },
    detail: {
      es: 'Libros, catálogos, etiquetas, estuchería',
      en: 'Books, catalogues, labels, boxes',
    },
  },
];

/* Real cases. Each card carries the client's logo and links to their
   Instagram. The artwork in `/assets/clients/*-card.jpg` is the avatar with
   Instagram's gray frame removed: the logo's own background colour is flooded
   across the 4:5 card so the mark fills it without being cropped. */
export const WORKS: WorkCard[] = [
  {
    n: '01',
    img: '/assets/clients/chuchones-card.jpg',
    accent: 'magenta',
    href: 'https://www.instagram.com/chuchones_wines',
    category: { es: 'Vinos boutique', en: 'Boutique wines' },
    title: '@chuchones_wines',
    desc: {
      es: 'Servicio integral de social media management.',
      en: 'Full service social media management.',
    },
  },
  {
    n: '02',
    img: '/assets/clients/rsh-consultora-card.jpg',
    accent: 'blue',
    href: 'https://www.instagram.com/rsh_consultora',
    category: {
      es: 'Licenciado en seguridad e higiene',
      en: 'Health and safety consultancy',
    },
    title: '@rsh_consultora',
    desc: {
      es: 'Servicio integral de social media management.',
      en: 'Full service social media management.',
    },
  },
  {
    n: '03',
    img: '/assets/clients/fernanda-estetica-card.jpg',
    accent: 'green',
    href: 'https://www.instagram.com/esteticaintegralfernanda',
    category: { es: 'Estética y salud', en: 'Beauty and wellness' },
    title: '@esteticaintegralfernanda',
    desc: {
      es: 'Servicio integral de social media management.',
      en: 'Full service social media management.',
    },
  },
  {
    n: '04',
    img: '/assets/clients/santa-tuca-card.jpg',
    accent: 'magenta',
    href: 'https://www.instagram.com/santatuca',
    category: { es: 'Creador de contenido', en: 'Content creator' },
    title: '@santatuca',
    desc: {
      es: 'Edición de reels y videos de YouTube.',
      en: 'Reels and YouTube video editing.',
    },
  },
  {
    n: '05',
    img: '/assets/clients/toplaser-card.jpg',
    accent: 'blue',
    href: 'https://www.instagram.com/toplaserimprenta',
    category: { es: 'Imprenta', en: 'Print shop' },
    title: 'Top Láser',
    desc: {
      es: 'Identidad, página web, producción y postproducción de contenido.',
      en: 'Identity, website, content production and post production.',
    },
  },
];

export const VALUES: ValueCard[] = [
  {
    n: '01',
    name: 'Libertad',
    desc: {
      es: 'Creamos sin límites y sin reglas. No pedimos permiso para proponer lo que todavía no existe.',
      en: "We create with no limits and no rules. We don't ask permission to propose what doesn't exist yet.",
    },
    dotA: 'magenta',
    dotB: 'blue',
  },
  {
    n: '02',
    name: 'Profundidad',
    desc: {
      es: 'Investigamos cada caso a fondo. No hacemos piezas genéricas ni iguales a las de todos los demás.',
      en: "We research every case in depth. We don't make generic pieces that look like everyone else's.",
    },
    dotA: 'blue',
    dotB: 'green',
  },
  {
    n: '03',
    name: 'Atención',
    desc: {
      es: 'Prestamos mucha atención a los detalles para que tu marca se sienta única.',
      en: 'We pay close attention to every detail so your brand feels unlike any other.',
    },
    dotA: 'green',
    dotB: 'magenta',
  },
  {
    n: '04',
    name: 'Curiosidad',
    desc: {
      es: 'No paramos de movernos para ofrecerte diferentes puntos de vista.',
      en: 'We never stop moving, so we can offer you different points of view.',
    },
    dotA: 'magenta',
    dotB: 'green',
  },
];

/** Free-form copy that isn't a repeated list. */
export const COPY = {
  hero: {
    eyebrow: {
      es: 'Agencia de diseño integral y creación de contenido · Buenos Aires',
      en: 'Integral design and content creation agency · Buenos Aires',
    },
    a: {
      line1: { es: 'Mirar', en: 'Looking' },
      line2: { es: 'no alcanza', en: 'is not enough' },
      para: {
        es: 'No construimos marcas desde cero. Revelamos el ángulo que ya estaba ahí y lo volvemos imposible de ignorar.',
        en: "We don't build brands from scratch. We reveal the angle that was already there and make it impossible to ignore.",
      },
      cta: { es: 'Ver trabajo', en: 'See work' },
    },
    b: {
      eyebrow: { es: 'El umbral', en: 'The threshold' },
      line1: { es: 'Nos movemos', en: 'We move' },
      line2: { es: 'para ver otro ángulo', en: 'to see another angle' },
      para: {
        es: 'El punto donde una identidad dejó de ser lo que era y todavía no es lo que será. Ahí trabajamos.',
        en: "The point where an identity has stopped being what it was and isn't yet what it will be. That's where we work.",
      },
    },
    c: {
      m1: { es: 'Mirar no alcanza', en: 'Mirar no alcanza' },
      m2: { es: 'Nos movemos', en: 'Nos movemos' },
      m3a: { es: 'Un foco', en: 'Un foco' },
      m3b: { es: 'Entre la dispersión', en: 'Entre la dispersión' },
      para: {
        es: 'Revelamos el ángulo que ya estaba ahí.',
        en: 'We reveal the angle that was already there.',
      },
    },
    scroll: {
      es: 'Desplazá para cruzar el umbral',
      en: 'Scroll to cross the threshold',
    },
  },
  nosotros: {
    eyebrow: { es: 'Sobre nosotros', en: 'About us' },
    line1: { es: 'Una marca no se inventa.', en: "A brand isn't invented." },
    pre: { es: 'Se ', en: "It's brought into " },
    em: { es: 'enfoca', en: 'focus' },
    post: { es: '.', en: '.' },
    sub: {
      es: 'El ruido, la tendencia, la copia: todo lo demás se disuelve fuera del plano.',
      en: 'The noise, the trend, the copy: everything else dissolves out of the frame.',
    },
    hint: {
      es: 'Seguí bajando, el texto enfoca con vos',
      en: 'Keep scrolling, the text focuses with you',
    },
  },
  valores: {
    eyebrow: { es: 'Nuestros valores', en: 'Our values' },
  },
  /* Superposición + Refracción + Umbral read as one block: the label lives
     on the first panel and the other two run on without repeating it. */
  queEsFocus: {
    eyebrow: { es: 'Qué es FOCUS', en: 'What FOCUS is' },
  },
  superposicion: {
    title1: { es: 'El punto donde', en: 'The point where' },
    title2: { es: 'todo cambia', en: 'everything changes' },
    hint: {
      es: 'Movete: el color aparece donde dos estados se cruzan',
      en: 'Move: color appears where two states cross',
    },
  },
  refraccion: {
    para: {
      es: 'Ninguna marca tiene un límite claro entre sus capas. Estrategia, imagen y voz se cruzan todo el tiempo. Las separamos para ver de qué está hecha y las volvemos a juntar hasta que la luz es blanca otra vez.',
      en: 'No brand has a clear line between its layers. Strategy, image and voice overlap all the time. We pull them apart to see what it is made of, then bring them back together until the light turns white again.',
    },
    hint: {
      es: 'Movete y descomponela · quedate quieto y se recompone',
      en: 'Move to split it · stay still and it reassembles',
    },
  },
  umbral: {
    line1: { es: 'Lo que parece una puerta', en: 'What looks like a door' },
    line2: { es: 'resulta ser un mundo', en: 'turns out to be a world' },
    hint: { es: 'Bajá: el umbral se abre', en: 'Scroll: the threshold opens' },
  },
  servicios: {
    eyebrow: { es: 'Servicios', en: 'Services' },
    title: { es: 'Qué hacemos', en: 'What we do' },
    intro: {
      es: 'Seis disciplinas, un solo criterio: que la pieza no se pueda confundir con la de nadie más.',
      en: "Six disciplines, one criterion: the piece must be impossible to mistake for anyone else's.",
    },
  },
  trabajo: {
    eyebrow: { es: 'Trabajo seleccionado', en: 'Selected work' },
    title: { es: 'Casos', en: 'Cases' },
    hint: {
      es: 'El scroll vertical avanza la galería',
      en: 'Vertical scroll drives the gallery',
    },
    cta: { es: 'Tu caso acá', en: 'Your case here' },
  },
  foco: {
    eyebrow: { es: 'Foco', en: 'Focus' },
    pre: {
      es: 'La atención es el recurso más caro del mundo. No la pedimos, la ',
      en: "Attention is the world's most expensive resource. We don't ask for it, we ",
    },
    em: { es: 'capturamos', en: 'capture' },
    post: {
      es: '. Un punto nítido entre la dispersión vale más que mil mensajes gritando a la vez.',
      en: ' it. One sharp point amid the dispersion is worth more than a thousand messages shouting at once.',
    },
    hint: {
      es: 'Tu cursor es la lente · enfocá lo que importa',
      en: 'Your cursor is the lens · focus what matters',
    },
  },
  contacto: {
    eyebrow: { es: 'Trabajemos juntos', en: "Let's work together" },
    title1: { es: 'Enfoquemos', en: "Let's focus" },
    title2: { es: 'lo que ya es tuyo', en: 'what is already yours' },
  },
  footer: {
    nav: { es: 'Navegación', en: 'Navigation' },
    contacto: { es: 'Contacto', en: 'Contact' },
    /** Second half of the wordmark lockup; the logo image supplies "FOCUS". */
    brandSub: 'creatives',
    made: { es: 'Hecho en Buenos Aires', en: 'Made in Buenos Aires' },
  },
  cta: { es: 'Hablemos', en: "Let's talk" },
  tagline: 'El punto donde todo cambia',
} as const;

export const CONTACT = {
  email: 'hola@focus.studio',
  /** The studio's real address, shown in the footer. NOTE: `email` above is
      still the placeholder inherited from the design mock and drives the
      Contacto button and the mobile menu. */
  footerEmail: 'serenacapella@focus-creatives.com',
  whatsapp: '+54 9 11 5926 4267',
  whatsappHref: 'https://wa.me/5491159264267',
} as const;

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

/**
 * The same accents, but safe to set small text in on ink. Only blue differs:
 * #0033FF against #0A0A0B is 2.47:1, well under AA, so text uses a lighter
 * variant. Magenta and green already clear it on their own.
 */
export const ACCENT_TEXT: Record<Accent, string> = {
  magenta: 'var(--focus-magenta)',
  blue: 'var(--focus-blue-text)',
  green: 'var(--focus-green)',
};

export interface NavLink {
  href: string;
  label: Localized;
}

/**
 * Stable key for a service. The ordinals in SERVICES are display order and can
 * be reshuffled at any time; these cannot. That is what lets a case name the
 * work it got without either side going stale.
 */
export type ServiceId =
  | 'identidad'
  | 'direccion-de-arte'
  | 'social-media'
  | 'audiovisual'
  | 'estrategia'
  | 'web'
  | 'editorial-packaging';

export interface ServiceRow {
  id: ServiceId;
  n: string;
  /** Kept for when the image hover comes back; the rows currently
      show the animated circuit panel instead. */
  img: string;
  title: Localized;
  detail: Localized;
}

/**
 * One case in the Casos gallery. Everything a card shows lives in here, so
 * adding a client is appending one object to WORKS: the ordinal on the card,
 * the NN / NN counter, the progress bar and the JSON-LD all follow from the
 * length and order of the list.
 */
export interface WorkCard {
  /** Stable key, never shown. Used as the React key so reordering is safe. */
  id: string;
  /** The client as it should read on the card: the @handle, or the brand. */
  client: string;
  /** Rubro of the client, shown above the name. */
  category: Localized;
  /**
   * What FOCUS did, by id rather than free text. The labels are read off
   * SERVICES, so a service cannot end up named two different ways in two
   * sections, and both languages arrive without being written twice.
   */
  services: ServiceId[];
  /** Optional line under the tags — only where there is more to say than the
      tags already say. Leave it out and the card simply does not show one. */
  desc?: Localized;
  /** Card artwork: the client's mark on its own background, 4:5. */
  img: string;
  /** Where the card points: the account's reels, or the live site. */
  href: string;
  /** Brand accent tinting the rubro. */
  accent: Accent;
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
  'Páginas web',
  'Contenido audiovisual',
  'Contenido con inteligencia artificial',
  'Estrategia',
  'Editorial',
  'Packaging',
];

export const SERVICES: ServiceRow[] = [
  {
    id: 'identidad',
    n: '01',
    img: '/assets/img-01.jpg',
    title: { es: 'Identidad de marca', en: 'Brand identity' },
    detail: {
      es: 'Naming, isologotipo, sistema completo, manual',
      en: 'Naming, logo, full system, manual',
    },
  },
  {
    id: 'direccion-de-arte',
    n: '02',
    img: '/assets/img-02.jpg',
    title: { es: 'Dirección de arte', en: 'Art direction' },
    detail: {
      es: 'Campañas, producción fotográfica, styling',
      en: 'Campaigns, photo production, styling',
    },
  },
  {
    id: 'social-media',
    n: '03',
    img: '/assets/img-03.jpg',
    title: { es: 'Social media management', en: 'Social media management' },
    detail: {
      es: 'Contenido, planificación, comunidad, métricas',
      en: 'Content, planning, community, metrics',
    },
  },
  {
    id: 'audiovisual',
    n: '04',
    img: '/assets/img-04.jpg',
    title: { es: 'Contenido audiovisual', en: 'Audiovisual content' },
    detail: {
      es: 'Piezas para social, film de marca, motion',
      en: 'Social pieces, brand film, motion',
    },
  },
  {
    id: 'estrategia',
    n: '05',
    img: '/assets/img-05.jpg',
    title: { es: 'Estrategia', en: 'Strategy' },
    detail: {
      es: 'Posicionamiento, arquitectura, tono de voz',
      en: 'Positioning, architecture, tone of voice',
    },
  },
  {
    id: 'web',
    n: '06',
    img: '/assets/img-06.jpg',
    title: { es: 'Páginas web', en: 'Websites' },
    detail: {
      es: 'Diseño, desarrollo, SEO, mantenimiento',
      en: 'Design, development, SEO, maintenance',
    },
  },
  {
    id: 'editorial-packaging',
    n: '07',
    img: '/assets/img-01.jpg',
    title: { es: 'Editorial y packaging', en: 'Editorial & packaging' },
    detail: {
      es: 'Libros, catálogos, etiquetas, estuchería',
      en: 'Books, catalogues, labels, boxes',
    },
  },
];

/**
 * Services by id, so a case can name its work without repeating the labels.
 * The cast is the one TypeScript cannot avoid: Object.fromEntries widens the
 * keys to string, and the union above is exactly the set SERVICES covers.
 */
export const SERVICE_BY_ID = Object.fromEntries(
  SERVICES.map((s) => [s.id, s] as const),
) as Record<ServiceId, ServiceRow>;

/* Real cases. Each card carries the client's logo and links to where the work
   can be seen: their Instagram, or the live site when the job was the site.
   The artwork in `/assets/clients/*-card.jpg` is the logo's own background
   colour flooded across the 4:5 card, so the mark fills it without being
   cropped. For the Instagram cases the mark is the avatar with Instagram's
   gray frame removed; for the sites, the logo file the site itself serves.

   The order here is the order on the page: the sites first, then the rest,
   led by social media. A client with two separate jobs gets one card per job,
   each linking to where that job can be seen, which is why Top Láser appears
   twice.

   To add a case: add one object where it belongs in that order. `services`
   are ids from SERVICES; the ordinal on the card and the counter come from the
   position in this list. The accents cycle magenta, blue, green down the list,
   so no two neighbours share one. */
export const WORKS: WorkCard[] = [
  /* The sites. */
  {
    id: 'ader-studio',
    client: 'Ader Studio',
    category: { es: 'Arquitectura', en: 'Architecture' },
    services: ['web'],
    img: '/assets/clients/ader-studio-card.jpg',
    href: 'https://ader-studio.vercel.app',
    accent: 'magenta',
  },
  {
    id: 'oushy',
    client: 'OUSHY Studio',
    category: { es: 'Estudio creativo', en: 'Creative studio' },
    services: ['web'],
    img: '/assets/clients/oushy-card.jpg',
    href: 'https://oushy-web.vercel.app',
    accent: 'blue',
  },
  {
    id: 'top-laser-web',
    client: 'Top Láser',
    category: { es: 'Imprenta', en: 'Print shop' },
    services: ['web'],
    img: '/assets/clients/toplaser-web-card.jpg',
    href: 'https://toplaserimprenta.com',
    accent: 'green',
  },
  /* Everything else, social media first. */
  // On hold for now. Uncomment to bring it back: the card art is already in
  // /assets/clients and its accent is the one the cycle expects here.
  // {
  //   id: 'chillin',
  //   client: '@chillin1390bar',
  //   category: { es: 'Bar', en: 'Bar' },
  //   services: ['social-media'],
  //   img: '/assets/clients/chillin-card.jpg',
  //   href: 'https://www.instagram.com/chillin1390bar',
  //   accent: 'magenta',
  // },
  {
    id: 'santa-tuca',
    client: '@santatuca',
    category: { es: 'Creador de contenido', en: 'Content creator' },
    services: ['audiovisual', 'social-media'],
    /* The one line the tags do not already carry: which formats. */
    desc: {
      es: 'Edición de reels y videos de YouTube.',
      en: 'Reels and YouTube video editing.',
    },
    img: '/assets/clients/santa-tuca-card.jpg',
    href: 'https://www.instagram.com/santatuca',
    accent: 'blue',
  },
  {
    id: 'top-laser',
    client: 'Top Láser',
    category: { es: 'Imprenta', en: 'Print shop' },
    services: ['identidad', 'social-media', 'audiovisual'],
    img: '/assets/clients/toplaser-card.jpg',
    href: 'https://www.instagram.com/toplaserimprenta',
    accent: 'green',
  },
  {
    id: 'chuchones',
    client: '@chuchones_wines',
    category: { es: 'Vinos boutique', en: 'Boutique wines' },
    services: ['social-media'],
    img: '/assets/clients/chuchones-card.jpg',
    href: 'https://www.instagram.com/chuchones_wines',
    accent: 'magenta',
  },
  {
    id: 'rsh-consultora',
    client: '@rsh_consultora',
    category: {
      es: 'Licenciado en seguridad e higiene',
      en: 'Health and safety consultancy',
    },
    services: ['social-media'],
    img: '/assets/clients/rsh-consultora-card.jpg',
    href: 'https://www.instagram.com/rsh_consultora',
    accent: 'blue',
  },
  {
    id: 'fernanda-estetica',
    client: '@esteticaintegralfernanda',
    category: { es: 'Estética y salud', en: 'Beauty and wellness' },
    services: ['social-media'],
    img: '/assets/clients/fernanda-estetica-card.jpg',
    href: 'https://www.instagram.com/esteticaintegralfernanda',
    accent: 'green',
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
    /* En touch no hay cursor que mover: el disco va solo y el dedo lo toma
       prestado. La consigna cambia, la idea es la misma. */
    hintTouch: {
      es: 'Tocá y arrastrá: el color aparece donde dos estados se cruzan',
      en: 'Touch and drag: color appears where two states cross',
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
    hintTouch: {
      es: 'Arrastrá y descomponela · soltá y se recompone',
      en: 'Drag to split it · let go and it reassembles',
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
      es: 'Siete disciplinas, un solo criterio: que la pieza no se pueda confundir con la de nadie más.',
      en: "Seven disciplines, one criterion: the piece must be impossible to mistake for anyone else's.",
    },
    /* El prisma invertido: cada servicio es una banda del espectro y todas
       convergen en un solo haz blanco, que es la marca del cliente. */
    beam: { es: 'TU MARCA', en: 'YOUR BRAND' },
    beamCta: { es: 'Tu marca: hablemos', en: 'Your brand: let us talk' },
    footIn: {
      es: 'El espectro entra · un solo haz sale',
      en: 'The spectrum enters · one beam exits',
    },
    footScroll: {
      es: 'El scroll acerca la luz al prisma',
      en: 'Scroll drives the light into the prism',
    },
  },
  trabajo: {
    eyebrow: { es: 'Trabajo seleccionado', en: 'Selected work' },
    title: { es: 'Casos', en: 'Cases' },
    hint: {
      es: 'El scroll vertical avanza la galería',
      en: 'Vertical scroll drives the gallery',
    },
    /** Names the tag list on each card for screen readers; never drawn. */
    services: { es: 'Servicios provistos', en: 'Services provided' },
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
    hintTouch: {
      es: 'Tu dedo es la lente · enfocá lo que importa',
      en: 'Your finger is the lens · focus what matters',
    },
  },
  contacto: {
    eyebrow: { es: 'Trabajemos juntos', en: "Let's work together" },
    title1: { es: 'Enfoquemos', en: "Let's focus" },
    title2: { es: 'lo que ya es tuyo', en: 'what is already yours' },
    cotiza: { es: 'Cotizá tu proyecto', en: 'Get a quote for your project' },
    agendar: { es: 'Agendar reunión', en: 'Book a call' },
    /** Rides along in the wa.me link, so the chat opens already written. */
    waMensaje: {
      es: 'Hola FOCUS, quiero cotizar un proyecto.',
      en: 'Hi FOCUS, I would like a quote for a project.',
    },
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
  email: 'info@focus-creatives.com',
  whatsapp: '+54 9 11 5926 4267',
  /** Base link. The Contacto section appends the prefilled `?text=`. */
  whatsappHref: 'https://wa.me/5491159264267',
  /**
   * The studio's booking page, behind "Agendar reunión". Any scheduling URL
   * works — Calendly, Cal.com, whatever the studio moves to — because nothing
   * else in the site reads this and the button just opens it.
   */
  meetingHref: 'https://calendly.com/focus-creatives-info/30min',
} as const;

/* ============================================================
   FOCUS — Content & i18n dictionary
   All copy for the site, co-located ES/EN so translations stay
   in sync. Structural, language-independent data (accent colors,
   image sources, ordinals) lives here too, next to the strings
   it belongs with. Voice: Spanish (Río de la Plata), short and
   aphoristic, no exclamation marks, no em dashes. The English is
   written for a native reader, not translated word for word: the
   same idea at the same length, US spelling, the same rules.
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
  name: Localized;
  desc: Localized;
  dotA: Accent;
  dotB: Accent;
}

export const NAV_LINKS: NavLink[] = [
  { href: '#nosotros', label: { es: 'Sobre nosotros', en: 'About' } },
  { href: '#servicios', label: { es: 'Servicios', en: 'Services' } },
  { href: '#trabajo', label: { es: 'Trabajo', en: 'Work' } },
];

/** Marquee words: the disciplines, named the way each language names them. */
export const TICKER_ITEMS: Localized[] = [
  { es: 'Identidad de marca', en: 'Brand identity' },
  { es: 'Dirección de arte', en: 'Art direction' },
  { es: 'Social media management', en: 'Social media management' },
  { es: 'Páginas web', en: 'Websites' },
  { es: 'Contenido audiovisual', en: 'Video & motion' },
  { es: 'Contenido con inteligencia artificial', en: 'AI-powered content' },
  { es: 'Estrategia', en: 'Strategy' },
  { es: 'Editorial', en: 'Editorial' },
  { es: 'Packaging', en: 'Packaging' },
];

export const SERVICES: ServiceRow[] = [
  {
    id: 'identidad',
    n: '01',
    img: '/assets/img-01.jpg',
    title: { es: 'Identidad de marca', en: 'Brand identity' },
    detail: {
      es: 'Naming, isologotipo, sistema completo, manual',
      en: 'Naming, logo, visual system, brand guidelines',
    },
  },
  {
    id: 'direccion-de-arte',
    n: '02',
    img: '/assets/img-02.jpg',
    title: { es: 'Dirección de arte', en: 'Art direction' },
    detail: {
      es: 'Campañas, producción fotográfica, styling',
      en: 'Campaigns, photo shoots, styling',
    },
  },
  {
    id: 'social-media',
    n: '03',
    img: '/assets/img-03.jpg',
    title: { es: 'Social media management', en: 'Social media management' },
    detail: {
      es: 'Contenido, planificación, comunidad, métricas',
      en: 'Content, planning, community, analytics',
    },
  },
  {
    id: 'audiovisual',
    n: '04',
    img: '/assets/img-04.jpg',
    title: { es: 'Contenido audiovisual', en: 'Video & motion' },
    detail: {
      es: 'Piezas para social, film de marca, motion',
      en: 'Social video, brand films, animation',
    },
  },
  {
    id: 'estrategia',
    n: '05',
    img: '/assets/img-05.jpg',
    title: { es: 'Estrategia', en: 'Strategy' },
    detail: {
      es: 'Posicionamiento, arquitectura, tono de voz',
      en: 'Positioning, brand architecture, tone of voice',
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
      en: 'Books, catalogs, labels, boxes',
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
  {
    id: 'chillin',
    client: '@chillin1390bar',
    category: { es: 'Bar', en: 'Bar' },
    services: ['social-media'],
    img: '/assets/clients/chillin-card.jpg',
    href: 'https://www.instagram.com/chillin1390bar',
    accent: 'magenta',
  },
  {
    id: 'santa-tuca',
    client: '@santatuca',
    category: { es: 'Creador de contenido', en: 'Content creator' },
    services: ['audiovisual', 'social-media'],
    /* The one line the tags do not already carry: which formats. */
    desc: {
      es: 'Edición de reels y videos de YouTube.',
      en: 'Editing for Reels and YouTube.',
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

/**
 * The brand poster the threshold opens onto (and hero C's backdrop). Its
 * tagline is part of the artwork, so each language has its own file: the
 * English one has the line reset in the poster's face, Rotis Semi Sans Light
 * Italic, at the same width as the logo above it.
 */
export const POSTER: Localized = {
  es: '/assets/img-06.jpg',
  en: '/assets/img-06-en.jpg',
};

export const VALUES: ValueCard[] = [
  {
    n: '01',
    name: { es: 'Libertad', en: 'Freedom' },
    desc: {
      es: 'Creamos sin límites y sin reglas. No pedimos permiso para proponer lo que todavía no existe.',
      en: "No limits, no rulebook. We don't ask permission to pitch what doesn't exist yet.",
    },
    dotA: 'magenta',
    dotB: 'blue',
  },
  {
    n: '02',
    name: { es: 'Profundidad', en: 'Depth' },
    desc: {
      es: 'Investigamos cada caso a fondo. No hacemos piezas genéricas ni iguales a las de todos los demás.',
      en: "We dig deep into every project. Nothing generic, nothing that looks like everyone else's.",
    },
    dotA: 'blue',
    dotB: 'green',
  },
  {
    n: '03',
    name: { es: 'Atención', en: 'Attention' },
    desc: {
      es: 'Prestamos mucha atención a los detalles para que tu marca se sienta única.',
      en: "We sweat every detail, so your brand feels like no one else's.",
    },
    dotA: 'green',
    dotB: 'magenta',
  },
  {
    n: '04',
    name: { es: 'Curiosidad', en: 'Curiosity' },
    desc: {
      es: 'No paramos de movernos para ofrecerte diferentes puntos de vista.',
      en: "We never stand still, so there's always another angle to show you.",
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
      en: 'Full-service design and content agency · Buenos Aires',
    },
    a: {
      line1: { es: 'Mirar', en: 'Looking' },
      line2: { es: 'no alcanza', en: "isn't enough" },
      para: {
        es: 'No construimos marcas desde cero. Revelamos el ángulo que ya estaba ahí y lo volvemos imposible de ignorar.',
        en: "We don't build brands from scratch. We find the angle that was there all along and make it impossible to ignore.",
      },
      cta: { es: 'Ver trabajo', en: 'See the work' },
    },
    b: {
      eyebrow: { es: 'El umbral', en: 'The threshold' },
      line1: { es: 'Nos movemos', en: 'We move' },
      line2: { es: 'para ver otro ángulo', en: 'to find another angle' },
      para: {
        es: 'El punto donde una identidad dejó de ser lo que era y todavía no es lo que será. Ahí trabajamos.',
        en: "The point where an identity is no longer what it was, and not yet what it will be. That's where we work.",
      },
    },
    c: {
      m1: { es: 'Mirar no alcanza', en: "Looking isn't enough" },
      m2: { es: 'Nos movemos', en: 'We keep moving' },
      m3a: { es: 'Un foco', en: 'One point of focus' },
      m3b: { es: 'Entre la dispersión', en: 'In all the noise' },
      para: {
        es: 'Revelamos el ángulo que ya estaba ahí.',
        en: 'We find the angle that was there all along.',
      },
      label: { es: 'Densidad · el umbral · 2026', en: 'Density · the threshold · 2026' },
    },
    scroll: {
      es: 'Desplazá para cruzar el umbral',
      en: 'Scroll to cross the threshold',
    },
  },
  nosotros: {
    eyebrow: { es: 'Sobre nosotros', en: 'About us' },
    line1: { es: 'Una marca no se inventa.', en: "You don't invent a brand." },
    pre: { es: 'Se ', en: 'You bring it into ' },
    em: { es: 'enfoca', en: 'focus' },
    post: { es: '.', en: '.' },
    sub: {
      es: 'El ruido, la tendencia, la copia: todo lo demás se disuelve fuera del plano.',
      en: 'The noise, the trends, the copycats: everything else falls out of focus.',
    },
    hint: {
      es: 'Seguí bajando, el texto enfoca con vos',
      en: 'Scroll on and the words come into focus',
    },
  },
  valores: {
    eyebrow: { es: 'Nuestros valores', en: 'What we stand for' },
  },
  /* Superposición + Refracción + Umbral read as one block: the label lives
     on the first panel and the other two run on without repeating it. */
  queEsFocus: {
    eyebrow: { es: 'Qué es FOCUS', en: 'The idea behind FOCUS' },
  },
  superposicion: {
    title1: { es: 'El punto donde', en: 'The point where' },
    title2: { es: 'todo cambia', en: 'everything changes' },
    hint: {
      es: 'Movete: el color aparece donde dos estados se cruzan',
      en: 'Move your cursor: color appears where two states overlap',
    },
    /* En touch no hay cursor que mover: el disco va solo y el dedo lo toma
       prestado. La consigna cambia, la idea es la misma. */
    hintTouch: {
      es: 'Tocá y arrastrá: el color aparece donde dos estados se cruzan',
      en: 'Touch and drag: color appears where two states overlap',
    },
  },
  refraccion: {
    /** The word the three light layers spell out. */
    word: { es: 'REFRACCIÓN', en: 'REFRACTION' },
    para: {
      es: 'Ninguna marca tiene un límite claro entre sus capas. Estrategia, imagen y voz se cruzan todo el tiempo. Las separamos para ver de qué está hecha y las volvemos a juntar hasta que la luz es blanca otra vez.',
      en: 'No brand has clean lines between its layers. Strategy, image and voice bleed into each other all the time. We pull them apart to see what the brand is made of, then put them back together until the light runs white again.',
    },
    hint: {
      es: 'Movete y descomponela · quedate quieto y se recompone',
      en: 'Move to pull it apart · hold still to recombine',
    },
    hintTouch: {
      es: 'Arrastrá y descomponela · soltá y se recompone',
      en: 'Drag it apart · let go to recombine',
    },
  },
  umbral: {
    line1: { es: 'Lo que parece una puerta', en: 'What looks like a door' },
    line2: { es: 'resulta ser un mundo', en: 'opens onto a world' },
    hint: { es: 'Bajá: el umbral se abre', en: 'Keep scrolling: the threshold opens' },
  },
  servicios: {
    eyebrow: { es: 'Servicios', en: 'Services' },
    title: { es: 'Qué hacemos', en: 'What we do' },
    intro: {
      es: 'Siete disciplinas, un solo criterio: que la pieza no se pueda confundir con la de nadie más.',
      en: "Seven disciplines, one rule: the work can never be mistaken for anyone else's.",
    },
    /* El prisma invertido: cada servicio es una banda del espectro y todas
       convergen en un solo haz blanco, que es la marca del cliente. */
    beam: { es: 'TU MARCA', en: 'YOUR BRAND' },
    beamCta: { es: 'Tu marca: hablemos', en: "Your brand: let's talk" },
    footIn: {
      es: 'El espectro entra · un solo haz sale',
      en: 'Full spectrum in · one beam out',
    },
    footScroll: {
      es: 'El scroll acerca la luz al prisma',
      en: 'Scroll to bring the light into the prism',
    },
  },
  trabajo: {
    eyebrow: { es: 'Trabajo seleccionado', en: 'Selected work' },
    title: { es: 'Casos', en: 'Projects' },
    hint: {
      es: 'El scroll vertical avanza la galería',
      en: 'Scroll to move through the work',
    },
    /** Names the tag list on each card for screen readers; never drawn. */
    services: { es: 'Servicios provistos', en: 'What we did' },
    cta: { es: 'Tu caso acá', en: "You're next" },
  },
  foco: {
    eyebrow: { es: 'Foco', en: 'Focus' },
    pre: {
      es: 'La atención es el recurso más caro del mundo. No la pedimos, la ',
      en: "Attention is the most expensive resource there is. We don't ask for it, we ",
    },
    em: { es: 'capturamos', en: 'command' },
    post: {
      es: '. Un punto nítido entre la dispersión vale más que mil mensajes gritando a la vez.',
      en: ' it. One sharp point in the blur is worth more than a thousand messages all shouting at once.',
    },
    hint: {
      es: 'Tu cursor es la lente · enfocá lo que importa',
      en: 'Your cursor is the lens · focus on what matters',
    },
    hintTouch: {
      es: 'Tu dedo es la lente · enfocá lo que importa',
      en: 'Your finger is the lens · focus on what matters',
    },
  },
  contacto: {
    eyebrow: { es: 'Trabajemos juntos', en: "Let's work together" },
    title1: { es: 'Enfoquemos', en: "Let's sharpen" },
    title2: { es: 'lo que ya es tuyo', en: "what's already yours" },
    cotiza: { es: 'Cotizá tu proyecto', en: 'Get a quote' },
    agendar: { es: 'Agendar reunión', en: 'Book a call' },
    /** Rides along in the wa.me link, so the chat opens already written. */
    waMensaje: {
      es: 'Hola FOCUS, quiero cotizar un proyecto.',
      en: "Hi FOCUS, I'd like a quote for a project.",
    },
  },
  footer: {
    nav: { es: 'Navegación', en: 'Explore' },
    contacto: { es: 'Contacto', en: 'Contact' },
    /** Second half of the wordmark lockup; the logo image supplies "FOCUS". */
    brandSub: 'creatives',
    made: { es: 'Hecho en Buenos Aires', en: 'Made in Buenos Aires' },
  },
  cta: { es: 'Hablemos', en: "Let's talk" },
  tagline: { es: 'El punto donde todo cambia', en: 'The point where everything changes' },
  /** The tab title. The server renders the Spanish one; the LanguageProvider
      swaps in the English one for English readers. */
  meta: {
    title: {
      es: 'FOCUS creatives · Agencia de diseño y contenido en Buenos Aires',
      en: 'FOCUS creatives · Design and content agency in Buenos Aires',
    },
  },
  /** What screen readers announce for landmarks and controls; never drawn. */
  a11y: {
    home: { es: 'FOCUS, inicio', en: 'FOCUS, home' },
    openMenu: { es: 'Abrir menú', en: 'Open menu' },
    closeMenu: { es: 'Cerrar menú', en: 'Close menu' },
    menu: { es: 'Navegación', en: 'Navigation' },
    valores: { es: 'Valores', en: 'Values' },
    superposicion: { es: 'Superposición', en: 'Overlap' },
    servicios: { es: 'Servicios', en: 'Services' },
    refraccion: { es: 'Refracción', en: 'Refraction' },
    umbral: { es: 'Umbral', en: 'Threshold' },
    trabajo: { es: 'Trabajo', en: 'Work' },
    foco: { es: 'Foco', en: 'Focus' },
    contacto: { es: 'Contacto', en: 'Contact' },
  },
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

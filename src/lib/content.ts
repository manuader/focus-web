/* ============================================================
   FOCUS — Content & i18n dictionary
   All copy for the site, co-located ES/EN so translations stay
   in sync. Structural, language-independent data (accent colors,
   image sources, ordinals) lives here too, next to the strings
   it belongs with. Voice: Spanish (Río de la Plata), short and
   aphoristic, no exclamation marks.
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
  img: string;
  title: Localized;
  detail: Localized;
}

export interface WorkCard {
  n: string;
  img: string;
  accent: Accent;
  /** Category tag — kept in Spanish, as in the source (brand vocabulary). */
  category: string;
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

export interface ProcessStep {
  label: string;
  name: string;
  desc: Localized;
  stroke: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: Localized;
}

export const NAV_LINKS: NavLink[] = [
  { href: '#manifiesto', label: { es: 'Manifiesto', en: 'Manifesto' } },
  { href: '#servicios', label: { es: 'Servicios', en: 'Services' } },
  { href: '#trabajo', label: { es: 'Trabajo', en: 'Work' } },
  { href: '#proceso', label: { es: 'Proceso', en: 'Process' } },
];

/** Marquee words — Spanish brand vocabulary, unchanged across languages. */
export const TICKER_ITEMS = [
  'Identidad de marca',
  'Dirección de arte',
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
    title: { es: 'Contenido audiovisual', en: 'Audiovisual content' },
    detail: {
      es: 'Piezas para social, film de marca, motion',
      en: 'Social pieces, brand film, motion',
    },
  },
  {
    n: '04',
    img: '/assets/img-04.jpg',
    title: { es: 'Estrategia', en: 'Strategy' },
    detail: {
      es: 'Posicionamiento, arquitectura, tono de voz',
      en: 'Positioning, architecture, tone of voice',
    },
  },
  {
    n: '05',
    img: '/assets/img-05.jpg',
    title: { es: 'Editorial y packaging', en: 'Editorial & packaging' },
    detail: {
      es: 'Libros, catálogos, etiquetas, estuchería',
      en: 'Books, catalogues, labels, boxes',
    },
  },
];

export const WORKS: WorkCard[] = [
  {
    n: '01',
    img: '/assets/img-01.jpg',
    accent: 'magenta',
    category: 'Identidad',
    title: 'Capella',
    desc: {
      es: 'Sistema completo y manual de marca para una productora audiovisual.',
      en: 'Full system and brand manual for a production studio.',
    },
  },
  {
    n: '02',
    img: '/assets/img-02.jpg',
    accent: 'blue',
    category: 'Campaña',
    title: 'Limen',
    desc: {
      es: 'Dirección de arte y producción fotográfica para lanzamiento.',
      en: 'Art direction and photo production for a launch.',
    },
  },
  {
    n: '03',
    img: '/assets/img-03.jpg',
    accent: 'green',
    category: 'Editorial',
    title: 'Pasaje',
    desc: {
      es: 'Libro de 240 páginas sobre transición y archivo.',
      en: 'A 240-page book on transition and archive.',
    },
  },
  {
    n: '04',
    img: '/assets/img-04.jpg',
    accent: 'magenta',
    category: 'Packaging',
    title: 'Trama',
    desc: {
      es: 'Estuchería y etiquetas para una línea de edición limitada.',
      en: 'Boxes and labels for a limited-edition line.',
    },
  },
  {
    n: '05',
    img: '/assets/img-05.jpg',
    accent: 'blue',
    category: 'Motion',
    title: 'Refracción',
    desc: {
      es: 'Film de marca de 90 segundos y su corte para social.',
      en: 'A 90-second brand film and its social cut.',
    },
  },
  {
    n: '06',
    img: '/assets/img-06.jpg',
    accent: 'green',
    category: 'Estrategia',
    title: 'Densidad',
    desc: {
      es: 'Reposicionamiento y arquitectura de marca para retail.',
      en: 'Repositioning and brand architecture for retail.',
    },
  },
];

export const VALUES: ValueCard[] = [
  {
    n: '01',
    name: 'Libertad',
    desc: {
      es: 'No pedimos permiso para proponer lo que todavía no existe.',
      en: "We don't ask permission to propose what doesn't exist yet.",
    },
    dotA: 'magenta',
    dotB: 'blue',
  },
  {
    n: '02',
    name: 'Profundidad',
    desc: {
      es: 'Nada superficial resiste una segunda mirada. Trabajamos para la segunda.',
      en: 'Nothing superficial survives a second look. We work for the second one.',
    },
    dotA: 'blue',
    dotB: 'green',
  },
  {
    n: '03',
    name: 'Atención',
    desc: {
      es: 'El detalle no es el final del trabajo. Es la prueba de que hubo trabajo.',
      en: "Detail isn't the end of the work. It's the proof there was work.",
    },
    dotA: 'green',
    dotB: 'magenta',
  },
  {
    n: '04',
    name: 'Curiosidad',
    desc: {
      es: 'Nos movemos siempre. El ángulo bueno nunca está donde estabas parado.',
      en: 'We keep moving. The good angle is never where you were standing.',
    },
    dotA: 'magenta',
    dotB: 'green',
  },
];

export const PROCESS: ProcessStep[] = [
  {
    label: 'M1',
    name: 'Pasaje',
    desc: {
      es: 'Entendemos de dónde viene la marca y qué está dejando de ser. Escuchamos antes de mirar.',
      en: "We map where the brand comes from and what it's ceasing to be. We listen before we look.",
    },
    stroke: 'var(--focus-magenta)',
  },
  {
    label: 'M2',
    name: 'Refracción',
    desc: {
      es: 'Descomponemos el mensaje en sus tres capas hasta ver de qué está hecho.',
      en: "We split the message into its three layers to see what it's made of.",
    },
    stroke: 'var(--focus-blue)',
  },
  {
    label: 'M3',
    name: 'Superposición',
    desc: {
      es: 'Cruzamos dos estados. En el cruce aparece el color que no existía.',
      en: "We overlap two states. Where they cross, a color appears that didn't exist.",
    },
    stroke: 'var(--focus-green)',
  },
  {
    label: 'M4',
    name: 'Foco',
    desc: {
      es: 'Un punto nítido. Todo lo demás se disuelve — y por eso ese punto existe.',
      en: "One sharp point. Everything else dissolves — that's why the point exists.",
    },
    stroke: 'var(--focus-paper)',
  },
];

export const STATS: Stat[] = [
  {
    value: 12,
    suffix: '+',
    label: { es: 'Años enfocando marcas', en: 'Years bringing brands into focus' },
  },
  {
    value: 140,
    suffix: '+',
    label: { es: 'Sistemas entregados', en: 'Systems delivered' },
  },
  { value: 9, suffix: '', label: { es: 'Países', en: 'Countries' } },
  {
    value: 3,
    suffix: '',
    label: {
      es: 'Proyectos por trimestre, no más',
      en: 'Projects per quarter, no more',
    },
  },
];

/** Free-form copy that isn't a repeated list. */
export const COPY = {
  hero: {
    eyebrow: {
      es: 'Agencia de diseño y contenido · Buenos Aires',
      en: 'Design & content agency · Buenos Aires',
    },
    a: {
      line1: { es: 'Mirar', en: 'Looking' },
      line2: { es: 'no alcanza', en: 'is not enough' },
      para: {
        es: 'No construimos marcas desde cero. Revelamos el ángulo que ya estaba ahí — y lo volvemos imposible de ignorar.',
        en: "We don't build brands from scratch. We reveal the angle that was already there — and make it impossible to ignore.",
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
    scroll: { es: 'Desplazá para cruzar', en: 'Scroll to cross' },
  },
  manifiesto: {
    eyebrow: { es: 'Manifiesto', en: 'Manifesto' },
    line1: { es: 'Una marca no se inventa.', en: "A brand isn't invented." },
    pre: { es: 'Se ', en: "It's brought into " },
    em: { es: 'enfoca', en: 'focus' },
    post: { es: '.', en: '.' },
    sub: {
      es: 'El ruido, la tendencia, la copia — todo lo demás se disuelve fuera del plano.',
      en: 'The noise, the trend, the copy — everything else dissolves out of the frame.',
    },
    hint: {
      es: 'Seguí bajando — el texto enfoca con vos',
      en: 'Keep scrolling — the text focuses with you',
    },
  },
  valores: {
    eyebrow: {
      es: 'Cuatro valores, cero adornos',
      en: 'Four values, zero ornament',
    },
  },
  superposicion: {
    title1: { es: 'El punto donde', en: 'The point where' },
    title2: { es: 'todo cambia', en: 'everything changes' },
    hint: {
      es: 'Movete — el color aparece donde dos estados se cruzan',
      en: 'Move — color appears where two states cross',
    },
  },
  refraccion: {
    para: {
      es: 'Descomponemos el mensaje en sus capas. Donde las tres coinciden, la luz vuelve a ser blanca.',
      en: 'We split the message into its layers. Where all three coincide, light turns white again.',
    },
    hint: {
      es: 'Movete y descomponela · quedate quieto y se recompone',
      en: 'Move to split it · stay still and it reassembles',
    },
  },
  umbral: {
    line1: { es: 'Lo que parece una puerta', en: 'What looks like a door' },
    line2: { es: 'resulta ser un mundo', en: 'turns out to be a world' },
    hint: { es: 'Bajá — el umbral se abre', en: 'Scroll — the threshold opens' },
  },
  servicios: {
    eyebrow: { es: 'Servicios', en: 'Services' },
    title: { es: 'Qué hacemos', en: 'What we do' },
    intro: {
      es: 'Cinco disciplinas, un solo criterio: que la pieza no se pueda confundir con la de nadie más.',
      en: "Five disciplines, one criterion: the piece must be impossible to mistake for anyone else's.",
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
  proceso: {
    eyebrow: { es: 'Proceso', en: 'Process' },
    title1: { es: 'Cuatro movimientos', en: 'Four movements' },
    title2: { es: 'hasta el foco', en: 'to the focus' },
  },
  foco: {
    pre: {
      es: 'La atención es el recurso más caro del mundo. No la pedimos — la ',
      en: "Attention is the world's most expensive resource. We don't ask for it — we ",
    },
    em: { es: 'capturamos', en: 'capture' },
    post: {
      es: '. Un punto nítido entre la dispersión vale más que mil mensajes gritando a la vez.',
      en: ' it. One sharp point amid the dispersion is worth more than a thousand messages shouting at once.',
    },
    hint: {
      es: 'Tu cursor es la lente — enfocá lo que importa',
      en: 'Your cursor is the lens — focus what matters',
    },
  },
  testimonio: {
    eyebrow: { es: 'Clientes', en: 'Clients' },
    quote: {
      es: '“Llegamos con un logo. Nos fuimos con un motivo para existir — y con todo el mundo mirando el mismo punto.”',
      en: '“We arrived with a logo. We left with a reason to exist — and everyone looking at the same point.”',
    },
    role: 'Directora de marca, Capella',
  },
  contacto: {
    eyebrow: { es: 'Trabajemos juntos', en: "Let's work together" },
    title1: { es: 'El punto', en: 'The point' },
    title2: { es: 'donde todo cambia', en: 'where everything changes' },
    note: {
      es: 'Tomamos tres proyectos por trimestre. Escribinos antes.',
      en: 'We take three projects a quarter. Write early.',
    },
  },
  footer: {
    nav: { es: 'Navegación', en: 'Navigation' },
    made: { es: 'Hecho en Buenos Aires', en: 'Made in Buenos Aires' },
  },
  cta: { es: 'Hablemos', en: "Let's talk" },
  tagline: 'El punto donde todo cambia',
} as const;

export const CONTACT = {
  email: 'hola@focus.studio',
  phone: '+54 11 0000 0000',
  phoneHref: 'tel:+541100000000',
  address: ['Bartolomé Mitre 1234, C1036', 'Buenos Aires · Argentina'],
  social: [
    { label: 'Instagram', href: '#contacto' },
    { label: 'Behance', href: '#contacto' },
    { label: 'LinkedIn', href: '#contacto' },
  ],
} as const;

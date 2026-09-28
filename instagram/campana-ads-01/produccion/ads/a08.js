/* A08 · BOFU · "El proceso" · 45 s · Umbral.
   Qué pasa después de escribirnos: cuatro etapas, cada una una rendija de
   luz que se abre y se cruza. El proceso es una propuesta del estudio
   (ver 03-sistema-creativo, C1): confirmar antes de pautar. */
const { text, box, group, image, label, rule, end, eyebrow, glyph, gl, GLSL, p, io, out, lerp, clamp } = F;
const G = GLSL;

const PHASES = [
  ['01', 'Diagnóstico', 'Una reunión y muchas preguntas.', 'Qué ya es tuyo, qué sobra, qué falta.', 'estrategia'],
  ['02', 'Dirección', 'Un solo camino, argumentado.', 'No diez opciones para que elijas vos.', 'identidad'],
  ['03', 'Sistema', 'Marca, contenido, web o software.', 'Todo sale del mismo criterio.', 'editorial-packaging'],
  ['04', 'Acompañamiento', 'Lo sostenemos en el tiempo.', 'Redes, contenido y mantenimiento.', 'social-media'],
];
const P0 = 8.2, PD = 6.0;
const slitX = (i) => [0.72, 0.28, 0.7, 0.3][i];

F.mount({
  name: F.vname('focus_ad08_el-proceso'),
  dur: 45,
  edit: { punches: [5.8, 11.2, 14.2, 17.2, 20.2, 23.2, 26.2, 29.2] },
  cover: 11.2,
  meta: {
    id: 'A08', titulo: 'El proceso', etapa: 'BOFU', fenomeno: 'Umbral',
    publico: 'P3 responsables de marketing y negocio listos para contratar; P1 fundadoras que comparan estudios',
    objetivo: 'Conversión: bajar la incertidumbre sobre cómo se trabaja y llevar a agendar una primera reunión de 30 minutos.',
    necesidad: 'Objeciones de cierre: "¿cómo es el proceso?", "¿me van a hacer elegir entre mil opciones?", "¿quién responde?", "¿qué pasa después de la entrega?".',
    promesa: 'Cuatro etapas claras (Diagnóstico, Dirección, Sistema, Acompañamiento), un equipo y un interlocutor. A confirmar por el estudio antes de pautar (ver 03, C1).',
    accion: 'Agendar 30 minutos en Calendly.',
    servicio: 'Método de trabajo (todos los frentes)',
    referencia: 'P5 JKR: el contenido que muestra la visión de negocio le habla al CMO y rindió ~4 veces más que los anuncios de premios. P4: explicar el porqué de cada decisión.',
    cta: 'Agendá 30 minutos.', destino: 'calendly.com/focus-creatives-info/30min',
    exito: 'Reuniones agendadas por cada 1.000 impresiones en audiencias de retargeting; tasa de asistencia a la reunión.',
    variante: { cambia: 'Cierre (41-45 s): "Primero, te escuchamos." con CTA a WhatsApp, en lugar de agendar 30 minutos en Calendly.', destino: 'wa.me/5491159264267', captionFin: 'Escribinos por WhatsApp: la primera conversación es para entender tu marca.', guion: [['41,0-45,0', 'Placa de cierre común', 'Primero, / te *escuchamos.* · Escribinos por WhatsApp. · +54 9 11 5926 4267 · Sin plantilla · 08/10', 'Entrada desde desenfoque', 'Veladura', 'Re mayor 9', 'Firma sonora de vidrio', 'Cierre BOFU: conversación']] },
    ab: 'Cierre con "Agendá 30 minutos" contra cierre con "Escribinos por WhatsApp". Hipótesis: P3 prefiere agendar (formal, con calendario); P1 prefiere WhatsApp (inmediato). Segmentar la prueba por audiencia.',
    caption: `Qué pasa después de escribirnos:

01 · Diagnóstico. Una reunión y muchas preguntas: qué ya es tuyo, qué sobra, qué falta.
02 · Dirección. Un solo camino, argumentado. No te damos diez opciones para que elijas vos: te damos la que defendemos.
03 · Sistema. Marca, contenido, web o software, todo sale del mismo criterio.
04 · Acompañamiento. Lo sostenemos en el tiempo.

Un equipo, un criterio, un interlocutor. Sin coordinar proveedores.

Agendá 30 minutos: la primera conversación es para entender tu marca.

#branding #estrategiademarca #marketing #focuscreatives #buenosaires`,
    assets: [
      ['Rendija de luz volumétrica', 'Shader glsl.slit (apertura, polvo en suspensión, filo espectral)', '"a thin vertical slit of white light opening in a pitch black wall, volumetric light rays and dust particles, subtle magenta and green chromatic edges, cinematic, 35mm, no text"'],
      ['Numerales de etapa', 'Rotis Semi Sans Light a 520 px, tinta sobre luz', '—'],
      ['Glifos por etapa', 'estrategia, identidad, editorial-packaging, social-media (design-system/assets/glyphs/)', '—'],
    ],
  },
  guion: [
    ['0,0-3,4', 'Negro total; una línea vertical de luz de 1 px', 'Qué pasa / después de *escribirnos.*', 'La línea respira', 'Entrada desde negro', 'Re suspendido, sin pulso', 'Aire; tick', 'Gancho de BOFU: la pregunta del que ya casi decide'],
    ['3,4-8,2', 'La rendija empieza a abrirse; polvo en suspensión', 'Cuatro etapas. / Sin *sorpresas.*', 'Apertura lenta', 'Continuo', 'Re menor 9', 'Swell de aire', 'Promesa: claridad'],
    ['8,2-32,2', 'Cuatro umbrales, 6 s cada uno: la rendija se abre en un tercio distinto, el numeral enorme y la etapa con su glifo; al final de cada una, un barrido cruza al siguiente', '01 Diagnóstico · 02 Dirección · 03 Sistema · 04 Acompañamiento (con dos líneas cada una)', 'Apertura, sostén, barrido', 'Barrido de umbral en cada cambio', 'Pulso a 84 BPM; cambia el acorde en cada etapa', 'Impacto grave en cada cruce; clic en el numeral', 'El método, etapa por etapa'],
    ['32,2-37,2', 'Las rendijas abiertas a la vez, bajo una veladura; placa cinética a cuerpo gigante', 'Un equipo. / Un criterio. / Un / *interlocutor.*', 'Una frase por golpe, cada 0,95 s', 'Corte al beat', 'Re mayor 9', 'Clic por frase', 'Diferencial: un solo responsable'],
    ['37,2-41,0', 'La luz se cierra en un punto', 'Enfoquemos lo que / ya es *tuyo.*', 'Iris de luz a punto', 'Iris', 'Re lidio', 'Vidrio', 'Frase del sitio'],
    ['41,0-45,0', 'Placa de cierre común', 'Agendá / 30 *minutos.* · La primera conversación es para entender tu marca. · calendly.com/focus-creatives-info/30min · Sin plantilla · 08/10', 'Entrada desde desenfoque', 'Veladura', 'Re mayor 9', 'Firma sonora de vidrio', 'Cierre BOFU: reunión'],
  ],
  items: [
    /* línea y apertura inicial */
    gl({ frag: G.slit, t0: 0, t1: 8.3, fin: 0.8, u: (t) => ({ uOpen: 0.05 + 0.35 * io(p(t, 3.4, 8.2)), uX: 0.84, uDust: p(t, 2, 5), uAmt: 1, uWarm: 0.25 }) }),
    text({ lines: ['Qué pasa'], size: 132, x: 80, y: 300, w: 700, t0: 0.2, t1: 3.3, by: 'word', stagger: 0.08 }),
    text({ lines: ['después de', '*escribirnos.*'], size: 112, x: 80, y: 980, w: 700, t0: 0.9, t1: 3.3, by: 'word', stagger: 0.08 }),
    text({ lines: ['Cuatro etapas.'], size: 112, x: 80, y: 300, w: 700, t0: 3.6, t1: 8.1, by: 'word', stagger: 0.08 }),
    text({ lines: ['Sin *sorpresas.*'], size: 112, x: 80, y: 1060, w: 700, t0: 4.8, t1: 8.1, by: 'word', stagger: 0.09 }),
    label({ text: 'Umbral · 08 / 10', x: 80, y: 450, t0: 4, t1: 8.1 }),
    /* etapas */
    ...PHASES.map(([n, name, l1, l2, g], i) => {
      const a = P0 + i * PD, b = a + PD;
      const sx = slitX(i);
      const left = sx > 0.5; // el texto va del lado opuesto a la rendija
      const tx = left ? 80 : 540;
      return group({ t0: a, t1: b, clip: 'sweepX', clipIn: [a, a + 0.7], fout: 0.35, children: [
        box({ x: 0, y: 0, w: 1080, h: 1920, t0: a, t1: b, fin: 0.01, blur: false, style: { background: 'var(--ink)' } }),
        gl({ frag: G.slit, t0: a, t1: b, fin: 0.4, u: (t) => ({ uOpen: 0.12 + 0.4 * out(p(t, a + 0.3, a + 2.6)), uX: sx, uDust: 1, uAmt: 1, uWarm: 0.2 }) }),
        text({ lines: [n], size: 380, x: left ? 80 : 540, y: 300, w: 460, t0: a + 0.3, t1: b, by: 'all', blur: 24, fin: 1.2, style: { fontWeight: 300, letterSpacing: '-0.06em', color: 'rgba(246,246,244,.14)' } }),
        glyph({ name: g, x: tx, y: 700, size: 72, t0: a + 0.6, t1: b, color: 'var(--green)' }),
        text({ lines: [name], size: name.length > 12 ? 68 : 84, x: tx, y: 800, w: 480, t0: a + 0.7, t1: b, by: 'all', blur: 18 }),
        text({ lines: [l1], cls: 't-body', size: 42, x: tx, y: 930, w: 470, t0: a + 1.2, t1: b, by: 'word', stagger: 0.04 }),
        text({ lines: [l2], cls: 't-body', size: 42, x: tx, y: 1080, w: 470, t0: a + 1.9, t1: b, by: 'word', stagger: 0.04, color: 's' }),
      ] });
    }),
    /* todas abiertas */
    group({ t0: 32.2, t1: 37.4, clip: 'sweepX', clipIn: [32.2, 32.9], children: [
      box({ x: 0, y: 0, w: 1080, h: 1920, t0: 32.2, t1: 37.4, fin: 0.01, blur: false, style: { background: 'var(--ink)' } }),
      ...[0.66, 0.78, 0.9].map((x, i) => gl({ frag: G.slit, t0: 32.3 + i * 0.3, t1: 37.4, fin: 0.6, blend: 'screen', u: () => ({ uOpen: 0.2, uX: x, uDust: 0.6, uAmt: 0.75, uWarm: 0.15 }) })),
      F.slam({ t0: 32.7, t1: 37.3, step: 0.95, hold: 0.8, bg: 'rgba(10,10,11,.74)', words: ['Un equipo.', 'Un criterio.', 'Un', '*interlocutor.*'] }),
    ] }),
    /* iris de luz */
    gl({ frag: G.halo, t0: 37.2, t1: 41.2, fin: 0.3, u: (t) => ({ uR: lerp(0.3, 0.018, io(p(t, 37.2, 38.5))), uAmt: lerp(0.6, 1.1, p(t, 37.2, 38.5)), uC: [0.5, 0.42], uHue: -1, uSplit: 0.0 }) }),
    text({ lines: ['Enfoquemos lo que', 'ya es *tuyo.*'], size: 104, x: 80, y: 300, w: 940, t0: 38.5, t1: 41.1, by: 'word', stagger: 0.08 }),
    F.B ? end({ t0: 41.0, lines: ['Primero,', 'te *escuchamos.*'], size: 112, y: 440, cta: 'Escribinos por WhatsApp.', dest: '+54 9 11 5926 4267', serie: 'Sin plantilla · 08 / 10' })
        : end({ t0: 41.0, lines: ['Agendá', '30 *minutos.*'], size: 124, y: 440, cta: 'Primero, escuchamos tu marca.', dest: 'calendly.com/focus-creatives-info/30min', serie: 'Sin plantilla · 08 / 10' }),
  ],
  audio: {
    key: 5, bpm: 84,
    chords: [[0, 'sus2', 0], [3.4, 'min9', 0], [8.2, 'min9', 0], [14.2, 'maj9', -4], [20.2, 'lyd', 5], [26.2, 'sus4', 7], [32.2, 'maj9', 0], [37.2, 'lyd', 0], [41, 'maj9', 0]],
    energy: [[0, 0.2], [3.4, 0.35], [8.2, 0.55], [20, 0.7], [32.2, 0.85], [37.2, 0.6], [41, 0.4], [45, 0.3]],
    layers: { pulse: [[8.2, 37.2]], hats: [[14.2, 32.2]], bass: [[8.2, 37.2]], arp: [[20.2, 32.2, 'up'], [32.2, 37.2, 'bell']] },
    events: [[0.1, 'breath'], [0.2, 'tick', 0.9], [3.4, 'swell', 1, 0.5], [6.2, 'riser', 0.7, 0.5, 2.0], [8.2, 'impact', 0.8], [8.5, 'click'], [14.2, 'impact', 0.7], [14.5, 'click'], [20.2, 'impact', 0.7], [20.5, 'click'], [26.2, 'impact', 0.7], [26.5, 'click'], [32.2, 'impact', 0.8], [32.6, 'click', 1, 0.3], [33.8, 'click', 1, 0.7], [35.0, 'click', 1, 0.5], [37.2, 'glass', 0.8], [42.5, 'glass', 1.0], [43.0, 'resolve']],
  },
});

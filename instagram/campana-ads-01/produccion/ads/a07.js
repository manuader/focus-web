/* A07 · MOFU · "La primera reunión" · 45 s · Cáustica.
   El sitio es la primera reunión con un cliente. La prueba es el sitio de
   FOCUS grabado en un teléfono, cuadro por cuadro: todo lo que se ve pasa
   de verdad. La cáustica (luz que atraviesa una superficie) es el fondo:
   una interfaz es un vidrio que la gente toca. */
const { text, box, group, image, label, rule, end, eyebrow, glyph, gl, GLSL, p, io, out, lerp, clamp } = F;
const G = GLSL;
const CAP = '/instagram/campana-ads-01/produccion/capturas/';
const PH = { x: 280, y: 470, w: 520, h: 924 };

/* El teléfono entra inclinado y gira despacio mientras dura su toma
   (o.flip invierte el giro para alternar entre tomas). */
const phone = (dir, count, t0, t1, o = {}) => {
  const s = F.seq({ dir: CAP + dir, count, x: o.x ?? PH.x, y: o.y ?? PH.y, w: o.w ?? PH.w, h: o.h ?? PH.h, t0, t1, frame: true, rate: o.rate ?? 1, offset: o.offset ?? 0, fin: 0.7, zoom: [1.02, 1] });
  const f = o.flip ? -1 : 1;
  const tf = F.tilt(t0, t1, { rx0: 12, rx1: 3, ry0: -16 * f, ry1: 9 * f, s0: 0.9, s1: 1.0, ...(o.tilt || {}) });
  return { create(root) { s.create(root); s.wrap.style.transformOrigin = '50% 45%'; }, update(t) { s.update(t); s.wrap.style.transform = tf(t); } };
};

const DETAILS = [
  [8.6, 'prisma', 210, 'El prisma responde', 'al *scroll.*', 'Servicios · animación ligada al scroll', 1.25],
  [13.8, 'refraccion', 165, 'La luz sigue', 'tu *dedo.*', 'Refracción · interacción táctil', 1.0],
  [19.0, 'casos', 360, 'Los casos entran', 'en *foco.*', 'Trabajo · galería con foco selectivo', 2.0],
  [29.4, 'foco', 135, 'Lo que importa,', 'bajo tu *lente.*', 'Foco · lente táctil', 0.9],
];

F.mount({
  name: F.vname('focus_ad07_primera-reunion'),
  dur: 45,
  edit: { punches: [6.0, 11.2, 13.8, 16.4, 19.0, 21.6, 26.8, 31.8] },
  cover: 11.5,
  meta: {
    id: 'A07', titulo: 'La primera reunión', etapa: 'MOFU', fenomeno: 'Cáustica',
    publico: 'P1 fundadoras cuya web no está a la altura; P3 responsables de marketing que renuevan el sitio',
    objetivo: 'Consideración: demostrar el nivel de diseño y desarrollo web con un producto real, y llevar a que lo prueben en su teléfono.',
    necesidad: 'Objeción: "un sitio lindo es una plantilla cara" y "las agencias de diseño no saben desarrollar".',
    promesa: 'FOCUS diseña y desarrolla sitios que se comportan como producto: interacción, rendimiento, idioma y SEO. Verificable: todo lo que se ve es focuscreatives.net grabado en un teléfono.',
    accion: 'Abrir focuscreatives.net en el teléfono.',
    servicio: 'Páginas web: diseño, desarrollo, SEO y mantenimiento',
    referencia: 'P8 Metalab: mostrar el producto funcionando en un recorrido de pantalla real de 20 a 40 s.',
    cta: 'Abrí focuscreatives.net en tu teléfono.', destino: 'focuscreatives.net',
    exito: 'Clics al enlace por cada 1.000 impresiones y porcentaje de sesiones móviles con scroll hasta "Trabajo".',
    variante: { cambia: 'Apertura (0-3,4 s): el prisma del sitio respondiendo al scroll, sin texto durante 1,5 s, y recién después la frase de negocio. En la A abre el hero con la frase desde el cuadro 0.', guion: [['0,0-3,4', 'El prisma del sitio en un teléfono, acelerado; sin texto hasta 1,5 s', '(1,5 s) Tu sitio es la primera reunión / con tu *cliente.*', 'Captura a 2,2x', 'Entrada desde desenfoque', 'Pad acuoso en La', 'Vidrio; clic', 'Gancho visual']] },
    ab: 'Apertura con la frase de negocio ("Tu sitio es la primera reunión...") contra apertura con la interacción más vistosa (el prisma) sin texto los primeros 1,5 s. Hipótesis: la frase retiene más a P3; el prisma, a P1.',
    caption: `Antes de la primera llamada, tu cliente ya estuvo en tu sitio. Ahí decidió si sos del tamaño que decís.

Nuestro sitio es nuestra primera prueba. Lo que ves en el video pasa de verdad, en un teléfono:
· el prisma de servicios responde al scroll;
· la refracción sigue tu dedo;
· los casos entran en foco a medida que pasan;
· y te habla en tu idioma según tu navegador.

Diseño, desarrollo y SEO con una sola mano. Abrilo en tu teléfono y probalo.

#diseñoweb #desarrolloweb #experienciadeusuario #focuscreatives #buenosaires`,
    assets: [
      ['Capturas reales del sitio en teléfono', 'produccion/capture.mjs (Playwright, 432×768 a 2,5x, reloj virtual, toques simulados): hero, hero_en, prisma, refraccion, casos, foco', '—'],
      ['Cáustica', 'Shader glsl.caustic', '"caustic light pattern from sunlight through rippling water on a dark surface, iridescent magenta and green fringes, macro, black background, no text"'],
      ['Marco de teléfono', 'Marco de 1 px gris (regla de la marca: sin mockups de dispositivo)', '—'],
    ],
  },
  guion: [
    ['0,0-3,4', 'El hero del sitio en un teléfono (marco de 1 px) sobre una red de luz cáustica', 'Tu sitio es la primera reunión / con tu *cliente.*', 'La captura corre; la cáustica deriva', 'Entrada desde desenfoque', 'Pad acuoso en La', 'Vidrio; clic de interfaz', 'Gancho de negocio'],
    ['3,4-8,6', 'La cáustica se intensifica; el teléfono se desenfoca', 'Ahí decide si sos / del tamaño que *decís.*', 'Rack focus', 'Desenfoque cruzado', 'La mayor 9', 'Aire', 'Por qué importa'],
    ['8,6-24,2', 'Tres detalles reales, 5,2 s cada uno, con el teléfono girando en 3D (alterna el sentido en cada toma): el prisma con scroll, la refracción siguiendo el dedo, la galería de casos en foco', 'El prisma responde al *scroll.* / La luz sigue tu *dedo.* / Los casos entran en *foco.*', 'Capturas a velocidad real o acelerada; rótulo técnico por detalle', 'Desenfoque de salida y entrada al beat', 'Pulso a 90 BPM, arpegio', 'Clic por detalle; teclas suaves', 'Prueba: producto funcionando'],
    ['24,2-29,4', 'Dos teléfonos: el mismo hero en español y en inglés', 'Te habla en tu *idioma.*', 'Entradas escalonadas', 'Barrido de umbral', 'Campanas', 'Blip', 'Oficio invisible: idioma según el navegador'],
    ['29,4-34,6', 'La sección Foco con la lente táctil', 'Lo que importa, / bajo tu *lente.*', 'Captura con toque simulado', 'Desenfoque cruzado', 'Fa lidio', 'Tick', 'Cierre del recorrido'],
    ['34,6-41,0', 'La cáustica ocupa todo, bajo una veladura; placa cinética a cuerpo gigante', 'Diseño, / desarrollo / y SEO. / Una sola / *mano.*', 'Un golpe cada 0,6 s; la última palabra se recompone desde RGB', 'Corte al pulso', 'La lidio', 'Impacto', 'Promesa'],
    ['41,0-45,0', 'Placa de cierre común', 'Tu sitio, / a la altura de tu *marca.* · Abrí focuscreatives.net en tu teléfono. · focuscreatives.net · Sin plantilla · 07/10', 'Entrada desde desenfoque', 'Veladura', 'La mayor 9', 'Firma sonora de vidrio', 'Cierre MOFU: probar el sitio'],
  ],
  items: [
    gl({ frag: G.caustic, t0: 0, t1: 41.2, fin: 0.6, u: (t) => ({
      uAmt: t < 3.4 ? 0.45 : t < 8.6 ? lerp(0.45, 0.8, p(t, 3.4, 5)) : t < 34.6 ? 0.32 : lerp(0.32, 0.9, p(t, 34.6, 36)),
      uSplit: 0.014, uScale: 2.6, uTint: t > 34.6 ? 0.5 : 0.25, uSpeed: 0.3, uCenter: [0.5, 0.5], uRadius: 0,
    }) }),
    box({ x: 0, y: 250, w: 1080, h: 260, t0: 0, t1: 34.6, blur: false, style: { background: 'linear-gradient(180deg, rgba(10,10,11,.92) 40%, rgba(10,10,11,0))' } }),
    ...(F.B ? [
      /* variante B: la interacción más vistosa sola durante 1,5 s */
      phone('prisma', 210, 0, 3.6, { rate: 2.2, offset: 1.2 }),
      text({ lines: ['Tu sitio es la primera reunión', 'con tu *cliente.*'], size: 68, x: 80, y: 290, w: 960, t0: 1.5, t1: 3.4, by: 'word', stagger: 0.05, fin: 0.55 }),
    ] : [
      phone('hero', 120, 0, 3.6, { rate: 1 }),
      text({ lines: ['Tu sitio es la primera reunión', 'con tu *cliente.*'], size: 68, x: 80, y: 290, w: 960, t0: 0.2, t1: 3.4, by: 'word', stagger: 0.05, fin: 0.55 }),
    ]),
    text({ lines: ['Ahí decide si sos', 'del tamaño que *decís.*'], size: 96, x: 80, y: 640, w: 960, t0: 3.7, t1: 8.5, by: 'word', stagger: 0.07 }),
    label({ text: 'Cáustica · 07 / 10', x: 80, y: 880, t0: 4.2, t1: 8.5 }),
    ...DETAILS.map(([t0, dir, count, l1, l2, rot, rate], i) => {
      const t1 = t0 + 5.2;
      return group({ t0, t1, fin: 0.01, fout: 0.45, outBlur: 12, children: [
        phone(dir, count, t0, t1, { rate, flip: i % 2 === 0 }),
        text({ lines: [l1 + ' ' + l2], size: 76, x: 80, y: 300, w: 960, t0: t0 + 0.15, t1, by: 'word', stagger: 0.06 }),
        label({ text: rot, x: 80, y: 420, t0: t0 + 0.4, t1 }),
      ] });
    }),
    /* idioma */
    group({ t0: 24.2, t1: 29.4, clip: 'sweepX', clipIn: [24.2, 25.0], fout: 0.45, children: [
      phone('hero', 120, 24.4, 29.4, { x: 110, y: 460, w: 400, h: 711, tilt: { ry0: 22, ry1: 10, rx0: 8, rx1: 2 } }),
      phone('hero_en', 120, 24.8, 29.4, { x: 570, y: 460, w: 400, h: 711, tilt: { ry0: -22, ry1: -10, rx0: 8, rx1: 2 } }),
      text({ lines: ['Te habla en tu *idioma.*'], size: 84, x: 80, y: 300, w: 960, t0: 24.4, t1: 29.3, by: 'word', stagger: 0.07 }),
      label({ text: 'Navegador en español', x: 110, y: 1196, t0: 25, t1: 29.3 }),
      label({ text: 'Navegador en inglés', x: 570, y: 1196, t0: 25.3, t1: 29.3 }),
    ] }),
    /* oficio */
    F.slam({ t0: 34.8, t1: 41.05, step: 0.62, hold: 1.4, bg: 'rgba(10,10,11,.8)', words: ['Diseño,', 'desarrollo', 'y SEO.', 'Una sola', '*mano.*'] }),
    end({ t0: 41.0, lines: ['Tu sitio,', 'a la altura de tu *marca.*'], size: 92, y: 470, cta: 'Abrí focuscreatives.net en tu teléfono.', dest: 'Diseño y desarrollo web a medida', serie: 'Sin plantilla · 07 / 10' }),
  ],
  audio: {
    key: 0, bpm: 90,
    chords: [[0, 'add9', 0], [3.4, 'maj9', 0], [8.6, 'maj9', 0], [13.8, 'min9', -3], [19, 'lyd', 5], [24.2, 'maj9', 0], [29.4, 'lyd', 5], [34.6, 'lyd', 0], [41, 'maj9', 0]],
    energy: [[0, 0.4], [3.4, 0.45], [8.6, 0.65], [19, 0.8], [24.2, 0.6], [29.4, 0.7], [34.6, 0.9], [41, 0.4], [45, 0.3]],
    layers: { pulse: [[8.6, 34.6]], hats: [[13.8, 34.6, 16]], bass: [[8.6, 34.6]], arp: [[8.6, 24.2, 'up'], [24.2, 29.4, 'bell'], [29.4, 34.6, 'down']] },
    events: [[0.05, 'glass', 0.7], [0.4, 'click', 0.8, 0.6], [3.7, 'swell', 1, 0.5], [8.6, 'impact', 0.6], [8.6, 'click'], [13.8, 'click', 1, 0.3], [19.0, 'click', 1, 0.7], [24.2, 'click'], [25.0, 'blip'], [29.4, 'tick', 1.1], [34.6, 'impact', 0.8], [36.4, 'glass', 0.7], [42.5, 'glass', 1.0], [43.0, 'resolve']],
  },
});

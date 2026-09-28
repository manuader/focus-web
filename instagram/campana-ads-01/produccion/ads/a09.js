/* A09 · BOFU · "Todos los meses" · 45 s · Órbita.
   El acompañamiento mensual: un estudio entero que vuelve cada mes, como
   cuatro anillos de vidrio en órbita. Qué incluye es una propuesta a
   confirmar por el estudio (ver 03-sistema-creativo, C2). Sin precios. */
const { text, box, group, image, label, rule, end, eyebrow, glyph, gl, GLSL, p, io, out, lerp, clamp } = F;
const C = (id) => `/public/assets/clients/${id}-card.jpg`;

const RINGS = [
  ['Contenido', 'Piezas diseñadas, no plantillas:', 'foto, video y motion.', 'direccion-de-arte', '#ff00ff'],
  ['Redes y comunidad', 'Planificación, publicación,', 'comunidad y métricas.', 'social-media', '#5b8cff'],
  ['Web', 'Mantenimiento, mejoras y SEO,', 'sin esperar un proyecto nuevo.', 'web', '#00ff33'],
  ['Flujos con IA', 'Reportes, variantes y tareas', 'repetidas, automatizadas.', 'ia-agentes', '#f6f6f4'],
];
const R0 = 9.2, RD = 5.2;
const CLIENTS = [['chillin', '@chillin1390bar', 'Bar'], ['chuchones', '@chuchones_wines', 'Vinos boutique'], ['rsh-consultora', '@rsh_consultora', 'Seguridad e higiene'], ['fernanda-estetica', '@esteticaintegralfernanda', 'Estética y salud'], ['santa-tuca', '@santatuca', 'Creador de contenido'], ['toplaser', 'Top Láser', 'Imprenta']];

F.mount({
  name: F.vname('focus_ad09_todos-los-meses'),
  dur: 45,
  edit: { punches: [6.3, 14.4, 19.6, 24.8, 33.2] },
  cover: 12.6,
  meta: {
    id: 'A09', titulo: 'Todos los meses', etapa: 'BOFU', fenomeno: 'Órbita',
    publico: 'P1 fundadoras que necesitan presencia constante; P2 creadores que quieren un equipo sin armarlo; P3 empresas que quieren un solo proveedor mensual',
    objetivo: 'Conversión: presentar el acompañamiento mensual como forma de contratación y abrir conversaciones por WhatsApp.',
    necesidad: 'Dolor: coordinar freelancers y proveedores todos los meses; calidad despareja. Objeción: "un estudio premium es solo para proyectos grandes".',
    promesa: 'Un estudio completo cada mes (contenido, redes, web y flujos con IA) con la misma mano que diseñó la marca. Verificable: las seis cuentas que se muestran son casos de social media publicados en focuscreatives.net. Qué incluye exactamente: a confirmar por el estudio.',
    accion: 'Escribir por WhatsApp.',
    servicio: 'Acompañamiento mensual: social media management, contenido, mantenimiento web y flujos con IA',
    referencia: 'P6 Koto Reel 2026: credenciales verificables funcionan con compradores que ya están comparando. P7: en el segmento premium las redes son credencial, no el único canal.',
    cta: 'Escribinos por WhatsApp.', destino: 'wa.me/5491159264267',
    exito: 'Conversaciones de WhatsApp iniciadas y calificadas (con presupuesto mensual declarado) por cada 1.000 impresiones.',
    variante: { cambia: 'CTA y destino (41-45 s): "Contanos qué necesitás en el sitio." hacia la sección Contacto de focuscreatives.net, en lugar de WhatsApp.', destino: 'focuscreatives.net/#contacto', captionFin: 'Contanos qué necesitás en focuscreatives.net y te contamos cómo funciona.', guion: [['41,0-45,0', 'Placa de cierre común', 'Un estudio, / todos los *meses.* · Contanos qué necesitás en el sitio. · focuscreatives.net · Contacto · Sin plantilla · 09/10', 'Entrada desde desenfoque', 'Veladura', 'Re mayor 9', 'Firma sonora de vidrio', 'Cierre BOFU: formulario']] },
    ab: 'Destino WhatsApp contra formulario de contacto del sitio. Hipótesis: WhatsApp genera más conversaciones y el formulario, menos pero más calificadas; medir costo por conversación calificada, no por mensaje.',
    caption: `Un estudio entero, todos los meses.

Contenido diseñado (no plantillas), redes y comunidad, mantenimiento y mejoras de tu web, y flujos con IA para lo repetido. Con la misma mano que diseñó tu marca, así nada se desordena de un mes al otro.

Sin armar un equipo interno. Sin coordinar proveedores.

Nuestros casos de social media van de bares y vinos a estética, industria y creadores. Están en focuscreatives.net.

Escribinos por WhatsApp y te contamos cómo funciona.

#socialmediamanagement #contenidodigital #marketingdigital #focuscreatives #buenosaires`,
    assets: [
      ['Anillos de vidrio en órbita', 'Escena 3D engine/scenes/orbit.js (cuatro toroides con marcas y un punto de luz por anillo)', '"four concentric thin glass rings orbiting in the dark, one small glowing orb on each ring, magenta blue green and white, black studio, soft reflections, 3d render, no text"'],
      ['Glifos de cada frente', 'direccion-de-arte, social-media, web, ia-agentes', '—'],
      ['Casos reales de social media', 'public/assets/clients/*-card.jpg (los seis de WORKS con social media). Confirmar permiso para pauta.', '—'],
    ],
  },
  guion: [
    ['0,0-3,4', 'Cuatro anillos de vidrio en órbita, vistos en perspectiva; sin puntos encendidos', 'Un estudio / entero. / Todos / los *meses.*', 'Placa cinética sobre la órbita, un golpe cada 0,64 s; cámara que se acerca', 'Entrada desde desenfoque', 'Re mayor 9, pulso suave desde el inicio', 'Vidrio; tick', 'Gancho: la oferta en dos líneas'],
    ['3,4-9,2', 'Los anillos giran; se encienden los puntos de luz', 'Sin armar un equipo interno. / Sin coordinar *proveedores.*', 'Palabra por palabra', 'Desenfoque cruzado', 'Si menor 9', 'Aire', 'Dolor resuelto'],
    ['9,2-30,0', 'Cada 5,2 s se ilumina un anillo y su frente, cada uno con su propio ángulo de cámara (cenital, lateral, a ras): Contenido, Redes y comunidad, Web, Flujos con IA', 'Nombre del frente + dos líneas de qué incluye', 'El anillo activo brilla, los demás se atenúan', 'Corte al beat', 'Pulso a 90 BPM, bajo y hats; campana en cada vuelta', 'Clic por frente; campana', 'Qué incluye (a confirmar)'],
    ['30,0-36,2', 'Grilla de seis casos reales de social media, enmarcados', 'Casos de social media:', 'Entradas escalonadas', 'Barrido de umbral', 'Sol lidio', 'Obturador', 'Prueba verificable'],
    ['36,2-41,0', 'Vuelven los anillos, todos encendidos', 'Con la misma mano / que diseñó tu *marca.*', 'Rack focus', 'Desenfoque cruzado', 'Re lidio', 'Impacto suave', 'Diferencial: coherencia'],
    ['41,0-45,0', 'Placa de cierre común', 'Un estudio, / todos los *meses.* · Escribinos por WhatsApp. · +54 9 11 5926 4267 · Sin plantilla · 09/10', 'Entrada desde desenfoque', 'Veladura', 'Re mayor 9', 'Firma sonora de vidrio', 'Cierre BOFU: conversación'],
  ],
  items: [
    F.three({ scene: 'orbit', t0: 0, t1: 30.2, fin: 1.1, blurIn: 18, opts: {
      n: 4, colors: [0xff00ff, 0x3366ff, 0x00ff33, 0xffffff], tilt: 1.0, camFrom: 17, camTo: 14.5, camDur: 30, camY: 1.2, lookY: 1.9,
      active: (k) => (k < R0 ? (k < 3.6 ? 9 : -1) : clamp(Math.floor((k - R0) / RD), 0, 3)),
      /* una toma por sección: el corte de ángulo lo tapa el golpe de montaje */
      shots: [
        [0, { x: 0, y: 1.2, z: 17, ly: 1.9, dz: -1.6 }],
        [3.4, { x: 3.6, y: 3.2, z: 13.5, ly: 1.7, dx: -2.2 }],
        [R0, { x: 0, y: 6.5, z: 12, ly: 2.4, dz: -1.2 }],
        [R0 + RD, { x: -4.2, y: 1.6, z: 13.5, ly: 2.0, dx: 1.8 }],
        [R0 + 2 * RD, { x: 0, y: 0.5, z: 12.5, ly: 2.4, dz: -1.6 }],
        [R0 + 3 * RD, { x: 3.2, y: 4.2, z: 12.5, ly: 1.7, dx: -1.6 }],
      ],
    } }),
    F.slam({ t0: 0.05, t1: 3.35, step: 0.64, hold: 0.7, bg: false, cy: 560, words: ['Un estudio', 'entero.', 'Todos', 'los *meses.*'] }),
    text({ lines: ['Sin armar un equipo', 'interno.'], size: 92, x: 80, y: 300, w: 940, t0: 3.6, t1: 9.1, by: 'word', stagger: 0.06 }),
    text({ lines: ['Sin coordinar', '*proveedores.*'], size: 92, x: 80, y: 560, w: 940, t0: 5.4, t1: 9.1, by: 'word', stagger: 0.07 }),
    label({ text: 'Órbita · 09 / 10', x: 80, y: 790, t0: 4, t1: 9.1 }),
    box({ x: 0, y: 250, w: 1080, h: 520, t0: 9.2, t1: 30, blur: false, style: { background: 'linear-gradient(180deg, rgba(10,10,11,.85) 45%, rgba(10,10,11,0))' } }),
    ...RINGS.map(([name, l1, l2, g, col], i) => {
      const a = R0 + i * RD, b = a + RD;
      return group({ t0: a, t1: b, fin: 0.01, fout: 0.4, outBlur: 10, children: [
        glyph({ name: g, x: 80, y: 290, size: 70, t0: a + 0.05, t1: b, color: col }),
        text({ lines: [`{s:${String(i + 1).padStart(2, '0')} / 04}`], cls: 't-mono', size: 26, x: 170, y: 312, w: 400, t0: a + 0.1, t1: b, by: 'all' }),
        text({ lines: [name], size: 96, x: 80, y: 380, w: 940, t0: a + 0.15, t1: b, by: 'all', blur: 18 }),
        text({ lines: [l1, l2], cls: 't-body', size: 44, x: 84, y: 510, w: 900, t0: a + 0.6, t1: b, by: 'line', lineDelay: 0.3, stagger: 0, color: 'w' }),
      ] });
    }),
    /* casos */
    group({ t0: 30.0, t1: 36.4, clip: 'sweepX', clipIn: [30.0, 30.8], fout: 0.4, children: [
      box({ x: 0, y: 0, w: 1080, h: 1920, t0: 30, t1: 36.4, fin: 0.01, blur: false, style: { background: 'var(--ink)' } }),
      text({ lines: ['Casos de social media:'], size: 80, x: 80, y: 290, w: 940, t0: 30.3, t1: 36.3, by: 'word', stagger: 0.06 }),
      ...CLIENTS.flatMap(([id, n, c], i) => {
        const x = 80 + (i % 3) * 312, y = 470 + Math.floor(i / 3) * 390;
        return [
          image({ src: C(id), x, y, w: 290, h: 270, t0: 30.7 + i * 0.18, t1: 36.4, frame: true, zoom: [1.06, 1] }),
          text({ lines: [n], cls: 't-body', size: n.length > 18 ? 21 : 26, x, y: y + 284, w: 300, t0: 30.9 + i * 0.18, t1: 36.3, by: 'all', style: { fontWeight: 700 } }),
          text({ lines: [`{s:${c}}`], cls: 't-body', size: 22, x, y: y + 338, w: 300, t0: 31.0 + i * 0.18, t1: 36.3, by: 'all' }),
        ];
      }),
      label({ text: 'Social media management · casos en focuscreatives.net', x: 80, y: 392, w: 940, t0: 31.5, t1: 36.3 }),
    ] }),
    F.three({ scene: 'orbit', t0: 36.2, t1: 41.2, fin: 0.9, blurIn: 16, opts: { n: 4, colors: [0xff00ff, 0x3366ff, 0x00ff33, 0xffffff], tilt: 0.8, camFrom: 15, camTo: 13.5, camDur: 5, camY: 1.0, lookY: 1.6, active: () => -1, time: (k) => k + 30 } }),
    text({ lines: ['Con la misma mano', 'que diseñó tu *marca.*'], size: 96, x: 80, y: 300, w: 940, t0: 36.5, t1: 41.1, by: 'word', stagger: 0.07 }),
    end({ t0: 41.0, lines: ['Un estudio,', 'todos los *meses.*'], size: 108, y: 460, cta: F.B ? 'Contanos qué necesitás en el sitio.' : 'Escribinos por WhatsApp.', dest: F.B ? 'focuscreatives.net · Contacto' : '+54 9 11 5926 4267', serie: 'Sin plantilla · 09 / 10' }),
  ],
  audio: {
    key: 5, bpm: 90,
    chords: [[0, 'maj9', 0], [3.4, 'min9', -3], [9.2, 'maj9', 0], [14.4, 'min9', -3], [19.6, 'lyd', 5], [24.8, 'sus4', 7], [30, 'lyd', 5], [36.2, 'lyd', 0], [41, 'maj9', 0]],
    energy: [[0, 0.45], [3.4, 0.45], [9.2, 0.65], [20, 0.8], [30, 0.6], [36.2, 0.85], [41, 0.4], [45, 0.3]],
    layers: { pulse: [[0, 36.2]], hats: [[9.2, 30, 16]], bass: [[3.4, 36.2]], arp: [[9.2, 30, 'bell'], [36.2, 41, 'up']] },
    events: [[0.05, 'glass', 0.8], [1.3, 'tick', 1.1], [3.6, 'breath'], [9.2, 'click'], [14.4, 'click', 1, 0.3], [19.6, 'click', 1, 0.7], [24.8, 'click', 1, 0.5], [30.0, 'shutter', 1, 0.5], [36.2, 'impact', 0.6], [42.5, 'glass', 1.0], [43.0, 'resolve']],
  },
});

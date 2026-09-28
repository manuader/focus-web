/* A03 · TOFU · "Lo que queda" · 45 s · Reflexión.
   Para creadores: una marca es lo que queda cuando no estás en el cuadro.
   Recurso: columna de vidrio y luz sobre un espejo negro. La columna (la
   persona) sube y sale; en el reflejo aparece un anillo (la marca). */
const { text, box, group, image, label, rule, end, eyebrow, glyph, gl, GLSL, p, io, out, lerp, clamp } = F;

F.mount({
  name: F.vname('focus_ad03_lo-que-queda'),
  dur: 45,
  edit: { punches: [12.6, 21.2, 25.2, 32.1, 38.0] },
  cover: 15.5,
  meta: {
    id: 'A03', titulo: 'Lo que queda', etapa: 'TOFU', fenomeno: 'Reflexión',
    publico: 'P2 creadores e influencers medianos y grandes que ya monetizan y quieren construir una marca, un producto o una comunidad',
    objetivo: 'Alcance y envíos: instalar la idea de que una marca propia es la forma de no depender de aparecer en cámara, y que FOCUS la construye.',
    necesidad: 'Dolor: el negocio depende de su presencia y del algoritmo. Objeción: "mi marca soy yo" y "no quiero sonar a empresa".',
    promesa: 'FOCUS construye lo que queda cuando el creador no está: nombre y sistema visual, un tono que otros pueden escribir y productos propios. Verificable: FOCUS edita reels y videos de YouTube y gestiona las redes de @santatuca (caso publicado en el sitio).',
    accion: 'Enviar el anuncio a otro creador (envíos) y visitar el perfil.',
    servicio: 'Identidad para creadores · social media management · producto (software)',
    referencia: 'P2 Wolff Olins · LG: la marca tratada como un personaje que se mueve y tiene comportamiento propio; aquí, la marca como el reflejo que sigue existiendo.',
    cta: 'Mandáselo a quien ya es más que su cara.', destino: 'Envío por DM · secundario: perfil y focuscreatives.net',
    exito: 'Envíos por cada 1.000 reproducciones por encima del promedio de la cuenta; retención al 75 % (34 s).',
    variante: { cambia: 'Gancho (0-3,5 s): una sola pregunta larga, "¿Qué queda de tu marca cuando no estás en cámara?", en lugar del contraste en dos tiempos audiencia/marca.', guion: [['0,0-3,5', 'Columna de vidrio sobre espejo negro', '¿Qué queda de tu marca / cuando no estás / en *cámara?*', 'Palabra por palabra', 'Entrada desde negro', 'Vidrio y aire, sin pulso', 'Vidrio; tick', 'Gancho en una pregunta']] },
    ab: 'Gancho: "Tenés una audiencia. ¿Tenés una marca?" contra "¿Qué queda de tu marca cuando no estás en cámara?". Hipótesis: el contraste audiencia/marca en dos tiempos retiene más que una pregunta larga en una sola placa.',
    caption: `Una audiencia se construye apareciendo. Una marca se construye para cuando no aparecés.

Si tu negocio depende de tu próximo video, depende de vos, de tu energía y de un algoritmo que no controlás. Una marca propia cambia eso: un nombre y un sistema visual que se reconocen sin tu cara, un tono que tu equipo puede escribir sin sonar a otro y productos que venden aunque no estés online.

Con @santatuca ya hacemos la edición de reels y videos de YouTube y la gestión de redes. Lo que sigue es construir lo que queda.

Mandáselo a quien ya es más que su cara.

#creadoresdecontenido #marcapersonal #identidaddemarca #focuscreatives #buenosaires`,
    assets: [
      ['Columna de vidrio y espejo negro', 'Escena 3D engine/scenes/mirror.js (vidrio físico con dispersión, Reflector, bloom)', '"single glass cylinder with a thin vertical line of white light inside, standing on a black mirror floor, perfect reflection, pure black studio, rim light, magenta and green refractions at the edges, 3d render, octane, no text"'],
      ['Anillo de marca en el reflejo', 'Misma escena (toroide de vidrio con filo magenta)', '—'],
      ['Glifos identidad, voz, software', 'design-system/assets/glyphs/', '—'],
      ['Caso real @santatuca', 'public/assets/clients/santa-tuca-card.jpg (del sitio). Confirmar permiso para pauta.', '—'],
    ],
  },
  guion: [
    ['0,0-3,5', 'Columna de vidrio con un hilo de luz, sobre espejo negro; su reflejo abajo', 'Tenés una audiencia. / ¿Tenés una *marca?*', 'Cámara que se acerca lento; la columna gira', 'Entrada desde negro', 'Vidrio y aire, sin pulso (Re suspendido)', 'Vidrio al entrar; tick en la pregunta', 'Gancho: la pregunta que separa audiencia de marca'],
    ['3,5-9,0', 'La columna ocupa el centro; el reflejo se estira', 'Hoy tu negocio depende / de que aparezcas en *cámara.*', 'Rack focus del texto', 'Desenfoque cruzado', 'Re menor 9', 'Respiración', 'Dolor: la dependencia'],
    ['9,0-17,0', 'La columna sube y sale del cuadro; en el espejo aparece un anillo de vidrio con filo magenta', 'Una marca es lo que queda / cuando no estás en el *cuadro.*', 'Subida de 3 s; el anillo crece desde 0,6', 'Continuo', 'Si bemol mayor 9', 'Grave cuando la columna sale; vidrio cuando nace el anillo', 'Idea central'],
    ['17,0-29,0', 'El anillo gira sobre el espejo; tres capas, cada una con su glifo', 'Un nombre y un sistema visual propios. / Un tono que otro puede escribir sin sonar a otro. / Productos: un drop, una comunidad, una app.', 'Glifos que entran en foco; cortes al beat', 'Corte al beat', 'Entra un pulso suave a 80 BPM', 'Clic por capa', 'Qué construye FOCUS'],
    ['29,0-35,0', 'Tarjeta real del sitio: @santatuca, enmarcada', 'Editamos sus reels, / su YouTube y sus *redes.* (junto a la tarjeta de @santatuca)', 'Push-in lento', 'Barrido de umbral', 'Campanas', 'Obturador', 'Prueba verificable (confirmar permiso)'],
    ['35,0-41,0', 'Vuelve el espejo; el anillo se ilumina entero', 'Para que tu negocio / no dependa de tu próximo *video.*', 'El anillo pasa de magenta a blanco', 'Desenfoque cruzado', 'Re lidio', 'Impacto suave', 'Beneficio'],
    ['41,0-45,0', 'Placa de cierre común', 'Sos más que / tu *cara.* · Mandáselo a quien ya es más que su cara. · focuscreatives.net · Sin plantilla · 03/10', 'Entrada desde desenfoque', 'Veladura', 'Re mayor 9', 'Firma sonora de vidrio', 'Cierre TOFU: envío'],
  ],
  items: [
    F.three({ scene: 'mirror', t0: 0, t1: 29.2, fin: 1.2, blurIn: 20, opts: {
      camX: -1.2, lookX: -1.0, lookY: 0.2, camY: 0.9, colH: 2.0, camFrom: 11.5, camTo: 9.6, camDur: 28,
      split: (k) => io(p(k, 8.6, 11.0)), exit: 'sink',
      ring: (k) => p(k, 10.6, 12.8),
      ringColor: 0xff00ff, ringX: -0.7,
      /* una toma por sección: el corte de ángulo lo tapa el golpe de montaje */
      shots: [
        [0, { x: -1.2, y: 0.9, z: 11.5, lx: -1.0, ly: 0.2, dz: -1.2 }],
        [3.5, { x: 0.9, y: 0.45, z: 8.2, lx: -0.15, ly: 0.2, dz: -1.4, dx: -0.6 }],
        [9.0, { x: -1.0, y: 0.2, z: 9.4, lx: -0.8, ly: -0.05, dz: -1.4 }],
        [17.0, { x: -0.7, y: 3.4, z: 6.4, lx: -0.7, ly: -0.55, dz: -0.9 }],
        [21.2, { x: 1.3, y: 0.55, z: 7.2, lx: -0.7, ly: -0.3, dx: -0.9 }],
        [25.2, { x: -0.2, y: 1.5, z: 6.6, lx: -0.7, ly: -0.35, dz: -0.8 }],
      ],
    } }),
    ...(F.B ? [
      /* variante B: una sola pregunta, larga, en una placa */
      text({ lines: ['¿Qué queda de tu marca', 'cuando no estás', 'en *cámara?*'], size: 92, x: 80, y: 300, w: 940, t0: 0.2, t1: 3.5, by: 'word', stagger: 0.06 }),
    ] : [
      text({ lines: ['Tenés una audiencia.'], size: 88, x: 80, y: 300, w: 940, t0: 0.25, t1: 3.5, by: 'word', stagger: 0.07 }),
      text({ lines: ['¿Tenés una *marca?*'], size: 120, x: 80, y: 420, w: 940, t0: 1.7, t1: 3.5, by: 'word', stagger: 0.1 }),
    ]),
    text({ lines: ['Hoy tu negocio depende', 'de que aparezcas', 'en *cámara.*'], size: 92, x: 80, y: 300, w: 940, t0: 3.8, t1: 8.9, by: 'word', stagger: 0.06 }),
    text({ lines: ['Una marca es lo que queda'], size: 80, x: 80, y: 300, w: 940, t0: 9.6, t1: 16.9, by: 'word', stagger: 0.06 }),
    text({ lines: ['cuando no estás', 'en el *cuadro.*'], size: 112, x: 80, y: 410, w: 940, t0: 12.6, t1: 16.9, by: 'word', stagger: 0.09 }),
    label({ text: 'Reflexión · 03 / 10', x: 80, y: 1200, t0: 10, t1: 16.9 }),
    ...[
      [17.2, 21.0, 'identidad', 'Identidad', ['Un nombre y un sistema', 'visual *propios.*']],
      [21.2, 25.0, 'voz', 'Tono', ['Un tono que otro puede escribir', 'sin sonar a *otro.*']],
      [25.2, 29.0, 'software', 'Producto', ['Un drop, una comunidad,', 'una *app.*']],
    ].flatMap(([a, b, g, eb, lines]) => [
      glyph({ name: g, x: 80, y: 290, size: 80, t0: a, t1: b, color: 'var(--paper)' }),
      text({ lines: [eb], cls: 't-eyebrow', size: 28, x: 182, y: 316, w: 700, t0: a + 0.1, t1: b, by: 'all', style: { color: 'var(--g100)' } }),
      text({ lines, size: 80, x: 80, y: 420, w: 940, t0: a + 0.25, t1: b, by: 'word', stagger: 0.05 }),
    ]),
    /* prueba real */
    group({ t0: 29.0, t1: 35.2, clip: 'sweepX', clipIn: [29.0, 29.9], children: [
      box({ x: 0, y: 0, w: 1080, h: 1920, t0: 29.0, t1: 35.2, fin: 0.01, blur: false, style: { background: 'var(--ink)' } }),
      text({ lines: ['Editamos sus reels,', 'su YouTube y sus *redes.*'], size: 80, x: 80, y: 290, w: 940, t0: 29.4, t1: 35.1, by: 'word', stagger: 0.05 }),
      image({ src: '/public/assets/clients/santa-tuca-card.jpg', x: 80, y: 520, w: 520, h: 650, t0: 29.9, t1: 35.2, frame: true, zoom: [1.05, 1] }),
      text({ lines: ['@santatuca'], size: 44, x: 640, y: 540, w: 380, t0: 30.4, t1: 35.1, by: 'all', style: { fontWeight: 700 } }),
      text({ lines: ['{s:Creador de contenido}'], cls: 't-body', size: 32, x: 640, y: 600, w: 380, t0: 30.6, t1: 35.1, by: 'all' }),
      text({ lines: ['Edición de reels', 'y videos de YouTube.', 'Social media', 'management.'], cls: 't-body', size: 38, x: 640, y: 720, w: 380, t0: 30.9, t1: 35.1, by: 'line', lineDelay: 0.15, stagger: 0 }),
      label({ text: 'Caso real · focuscreatives.net', x: 80, y: 1196, t0: 31, t1: 35.1 }),
    ] }),
    /* vuelve el espejo */
    F.three({ scene: 'mirror', t0: 35.0, t1: 41.2, fin: 0.9, blurIn: 16, opts: {
      camX: 0, lookX: 0, lookY: 0.1, camY: 0.9, colH: 2.0, camFrom: 8.0, camTo: 7.2, camDur: 6, split: () => 1, ring: () => 1, ringColor: 0xffffff,
      time: (k) => k + 20,
    } }),
    text({ lines: ['Para que tu negocio', 'no dependa de tu', 'próximo *video.*'], size: 96, x: 80, y: 300, w: 940, t0: 35.3, t1: 41.1, by: 'word', stagger: 0.06 }),
    end({ t0: 41.0, lines: ['Sos más que', 'tu *cara.*'], size: 112, y: 460, cta: 'Mandáselo a quien ya es más que su cara.', dest: 'focuscreatives.net', serie: 'Sin plantilla · 03 / 10' }),
  ],
  audio: {
    key: 5, bpm: 80,
    chords: [[0, 'sus2', 0], [3.5, 'min9', 0], [9, 'maj9', -4], [13, 'lyd', -4], [17, 'min9', 0], [21, 'maj9', -4], [25, 'sus4', 7], [29, 'maj9', -4], [35, 'lyd', 0], [41, 'maj9', 0]],
    energy: [[0, 0.3], [3.5, 0.3], [9, 0.45], [13, 0.55], [17, 0.6], [29, 0.7], [35, 0.85], [41, 0.4], [45, 0.3]],
    layers: { pulse: [[17, 35.1]], bass: [[17, 41]], arp: [[9, 17, 'bell'], [29, 35, 'bell']] },
    events: [[0.05, 'glass', 0.9], [1.7, 'tick', 1.1], [3.8, 'breath'], [9.4, 'swell', 1, 0.5], [11.0, 'low', 0.8], [11.4, 'glass', 0.8], [17.2, 'click', 1, 0.4], [21.2, 'click', 1, 0.6], [25.2, 'click', 1, 0.5], [29.0, 'shutter', 1, 0.5], [34.9, 'reverse', 0.8, 0.5, 1.2], [35.1, 'impact', 0.6], [42.5, 'glass', 1.0], [43.0, 'resolve']],
  },
});

/* A02 · TOFU · "Fuera de foco" · 45 s · Profundidad de campo.
   Tu marca vende más de lo que muestra. No se inventa: se enfoca.
   Recurso: la ventana de foco del design system (un círculo nítido,
   descentrado, sobre una imagen desaturada, fría y desenfocada). */
const { text, box, group, image, label, rule, end, eyebrow, glyph, gl, GLSL, p, io, out, lerp, clamp } = F;

/* Ventana de foco: la misma imagen dos veces. Abajo, tratada (gris, fría,
   desenfocada); arriba, nítida y en color, recortada por un círculo que
   recorre el cuadro. Un anillo fino y un filo RGB marcan el borde. */
const focusWindow = (o) => ({
  create(root) {
    const mk = (f) => { const d = F.el('div', 'abs', { left: 0, top: 0, width: '1080px', height: '1920px', overflow: 'hidden' }, root); const i = F.el('img', null, { width: '100%', height: '100%', objectFit: 'cover', objectPosition: o.pos || '50% 50%', filter: f }, d); i.src = o.src; F.wait(i.decode().catch(() => {})); return { d, i }; };
    this.bg = mk(`grayscale(1) sepia(.25) hue-rotate(180deg) brightness(${o.bright ?? 0.34}) contrast(1.2) blur(9px)`);
    this.fg = mk('none');
    this.ring = F.el('div', 'abs', { borderRadius: '50%', border: '1.5px solid rgba(246,246,244,.85)', boxShadow: '-3px 0 0 rgba(255,0,255,.55), 3px 0 0 rgba(0,255,51,.45)' }, root);
  },
  update(t) {
    const on = t >= o.t0 && t < o.t1;
    [this.bg.d, this.fg.d, this.ring].forEach((e) => (e.style.display = on ? 'block' : 'none'));
    if (!on) return;
    const { v } = F.env(t, o.t0, o.t1, o.fin ?? 1, o.fout ?? 0.6);
    const L = o.path(t);
    const z = o.zoom ? o.zoom(t) : 1;
    [this.bg.i, this.fg.i].forEach((i) => (i.style.transform = `scale(${z.toFixed(4)})`));
    this.bg.d.style.opacity = v;
    this.fg.d.style.opacity = v;
    this.fg.d.style.clipPath = `circle(${L.r.toFixed(1)}px at ${L.x.toFixed(1)}px ${L.y.toFixed(1)}px)`;
    this.fg.i.style.filter = `blur(${((L.soft ?? 0)).toFixed(2)}px)`;
    Object.assign(this.ring.style, { left: L.x - L.r + 'px', top: L.y - L.r + 'px', width: 2 * L.r + 'px', height: 2 * L.r + 'px', opacity: v * (L.ring ?? 1) });
  },
});

/* Rack focus entre dos planos de texto: el de adelante se desenfoca y el de
   atrás entra en foco (y al revés). */
const plane = (o) => text({ ...o, by: 'all', blur: 0, defocus: (t) => o.depth(t), fin: o.fin ?? 0.4 });

const lensPath = (t) => {
  // recorrido de la lente: busca (8,8-12), fija en las manos (12-17), recorre tres decisiones (17-29)
  const pts = [[8.6, 250, 1300, 120], [10.5, 760, 560, 150], [12.2, 640, 760, 240], [16.8, 640, 760, 240], [18.2, 700, 1080, 180], [21.5, 700, 1080, 180], [22.6, 380, 900, 170], [25.6, 380, 900, 170], [26.7, 760, 800, 200], [29.6, 760, 800, 200]];
  for (let i = 0; i < pts.length - 1; i++) {
    const [t0, x0, y0, r0] = pts[i], [t1, x1, y1, r1] = pts[i + 1];
    if (t <= t1) { const k = io(p(t, t0, t1)); return { x: lerp(x0, x1, k), y: lerp(y0, y1, k), r: lerp(r0, r1, k), soft: Math.sin(Math.PI * k) * 5 }; }
  }
  const l = pts[pts.length - 1];
  return { x: l[1], y: l[2], r: l[3] };
};

F.mount({
  name: F.vname('focus_ad02_fuera-de-foco'),
  dur: 45,
  edit: { punches: [12.3, 21.9, 26.1, 33.4] },
  cover: 13.6,
  meta: {
    id: 'A02', titulo: 'Fuera de foco', etapa: 'TOFU', fenomeno: 'Profundidad de campo (ventana de foco)',
    publico: 'P1 fundadoras y dueños de marcas que ya facturan (gastronomía, vinos, estética, moda, arquitectura, servicios)',
    objetivo: 'Alcance calificado: que la fundadora nombre su problema (la marca se ve más chica de lo que es) y asocie a FOCUS con la solución.',
    necesidad: 'Dolor: "vendemos más de lo que mostramos". Objeción: "me da miedo perder lo que ya funciona".',
    promesa: 'FOCUS no reemplaza la marca: la enfoca, trabajando tres decisiones (qué decís, cómo te ven, cómo sonás). Verificable: el propio sistema de FOCUS se muestra como ejemplo.',
    accion: 'Guardar el anuncio (señal de intención) y visitar el sitio.',
    servicio: 'Identidad de marca · estrategia',
    referencia: 'P4 Pentagram · Itaú: el caption y la pieza explican el porqué de cada decisión y eso convierte "rediseñaron el logo" en "hay un razonamiento detrás".',
    cta: 'Guardalo para cuando revises tu marca.', destino: 'Guardado en Instagram · secundario: focuscreatives.net',
    exito: 'Tasa de guardados por cada 1.000 reproducciones por encima del promedio de la cuenta; retención al 50 % (22 s).',
    variante: { cambia: 'Gancho (0-3,4 s): la afirmación "Tu marca vende más de lo que muestra." en un solo plano que entra en foco, en lugar de la pregunta en dos planos con rack focus.', guion: [['0,0-3,4', 'Un plano de texto sobre tinta; la segunda línea entra desde desenfoque', 'Tu marca vende más / de lo que *muestra.*', 'Rack focus de 26 px a 0', 'Corte en frío', 'Pad suspendido en Mi', 'Vidrio; tick', 'Gancho afirmativo']] },
    ab: 'Gancho: "Vendés como una marca grande. ¿Te ves como una?" contra "Tu marca vende más de lo que muestra." Hipótesis: la pregunta en segunda persona retiene más porque obliga a responder mentalmente en el primer segundo.',
    caption: `Hay marcas que facturan como grandes y se ven como chicas. No por falta de talento: porque crecieron a parches. Un logo de un lado, el sitio de otro, las redes de un tercero.

No hace falta empezar de cero. Hace falta enfocar tres decisiones:
· Qué decís: un posicionamiento que entra en una frase.
· Cómo te ven: un sistema, no un logo suelto.
· Cómo sonás: una voz que cualquiera de tu equipo puede escribir.

Una marca no se inventa. Se enfoca.

Guardalo para cuando revises la tuya.

#identidaddemarca #branding #estrategiademarca #focuscreatives #buenosaires`,
    assets: [
      ['Key visual "Mirar no alcanza"', 'public/assets/img-01.jpg (propio), recortado sin su texto', '—'],
      ['Póster de marca (trama)', 'public/assets/img-06.jpg (propio, mostrado como obra dentro de la ventana)', '—'],
      ['Tratamiento de ventana de foco', 'CSS del design system: grayscale + sepia + hue-rotate frío + blur, y círculo nítido', '—'],
      ['Planos de texto con rack focus', 'Tipografía Rotis en dos profundidades', '—'],
      ['Sistema propio (logo, pósters, sitio)', 'public/assets/img-01..03.jpg, focus-logo-light.png, capturas/hero', '—'],
      ['Glifos estrategia, identidad, voz', 'design-system/assets/glyphs/', '—'],
      ['Variante fotográfica del fondo', 'A producir', '"black and white high contrast photograph, hand touching a glass surface, shallow depth of field, cool tone, heavy film grain, museum interior out of focus, 35mm, no text"'],
    ],
  },
  guion: [
    ['0,0-3,4', 'Dos planos de texto: adelante, nítido; atrás, grande y desenfocado', 'Vendés como una marca grande. → ¿Te ves como *una?*', 'Rack focus a los 1,5 s: el primer plano se va, el fondo entra', 'Corte en frío', 'Pad suspendido en Mi', 'Tick de lente en el cambio de plano', 'Gancho en segunda persona: la pregunta que la fundadora ya se hizo'],
    ['3,4-8,6', 'Tinta con una línea fina de umbral; texto en dos tiempos', 'Entre lo que vendés y lo que mostrás / hay una distancia.', 'Palabra por palabra; la línea se dibuja', 'Desenfoque cruzado', 'Mi menor 9', 'Aire', 'Problema nombrado'],
    ['8,6-17,0', 'Key visual propio (manos), desaturado y desenfocado; una ventana de foco circular lo recorre y fija en el gesto de las manos', 'No te vamos a inventar una marca. / Vamos a enfocar la que ya tenés.', 'La lente busca, frena, fija; blur y cromática en el borde', 'Entrada desde desenfoque', 'Entra el pulso suave a 84 BPM', 'Tick al fijar', 'Promesa: continuidad, no reemplazo'],
    ['17,0-29,6', 'Sobre el póster de marca, la ventana salta a tres zonas; en cada una, un glifo óptico y una decisión', '01 · Qué decís: un posicionamiento en una frase. / 02 · Cómo te ven: un sistema, no un logo. / 03 · Cómo sonás: una voz que tu equipo puede escribir.', 'Saltos de lente al beat; glifos que entran en foco', 'Corte al beat', 'Do mayor 9 → La menor 9; arpegio', 'Clic por decisión', 'Criterio: el porqué, explicado (referencia Pentagram)'],
    ['29,6-37,2', 'El sistema propio de FOCUS: tres pósters y el sitio en el teléfono, enmarcados', 'La nuestra, por ejemplo.', 'Push-in lento; entradas escalonadas', 'Barrido de umbral', 'Campanas', 'Vidrio al revés antes de la imagen', 'Prueba: la marca del estudio como caso verificable'],
    ['37,2-41,0', 'Tinta; frase del sitio en placa cinética, a cuerpo gigante', 'Una marca / no se / inventa. / Se *enfoca.*', 'Un golpe cada 0,6 s; la última palabra entra en foco desde RGB', 'Corte al pulso', 'Mi lidio', 'Impacto suave', 'Giro: el credo del estudio'],
    ['41,0-45,0', 'Placa de cierre común', '¿Tu marca se ve / del tamaño que *tiene?* · Guardalo para cuando revises tu marca. · focuscreatives.net · Sin plantilla · 02/10', 'Entrada desde desenfoque', 'Veladura', 'Resolución en Mi mayor 9', 'Firma sonora de vidrio', 'Cierre TOFU: guardado'],
  ],
  items: [
    /* 0 · rack focus entre planos */
    ...(F.B ? [
      /* variante B: la afirmación directa, que entra en foco */
      text({ lines: ['Tu marca vende más'], size: 100, x: 80, y: 300, w: 940, t0: 0.1, t1: 3.5, by: 'word', stagger: 0.07, fin: 0.6 }),
      text({ lines: ['de lo que', '*muestra.*'], size: 150, x: 80, y: 920, w: 940, t0: 0.8, t1: 3.5, by: 'all', blur: 26, fin: 1.1 }),
      label({ text: 'f/1.4 · plano 1', x: 80, y: 460, t0: 0.4, t1: 3.4 }),
    ] : [
      plane({ lines: ['¿Te ves', 'como *una?*'], size: 190, x: 80, y: 700, w: 960, t0: 0, t1: 3.5, color: 'w',
        depth: (t) => lerp(18, 0, io(p(t, 1.35, 2.1))), dim: (t) => lerp(0.45, 1, io(p(t, 1.35, 2.1))) }),
      plane({ lines: ['Vendés como', 'una marca grande.'], size: 88, x: 80, y: 300, w: 940, t0: 0, t1: 3.5, fin: 0.25,
        depth: (t) => lerp(0, 14, io(p(t, 1.35, 2.1))), dim: (t) => lerp(1, 0.4, io(p(t, 1.35, 2.1))) }),
      label({ text: 'f/1.4 · plano 1 → plano 2', x: 80, y: 1200, t0: 0.4, t1: 3.4 }),
    ]),
    /* 3,4 · la distancia */
    text({ lines: ['Entre lo que vendés', 'y lo que mostrás'], size: 96, x: 80, y: 330, w: 940, t0: 3.6, t1: 8.6, by: 'word', stagger: 0.07 }),
    box({ x: 80, y: 700, w: 920, h: 1, t0: 5.0, t1: 8.6, blur: false, style: { background: 'linear-gradient(90deg, #ff00ff, #f6f6f4 50%, #00ff33)' }, anim: (t, e) => { e.style.transform = `scaleX(${out(p(t, 5, 6.2))})`; e.style.transformOrigin = 'left'; } }),
    text({ lines: ['hay una *distancia.*'], size: 96, x: 80, y: 760, w: 940, t0: 5.7, t1: 8.6, by: 'word', stagger: 0.09 }),
    /* 8,6 · la ventana de foco */
    focusWindow({ src: '/public/assets/img-01.jpg', pos: '50% 100%', t0: 8.4, t1: 17.2, path: lensPath, zoom: (t) => lerp(1.5, 1.38, p(t, 8.4, 17.2)) }),
    text({ lines: ['No te vamos a inventar', 'una marca.'], size: 84, x: 80, y: 300, w: 940, t0: 9.0, t1: 12.0, by: 'word', stagger: 0.07 }),
    text({ lines: ['Vamos a enfocar', 'la que ya *tenés.*'], size: 96, x: 80, y: 1020, w: 940, t0: 12.3, t1: 17.0, by: 'word', stagger: 0.08 }),
    /* 17 · tres decisiones (la ventana sigue sobre otra imagen) */
    focusWindow({ src: '/public/assets/img-06.jpg', pos: '75% 0%', bright: 0.2, t0: 16.9, t1: 29.8, path: lensPath, zoom: (t) => lerp(1.6, 1.75, p(t, 16.9, 29.8)) }),
    box({ x: 0, y: 0, w: 1080, h: 1920, t0: 16.9, t1: 29.8, blur: false, style: { background: 'linear-gradient(180deg, rgba(10,10,11,.2), rgba(10,10,11,.0) 40%, rgba(10,10,11,.2) 62%, rgba(10,10,11,.95) 78%)' } }),
    ...[
      [17.4, 21.6, 'estrategia', '01 · Qué decís', 'Un posicionamiento', 'que entra en una *frase.*', 290],
      [21.9, 25.8, 'identidad', '02 · Cómo te ven', 'Un sistema,', 'no un logo *suelto.*', 290],
      [26.1, 29.7, 'voz', '03 · Cómo sonás', 'Una voz que tu equipo', 'puede *escribir.*', 290],
    ].flatMap(([a, b, g, eb, l1, l2, y]) => [
      glyph({ name: g, x: 80, y, size: 84, t0: a, t1: b, color: 'var(--paper)' }),
      text({ lines: [eb], cls: 't-eyebrow', size: 28, x: 186, y: y + 26, w: 700, t0: a + 0.1, t1: b, by: 'all', style: { color: 'var(--g100)' } }),
      text({ lines: [l1, l2], size: 84, x: 80, y: y + 120, w: 940, t0: a + 0.3, t1: b, by: 'word', stagger: 0.06, style: { textShadow: '0 0 30px rgba(10,10,11,.8)' } }),
    ]),
    /* 29,6 · la nuestra */
    group({ t0: 29.6, t1: 37.3, clip: 'sweepX', clipIn: [29.6, 30.5], children: [
      box({ x: 0, y: 0, w: 1080, h: 1920, t0: 29.6, t1: 37.3, fin: 0.01, blur: false, style: { background: 'var(--ink)' } }),
      image({ src: '/public/assets/img-01.jpg', x: 80, y: 520, w: 290, h: 410, t0: 30.2, t1: 37.3, frame: true, zoom: [1.06, 1] }),
      image({ src: '/public/assets/img-02.jpg', x: 395, y: 520, w: 290, h: 410, t0: 30.5, t1: 37.3, frame: true, zoom: [1.06, 1] }),
      image({ src: '/public/assets/img-03.jpg', x: 710, y: 520, w: 290, h: 410, t0: 30.8, t1: 37.3, frame: true, zoom: [1.06, 1] }),
      F.seq({ dir: '/instagram/campana-ads-01/produccion/capturas/hero', count: 120, x: 80, y: 960, w: 440, h: 270, t0: 31.3, t1: 37.3, frame: true, pos: '50% 30%' }),
      F.logo({ t0: 31.8, t1: 37.3, w: 330, x: 600, y: 1030 }),
      text({ lines: ['La nuestra,', 'por *ejemplo.*'], size: 104, x: 80, y: 290, w: 940, t0: 30.0, t1: 37.2, by: 'word', stagger: 0.08 }),
      label({ text: 'Identidad FOCUS · sistema propio', x: 600, w: 400, y: 1190, t0: 31.5, t1: 37.2 }),
    ] }),
    /* 37,2 · el credo */
    F.slam({ t0: 37.3, t1: 41.05, step: 0.6, words: ['Una marca', 'no se', 'inventa.', 'Se *enfoca.*'], light: { c: [0.7, 0.66], r: 0.1, amt: 0.5 } }),
    /* 41 · cierre */
    end({ t0: 41.0, lines: ['¿Tu marca se ve', 'del tamaño que *tiene?*'], size: 92, y: 480, cta: 'Guardalo para cuando revises tu marca.', dest: 'focuscreatives.net', serie: 'Sin plantilla · 02 / 10' }),
  ],
  audio: {
    key: 7, bpm: 84,
    chords: [[0, 'sus2', 0], [3.4, 'min9', 0], [8.6, 'min9', 0], [12.3, 'maj9', -4], [17, 'maj9', -4], [21.9, 'min9', 5], [26.1, 'sus4', 7], [29.6, 'maj9', -4], [37.2, 'lyd', 0], [41, 'maj9', 0]],
    energy: [[0, 0.35], [3.4, 0.25], [8.6, 0.35], [17, 0.6], [29.6, 0.7], [37.2, 0.8], [41, 0.4], [45, 0.3]],
    layers: { pulse: [[8.6, 37.2]], hats: [[17, 37.2]], bass: [[12.3, 37.2]], arp: [[17, 29.6, 'down'], [29.6, 37.2, 'bell']] },
    events: [[0.05, 'glass', 0.7], [0.1, 'low', 0.6], [1.5, 'tick', 1.2], [3.6, 'breath'], [5.0, 'swell', 1, 0.5], [8.4, 'reverse', 0.7, 0.5, 1.2], [12.2, 'tick', 1.1], [17.4, 'click', 1, 0.4], [21.9, 'click', 1, 0.6], [26.1, 'click', 1, 0.5], [29.6, 'riser', 0.7, 0.5, 1.8], [29.6, 'impact', 0.6], [37.3, 'impact', 0.8], [38.6, 'tick', 1.2], [42.5, 'glass', 1.0], [43.0, 'resolve']],
  },
});

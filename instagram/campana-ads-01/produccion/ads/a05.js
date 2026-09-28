/* A05 · MOFU · "Una decisión" · 45 s · Densidad.
   Una decisión bien tomada aparece en todos lados. El caso es la propia
   identidad de FOCUS: la C abierta del wordmark se vuelve logo, póster,
   sitio, presentación y perfil. Cuanto más te acercás, más hay. */
const { text, box, group, image, label, rule, end, eyebrow, glyph, gl, GLSL, p, io, out, inE, lerp, clamp } = F;
const G = GLSL;
const LOGO = '/instagram/campana-ads-01/produccion/assets/focus-logo-light@8x.png';
const A = '/instagram/campana-ads-01/produccion/assets/';
const CX = 540, CY = 880; // centro óptico: la C

/* El wordmark en macro: la C ocupa el cuadro y el plano se abre hasta
   mostrar la palabra entera. Escala por curva exponencial (zoom natural). */
const macro = () => ({
  create(root) {
    this.d = F.el('div', 'abs', { left: 0, top: 0, width: '3656px', height: '1280px', transformOrigin: '0 0' }, root);
    this.i = F.el('img', null, { width: '100%', height: '100%' }, this.d);
    this.i.src = LOGO; F.wait(this.i.decode().catch(() => {}));
  },
  update(t) {
    const on = t < 9.6;
    this.d.style.display = on ? 'block' : 'none';
    if (!on) return;
    const k = io(p(t, 2.6, 7.2));
    // A: del macro de la C al logo completo. B: al revés, del logo a la C.
    const s = F.B ? Math.exp(lerp(Math.log(0.25), Math.log(0.82), k)) : Math.exp(lerp(Math.log(0.82), Math.log(0.25), k));
    const ox = 1835, oy = 637; // la C en el archivo a 8x
    this.d.style.transform = `translate(${(CX - ox * s).toFixed(2)}px, ${(CY - oy * s).toFixed(2)}px) scale(${s.toFixed(5)})`;
    const bl = lerp(26, 0, out(p(t, 0.1, 1.6))) + (t > 8.4 ? (t - 8.4) * 12 : 0);
    this.d.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none';
    this.d.style.opacity = out(p(t, 0, 0.6)) * (1 - p(t, 8.8, 9.6));
  },
});

/* Aplicaciones reales, cada una entra en foco cuando la alcanza un anillo. */
const APPS = [
  [9.8, 'El logo.', 'Isologotipo', { logo: true }],
  [13.1, 'El póster.', 'Key visual · campaña', { src: '/public/assets/img-03.jpg', w: 520, h: 736, pos: '50% 50%' }],
  [16.4, 'El sitio.', 'focuscreatives.net · teléfono', { seq: 'prisma', w: 460, h: 818 }],
  [19.7, 'La presentación.', 'Deck · portada y separadores', { src: A + 'ds-deck-portada.jpg', w: 900, h: 506 }],
  [23.0, 'El perfil profesional.', 'LinkedIn · portada', { src: A + 'ds-linkedin-freelance-es-full.png', w: 720, h: 720 }],
  [26.3, 'La campaña.', 'Key visual · manos', { src: '/public/assets/img-02.jpg', w: 520, h: 736, pos: '50% 50%' }],
];
const appItems = APPS.flatMap(([t0, line, rot, o], i) => {
  const t1 = t0 + 3.3;
  const x = CX - (o.w || 0) / 2, y = CY - (o.h || 0) / 2;
  const kids = [];
  if (o.logo) kids.push(F.logo({ t0: t0 + 0.1, t1, w: 620, x: CX - 310, y: CY - 110, fin: 0.9 }));
  else if (o.seq) kids.push(F.seq({ dir: '/instagram/campana-ads-01/produccion/capturas/' + o.seq, count: 210, x, y, w: o.w, h: o.h, t0, t1, frame: true, rate: 1.6, zoom: [1.03, 1] }));
  else kids.push(image({ src: o.src, x, y, w: o.w, h: o.h, t0, t1, frame: true, pos: o.pos, zoom: [1.08, 1], blur: 20, fin: 1.0 }));
  kids.push(text({ lines: [line], size: 88, x: 80, y: 290, w: 940, t0: t0 + 0.15, t1, by: 'word', stagger: 0.07 }));
  kids.push(label({ text: `${String(i + 1).padStart(2, '0')} / 06 · ${rot}`, x: 80, y: 404, w: 900, t0: t0 + 0.3, t1 }));
  return [group({ t0, t1, fin: 0.01, fout: 0.45, outBlur: 14, children: kids })];
});

F.mount({
  name: F.vname('focus_ad05_una-decision'),
  dur: 45,
  edit: { punches: [6.1, 12.9, 16.2, 19.5, 22.8, 26.1, 33.3] },
  cover: 7.0,
  meta: {
    id: 'A05', titulo: 'Una decisión', etapa: 'MOFU', fenomeno: 'Densidad',
    publico: 'P1 fundadoras evaluando un rebrand; P3 responsables de marca que comparan estudios',
    objetivo: 'Consideración: mostrar qué significa "sistema" con un caso verificable (la identidad de FOCUS) y llevar tráfico al sitio.',
    necesidad: 'Objeción: "¿por qué pagar un sistema si solo necesito un logo?" y "¿cómo sé que lo que diseñan se sostiene en todas las piezas?"',
    promesa: 'Una decisión de identidad bien tomada se replica en todas las piezas. Verificable: todas las aplicaciones que se ven son de FOCUS (sitio, pósters, deck y perfil del design system).',
    accion: 'Visitar focuscreatives.net para ver el sistema aplicado.',
    servicio: 'Sistema de identidad · editorial · web · dirección de arte',
    referencia: 'P2 Studio Dumbar/OpenAI: la identidad presentada por partes, en secuencia, con sonido sincronizado a cada elemento. P3 Koto OFF Brand: darle vocabulario al comprador ("sistema", "densidad").',
    cta: 'Mirá el sistema completo en focuscreatives.net', destino: 'focuscreatives.net (sección Servicios y Trabajo)',
    exito: 'Clics al enlace por cada 1.000 impresiones y tiempo en el sitio de quienes llegan desde el anuncio; retención al 75 %.',
    variante: { cambia: 'Apertura (0-7,2 s): el logo completo con la pregunta "¿Qué es un sistema de identidad?" y después un zoom hacia la C, en lugar del macro abstracto que se abre al logo.', guion: [['0,0-2,6', 'Logo completo, entra en foco', '¿Qué es un sistema / de *identidad?*', 'Rack focus', 'Entrada desde desenfoque', 'La mayor 9', 'Tick', 'Gancho explícito'], ['2,6-9,6', 'Zoom exponencial hacia la C abierta; nacen los anillos', 'Un anillo abierto / en lugar de una *C.*', 'Zoom de 0,25x a 0,82x', 'Continuo', 'Arpegio', 'Aire', 'Revelación del detalle']] },
    ab: 'Apertura en macro de la C (abstracta) contra apertura con el logo completo y la pregunta "¿Qué es un sistema de identidad?". Hipótesis: el macro abstracto sostiene más la curiosidad en MOFU porque el público ya conoce la marca por TOFU.',
    caption: `Una identidad no es un logo. Es una decisión que se repite con criterio en todas partes.

La nuestra empieza en un detalle: una C abierta, como un anillo de lente que deja pasar la luz. Esa sola decisión se vuelve el logo, la retícula y los anillos de todas nuestras piezas, los pósters de campaña, el prisma del sitio, la presentación y el perfil profesional.

Cuando un sistema está bien hecho, cuanto más te acercás, más hay. Y cualquiera de tu equipo puede aplicarlo sin romperlo.

Mirá el sistema completo en focuscreatives.net

#identidadvisual #sistemadeidentidad #branding #focuscreatives #diseñoargentino`,
    assets: [
      ['Wordmark en alta', 'assets/focus-logo-light@8x.png: derivado del archivo oficial (reescalado del alfa con umbral suave, sin redibujar)', '—'],
      ['Anillos en zoom infinito', 'Shader glsl.density centrado en la C', '"infinite zoom into concentric thin white rings, black background, dotted rings, one ring glowing blue, macro lens, fine grain, no text"'],
      ['Aplicaciones reales', 'img-02, img-03 (key visuals), capturas/prisma (sitio), assets/ds-deck-portada.jpg y ds-linkedin-freelance-es-full.png (design system)', '—'],
    ],
  },
  guion: [
    ['0,0-2,6', 'Macro de la C abierta del wordmark, desenfocada; entra en foco', 'Esto es una *decisión.*', 'Rack focus de 26 px a 0', 'Entrada desde desenfoque', 'La mayor 9, pad solo', 'Tick de lente', 'Gancho abstracto: ¿qué es esto?'],
    ['2,6-9,6', 'El plano se abre (zoom exponencial) y aparece la palabra FOCUS entera; nacen anillos desde la C', 'Un anillo abierto / en lugar de una C.', 'Zoom de 2,2x a 0,25x en 4,6 s', 'Continuo', 'Arpegio que suma una voz', 'Aire hacia el corte', 'Revelación del detalle'],
    ['9,6-29,6', 'Zoom infinito en anillos; cada 3,3 s una aplicación real entra en foco al centro, enmarcada: logo, póster, sitio, presentación, perfil, campaña', 'El logo. / El póster. / El sitio. / La presentación. / El perfil profesional. / La campaña.', 'Anillos que avanzan una octava por aplicación', 'Desenfoque de salida y entrada al beat', 'Pulso a 92 BPM, bajo, hats', 'Clic por aplicación; un anillo se ilumina en azul', 'Prueba: el sistema aplicado, verificable'],
    ['29,6-37,0', 'Los anillos se detienen; en el centro, la C pequeña y nítida', 'Eso es un sistema: / cuanto más te acercás, / más *hay.*', 'Desaceleración del zoom a 0', 'Rack focus', 'Do lidio', 'Vidrio', 'Vocabulario de criterio (densidad, del manual)'],
    ['37,0-41,0', 'Tinta; frase de cierre en placa cinética, a cuerpo gigante', 'Una decisión / bien tomada / aparece / en todos / *lados.*', 'Un golpe cada 0,5 s; la última palabra se recompone desde RGB', 'Corte al pulso', 'La mayor 9', 'Impacto suave', 'Idea para recordar'],
    ['41,0-45,0', 'Placa de cierre común', 'Una decisión. / Todos los *lugares.* · Mirá el sistema completo en focuscreatives.net · Sin plantilla · 05/10', 'Entrada desde desenfoque', 'Veladura', 'Resolución', 'Firma sonora de vidrio', 'Cierre MOFU: tráfico'],
  ],
  items: [
    gl({ frag: G.density, t0: 2.8, t1: 41.2, fin: 2.0, u: (t) => {
      // el zoom avanza rápido durante las aplicaciones y frena al final
      const z = t < 9.6 ? p(t, 2.8, 9.6) * 0.8 : t < 29.6 ? 0.8 + (t - 9.6) * 0.3 : 6.8 + 0.9 * out(p(t, 29.6, 33));
      return { uZoom: z, uAmt: t < 29.6 ? 0.85 : lerp(0.85, 0.45, p(t, 29.6, 33)), uAccent: 0.9, uC: [CX / 1080, 1 - CY / 1920] };
    } }),
    macro(),
    F.B ? text({ lines: ['¿Qué es un sistema', 'de *identidad?*'], size: 92, x: 80, y: 300, w: 940, t0: 0.2, t1: 2.9, by: 'word', stagger: 0.07 })
        : text({ lines: ['Esto es una *decisión.*'], size: 92, x: 80, y: 300, w: 940, t0: 0.3, t1: 2.9, by: 'word', stagger: 0.08 }),
    text({ lines: ['Un anillo abierto', 'en lugar de una *C.*'], size: 92, x: 80, y: 300, w: 940, t0: 3.2, t1: 9.4, by: 'word', stagger: 0.07 }),
    label({ text: 'Densidad · 05 / 10', x: 80, y: 520, t0: 4, t1: 9.4 }),
    box({ x: 0, y: 0, w: 1080, h: 1920, t0: 9.6, t1: 29.6, blur: false, style: { background: 'radial-gradient(circle 560px at 540px 880px, rgba(10,10,11,.75) 0%, rgba(10,10,11,.35) 60%, rgba(10,10,11,0) 100%)' } }),
    ...appItems,
    /* la C chica, nítida, en el centro */
    { create(root) { this.d = F.el('div', 'abs', { width: '140px', height: '160px', left: CX - 70 + 'px', top: CY - 80 + 'px', overflow: 'hidden' }, root); const i = F.el('img', null, { position: 'absolute', width: 3656 * 0.2 + 'px', left: -(1835 * 0.2 - 70) + 'px', top: -(637 * 0.2 - 80) + 'px' }, this.d); i.src = LOGO; F.wait(i.decode().catch(() => {})); },
      update(t) { const { a, v } = F.env(t, 29.8, 37.1, 1.2, 0.5); this.d.style.display = v > 0.001 ? 'block' : 'none'; this.d.style.opacity = v; this.d.style.filter = `blur(${((1 - a) * 18).toFixed(2)}px)`; } },
    text({ lines: ['Eso es un sistema:'], size: 76, x: 80, y: 290, w: 940, t0: 30.0, t1: 36.9, by: 'word', stagger: 0.07 }),
    text({ lines: ['cuanto más te acercás,', 'más *hay.*'], size: 96, x: 80, y: 1030, w: 940, t0: 31.4, t1: 36.9, by: 'word', stagger: 0.08 }),
    F.slam({ t0: 37.2, t1: 41.05, step: 0.5, words: ['Una decisión', 'bien tomada', 'aparece', 'en todos', '*lados.*'], light: { c: [0.5, 0.58], r: 0.08, amt: 0.45 } }),
    end({ t0: 41.0, lines: ['Una decisión.', 'Todos los *lugares.*'], size: 100, y: 470, cta: 'Mirá el sistema completo.', dest: 'focuscreatives.net', serie: 'Sin plantilla · 05 / 10' }),
  ],
  audio: {
    key: 0, bpm: 92,
    chords: [[0, 'maj9', 0], [2.6, 'add9', 0], [9.6, 'maj9', 0], [13.1, 'min9', -3], [16.4, 'lyd', 5], [19.7, 'maj9', 0], [23, 'min9', -3], [26.3, 'sus4', 7], [29.6, 'lyd', 3], [37, 'maj9', 0], [41, 'maj9', 0]],
    energy: [[0, 0.3], [2.6, 0.45], [9.6, 0.65], [20, 0.8], [29.6, 0.5], [37, 0.7], [41, 0.4], [45, 0.3]],
    layers: { pulse: [[9.8, 29.6]], hats: [[13.1, 29.6, 16]], bass: [[9.8, 29.6]], arp: [[2.6, 9.6, 'up'], [9.6, 29.6, 'up'], [29.6, 37, 'bell']] },
    events: [[0.3, 'tick', 1.1], [0.05, 'glass', 0.6], [7.4, 'riser', 0.8, 0.5, 2.2], [9.6, 'impact', 0.7], [9.8, 'click'], [13.1, 'click', 1, 0.3], [16.4, 'click', 1, 0.7], [19.7, 'click', 1, 0.4], [23.0, 'click', 1, 0.6], [26.3, 'click', 1, 0.5], [29.6, 'low', 0.8], [30.0, 'glass', 0.8], [37.1, 'impact', 0.6], [42.5, 'glass', 1.0], [43.0, 'resolve']],
  },
});

/* A10 · BOFU · "Próximo caso" · 45 s · Dispersión y recomposición.
   Cierre de la serie. Siete disciplinas entran como siete bandas, un solo
   haz blanco sale. Después, los nueve trabajos reales del sitio (WORKS) en
   una galería con foco selectivo, y el cuadro vacío: tu marca, próximo caso. */
const { text, box, group, image, label, rule, end, eyebrow, glyph, gl, GLSL, p, io, out, lerp, clamp } = F;
const C = (id) => `/public/assets/clients/${id}-card.jpg`;
const SPECTRUM = ['#ff00ff', '#c010ff', '#8020ff', '#5b8cff', '#0080dd', '#00c088', '#00ff33'];
const DISC = ['Identidad de marca', 'Dirección de arte', 'Social media', 'Audiovisual', 'Estrategia', 'Páginas web', 'Editorial y packaging'];

/* Los trabajos de WORKS (src/lib/content.ts), en el orden del sitio, con
   sus servicios tal como figuran ahí. */
const WORKS = [
  ['ader-studio', 'Ader Studio', 'Arquitectura', 'Página web'],
  ['oushy', 'OUSHY Studio', 'Estudio creativo', 'Página web'],
  ['toplaser-web', 'Top Láser', 'Imprenta', 'Página web'],
  ['chillin', '@chillin1390bar', 'Bar', 'Social media'],
  ['santa-tuca', '@santatuca', 'Creador de contenido', 'Audiovisual · social media'],
  ['toplaser', 'Top Láser', 'Imprenta', 'Identidad · social media · audiovisual'],
  ['chuchones', '@chuchones_wines', 'Vinos boutique', 'Social media'],
  ['rsh-consultora', '@rsh_consultora', 'Seguridad e higiene', 'Social media'],
  ['fernanda-estetica', '@esteticaintegralfernanda', 'Estética y salud', 'Social media'],
];
/* Variante B: portfolio corto, tres trabajos con más tiempo cada uno (Top
   Láser reúne sus dos entradas de WORKS: web, e identidad, redes y video). */
const SHOWN = F.B ? [
  ['toplaser', 'Top Láser', 'Imprenta', 'Identidad · social media · audiovisual · web'],
  ['santa-tuca', '@santatuca', 'Creador de contenido', 'Edición de reels y YouTube · social media'],
  ['ader-studio', 'Ader Studio', 'Arquitectura', 'Página web'],
] : WORKS;
const G0 = 10.4, GS = F.B ? 18.5 / 3 : 2.05; // la galería avanza un caso cada GS segundos
const N = SHOWN.length; // + 1 cuadro vacío

/* Galería con foco selectivo (el mismo gesto que la sección Trabajo del
   sitio): el caso del centro está nítido, en color y a tamaño completo;
   los vecinos se desenfocan, se agrisan y se achican con la distancia. */
const gallery = () => ({
  create(root) {
    this.wrap = F.el('div', 'abs', { left: 0, top: 0, width: '1080px', height: '1920px' }, root);
    this.cards = [...SHOWN, null].map((w, i) => {
      const d = F.el('div', 'abs', { width: '500px', height: '625px', left: '290px', top: '400px', transformOrigin: '50% 50%' }, this.wrap);
      if (w) {
        d.style.outline = '1px solid rgba(167,172,180,.35)';
        const img = F.el('img', null, { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }, d);
        img.src = C(w[0]); F.wait(img.decode().catch(() => {}));
      } else {
        d.style.outline = '1px solid rgba(246,246,244,.55)';
        d.innerHTML = '<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:18px">' +
          '<div class="t-eyebrow" style="font-size:26px;color:#a7acb4">Próximo caso</div><div style="font-weight:300;font-size:88px;letter-spacing:-.03em">Tu marca</div></div>' +
          ['0 0', '100% 0', '0 100%', '100% 100%'].map((pos) => `<div style="position:absolute;width:34px;height:34px;left:calc(${pos.split(' ')[0]} - 17px);top:calc(${pos.split(' ')[1]} - 17px);border-left:${pos.startsWith('0') ? 2 : 0}px solid #f6f6f4;border-right:${pos.startsWith('100') ? 2 : 0}px solid #f6f6f4;border-top:${pos.endsWith(' 0') ? 2 : 0}px solid #f6f6f4;border-bottom:${pos.endsWith('100%') ? 2 : 0}px solid #f6f6f4"></div>`).join('');
      }
      return d;
    });
    this.meta = F.el('div', 'abs', { left: '80px', top: '1070px', width: '920px' }, this.wrap);
    this.last = -1;
  },
  update(t) {
    const on = t >= G0 - 0.6 && t < 36.4;
    this.wrap.style.display = on ? 'block' : 'none';
    if (!on) return;
    const pos = clamp((t - G0) / GS, 0, N); // posición continua de la galería
    // la galería se asienta en cada caso: pausa y deslizamiento suave
    const base = Math.floor(pos), fr = pos - base;
    const eased = base + io(clamp((fr - 0.45) / 0.55, 0, 1));
    const vIn = out(p(t, G0 - 0.6, G0 + 0.4)), vOut = 1 - io(p(t, 35.4, 36.4));
    this.wrap.style.opacity = vIn * vOut;
    this.cards.forEach((d, i) => {
      const dx = i - eased;
      const ad = Math.abs(dx);
      const s = 1 - Math.min(ad, 2) * 0.22;
      const x = 540 + dx * 440;
      d.style.transform = `translateX(${(x - 540).toFixed(1)}px) scale(${s.toFixed(3)}) perspective(1600px) rotateY(${(-dx * 14).toFixed(2)}deg)`;
      d.style.filter = ad < 0.02 ? 'none' : `blur(${(ad * 9).toFixed(2)}px) grayscale(${Math.min(1, ad)}) brightness(${(1 - Math.min(ad, 1.5) * 0.4).toFixed(2)})`;
      d.style.opacity = ad > 2.2 ? 0 : 1;
      d.style.zIndex = String(100 - Math.round(ad * 10));
    });
    const cur = Math.round(eased);
    if (cur !== this.last) {
      this.last = cur;
      const w = SHOWN[cur];
      this.meta.innerHTML = w ? `<div class="t-eyebrow" style="font-size:24px;color:#a7acb4">${w[2]} · ${String(cur + 1).padStart(2, '0')} / ${String(N).padStart(2, '0')}</div>
        <div style="font-weight:700;font-size:52px;letter-spacing:-.01em;margin-top:10px">${w[1]}</div>
        <div style="font-weight:300;font-size:38px;color:#e7e9ec;margin-top:6px">${w[3]}</div>` : '';
    }
    const k = Math.abs(eased - Math.round(eased));
    this.meta.style.opacity = String(1 - Math.min(1, k * 6));
    this.meta.style.filter = `blur(${(k * 40).toFixed(1)}px)`;
  },
});

/* Cifra que cuenta desde cero hasta su valor mientras entra en foco. */
const counter = (n, o) => {
  const it = text({ ...o, lines: ['0'] });
  return {
    create(root) { it.create(root); this.s = it.box.querySelector('.w'); },
    update(t) { it.update(t); this.s.textContent = String(Math.round(out(p(t, o.t0, o.t0 + 0.7)) * n)); },
  };
};

F.mount({
  name: F.vname('focus_ad10_proximo-caso'),
  dur: 45,
  edit: { punches: [7.0, 32.6] },
  cover: 8.6,
  meta: {
    id: 'A10', titulo: 'Próximo caso', etapa: 'BOFU', fenomeno: 'Dispersión y recomposición',
    publico: 'Retargeting de las tres personas: quienes vieron el 75 % de un MOFU, visitantes del sitio y quienes interactuaron por DM',
    objetivo: 'Conversión: consolidar la confianza con el portfolio real y pedir el brief (reunión o mensaje).',
    necesidad: 'Última objeción: "¿con quién trabajaron?" y "¿lo mío entra en lo que hacen?".',
    promesa: 'Siete disciplinas con un solo criterio, y una línea nueva de software. Verificable: los nueve trabajos, sus rubros y servicios son los de focuscreatives.net; las cifras (8 marcas, 9 trabajos, 7 disciplinas) salen del sitio.',
    accion: 'Contar qué quieren construir: agendar 30 minutos o escribir.',
    servicio: 'Todo el estudio',
    referencia: 'P6 Koto Reel 2026: credenciales con cifras verificables para quien ya compara estudios; la galería reproduce el gesto de la sección Trabajo del sitio (foco selectivo).',
    cta: 'Agendá 30 minutos o escribinos.', destino: 'focuscreatives.net (sección Contacto: mail, WhatsApp y Calendly)',
    exito: 'Clientes potenciales (reuniones + conversaciones) por cada 1.000 impresiones de retargeting; costo por reunión agendada.',
    variante: { cambia: 'Galería (10,4-28,9 s): tres trabajos a 6 s cada uno (Top Láser, @santatuca, Ader Studio) en lugar de los nueve a 2 s.', guion: [['10,4-28,9', 'Galería con foco selectivo: Top Láser (identidad, redes, audiovisual y web), @santatuca (edición y redes), Ader Studio (web); 6 s cada uno', 'Rubro · 0N / 03 · cliente · servicios', 'Deslizamiento suave con pausa larga', 'Foco selectivo', 'Pulso a 92 BPM', 'Clic por caso', 'Prueba: profundidad en vez de amplitud']] },
    ab: 'Portfolio completo (9 trabajos a 2 s cada uno) contra portfolio corto (3 trabajos a 5 s, con el porqué de cada uno). Hipótesis: el completo transmite amplitud y convierte mejor en retargeting frío; el corto, en quienes ya visitaron el sitio.',
    caption: `Siete disciplinas, un solo criterio: que la pieza no se pueda confundir con la de nadie más.

Arquitectura, estudios creativos, imprenta, bares, vinos, estética, consultoría y creadores de contenido. Nueve trabajos de rubros que no se parecen en nada, hechos con la misma mano. Y ahora, también, software a medida.

El próximo cuadro está vacío a propósito.

Contanos qué querés construir: agendá 30 minutos o escribinos a info@focus-creatives.com.

#portfolio #identidaddemarca #diseñoweb #focuscreatives #buenosaires`,
    assets: [
      ['Prisma de vidrio en recomposición', 'Escena 3D engine/scenes/prism.js, modo merge, luz vertical', '"vertical composition, seven beams of colored light (magenta to violet to blue to green) falling from above into a clear glass prism and exiting below as one single white beam, black studio, volumetric light, 3d render, no text"'],
      ['Tarjetas de casos', 'public/assets/clients/*-card.jpg (los nueve de WORKS). Confirmar permiso para pauta.', '—'],
      ['Cuadro vacío "Tu marca · Próximo caso"', 'DOM con marcas de corte (el cierre de la galería del sitio)', '—'],
    ],
  },
  guion: [
    ['0,0-3,2', 'Siete bandas de luz caen desde arriba hacia un prisma de vidrio (3D, vertical); lista de disciplinas que se enciende en el color de cada banda', 'Siete *disciplinas.*', 'Las bandas avanzan escalonadas', 'Entrada desde negro', 'Re suspendido', 'Vidrio; tick', 'Gancho: el espectro completo'],
    ['3,2-10,4', 'El prisma recompone: sale un solo haz blanco hacia abajo', 'Un solo haz. / Que la pieza no se pueda confundir / con la de nadie *más.*', 'Haz blanco con bloom', 'Continuo', 'Re menor 9 → Si bemol mayor 9', 'Subida; grave cuando sale el haz', 'Idea: criterio único (frase del sitio)'],
    ['10,4-28,9', 'Galería con foco selectivo: nueve trabajos reales, uno cada 2 s; el del centro nítido y en color, los vecinos desenfocados; rubro, cliente y servicios debajo', 'Rubro · 0N / 09 · cliente · servicios', 'Deslizamiento suave con pausa en cada caso', 'Foco selectivo', 'Pulso a 92 BPM, hats, arpegio', 'Clic por caso', 'Prueba: portfolio verificable'],
    ['28,9-36,4', 'El cuadro vacío con marcas de corte ("Próximo caso · Tu marca") entra al centro', 'El próximo cuadro está vacío / a *propósito.*', 'Asentamiento', 'Foco selectivo', 'Re lidio', 'Vidrio al revés', 'Proyección: el lugar del cliente'],
    ['36,4-41,0', 'Tinta; cifras del sitio, una por línea', '8 marcas · 9 trabajos · 7 disciplinas · 1 línea nueva: software', 'Rótulos que entran al beat', 'Corte al beat', 'Re mayor 9', 'Clic por cifra', 'Credenciales verificables'],
    ['41,0-45,0', 'Placa de cierre común, con el logo recompuesto desde RGB', 'Contanos qué / querés *construir.* · Agendá 30 minutos o escribinos. · focuscreatives.net · Sin plantilla · 10/10', 'Recomposición RGB del logo', 'Veladura', 'Re mayor 9 resuelto', 'Firma sonora de vidrio', 'Cierre BOFU y de la serie'],
  ],
  items: [
    F.three({ scene: 'prism', t0: 0, t1: 10.6, fin: 0.9, blurIn: 18, opts: {
      mode: 'merge', t: { bands: [0.2, 2.6], exit: [3.4, 5.0] },
      entry: [0.05, 0.62, 0.2], exit: [0.2, -0.45, 0.2], outTo: [0.55, -8, 0.2],
      mergeFrom: (i) => [-1.6 + i * 0.62, 8, 0.2],
      cam: { from: [-0.9, 0.5, 12.5], to: [-0.8, 0.2, 11.0], dur: 10 }, look: [-0.75, -0.2],
      size: 0.85, studio: { bloom: 0.55, bloomT: 0.8 },
    } }),
    ...DISC.map((d, i) => text({ lines: [d], cls: 't-body', size: 36, x: 80, y: 300 + i * 62, w: 520, t0: 0.3 + i * 0.3, t1: 9.9, by: 'all', blur: 12, style: { color: SPECTRUM[i], fontWeight: 300 },
      dim: (t) => lerp(1, 0.35, io(p(t, 4.2, 5.4))) })),
    text({ lines: ['Siete *disciplinas.*'], size: 96, x: 80, y: 1080, w: 940, t0: 0.9, t1: 4.0, by: 'word', stagger: 0.1 }),
    text({ lines: ['Un solo *haz.*'], size: 112, x: 80, y: 1080, w: 940, t0: 4.3, t1: 6.9, by: 'word', stagger: 0.1 }),
    text({ lines: ['Que la pieza no se pueda', 'confundir con la de', 'nadie *más.*'], size: 72, x: 80, y: 1010, w: 940, t0: 7.0, t1: 9.9, by: 'word', stagger: 0.04 }),
    label({ text: 'Recomposición · 10 / 10', x: 560, w: 440, align: 'right', y: 300, t0: 1.2, t1: 10.2 }),
    /* galería */
    text({ lines: ['{s:Trabajo seleccionado}'], cls: 't-eyebrow', size: 26, x: 80, y: 300, w: 700, t0: G0 + 0.1, t1: 36.2, by: 'all' }),
    gallery(),
    text({ lines: ['El próximo cuadro está vacío', 'a *propósito.*'], size: 64, x: 80, y: 1080, w: 920, t0: G0 + N * GS + 0.3, t1: 36.3, by: 'word', stagger: 0.06 }),
    /* cifras */
    ...[['8', 'marcas'], ['9', 'trabajos'], ['7', 'disciplinas'], ['1', 'línea nueva: software']].flatMap(([n, w], i) => [
      counter(Number(n), { size: 150, x: 80, y: 330 + i * 200, w: 200, t0: 36.6 + i * 0.35, t1: 41.1, by: 'all', blur: 20, style: { fontWeight: 300 } }),
      text({ lines: [w], cls: 't-body', size: 54, x: 250, y: 400 + i * 200, w: 760, t0: 36.75 + i * 0.35, t1: 41.1, by: 'all', color: i === 3 ? 'g' : 'w' }),
    ]),
    end({ t0: 41.0, lines: ['Contanos qué', 'querés *construir.*'], size: 104, y: 460, cta: 'Agendá 30 minutos o escribinos.', dest: 'focuscreatives.net', serie: 'Sin plantilla · 10 / 10', logoRgb: true }),
  ],
  audio: {
    key: 5, bpm: 92,
    chords: [[0, 'sus2', 0], [3.2, 'min9', 0], [6.8, 'maj9', -4], [10.4, 'maj9', 0], [14.5, 'min9', -3], [18.6, 'lyd', 5], [22.7, 'maj9', 0], [26.8, 'sus4', 7], [28.9, 'lyd', 0], [36.4, 'maj9', 0], [41, 'maj9', 0]],
    energy: [[0, 0.35], [3.2, 0.5], [6, 0.7], [10.4, 0.75], [30.9, 0.6], [36.4, 0.9], [41, 0.45], [45, 0.3]],
    layers: { pulse: [[10.4, 36.4]], hats: [[14.5, 28.9, 16]], bass: [[6.8, 36.4]], arp: [[0.2, 3.2, 'up'], [10.4, 28.9, 'up'], [28.9, 36.4, 'bell']] },
    events: [[0.05, 'glass', 0.8], [0.9, 'tick', 1.0], [2.4, 'riser', 0.8, 0.5, 2.4], [4.9, 'low', 0.9], [5.0, 'impact', 0.6], ...Array.from({ length: N }, (_, i) => [G0 + i * GS + GS * 0.49, 'click', 0.8, 0.3 + 0.4 * (i % 2)]), [28.7, 'reverse', 0.8, 0.5, 1.2], [36.6, 'click'], [36.95, 'click'], [37.3, 'click'], [37.65, 'click'], [42.5, 'glass', 1.1], [43.0, 'resolve']],
  },
});

/* A04 · TOFU · "A medida" · 45 s · Difracción.
   La nueva línea de software: el ruido de herramientas que no se hablan se
   ordena, como la luz en una rejilla, en una herramienta hecha para cómo
   trabaja ese equipo. Todo prototipo va rotulado "Concepto". */
const { text, box, group, image, label, rule, end, eyebrow, glyph, gl, GLSL, ui, typed, caret, esc, p, io, out, lerp, clamp } = F;
const G = GLSL;

/* Fragmentos del caos: planillas, mails y chats genéricos, en gris. */
const FRAG = [
  ['Planilla', '<table style="border-collapse:collapse;font-size:22px">' + Array.from({ length: 5 }, (_, r) => '<tr>' + Array.from({ length: 4 }, (_, c) => `<td style="border:1px solid #3a3d42;padding:6px 12px;color:#a7acb4">${r === 0 ? ['Pedido', 'Cliente', 'Estado', 'Monto'][c] : ['#10' + (40 + r), 'Cliente ' + r, ['pendiente', 'ok', '??', 'revisar'][r % 4], '$ —'][c]}</td>`).join('') + '</tr>').join('') + '</table>'],
  ['Mail', '<div style="font-size:24px;color:#a7acb4;line-height:1.5"><b style="color:#e7e9ec">RE: RE: RE: stock actualizado (v4 final)</b><br>Te paso la planilla de nuevo, la otra tenía un error…</div>'],
  ['Chat', '<div style="font-size:24px;color:#a7acb4;line-height:1.5">¿Alguien cargó el pedido de ayer?<br>—<br>¿En cuál sistema?</div>'],
  ['Planilla', '<div style="font-size:22px;color:#a7acb4">stock_final_FINAL_2.xlsx</div>'],
  ['App', '<div style="font-size:24px;color:#a7acb4">Exportar CSV → importar → exportar</div>'],
  ['Mail', '<div style="font-size:24px;color:#a7acb4">¿Me confirmás la cotización? La busco y no la encuentro.</div>'],
];
const chaos = () => ({
  create(root) {
    this.els = FRAG.map(([k, h], i) => {
      const e = F.el('div', 'abs ui', { width: i % 2 ? '520px' : '600px' }, root);
      e.innerHTML = `<div class="win"><div class="bar"><span class="dot"></span>${k}</div><div class="body">${h}</div></div>`;
      return e;
    });
  },
  update(t) {
    const off = F.B ? 3.2 : 0; // en la variante B el caos entra después del producto
    const on = t >= off && t < 9.4;
    this.els.forEach((e, i) => {
      e.style.display = on ? 'block' : 'none';
      if (!on) return;
      const a = out(p(t, off + 0.05 + i * 0.12, off + 0.6 + i * 0.12));
      const b = io(p(t, 8.2, 9.3));
      const bx = [60, 420, 120, 480, 60, 400][i], by = [560, 700, 900, 1040, 1180, 1320][i];
      const jx = Math.sin(t * (1.3 + i * 0.4) + i) * 14, jy = Math.cos(t * (1.1 + i * 0.3) + i * 2) * 10;
      e.style.left = bx + jx + 'px'; e.style.top = by + jy + 'px';
      e.style.opacity = a * (1 - b) * (0.55 + 0.45 * ((i + Math.floor(t * 1.5)) % 3 === 0));
      e.style.filter = `blur(${((1 - a) * 12 + b * 14 + (i % 3) * 1.2).toFixed(2)}px)`;
      e.style.transform = `rotate(${(i % 2 ? 1 : -1) * 1.5}deg)`;
    });
  },
});

/* Panel de concepto: operaciones de pedidos con un flujo de agentes. */
const ORDERS = [
  ['#1048', 'Distribuidora Sur', 'Mayorista', '12 cajas'],
  ['#1049', 'Tienda Palermo', 'Local propio', '4 cajas'],
  ['#1050', 'Pedido web', 'Online', '1 caja'],
  ['#1051', 'Hotel Centro', 'Corporativo', '20 cajas'],
  ['#1052', 'Pedido web', 'Online', '2 cajas'],
];
const panelHTML = (t, l) => {
  const rows = ORDERS.map((o, i) => {
    const done = l > 2.8 + i * 0.9;
    const run = !done && l > 2.1 + i * 0.9;
    const st = done ? '<span class="ok">Conciliado</span>' : run ? '<span class="mg">Procesando</span>' : '<span class="muted">En espera</span>';
    const dot = done ? 'on' : run ? 'm' : '';
    return `<div class="row"><span class="dot ${dot}"></span><span class="v" style="flex:none;width:130px" >${o[0]}</span><span class="v">${o[1]}<br><span class="muted" style="font-size:24px">${o[2]} · ${o[3]}</span></span><span style="font-size:26px">${st}</span></div>`;
  }).join('');
  const nDone = ORDERS.filter((_, i) => l > 2.8 + i * 0.9).length;
  return `<div class="win"><div class="bar"><span class="dot on"></span>Operaciones · pedidos<span style="margin-left:auto">Concepto</span></div>
  <div class="body"><div style="display:flex;gap:14px;margin-bottom:18px">
  <span class="chip on">Hoy</span><span class="chip">Semana</span><span class="chip">Mayoristas</span></div>${rows}
  <div style="margin-top:22px;font-size:24px" class="muted">${nDone} de ${ORDERS.length} conciliados con stock y facturación</div></div></div>`;
};
const AGENT = [
  'Leer los mails de proveedores',
  'Actualizar el stock',
  'Conciliar pedidos y facturas',
  'Avisar al equipo lo que necesita una persona',
];
const agentHTML = (t, l) => `<div class="win"><div class="bar"><span class="dot m"></span>Flujo con IA<span style="margin-left:auto">Concepto</span></div><div class="body term">${AGENT.map((a, i) => {
  const s = l - i * 1.0;
  if (s < 0) return '';
  const txt = typed(a, s, 0, 40);
  const done = s > 1.6;
  return `<div><span class="p">${String(i + 1).padStart(2, '0')}</span>  ${esc(txt)}${done ? '  <span class="ok">· listo</span>' : txt.length < a.length ? caret(t) : ''}</div>`;
}).join('')}</div></div>`;

/* Código real del sitio: la detección de idioma (src/lib/locale.ts). */
const CODE = `export function detectLang(
  acceptLanguage: string | null,
  country: string | null,
): Lang {
  if (!acceptLanguage) return 'es';
  const ranked = acceptLanguage
    .split(',')
    .map((part, i) => { … })
    .filter((r) => r.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  for (const { base } of ranked) {
    if (base === 'es' || base === 'en') return base;
  }
  return country === 'US' ? 'en' : 'es';
}`;

F.mount({
  name: F.vname('focus_ad04_a-medida'),
  dur: 45,
  edit: { punches: [6.3, 11.2, 19.0, 22.0, 28.0, 34.0] },
  cover: 20.5,
  meta: {
    id: 'A04', titulo: 'A medida', etapa: 'TOFU', fenomeno: 'Difracción',
    publico: 'P3 responsables de operaciones, negocio, producto o marketing en empresas medianas; P1 fundadoras con operación propia',
    objetivo: 'Presentar la nueva línea de software a medida y generar tráfico calificado al sitio o conversaciones por DM.',
    necesidad: 'Dolor: procesos que viven en planillas, mails y apps que no se hablan. Objeción: "el software a medida es caro, lento y feo".',
    promesa: 'FOCUS diseña y desarrolla herramientas a medida, con el mismo criterio de diseño que una identidad, y suma flujos con IA para el trabajo repetido. Verificable: el código que se ve es real (del sitio de FOCUS); la interfaz está rotulada "Concepto".',
    accion: 'Mandar un DM contando qué proceso los frena.',
    servicio: 'Software a medida · flujos con IA y agentes',
    referencia: 'P8 Metalab: en producto digital se vende con el producto funcionando (recorrido de pantalla de 20 a 40 s), no con estética.',
    cta: 'Contanos por DM qué proceso te frena.', destino: 'DM de Instagram · secundario: focuscreatives.net',
    exito: 'Conversaciones iniciadas por DM y clics al sitio por cada 1.000 impresiones en el segmento P3.',
    variante: { cambia: 'Gancho (0-3,2 s): el panel de concepto conciliando pedidos desde el cuadro 0, con "Así se ve un proceso hecho a medida.", en lugar del dolor (planillas, mails y apps). El caos entra a los 3,2 s.', guion: [['0,0-3,2', 'Panel de concepto: los pedidos pasan a "Conciliado" en secuencia', 'Así se ve un proceso / hecho a *medida.*', 'Filas que cambian de estado', 'Corte en frío', 'Pad en Mi', 'Blips', 'Gancho de producto'], ['3,2-9,4', 'Entran los fragmentos genéricos (planilla, mail, chat)', 'Cada proceso que no entra / en un software genérico / se paga en *horas.*', 'Fragmentos que vibran', 'Desenfoque', 'Mi menor 9', 'Teclas', 'El contraste: cómo es hoy']] },
    ab: 'Gancho de dolor ("Tu operación corre en planillas...") contra gancho de producto (el panel funcionando desde el cuadro 0). Hipótesis: en TOFU el dolor retiene más a 3 s; en retargeting, el producto convierte más.',
    caption: `Hay procesos que no entran en ningún software genérico. Entonces viven en planillas, mails y tres apps que no se hablan, y se pagan en horas del equipo.

Sumamos una línea nueva: software a medida. Diseñamos y desarrollamos la herramienta que tu operación ya está pidiendo, con el mismo criterio con el que diseñamos una marca: que se entienda sola y que nadie tenga que adaptarse a ella.

Y donde hay trabajo repetido, le sumamos flujos con IA que lo hacen, con una persona que decide lo que importa.

(La interfaz del video es un concepto. El código es real: es parte de nuestro sitio.)

¿Qué proceso te está frenando? Contanos por DM.

#softwareamedida #transformaciondigital #inteligenciaartificial #focuscreatives #buenosaires`,
    assets: [
      ['Interferencia que se ordena en grilla', 'Shader glsl.interference (uOrder 0 → 1)', '"diffraction grating light pattern, interference fringes resolving into a precise grid, black background, thin white lines, magenta blue green spectral fringes, macro, no text"'],
      ['Fragmentos de herramientas genéricas', 'DOM en gris (planilla, mail, chat), sin marcas reales', '—'],
      ['Panel de operaciones (concepto)', 'DOM con reglas de interfaz de la marca (03, B8)', 'Variante con IA para moodboard: "minimal dark operations dashboard UI, black background, thin 1px gray borders, no rounded corners, single green status dots, Rotis-like sans serif, editorial layout, no logos"'],
      ['Código real', 'src/lib/locale.ts (detectLang) del sitio de FOCUS', '—'],
      ['Glifo software', 'design-system/assets/glyphs/software.svg', '—'],
    ],
  },
  guion: [
    ['0,0-3,2', 'Ondas de interferencia caóticas; ventanas genéricas (planilla, mail, chat) que tiemblan', 'Tu operación corre en planillas, / mails y apps que no se *hablan.*', 'Fragmentos que entran escalonados y vibran', 'Corte en frío', 'Pad tenso en Mi', 'Teclas y clics sueltos', 'Gancho de dolor reconocible'],
    ['3,2-9,4', 'El caos sigue; los fragmentos se superponen', 'Cada proceso que no entra / en un software genérico / se paga en *horas.*', 'Rack focus por frase', 'Desenfoque de salida', 'Mi menor 9', 'Aire', 'Costo del problema'],
    ['9,4-16,0', 'Las ondas se alinean en una rejilla: la difracción ordena la luz', 'Hay otra forma: / software diseñado / para cómo trabaja tu *equipo.*', 'uOrder 0 → 1 en 3 s', 'La interferencia se vuelve grilla', 'Entra el pulso cuantizado a 90 BPM', 'Subida hacia la grilla; tick al quedar ordenada', 'Solución'],
    ['16,0-25,0', 'Sobre la grilla se construye el panel (concepto): los pedidos pasan de "En espera" a "Conciliado"', 'Diseñamos la herramienta / que tu operación ya está pidiendo.', 'Filas que cambian de estado en secuencia', 'Entrada desde desenfoque', 'Arpegio ascendente', 'Blip por fila conciliada', 'Demo: el producto funcionando'],
    ['25,0-31,0', 'Código real del sitio que se escribe', 'La desarrollamos. / *Código real:* el de nuestro sitio.', 'Tipeo a 40 caracteres por segundo', 'Barrido de umbral', 'Bajo y hats', 'Teclas', 'Capacidad técnica verificable'],
    ['31,0-37,0', 'Ventana "Flujo con IA": cuatro pasos que se tildan', 'Y le sumamos agentes / para el trabajo *repetido.*', 'Líneas que se escriben y se tildan', 'Corte al beat', 'Campanas', 'Blips', 'IA aplicada, con persona que decide'],
    ['37,0-41,0', 'La grilla se ilumina; lockup de la nueva línea con glifo de difracción', 'NUEVA LÍNEA / *SOFTWARE A MEDIDA*', 'Refracción que converge', 'Separación RGB → recomposición', 'Mi lidio', 'Impacto', 'Anuncio de la línea'],
    ['41,0-45,0', 'Placa de cierre común', '¿Qué proceso / te está *frenando?* · Contanos por DM. · focuscreatives.net · Sin plantilla · 04/10', 'Entrada desde desenfoque', 'Veladura', 'Mi mayor 9', 'Firma sonora de vidrio', 'Cierre TOFU: conversación'],
  ],
  items: [
    gl({ frag: G.interference, t0: 0, t1: 41.2, fin: 0.3, u: (t) => ({ uOrder: io(p(t, 9.6, 12.8)), uCells: 12, uAmt: lerp(0.9, 0.55, p(t, 12.8, 16)) * (t > 16 ? 0.6 : 1), uFreq: 52 }) }),
    chaos(),
    ...(F.B ? [
      /* variante B: el producto funcionando desde el cuadro 0 */
      box({ x: 0, y: 0, w: 1080, h: 1920, t0: 0, t1: 3.4, fin: 0.01, blur: false, style: { background: 'rgba(10,10,11,.8)' } }),
      text({ lines: ['Así se ve un proceso', 'hecho a *medida.*'], size: 76, x: 80, y: 290, w: 960, t0: 0.15, t1: 3.3, by: 'word', stagger: 0.05, fin: 0.55 }),
      ui({ x: 80, y: 500, w: 920, t0: 0, t1: 3.3, fin: 0.4, html: (t, l) => panelHTML(t, 1.6 + l * 1.6) }),
    ] : [
      text({ lines: ['Tu operación corre en planillas,', 'mails y apps que no se *hablan.*'], size: 64, x: 80, y: 290, w: 960, t0: 0.2, t1: 3.3, by: 'word', stagger: 0.05, fin: 0.55 }),
    ]),
    box({ x: 0, y: 250, w: 1080, h: 330, t0: 0, t1: 9.4, blur: false, style: { background: 'linear-gradient(180deg, rgba(10,10,11,.85), rgba(10,10,11,0))' } }),
    text({ lines: ['Cada proceso que no entra', 'en un software genérico', 'se paga en *horas.*'], size: 76, x: 80, y: 290, w: 960, t0: 3.5, t1: 9.3, by: 'word', stagger: 0.05 }),
    text({ lines: ['Hay otra forma:'], size: 76, x: 80, y: 300, w: 960, t0: 9.8, t1: 15.9, by: 'word', stagger: 0.06 }),
    text({ lines: ['software diseñado', 'para cómo trabaja', 'tu *equipo.*'], size: 112, x: 80, y: 420, w: 960, t0: 11.2, t1: 15.9, by: 'word', stagger: 0.07 }),
    label({ text: 'Difracción · 04 / 10', x: 80, y: 1200, t0: 12, t1: 15.9 }),
    /* demo */
    text({ lines: ['Diseñamos la herramienta', 'que tu operación ya está *pidiendo.*'], size: 60, x: 80, y: 290, w: 960, t0: 16.2, t1: 24.9, by: 'word', stagger: 0.04 }),
    ui({ x: 80, y: 470, w: 920, t0: 16.4, t1: 25.0, html: (t, l) => panelHTML(t, l), tf: F.tilt(16.4, 25.0), style: { transformOrigin: '50% 40%' } }),
    /* código real */
    text({ lines: ['La desarrollamos.', '{s:Código real: el de nuestro sitio.}'], size: 64, x: 80, y: 290, w: 960, t0: 25.2, t1: 30.9, by: 'line', lineDelay: 0.5, stagger: 0 }),
    ui({ x: 80, y: 470, w: 920, t0: 25.3, t1: 31.0, tf: F.tilt(25.3, 31.0, { ry0: 9, ry1: -5 }), html: (t, l) => `<div class="win"><div class="bar"><span class="dot b"></span>src/lib/locale.ts<span style="margin-left:auto">focuscreatives.net</span></div><div class="body term" style="font-size:31px;line-height:1.5">${esc(typed(CODE, l, 0.3, 90))}${caret(t)}</div></div>` }),
    /* agentes */
    text({ lines: ['Y le sumamos agentes', 'para el trabajo *repetido.*'], size: 76, x: 80, y: 290, w: 960, t0: 31.2, t1: 37.0, by: 'word', stagger: 0.05 }),
    ui({ x: 80, y: 560, w: 920, t0: 31.4, t1: 37.0, html: (t, l) => agentHTML(t, l - 0.4), tf: F.tilt(31.4, 37.0, { rx0: -14, rx1: -2, ry0: -8, ry1: 5 }) }),
    text({ lines: ['{s:Una persona decide lo que importa.}'], cls: 't-body', size: 44, x: 80, y: 1140, w: 920, t0: 34.6, t1: 37.0, by: 'all' }),
    /* lockup de la línea */
    glyph({ name: 'software', x: 80, y: 470, size: 120, t0: 37.2, t1: 41.1, color: 'var(--paper)' }),
    F.lockup({ title: 'Nueva línea', sub: 'Software a medida', size: 132, x: 80, y: 640, t0: 37.3, t1: 41.1, rgb: true }),
    end({ t0: 41.0, lines: ['¿Qué proceso', 'te está *frenando?*'], size: 104, y: 470, cta: 'Contanos por DM qué proceso te frena.', dest: 'focuscreatives.net', serie: 'Sin plantilla · 04 / 10' }),
  ],
  audio: {
    key: 7, bpm: 90,
    chords: [[0, 'min7', 0], [3.2, 'min9', 0], [9.4, 'sus2', 0], [12.8, 'maj9', -4], [16, 'min9', 0], [25, 'maj9', -4], [31, 'min9', 5], [37, 'lyd', 0], [41, 'maj9', 0]],
    energy: [[0, 0.55], [3.2, 0.5], [9.4, 0.35], [12.8, 0.55], [16, 0.7], [25, 0.8], [31, 0.85], [37, 0.9], [41, 0.4], [45, 0.3]],
    layers: { pulse: [[12.8, 37]], hats: [[16, 37, 16]], bass: [[12.8, 37]], arp: [[16, 25, 'up'], [31, 37, 'bell']] },
    events: [[0.05, 'impact', 0.6], [0.3, 'type', 0.5, 0.3], [1.4, 'click', 0.8, 0.7], [2.2, 'click', 0.7, 0.3], [3.5, 'type', 0.5, 0.6], [5.5, 'click', 0.6, 0.4], [9.6, 'riser', 0.8, 0.5, 3.1], [12.8, 'tick', 1.2], [16.4, 'reverse', 0.6, 0.5, 1.0], [19.2, 'blip'], [20.1, 'blip'], [21.0, 'blip'], [21.9, 'blip'], [22.8, 'blip'], [25.3, 'type', 0.9, 0.5], [26.8, 'type', 0.8, 0.4], [28.3, 'type', 0.8, 0.6], [31.2, 'click'], [33.1, 'blipdown'], [34.1, 'blipdown'], [35.1, 'blipdown'], [36.1, 'blipdown'], [37.2, 'impact', 0.9], [42.5, 'glass', 1.0], [43.0, 'resolve']],
  },
});

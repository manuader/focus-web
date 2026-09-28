/* A06 · MOFU · "El flujo" · 45 s · Exposición larga.
   Cómo usa FOCUS la IA y los agentes, mostrado con el caso más verificable
   que hay: esta misma campaña. Cinco etapas como cinco trazos de luz que
   convergen en un punto: la decisión, que es humana. */
const { text, box, group, image, label, rule, end, eyebrow, glyph, gl, GLSL, ui, typed, caret, esc, p, io, out, lerp, clamp } = F;
const G = GLSL;

/* El gancho, como dato: el mismo objeto que dibuja el texto se muestra
   después como código. */
const HOOK = { lines: ['Este anuncio no se editó', 'en una app.'], size: 84, x: 80, y: 290, t0: 0.2, t1: 3.2 };
const SPEC_CODE = `F.mount({
  name: 'focus_ad06_el-flujo',
  dur: 45,
  edit: { punches: [6.3, 13.4, 17.4, 21.4, 25.4, 32.2] },
  items: [
    text(${JSON.stringify(HOOK).replace(/"(\w+)":/g, '$1: ').replace(/,(\w)/g, ', $1').replace(/"/g, "'")}),
    …
  ],
  audio: { key: 3, bpm: 94, … },
});`;

const STATIONS = [
  ['01', 'Investigación', '12 estudios relevados, métricas con fecha.'],
  ['02', 'Auditoría', 'Cada herramienta, revisada antes de usarla.'],
  ['03', 'Guion y diseño', 'Una idea y un fenómeno óptico por pieza.'],
  ['04', 'Render', '1.350 cuadros por anuncio, escritos en código.'],
  ['05', 'Sonido', 'Banda original para cada pieza.'],
];
const ST0 = 9.4, STD = 4.0; // la etapa i ocupa [ST0 + i·STD, ST0 + (i+1)·STD)

F.mount({
  name: F.vname('focus_ad06_el-flujo'),
  dur: 45,
  edit: { punches: [6.3, 13.4, 17.4, 21.4, 25.4, 32.2] },
  cover: 34.6,
  meta: {
    id: 'A06', titulo: 'El flujo', etapa: 'MOFU', fenomeno: 'Exposición larga',
    publico: 'P3 responsables de marketing, marca y negocio que evalúan cómo incorporar IA sin perder calidad ni control',
    objetivo: 'Consideración y demanda: mostrar el flujo de trabajo con agentes y control humano, y convertir en reuniones de demostración.',
    necesidad: 'Objeciones: "la IA hace todo igual", "¿quién controla la calidad?", "¿es seguro?".',
    promesa: 'FOCUS combina agentes (investigar, auditar, producir, componer) con decisiones humanas en cada etapa. Verificable: esta campaña se produjo así; todo el proceso, los datos y el código están documentados (instagram/campana-ads-01/).',
    accion: 'Agendar una demo de 30 minutos del flujo aplicado a su marca.',
    servicio: 'Flujos con IA y agentes · contenido audiovisual',
    referencia: 'P9 DixonBaxi: hacer visible el proceso (tests, exploraciones) justifica el honorario. P3 Koto: contenido que educa al comprador y le da vocabulario.',
    cta: 'Agendá una demo de 30 minutos.', destino: 'calendly.com/focus-creatives-info/30min',
    exito: 'Reuniones agendadas en Calendly atribuidas al anuncio (UTM) y clics al enlace; retención al 50 %.',
    variante: { cambia: 'Gancho (0-3,2 s) y giro (37-41 s) intercambiados: abre con el beneficio "Más velocidad. El mismo criterio." sobre la terminal y cierra el desarrollo con "Este anuncio no se editó en una app. Se escribió."', guion: [['0,0-3,2', 'Terminal: el comando real de render y el contador de cuadros', 'Más velocidad. / El mismo *criterio.*', 'Tipeo; contador', 'Corte en frío', 'Pad en Do', 'Teclas', 'Gancho de beneficio'], ['37,0-41,0', 'Punto blanco que respira', 'Este anuncio no se editó / en una app. → Se *escribió.*', 'Rack focus', 'Desenfoque cruzado', 'Do lidio', 'Impacto suave', 'Giro meta']] },
    ab: 'Gancho meta ("Este anuncio no se editó en una app.") contra gancho de beneficio ("Más velocidad. El mismo criterio."). Hipótesis: el gancho meta retiene más en P3 porque promete ver algo que no ve en otras agencias: el detrás de escena real.',
    caption: `Esta campaña la hicimos con un flujo de agentes y personas. Así funciona:

· Investigación: agentes relevaron 12 estudios premium y sus videos, con métricas públicas y fecha de consulta.
· Auditoría: antes de usar cualquier herramienta o skill de IA, otro agente revisó su código buscando riesgos.
· Guion y diseño: una idea y un fenómeno óptico por pieza, decididos con criterio.
· Render: cada cuadro se escribe en código (1.350 por anuncio). Nada de plantillas.
· Sonido: una banda original para cada pieza.

En cada etapa, una persona decide qué sigue y qué no. La IA nos da velocidad; el criterio sigue siendo nuestro.

¿Querés ver el flujo aplicado a tu marca? Agendá una demo de 30 minutos.

#inteligenciaartificial #agentesdeia #marketingdigital #focuscreatives #buenosaires`,
    assets: [
      ['Terminal de render', 'DOM con la interfaz de la marca; el comando es el real (node render.mjs a06)', '—'],
      ['Código del propio anuncio', 'Serialización del objeto real del gancho de este archivo', '—'],
      ['Trayectorias de luz', 'Shader glsl.trails con cinco recorridos y resaltado por etapa', '"long exposure photograph of five light trails converging into a single bright point, magenta to green spectrum, pure black background, fine film grain, no text"'],
      ['Datos de las etapas', '01-investigacion-competitiva.md, 02-auditoria-skills-y-herramientas.md, produccion/', '—'],
    ],
  },
  guion: [
    ['0,0-3,2', 'Terminal: se escribe el comando real de render y corre el contador de cuadros', 'Este anuncio no se editó / en una app. → Se *escribió.*', 'Tipeo; contador 0001 → 1350', 'Corte en frío', 'Pulso de teclas sobre pad en Do', 'Teclas; tick', 'Gancho meta: ver cómo se hizo lo que estás viendo'],
    ['3,2-9,4', 'El código real de este anuncio se escribe en una ventana', 'Cada cuadro es una función del tiempo. / Cada sonido, *también.*', 'Tipeo a 60 caracteres por segundo', 'Barrido de umbral', 'Do mayor 9', 'Teclas', 'Prueba técnica'],
    ['9,4-29,4', 'Cinco trazos de luz se exponen en el tiempo; cada 4 s se ilumina una etapa y su rótulo', '01 Investigación · 02 Auditoría · 03 Guion y diseño · 04 Render · 05 Sonido (con una línea verificable cada una)', 'Exposición progresiva; resaltado por etapa', 'Continuo; clic por etapa', 'Pulso a 86 BPM, arpegio en loop', 'Clic y blip por etapa', 'El flujo, etapa por etapa'],
    ['29,4-37,0', 'Los cinco trazos convergen en un punto blanco: la decisión', 'Agentes para investigar, comparar y producir. / Personas para decidir qué sale / y qué *no.*', 'Convergencia en 2,5 s; destello', 'Continuo', 'La menor 9 → Fa lidio', 'Grave en la convergencia', 'Diferencial: control humano'],
    ['37,0-41,0', 'Tinta; placa cinética a cuerpo gigante', 'Más / velocidad. / El mismo / *criterio.*', 'Un golpe cada 0,6 s; la última palabra se recompone desde RGB', 'Corte al pulso', 'Do lidio', 'Impacto suave', 'Beneficio'],
    ['41,0-45,0', 'Placa de cierre común', 'Tu marca, / con este *flujo.* · Agendá una demo de 30 minutos. · calendly.com/focus-creatives-info/30min · Sin plantilla · 06/10', 'Entrada desde desenfoque', 'Veladura', 'Do mayor 9', 'Firma sonora de vidrio', 'Cierre MOFU: reunión'],
  ],
  items: [
    /* terminal */
    ui({ x: 80, y: 560, w: 920, t0: 0.05, t1: 3.3, fin: 0.3, html: (t, l) => {
      const cmd = typed('node render.mjs a06', l, 0.1, 36);
      const n = Math.min(1350, Math.floor(Math.max(0, l - 0.8) * 520));
      return `<div class="win"><div class="bar"><span class="dot m"></span>campana-ads-01/produccion</div><div class="body term" style="font-size:34px"><span class="p">$</span> ${esc(cmd)}${n ? '' : caret(t)}${n ? `<br><span class="muted">focus_ad06_el-flujo</span> cuadro ${String(n).padStart(4, '0')} / 1350<div class="bar-fill" style="margin-top:18px"><i style="width:${(n / 13.5).toFixed(1)}%"></i></div>` : ''}</div></div>`;
    } }),
    ...(F.B ? [
      /* variante B: el beneficio como gancho; la frase meta pasa al giro */
      text({ lines: ['Más velocidad.'], size: 104, x: 80, y: 290, w: 940, t0: 0.15, t1: 3.2, by: 'word', stagger: 0.08, fin: 0.5 }),
      text({ lines: ['El mismo *criterio.*'], size: 112, x: 80, y: 1000, w: 940, t0: 1.1, t1: 3.2, by: 'word', stagger: 0.1, fin: 0.6 }),
    ] : [
      text({ ...HOOK, w: 940, by: 'word', stagger: 0.06, fin: 0.5 }),
      text({ lines: ['Se *escribió.*'], size: 150, x: 80, y: 980, w: 940, t0: 1.9, t1: 3.2, by: 'all', blur: 22, fin: 0.7 }),
    ]),
    /* código */
    ui({ x: 80, y: 520, w: 920, t0: 3.3, t1: 9.4, html: (t, l) => `<div class="win"><div class="bar"><span class="dot b"></span>ads/a06.js<span style="margin-left:auto">Este anuncio</span></div><div class="body term" style="font-size:30px;line-height:1.5">${esc(typed(SPEC_CODE, l, 0.2, 70))}${caret(t)}</div></div>` }),
    text({ lines: ['Cada cuadro es una', 'función del tiempo.'], size: 76, x: 80, y: 290, w: 940, t0: 3.5, t1: 9.3, by: 'word', stagger: 0.05 }),
    text({ lines: ['Cada sonido, *también.*'], size: 76, x: 80, y: 1140, w: 940, t0: 6.3, t1: 9.3, by: 'word', stagger: 0.06 }),
    /* el flujo */
    gl({ frag: G.trails, t0: 9.2, t1: 41.2, fin: 0.8, u: (t) => {
      const i = Math.floor((t - ST0) / STD);
      return { uHead: 0.08 + 0.92 * p(t, ST0, ST0 + 5 * STD), uConv: io(p(t, 29.4, 31.9)), uAmt: 1, uHi: t < ST0 + 5 * STD ? clamp(i, 0, 4) : -1 };
    } }),
    box({ x: 0, y: 250, w: 1080, h: 420, t0: 9.2, t1: 29.5, blur: false, style: { background: 'linear-gradient(180deg, rgba(10,10,11,.9) 30%, rgba(10,10,11,0))' } }),
    label({ text: 'Exposición larga · 06 / 10', x: 80, y: 1206, t0: 10, t1: 29.3 }),
    ...STATIONS.map(([n, name, line], i) => {
      const a = ST0 + i * STD, b = a + STD;
      return group({ t0: a, t1: b, fin: 0.01, fout: 0.4, outBlur: 10, children: [
        text({ lines: [`{s:${n} / 05}`], cls: 't-mono', size: 26, x: 80, y: 292, w: 400, t0: a + 0.05, t1: b, by: 'all' }),
        text({ lines: [name], size: 104, x: 80, y: 340, w: 940, t0: a + 0.1, t1: b, by: 'all', blur: 18 }),
        text({ lines: [line], cls: 't-body', size: 46, x: 84, y: 480, w: 900, t0: a + 0.45, t1: b, by: 'word', stagger: 0.04, color: 's' }),
      ] });
    }),
    /* convergencia */
    text({ lines: ['Agentes para investigar,', 'comparar y producir.'], size: 76, x: 80, y: 290, w: 940, t0: 29.6, t1: 37, by: 'word', stagger: 0.05 }),
    text({ lines: ['Personas para decidir', 'qué sale y qué *no.*'], size: 88, x: 80, y: 1020, w: 940, t0: 32.2, t1: 37, by: 'word', stagger: 0.06 }),
    ...(F.B ? [
      F.slam({ t0: 37.2, t1: 41.05, step: 0.55, words: ['Este anuncio', 'no se editó', 'en una app.', 'Se *escribió.*'], light: { c: [0.5, 0.6], r: 0.09, amt: 0.5 } }),
    ] : [
      F.slam({ t0: 37.2, t1: 41.05, step: 0.6, words: ['Más', 'velocidad.', 'El mismo', '*criterio.*'], light: { c: [0.5, 0.6], r: 0.09, amt: 0.5 } }),
    ]),
    end({ t0: 41.0, lines: ['Tu marca,', 'con este *flujo.*'], size: 108, y: 460, cta: 'Agendá una demo de 30 minutos.', dest: 'calendly.com/focus-creatives-info/30min', serie: 'Sin plantilla · 06 / 10' }),
  ],
  audio: {
    key: 3, bpm: 94,
    chords: [[0, 'min7', 0], [3.2, 'maj9', 0], [9.4, 'maj9', 0], [13.4, 'min9', -3], [17.4, 'lyd', 5], [21.4, 'maj9', 0], [25.4, 'sus4', 7], [29.4, 'min9', -3], [33, 'lyd', 5], [37, 'lyd', 0], [41, 'maj9', 0]],
    energy: [[0, 0.5], [3.2, 0.45], [9.4, 0.55], [20, 0.75], [29.4, 0.9], [33, 0.7], [37, 0.8], [41, 0.4], [45, 0.3]],
    layers: { pulse: [[9.4, 37]], hats: [[13.4, 29.4, 16]], bass: [[9.4, 37]], arp: [[9.4, 29.4, 'up'], [29.4, 37, 'bell']] },
    events: [[0.1, 'type', 0.9, 0.5], [0.9, 'blip'], [1.9, 'tick', 1.2], [3.3, 'type', 0.8, 0.4], [4.9, 'type', 0.7, 0.6], [6.5, 'type', 0.7, 0.5], [9.4, 'impact', 0.6], [9.4, 'click'], [13.4, 'click', 1, 0.3], [17.4, 'click', 1, 0.7], [21.4, 'click', 1, 0.4], [25.4, 'click', 1, 0.6], [27.4, 'riser', 0.8, 0.5, 2.0], [29.4, 'swell', 1, 0.5], [31.9, 'low', 0.9], [32.0, 'glass', 0.9], [37.2, 'impact', 0.6], [42.5, 'glass', 1.0], [43.0, 'resolve']],
  },
});

/* A01 · TOFU · "Sin plantilla" · 45 s · Superposición.
   Cuando todo se parece, se anula. La IA explora cien caminos, el criterio
   elige uno y el oficio lo termina a mano. */
const { text, box, group, image, label, rule, end, eyebrow, gl, GLSL, p, io, out, lerp, clamp } = F;
const G = GLSL;

/* --- pieza genérica: el "antes", rotulado como ejemplo (paleta ajena a propósito) --- */
const generic = () => ({
  create(root) {
    this.cards = [];
    for (let i = 0; i < 9; i++) {
      const c = F.el('div', 'abs', { width: '220px', height: '275px', overflow: 'hidden', background: 'linear-gradient(160deg,#7b2ff7 0%,#f107a3 55%,#ff8a00 100%)', fontFamily: 'Arial, Helvetica, sans-serif', color: '#fff', mixBlendMode: 'difference' }, root);
      c.innerHTML = '<div style="position:absolute;left:22px;top:24px;font-weight:900;font-size:22px;letter-spacing:.08em">MARCA</div>' +
        '<div style="position:absolute;left:22px;right:22px;top:84px;font-weight:900;font-size:27px;line-height:1.05">¡Llevá tu marca al siguiente nivel!</div>' +
        '<div style="position:absolute;left:22px;bottom:26px;padding:10px 16px;background:#fff;color:#f107a3;font-weight:900;font-size:17px;border-radius:30px">SABER MÁS</div>' +
        '<div style="position:absolute;right:-40px;top:-40px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.18)"></div>';
      this.cards.push(c);
    }
  },
  update(t) {
    // En la variante B la grilla entra después del gancho (a los 3,2 s).
    const conv = F.B ? io(p(t, 4.2, 6.6)) : io(p(t, 3.4, 6.2)); // convergen al centro y se anulan
    this.cards.forEach((c, i) => {
      const gx = 180 + (i % 3) * 250, gy = 560 + Math.floor(i / 3) * 300;
      const cx = 430, cy = 830;
      const x = lerp(gx, cx, conv), y = lerp(gy, cy, conv);
      // la del centro se va primero: quedan ocho, pares, y se cancelan a negro
      const a = i === 4 ? 1 - (F.B ? out(p(t, 3.7, 4.2)) : out(p(t, 3.0, 3.6))) : 1;
      const vis = t < 7.2 ? 1 : 0;
      c.style.left = x + 'px'; c.style.top = y + 'px';
      const t0 = F.B ? 3.2 : 0;
      c.style.opacity = a * vis * out(p(t, t0, t0 + 0.25));
      c.style.filter = t < t0 + 0.25 ? `blur(${(1 - clamp((t - t0) / 0.25)) * 10}px)` : 'none';
      c.style.display = vis && t >= t0 ? 'block' : 'none';
    });
  },
});

/* --- cien caminos: variaciones generadas con elementos de la marca --- */
const PAL = ['#ff00ff', '#5b8cff', '#00ff33', '#f6f6f4', '#a7acb4'];
function rng(seed) { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); }
function drawCell(x, i, px, py, s) {
  const r = rng(i + 7);
  let kind = Math.floor(r() * 8);
  let c1 = PAL[Math.floor(r() * 5)], c2 = PAL[Math.floor(r() * 3)];
  // la elegida: magenta y verde que se cruzan en blanco (el momento de marca), con anillos finos
  if (i === 56) { kind = 1; c1 = '#ff00ff'; c2 = '#00ff33'; }
  x.save();
  x.translate(px, py);
  x.fillStyle = '#17181b'; x.fillRect(0, 0, s, s);
  x.lineWidth = Math.max(1, s / 60);
  const cx = s * (0.3 + r() * 0.4), cy = s * (0.3 + r() * 0.4);
  x.globalCompositeOperation = 'lighter';
  if (kind === 0) { x.strokeStyle = c1; for (let k = 1; k < 5; k++) { x.beginPath(); x.arc(cx, cy, k * s * 0.09, 0, 7); x.stroke(); } }
  if (i === 56) { x.strokeStyle = 'rgba(167,172,180,.55)'; x.lineWidth = Math.max(1, s / 200); for (let k = 1; k < 6; k++) { x.beginPath(); x.arc(s * 0.5, s * 0.5, k * s * 0.085, 0, 7); x.stroke(); } }
  if (kind === 1) { x.fillStyle = c1; x.beginPath(); x.arc(cx - s * 0.08, cy, s * 0.22, 0, 7); x.fill(); x.fillStyle = c2; x.beginPath(); x.arc(cx + s * 0.08, cy, s * 0.22, 0, 7); x.fill(); }
  if (kind === 2) { x.strokeStyle = c1; x.beginPath(); x.moveTo(0, s * r()); x.lineTo(s, s * r()); x.stroke(); x.fillStyle = c2; x.beginPath(); x.arc(cx, cy, s * 0.05, 0, 7); x.fill(); }
  if (kind === 3) { ['#ff00ff', '#0033ff', '#00ff33'].forEach((c, k) => { x.fillStyle = c; x.globalAlpha = 0.9; x.fillRect(s * 0.18 + k * s * 0.04, s * 0.3 + k * s * 0.03, s * 0.5, s * 0.1); }); x.globalAlpha = 1; }
  if (kind === 4) { x.fillStyle = c1; x.font = `italic 400 ${s * 0.7}px Serif4`; x.fillText('a', s * 0.28, s * 0.72); }
  if (kind === 5) { x.strokeStyle = '#a7acb4'; x.beginPath(); x.moveTo(cx, s * 0.15); x.lineTo(cx, s * 0.85); x.moveTo(s * 0.15, cy); x.lineTo(s * 0.85, cy); x.stroke(); x.strokeStyle = c1; x.beginPath(); x.arc(cx, cy, s * 0.14, 0, 7); x.stroke(); }
  if (kind === 6) { for (let k = 0; k < 7; k++) { x.fillStyle = ['#ff00ff', '#c010ff', '#8020ff', '#0033ff', '#0080dd', '#00c088', '#00ff33'][k]; x.fillRect(s * 0.15 + k * s * 0.1, s * 0.25, s * 0.06, s * 0.5 * (0.4 + r() * 0.6)); } }
  if (kind === 7) { x.fillStyle = c1; x.font = `300 ${s * 0.2}px Rotis`; x.fillText('FOCUS', s * 0.12, s * 0.55); x.fillStyle = c2; x.fillRect(s * 0.12, s * 0.62, s * 0.3, 2); }
  x.restore();
}
const CHOSEN = 56, CELL = 78, GX = 150, GY = 455;
const grid = () => ({
  create(root) {
    this.c = F.el('canvas', 'abs', { left: GX + 'px', top: GY + 'px', width: CELL * 10 + 'px', height: CELL * 10 + 'px' }, root);
    this.c.width = CELL * 10; this.c.height = CELL * 10;
    this.x = this.c.getContext('2d');
    this.one = F.el('canvas', 'abs', { width: (CELL - 4) + 'px', height: (CELL - 4) + 'px', transformOrigin: '0 0' }, root);
    this.one.width = 430; this.one.height = 430;
    this.drawn = -1;
  },
  update(t) {
    const on = t >= 16 && t < 31.4;
    this.c.style.display = this.one.style.display = on ? 'block' : 'none';
    if (!on) return;
    const n = Math.min(100, Math.floor(Math.pow(p(t, 16.2, 20.6), 1.6) * 100));
    if (n !== this.drawn) {
      this.x.clearRect(0, 0, CELL * 10, CELL * 10);
      for (let i = 0; i < n; i++) drawCell(this.x, i, (i % 10) * CELL + 2, Math.floor(i / 10) * CELL + 2, CELL - 4);
      this.drawn = n;
      const ox = this.one.getContext('2d');
      ox.clearRect(0, 0, 430, 430);
      drawCell(ox, CHOSEN, 0, 0, 430);
    }
    // criterio: todo se va de foco menos uno
    const k = io(p(t, 24.2, 25.6));
    this.c.style.filter = k > 0 ? `blur(${(k * 7).toFixed(2)}px) grayscale(${k}) brightness(${1 - k * 0.55})` : 'none';
    this.c.style.opacity = 1 - io(p(t, 27.5, 29.5));
    // la elegida crece hasta ocupar el cuadro
    const g = io(p(t, 26.6, 29.2));
    const x0 = GX + (CHOSEN % 10) * CELL + 2, y0 = GY + Math.floor(CHOSEN / 10) * CELL + 2;
    const S = 640 / (CELL - 4), s = lerp(1, S, g);
    this.one.style.left = lerp(x0, 540 - 320, g) + 'px';
    this.one.style.top = lerp(y0, 820 - 320, g) + 'px';
    this.one.style.transform = `scale(${s})`;
    this.one.style.opacity = n > CHOSEN ? 1 - io(p(t, 30.2, 31.3)) : 0;
    this.one.style.outline = g > 0 ? 'none' : `${k > 0 ? 2 : 0}px solid #f6f6f4`;
  },
});

/* --- el reticle que busca la elegida --- */
const cellCenter = { x: GX + (CHOSEN % 10) * CELL + CELL / 2, y: GY + Math.floor(CHOSEN / 10) * CELL + CELL / 2 };

F.mount({
  name: F.vname('focus_ad01_sin-plantilla'),
  dur: 45,
  edit: { punches: [11.6, 18.7, 21.3, 26.6] },
  cover: 29.0,
  meta: {
    id: 'A01', titulo: 'Sin plantilla', etapa: 'TOFU', fenomeno: 'Superposición',
    publico: 'P3 responsables de marketing y marca; P1 fundadoras que ya escalaron',
    objetivo: 'Alcance y recordación: instalar la postura de FOCUS frente a la IA generativa y abrir la serie.',
    necesidad: 'Objeción: "si todos usan IA, todo se ve igual; ¿para qué pagar un estudio?"',
    promesa: 'FOCUS usa IA para explorar y criterio para decidir; cada pieza se termina a mano. Verificable: esta campaña no usa plantillas (ver A06 y produccion/).',
    accion: 'Ver el anuncio completo y seguir la cuenta (serie de diez).',
    servicio: 'Contenido con inteligencia artificial · dirección de arte',
    referencia: 'P10 Futura: una frase de posicionamiento clara rindió ~2,2 veces su base. P9 DixonBaxi: mostrar exploración antes de la elegida hace visible el criterio.',
    cta: 'Seguí la serie: son diez.', destino: 'Perfil de Instagram (seguir) · secundario: focuscreatives.net',
    exito: 'Retención a 3 s por encima del promedio de la cuenta y ThruPlay (15 s) mayor al 25 % de las reproducciones; seguidores nuevos por cada 1.000 alcanzados.',
    variante: { cambia: 'Gancho (0-3,2 s): la postura en frase, "Usamos IA. / No usamos plantillas.", con refracción RGB sobre tinta, en lugar de la grilla de piezas genéricas. La grilla entra a los 3,2 s y se anula igual.', guion: [['0,0-3,2', 'Tinta con un punto de luz; titular en dos tiempos que se recompone desde RGB', 'Usamos IA. / No usamos *plantillas.*', 'Refracción que converge', 'Corte en frío', 'Pad suspendido en Re con golpe grave', 'Impacto; vidrio', 'Gancho de postura'], ['3,2-8,5', 'Entra la grilla genérica (rotulada) y converge hasta anularse', 'Cuando todo se parece, / nada se ve.', 'Convergencia en 2,4 s', 'Superposición hasta negro', 'Re menor 9', 'Clic; grave', 'Problema']] },
    ab: 'Gancho: "Todo empieza a parecerse." (grilla de iguales) contra "Usamos IA. No usamos plantillas." en el cuadro 0. Hipótesis: la grilla genérica retiene más a 3 s porque el público se reconoce en el problema antes de escuchar la postura.',
    caption: `Producir nunca fue tan fácil. Distinguirse, nunca tan difícil.

Usamos inteligencia artificial todos los días: para explorar cien caminos en lo que antes llevaba uno, para probar, para medir. Lo que no delegamos es el criterio: cuál de esos caminos es tuyo y cuál es de cualquiera.

Después, lo terminamos a mano. Tipografía, luz, sonido. Esta pieza, por ejemplo: ningún cuadro salió de una plantilla.

Es la primera de diez. Seguí la serie.

#focuscreatives #direcciondearte #identidaddemarca #inteligenciaartificial #buenosaires`,
    assets: [
      ['Grilla de piezas genéricas', 'DOM generado en el anuncio (paleta ajena a propósito, rotulado "ejemplo genérico")', 'Sin IA. Si se quiere una versión fotográfica: "nine identical generic social media ad posts, purple to orange gradient, bold white sans-serif headline, rounded CTA button, flat lay grid, top view, no brand names"'],
      ['Cien variaciones', 'Canvas generado con elementos de la marca (anillos, retícula, espectro, serif, wordmark)', 'Variante con IA: "grid of 100 abstract minimal compositions, black background, thin white rings, magenta blue green light accents, swiss poster studies, top view, no text"'],
      ['Superposición', 'Dos discos en mix-blend-mode difference (motivo del manual)', '—'],
      ['Key visual "Un foco entre la dispersión"', 'public/assets/img-03.jpg (propio)', '—'],
      ['Halo de luz', 'Shader glsl.halo', '"single point of white light, chromatic aberration fringe magenta and green, pure black background, fine film grain, 35mm"'],
    ],
  },
  guion: [
    ['0,0-3,2', 'Grilla de 9 piezas genéricas idénticas (rotuladas "Ejemplo genérico"); veladura oscura', 'Todo empieza a parecerse.', 'Entrada seca de la grilla; el texto entra en foco palabra por palabra', 'Corte en frío', 'Pad suspendido en Re, entra con un golpe grave suave', 'Impacto grave, vidrio', 'Gancho: el público reconoce el feed que ve todos los días'],
    ['3,2-8,5', 'La pieza central desaparece; las ocho restantes convergen al centro en modo diferencia y se anulan a negro', 'Cuando todo se parece, / nada se ve.', 'Convergencia en 2,8 s con ease-in-out', 'Superposición hasta negro', 'El acorde se vacía hasta un tono', 'Clic al empezar; grave cuando llega a negro', 'Problema: la igualdad cancela a la marca'],
    ['8,5-16,0', 'Negro. Dos discos (magenta y verde) orbitan uno alrededor del otro en diferencia; donde se tocan nace otro color', 'La IA hizo fácil producir. / Lo difícil ahora es distinguirse.', 'Órbita continua; corte de encuadre al pulso', 'Rack focus del texto', 'Re menor 9 abre a Si bemol mayor 9', 'Tick de lente en cada frase', 'Tensión: el valor se movió de producir a distinguir'],
    ['16,0-24,0', 'Grilla de 100 variaciones que se llena en cascada (anillos, espectro, retícula, serif)', 'Usamos IA para explorar / cien caminos.', 'Cascada acelerada; contador 001 → 100', 'Subida de aire hacia el corte', 'Entra el pulso a 88 BPM, bajo y arpegio', 'Teclas en ráfagas', 'Capacidad: la IA como exploración, no como resultado'],
    ['24,0-31,4', 'Todas salen de foco y a gris menos una; la retícula la fija; la elegida crece hasta ocupar el cuadro', 'Y criterio / para elegir uno.', 'Desenfoque selectivo; retícula que busca y fija; escala 1 → 7', 'Corte al beat; crecimiento continuo', 'Sol menor 9; hats', 'Impacto al corte; tick al fijar', 'Diferencial: el juicio humano'],
    ['31,4-37,0', 'Key visual real de FOCUS en foco; tres insertos al beat: una "a" en serif itálica refractada, un punto de luz, una onda de sonido', 'Después, lo terminamos a mano: / tipografía, luz, sonido.', 'Insertos de 1,5 s', 'Vidrio al revés antes de la imagen; cortes secos al beat', 'Campanas de vidrio', 'Clic en cada inserto', 'Oficio: lo que no automatiza nadie'],
    ['37,0-41,0', 'Tinta; placa cinética: una palabra por golpe a cuerpo gigante, la última se recompone desde tres capas RGB', 'Nada / de esto / es / *plantilla.*', 'Cortes al pulso cada 0,5 s; refracción que converge a blanco', 'Golpe de zoom en cada palabra', 'Re lidio; se abre la luz', 'Impacto y subida', 'Giro: la propia pieza es la prueba'],
    ['41,0-45,0', 'Placa de cierre común', 'Usamos IA. / No usamos *plantillas.* · Seguí la serie: son diez. · focuscreatives.net · Sin plantilla · 01/10', 'Entrada desde desenfoque; logo', 'Veladura', 'Resolución en Re mayor 9', 'Firma sonora de vidrio', 'Cierre TOFU: seguir la serie'],
  ],
  items: [
    /* 0 · gancho */
    generic(),
    box({ x: 0, y: 0, w: 1080, h: 1920, t0: 0.9, t1: 7.4, fin: 2.0, blur: false, style: { background: 'rgba(10,10,11,.35)' } }),
    ...(F.B ? [
      /* variante B: la postura en frase desde el cuadro 0 */
      F.gl({ frag: F.GLSL.halo, t0: 0, t1: 3.3, fin: 0.6, u: (t) => ({ uC: [0.78, 0.42], uR: 0.16, uAmt: 0.45, uHue: -1, uSplit: 0.012 }) }),
      text({ lines: ['Usamos IA.'], size: 124, x: 80, y: 300, w: 920, t0: 0.1, t1: 3.2, by: 'word', stagger: 0.08, fin: 0.55, rgb: true, rgbAmp: 26 }),
      text({ lines: ['No usamos', '*plantillas.*'], size: 124, x: 80, y: 980, w: 920, t0: 0.9, t1: 3.2, by: 'word', stagger: 0.1, fin: 0.6, rgb: true, rgbAmp: 26 }),
      label({ text: 'Ejemplo genérico', x: 180, y: 520, t0: 3.3, t1: 4.6 }),
    ] : [
      label({ text: 'Ejemplo genérico', x: 180, y: 520, t0: 0.2, t1: 3.2 }),
      text({ lines: ['Todo empieza', 'a *parecerse.*'], size: 96, x: 80, y: 280, w: 920, t0: 0.2, t1: 3.3, by: 'word', stagger: 0.07, fin: 0.55 }),
    ]),
    /* 3,2 · se anulan */
    text({ lines: ['Cuando todo se parece,'], size: 84, x: 80, y: 330, w: 920, t0: 3.6, t1: 8.3, by: 'word', stagger: 0.07 }),
    text({ lines: ['nada se *ve.*'], size: 132, x: 80, y: 1060, w: 920, t0: 5.9, t1: 8.3, by: 'word', stagger: 0.12 }),
    /* 8,5 · promesa: superposición */
    /* los dos discos orbitan uno alrededor del otro dentro de la franja de imagen (y 640-980) */
    box({ x: 390, y: 660, w: 300, h: 300, t0: 8.4, t1: 16.2, fin: 0.8, blurIn: 30, style: { borderRadius: '50%', background: '#ff00ff', mixBlendMode: 'difference' },
      anim: (t, e) => { const a = (t - 8.4) * 1.1; e.style.transform = `translate(${(-Math.cos(a) * 150).toFixed(1)}px, ${(Math.sin(a) * 26).toFixed(1)}px)`; } }),
    box({ x: 390, y: 660, w: 300, h: 300, t0: 8.6, t1: 16.2, fin: 0.8, blurIn: 30, style: { borderRadius: '50%', background: '#00ff33', mixBlendMode: 'difference' },
      anim: (t, e) => { const a = (t - 8.4) * 1.1; e.style.transform = `translate(${(Math.cos(a) * 150).toFixed(1)}px, ${(-Math.sin(a) * 26).toFixed(1)}px)`; } }),
    box({ x: 0, y: 0, w: 1080, h: 1920, t0: 8.4, t1: 16.2, blur: false, style: { background: 'radial-gradient(ellipse 70% 40% at 50% 45%, rgba(10,10,11,0) 0%, rgba(10,10,11,.55) 100%)' } }),
    text({ lines: ['La IA hizo fácil', 'producir.'], size: 104, x: 80, y: 300, w: 920, t0: 8.9, t1: 16.0, by: 'word', stagger: 0.08 }),
    text({ lines: ['Lo difícil ahora', 'es *distinguirse.*'], size: 104, x: 80, y: 1010, w: 920, t0: 11.6, t1: 16.0, by: 'word', stagger: 0.09 }),
    label({ text: 'Superposición · 01 / 10', x: 80, y: 540, t0: 9.5, t1: 16 }),
    /* 16 · cien caminos */
    grid(),
    text({ lines: ['Usamos IA para explorar', '*cien* caminos.'], size: 70, x: 80, y: 292, w: 940, t0: 16.1, t1: 23.9, by: 'word', stagger: 0.06 }),
    { create(root) { this.e = F.el('div', 'abs t-mono', { left: GX + 'px', top: (GY + CELL * 10 + 22) + 'px', fontSize: '24px', color: 'var(--g400)' }, root); },
      update(t) { const on = t >= 16.2 && t < 24; this.e.style.display = on ? 'block' : 'none'; const n = Math.min(100, Math.floor(Math.pow(p(t, 16.2, 20.6), 1.6) * 100)); this.e.textContent = `Variación ${String(Math.max(1, n)).padStart(3, '0')} / 100`; } },
    /* 24 · criterio */
    F.reticle({ t0: 24.3, t1: 27.2, size: 300, path: (t) => { const k = io(p(t, 24.3, 25.5)); return { x: lerp(300, cellCenter.x, k), y: lerp(1100, cellCenter.y, k), s: lerp(1.6, 0.42, k), r: lerp(-40, 0, k) }; } }),
    text({ lines: ['Y criterio', 'para elegir *uno.*'], size: 104, x: 80, y: 292, w: 920, t0: 24.4, t1: 31.2, by: 'word', stagger: 0.09 }),
    /* 31,4 · a mano */
    image({ src: '/public/assets/img-03.jpg', x: 0, y: 0, w: 1080, h: 1920, t0: 31.3, t1: 37.1, fin: 0.9, blur: 22, zoom: [1.12, 1.02], pos: '50% 38%', style: { filter: 'none' } }),
    box({ x: 0, y: 0, w: 1080, h: 1920, t0: 31.3, t1: 37.1, blur: false, style: { background: 'linear-gradient(180deg, rgba(10,10,11,.75) 0%, rgba(10,10,11,.1) 30%, rgba(10,10,11,.1) 55%, rgba(10,10,11,.9) 80%)' } }),
    text({ lines: ['Después, lo terminamos', 'a *mano:*'], size: 84, x: 80, y: 300, w: 940, t0: 31.6, t1: 37, by: 'word', stagger: 0.07 }),
    /* insertos al beat */
    group({ t0: 33.4, t1: 34.8, fin: 0.01, fout: 0.05, children: [
      box({ x: 0, y: 0, w: 1080, h: 1920, t0: 33.4, t1: 34.8, fin: 0.01, blur: false, style: { background: 'var(--ink)' } }),
      text({ lines: ['a'], cls: 't-serif', size: 900, x: 180, y: 380, w: 900, t0: 33.4, t1: 34.8, by: 'all', rgb: true, rgbAmp: 40, fin: 0.7, blur: 30, rise: 0 }),
      label({ text: 'Tipografía', x: 80, y: 1200, t0: 33.45, t1: 34.8 }),
    ] }),
    group({ t0: 34.8, t1: 36.1, fin: 0.01, fout: 0.05, children: [
      box({ x: 0, y: 0, w: 1080, h: 1920, t0: 34.8, t1: 36.1, fin: 0.01, blur: false, style: { background: 'var(--ink)' } }),
      gl({ frag: G.halo, t0: 34.8, t1: 36.1, fin: 0.4, u: (t, l) => ({ uC: [0.62, 0.56], uR: lerp(0.02, 0.16, out(p(l, 0, 1))), uAmt: 1.2, uHue: -1, uSplit: 0.012 }) }),
      label({ text: 'Luz', x: 80, y: 1200, t0: 34.85, t1: 36.1 }),
    ] }),
    group({ t0: 36.1, t1: 37.2, fin: 0.01, fout: 0.05, children: [
      box({ x: 0, y: 0, w: 1080, h: 1920, t0: 36.1, t1: 37.2, fin: 0.01, blur: false, style: { background: 'var(--ink)' } }),
      { create(root) { this.c = F.el('canvas', 'abs', { left: 0, top: '560px', width: '1080px', height: '500px' }, root); this.c.width = 1080; this.c.height = 500; this.x = this.c.getContext('2d'); },
        update(t) { const on = t >= 36.1 && t < 37.2; this.c.style.display = on ? 'block' : 'none'; if (!on) return; const x = this.x; x.clearRect(0, 0, 1080, 500); x.globalCompositeOperation = 'lighter';
          ['#ff00ff', '#0033ff', '#00ff33'].forEach((c, k) => { x.strokeStyle = c; x.lineWidth = 3; x.beginPath(); for (let i = 0; i <= 1080; i += 4) { const u = i / 1080; const env = Math.sin(Math.PI * u) ** 2; const y = 250 + env * 170 * Math.sin(u * 38 + t * 9 + k * 0.35) * Math.sin(u * 7 + t * 2); i ? x.lineTo(i, y) : x.moveTo(i, y); } x.stroke(); }); } },
      label({ text: 'Sonido', x: 80, y: 1200, t0: 36.15, t1: 37.2 }),
    ] }),
    /* 37 · giro */
    F.slam({ t0: 37.2, t1: 41.05, step: 0.52, words: ['Nada', 'de esto', 'es', '*plantilla.*'], light: { c: [0.5, 0.3], r: 0.22, amt: 0.4 } }),
    /* 41 · cierre */
    end({ t0: 41.0, lines: ['Usamos IA.', 'No usamos *plantillas.*'], size: 92, y: 480, cta: 'Seguí la serie: son diez.', dest: 'focuscreatives.net', serie: 'Sin plantilla · 01 / 10' }),
  ],
  audio: {
    key: 5, bpm: 88, grid: [34.8, 36.1],
    chords: [[0, 'sus2', 0], [3.2, 'min9', 0], [8.5, 'min9', 0], [12, 'maj9', -4], [16, 'min9', 0], [24, 'min9', 5], [31.4, 'maj9', -4], [37, 'lyd', 0], [41, 'maj9', 0]],
    energy: [[0, 0.3], [3, 0.25], [7, 0.1], [8.5, 0.25], [16, 0.55], [24, 0.75], [31, 0.85], [37, 0.9], [41, 0.4], [45, 0.3]],
    layers: { pulse: [[16, 37]], hats: [[24, 37, 16]], bass: [[16, 37]], arp: [[16, 24, 'up'], [31.4, 37, 'bell']] },
    events: [[0.05, 'impact', 0.8], [0.1, 'glass', 0.8], [3.4, 'click'], [6.5, 'low'], [9.0, 'tick'], [11.7, 'tick'], [16, 'riser', 0.9, 0.5, 2.2], [16.3, 'type', 0.8, 0.4], [18.2, 'type', 0.7, 0.6], [20.1, 'type', 0.6, 0.5], [24, 'impact', 0.7], [25.5, 'tick'], [31.3, 'reverse', 0.9, 0.5, 1.4], [33.4, 'click', 1, 0.3], [34.8, 'click', 1, 0.7], [36.1, 'click', 1, 0.5], [37.2, 'impact', 0.9], [41, 'riser', 0.5, 0.5, 1.6], [42.5, 'glass', 1.0], [43.0, 'resolve']],
  },
});

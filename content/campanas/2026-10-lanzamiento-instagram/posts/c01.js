/* C01 · Carrusel de presentación (fijado) · "Qué es FOCUS" · 8 cuadros 1080×1350 */
const { text, image, rings, logo, box } = F;
const eb = (s, t0, c = 'var(--g300)') => text({ lines: [s], cls: 't-eyebrow', size: 38, x: 80, y: 90, t0, by: 'all', style: { color: c } });
F.deck({
  name: 'focus_car01_que-es-focus', format: 'post',
  frames: [
    (i) => [
      image({ src: '/design-system/assets/key-visuals/kv-un-foco.jpg', t0: i, fin: 0.01, blur: 0, treat: 'dim', pos: '62% 22%', zoom: [1.5, 1.5] }),
      box({ x: 0, y: 700, w: 1080, h: 650, t0: i, blur: false, fin: 0.01, style: { background: 'linear-gradient(transparent, rgba(10,10,11,.92) 60%)' } }),
      text({ lines: ['EL PUNTO DONDE'], cls: 't-head', size: 104, x: 80, y: 960, t0: i, by: 'all', fin: 0.01, blur: 0 }),
      text({ lines: ['TODO CAMBIA'], cls: 't-light-it t-caps', size: 84, x: 84, y: 1070, t0: i, by: 'all', fin: 0.01, blur: 0 }),
    ],
    (i) => [eb('Qué es FOCUS', i),
      text({ lines: ['Somos un estudio', 'de Buenos Aires.'], size: 96, x: 80, y: 300, t0: i, by: 'all' }),
      text({ lines: ['Diseño, contenido y software,', 'en el mismo equipo.'], cls: 't-body', size: 56, x: 80, y: 620, t0: i, by: 'all', color: 's' }),
      rings({ t0: i, fin: 0.01, cx: 900, cy: 1150, size: 700, color: 'var(--g700)', accentRing: 2 })],
    (i) => [eb('Cómo lo pensamos', i),
      text({ lines: ['No construimos marcas', 'desde cero.'], size: 88, x: 80, y: 300, t0: i, by: 'all' }),
      text({ lines: ['Revelamos el ángulo que ya', 'estaba ahí y lo volvemos', '*imposible* de ignorar.'], size: 64, cls: 't-body', x: 80, y: 620, t0: i, by: 'all' })],
    (i) => [eb('Cómo trabajamos', i),
      ...[['01', 'Separar', 'Estrategia, imagen y voz, cada una por su lado.', '#FF00FF'], ['02', 'Enfocar', 'Una sola idea adelante. Lo demás, fuera del plano.', '#5B8CFF'], ['03', 'Recomponer', 'Todo vuelve a ser una marca, más clara que antes.', '#00FF33']].flatMap(([n, h, d, c], k) => [
        text({ lines: [`{s:${n}}`], cls: 't-mono', size: 26, x: 80, y: 290 + k * 300, t0: i, by: 'all' }),
        text({ lines: [h], size: 80, x: 80, y: 330 + k * 300, t0: i, by: 'all', style: { color: c } }),
        text({ lines: [d], cls: 't-body', size: 44, x: 80, y: 430 + k * 300, w: 920, t0: i, by: 'all' })])],
    (i) => [eb('Qué hacemos', i),
      text({ lines: ['Marca y contenido'], cls: 't-label', size: 24, x: 80, y: 250, t0: i, by: 'all', style: { color: '#FF00FF' } }),
      text({ lines: ['Identidad de marca', 'Dirección de arte', 'Social media', 'Contenido audiovisual', 'Estrategia', 'Editorial y packaging'], size: 50, x: 80, y: 300, t0: i, by: 'all', style: { lineHeight: '1.32' } }),
      text({ lines: ['Producto digital'], cls: 't-label', size: 24, x: 80, y: 790, t0: i, by: 'all', style: { color: '#00FF33' } }),
      text({ lines: ['Páginas web', 'Productos digitales', 'Experiencias interactivas'], size: 50, x: 80, y: 840, t0: i, by: 'all', style: { lineHeight: '1.32' } })],
    (i) => [eb('En qué creemos', i),
      ...[['Libertad', 'No pedimos permiso para proponer lo que todavía no existe.'], ['Profundidad', 'Nada genérico, nada igual a lo de los demás.'], ['Atención', 'Al detalle, para que tu marca se sienta única.'], ['Curiosidad', 'Siempre hay otro ángulo para mostrarte.']].flatMap(([h, d], k) => [
        text({ lines: [h], size: 64, x: 80, y: 250 + k * 240, t0: i, by: 'all' }),
        text({ lines: [d], cls: 't-body', size: 40, x: 80, y: 330 + k * 240, w: 920, t0: i, by: 'all', color: 's' })])],
    (i) => [eb('Con quién trabajamos', i),
      text({ lines: ['Nueve trabajos,', 'de la arquitectura', 'al vino boutique.'], size: 84, x: 80, y: 260, t0: i, by: 'all' }),
      text({ lines: ['Ader Studio · OUSHY Studio · Top Láser', '@chillin1390bar · @santatuca', '@chuchones_wines · @rsh_consultora', '@esteticaintegralfernanda'], cls: 't-body', size: 42, x: 80, y: 700, t0: i, by: 'all', color: 's', style: { lineHeight: '1.5' } })],
    (i) => [
      text({ lines: ['Enfoquemos'], cls: 't-head', size: 136, x: 80, y: 250, t0: i, by: 'all' }),
      text({ lines: ['lo que ya es tuyo'], cls: 't-subserif', size: 76, x: 84, y: 400, t0: i, by: 'all' }),
      text({ lines: ['Escribinos por DM o agendá', '30 minutos en focuscreatives.net'], cls: 't-body', size: 46, x: 80, y: 760, t0: i, by: 'all', color: 's' }),
      logo({ t0: i, fin: 0.01, w: 240, x: 80, y: 1040, sub: 'El punto donde todo cambia' })],
  ],
});

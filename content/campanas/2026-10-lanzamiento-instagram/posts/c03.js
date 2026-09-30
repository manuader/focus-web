/* C03 · Portfolio verificado · "Cuatro formas de trabajar con FOCUS" · 7 cuadros */
const { text, image, box } = F;
const C = (id) => `/design-system/assets/clientes/${id}-card.jpg`;
const eb = (s, i, c) => text({ lines: [s], cls: 't-eyebrow', size: 38, x: 80, y: 90, t0: i, by: 'all', style: { color: c } });
F.deck({
  name: 'focus_car03_cuatro-formas', format: 'post',
  frames: [
    (i) => [
      ...['ader-studio', 'chillin', 'toplaser', 'santa-tuca'].map((id, k) => image({ src: C(id), x: 80 + (k % 2) * 470, y: 110 + Math.floor(k / 2) * 470, w: 450, h: 450, t0: i, fin: 0.01, blur: 0 })),
      text({ lines: ['Cuatro formas', 'de trabajar con *FOCUS.*'], size: 80, x: 80, y: 1060, t0: i, by: 'all' })],
    (i) => [eb('01 · Un sitio', i, '#FF00FF'),
      ...[['ader-studio', 'Ader Studio', 'Arquitectura'], ['oushy', 'OUSHY Studio', 'Estudio creativo'], ['toplaser-web', 'Top Láser', 'Imprenta']].flatMap(([id, n, c], k) => [
        image({ src: C(id), x: 80 + k * 315, y: 200, w: 290, h: 362, t0: i, fin: 0.01, blur: 0 }),
        text({ lines: [n], cls: 't-body', size: 32, x: 80 + k * 315, y: 580, w: 300, t0: i, by: 'all', style: { fontWeight: 700 } }),
        text({ lines: [`{s:${c}}`], cls: 't-body', size: 28, x: 80 + k * 315, y: 622, w: 300, t0: i, by: 'all' })]),
      text({ lines: ['Tres sitios en línea,', 'tres rubros.'], size: 64, x: 80, y: 780, t0: i, by: 'all' }),
      text({ lines: ['Cada sitio se puede visitar hoy.'], cls: 't-body', size: 40, x: 80, y: 960, t0: i, by: 'all', color: 's' })],
    (i) => [eb('02 · Las redes', i, '#5B8CFF'),
      ...[['chillin', '@chillin1390bar'], ['chuchones', '@chuchones_wines'], ['rsh-consultora', '@rsh_consultora'], ['fernanda-estetica', '@esteticaintegralfernanda']].flatMap(([id, n], k) => [
        image({ src: C(id), x: 80 + k * 235, y: 200, w: 215, h: 270, t0: i, fin: 0.01, blur: 0 }),
        text({ lines: [n], cls: 't-body', size: 22, x: 80 + k * 235, y: 486, w: 225, t0: i, by: 'all', style: { fontWeight: 700, wordBreak: 'break-all' } })]),
      text({ lines: ['Social media', 'management.'], size: 64, x: 80, y: 700, t0: i, by: 'all' }),
      text({ lines: ['Un bar, vinos boutique, una consultora', 'de seguridad e higiene, un centro de estética.'], cls: 't-body', size: 38, x: 80, y: 900, t0: i, by: 'all', color: 's' })],
    (i) => [eb('03 · La marca entera', i, '#00FF33'),
      image({ src: C('toplaser'), x: 80, y: 180, w: 520, h: 650, t0: i, fin: 0.01, blur: 0 }),
      text({ lines: ['Top Láser'], size: 72, x: 80, y: 870, t0: i, by: 'all' }),
      text({ lines: ['Identidad de marca, social media', 'y contenido audiovisual. Y el sitio.'], cls: 't-body', size: 42, x: 80, y: 970, t0: i, by: 'all', color: 's' })],
    (i) => [eb('04 · La edición', i, '#FF00FF'),
      image({ src: C('santa-tuca'), x: 480, y: 180, w: 520, h: 650, t0: i, fin: 0.01, blur: 0 }),
      text({ lines: ['@santatuca'], size: 72, x: 80, y: 870, t0: i, by: 'all' }),
      text({ lines: ['Edición de reels y videos de YouTube', 'para un creador de contenido.'], cls: 't-body', size: 42, x: 80, y: 970, t0: i, by: 'all', color: 's' })],
    (i) => [
      text({ lines: ['Rubros distintos.', 'El mismo *criterio.*'], size: 100, x: 80, y: 380, t0: i, by: 'all' }),
      text({ lines: ['Todos los casos están en', 'focuscreatives.net, con su link.'], cls: 't-body', size: 46, x: 80, y: 700, t0: i, by: 'all', color: 's' })],
    (i) => [
      text({ lines: ['¿Cuál de las', 'cuatro es la tuya?'], size: 100, x: 80, y: 380, t0: i, by: 'all' }),
      text({ lines: ['Escribinos el número por DM', 'y te contamos cómo empezaríamos.'], cls: 't-body', size: 46, x: 80, y: 700, t0: i, by: 'all', color: 's' }),
      F.logo({ t0: i, fin: 0.01, w: 220, x: 80, y: 1040 })],
  ],
});

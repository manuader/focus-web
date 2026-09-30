/* R03 · Software / experiencia interactiva · "Tocá la pantalla" · 20 s */
const { text, seq, box, logo, group } = F;
const chip = (t0, t1, n, name, how) => [
  box({ x: 60, y: 250, w: 960, h: 150, t0, t1, style: { background: 'rgba(10,10,11,.78)', backdropFilter: 'blur(10px)', borderTop: '1px solid #3a3d42', borderBottom: '1px solid #3a3d42' } }),
  text({ lines: [`{s:${n}}  ${name}`], cls: 't-label', size: 26, x: 90, y: 280, t0: t0 + 0.1, t1, by: 'all', style: { color: 'var(--paper)' } }),
  text({ lines: [how], cls: 't-body', size: 38, x: 90, y: 330, w: 900, t0: t0 + 0.3, t1, by: 'word', stagger: 0.05, style: { color: 'var(--g300)' } }),
];
F.mount({
  name: 'focus_reel03_toca-la-pantalla',
  dur: 20,
  cover: 1.9,
  items: [
    seq({ dir: '/work/capturas/superposicion', count: 150, t0: 0, t1: 5.9, fin: 0.3, offset: 0 }),
    box({ x: 0, y: 0, w: 1080, h: 1920, t0: 0, t1: 3.3, fin: 0.01, blur: false, style: { background: 'rgba(10,10,11,.72)' } }),
    // La barra superior del sitio queda en la zona de la interfaz de Instagram: se funde a tinta.
    box({ x: 0, y: 0, w: 1080, h: 300, t0: 0, t1: 15.4, fin: 0.01, blur: false, style: { background: 'linear-gradient(#0a0a0b 70%, transparent)' } }),
    text({ lines: ['Esto es un sitio,', 'no un render.'], size: 108, x: 80, y: 640, t0: 0.15, t1: 3.3, by: 'line', lineDelay: 0.3, stagger: 0 }),
    text({ lines: ['Es focuscreatives.net, grabado en pantalla.'], cls: 't-body', size: 46, x: 84, y: 920, t0: 0.9, t1: 3.3, by: 'word', stagger: 0.05, color: 's' }),
    ...chip(3.3, 5.9, '01', 'Superposición', 'El color nace al cruzarse.'),

    seq({ dir: '/work/capturas/refraccion', count: 165, t0: 5.9, t1: 10.8, fin: 0.4 }),
    ...chip(6.1, 10.8, '02', 'Refracción', 'Tres capas de luz se separan y vuelven a ser blanco.'),

    seq({ dir: '/work/capturas/foco', count: 135, t0: 10.8, t1: 15.4, fin: 0.4 }),
    ...chip(11.2, 15.4, '03', 'Foco', 'El dedo es la lente. Lo que toca, se lee.'),

    text({ lines: ['Diseñamos', 'y *programamos*', 'experiencias así.'], size: 104, x: 80, y: 600, t0: 15.6, by: 'line', lineDelay: 0.35, stagger: 0 }),
    text({ lines: ['Probalo en focuscreatives.net, desde el teléfono.'], cls: 't-body', size: 42, x: 84, y: 1060, w: 900, t0: 17.2, by: 'word', stagger: 0.05, color: 's' }),
    logo({ t0: 18.0, w: 200, x: 84, y: 1330 }),
  ],
  audio: {
    chords: [[0, 'min'], [15.6, 'maj']],
    bpm: 92, pulse: [3.0, 15.4],
    events: [[0.2, 'tick'], [3.0, 'click'], [5.4, 'swell'], [5.8, 'click'], [10.8, 'swell'], [11.2, 'click'], [15.6, 'resolve'], [17.2, 'tick']],
  },
});

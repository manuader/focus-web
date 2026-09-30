/* S01 · Bienvenida · 4 historias. Zonas libres para stickers nativos. */
const { text, image, rings, logo, box } = F;
F.deck({
  name: 'focus_hist01_bienvenida', counter: false,
  frames: [
    (i) => [rings({ t0: i, fin: 0.01, cx: 540, cy: 900, size: 1300, color: 'var(--g700)', accentRing: 2 }),
      logo({ t0: i, fin: 0.01, w: 520, y: 760, rgb: true }),
      text({ lines: ['Abrimos.'], size: 96, x: 0, w: 1080, align: 'center', y: 1080, t0: i, by: 'all' }),
      text({ lines: ['Este es el Instagram de FOCUS.'], cls: 't-body', size: 44, x: 0, w: 1080, align: 'center', y: 1210, t0: i, by: 'all', color: 's' })],
    (i) => [text({ lines: ['Acá vas a ver', 'cómo pensamos.'], size: 112, x: 80, y: 560, t0: i, by: 'all' }),
      text({ lines: ['No solo lo que hacemos.'], size: 112, x: 80, y: 820, t0: i, by: 'all', color: 's' })],
    (i) => [text({ lines: ['¿Qué querés', 'ver primero?'], size: 112, x: 80, y: 420, t0: i, by: 'all' }),
      text({ lines: ['{s:STICKER ENCUESTA · y 950–1250}'], cls: 't-mono', size: 1, x: 0, y: 0, t0: 99, by: 'all' })],
    // El key visual de campaña tal cual (trae su propio lockup y logo).
    (i) => [image({ src: '/design-system/assets/key-visuals/kv-nos-movemos.jpg', t0: i, fin: 0.01, blur: 0, pos: '100% 50%' }),
      box({ x: 0, y: 0, w: 1080, h: 560, t0: i, fin: 0.01, blur: false, style: { background: 'linear-gradient(rgba(10,10,11,.9) 45%, transparent)' } }),
      text({ lines: ['Todo empieza en', 'focuscreatives.net'], size: 72, x: 80, y: 250, t0: i, by: 'all' })],
  ],
});

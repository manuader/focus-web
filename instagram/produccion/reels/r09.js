/* R09 · Narrativa abstracta · "El umbral" · 20 s */
const { text, box, image, seq, logo, group } = F;
// La puerta: una línea de luz que se abre en un rectángulo y después en el mundo.
const door = (t) => {
  const h = 900 * F.out(F.p(t, 0.2, 1.8));
  const w = 2 + 358 * F.io(F.p(t, 1.9, 4.6));
  const k = F.io(F.p(t, 5.0, 6.8));
  return { w: w + (1080 - w) * k, h: h + (1920 - h) * k };
};
F.mount({
  name: 'focus_reel09_el-umbral',
  dur: 20,
  cover: 4.3,
  items: [
    group({ t0: 5.0, t1: 9.4, fin: 0.01, clip: (t) => { const d = door(t); return `inset(${(1920 - d.h) / 2}px ${(1080 - d.w) / 2}px)`; }, children: [
      image({ src: '/public/assets/img-06.jpg', t0: 5.0, t1: 9.4, fin: 0.01, blur: 0, zoom: [1.25, 1.0], focusAt: 5.6, focusFrom: 10 }),
    ] }),
    box({ x: 0, y: 0, w: 1080, h: 1920, t0: 0.2, t1: 7.2, fin: 0.3, fout: 1.2, blur: false, anim: (t, e) => {
      const d = door(t);
      Object.assign(e.style, { left: (1080 - d.w) / 2 + 'px', top: (1920 - d.h) / 2 + 'px', width: d.w + 'px', height: d.h + 'px',
        background: 'linear-gradient(180deg, rgba(255,255,255,.9), rgba(246,246,244,.75) 50%, rgba(255,255,255,.9))',
        boxShadow: `0 0 ${60 + d.w / 4}px ${10 + d.w / 20}px rgba(255,255,255,.35), 0 0 200px 40px rgba(255,0,255,.12)` });
    } }),
    text({ lines: ['Lo que parece', 'una puerta'], size: 96, x: 80, y: 250, t0: 1.4, t1: 5.0, by: 'line', lineDelay: 0.4, stagger: 0 }),
    text({ lines: ['resulta ser', 'un *mundo.*'], size: 96, x: 80, y: 1500, anchor: 'bottom', t0: 3.0, t1: 5.0, by: 'line', lineDelay: 0.4, stagger: 0 }),

    seq({ dir: '/instagram/produccion/capturas/umbral', count: 135, t0: 9.2, t1: 13.4, rate: 1.05, fin: 0.7 }),

    text({ lines: ['Una identidad que dejó', 'de ser lo que era'], size: 84, x: 80, y: 640, t0: 13.6, t1: 16.8, by: 'line', lineDelay: 0.5, stagger: 0 }),
    text({ lines: ['{s:y todavía no es lo que será.}'], size: 84, x: 80, y: 830, t0: 14.8, t1: 16.8, by: 'word', stagger: 0.09 }),

    text({ lines: ['Ahí *trabajamos.*'], size: 132, x: 80, y: 700, t0: 17.0, by: 'word', stagger: 0.25 }),
    text({ lines: ['Cruzá el umbral · focuscreatives.net'], cls: 't-body', size: 40, x: 84, y: 890, t0: 17.9, by: 'word', stagger: 0.05, color: 's' }),
    logo({ t0: 18.4, w: 200, x: 84, y: 1330 }),
  ],
  audio: {
    chords: [[0, 'sus'], [5.0, 'maj'], [13.4, 'min'], [17.0, 'maj']],
    events: [[0.2, 'swell'], [1.8, 'tick'], [4.6, 'low'], [5.2, 'swell'], [5.6, 'resolve'], [9.2, 'click'], [13.6, 'tick'], [17.0, 'resolve'], [17.9, 'tick']],
  },
});

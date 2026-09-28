/* Biblioteca del atlas óptico: un fenómeno por segundo, sin texto, para
   exportar como imágenes del design system (assets/optics/). */
const { box, gl, GLSL, p, io, out, lerp } = F;
const G = GLSL;
const S = (i) => ({ t0: i, t1: i + 1, fin: 0.01, fout: 0.01, blurIn: 0, blurOut: 0 });
F.mount({ name: 'x01', dur: 10, cover: 0.5, noVignette: false, items: [
  box({ ...S(0), x: 250, y: 640, w: 420, h: 420, blur: false, style: { borderRadius: '50%', background: '#ff00ff', mixBlendMode: 'difference' } }),
  box({ ...S(0), x: 430, y: 780, w: 420, h: 420, blur: false, style: { borderRadius: '50%', background: '#00ff33', mixBlendMode: 'difference' } }),
  F.three({ ...S(1), scene: 'lens', opts: { tex: '/public/assets/img-01.jpg', dim: 0.45, path: () => ({ x: 0.12, y: -0.05 }), time: () => 3 } }),
  F.three({ ...S(2), scene: 'mirror', opts: { camX: -0.6, lookX: -0.4, lookY: 0.1, camY: 0.9, colH: 2.0, camFrom: 10, camTo: 10, split: () => 0.35, ring: () => 1, ringX: -0.7, time: () => 12 } }),
  gl({ ...S(3), frag: G.interference, u: () => ({ uOrder: 0.45, uCells: 12, uAmt: 0.95, uFreq: 52 }) }),
  gl({ ...S(4), frag: G.density, u: () => ({ uZoom: 2.3, uAmt: 0.95, uAccent: 1, uC: [0.5, 0.48] }) }),
  gl({ ...S(5), frag: G.trails, u: () => ({ uHead: 1, uConv: 1, uAmt: 1, uHi: -1 }) }),
  gl({ ...S(6), frag: G.caustic, u: () => ({ uAmt: 0.9, uSplit: 0.014, uScale: 2.6, uTint: 0.45, uSpeed: 0.3, uCenter: [0.5, 0.5], uRadius: 0 }) }),
  gl({ ...S(7), frag: G.slit, u: () => ({ uOpen: 0.45, uX: 0.62, uDust: 1, uAmt: 1, uWarm: 0.2 }) }),
  F.three({ ...S(8), scene: 'orbit', opts: { n: 4, colors: [0xff00ff, 0x3366ff, 0x00ff33, 0xffffff], tilt: 0.9, camFrom: 14, camTo: 14, camY: 0.6, lookY: 0.2, active: () => -1, time: () => 21 } }),
  F.three({ ...S(9), scene: 'prism', opts: { mode: 'merge', t: { bands: [0.2, 2.6], exit: [3.4, 5.0] }, entry: [0.05, 0.62, 0.2], exit: [0.2, -0.45, 0.2], outTo: [0.55, -8, 0.2], mergeFrom: (i) => [-1.6 + i * 0.62, 8, 0.2], cam: { from: [-0.2, 0.3, 10.5], to: [-0.2, 0.3, 10.5], dur: 1 }, look: [-0.1, 0], size: 0.85, studio: { bloom: 0.55, bloomT: 0.8 }, time: () => 7 } }),
] , audio: {} });

/* ============================================================
   The mobile prism, drawn on a 2D canvas.

   A real triangular prism in perspective, not a triangle: six
   vertices in 3D, rotated and projected every frame, glass faces
   sorted back to front. The light runs through its middle
   cross-section, so the entry and exit points ride the rotation.

   Same story as the desktop bench, told in portrait: the spectrum
   comes up from the lower left onto the left face, one ray per
   service, and once all seven are in, a single white beam leaves
   through the right face. Apex up, like the record sleeve.

   Pure drawing: no DOM besides the canvases, no React. The
   component feeds it a progress value and a clock.
   ============================================================ */

export interface SceneBox {
  /** Canvas size in CSS px. */
  W: number;
  H: number;
  /** The free band left for the prism, below the heading and caption, in CSS px. */
  top: number;
  bottom: number;
  /** Optional exact band mouths at the canvas edge, in CSS px. */
  rayEntries?: Array<{ y: number; half: number }>;
}

export interface SceneFrame {
  /** Where the beam leaves the glass (CSS px), its angle, how much of it is
      on screen, and how visible its label should be. */
  tag: { x: number; y: number; angle: number; room: number; opacity: number };
  /** How far each ray has travelled, 0..1, for the caption's spectrum bar. */
  rays: number[];
  /** Each ray's line, for a service's name to ride into the glass: where it
      meets the glass (CSS px), the angle it runs out at, how far its
      leading edge still is from the glass, and how much of it is on screen. */
  leads: Array<{ x: number; y: number; angle: number; front: number; room: number }>;
}

/* ---- Timeline, in scroll progress. Negative is the section still
   rising into view: the prism builds itself before it pins. ---- */
const BUILD: [number, number] = [-0.16, 0.06];
const RAY_START = 0.08;
const RAY_STEP = 0.085;
const RAY_LEN = 0.07;
const INNER: [number, number] = [0.66, 0.72];
const BEAM: [number, number] = [0.72, 0.84];
const END_AT = 0.72;

export const rayWindow = (i: number): [number, number] => [
  RAY_START + i * RAY_STEP,
  RAY_START + i * RAY_STEP + RAY_LEN,
];

/** Which caption to show: 0..6 a service, 7 the closing beam. */
export function activeStep(p: number, count: number): number {
  if (p >= END_AT) return count;
  let step = 0;
  for (let i = 0; i < count; i++) if (p >= rayWindow(i)[0] - 0.02) step = i;
  return step;
}

/**
 * Where the scroll rests on the way through: each service with its ray
 * fully in, and the white beam once it is out with its label.
 */
export const stops = (count: number) => [
  ...Array.from({ length: count }, (_, i) => rayWindow(i)[1] + 0.004),
  BEAM[1] + 0.03,
];

/** Scroll progress at which service `i` is fully in, for jumping to it. */
export const stepProgress = (i: number, count: number) =>
  i >= count ? BEAM[1] : rayWindow(i)[1];

/* ---- Helpers ---- */
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));
const easeOut = (x: number) => 1 - (1 - x) ** 3;
const easeInOut = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);
const bump = (p: number, at: number, w: number) => Math.max(0, 1 - Math.abs(p - at) / w);
const rad = (d: number) => (d * Math.PI) / 180;
const TAU = Math.PI * 2;

type V3 = [number, number, number];
interface Pt {
  x: number;
  y: number;
}

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
};

/** Deterministic, so the dust is the same field on every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---- The solid. Equilateral cross-section of side 1, centroid at the
   origin, apex up; extruded along z. ---- */
const H3 = Math.sqrt(3) / 2;
const TRI: Array<[number, number]> = [
  [0, (2 * H3) / 3], // A, apex
  [-0.5, -H3 / 3], // B, lower left
  [0.5, -H3 / 3], // C, lower right
];
const DEPTH = 0.66;
const VERTS: V3[] = [
  ...TRI.map(([x, y]) => [x, y, DEPTH / 2] as V3),
  ...TRI.map(([x, y]) => [x, y, -DEPTH / 2] as V3),
];
const FACES: number[][] = [
  [0, 1, 2], // front
  [3, 4, 5], // back
  [0, 3, 4, 1], // left, where the spectrum enters
  [0, 2, 5, 3], // right, where the beam leaves
  [1, 4, 5, 2], // base
];
/** Each edge with the two faces that share it. */
const EDGES: Array<[number, number, number, number]> = [
  [0, 1, 0, 2],
  [1, 2, 0, 4],
  [2, 0, 0, 3],
  [3, 4, 1, 2],
  [4, 5, 1, 4],
  [5, 3, 1, 3],
  [0, 3, 2, 3],
  [1, 4, 2, 4],
  [2, 5, 3, 4],
];
/** Camera distance, in prism sides. Close enough for a little perspective. */
const CAM = 4.2;
/** Key light, normalised: from the upper left, in front. */
const LIGHT: V3 = (() => {
  const v: V3 = [-0.55, 0.6, 0.58];
  const m = Math.hypot(...v);
  return [v[0] / m, v[1] / m, v[2] / m];
})();

const DUST = 90;
/** The fan's angular span, and how far past the face line it starts. */
const FAN_SPAN = rad(76);
const FAN_CLEAR = rad(10);
/** The beam leaves slightly upward, like the one on desktop. */
const BEAM_ANGLE = rad(-9);

export function createPrismScene(canvas: HTMLCanvasElement, colors: readonly string[]) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const rgb = colors.map(hexToRgb);
  const n = colors.length;

  // Bloom: the light is drawn again into a quarter-size buffer, halved twice
  // more, and the blurry results are screened back on top. Cheap, and it
  // works everywhere, unlike ctx.filter.
  const mk = () => {
    const c = document.createElement('canvas');
    return { c, x: c.getContext('2d')! };
  };
  const b1 = mk();
  const b2 = mk();
  const b3 = mk();

  const rand = mulberry32(7);
  const dust = Array.from({ length: DUST }, () => ({
    u: rand(),
    v: rand(),
    vx: (rand() - 0.5) * 0.006,
    vy: -0.004 - rand() * 0.01,
    r: 0.5 + rand() * 1.1,
    ph: rand() * TAU,
  }));

  let W = 0;
  let H = 0;
  let dpr = 1;
  let cx = 0;
  let cy = 0;
  let S = 0;
  let rayEntries: SceneBox['rayEntries'];

  function resize(box: SceneBox, pixelRatio: number) {
    W = box.W;
    H = box.H;
    dpr = pixelRatio;
    rayEntries = box.rayEntries;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    const bw = Math.max(1, Math.ceil(W / 4));
    const bh = Math.max(1, Math.ceil(H / 4));
    b1.c.width = bw;
    b1.c.height = bh;
    b2.c.width = Math.max(1, Math.ceil(bw / 2));
    b2.c.height = Math.max(1, Math.ceil(bh / 2));
    b3.c.width = Math.max(1, Math.ceil(bw / 4));
    b3.c.height = Math.max(1, Math.ceil(bh / 4));

    const free = Math.max(120, box.bottom - box.top);
    S = Math.min(W * 0.58, free * 0.62);
    // The triangle's box sits 0.144 sides above its centroid. Centre it a
    // little high: the fan and the floor glow hang below it.
    cx = W * 0.5;
    cy = box.top + free * 0.45 + S * 0.144;
  }

  function render(p: number, t: number): SceneFrame {
    const c = ctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, W, H);

    const build = easeOut(seg(p, BUILD[0], BUILD[1]));

    // The prism turns into place as it builds (seen almost edge-on first, so
    // the triangle is revealed rather than stamped), then keeps drifting a
    // few degrees for the rest of the section and breathes when idle.
    const yawDeg =
      -70 +
      48 * easeOut(seg(p, -0.18, 0.25)) +
      6 * easeInOut(seg(p, 0.25, 1)) +
      Math.sin(t * 0.33) * 1.4;
    const pitchDeg = 13 + Math.sin(t * 0.21 + 1) * 0.8;
    const cyw = Math.cos(rad(yawDeg));
    const syw = Math.sin(rad(yawDeg));
    const cpt = Math.cos(rad(pitchDeg));
    const spt = Math.sin(rad(pitchDeg));
    // The whole solid floats a few pixels while idle.
    const bob = Math.sin(t * 0.6) * S * 0.012;

    const rot = ([x, y, z]: V3): V3 => {
      const x2 = x * cyw + z * syw;
      const z2 = -x * syw + z * cyw;
      return [x2, y * cpt - z2 * spt, y * spt + z2 * cpt];
    };
    const proj = ([x, y, z]: V3): Pt => {
      const k = CAM / (CAM - z);
      return { x: cx + x * S * k, y: cy + bob - y * S * k };
    };

    const R3 = VERTS.map(rot);
    const P = R3.map(proj);

    const faces = FACES.map((f) => {
      const [a, b, d] = [R3[f[0]], R3[f[1]], R3[f[2]]];
      const u: V3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
      const v: V3 = [d[0] - a[0], d[1] - a[1], d[2] - a[2]];
      let nx = u[1] * v[2] - u[2] * v[1];
      let ny = u[2] * v[0] - u[0] * v[2];
      let nz = u[0] * v[1] - u[1] * v[0];
      const ctr = f.reduce<V3>(
        (acc, i) => [acc[0] + R3[i][0] / f.length, acc[1] + R3[i][1] / f.length, acc[2] + R3[i][2] / f.length],
        [0, 0, 0],
      );
      // Outward, whatever the winding: the solid is centred on the origin.
      if (nx * ctr[0] + ny * ctr[1] + nz * ctr[2] < 0) {
        nx = -nx;
        ny = -ny;
        nz = -nz;
      }
      const m = Math.hypot(nx, ny, nz) || 1;
      nx /= m;
      ny /= m;
      nz /= m;
      const visible = nx * -ctr[0] + ny * -ctr[1] + nz * (CAM - ctr[2]) > 0;
      const lambert = Math.max(0, nx * LIGHT[0] + ny * LIGHT[1] + nz * LIGHT[2]);
      return { f, visible, lambert, depth: ctr[2] };
    });

    // The light runs through the middle cross-section, z = 0.
    const mid = (i: number, j: number, k: number): Pt => {
      const [a, b] = [VERTS[i], VERTS[j]];
      return proj(rot([a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, 0]));
    };
    const E = mid(0, 1, 0.56);
    const X = mid(0, 2, 0.5);

    // The fan opens just outside the left face, whatever the rotation.
    const faceAng = Math.atan2(P[1].y - P[0].y, P[1].x - P[0].x);
    const aHi = faceAng + FAN_CLEAR + FAN_SPAN; // magenta, highest
    const w = FAN_SPAN / n;

    /** Distance from a point to the canvas edge along an angle. */
    const reach = (o: Pt, a: number) => {
      const dx = Math.cos(a);
      const dy = Math.sin(a);
      let best = Infinity;
      if (dx < -1e-6) best = Math.min(best, -o.x / dx);
      if (dx > 1e-6) best = Math.min(best, (W - o.x) / dx);
      if (dy < -1e-6) best = Math.min(best, -o.y / dy);
      if (dy > 1e-6) best = Math.min(best, (H - o.y) / dy);
      return Number.isFinite(best) ? Math.max(0, best) : W + H;
    };

    const rays = colors.map((_, i) => {
      const [a, b] = rayWindow(i);
      return easeInOut(seg(p, a, b));
    });
    const lit = rays.reduce((s, r) => s + r, 0) / n;
    const far = colors.map((_, i) => {
      const a1 = aHi - i * w;
      return Math.max(reach(E, a1), reach(E, a1 - w)) + 30;
    });
    const front = rays.map((r, i) => far[i] * (1 - r));

    const inner = easeOut(seg(p, INNER[0], INNER[1]));
    const beam = easeOut(seg(p, BEAM[0], BEAM[1]));
    const beamFull = reach(X, BEAM_ANGLE) + 40;
    const beamLen = beamFull * beam;
    const bdx = Math.cos(BEAM_ANGLE);
    const bdy = Math.sin(BEAM_ANGLE);
    const breath = beam >= 1 ? 0.9 + 0.1 * Math.sin(t * 1.15) : 1;
    const flashE = bump(p, INNER[0] + 0.005, 0.045) * 0.95;
    const flashX = bump(p, BEAM[0] + 0.008, 0.05);

    /* ---- The light, drawn once on screen and once into the bloom ---- */
    const drawFan = (g: CanvasRenderingContext2D) => {
      for (let i = 0; i < n; i++) {
        if (rays[i] <= 0) continue;
        const entry = rayEntries?.[i];
        if (entry) {
          // In the optical-bench layout, each ray leaves the exact mouth of
          // its service band. Measuring those mouths keeps the colour blocks
          // and the light physically continuous at every responsive size.
          const k = rays[i];
          const sx = -1;
          const sy = entry.y;
          const half = Math.max(1, entry.half - 0.5);
          const tip = 1.2;
          const fx = sx + (E.x - sx) * k;
          const fyTop = sy - half + (E.y - tip - (sy - half)) * k;
          const fyBottom = sy + half + (E.y + tip - (sy + half)) * k;
          const shimmer = 0.94 + 0.06 * Math.sin(t * 1.7 + i * 1.3);
          const grd = g.createLinearGradient(sx, sy, E.x, E.y);
          grd.addColorStop(0, `rgba(${rgb[i]},${0.9 * shimmer})`);
          grd.addColorStop(0.72, `rgba(${rgb[i]},${0.96 * shimmer})`);
          grd.addColorStop(1, `rgba(${rgb[i]},${0.78 * shimmer})`);
          g.fillStyle = grd;
          g.beginPath();
          g.moveTo(sx, sy - half);
          g.lineTo(fx, fyTop);
          g.lineTo(fx, fyBottom);
          g.lineTo(sx, sy + half);
          g.closePath();
          g.fill();

          if (k < 1) {
            const fy = (fyTop + fyBottom) / 2;
            const hr = 12 + Math.hypot(fx - sx, fy - sy) * 0.035;
            const hg = g.createRadialGradient(fx, fy, 0, fx, fy, hr);
            hg.addColorStop(0, `rgba(255,255,255,${0.75 * (1 - k * 0.6)})`);
            hg.addColorStop(0.3, `rgba(${rgb[i]},.6)`);
            hg.addColorStop(1, `rgba(${rgb[i]},0)`);
            g.globalCompositeOperation = 'lighter';
            g.fillStyle = hg;
            g.beginPath();
            g.arc(fx, fy, hr, 0, TAU);
            g.fill();
            g.globalCompositeOperation = 'source-over';
          }
          continue;
        }
        const a1 = aHi - i * w;
        const a0 = a1 - w;
        const R = far[i];
        const rf = Math.max(0.01, front[i]);
        // A hair of overlap so neighbouring bands never show a seam.
        const ov = 0.003;
        const shimmer = 0.94 + 0.06 * Math.sin(t * 1.7 + i * 1.3);
        const grd = g.createRadialGradient(E.x, E.y, 0, E.x, E.y, R);
        grd.addColorStop(0, `rgba(${rgb[i]},${shimmer})`);
        grd.addColorStop(0.45, `rgba(${rgb[i]},${0.92 * shimmer})`);
        grd.addColorStop(1, `rgba(${rgb[i]},.3)`);
        g.fillStyle = grd;
        g.beginPath();
        g.arc(E.x, E.y, R, a0 - ov, a1 + ov);
        g.arc(E.x, E.y, rf, a1 + ov, a0 - ov, true);
        g.closePath();
        g.fill();

        // The leading edge burns brighter while it travels.
        if (rays[i] < 1) {
          const am = a1 - w / 2;
          const hx = E.x + Math.cos(am) * rf;
          const hy = E.y + Math.sin(am) * rf;
          const hr = 18 + rf * 0.08;
          const hg = g.createRadialGradient(hx, hy, 0, hx, hy, hr);
          hg.addColorStop(0, `rgba(255,255,255,${0.75 * (1 - rays[i] * 0.6)})`);
          hg.addColorStop(0.3, `rgba(${rgb[i]},.6)`);
          hg.addColorStop(1, `rgba(${rgb[i]},0)`);
          g.globalCompositeOperation = 'lighter';
          g.fillStyle = hg;
          g.beginPath();
          g.arc(hx, hy, hr, 0, TAU);
          g.fill();
          g.globalCompositeOperation = 'source-over';
        }
      }
      // Where the spectrum gathers on the glass: whiter the more has arrived.
      if (lit > 0) {
        const r = 8 + 12 * lit;
        const eg = g.createRadialGradient(E.x, E.y, 0, E.x, E.y, r);
        eg.addColorStop(0, `rgba(255,255,255,${0.6 * lit})`);
        eg.addColorStop(1, 'rgba(255,255,255,0)');
        g.globalCompositeOperation = 'lighter';
        g.fillStyle = eg;
        g.beginPath();
        g.arc(E.x, E.y, r, 0, TAU);
        g.fill();
        g.globalCompositeOperation = 'source-over';
      }
    };

    const drawInner = (g: CanvasRenderingContext2D) => {
      if (inner <= 0) return;
      const ex = E.x + (X.x - E.x) * inner;
      const ey = E.y + (X.y - E.y) * inner;
      const len = Math.hypot(X.x - E.x, X.y - E.y) || 1;
      const nx = -(X.y - E.y) / len;
      const ny = (X.x - E.x) / len;
      const w0 = 1.6;
      const w1 = 1.6 + 3.2 * inner;
      g.globalCompositeOperation = 'lighter';
      // Faint spectral fringes on either side: the colours have not quite
      // finished becoming one.
      const fringe = (side: number, col: string) => {
        g.fillStyle = `rgba(${col},.55)`;
        g.beginPath();
        g.moveTo(E.x + nx * side * w0, E.y + ny * side * w0);
        g.lineTo(ex + nx * side * w1, ey + ny * side * w1);
        g.lineTo(ex + nx * side * (w1 + 1.3), ey + ny * side * (w1 + 1.3));
        g.lineTo(E.x + nx * side * (w0 + 0.6), E.y + ny * side * (w0 + 0.6));
        g.closePath();
        g.fill();
      };
      fringe(-1, rgb[0]);
      fringe(1, rgb[n - 1]);
      const lg = g.createLinearGradient(E.x, E.y, ex, ey);
      lg.addColorStop(0, 'rgba(255,255,255,.7)');
      lg.addColorStop(1, 'rgba(255,255,255,.98)');
      g.fillStyle = lg;
      g.beginPath();
      g.moveTo(E.x + nx * w0, E.y + ny * w0);
      g.lineTo(ex + nx * w1, ey + ny * w1);
      g.lineTo(ex - nx * w1, ey - ny * w1);
      g.lineTo(E.x - nx * w0, E.y - ny * w0);
      g.closePath();
      g.fill();
      g.globalCompositeOperation = 'source-over';
    };

    const drawBeam = (g: CanvasRenderingContext2D, glow: boolean) => {
      if (beam <= 0) return;
      const ex = X.x + bdx * beamLen;
      const ey = X.y + bdy * beamLen;
      const w0 = 6.5;
      const w1 = 6.5 + beamLen * 0.075;
      const quad = (k: number, style: string | CanvasGradient) => {
        g.fillStyle = style;
        g.beginPath();
        g.moveTo(X.x + bdy * w0 * k, X.y - bdx * w0 * k);
        g.lineTo(ex + bdy * w1 * k, ey - bdx * w1 * k);
        g.lineTo(ex - bdy * w1 * k, ey + bdx * w1 * k);
        g.lineTo(X.x - bdy * w0 * k, X.y + bdx * w0 * k);
        g.closePath();
        g.fill();
      };
      if (glow) {
        const gg = g.createLinearGradient(X.x, X.y, ex, ey);
        gg.addColorStop(0, `rgba(255,255,255,${0.34 * breath})`);
        gg.addColorStop(1, `rgba(255,255,255,${0.08 * breath})`);
        g.globalCompositeOperation = 'lighter';
        quad(2.6, gg);
        g.globalCompositeOperation = 'source-over';
      }
      const cg = g.createLinearGradient(X.x, X.y, ex, ey);
      cg.addColorStop(0, `rgba(255,255,255,${0.98 * breath})`);
      cg.addColorStop(1, `rgba(255,255,255,${0.86 * breath})`);
      quad(1, cg);
    };

    const drawFlashes = (g: CanvasRenderingContext2D) => {
      g.globalCompositeOperation = 'lighter';
      for (const [o, a, r] of [
        [E, flashE, S * 0.45],
        [X, flashX, S * 0.5],
      ] as Array<[Pt, number, number]>) {
        if (a <= 0) continue;
        const fg = g.createRadialGradient(o.x, o.y, 0, o.x, o.y, r);
        fg.addColorStop(0, `rgba(255,255,255,${a})`);
        fg.addColorStop(0.4, `rgba(255,255,255,${a * 0.3})`);
        fg.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = fg;
        g.beginPath();
        g.arc(o.x, o.y, r, 0, TAU);
        g.fill();
      }
      g.globalCompositeOperation = 'source-over';
    };

    /* ---- Glass ---- */
    const facePath = (g: CanvasRenderingContext2D, f: number[]) => {
      g.beginPath();
      f.forEach((vi, k) => (k ? g.lineTo(P[vi].x, P[vi].y) : g.moveTo(P[vi].x, P[vi].y)));
      g.closePath();
    };
    const fillFace = (face: (typeof faces)[number]) => {
      const ys = face.f.map((vi) => P[vi].y);
      const top = Math.min(...ys);
      const bot = Math.max(...ys);
      const a = face.visible ? (0.045 + 0.11 * face.lambert) * build : 0.022 * build;
      const gr = c.createLinearGradient(0, top, 0, bot);
      gr.addColorStop(0, `rgba(246,246,244,${a})`);
      gr.addColorStop(0.5, `rgba(170,190,255,${a * 0.55})`);
      gr.addColorStop(1, `rgba(246,246,244,${a * 0.22})`);
      c.fillStyle = gr;
      facePath(c, face.f);
      c.fill();
    };
    const strokeEdges = (front: boolean) => {
      EDGES.forEach(([i, j, fa, fb], k) => {
        const onFront = faces[fa].visible || faces[fb].visible;
        if (onFront !== front) return;
        // Each edge traces itself in turn while the prism builds.
        const d = clamp01(build * 1.9 - k * 0.1);
        if (d <= 0) return;
        const x1 = P[i].x + (P[j].x - P[i].x) * d;
        const y1 = P[i].y + (P[j].y - P[i].y) * d;
        const silhouette = faces[fa].visible !== faces[fb].visible;
        c.strokeStyle = front
          ? `rgba(246,246,244,${silhouette ? 0.9 : 0.5})`
          : 'rgba(246,246,244,.16)';
        c.lineWidth = front ? (silhouette ? 1.4 : 1) : 1;
        c.beginPath();
        c.moveTo(P[i].x, P[i].y);
        c.lineTo(x1, y1);
        c.stroke();
      });
    };

    /* ---- Paint ---- */
    // A soft halo around the glass, a hint of a stage.
    {
      const hr = S * 1.5;
      const hg = c.createRadialGradient(cx, cy, 0, cx, cy, hr);
      hg.addColorStop(0, `rgba(246,246,244,${0.06 * build + 0.05 * lit})`);
      hg.addColorStop(1, 'rgba(246,246,244,0)');
      c.fillStyle = hg;
      c.fillRect(0, 0, W, H);
    }

    // The floor under the prism picks up a smear of whatever light is in it.
    {
      const base = proj(rot([0, -H3 / 3, 0]));
      c.save();
      c.translate(base.x, base.y + S * 0.03);
      c.scale(1, 0.12);
      const fr = S * 0.95;
      const fg = c.createRadialGradient(0, 0, 0, 0, 0, fr);
      fg.addColorStop(0, `rgba(246,246,244,${0.1 * build + 0.12 * lit})`);
      fg.addColorStop(0.55, `rgba(${rgb[2]},${0.06 * lit})`);
      fg.addColorStop(1, 'rgba(246,246,244,0)');
      c.fillStyle = fg;
      c.beginPath();
      c.arc(0, 0, fr, 0, TAU);
      c.fill();
      c.restore();
    }

    const sorted = [...faces].sort((a, b) => a.depth - b.depth);
    sorted.filter((f) => !f.visible).forEach(fillFace);
    strokeEdges(false);

    drawFan(c);
    drawInner(c);

    sorted.filter((f) => f.visible).forEach(fillFace);

    // The glass lights up from inside once light is travelling through it.
    const glow = Math.max(lit * 0.5, inner);
    if (glow > 0) {
      const gx = (E.x + X.x) / 2;
      const gy = (E.y + X.y) / 2;
      const gr = S * 0.55;
      const ig = c.createRadialGradient(gx, gy, 0, gx, gy, gr);
      ig.addColorStop(0, `rgba(235,225,255,${0.2 * glow})`);
      ig.addColorStop(1, 'rgba(235,225,255,0)');
      c.save();
      facePath(c, FACES[0]);
      c.clip();
      c.globalCompositeOperation = 'lighter';
      c.fillStyle = ig;
      c.fillRect(gx - gr, gy - gr, gr * 2, gr * 2);
      c.restore();
    }

    strokeEdges(true);

    // A glint that slides down the lit edges now and then.
    if (build > 0.8) {
      const glint = ((t * 0.12) % 1.5) - 0.25;
      for (const [i, j] of [
        [0, 1],
        [0, 2],
      ]) {
        const g0 = clamp01(glint - 0.12);
        const g1 = clamp01(glint + 0.12);
        if (g1 <= g0) continue;
        const ax = P[i].x + (P[j].x - P[i].x) * g0;
        const ay = P[i].y + (P[j].y - P[i].y) * g0;
        const bx = P[i].x + (P[j].x - P[i].x) * g1;
        const by = P[i].y + (P[j].y - P[i].y) * g1;
        const sg = c.createLinearGradient(ax, ay, bx, by);
        sg.addColorStop(0, 'rgba(255,255,255,0)');
        sg.addColorStop(0.5, 'rgba(255,255,255,.95)');
        sg.addColorStop(1, 'rgba(255,255,255,0)');
        c.strokeStyle = sg;
        c.lineWidth = 2;
        c.beginPath();
        c.moveTo(ax, ay);
        c.lineTo(bx, by);
        c.stroke();
      }
    }
    // Pinpoints on the front corners.
    for (const vi of [0, 1, 2]) {
      const a = build * (vi === 0 ? 0.95 : 0.6);
      if (a <= 0) continue;
      const vg = c.createRadialGradient(P[vi].x, P[vi].y, 0, P[vi].x, P[vi].y, 7);
      vg.addColorStop(0, `rgba(255,255,255,${a})`);
      vg.addColorStop(1, 'rgba(255,255,255,0)');
      c.fillStyle = vg;
      c.beginPath();
      c.arc(P[vi].x, P[vi].y, 7, 0, TAU);
      c.fill();
    }

    drawBeam(c, true);
    drawFlashes(c);

    // Bloom.
    if (lit > 0 || beam > 0) {
      const bw = b1.c.width;
      const bh = b1.c.height;
      b1.x.setTransform(bw / W, 0, 0, bh / H, 0, 0);
      b1.x.clearRect(0, 0, W, H);
      drawFan(b1.x);
      drawInner(b1.x);
      drawBeam(b1.x, false);
      drawFlashes(b1.x);
      b2.x.clearRect(0, 0, b2.c.width, b2.c.height);
      b2.x.drawImage(b1.c, 0, 0, b2.c.width, b2.c.height);
      b3.x.clearRect(0, 0, b3.c.width, b3.c.height);
      b3.x.drawImage(b2.c, 0, 0, b3.c.width, b3.c.height);
      c.save();
      c.imageSmoothingEnabled = true;
      c.imageSmoothingQuality = 'high';
      c.globalCompositeOperation = 'screen';
      c.globalAlpha = 0.55;
      c.drawImage(b2.c, 0, 0, W, H);
      c.globalAlpha = 0.75;
      c.drawImage(b3.c, 0, 0, W, H);
      c.restore();
    }

    // Dust hanging in the air, only really visible where light crosses it.
    {
      const norm = (a: number) => ((a % TAU) + TAU) % TAU;
      const lo = norm(aHi - FAN_SPAN);
      c.globalCompositeOperation = 'lighter';
      for (const d of dust) {
        const x = ((((d.u + d.vx * t) % 1) + 1) % 1) * W;
        const y = ((((d.v + d.vy * t) % 1) + 1) % 1) * H;
        const tw = 0.55 + 0.45 * Math.sin(t * 1.9 + d.ph);
        let col = '246,246,244';
        let a = 0.05;

        const dx = x - E.x;
        const dy = y - E.y;
        const r = Math.hypot(dx, dy);
        const off = norm(Math.atan2(dy, dx) - lo);
        if (off < FAN_SPAN) {
          const i = n - 1 - Math.floor(off / w);
          if (i >= 0 && i < n && rays[i] > 0 && r >= front[i] && r <= far[i]) {
            col = rgb[i];
            a = 0.9;
          }
        }
        if (beam > 0) {
          const along = (x - X.x) * bdx + (y - X.y) * bdy;
          const perp = Math.abs((x - X.x) * bdy - (y - X.y) * bdx);
          if (along > 0 && along < beamLen && perp < 8 + along * 0.09) {
            col = '255,255,255';
            a = 0.8;
          }
        }
        c.fillStyle = `rgba(${col},${a * tw})`;
        c.beginPath();
        c.arc(x, y, d.r, 0, TAU);
        c.fill();
      }
      c.globalCompositeOperation = 'source-over';
    }

    const leads = rays.map((_, i) => {
      const am = aHi - i * w - w / 2;
      return { x: E.x, y: E.y, angle: am, front: front[i], room: reach(E, am) };
    });

    return {
      leads,
      tag: {
        x: X.x,
        y: X.y,
        angle: BEAM_ANGLE,
        room: beamFull - 40,
        opacity: seg(p, BEAM[0] + 0.06, BEAM[1] + 0.02),
      },
      rays,
    };
  }

  return { resize, render };
}

export type PrismScene = NonNullable<ReturnType<typeof createPrismScene>>;

/* FOCUS · motor de piezas para redes.
   Cada pieza es un SPEC con una lista de items. Cada item se crea una vez y
   se actualiza con renderAt(t): el frame es una función pura del tiempo, así
   el render cuadro por cuadro sale idéntico siempre (método de /brag-slim).
   Los gestos son los de la skill focus-identidad: rack focus, refracción RGB,
   haz y prisma, umbral, iris, anillos. Nada más. */

(function () {
  const F = (window.F = {});
  const W = 1080;
  let H = 1920;

  /* ---------- tiempo ---------- */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const p = (t, a, b) => (b <= a ? (t >= b ? 1 : 0) : clamp((t - a) / (b - a)));
  const out = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)); // ease-out-expo
  const inE = (x) => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10)); // ease-in-expo
  const io = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const lerp = (a, b, k) => a + (b - a) * k;
  Object.assign(F, { clamp, p, out, inE, io, lerp });

  /** Entrada y salida estándar: {a: entrada 0→1, b: salida 0→1, v: visible}. */
  function env(t, t0, t1, fin = 0.9, fout = 0.5) {
    const a = out(p(t, t0, t0 + fin));
    const b = t1 == null ? 0 : inE(p(t, t1 - fout, t1));
    return { a, b, v: a * (1 - b) };
  }
  F.env = env;

  const COLORS = { m: 'var(--magenta)', b: 'var(--blue-text)', g: 'var(--green)', w: 'var(--paper)', s: 'var(--g300)' };
  const HEX = { m: '#ff00ff', b: '#0033ff', g: '#00ff33' };
  F.COLORS = COLORS;

  function el(tag, cls, style, parent) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (style) Object.assign(e.style, style);
    if (parent) parent.appendChild(e);
    return e;
  }
  F.el = el;

  const pending = new Set();
  function watchImg(img) {
    if (img.complete && img.naturalWidth) return;
    const pr = img.decode().catch(() => {});
    pending.add(pr);
    pr.finally(() => pending.delete(pr));
  }

  /* ---------- marcado de texto ----------
     *palabra*   → énfasis en ExtraBold (la .em del sitio)
     ~palabra~   → serif itálica (bajadas y eyebrows, nunca en un enunciado)
     **palabra** → bold
     {m:palabra} {b:…} {g:…} {s:…} → color (magenta, azul, verde, gris)  */
  function parse(line) {
    const tokens = [];
    const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\{([mbgws]):([^}]+)\}|~([^~]+)~|([^\s*{~]+)|(\s+)/g;
    let m;
    while ((m = re.exec(line))) {
      if (m[1]) m[1].split(' ').forEach((w, i, a) => tokens.push({ w: w + (i < a.length - 1 ? ' ' : ''), bold: true }));
      else if (m[2]) m[2].split(' ').forEach((w, i, a) => tokens.push({ w: w + (i < a.length - 1 ? ' ' : ''), em: true }));
      else if (m[3]) m[4].split(' ').forEach((w, i, a) => tokens.push({ w: w + (i < a.length - 1 ? ' ' : ''), color: m[3] }));
      else if (m[5]) m[5].split(' ').forEach((w, i, a) => tokens.push({ w: w + (i < a.length - 1 ? ' ' : ''), serif: true }));
      else if (m[6]) tokens.push({ w: m[6] });
      else if (m[7] && tokens.length) tokens[tokens.length - 1].w += ' ';
    }
    return tokens;
  }

  /* ---------- items ---------- */

  /** Texto que entra en foco palabra por palabra (o por línea, o todo junto). */
  F.text = (o) => ({
    create(root) {
      const box = el('div', 'abs ' + (o.cls || 't-title'), {
        left: (o.x ?? 80) + 'px', width: (o.w ?? 920) + 'px', fontSize: (o.size ?? 110) + 'px',
        textAlign: o.align || 'left', color: COLORS[o.color] || o.color || 'var(--paper)', ...(o.style || {}),
      }, root);
      if (o.anchor === 'bottom') box.style.bottom = H - (o.y ?? 1400) + 'px';
      else if (o.anchor === 'center') { box.style.top = (o.y ?? 960) + 'px'; box.style.transform = 'translateY(-50%)'; }
      else box.style.top = (o.y ?? 400) + 'px';
      this.units = [];
      (o.lines || [o.text]).forEach((line, li) => {
        const ld = el('div', null, { display: 'block', ...(o.lineStyle ? o.lineStyle(li) : {}) }, box);
        const toks = parse(line);
        const lineUnits = [];
        toks.forEach((tk) => {
          const s = el('span', 'w', {}, ld);
          if (tk.serif) s.className += ' t-serif';
          if (tk.em) s.className += ' t-em';
          if (tk.bold) s.style.fontWeight = 700;
          if (tk.color) s.style.color = COLORS[tk.color];
          if (o.rgb) {
            s.classList.add('rgb');
            el('span', 'base', {}, s).textContent = tk.w;
            ['m', 'b', 'g'].forEach((c) => {
              const cp = el('span', null, { color: HEX[c] }, s);
              cp.textContent = tk.w;
            });
          } else s.textContent = tk.w;
          lineUnits.push(s);
        });
        if (o.by === 'line') this.units.push({ els: lineUnits, li });
        else lineUnits.forEach((s) => this.units.push({ els: [s], li }));
      });
      if (o.by === 'all') this.units = [{ els: this.units.flatMap((u) => u.els), li: 0 }];
      this.box = box;
    },
    update(t) {
      const st = o.stagger ?? 0.075;
      const blur = o.blur ?? 16;
      this.units.forEach((u, i) => {
        const ti = o.t0 + i * st + (o.lineDelay ? u.li * o.lineDelay : 0);
        const { a, b, v } = env(t, ti, o.t1, o.fin ?? 0.9, o.fout ?? 0.5);
        let bl = (1 - a) * blur + b * blur + (o.defocus ? o.defocus(t, u.li, i) : 0);
        if (o.lens) {
          // Lente: cada palabra se enfoca según su distancia a la retícula.
          if (!u.c) { const r = u.els[0].getBoundingClientRect(); u.c = { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
          const L = o.lens.path(t);
          const d = Math.hypot(u.c.x - L.x, u.c.y - L.y);
          const k = F.clamp((d - (o.lens.r ?? 180) * 0.4) / (o.lens.r ?? 180));
          bl += k * (o.lens.max ?? 12) * (o.lens.on ? o.lens.on(t) : 1);
          if (o.lens.keep) bl += o.lens.keep(t, i);
        }
        u.els.forEach((s) => {
          s.style.opacity = v * (o.dim ? o.dim(t, u.li, i) : 1);
          s.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none';
          s.style.transform = `translateY(${((1 - a) * (o.rise ?? 14)).toFixed(2)}px)`;
          if (o.rgb) {
            const amp = o.rgbAmp ?? 26;
            const d = o.rgbCurve ? o.rgbCurve(t) : amp * (1 - a) + amp * b;
            const k = s.children;
            k[1].style.transform = `translate(${-d}px, ${d * 0.25}px)`;
            k[2].style.transform = `translate(${d * 0.7}px, ${-d * 0.45}px)`;
            k[3].style.transform = `translate(${d * 0.3}px, ${d * 0.6}px)`;
          }
        });
      });
    },
  });

  /** Imagen con foco de entrada, push-in lento y tratamiento opcional de fondo. */
  F.image = (o) => ({
    create(root) {
      const wrap = el('div', 'abs' + (o.frame ? ' frame1' : ''), {
        left: (o.x ?? 0) + 'px', top: (o.y ?? 0) + 'px', width: (o.w ?? W) + 'px', height: (o.h ?? H) + 'px', overflow: 'hidden',
        borderRadius: (o.radius ?? 0) + 'px', ...(o.style || {}),
      }, root);
      const img = el('img', null, { width: '100%', height: '100%', objectFit: o.fit || 'cover', objectPosition: o.pos || 'center', display: 'block' }, wrap);
      img.src = o.src;
      watchImg(img);
      this.wrap = wrap; this.img = img;
    },
    update(t) {
      const { a, b, v } = env(t, o.t0, o.t1, o.fin ?? 1.1, o.fout ?? 0.5);
      const z = o.zoom ? lerp(o.zoom[0], o.zoom[1], p(t, o.t0, o.t1 ?? o.t0 + 6)) : 1;
      const blurIn = o.blur ?? 18;
      let bl = (1 - a) * blurIn + b * blurIn;
      let f = '';
      if (o.treat === 'bg') f = 'grayscale(1) brightness(0.3) contrast(1.25) ';
      if (o.treat === 'gray') f = 'grayscale(1) contrast(1.1) ';
      if (o.treat === 'dim') f = 'brightness(0.5) contrast(1.15) saturate(1.1) ';
      if (o.focusAt) bl += (1 - out(p(t, o.focusAt, o.focusAt + 1))) * (o.focusFrom ?? 12);
      this.wrap.style.opacity = v * (o.opacity ?? 1);
      this.img.style.filter = f + (bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : '');
      this.img.style.transform = `scale(${z.toFixed(4)})` + (o.pan ? ` translateY(${lerp(o.pan[0], o.pan[1], io(p(t, o.t0, o.t1))).toFixed(1)}px)` : '');
    },
  });

  /** Secuencia de cuadros (capturas del sitio real), a fps propio. */
  F.seq = (o) => ({
    create(root) {
      const wrap = el('div', 'abs' + (o.frame ? ' frame1' : ''), {
        left: (o.x ?? 0) + 'px', top: (o.y ?? 0) + 'px', width: (o.w ?? W) + 'px', height: (o.h ?? H) + 'px', overflow: 'hidden',
        borderRadius: (o.radius ?? 0) + 'px',
      }, root);
      this.img = el('img', null, { width: '100%', height: '100%', objectFit: 'cover', objectPosition: o.pos || 'center', display: 'block' }, wrap);
      this.wrap = wrap; this.cur = -1;
    },
    update(t) {
      const { a, b, v } = env(t, o.t0, o.t1, o.fin ?? 0.8, o.fout ?? 0.5);
      this.wrap.style.opacity = v;
      const bl = (1 - a) * 14 + b * 14;
      this.wrap.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none';
      if (o.zoom) this.img.style.transform = `scale(${lerp(o.zoom[0], o.zoom[1], p(t, o.t0, o.t1)).toFixed(4)})`;
      const fps = o.fps ?? 30;
      const n = clamp(Math.floor((t - o.t0 + (o.offset ?? 0)) * fps * (o.rate ?? 1)), 0, o.count - 1);
      if (n !== this.cur && v > 0) {
        this.cur = n;
        this.img.src = `${o.dir}/${String(n + 1).padStart(4, '0')}.jpg`;
        watchImg(this.img);
      }
    },
  });

  /** Anillos concéntricos (rings.svg) con marcas para que la rotación se lea. */
  F.rings = (o) => ({
    create(root) {
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      const size = o.size ?? 1400;
      svg.setAttribute('viewBox', '0 0 800 800');
      Object.assign(svg.style, { position: 'absolute', left: (o.cx ?? 540) - size / 2 + 'px', top: (o.cy ?? 960) - size / 2 + 'px', width: size + 'px', height: size + 'px', color: o.color || 'var(--g700)', overflow: 'visible' });
      const radii = o.radii || [60, 110, 170, 240, 320, 390];
      this.gs = radii.map((r, i) => {
        const g = document.createElementNS(ns, 'g');
        const c = document.createElementNS(ns, 'circle');
        c.setAttribute('cx', 400); c.setAttribute('cy', 400); c.setAttribute('r', r);
        c.setAttribute('fill', 'none'); c.setAttribute('stroke', 'currentColor'); c.setAttribute('stroke-width', o.stroke ?? 1.5);
        if (o.dashed && i % 2) c.setAttribute('stroke-dasharray', '2 10');
        g.appendChild(c);
        // una marca por anillo: sin ella la rotación no se ve
        const tick = document.createElementNS(ns, 'circle');
        tick.setAttribute('cx', 400 + r); tick.setAttribute('cy', 400); tick.setAttribute('r', 3.2);
        tick.setAttribute('fill', i === (o.accentRing ?? -1) ? HEX[o.accent || 'm'] : 'currentColor');
        g.appendChild(tick);
        svg.appendChild(g);
        return g;
      });
      root.appendChild(svg);
      this.svg = svg;
    },
    update(t) {
      const { v } = env(t, o.t0, o.t1, o.fin ?? 1.4, o.fout ?? 0.6);
      this.svg.style.opacity = v * (o.opacity ?? 1);
      const pulse = o.pulse ? 1 + 0.03 * Math.sin(t * 2 * Math.PI / o.pulse) : 1;
      const sc = (o.scale ? o.scale(t) : 1) * pulse;
      this.svg.style.transform = `scale(${sc.toFixed(4)})`;
      this.gs.forEach((g, i) => {
        const dir = i % 2 ? -1 : 1;
        const tt = o.time ? o.time(t) : t;
        const deg = (dir * 360 * tt) / ((o.period ?? 50) * (1 + i * 0.25)) + i * 47;
        g.setAttribute('transform', `rotate(${deg.toFixed(3)} 400 400)`);
      });
    },
  });

  /** Retícula de enfoque que busca y fija. */
  F.reticle = (o) => ({
    create(root) {
      const img = el('img', 'abs', { width: (o.size ?? 520) + 'px', height: (o.size ?? 520) + 'px', filter: 'invert(1)', opacity: 0 }, root);
      img.src = '/design-system/assets/graficos/reticula.svg';
      watchImg(img);
      this.img = img;
    },
    update(t) {
      const { v } = env(t, o.t0, o.t1, 0.6, 0.4);
      const pos = o.path(t);
      const s = o.size ?? 520;
      this.img.style.opacity = v * 0.85;
      this.img.style.left = pos.x - s / 2 + 'px';
      this.img.style.top = pos.y - s / 2 + 'px';
      this.img.style.transform = `scale(${(pos.s ?? 1).toFixed(3)}) rotate(${(pos.r ?? 0).toFixed(2)}deg)`;
    },
  });

  /** Caja libre (fondos, reglas, tarjetas). style puede ser función de t. */
  F.box = (o) => ({
    create(root) {
      this.e = el('div', 'abs ' + (o.cls || ''), { left: (o.x ?? 0) + 'px', top: (o.y ?? 0) + 'px', width: (o.w ?? W) + 'px', height: (o.h ?? 2) + 'px', ...(o.style || {}) }, root);
      if (o.html) this.e.innerHTML = o.html;
    },
    update(t) {
      const { a, b, v } = env(t, o.t0, o.t1, o.fin ?? 0.8, o.fout ?? 0.4);
      this.e.style.opacity = v * (o.opacity ?? 1);
      if (o.blur !== false) { const bl = (1 - a) * (o.blurIn ?? 10) + b * 10; this.e.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none'; }
      if (o.anim) o.anim(t, this.e, { a, b, v });
    },
  });

  /** Grupo: contenedor con entrada/salida propia y máscara opcional
      (clip: 'iris' | 'sweepX' | 'sweepY' | función). */
  F.group = (o) => ({
    create(root) {
      this.e = el('div', 'layer', {}, root);
      this.kids = o.children.map((c) => { c.create(this.e); return c; });
      if (o.clip === 'sweepX' || o.clip === 'sweepY') {
        this.line = el('div', 'abs', o.clip === 'sweepX'
          ? { top: 0, width: '2px', height: H + 'px', background: '#fff', boxShadow: '0 0 24px 4px rgba(255,255,255,.55)' }
          : { left: 0, height: '2px', width: W + 'px', background: '#fff', boxShadow: '0 0 24px 4px rgba(255,255,255,.55)' }, root);
      }
    },
    update(t) {
      const { a, b, v } = env(t, o.t0, o.t1, o.fin ?? 0.01, o.fout ?? 0.6);
      const on = t >= o.t0 - 0.01 && (o.t1 == null || t <= o.t1 + 0.01);
      this.e.style.display = on ? 'block' : 'none';
      if (on) {
        const bl = (o.inBlur ? (1 - a) * o.inBlur : 0) + (o.outBlur ?? 0) * b;
        this.e.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none';
        this.e.style.opacity = o.fade === false ? 1 : v;
        this.kids.forEach((k) => k.update(t));
        const k = o.clipIn ? io(p(t, o.clipIn[0], o.clipIn[1])) : 1;
        if (o.clip === 'iris') {
          const r = k * 1200;
          this.e.style.clipPath = `circle(${r.toFixed(1)}px at ${o.cx ?? 540}px ${o.cy ?? 960}px)`;
        } else if (o.clip === 'sweepX') {
          this.e.style.clipPath = `inset(0 ${((1 - k) * 100).toFixed(2)}% 0 0)`;
          this.line.style.left = (k * W).toFixed(1) + 'px';
          this.line.style.opacity = k > 0 && k < 1 ? 1 : 0;
        } else if (o.clip === 'sweepY') {
          this.e.style.clipPath = `inset(0 0 ${((1 - k) * 100).toFixed(2)}% 0)`;
          this.line.style.top = (k * H).toFixed(1) + 'px';
          this.line.style.opacity = k > 0 && k < 1 ? 1 : 0;
        } else if (typeof o.clip === 'function') this.e.style.clipPath = o.clip(t);
      } else if (this.line) this.line.style.opacity = 0;
    },
  });

  /** Haz y prisma en canvas. mode 'split': un haz blanco entra y se abre en
      bandas. mode 'merge': las bandas convergen y sale un haz blanco. */
  F.beam = (o) => ({
    create(root) {
      const c = el('canvas', 'abs', { left: 0, top: 0 }, root);
      c.width = W; c.height = H;
      this.c = c; this.ctx = c.getContext('2d');
    },
    update(t) {
      const { v } = env(t, o.t0, o.t1, 0.3, o.fout ?? 0.6);
      const ctx = this.ctx;
      ctx.clearRect(0, 0, W, H);
      this.c.style.opacity = v;
      if (v <= 0) return;
      const P = o.prism; // {x,y,size}
      const S = o.source; // punto de entrada del haz blanco
      const X = o.exit; // punto de salida (merge)
      const cols = o.colors;
      const T = o.targets;
      const kBeam = io(p(t, o.beam[0], o.beam[1]));
      const kBands = io(p(t, o.bands[0], o.bands[1]));
      const glow = (col, w, a) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.globalAlpha = a; };
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      const line = (x1, y1, x2, y2, col, w) => {
        [[w * 7, 0.07], [w * 3, 0.18], [w, 1]].forEach(([lw, al]) => { glow(col, lw, al); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); });
      };
      const breath = o.breath ? 1 + 0.12 * Math.sin(t * 2.2) : 1;
      if (o.mode === 'split') {
        if (kBeam > 0) line(S.x, S.y, lerp(S.x, P.x, kBeam), lerp(S.y, P.y, kBeam), '#ffffff', 4 * breath);
        if (kBands > 0) T.forEach((tg, i) => {
          const d = o.stagger ? clamp(kBands * (1 + o.stagger * T.length) - i * o.stagger) : kBands;
          if (d > 0) line(P.x, P.y, lerp(P.x, tg.x, d), lerp(P.y, tg.y, d), cols[i], (o.bandW ?? 5) * breath);
        });
      } else {
        if (kBands > 0) T.forEach((tg, i) => {
          line(tg.x, tg.y, lerp(tg.x, P.x, kBands), lerp(tg.y, P.y, kBands), cols[i], (o.bandW ?? 5) * breath);
        });
        if (kBeam > 0) {
          line(P.x, P.y, lerp(P.x, X.x, kBeam), lerp(P.y, X.y, kBeam), '#ffffff', 6 * breath);
          const bloom = out(p(t, o.beam[1] - 0.2, o.beam[1] + 0.8));
          if (bloom > 0) {
            const g = ctx.createRadialGradient(X.x, X.y, 0, X.x, X.y, 260 * bloom);
            g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(0.25, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)');
            ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(X.x, X.y, 260 * bloom, 0, 7); ctx.fill();
          }
        }
      }
      // prisma
      const kp = out(p(t, o.t0, o.t0 + 0.8));
      if (P.size) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = kp * 0.95;
        const s = P.size, rot = (P.rot ?? 0) * Math.PI / 180;
        const pts = [0, 1, 2].map((i) => { const ang = rot - Math.PI / 2 + (i * 2 * Math.PI) / 3; return [P.x + s * Math.cos(ang), P.y + s * Math.sin(ang)]; });
        ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath();
        const g = ctx.createLinearGradient(P.x - s, P.y - s, P.x + s, P.y + s);
        g.addColorStop(0, 'rgba(255,255,255,.10)'); g.addColorStop(1, 'rgba(255,255,255,.02)');
        ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = 'rgba(246,246,244,.85)'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#fff'; pts.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill(); });
      }
      ctx.globalAlpha = 1;
    },
  });

  /** Logo oficial con entrada desde desenfoque o desde tres capas RGB. */
  F.logo = (o) => ({
    create(root) {
      const w = o.w ?? 420;
      this.box = el('div', 'abs', { left: (o.x ?? (W - w) / 2) + 'px', top: (o.y ?? 860) + 'px', width: w + 'px', height: w * 0.35 + 'px' }, root);
      this.layers = (o.rgb ? ['m', 'b', 'g'] : ['w']).map((c) => {
        const d = el('div', 'fill', { mixBlendMode: 'screen' }, this.box);
        const img = el('img', null, { width: '100%', display: 'block' }, d);
        img.src = '/design-system/logos/focus-logo-light.png';
        watchImg(img);
        if (c !== 'w') {
          // teñir el logo blanco con el acento: la imagen hace de máscara
          d.style.background = HEX[c];
          d.style.webkitMaskImage = 'url(/design-system/logos/focus-logo-light.png)';
          d.style.webkitMaskSize = '100% auto';
          d.style.webkitMaskRepeat = 'no-repeat';
          img.style.visibility = 'hidden';
        }
        return d;
      });
      if (o.sub) {
        this.sub = el('div', 'abs t-light-it t-caps', { left: 0, width: w + 'px', top: w * 0.36 + 'px', fontSize: w * 0.071 + 'px', letterSpacing: '0.01em', color: 'var(--paper)', whiteSpace: 'nowrap' }, this.box);
        this.sub.textContent = o.sub;
      }
    },
    update(t) {
      const { a, b, v } = env(t, o.t0, o.t1, o.fin ?? 1.2, o.fout ?? 0.5);
      this.box.style.opacity = v;
      const bl = (1 - a) * 18 + b * 12;
      this.box.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none';
      if (o.rgb) {
        const d = (1 - a) * 40;
        this.layers[0].style.transform = `translate(${-d}px,${d * 0.2}px)`;
        this.layers[1].style.transform = `translate(${d * 0.8}px,${-d * 0.4}px)`;
        this.layers[2].style.transform = `translate(${d * 0.2}px,${d * 0.7}px)`;
      }
      if (this.sub) this.sub.style.opacity = out(p(t, o.t0 + 0.6, o.t0 + 1.4));
    },
  });

  /* ---------- montaje ---------- */
  function noise(seed) {
    const c = document.createElement('canvas');
    c.width = 540; c.height = 960;
    const x = c.getContext('2d');
    const d = x.createImageData(540, 960);
    let s = seed * 9973 + 17;
    for (let i = 0; i < d.data.length; i += 4) {
      s = (s * 16807) % 2147483647;
      const n = s % 255;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = n; d.data[i + 3] = 255;
    }
    x.putImageData(d, 0, 0);
    return c.toDataURL();
  }

  F.mount = function (spec) {
    const stage = document.getElementById('stage');
    if (spec.format === 'post') { stage.classList.add('post'); H = 1350; }
    const items = spec.items.map((it) => { it.create(stage); return it; });
    const vig = el('div', 'vignette', {}, stage);
    const grain = el('div', 'grain', {}, stage);
    const tiles = [0, 1, 2, 3, 4, 5].map(noise);
    window.SPEC = spec;
    window.renderAt = async (t) => {
      items.forEach((it) => it.update(t));
      grain.style.backgroundImage = `url(${tiles[Math.floor(t * 24) % tiles.length]})`;
      if (spec.noVignette) vig.style.display = 'none';
      await document.fonts.ready;
      while (pending.size) await Promise.all([...pending]);
      await new Promise((r) => requestAnimationFrame(() => r()));
    };
    window.__ready = document.fonts.ready.then(() => Promise.all([...pending]));
  };
})();

/* ---------- piezas estáticas (carruseles e historias) ----------
   Cada cuadro vive en [i, i+1) y se fotografía asentado en i + 0.97. */
F.deck = function (spec) {
  const { group, text } = F;
  const n = spec.frames.length;
  const items = [];
  spec.frames.forEach((make, i) => {
    const kids = make(i);
    if (spec.counter !== false) kids.push(text({ lines: [`{s:${String(i + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}}`], cls: 't-mono', size: 22, x: 780, w: 220, align: 'right', y: spec.format === 'post' ? 1250 : 1560, t0: i, by: 'all' }));
    items.push(group({ t0: i, t1: i + 1, fin: 0.01, fout: 0.01, children: kids }));
  });
  F.mount({ ...spec, items, dur: n, slides: spec.frames.map((_, i) => i + 0.97) });
};

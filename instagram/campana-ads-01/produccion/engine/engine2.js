/* FOCUS · motor de anuncios (extensión del motor de la tanda orgánica).
   Mismo principio: cada cuadro es una función pura del tiempo. Suma lo que
   un anuncio de 45 s necesita y una placa de texto no alcanza a dar:
   - F.gl     : un shader GLSL a pantalla completa (o en un rectángulo). Los
                fenómenos ópticos del atlas (cáustica, difracción, exposición
                larga, superposición...) viven en engine/glsl.js.
   - F.three  : una escena 3D con vidrio físico, luz y bloom (engine/scenes/).
   - F.label  : rótulos técnicos, como datos de cámara.
   - F.ui     : piezas de interfaz (ventana, terminal, tarjetas) para la línea
                de software, dibujadas con la tipografía de la marca.
   - F.end    : la placa de cierre de anuncio, igual en los diez.
   - F.safe   : guía de zonas seguras de Reels (solo en cuadros de control). */
(function () {
  const W = 1080;
  const H = 1920;
  const { env, el, p, out, io, clamp, lerp } = F;

  /* Variantes A/B: el mismo archivo de anuncio produce la versión A o la B
     (stage.html fija F.variant). F.B es true en la variante B y F.vname
     agrega el sufijo al nombre del archivo. */
  Object.defineProperty(F, 'B', { get: () => F.variant === 'b' });
  F.vname = (n) => (F.variant ? `${n}_${F.variant}` : n);

  /* Promesas que el render espera antes de fotografiar un cuadro. */
  const waits = new Set();
  F.wait = (pr) => { waits.add(pr); pr.finally(() => waits.delete(pr)); return pr; };

  /* ---------------- GLSL ---------------- */
  const VERT = `#version 300 es
  in vec2 a; out vec2 vUv; void main(){ vUv = a*.5+.5; gl_Position = vec4(a,0.,1.); }`;

  function compile(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) + '\n' + src.split('\n').map((l, i) => i + 1 + ': ' + l).join('\n'));
    return s;
  }

  /** Shader a pantalla completa. o.frag es el cuerpo GLSL (ver glsl.js);
      o.u(t) devuelve uniforms extra; o.tex = {nombre: url} para imágenes. */
  F.gl = (o) => ({
    create(root) {
      const w = o.w ?? W, h = o.h ?? H, sc = o.scale ?? 1;
      const c = el('canvas', 'abs', { left: (o.x ?? 0) + 'px', top: (o.y ?? 0) + 'px', width: w + 'px', height: h + 'px', mixBlendMode: o.blend || 'normal' }, root);
      c.width = Math.round(w * sc); c.height = Math.round(h * sc);
      const gl = c.getContext('webgl2', { preserveDrawingBuffer: true, premultipliedAlpha: false, alpha: true });
      const prog = gl.createProgram();
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, F.GLSL.wrap(o.frag)));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'a');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      this.gl = gl; this.prog = prog; this.c = c; this.U = {};
      this.texUnits = {};
      Object.entries(o.tex || {}).forEach(([name, src], i) => {
        const tex = gl.createTexture();
        this.texUnits[name] = { tex, i, size: [1, 1] };
        const img = new Image();
        img.src = src;
        F.wait(img.decode().then(() => {
          gl.activeTexture(gl.TEXTURE0 + i);
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          gl.generateMipmap(gl.TEXTURE_2D);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          this.texUnits[name].size = [img.naturalWidth, img.naturalHeight];
        }).catch((e) => console.error('tex', src, e)));
      });
    },
    set(name, v) {
      const gl = this.gl;
      const l = this.U[name] ?? (this.U[name] = gl.getUniformLocation(this.prog, name));
      if (l == null) return;
      if (typeof v === 'number') gl.uniform1f(l, v);
      else if (v.length === 2) gl.uniform2fv(l, v);
      else if (v.length === 3) gl.uniform3fv(l, v);
      else if (v.length === 4) gl.uniform4fv(l, v);
    },
    update(t) {
      const { a, b, v } = env(t, o.t0, o.t1, o.fin ?? 0.8, o.fout ?? 0.6);
      const on = t >= o.t0 - 0.02 && (o.t1 == null || t <= o.t1 + 0.02);
      this.c.style.display = on && v > 0.001 ? 'block' : 'none';
      if (!on) return;
      this.c.style.opacity = (o.opacity ?? 1) * (o.hardIn ? 1 - b : v);
      const bl = o.blurIn === false ? 0 : (1 - a) * (o.blurIn ?? 0) + b * (o.blurOut ?? 0);
      this.c.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none';
      const gl = this.gl;
      gl.viewport(0, 0, this.c.width, this.c.height);
      this.set('uT', t - o.t0);
      this.set('uAbs', t);
      this.set('uRes', [this.c.width, this.c.height]);
      this.set('uIn', a);
      this.set('uOut', b);
      Object.entries(this.texUnits).forEach(([name, u]) => {
        gl.activeTexture(gl.TEXTURE0 + u.i);
        gl.bindTexture(gl.TEXTURE_2D, u.tex);
        gl.uniform1i(gl.getUniformLocation(this.prog, name), u.i);
        this.set(name + 'Size', u.size);
      });
      if (o.u) Object.entries(o.u(t, t - o.t0)).forEach(([k, val]) => this.set(k, val));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
  });

  /* ---------------- escenas 3D ---------------- */
  /** o.scene: nombre de módulo en engine/scenes/ que exporta
      create({THREE, addons, canvas, W, H, opts}) → {update(t, local)}. */
  F.three = (o) => ({
    create(root) {
      const w = o.w ?? W, h = o.h ?? H;
      this.c = el('canvas', 'abs', { left: (o.x ?? 0) + 'px', top: (o.y ?? 0) + 'px', width: w + 'px', height: h + 'px', mixBlendMode: o.blend || 'normal' }, root);
      this.c.width = w; this.c.height = h;
      this.ready = false;
      F.wait((async () => {
        const THREE = await import('three');
        const mod = await import(`./scenes/${o.scene}.js`);
        this.scene = await mod.create({ THREE, canvas: this.c, W: w, H: h, opts: o.opts || {}, wait: F.wait });
        this.ready = true;
      })().catch((e) => console.error('three', o.scene, e.stack || e)));
    },
    update(t) {
      const { a, b, v } = env(t, o.t0, o.t1, o.fin ?? 0.9, o.fout ?? 0.6);
      const on = t >= o.t0 - 0.02 && (o.t1 == null || t <= o.t1 + 0.02) && v > 0.001;
      this.c.style.display = on ? 'block' : 'none';
      if (!on || !this.ready) return;
      this.c.style.opacity = (o.opacity ?? 1) * v;
      const bl = (1 - a) * (o.blurIn ?? 14) + b * (o.blurOut ?? 10);
      this.c.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none';
      this.scene.update(t, t - o.t0);
    },
  });

  /* ---------------- rótulos técnicos ---------------- */
  /** Datos de cámara chicos, en gris: '01 / 10', 'f/1.4', coordenadas. */
  F.label = (o) => F.text({
    cls: 't-mono', size: o.size ?? 24, by: 'all', blur: 6, rise: 0, fin: 0.5,
    color: o.color || 's', w: o.w ?? 600, align: o.align || 'left', ...o,
    lines: o.lines || [o.text],
  });

  /** Regla fina con marca de corte en los extremos (tarjetas y encuadres). */
  F.rule = (o) => F.box({
    x: o.x ?? 80, y: o.y, w: o.w ?? 920, h: 1, t0: o.t0, t1: o.t1, blur: false, fin: 0.6,
    style: { background: o.color || 'var(--g700)', transformOrigin: 'left center' },
    anim: (t, e) => { e.style.transform = `scaleX(${out(p(t, o.t0, o.t0 + (o.grow ?? 0.9))).toFixed(4)})`; },
  });

  /* ---------------- interfaz (línea de software) ---------------- */
  /** Contenedor de interfaz: marco de 1 px, sin sombras ni esquinas redondas
      (regla de la marca). html es una función (t) → string o un string. */
  F.ui = (o) => ({
    create(root) {
      this.e = el('div', 'abs ui ' + (o.cls || ''), {
        left: (o.x ?? 80) + 'px', top: (o.y ?? 400) + 'px', width: (o.w ?? 920) + 'px', height: o.h ? o.h + 'px' : 'auto', ...(o.style || {}),
      }, root);
      if (typeof o.html === 'string') this.e.innerHTML = o.html;
      this.last = null;
    },
    update(t) {
      const { a, b, v } = env(t, o.t0, o.t1, o.fin ?? 0.8, o.fout ?? 0.5);
      this.e.style.display = v > 0.001 ? 'block' : 'none';
      if (v <= 0.001) return;
      this.e.style.opacity = v;
      const bl = (1 - a) * (o.blurIn ?? 12) + b * 10;
      this.e.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none';
      this.e.style.transform = `translateY(${((1 - a) * (o.rise ?? 18)).toFixed(2)}px)` + (o.tf ? ' ' + o.tf(t) : '');
      if (typeof o.html === 'function') {
        const h = o.html(t, t - o.t0);
        if (h !== this.last) { this.e.innerHTML = h; this.last = h; }
      }
      if (o.anim) o.anim(t, this.e, { a, b, v });
    },
  });

  /** Inclinación 3D de una pieza de interfaz: entra girada y se asienta
      con una deriva lenta, como una cámara que la recorre. Para o.tf. */
  F.tilt = (t0, t1, o = {}) => (t) => {
    const k = io(p(t, t0, t1));
    const e = out(p(t, t0, t0 + 1.1));
    const rx = lerp(o.rx0 ?? 16, o.rx1 ?? 3, e) + (o.drift ?? 2.5) * Math.sin((t - t0) * 0.7);
    const ry = lerp(o.ry0 ?? -10, o.ry1 ?? 6, k);
    const sc = lerp(o.s0 ?? 0.93, o.s1 ?? 1.0, k);
    return `perspective(1800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
  };

  /** Texto que se escribe carácter por carácter (terminal, prompt, código). */
  F.typed = (s, t, t0, cps = 38) => {
    const n = Math.max(0, Math.floor((t - t0) * cps));
    return s.slice(0, n);
  };
  F.caret = (t) => (Math.floor(t * 2.2) % 2 ? '' : '<span class="caret"></span>');
  F.esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  /* ---------------- cierre de anuncio ---------------- */
  /** Placa de cierre común: línea de CTA, destino, logo y rótulo de serie.
      Todo dentro de la zona segura de Reels (y 300-1240). */
  F.end = (o) => {
    const t0 = o.t0;
    const items = [
      F.box({ x: 0, y: 0, w: W, h: H, t0, fin: 0.9, blur: false, style: { background: 'rgba(10,10,11,.86)' } }),
      F.text({ lines: o.lines, size: o.size ?? 104, x: 80, y: o.y ?? 560, w: 900, t0: t0 + 0.25, by: 'word', stagger: 0.09, rgb: o.rgb }),
      F.rule({ x: 84, y: (o.y ?? 560) + (o.lines.length * (o.size ?? 104) * 1.04) + 56, w: 360, t0: t0 + 0.9, color: 'var(--g400)' }),
      F.text({ lines: [o.cta], cls: 't-body', size: 42, x: 84, y: (o.y ?? 560) + (o.lines.length * (o.size ?? 104) * 1.04) + 100, w: 900, t0: t0 + 1.0, by: 'word', stagger: 0.05 }),
      F.text({ lines: [`{s:${o.dest}}`], cls: 't-body', size: 34, x: 84, y: (o.y ?? 560) + (o.lines.length * (o.size ?? 104) * 1.04) + 186, w: 900, t0: t0 + 1.3, by: 'all' }),
      F.logo({ t0: t0 + 1.5, w: 280, x: 84, y: 1110, rgb: !!o.logoRgb }),
      F.label({ text: o.serie || '', x: 540, w: 460, align: 'right', y: 1150, t0: t0 + 1.8 }),
    ];
    return F.group({ t0, t1: o.t1, children: items });
  };

  /* ---------------- composición ---------------- */
  /** Lockup de campaña: TÍTULO Bold mayúsculas + bajada Light Italic al 40 %. */
  F.lockup = (o) => {
    const size = o.size ?? 120;
    return F.group({ t0: o.t0, t1: o.t1, fout: o.fout ?? 0.5, children: [
      F.text({ lines: [o.title], cls: 't-lock', size, x: o.x ?? 80, y: o.y ?? 600, w: 920, t0: o.t0, t1: o.t1, by: 'word', stagger: 0.08, rgb: o.rgb }),
      F.text({ lines: [o.sub], cls: 't-lock-sub', size: size * 0.42, x: (o.x ?? 80) + 4, y: (o.y ?? 600) + size * 1.12, w: 920, t0: o.t0 + 0.35, t1: o.t1, by: 'all' }),
    ] });
  };

  /** Eyebrow con regla de acento: '— SERVICIOS'. */
  F.eyebrow = (o) => F.group({ t0: o.t0, t1: o.t1, children: [
    F.box({ x: o.x ?? 80, y: (o.y ?? 300) + 15, w: 56, h: 2, t0: o.t0, t1: o.t1, blur: false, style: { background: o.color || 'var(--g400)' } }),
    F.text({ lines: [o.text], cls: 't-eyebrow', size: o.size ?? 26, x: (o.x ?? 80) + 76, y: o.y ?? 300, w: 800, t0: o.t0 + 0.1, t1: o.t1, by: 'all', style: { color: o.color || 'var(--g300)' } }),
  ] });

  /** Glifo óptico del design system (assets/glyphs), teñido con máscara. */
  F.glyph = (o) => F.box({
    x: o.x ?? 80, y: o.y ?? 300, w: o.size ?? 88, h: o.size ?? 88, t0: o.t0, t1: o.t1, fin: 0.8,
    style: { background: o.color || 'var(--g300)', webkitMaskImage: `url(glyphs/${o.name}.svg)`, webkitMaskSize: '100% 100%', maskImage: `url(glyphs/${o.name}.svg)`, maskSize: '100% 100%' },
    anim: o.anim,
  });

  /** Ventana de foco del design system: la imagen dos veces (abajo tratada:
      gris, fría, desenfocada; arriba nítida y en color dentro de un círculo). */
  F.focusWindow = (o) => ({
    create(root) {
      const Hh = o.h ?? H;
      const mk = (f) => { const d = el('div', 'abs', { left: 0, top: 0, width: '1080px', height: Hh + 'px', overflow: 'hidden' }, root); const i = el('img', null, { width: '100%', height: '100%', objectFit: 'cover', objectPosition: o.pos || '50% 50%', filter: f }, d); i.src = o.src; F.wait(i.decode().catch(() => {})); return { d, i }; };
      this.bg = mk(`grayscale(1) sepia(.25) hue-rotate(180deg) brightness(${o.bright ?? 0.34}) contrast(1.2) blur(9px)`);
      this.fg = mk('none');
      this.ring = el('div', 'abs', { borderRadius: '50%', border: '1.5px solid rgba(246,246,244,.85)', boxShadow: '-3px 0 0 rgba(255,0,255,.55), 3px 0 0 rgba(0,255,51,.45)' }, root);
    },
    update(t) {
      const L = o.path(t);
      const z = o.zoom ?? 1;
      [this.bg.i, this.fg.i].forEach((i) => (i.style.transform = `scale(${z})`));
      this.fg.d.style.clipPath = `circle(${L.r}px at ${L.x}px ${L.y}px)`;
      Object.assign(this.ring.style, { left: L.x - L.r + 'px', top: L.y - L.r + 'px', width: 2 * L.r + 'px', height: 2 * L.r + 'px' });
    },
  });

  /** Posteo 4:5 (1080×1350) de la serie: visual al centro óptico, rótulo
      de serie arriba, título abajo a la izquierda, logo en la esquina. */
  F.post = (o) => {
    const items = [...o.visual];
    if (o.scrim !== false) items.push(F.box({ x: 0, y: 0, w: 1080, h: 1350, t0: -1, fin: 0.01, blur: false, style: { background: 'linear-gradient(180deg, rgba(10,10,11,.55) 0%, rgba(10,10,11,0) 22%, rgba(10,10,11,0) 55%, rgba(10,10,11,.92) 82%)' } }));
    items.push(F.label({ text: o.serie, x: 80, y: 80, t0: -1, w: 600 }));
    if (o.eyebrow) items.push(F.label({ text: o.eyebrow, x: 400, w: 600, align: 'right', y: 80, t0: -1 }));
    const size = o.size ?? 104;
    const y = 1350 - 110 - o.lines.length * size * 1.04;
    items.push(F.text({ lines: o.lines, size, x: 80, y, w: 700, t0: -1, by: 'all', fin: 0.01 }));
    items.push(F.logo({ t0: -1, fin: 0.01, w: 190, x: 1080 - 80 - 190, y: 1350 - 80 - 190 * 0.35 }));
    return items;
  };

  /* ---------------- guía de zonas seguras ---------------- */
  F.safe = () => F.box({
    x: 0, y: 0, w: W, h: H, t0: -1, blur: false, fin: 0.01,
    html: '<div style="position:absolute;left:0;right:0;top:0;height:270px;background:rgba(255,0,0,.18)"></div>' +
      '<div style="position:absolute;left:0;right:0;bottom:0;height:670px;background:rgba(255,0,0,.18)"></div>' +
      '<div style="position:absolute;right:0;top:270px;bottom:670px;width:140px;background:rgba(255,160,0,.18)"></div>',
    style: { zIndex: 99, pointerEvents: 'none' },
  });

  /* ---------------- ritmo: tipografía, cámara y montaje ----------------
     Segunda pasada de la campaña ("más dinámicos"). Tres capas que valen
     para los diez anuncios sin tocar su guion:
     1. Tipografía cinética: las palabras entran en foco más rápido, con más
        recorrido, y salen antes.
     2. Cámara: el plano de imagen nunca está quieto. Cada toma tiene su
        encuadre y deriva despacio; las secciones largas se parten en tomas
        con un corte de encuadre (punch-in) al pulso.
     3. Montaje: cada cambio de sección es un golpe de zoom con desenfoque y
        un destello, sincronizado con un barrido de aire en la banda.
     La cámara mueve la escena entera y contrarresta los bloques de texto,
     así los textos quedan exactamente en su franja (el control de
     composición sigue valiendo) mientras la imagen se mueve debajo. */
  const baseText = F.text;
  F.text = (o) => baseText({ ...o, fin: (o.fin ?? 0.9) * 0.6, stagger: (o.stagger ?? 0.075) * 0.72, rise: o.rise ?? 34, fout: o.fout ?? 0.34 });

  const secs = (s) => Number(String(s).split('-')[0].replace(',', '.'));
  F.editPlan = (spec) => {
    if (spec.format === 'post' || spec.edit === false || !spec.guion) return null;
    const starts = spec.guion.map((g) => secs(g[0]));
    const endAt = starts[starts.length - 1];
    const cuts = starts.slice(1);
    // cortes de encuadre: los que marca el anuncio (spec.edit.punches, alineados
    // con sus propios cambios internos) o, si no, uno cada ~3 s en las
    // secciones de más de 5,2 s
    let punches = spec.edit && spec.edit.punches;
    if (!punches) {
      punches = [];
      starts.slice(0, -1).forEach((a, i) => {
        const b = starts[i + 1];
        const n = b - a > 5.2 ? Math.max(2, Math.round((b - a) / 3.2)) : 1;
        for (let k = 1; k < n; k++) punches.push(a + ((b - a) * k) / n);
      });
    }
    const bounds = [...new Set([...starts, ...punches])].sort((x, y) => x - y).filter((x) => x <= endAt);
    const shots = bounds.slice(0, -1).map((a, i) => ({ a, b: bounds[i + 1] }));
    // los cortes de sección alternan golpe de zoom y barrido de luz
    const sweep = (i) => (spec.edit && spec.edit.sweeps ? spec.edit.sweeps.includes(i) : i % 2 === 1);
    return { cuts, punches, shots, endAt, sweep };
  };

  /* Placa cinética: una palabra (o dos) por golpe, a cuerpo gigante,
     cortando al pulso sobre tinta. Es el único momento en que el texto
     ocupa el centro del cuadro: no convive con ningún otro texto. Cada
     golpe queda registrado en F.hits para la cámara y la banda. */
  F.hits = [];
  F.slam = (o) => {
    const step = o.step ?? 0.42;
    const n = o.words.length;
    const t1 = o.t1 ?? o.t0 + step * n + (o.hold ?? 0.6);
    const kids = [];
    if (o.bg !== false) kids.push(F.box({ x: 0, y: 0, w: W, h: H, t0: o.t0, t1, fin: 0.01, fout: 0.05, blur: false, style: { background: typeof o.bg === 'string' ? o.bg : 'var(--ink)' } }));
    if (o.light) kids.push(F.gl({ frag: F.GLSL.halo, t0: o.t0, t1, fin: 0.2, fout: 0.1, u: (t, l) => ({ uC: o.light.c || [0.5, 0.42], uR: lerp(0.05, o.light.r ?? 0.2, out(p(l, 0, n * step))), uAmt: o.light.amt ?? 0.55, uHue: o.light.hue ?? -1, uSplit: 0.014 }) }));
    o.words.forEach((w, i) => {
      const lines = Array.isArray(w) ? w : [w];
      const chars = Math.max(...lines.map((l) => l.replace(/[*{}]|[mbgws]:/g, '').length));
      const size = Math.round(Math.min(o.size ?? 300, 900 / (chars * 0.5)));
      const h = lines.length * size * 1.02;
      const last = i === n - 1;
      const a = o.t0 + i * step;
      F.hits.push(a);
      kids.push(F.text({ lines, size, x: 80, y: Math.round((o.cy ?? 800) - h / 2), w: 920, align: o.align || 'left', t0: a, t1: last ? t1 : a + step, by: 'all', fin: 0.16, fout: last ? 0.3 : 0.05, blur: 24, rise: 0, rgb: last && o.rgb !== false, rgbAmp: 30, cls: 't-title cam-free', color: o.color }));
    });
    return F.group({ t0: o.t0, t1, fin: 0.01, fout: 0.05, children: kids });
  };

  const ZB = [1.0, 1.05, 1.02, 1.065];
  function camera(ed, t) {
    const O = { x: 540, y: 810 };
    if (t >= ed.endAt + 0.4) return { s: 1, tx: 0, ty: 0, blur: 0, br: 1, O };
    let j = ed.shots.findIndex((s) => t >= s.a && t < s.b);
    if (j < 0) j = ed.shots.length - 1;
    const sh = ed.shots[j];
    const k = io(p(t, sh.a, sh.b));
    let s = ZB[j % 4] + 0.028 * k;
    let tx = (j % 2 ? -1 : 1) * 10 * (k - 0.5);
    let ty = (j % 3 === 1 ? 1 : -1) * 12 * (k - 0.5);
    let blur = 0, br = 1;
    // cambios de sección: golpe de zoom hacia el corte y asentamiento
    // después; en los cortes de barrido, el golpe es menor y lo tapa la luz
    ed.cuts.forEach((c, i) => {
      const pre = inE(p(t, c - 0.22, c));
      const post = t >= c ? 1 - out(p(t, c, c + 0.42)) : 0;
      const kk = t < c ? pre : post;
      if (kk <= 0) return;
      const sw = ed.sweep(i);
      const dir = i % 2 ? 1 : -1;
      s *= 1 + (sw ? 0.025 : 0.06) * kk;
      ty += (t < c ? dir : -dir) * (sw ? 10 : 30) * kk;
      blur = Math.max(blur, (sw ? 5 : 11) * kk);
      br = Math.max(br, 1 + (sw ? 0.1 : 0.22) * kk);
    });
    // golpes de las placas cinéticas
    F.hits.forEach((h) => {
      const kk = t >= h ? 1 - out(p(t, h, h + 0.3)) : 0;
      if (kk > 0) s *= 1 + 0.035 * kk;
    });
    // cortes de encuadre dentro de una sección
    ed.punches.forEach((c) => {
      const kk = t >= c ? 1 - out(p(t, c, c + 0.16)) : 0;
      if (kk > 0) blur = Math.max(blur, 4 * kk);
    });
    // la placa de cierre llega a encuadre neutro
    const e = io(p(t, ed.endAt - 0.05, ed.endAt + 0.4));
    s = lerp(s, 1, e); tx = lerp(tx, 0, e); ty = lerp(ty, 0, e);
    return { s, tx, ty, blur, br, O };
  }
  const inE = F.inE;

  F.applyCamera = (ed, t) => {
    const st = document.getElementById('stage');
    const c = camera(ed, t);
    st.style.transformOrigin = `${c.O.x}px ${c.O.y}px`;
    st.style.transform = `translate(${c.tx.toFixed(2)}px, ${c.ty.toFixed(2)}px) scale(${c.s.toFixed(5)})`;
    st.style.filter = (c.blur > 0.05 ? `blur(${c.blur.toFixed(2)}px) ` : '') + (c.br > 1.001 ? `brightness(${c.br.toFixed(3)})` : '') || 'none';
    // barrido de luz espectral en los cortes que lo llevan
    if (!ed.sw) {
      ed.sw = F.el('div', 'abs', { left: 0, top: '-200px', width: '520px', height: '2320px', mixBlendMode: 'screen', pointerEvents: 'none', zIndex: 50,
        background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,0,255,.0) 12%, rgba(255,0,255,.55) 30%, rgba(255,255,255,.95) 50%, rgba(0,255,51,.55) 70%, rgba(0,255,51,0) 88%, rgba(0,0,0,0) 100%)', filter: 'blur(22px)' }, st);
    }
    let swk = -1;
    ed.cuts.forEach((cc, i) => { if (ed.sweep(i) && t > cc - 0.3 && t < cc + 0.3) swk = (t - (cc - 0.3)) / 0.6; });
    if (swk >= 0) {
      const e = io(swk);
      ed.sw.style.display = 'block';
      ed.sw.style.transform = `translateX(${lerp(-620, 1180, e).toFixed(1)}px) skewX(-14deg)`;
      ed.sw.style.opacity = Math.sin(Math.PI * swk).toFixed(3);
    } else ed.sw.style.display = 'none';
    // los bloques de texto quedan fijos en su franja
    st.querySelectorAll('.t-title, .t-body, .t-eyebrow, .t-mono, .t-lock, .t-lock-sub').forEach((b) => {
      if ((c.s === 1 && !c.tx && !c.ty) || b.classList.contains('cam-free')) { b.style.translate = ''; b.style.scale = ''; return; }
      const Cx = b.offsetLeft + b.offsetWidth / 2, Cy = b.offsetTop + b.offsetHeight / 2;
      const trx = ((1 - c.s) * (Cx - c.O.x) - c.tx) / c.s, tr_y = ((1 - c.s) * (Cy - c.O.y) - c.ty) / c.s;
      b.style.translate = `${trx.toFixed(2)}px ${tr_y.toFixed(2)}px`;
      b.style.scale = (1 / c.s).toFixed(5);
    });
  };

  /* La banda acompaña el montaje: barrido de aire en cada cambio de
     sección, un golpe seco en cada corte de encuadre, el pulso desde el
     primer corte y la grilla anclada a todos los cortes. */
  F.editAudio = (spec, ed) => {
    const A = spec.audio;
    if (!A || !ed || A.drive === false) return;
    A.events = [...(A.events || [])];
    ed.cuts.forEach((c) => A.events.push([c, 'swish', 0.8, 0.5]));
    ed.punches.forEach((c) => A.events.push([c, 'thump', 0.7, 0.5]));
    F.hits.forEach((h, i) => A.events.push([h, 'thump', 0.9, 0.42 + 0.16 * (i % 2)]));
    A.grid = [...new Set([...(A.grid || []), ...ed.cuts, ...ed.punches])].sort((x, y) => x - y);
    const c1 = ed.cuts[0], end = ed.endAt;
    const L = (A.layers = { ...(A.layers || {}) });
    const first = (arr) => (arr && arr.length ? Math.min(...arr.map((x) => x[0])) : Infinity);
    const last = (arr) => (arr && arr.length ? Math.max(...arr.map((x) => x[1])) : -Infinity);
    L.pulse = [[c1, Math.max(end, last(L.pulse))]];
    L.bass = [[c1, Math.max(end, last(L.bass))]];
    const h0 = first(L.hats);
    const c2 = ed.cuts[1] ?? c1;
    L.hats = [...(h0 > c2 + 1 ? [[c2, h0]] : []), ...(L.hats || [])];
    A.bpm = Math.max(A.bpm || 84, 94);
    A.energy = (A.energy || []).map(([tt, v]) => [tt, tt >= c1 && tt < end ? Math.max(v, 0.42) : v]);
  };

  /* El render espera también a las escenas 3D, texturas y shaders. */
  const baseMount = F.mount;
  F.mount = function (spec) {
    if (spec.guides) spec.items.push(F.safe());
    const ed = F.editPlan(spec);
    F.editAudio(spec, ed);
    baseMount(spec);
    const baseRender = window.renderAt;
    window.renderAt = async (t) => {
      while (waits.size) await Promise.all([...waits]);
      if (ed) F.applyCamera(ed, t);
      await baseRender(t);
    };
    const r0 = window.__ready;
    window.__ready = (async () => { await r0; await new Promise((r) => setTimeout(r, 50)); while (waits.size) await Promise.all([...waits]); })();
  };
})();

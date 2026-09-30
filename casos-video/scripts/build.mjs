/* Arma la composición HyperFrames de un caso: lee casos/<id>/caso.json y lo
   que haya en casos/<id>/media, y escribe casos-video/index.html (el proyecto
   HyperFrames es la carpeta casos-video; index.html es siempre el caso que se
   está por renderizar).

   uso: node casos-video/scripts/build.mjs <id> */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const id = process.argv[2];
const dir = path.join(ROOT, 'casos', id);
const caso = JSON.parse(fs.readFileSync(path.join(dir, 'caso.json'), 'utf8'));
const M = `casos/${id}/media`;
const DUR = caso.dur ?? 12;

/** Duración real de un medio, recortada a cuadros enteros. */
const secs = (file) => {
  const d = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', path.join(ROOT, file)], { encoding: 'utf8' }));
  return Math.floor(d * 30 - 1) / 30;
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* El fondo es el color del propio logo (la esquina de la tarjeta). */
const fondo = '#' + execFileSync('ffmpeg', ['-v', 'error', '-i', path.join(dir, 'media', 'card.jpg'), '-vf', 'crop=8:8:4:4,scale=1:1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']).toString('hex');
const lum = (h) => (parseInt(h.slice(1, 3), 16) * 299 + parseInt(h.slice(3, 5), 16) * 587 + parseInt(h.slice(5, 7), 16) * 114) / 1000;
const fondoOscuro = lum(fondo) < 110;
const oscuro = caso.tema === 'oscuro';

const vars = {
  '--fondo': fondo,
  /* Sobre fondos negros el teléfono se despega con una luz detrás; sobre
     fondos claros, con una sombra apenas. */
  '--velo': fondoOscuro
    ? 'radial-gradient(ellipse 70% 60% at 50% 62%, rgba(255,255,255,.17), rgba(255,255,255,0) 70%)'
    : 'radial-gradient(ellipse 80% 70% at 50% 70%, rgba(10,10,11,.16), rgba(10,10,11,.04) 75%)',
  '--pantalla': caso.tipo === 'web' ? caso.fondoSitio : oscuro ? '#000000' : '#ffffff',
  '--tinta': oscuro ? '#f5f5f5' : '#0b0b0c',
  '--linea': oscuro ? '#2a2a2a' : '#dbdbdb',
  '--boton': oscuro ? '#262626' : '#efefef',
  '--link': oscuro ? '#e0f1ff' : '#00376b',
  '--rotulo': lum(fondo) > 150 ? '#0a0a0b' : '#ffffff',
};

/* ---- Íconos ---- */
const I = {
  estado: `<svg viewBox="0 0 70 14" fill="currentColor"><rect x="0" y="9" width="3" height="5" rx="1"/><rect x="5" y="6" width="3" height="8" rx="1"/><rect x="10" y="3" width="3" height="11" rx="1"/><rect x="15" y="0" width="3" height="14" rx="1"/><path d="M31 3.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 31 1.400c-2.800 0-5.300 1.100-7.200 2.900L25 5.600a8.600 8.600 0 0 1 6-2.400zm0 3.700c1.300 0 2.500.5 3.400 1.300l1.200-1.300a6.700 6.700 0 0 0-9.200 0l1.200 1.300c.9-.8 2.100-1.300 3.400-1.300zm0 3.600a2 2 0 0 0-1.400.6L31 12.600l1.400-1.500a2 2 0 0 0-1.400-.6z"/><rect x="43.500" y="1" width="22" height="12" rx="3.500" fill="none" stroke="currentColor" opacity=".4"/><rect x="45.500" y="3" width="18" height="8" rx="2"/><rect x="67" y="5" width="2" height="4" rx="1" opacity=".45"/></svg>`,
  candado: `<svg viewBox="0 0 10 13" fill="currentColor"><path d="M2 5V3.500a3 3 0 0 1 6 0V5h.500A1.500 1.500 0 0 1 10 6.500v5A1.500 1.500 0 0 1 8.500 13h-7A1.500 1.500 0 0 1 0 11.500v-5A1.500 1.500 0 0 1 1.500 5zm1.500 0h3V3.500a1.500 1.500 0 0 0-3 0z"/></svg>`,
  nav: `<svg viewBox="0 0 60 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/><path d="M39 6h18M39 12h18M39 18h18"/></svg>`,
  grilla: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.800"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>`,
  reelTab: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.800" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M3 8.500h18M8 3l3 5.500M14 3l3 5.500"/><path d="M10 12.200v5l4.500-2.500z" fill="currentColor" stroke="none"/></svg>`,
  etiqueta: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.800" stroke-linejoin="round"><path d="M12 3l2.500 2.500H19a1.500 1.500 0 0 1 1.500 1.500v12.500a1.500 1.500 0 0 1-1.500 1.500H5a1.500 1.500 0 0 1-1.500-1.500V7A1.500 1.500 0 0 1 5 5.500h4.500z"/><circle cx="12" cy="11.500" r="2.300"/><path d="M7.500 19.500a4.500 4.500 0 0 1 9 0"/></svg>`,
  clip: `<svg viewBox="0 0 24 24" fill="#fff"><path d="M6 3.500h12A2.500 2.500 0 0 1 20.500 6v12a2.500 2.500 0 0 1-2.500 2.500H6A2.500 2.500 0 0 1 3.500 18V6A2.500 2.500 0 0 1 6 3.500zm4 5v7l6-3.500z"/></svg>`,
  corazon: `<svg viewBox="0 0 28 28" fill="none" stroke="#fff" stroke-width="2.200" stroke-linejoin="round"><path d="M14 24S4 18 4 10.800A5.400 5.400 0 0 1 14 8a5.400 5.400 0 0 1 10 2.800C24 18 14 24 14 24z"/></svg>`,
  comentario: `<svg viewBox="0 0 28 28" fill="none" stroke="#fff" stroke-width="2.200" stroke-linejoin="round"><path d="M14 4a10 10 0 0 0-8.600 15.100L4 24l5-1.300A10 10 0 1 0 14 4z"/></svg>`,
  enviar: `<svg viewBox="0 0 28 28" fill="none" stroke="#fff" stroke-width="2.200" stroke-linejoin="round"><path d="M24 4L12.500 15.500M24 4l-7 20-4.500-8.500L4 11z"/></svg>`,
  youtube: `<svg viewBox="0 0 34 24"><rect width="34" height="24" rx="6.500" fill="#ff0033"/><path d="M13.500 7v10l9-5z" fill="#fff"/></svg>`,
};

/* ---- Piezas comunes ---- */
const estado = `<div class="estado"><span>9:41</span>${I.estado}</div><div class="isla"></div>`;

/* La película arranca casi en el acto: el sitio la muestra a menos de un
   segundo de que la tarjeta se asienta, y lo primero que tiene que verse es
   movimiento. `entrada` es de dónde viene el teléfono y a dónde llega. */
const ENTRADA = { de: '{ y: 900, scale: 0.94, rotationX: 24 }', a: '{ y: 0, scale: 1, rotationX: 0 }' };
const timelineBase = (exit, entrada = ENTRADA) => `
      const tl = gsap.timeline({ paused: true });
      /* La tarjeta se va de foco y el teléfono sube desde abajo. */
      tl.fromTo("#tapa-img", { scale: 1, filter: "blur(0px)", opacity: 1 }, { scale: 1.24, filter: "blur(26px)", opacity: ${caso.tipo === 'web' ? 0.16 : fondoOscuro ? 0.55 : 0.3}, duration: 1.05, ease: "power2.inOut" }, 0.16);
      tl.fromTo("#velo", { opacity: 0 }, { opacity: 1, duration: 0.95, ease: "power1.inOut" }, 0.2);
      tl.fromTo("#camara", Object.assign({ transformPerspective: 1500, transformOrigin: ORIGEN }, ${entrada.de}),
        Object.assign({ duration: 1.15, ease: "power3.out" }, ${entrada.a}), 0.2);
      /* Salida: el teléfono baja y el logo vuelve a foco, igual que al empezar. */
      tl.to("#velo", { opacity: 0, duration: 0.9, ease: "power1.inOut" }, ${exit + 0.25});
      tl.to("#tapa-img", { scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.2, ease: "power2.inOut" }, ${exit + 0.3});`;

/* ---- Web: el video del sitio (brag/<id>.html), corriendo en un teléfono ---- */
function web() {
  const d = secs(`${M}/brag.mp4`);
  const start = 0.8, exit = +(start + d - 0.55).toFixed(2);
  const html = `
          <div class="pt">
            <div class="visor-brag">
              <video id="brag" src="${M}/brag.mp4" data-start="${start}" data-duration="${d}" data-track-index="1" muted playsinline></video>
            </div>
            ${estado}
          </div>`;
  /* El teléfono entero en cuadro, apenas de perfil, y girando despacio
     mientras corre el video: es la pieza, no una captura. */
  const js = `
      const ORIGEN = "50% 50%";
      ${timelineBase(exit, { de: '{ y: 900, scale: 0.7, rotationX: 20, rotationY: -26 }', a: '{ y: -159, scale: 0.8, rotationX: 0, rotationY: -10 }' })}
      tl.to("#camara", { rotationY: 8, scale: 0.835, duration: ${(exit - 1.35).toFixed(2)}, ease: "sine.inOut" }, 1.35);
      ${(caso.estado || []).map(([t, color]) => `tl.to(".estado", { color: "${color}", duration: 0.3 }, ${(start + t).toFixed(2)});`).join('\n      ')}
      tl.to("#camara", { y: 940, scale: 0.72, rotationX: 16, rotationY: 18, duration: 0.85, ease: "power3.in" }, ${exit});`;
  return { html, js, extra: '' };
}

/* ---- Redes: el perfil real de Instagram y dos reels ---- */
function redes() {
  const p = JSON.parse(fs.readFileSync(path.join(dir, 'media', 'ig', 'perfil.json'), 'utf8'));
  /* Cabecera: nombre y bio son las líneas entre "seguidos" y la primera
     destacada. Las cifras del perfil (seguidores, publicaciones) no se
     muestran: el estudio no publica métricas de sus clientes. */
  const nombres = new Set(p.destacadas.map((x) => x.nombre));
  const i0 = p.header.findIndex((l) => /seguidos$/.test(l)) + 1;
  const lineas = [];
  for (const l of p.header.slice(i0)) { if (nombres.has(l)) break; if (l !== caso.handle && l !== 'más' && l !== 'Página web') lineas.push(l.replace(/\.\.\.$/, '…')); }
  /* Con sesión iniciada Instagram pone el nombre antes de las cifras, y lo
     primero que sigue es el rubro de la cuenta. */
  const antes = p.header.slice(0, Math.max(0, i0 - 1)).filter((l) => l !== caso.handle);
  const rubro = antes.length ? lineas.shift() : null;
  const [nombre, ...bio] = antes.length ? [antes[0], ...lineas] : lineas;
  // Instagram corta la bio con "…": una línea que quedó en dos palabras no se muestra.
  const link = bio.length && /\.[a-z]{2,}/.test(bio[bio.length - 1]) ? bio.pop() : null;
  if (bio.length && /…$/.test(bio[bio.length - 1]) && bio[bio.length - 1].length < 25) bio.pop();

  const d1 = secs(`${M}/reel_1.mp4`), d2 = secs(`${M}/reel_2.mp4`);
  const t1 = 3.1, swipe = 6.25, t2 = swipe - 0.1, exit = 8.85;
  const celda = (post) => `<div class="ig-celda" data-code="${post.href.split('?')[0].split('/').filter(Boolean).pop()}" style="background-image:url('${M}/ig/${post.file}')">${post.reel ? I.clip : ''}</div>`;
  const reel = (n, r, start, dur) => `
                <div class="reel">
                  <video id="reel${n}" src="${M}/reel_${n}.mp4" data-start="${start}" data-duration="${dur}" data-track-index="${n}" muted playsinline></video>
                  <div class="reel-sombra"></div>
                  <div class="reel-titulo">Reels</div>
                  <div class="reel-acciones">${I.corazon}${I.comentario}${I.enviar}</div>
                  <div class="reel-pie">
                    <div class="reel-autor"><i style="background-image:url('${M}/card.jpg')"></i><span>${esc(caso.handle)}</span><em>Seguir</em></div>
                    <p class="reel-texto">${esc(r.texto)}</p>
                  </div>
                </div>`;
  const html = `
          <div class="pt">
            ${estado}
            <div class="ig-nav"><span class="ig-handle">${esc(caso.handle)}</span>${I.nav}</div>
            <div id="perfil">
              <div class="ig-cab">
                <div class="ig-avatar"><div style="background-image:url('${M}/card.jpg')"></div></div>
                <div class="ig-quien"><b>${esc(nombre)}</b><span>@${esc(caso.handle)}</span></div>
              </div>
              <div class="ig-bio">${rubro ? `<p class="rubro">${esc(rubro)}</p>` : ''}${bio.map((l) => `<p>${esc(l)}</p>`).join('')}${link ? `<p class="link">${esc(link)}</p>` : ''}</div>
              <div class="ig-botones"><div class="ig-boton seguir">Seguir</div><div class="ig-boton">Mensaje</div></div>
              <div class="ig-dest">${p.destacadas.map((x) => `<div class="ig-dest-item"><div><span style="background-image:url('${M}/ig/${x.file}')"></span></div><p>${esc(x.nombre)}</p></div>`).join('')}</div>
              <div class="ig-tabs"><div class="ig-tab on">${I.grilla}</div><div class="ig-tab">${I.reelTab}</div><div class="ig-tab">${I.etiqueta}</div></div>
              <div class="ig-grilla" id="grilla">${p.posts.map(celda).join('')}</div>
            </div>
            <div id="reels">
              <div id="reels-pista">${reel(1, p.reels[0], t1, Math.min(d1, 3.7))}${reel(2, p.reels[1], t2, Math.min(d2, +(exit + 0.85 - t2).toFixed(2)))}
              </div>
            </div>
          </div>`;
  const js = `
      const ORIGEN = "50% 0%";
      /* Cuánto sube el perfil para que la grilla quede arriba, y desde qué
         celda se abre el reel: se mide del layout ya armado. */
      const grilla = document.getElementById("grilla");
      const celda = grilla.querySelector('[data-code="${p.reels[0].code}"]') || grilla.children[4] || grilla.children[0];
      const sube = Math.max(0, grilla.offsetTop - 62);
      const ox = celda.offsetLeft + celda.offsetWidth / 2;
      const oy = 91 + grilla.offsetTop + celda.offsetTop - sube + celda.offsetHeight / 2;
      ${timelineBase(exit)}
      tl.to("#camara", { scale: 1.13, duration: 2.6, ease: "sine.inOut" }, 1.5);
      tl.to("#perfil", { y: -sube, duration: 1.5, ease: "power2.inOut" }, 1.6);
      /* Con el reel abierto la cámara baja hasta el pie del teléfono, donde
         están el autor y el texto de la publicación. */
      tl.to("#camara", { y: -415, duration: 1.3, ease: "power2.inOut" }, ${t1 + 0.2});
      tl.to(".estado", { color: "#ffffff", duration: 0.3 }, ${t1 + 0.1});
      tl.fromTo("#reels", { scale: 0.33, opacity: 0, borderRadius: 60, transformOrigin: ox + "px " + oy + "px" },
        { scale: 1, opacity: 1, borderRadius: 0, duration: 0.6, ease: "power3.out" }, ${t1 + 0.05});
      tl.fromTo("#reels-pista", { y: 0 }, { y: -844, duration: 0.55, ease: "power3.inOut" }, ${swipe});
      tl.to("#camara", { y: 960, scale: 1.02, rotationX: 16, duration: 0.85, ease: "power3.in" }, ${exit});`;
  return { html, js, extra: '' };
}

/* ---- Audiovisual: un vertical y, con el teléfono girado, un video de YouTube ---- */
function audiovisual() {
  const dv = secs(`${M}/vertical.mp4`), dh = secs(`${M}/horizontal.mp4`);
  const giro = 4.1, exit = 8.85;
  const html = `
          <div class="pt">
            ${estado}
            <div id="vertical" class="capa" style="color:#fff">
              <video id="clip-v" src="${M}/vertical.mp4" data-start="0.3" data-duration="${Math.min(dv, 4.5)}" data-track-index="1" muted playsinline></video>
              <div class="reel-sombra"></div>
              <div class="reel-pie"><div class="reel-autor"><i style="background-image:url('${M}/card.jpg')"></i><span>${esc(caso.handle)}</span></div></div>
            </div>
            <div id="horizontal">
              <video id="clip-h" src="${M}/horizontal.mp4" data-start="${giro + 0.1}" data-duration="${Math.min(dh, +(exit + 0.85 - giro - 0.1).toFixed(2))}" data-track-index="2" muted playsinline></video>
              <div class="yt-sombra"></div>
              <div class="yt-barra"><span id="yt-avance"></span></div>
            </div>
          </div>`;
  const extra = `
      <div id="ficha">
        <div class="ficha-marca" id="ficha-1">${I.youtube}<span>YouTube</span></div>
        <div class="ficha-titulo" id="ficha-2">${esc(caso.youtube.titulo)}</div>
        <div class="ficha-canal" id="ficha-3">${esc(caso.youtube.canal)}</div>
      </div>`;
  const js = `
      const ORIGEN = "50% 50%";
      ${timelineBase(exit)}
      tl.fromTo("#horizontal", { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.inOut" }, ${giro + 0.2});
      /* El teléfono gira a horizontal y el video de YouTube ocupa la pantalla. */
      tl.to("#camara", { rotation: -90, scale: 0.645, y: -270, duration: 1.0, ease: "power3.inOut" }, ${giro});
      tl.to(".estado", { opacity: 0, duration: 0.3 }, ${giro});
      tl.fromTo("#yt-avance", { scaleX: 0.18 }, { scaleX: 0.42, duration: ${(exit - giro).toFixed(2)}, ease: "none" }, ${giro});
      tl.fromTo(["#ficha-1", "#ficha-2", "#ficha-3"], { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.09 }, ${giro + 0.75});
      tl.to(["#ficha-1", "#ficha-2", "#ficha-3"], { opacity: 0, y: -12, duration: 0.4, ease: "power2.in", stagger: 0.04 }, ${exit - 0.25});
      tl.to("#camara", { y: 760, scale: 0.6, duration: 0.85, ease: "power3.in" }, ${exit});`;
  return { html, js, extra };
}

const { html, js, extra } = { web, redes, audiovisual }[caso.tipo]();

const out = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=720, height=900" />
    <title>Caso · ${esc(caso.cliente)}</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
${fs.readFileSync(path.join(ROOT, 'kit', 'caso.css'), 'utf8')}
      #root { ${Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join(' ')} }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="caso" data-start="0" data-width="720" data-height="900" data-duration="${DUR}">
      <div id="tapa" class="capa"><img id="tapa-img" src="${M}/card.jpg" alt="" /></div>
      <div id="velo" class="capa"></div>${extra}
      <div id="camara">
        <div id="telefono">
          <div class="pantalla">${html}
          </div>
        </div>
      </div>
    </div>
    <script>${js}
      window.__timelines["caso"] = tl;
    </script>
  </body>
</html>
`;
fs.writeFileSync(path.join(ROOT, 'index.html'), out);
console.log(`index.html ← ${id} (${caso.tipo})`);

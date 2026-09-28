/* Captura del sitio real (focuscreatives.net corriendo local) cuadro por
   cuadro, con el reloj del navegador congelado: cada cuadro avanza 1/30 s de
   tiempo virtual, así el prisma, la refracción y el scroll salen fluidos a
   30 fps aunque la captura tarde lo que tarde. Vista de teléfono (432×768 a
   2,5x = 1080×1920), con toques simulados para las interacciones.

   node capture.mjs [nombre…]   (sin nombres, captura todas)
   Requiere `npm run build && npx next start -p 3100` en la raíz del repo. */
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import path from 'node:path';

const SITE = process.env.FOCUS_SITE || 'http://localhost:3100';
const OUT = path.resolve('capturas');
const FPS = 30;
const io = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const seg = (t, a, b) => Math.min(1, Math.max(0, (t - a) / (b - a)));
/** Scroll con paradas: [[t, y], …] interpolado con ease-in-out entre puntos. */
const path2 = (pts) => (t) => {
  for (let i = 0; i < pts.length - 1; i++) {
    const [t0, y0] = pts[i], [t1, y1] = pts[i + 1];
    if (t <= t1) return y0 + (y1 - y0) * io(seg(t, t0, t1));
  }
  return pts[pts.length - 1][1];
};

/* Tomas. Las posiciones salen del layout de teléfono del sitio (secciones:
   nosotros 824, superposición 3789, servicios 4434, refracción 7967,
   umbral 8581, trabajo 10424, foco 13957, contacto 14415). */
const SHOTS = {
  hero: { dur: 4, scroll: () => 0 },
  nosotros: { dur: 4, scroll: path2([[0, 700], [3.4, 1460], [4, 1460]]) },
  superposicion: {
    dur: 5, scroll: () => 3700,
    touch: (t) => (t > 0.6 && t < 4.2 ? { x: 216 + 150 * Math.sin((t - 0.6) * 1.9), y: 330 + 120 * Math.sin((t - 0.6) * 1.3) } : null),
  },
  prisma: { dur: 7, scroll: path2([[0, 4380], [6.2, 4434 + 3533 - 768], [7, 4434 + 3533 - 768]]) },
  refraccion: {
    dur: 5.5, scroll: () => 7967 - 80,
    touch: (t) => (t > 0.5 && t < 3 ? { x: 216 + 190 * Math.sin((t - 0.5) * 2.4), y: 380 + 90 * Math.cos((t - 0.5) * 1.7) } : null),
  },
  umbral: { dur: 4.5, scroll: path2([[0, 8500], [4.2, 8581 + 1843 - 768], [4.5, 8581 + 1843 - 768]]) },
  casos: { dur: 7, scroll: path2([[0, 10380], [6.6, 10424 + 3533 - 768], [7, 10424 + 3533 - 768]]) },
  foco: {
    dur: 4.5, scroll: () => 13957 - 160,
    touch: (t) => (t > 0.4 && t < 4.3 ? { x: 216 + 140 * Math.sin((t - 0.4) * 1.2), y: 360 + 80 * Math.sin((t - 0.4) * 2.1) } : null),
  },
  contacto: { dur: 3.5, scroll: path2([[0, 14200], [2.6, 14415 + 707 - 768], [3.5, 14415 + 707 - 768]]) },
};

/* Reloj virtual: hasta __enableVT todo corre en tiempo real (deja terminar
   el preloader); después, rAF, performance.now y las animaciones CSS solo
   avanzan con __advance(ms). */
const VT = () => {
  const realRAF = window.requestAnimationFrame.bind(window);
  const realCancel = window.cancelAnimationFrame.bind(window);
  const realNow = performance.now.bind(performance);
  let vt = false, now = 0, id = 1e6;
  const q = new Map();
  performance.now = () => (vt ? now : realNow());
  window.requestAnimationFrame = (cb) => { if (!vt) return realRAF(cb); q.set(++id, cb); return id; };
  window.cancelAnimationFrame = (i) => { if (q.has(i)) q.delete(i); else realCancel(i); };
  window.__enableVT = () => { now = realNow(); vt = true; document.getAnimations().forEach((a) => a.pause()); };
  window.__advance = (ms) => {
    now += ms;
    const list = [...q.values()]; q.clear();
    list.forEach((cb) => { try { cb(now); } catch (e) {} });
    document.getAnimations().forEach((a) => { if (a.playState !== 'paused') a.pause(); a.currentTime = (a.currentTime ?? 0) + ms; });
  };
};

const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(SHOTS);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
for (const name of names) {
  const shot = SHOTS[name];
  const ctx = await browser.newContext({ viewport: { width: 432, height: 768 }, deviceScaleFactor: 2.5, isMobile: true, hasTouch: true, locale: 'es-AR' });
  await ctx.addInitScript(VT);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await page.goto(SITE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(4200); // preloader
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), shot.scroll(0));
  await page.waitForTimeout(900); // que el contenido revelado por scroll termine de entrar
  await page.evaluate(() => window.__enableVT());
  const dir = path.join(OUT, name);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  let down = false;
  const n = Math.round(shot.dur * FPS);
  for (let i = 0; i < n; i++) {
    const t = i / FPS;
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), Math.round(shot.scroll(t)));
    const tp = shot.touch ? shot.touch(t) : null;
    if (tp) {
      await cdp.send('Input.dispatchTouchEvent', { type: down ? 'touchMove' : 'touchStart', touchPoints: [{ x: tp.x, y: tp.y }] });
      down = true;
    } else if (down) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      down = false;
    }
    await page.evaluate(() => window.__advance(1000 / 30));
    await page.screenshot({ path: path.join(dir, `${String(i + 1).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 90 });
    if (i % 30 === 0) process.stdout.write(`${name} ${i}/${n}\r`);
  }
  console.log(`${name}: ${n} cuadros`);
  await ctx.close();
}
await browser.close();

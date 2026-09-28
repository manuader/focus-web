/* Control de composición: recorre cada anuncio cada 0,1 s y mide los
   bloques de texto visibles (opacidad > 0,15) en el DOM real.
   Reporta: (1) textos que se pisan entre sí, (2) textos fuera de la zona
   segura de Reels (x 80-1000, y 270-1250), (3) textos sobre zonas de la
   imagen con mucha luz o mucho detalle (el fondo detrás del texto se mide
   con el texto oculto). Uso: node qa.mjs [a01 a02 …] */
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.otf': 'font/otf', '.woff2': 'font/woff2' };
const srv = http.createServer((q, s) => { const f = path.join(ROOT, decodeURIComponent(q.url.split('?')[0])); fs.readFile(f, (e, d) => { if (e) { s.writeHead(404); s.end(); return; } s.writeHead(200, { 'content-type': TYPES[path.extname(f).toLowerCase()] || 'application/octet-stream' }); s.end(d); }); });
const PORT = 19950 + Math.floor(Math.random() * 40);
await new Promise((r) => srv.listen(PORT, r));
const ids = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(path.join(HERE, 'ads')).filter((f) => /^a\d\d\.js$/.test(f)).map((f) => f.slice(0, 3)).sort();
const STEP = Number(process.env.QA_STEP || 0.1);
const LUMA = process.env.QA_LUMA !== '0';
const browser = await chromium.launch({ args: ['--use-angle=metal', '--enable-gpu', '--ignore-gpu-blocklist'] });
const report = {};
for (const id of ids) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto(`http://localhost:${PORT}/instagram/campana-ads-01/produccion/engine/stage.html?id=${id}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.renderAt && window.__ready);
  await page.evaluate(() => window.__ready);
  const dur = await page.evaluate(() => SPEC.dur);
  const issues = [];
  for (let t = 0; t < dur; t += STEP) {
    await page.evaluate((tt) => window.renderAt(tt), t);
    const boxes = await page.evaluate(() => {
      const vis = (e) => { let o = 1; for (let n = e; n && n.id !== 'stage'; n = n.parentElement) { const cs = getComputedStyle(n); if (cs.display === 'none' || cs.visibility === 'hidden') return 0; o *= Number(cs.opacity); } return o; };
      const out = [];
      document.querySelectorAll('#stage .t-title, #stage .t-body, #stage .t-eyebrow, #stage .t-mono, #stage .t-lock, #stage .t-lock-sub').forEach((box, bi) => {
        const words = [...box.querySelectorAll('.w')].filter((w) => vis(w) > 0.15 && w.textContent.trim());
        if (!words.length) return;
        let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        words.forEach((w) => { const r = w.getBoundingClientRect(); x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); });
        const txt = words.map((w) => w.textContent).join('').trim().slice(0, 40);
        const small = box.classList.contains('t-mono') || box.classList.contains('t-eyebrow');
        out.push({ bi, x0, y0, x1, y1, txt, small, big: parseFloat(getComputedStyle(box).fontSize) });
      });
      return out;
    });
    const tt = t.toFixed(1);
    // 1 · superposición entre bloques (margen de 12 px)
    for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j], m = 12;
      if (a.x0 < b.x1 + m && b.x0 < a.x1 + m && a.y0 < b.y1 + m && b.y0 < a.y1 + m) issues.push(`${tt}s superposición: "${a.txt}" / "${b.txt}"`);
    }
    // 2 · zona segura
    for (const b of boxes) if (b.x0 < 70 || b.x1 > 1010 || b.y0 < 268 || b.y1 > 1252) issues.push(`${tt}s fuera de zona segura: "${b.txt}" [${Math.round(b.x0)},${Math.round(b.y0)}–${Math.round(b.x1)},${Math.round(b.y1)}]`);
    // 3 · fondo detrás del texto (luz y detalle), solo en textos grandes
    if (LUMA && boxes.length && Math.abs(t * 10 - Math.round(t * 2) * 5) < 0.01) {
      const bg = await page.evaluate(async (bx) => {
        const sheet = document.createElement('style'); sheet.textContent = '#stage .w{visibility:hidden!important}'; document.head.appendChild(sheet);
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        return bx;
      }, boxes);
      const shot = await page.screenshot({ type: 'png' });
      await page.evaluate(() => { document.head.lastChild.remove(); });
      const { PNG } = await import('pngjs').catch(() => ({ PNG: null }));
      if (PNG) {
        const png = PNG.sync.read(shot);
        for (const b of boxes) {
          let n = 0, s = 0, s2 = 0, hi = 0;
          for (let y = Math.max(0, Math.floor(b.y0)); y < Math.min(1920, b.y1); y += 3) for (let x = Math.max(0, Math.floor(b.x0)); x < Math.min(1080, b.x1); x += 3) {
            const k = (y * 1080 + x) * 4; const L = (0.2126 * png.data[k] + 0.7152 * png.data[k + 1] + 0.0722 * png.data[k + 2]) / 255; n++; s += L; s2 += L * L; if (L > 0.45) hi++;
          }
          const mean = s / n, sd = Math.sqrt(Math.max(0, s2 / n - mean * mean));
          if (mean > 0.28 || hi / n > 0.12 || sd > 0.16) issues.push(`${tt}s fondo cargado detrás de "${b.txt}" (luz media ${mean.toFixed(2)}, zonas claras ${(100 * hi / n).toFixed(0)} %, detalle ${sd.toFixed(2)})`);
        }
      }
    }
  }
  // agrupar repetidos consecutivos
  const grouped = [];
  const byKey = new Map();
  for (const s of issues) {
    const t = Number(s.split('s ')[0]);
    const key = s.replace(/^[\d.]+s /, '').replace(/ \[[^\]]*\]/, '').replace(/ \(luz[^)]*\)/, '');
    const g = byKey.get(key);
    if (g && t - g.t1 <= 0.51) g.t1 = t; else { const n = { key, t0: t, t1: t }; byKey.set(key, n); grouped.push(n); }
  }
  report[id] = grouped.map((g) => `${g.t0.toFixed(1)}-${g.t1.toFixed(1)}s ${g.key}`);
  console.log(`\n${id}: ${report[id].length} problemas`);
  report[id].forEach((l) => console.log('  ' + l));
  await page.close();
}
fs.writeFileSync(path.join(HERE, '../entregables/_control/qa.json'), JSON.stringify(report, null, 1));
await browser.close();
srv.close();

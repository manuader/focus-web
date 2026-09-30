/* Capturas de control de la sección Casos del sitio, a tamaños fijos.
   uso: node casos-video/scripts/qa-sitio.mjs [url]   (por defecto http://localhost:3100)
   sale: casos-video/work/_qa/*.png */
import { chromium } from './playwright.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'work', '_qa');
fs.mkdirSync(out, { recursive: true });
const url = process.argv[2] || 'http://localhost:3100';
const SIZES = { desk: [1440, 900, false], laptop: [1280, 720, false], movil: [390, 664, true], chico: [375, 553, true] };
const only = process.argv[3]?.split(',');

const b = await chromium.launch({ headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
for (const [name, [w, h, mobile]] of Object.entries(SIZES)) {
  if (only && !only.includes(name)) continue;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500); // la entrada del sitio
  // La página, en pantallas desde el tope de la sección; el mazo, en casos.
  const at = (f) => page.evaluate((f) => { const s = document.querySelector('#trabajo'); scrollTo({ top: s.getBoundingClientRect().top + scrollY + innerHeight * f, behavior: 'instant' }); }, f);
  const turn = (k) => page.evaluate((k) => { const d = document.querySelector('#trabajo [class*=deck]'); const c = d.children; d.scrollTo({ left: (c[1].offsetLeft - c[0].offsetLeft) * k, behavior: 'instant' }); }, k);
  const shot = (tag) => page.screenshot({ path: path.join(out, `${name}-${tag}.png`) });
  const state = () => page.evaluate(() => [...document.querySelectorAll('#trabajo [class*=deck] a')].map((a) => a.dataset.state || '-').join(''));
  // La entrada: a mitad de camino y ya en pantalla.
  await at(-0.6); await page.waitForTimeout(900); await shot('0-entra-a'); await at(-0.25); await page.waitForTimeout(900); await shot('0-entra-b');
  await at(0); await page.waitForTimeout(350); await shot('1-asienta');
  await page.waitForTimeout(250); const s1 = await state();
  await page.waitForTimeout(900); const s2 = await state();
  await page.waitForTimeout(2600); await shot('2-pelicula');
  // A mitad de un giro, y el cuarto caso corriendo.
  await turn(1.5); await page.waitForTimeout(60); await shot('3-giro'); const s3 = await state();
  await turn(3); await page.waitForTimeout(5200); await shot('4-caso4');
  const total = await page.evaluate(() => document.querySelectorAll('#trabajo [class*=deck] a').length);
  await turn(total - 1); await page.waitForTimeout(900); await shot('5-final');
  // La página sigue de largo: bajar desde el mazo no lo gira.
  await turn(0); await page.waitForTimeout(300); await page.mouse.move(w / 2, h / 2);
  for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(40); }
  await page.waitForTimeout(600);
  const pasa = await page.evaluate(() => ({ top: Math.round(document.querySelector('#trabajo').getBoundingClientRect().top), left: document.querySelector('#trabajo [class*=deck]').scrollLeft }));
  await shot('6-sigue');
  const card = await page.evaluate(() => { const c = document.querySelector('#trabajo [class*=deck] a'); return [c.offsetWidth, c.offsetHeight]; });
  console.log(name, `${w}×${h}`, 'tarjeta', card.join('×'), '| a 0,6 s:', s1, '| a 1,5 s:', s2, '| girando:', s3, '| rueda vertical:', JSON.stringify(pasa));
  await ctx.close();
}
await b.close();

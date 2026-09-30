/* Control de las paradas de la sección Casos: que la rueda, el trackpad y el
   dedo frenen en cada caso y que se pueda salir por los extremos.
   uso: node casos-video/scripts/qa-paradas.mjs [url]   (por defecto http://localhost:3100)
   Imprime, para cada gesto, en qué caso quedó la página (k) y el estado de las
   tarjetas (play = la película está corriendo). */
import { chromium } from './playwright.mjs';
const URL = process.argv[2] || 'http://localhost:3100';
const b = await chromium.launch({ headless: true, args: ['--autoplay-policy=no-user-gesture-required'] });
const info = (page) => page.evaluate(() => { const s = document.querySelector('#trabajo'); const top = s.getBoundingClientRect().top + scrollY; const step = (s.offsetHeight - innerHeight) / 9; return { k: +((scrollY - top) / step).toFixed(2), n: document.querySelector('#trabajo [class*=count]').textContent, st: [...document.querySelectorAll('#trabajo a')].map((a) => a.dataset.state || '-').join('') }; });
// Escritorio: rueda
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);
  await page.evaluate(() => { const s = document.querySelector('#trabajo'); scrollTo({ top: s.getBoundingClientRect().top + scrollY - innerHeight * 1.5, behavior: 'instant' }); });
  await page.waitForTimeout(400);
  await page.mouse.move(720, 450);
  // Un giro largo de rueda desde antes de la sección: tiene que frenar en el primer caso.
  for (let i = 0; i < 30; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(40); }
  await page.waitForTimeout(1100); console.log('rueda larga desde arriba →', JSON.stringify(await info(page)));
  // Un giro largo dentro del mazo: avanza uno solo.
  for (let i = 0; i < 25; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(40); }
  await page.waitForTimeout(1500); console.log('rueda larga en el caso 1 →', JSON.stringify(await info(page)));
  // Muesca a muesca, con pausas: un caso por muesca.
  for (let i = 0; i < 3; i++) { await page.mouse.wheel(0, 100); await page.waitForTimeout(900); console.log('muesca', i + 1, JSON.stringify(await info(page))); }
  await page.mouse.wheel(0, -100); await page.waitForTimeout(900); console.log('muesca atrás', JSON.stringify(await info(page)));
  // Trackpad: muchos deltas chicos seguidos (con inercia).
  for (let i = 0; i < 60; i++) { await page.mouse.wheel(0, Math.max(1, 30 - i * 0.5)); await page.waitForTimeout(16); }
  await page.waitForTimeout(1500); console.log('trackpad con inercia →', JSON.stringify(await info(page)));
  // Teclado: dejar a mitad de camino y ver que el imán lo asiente.
  await page.evaluate(() => { const s = document.querySelector('#trabajo'); const step = (s.offsetHeight - innerHeight) / 9; scrollTo({ top: scrollY + step * 0.4, behavior: 'instant' }); });
  await page.waitForTimeout(1200); console.log('soltado entre dos →', JSON.stringify(await info(page)));
  // Salida por abajo: ir al final y seguir.
  await page.evaluate(() => { const s = document.querySelector('#trabajo'); const step = (s.offsetHeight - innerHeight) / 9; scrollTo({ top: s.getBoundingClientRect().top + scrollY + step * 9, behavior: 'instant' }); });
  await page.waitForTimeout(800);
  for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 120); await page.waitForTimeout(40); }
  await page.waitForTimeout(800); console.log('sale por abajo →', JSON.stringify(await info(page)));
  await ctx.close();
}
// Teléfono: arrastres
{
  const ctx = await b.newContext({ viewport: { width: 390, height: 664 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);
  await page.evaluate(() => { const s = document.querySelector('#trabajo'); scrollTo({ top: s.getBoundingClientRect().top + scrollY, behavior: 'instant' }); });
  await page.waitForTimeout(600);
  const cdp = await ctx.newCDPSession(page);
  const drag = async (y0, y1, ms = 200) => {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 200, y: y0 }] });
    const n = 10; for (let i = 1; i <= n; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 200 + i, y: y0 + ((y1 - y0) * i) / n }] }); await page.waitForTimeout(ms / n); }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  };
  console.log('móvil inicio', JSON.stringify(await info(page)));
  await drag(520, 120, 180); await page.waitForTimeout(1400); console.log('arrastre largo arriba →', JSON.stringify(await info(page)));
  await drag(520, 470, 600); await page.waitForTimeout(900); console.log('arrastre corto lento →', JSON.stringify(await info(page)));
  await drag(520, 460, 60); await page.waitForTimeout(900); console.log('toque rápido corto →', JSON.stringify(await info(page)));
  await drag(200, 560, 200); await page.waitForTimeout(900); console.log('arrastre hacia abajo →', JSON.stringify(await info(page)));
  await drag(200, 560, 200); await page.waitForTimeout(900); console.log('otra vez hacia abajo →', JSON.stringify(await info(page)));
  await drag(200, 560, 200); await page.waitForTimeout(900); console.log('desde el primero hacia abajo (sale) →', JSON.stringify(await info(page)));
  await ctx.close();
}
await b.close();

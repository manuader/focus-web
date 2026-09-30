/* R06 · Contraste antes/después · "Esto lo firma cualquiera" · 18 s.
   El "antes" es un pastiche genérico armado por FOCUS, rotulado como tal:
   no es de ningún cliente ni de otra agencia. */
const { text, box, group, logo } = F;
const GENERIC = `
<div style="position:absolute;inset:0;background:linear-gradient(135deg,#7b2ff7 0%,#f107a3 55%,#ff7b00 100%);font-family:Arial Black,Arial,sans-serif;color:#fff;padding:70px 60px;">
  <div style="font-size:30px;font-weight:900;letter-spacing:.04em;opacity:.9">AGENCIA CREATIVA 360°</div>
  <div style="margin-top:70px;font-size:96px;font-weight:900;line-height:.98;text-shadow:0 6px 0 rgba(0,0,0,.25)">¡LLEVÁ TU MARCA AL SIGUIENTE NIVEL!</div>
  <div style="margin-top:34px;font-family:Arial;font-size:32px;line-height:1.35">Soluciones integrales · Calidad premium · ¡Resultados garantizados!</div>
  <div style="position:absolute;left:60px;bottom:70px;background:#ffe600;color:#111;font-size:36px;font-weight:900;padding:26px 40px;border-radius:60px">¡CONTACTANOS YA!</div>
</div>`;
const OURS = `
<div style="position:absolute;inset:0;background:#0a0a0b;overflow:hidden">
  <div style="position:absolute;left:520px;top:120px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(255,0,255,.55),rgba(255,0,255,0) 65%);filter:blur(10px)"></div>
  <div style="position:absolute;left:60px;top:70px;font-weight:700;font-size:24px;letter-spacing:.14em;color:#a7acb4">IDENTIDAD DE MARCA</div>
  <div style="position:absolute;left:60px;bottom:120px;font-weight:300;font-size:92px;line-height:1.02;letter-spacing:-.025em;color:#f6f6f4">Tu marca<br>ya es grande.</div>
  <div style="position:absolute;left:62px;bottom:62px;font-weight:300;font-size:40px;color:#7c818a">Todavía no se nota.</div>
</div>`;
const CARD = { x: 60, y: 290, w: 960, h: 820 };
const RULES = ['{s:01}  Sin signos de exclamación.', '{s:02}  Una idea por frase.', '{s:03}  El color es luz, no fondo.', '{s:04}  Un solo punto de foco.'];
F.mount({
  name: 'focus_reel06_esto-lo-firma-cualquiera',
  dur: 18,
  cover: 1.8,
  items: [
    box({ ...CARD, t0: 0, t1: 12.6, fin: 0.3, blur: false, html: GENERIC, style: { overflow: 'hidden' } }),
    text({ lines: ['{s:Ejemplo genérico armado por FOCUS}'], cls: 't-mono', size: 20, x: 60, y: 1130, t0: 0.2, t1: 2.9, by: 'all', style: { fontSize: '20px' } }),
    text({ lines: ['Esto lo firma', 'cualquiera.'], size: 104, x: 60, y: 1200, t0: 0.4, t1: 2.9, by: 'line', lineDelay: 0.35, stagger: 0 }),

    group({ t0: 2.8, t1: 12.6, clip: 'sweepX', clipIn: [2.8, 4.2], fout: 0.5, children: [box({ ...CARD, t0: 2.8, t1: 12.6, fin: 0.01, blur: false, html: OURS, style: { overflow: 'hidden' } })] }),
    text({ lines: ['La misma idea, bien dicha:'], cls: 't-body', size: 40, x: 60, y: 1150, t0: 4.3, t1: 12.6, by: 'all', color: 's' }),
    text({ lines: RULES, cls: 't-body', size: 54, x: 60, y: 1225, t0: 4.8, t1: 12.6, by: 'line', lineDelay: 1.7, stagger: 0, lineStyle: () => ({ lineHeight: '1.4' }) }),

    text({ lines: ['La diferencia', 'no es gusto.'], size: 118, x: 80, y: 560, t0: 12.8, t1: 18, by: 'line', lineDelay: 0.3, stagger: 0 }),
    text({ lines: ['Es *criterio.*'], size: 118, x: 80, y: 820, t0: 13.9, t1: 18, by: 'all', rgb: true, rgbAmp: 30 }),
    text({ lines: ['Mandáselo a quien decide', 'cómo habla.'], cls: 't-body', size: 44, x: 84, y: 1100, t0: 15.0, by: 'line', lineDelay: 0.25, stagger: 0, color: 's' }),
    logo({ t0: 16.2, w: 200, x: 84, y: 1330 }),
  ],
  audio: {
    chords: [[0, 'min'], [2.8, 'sus'], [13.9, 'maj']],
    events: [[0.05, 'click'], [2.8, 'swell'], [4.2, 'tick'], [4.8, 'click', 0.3], [6.5, 'click', 0.4], [8.2, 'click', 0.6], [9.9, 'click', 0.7], [12.8, 'low'], [14.0, 'resolve'], [16.2, 'tick']],
  },
});

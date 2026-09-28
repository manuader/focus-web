/* Genera los documentos de la campaña desde los SPEC de cada anuncio, así el
   guion escrito y el video no se pueden desfasar: son el mismo archivo.
   node build-docs.mjs → ../05-guiones.md, ../06-entregables.md,
                         ../entregables/anuncios/<nombre>.txt (captions),
                         ../entregables/entregables.csv */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '..');
const ADS = path.join(HERE, 'ads');

/* Un F de mentira: cualquier función devuelve un objeto vacío y F.mount
   guarda el SPEC. Alcanza para leer meta, guion y audio sin navegador. */
function load(file, variant = null) {
  let spec = null;
  const F = new Proxy({}, { get: (t, k) => {
    if (k === 'mount') return (s) => { spec = s; };
    if (k === 'GLSL') return new Proxy({}, { get: () => '' });
    if (k === 'B') return variant === 'b';
    if (k === 'variant') return variant;
    if (k === 'vname') return (n) => (variant ? `${n}_${variant}` : n);
    return (...a) => ({});
  } });
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), { F, JSON, Math, Array, String, Number, Object, console });
  return spec;
}

const files = fs.readdirSync(ADS).filter((f) => /^a\d\d\.js$/.test(f)).sort();
const specs = files.map((f) => load(path.join(ADS, f)));
const specsB = files.map((f) => load(path.join(ADS, f), 'b'));
/* Caption de la variante: igual al de la A salvo el párrafo del CTA cuando la
   variante cambia el destino (el párrafo anterior a los hashtags). */
const captionB = (a, b) => { if (!b.meta.variante?.captionFin) return a.meta.caption; const p = a.meta.caption.split('\n\n'); p[p.length - 2] = b.meta.variante.captionFin; return p.join('\n\n'); };
const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const plain = (s) => String(s).replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/\{[mbgws]:([^}]+)\}/g, '$1');

/* 05 · guiones */
let md = `# 05 · Guiones, assets, captions y criterios de los 10 anuncios

Generado desde \`produccion/ads/aNN.js\` con \`node produccion/build-docs.mjs\`. Cada guion es el mismo objeto que dibuja el video: si se cambia un tiempo o un texto en el archivo del anuncio, este documento se regenera igual.

Convenciones del texto en pantalla: \`/\` separa frases que entran en momentos distintos; *itálica* es la palabra en Source Serif 4 Italic; \`·\` separa elementos de la placa de cierre. **No hay voz en off en esta tanda**: el texto en pantalla sostiene el mensaje sin sonido. Si se graba locución, el guion de voz es la columna "Texto en pantalla", leída a 2,2-2,6 palabras por segundo.

Formato de todos: 1080×1920 (9:16), 30 fps, 45 s, H.264 High + AAC 256 kbps 48 kHz, -14 LUFS integrados, true peak por debajo de -1 dBTP. Zonas seguras de Reels respetadas (texto entre y = 280 e y = 1240).

`;
for (const s of specs) {
  const m = s.meta;
  md += `---

## ${m.id} · ${m.titulo}

\`entregables/anuncios/${s.name}.mp4\` · portada \`${s.name}.jpg\` (cuadro ${s.cover} s) · caption \`${s.name}.txt\`

| | |
|---|---|
| **Etapa** | ${m.etapa} |
| **Fenómeno del atlas** | ${m.fenomeno} |
| **Audiencia** | ${esc(m.publico)} |
| **Objetivo** | ${esc(m.objetivo)} |
| **Necesidad u objeción** | ${esc(m.necesidad)} |
| **Promesa verificable** | ${esc(m.promesa)} |
| **Acción buscada** | ${esc(m.accion)} |
| **Servicio destacado** | ${esc(m.servicio)} |
| **Referencia estratégica** | ${esc(m.referencia)} |
| **CTA** | ${esc(m.cta)} |
| **Destino del tráfico** | ${esc(m.destino)} |
| **Banda sonora** | Tonalidad ${['La', 'Si bemol', 'Si', 'Do', 'Do sostenido', 'Re', 'Mi bemol', 'Mi'][s.audio.key] || s.audio.key}, ${s.audio.bpm} BPM. Acordes: ${s.audio.chords.map((c) => `${c[0]} s ${c[1]}`).join(' → ')} |

### Guion por tramos

| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |
|---|---|---|---|---|---|---|---|
${s.guion.map((r) => '| ' + r.map(esc).join(' | ') + ' |').join('\n')}

### Assets

| Asset | Fuente o generación | Prompt para una variante con IA (estética FOCUS) |
|---|---|---|
${m.assets.map((r) => '| ' + r.map(esc).join(' | ') + ' |').join('\n')}

### Caption

\`\`\`text
${m.caption}
\`\`\`

### Criterio de éxito

${m.exito}

### Hipótesis para la prueba A/B

${m.ab}

`;
}
fs.writeFileSync(path.join(OUT, '05-guiones.md'), md);

/* captions */
const AD = path.join(OUT, 'entregables', 'anuncios');
fs.mkdirSync(AD, { recursive: true });
for (const s of specs) fs.writeFileSync(path.join(AD, `${s.name}.txt`), s.meta.caption + '\n');
specsB.forEach((b, i) => fs.writeFileSync(path.join(AD, `${b.name}.txt`), captionB(specs[i], b) + '\n'));

/* 08 · variantes A/B */
let ab = `# 08 · Variantes para pruebas A/B (primera ronda)

Una variante B por anuncio. Cada una cambia **una sola variable** (gancho, apertura, galería o CTA) y hereda todo lo demás de la A: composición, sonido, duración y cierre. Así la diferencia de resultado se puede atribuir a esa variable. Las dos versiones salen del mismo archivo (\`produccion/ads/aNN.js\`, con \`F.B\`); se renderizan con \`./ad.sh aNN\` y \`./ad.sh aNNb\`.

**Cómo correr cada prueba:** prueba A/B nativa de Meta (Experimentos) con el mismo presupuesto, la misma audiencia y la misma ubicación para A y B, al menos 7 días y sin tocar nada durante la prueba. Se declara ganadora la versión con mejor métrica principal si la diferencia es estadísticamente significativa según el reporte de Meta; si no lo es, se mantiene la A y se prueba la siguiente variable. Nunca se prueban dos variables a la vez.

| # | Variable | Archivo A | Archivo B | Métrica principal |
|---|---|---|---|---|
${specs.map((a, i) => { const b = specsB[i]; return `| ${a.meta.id} | ${esc(b.meta.variante.cambia.split(':')[0])} | \`${a.name}.mp4\` | \`${b.name}.mp4\` | ${esc(a.meta.exito.split(';')[0])} |`; }).join('\n')}

`;
specs.forEach((a, i) => {
  const b = specsB[i], v = b.meta.variante;
  ab += `---\n\n## ${a.meta.id} · ${a.meta.titulo} (${a.meta.etapa})\n\n- **Hipótesis:** ${a.meta.ab}\n- **Qué cambia en la B:** ${v.cambia}\n- **Archivos:** A \`entregables/anuncios/${a.name}.mp4\` · B \`entregables/anuncios/${b.name}.mp4\` (portada \`.jpg\` y caption \`.txt\` con el mismo nombre)\n- **Destino de la B:** ${v.destino || a.meta.destino}\n- **Métrica principal:** ${a.meta.exito}\n\n| Tramo (s) | Escena o plano | Texto en pantalla | Movimiento | Transición | Música | Efectos | Función narrativa |\n|---|---|---|---|---|---|---|---|\n${v.guion.map((r) => '| ' + r.map(esc).join(' | ') + ' |').join('\n')}\n\n`;
  if (v.captionFin) ab += `Caption de la B: igual al de la A, con el cierre "${v.captionFin}"\n\n`;
});
fs.writeFileSync(path.join(OUT, '08-variantes-ab.md'), ab);

/* 06 · tabla de entregables */
const rows = specs.map((s) => ({ id: s.meta.id, archivo: `${s.name}.mp4`, portada: `${s.name}.jpg`, caption: `${s.name}.txt`, posteo: `posteos/${s.name.replace('focus_ad', 'focus_post')}.png`, etapa: s.meta.etapa, titulo: s.meta.titulo, objetivo: s.meta.objetivo, servicio: s.meta.servicio, fenomeno: s.meta.fenomeno, cta: s.meta.cta, destino: s.meta.destino }));
let t = `# 06 · Entregables: archivo, etapa y objetivo

Videos, portadas y captions en \`entregables/anuncios/\`; posteos 4:5 en \`entregables/posteos/\` (cada posteo es la versión estática del anuncio del mismo número y usa su caption). Generado por \`produccion/build-docs.mjs\`.

| # | Archivo | Posteo 4:5 | Etapa | Título | Objetivo | Servicio | Fenómeno | CTA | Destino |
|---|---|---|---|---|---|---|---|---|---|
${rows.map((r) => `| ${r.id} | \`${r.archivo}\` (+ \`.jpg\`, \`.txt\`) | \`${r.posteo}\` | ${r.etapa} | ${r.titulo} | ${esc(r.objetivo)} | ${esc(r.servicio)} | ${r.fenomeno} | ${esc(r.cta)} | ${esc(r.destino)} |`).join('\n')}
`;
fs.writeFileSync(path.join(OUT, '06-entregables.md'), t);
const csvq = (v) => `"${String(v).replace(/"/g, '""')}"`;
const keys = Object.keys(rows[0]);
fs.writeFileSync(path.join(OUT, 'entregables', 'entregables.csv'), [keys.join(','), ...rows.map((r) => keys.map((k) => csvq(r[k])).join(','))].join('\n') + '\n');
console.log(`${specs.length} anuncios y ${specsB.length} variantes → 05-guiones.md, 06-entregables.md, 08-variantes-ab.md, captions y CSV`);

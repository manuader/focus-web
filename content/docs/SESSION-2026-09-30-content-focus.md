# Sesión 2026-09-30 · content-focus

## Pedido

- Lanzar el Instagram de FOCUS con la primera tanda, usando el design system de FOCUS y el mismo flujo que content-urbe.
- Dejar todo en `~/Desktop/focus/content`.
- Revisar lo que ya estaba hecho, hacer lo que faltaba y no rehacer lo demás.

## Lo que ya estaba hecho (y se reutilizó)

- La tanda 1 de la sesión del 28/09 (branch `casos-highend-mvrrcn` de focus-web, carpeta `instagram/`, mergeada en main): investigación de marca, benchmark de reels, auditoría de skills, la skill `focus-identidad`, 10 reels, 5 carruseles, 5 historias, fichas con prompts, matriz y calendario.
- Los reels de presentación v1 y v3 (artifact "FOCUS Reels", 27/09). Quedaron en el catálogo; no se rehicieron.

## Lo que se hizo

1. **Repo con el flujo de content-urbe:**
   - router (`focus-studio`), contenido (`focus-contenido`: evidencia, guion con rúbrica, catálogo, estrategia, producción, kit), identidad (`focus-identidad`) y `brag-slim` vendorizado;
   - la CLI `./focus` (setup, list, new, stills, render, pieza, campana, captions, capture, verify, check);
   - `setup.sh`, `verify.sh` y el oráculo de campaña;
   - AGENTS, CLAUDE y HANDOFF.
2. **Design system de FOCUS para contenido:**
   - no hay un Artifact de Design System de FOCUS. El único que existe es el de Urbetrack. La carpeta `Design System/` de Claude Design está en la Mac y no llegó a esta sesión;
   - se armó desde el sitio, que es un port 1:1 de esos tokens: README (brand book), `tokens.json`, fuentes, logos, key visuals, tarjetas de clientes, gráficos, guías, motor de piezas, música y voz.
3. **Corrección tipográfica de toda la tanda:** se midió el CSS del sitio.
   - Titulares en Rotis ExtraBold mayúscula.
   - Énfasis en ExtraBold, no en serif.
   - Eyebrows en serif itálica con filete.
   - Micro-rótulos con tracking 0,26 em.
   - Las 20 piezas se volvieron a renderizar con esa gramática.
4. **Revisor independiente de guion** (3 rondas, umbral 8,5). Además de reescribir copy, se corrigieron:
   - una afirmación falsa: R03 decía "no es un video editado";
   - tiempos de lectura en R03, R05, R07 y R10;
   - repeticiones con v1: R04 ahora refracta IDENTIDAD en vez de MARCA;
   - afirmaciones sin respaldo en C03 y S04.
   Puntajes finales en `campanas/2026-10-lanzamiento-instagram/06-matriz-y-calendario.md`.
5. **Portfolio verificado** (`evidencia.md` §4):
   - FisuEvolution/Ader Games es público y verificable, con atribución a FOCUS "A validar". Se hizo el **borrador RX**, con la marca BORRADOR en pantalla y capturas de adergames-site en local.
   - MusicBoxd es un proyecto del curso PAW del ITBA, repo privado y sin demo.
   - Alquilalo es un repo de MatiSapino.
   - Ninguno de los tres tiene pieza publicable sin tu decisión.
6. **Evidencia ampliada:** 10 commits citables con fecha, reduced-motion global, el inglés escrito para lectores nativos, Foco, y la regla de que las capturas usan toques simulados.

## Oráculos

- `./focus verify campanas/2026-10-lanzamiento-instagram` → `VERIFY_EXIT 0`. 11 reels de 18 a 22 s, entre -14,5 y -15,7 LUFS; 5 carruseles; 5 secuencias de historias; captions; reglas de copy.
- `./focus check` → `VERIFY_EXIT 0`.

## Trampas encontradas

- **Servidor estático en segundo plano:** colgaba los pipes. Se reemplazó por un servidor dentro de `render.mjs`.
- **`pkill -f` con un patrón que aparece en el propio comando:** mata a la shell. Usar `pgrep -f "[x]…"`.
- **Editar el script `focus` mientras corre:** bash lo lee por partes y falla. No se edita durante un `./focus campana`.
- **Chromium y el proxy TLS:** en este entorno no llega a sitios https, así que los sitios se capturaron en local.

## Abierto

Ver `docs/HANDOFF.md` §5.

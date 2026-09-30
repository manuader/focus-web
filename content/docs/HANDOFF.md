# HANDOFF general · content-focus

## §0 Cómo usar este documento

- **Al llegar:** leé este archivo y después `AGENTS.md`.
- **Al cerrar:**
  1. escribí `docs/SESSION-<fecha>-<tema>.md`;
  2. actualizá §4 y §5 de este archivo.
- Si algo acá ya no es cierto, corregilo.

## §1 Qué es

Es el pipeline de contenido de FOCUS creatives. Replica el flujo de content-urbe (router, evidencia, guion con revisor, design system, CLI, oráculos y handoff) con el design system de FOCUS, que es un port 1:1 del sitio focuscreatives.net.

- **Remoto:** por ahora, la carpeta `content/` de github.com/manuader/focus-web (rama `casos-highend-mvrrcn`). La integración no pudo crear `manuader/content-focus` (403). Si el usuario crea ese repo vacío, se mueve ahí.
- **Carpeta local sugerida:** `~/Desktop/focus/content`.

## §2 Reglas del repo

- `work/` no se versiona.
- Las entregas de campaña (`campanas/<c>/entregas/`) **sí** se versionan: son livianas, unos 60 MB por tanda, y así viajan a la Mac.
- Commits en español.
- Antes de pushear, `./focus check` tiene que dar `VERIFY_EXIT 0`.

## §3 Arquitectura

- **Raíz:** marcador `.focus-root`.
- **Motor:** `design-system/plantillas/engine.js` + `brand.css`. Cada pieza es un `.js` que llama a `F.mount` o a `F.deck`.
- **Render:** `render.mjs` sirve la raíz con un servidor propio, renderiza con Playwright y codifica con el ffmpeg de imageio-ffmpeg.
- **Audio:** `audio.py` compone la música original y la mezcla a -14 LUFS.
- **Captura:** `capture.mjs` graba el sitio con tiempo virtual (rAF, `performance.now` y animaciones CSS avanzan a mano), en vista de teléfono y con toques por CDP.

## §4 Sesiones (la más nueva arriba)

- **2026-09-30 · creación del repo y tanda 1 alineada al design system.** Ver `docs/SESSION-2026-09-30-content-focus.md`.

## §5 Abierto

1. **Decisiones del usuario:**
   - atribución de FisuEvolution/Ader Games (borrador RX listo), MusicBoxd y Alquilalo;
   - publicar R04, R05, R07, R08 y R09, que quedaron por debajo de 8,5;
   - etiquetas de clientes;
   - licencia de Rotis para redes;
   - música de v1/v3.
2. **Sitio:**
   - sumar "producto digital / software" a focuscreatives.net;
   - que focus-creatives.com redirija o se corrija `SITE_URL`.
3. **Voz de marca:** casting pendiente (`design-system/voz/README.md`).
4. **Handle de Instagram:** desconocido.

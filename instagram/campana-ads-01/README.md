# FOCUS · Campaña de anuncios "Sin plantilla" (primera tanda)

Diez anuncios para Instagram Reels (9:16, 45 s): 4 TOFU, 3 MOFU y 3 BOFU. Presentan a FOCUS como un estudio premium de diseño y tecnología y suman la nueva línea de software a medida a identidad, diseño personalizado, redes y web. Todo lo que muestran es trabajo propio o de clientes publicados en el sitio. No hay precios, clientes inventados, cifras sin fuente ni comparaciones con competidores.

## Documentos

| Archivo | Contenido |
|---|---|
| `01-investigacion-competitiva.md` | 12 estudios premium (Dumbar/DEPT, Porto Rocha, Koto, Pentagram, Wolff Olins, JKR, BUCK, DixonBaxi, Metalab, Instrument, Futura, Anagrama). Evidencia de posicionamiento (verificada o inferida), mejores piezas con fecha, métricas y consulta, comparación contra la base de cada cuenta, desgloses y 12 principios aplicables |
| `02-auditoria-skills-y-herramientas.md` | Skills de diseño a fines de 09/2026, auditoría de seguridad (brag, HyperFrames, automatic-image-generation, Remotion, anthropics/skills y otras), decisión de stack |
| `03-sistema-creativo.md` | Reglas de identidad que se mantienen, lo que se suma (plataforma "Sin plantilla", atlas óptico, glifos, arquitectura de oferta, formato de anuncio, movimiento, identidad sonora, interfaz) y lo que queda para confirmar |
| `04-estrategia-y-matriz.md` | Buyer personas, storytelling, matriz v1, revisión de repeticiones, matriz v2, distribución y medición |
| `05-guiones.md` | Por anuncio: ficha, guion por tramos, assets y prompts, caption, CTA y destino, criterio de éxito e hipótesis A/B. Se genera desde el código de cada anuncio |
| `06-entregables.md` | Tabla archivo ↔ etapa ↔ objetivo (también en `entregables/entregables.csv`) |
| `07-control-de-calidad.md` | Verificación técnica, de composición, de sonido y de veracidad; qué quedó pendiente |
| `08-variantes-ab.md` | Una variante B por anuncio (una sola variable cada una), hipótesis, métrica y cómo correr la prueba en Meta |
| `design-system/` | El design system de Claude Design **ampliado (v2)**; también en `entregables/FOCUS-Design-System-v2.zip` para volver a subirlo |

## Entregables (`entregables/`)

- `anuncios/focus_adNN_*.mp4`: los 10 videos finales, 1080×1920, 30 fps, 45 s, H.264 + AAC, -14 LUFS.
- `anuncios/focus_adNN_*_b.mp4`: las 10 variantes B para las pruebas A/B (con su portada y su caption).
- `anuncios/focus_adNN_*.jpg`: portada de cada uno (también es el cuadro 0 del video).
- `anuncios/focus_adNN_*.txt`: caption listo para pegar.
- `resumen-portadas.jpg`: las diez portadas juntas.
- `entregables.csv`: la tabla de archivos, etapas y objetivos.

## Producción (`produccion/`)

El motor dibuja cada cuadro como función del tiempo y lo renderiza con la GPU del equipo. La banda sonora sale de una partitura con los mismos tiempos que la imagen. Nada se editó en una app ni salió de una plantilla.

```bash
cd instagram/campana-ads-01/produccion
npm install && npx playwright install chromium
python3 -m venv .venv && .venv/bin/pip install numpy scipy pillow
# el sitio corriendo local, solo para regrabar capturas
(cd ../../.. && npm run build && npx next start -p 3100) &
node capture.mjs                       # capturas reales del sitio en un teléfono
./sheet.sh a04 "1,8,20,43"             # cuadros de control de un anuncio
PY=.venv/bin/python ./ad.sh a04        # video + audio + portada
node qa.mjs                            # control de composición de los diez
node build-docs.mjs                    # regenera 05, 06, captions y CSV
```

- `engine/engine2.js`: extensión del motor de la tanda orgánica (GLSL, escenas 3D, interfaz, rótulos, placa de cierre).
- `engine/glsl.js`: el atlas óptico en shaders.
- `engine/scenes/`: prisma, espejo, órbita y lente en Three.js (vidrio físico con dispersión).
- `ads/aNN.js`: cada anuncio (meta, guion, ítems y partitura en un solo archivo).
- `audio2.py`: síntesis y master.

Las variantes A/B viven en el mismo archivo del anuncio: `F.B` es verdadero en la variante B y `./ad.sh aNNb` la renderiza con el sufijo `_b`. Para una ronda nueva se agrega otra letra (`F.variant === 'c'`) y se renderiza `aNNc`.

## Para confirmar antes de pautar

1. La agrupación de la oferta y el proceso en cuatro etapas (A08).
2. Qué incluye el acompañamiento mensual (A09).
3. Permiso de los clientes que aparecen en A03, A09 y A10.
4. Licencia de Rotis para publicidad paga.
5. Handle de Instagram y que el sitio sume la línea de software (A04 lleva tráfico ahí).

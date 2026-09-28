# 07 · Control de calidad

Revisión del 28/09/2026 sobre los diez archivos finales de `entregables/anuncios/` y los diez posteos de `entregables/posteos/`. Los números de la sección 1 salen de `ffprobe` y del filtro `ebur128` de ffmpeg sobre los MP4 finales (después del códec), no del audio sin comprimir.

## 1. Técnica

| Archivo | Video | Duración | Loudness | True peak | Peso |
|---|---|---|---|---|---|
| `focus_ad01_sin-plantilla.mp4` | 1080×1920 · 30 fps · 1.350 cuadros · yuv420p BT.709 | 45,00 s | -14,1 LUFS | -1,5 dBTP | 37M |
| `focus_ad02_fuera-de-foco.mp4` | 1080×1920 · 30 fps · 1.350 cuadros · yuv420p BT.709 | 45,00 s | -14,7 LUFS | -2,0 dBTP | 29M |
| `focus_ad03_lo-que-queda.mp4` | 1080×1920 · 30 fps · 1.350 cuadros · yuv420p BT.709 | 45,00 s | -14,7 LUFS | -1,9 dBTP | 21M |
| `focus_ad04_a-medida.mp4` | 1080×1920 · 30 fps · 1.350 cuadros · yuv420p BT.709 | 45,00 s | -14,4 LUFS | -1,8 dBTP | 22M |
| `focus_ad05_una-decision.mp4` | 1080×1920 · 30 fps · 1.350 cuadros · yuv420p BT.709 | 45,00 s | -14,1 LUFS | -2,1 dBTP | 46M |
| `focus_ad06_el-flujo.mp4` | 1080×1920 · 30 fps · 1.350 cuadros · yuv420p BT.709 | 45,00 s | -14,3 LUFS | -2,2 dBTP | 17M |
| `focus_ad07_primera-reunion.mp4` | 1080×1920 · 30 fps · 1.350 cuadros · yuv420p BT.709 | 45,00 s | -14,1 LUFS | -1,8 dBTP | 62M |
| `focus_ad08_el-proceso.mp4` | 1080×1920 · 30 fps · 1.350 cuadros · yuv420p BT.709 | 45,00 s | -14,7 LUFS | -2,1 dBTP | 39M |
| `focus_ad09_todos-los-meses.mp4` | 1080×1920 · 30 fps · 1.350 cuadros · yuv420p BT.709 | 45,00 s | -14,1 LUFS | -1,5 dBTP | 56M |
| `focus_ad10_proximo-caso.mp4` | 1080×1920 · 30 fps · 1.350 cuadros · yuv420p BT.709 | 45,00 s | -14,9 LUFS | -2,1 dBTP | 35M |

- **Formato:** 1080×1920 (9:16), 30 fps, 1.350 cuadros, 45,0 s en los diez.
- **Video:** H.264 High 4.2, yuv420p, **rango de TV con matriz, primarios y transferencia BT.709 declarados**. El master sale de capturas JPEG en rango completo; la conversión de rango se hace en el último paso. Un video sin esta conversión se ve con otro contraste en los teléfonos, y esta revisión lo detectó y lo corrigió.
- **Audio:** AAC 256 kbps, 48 kHz, estéreo. Loudness integrado entre -14,1 y -14,9 LUFS (objetivo -14 ±1). True peak después del códec por debajo de -1 dBTP en los diez: el master se limita a -2 dBTP para dejar margen a los sobrepicos del AAC.
- **Cuadro 0 = portada:** cada video empieza en el cuadro asentado que indica su SPEC, el mismo que se entrega como `.jpg`.

## 2. Composición y legibilidad en teléfono

Control automático con `produccion/qa.mjs`: recorre cada anuncio cada 0,1 s (450 instantes por anuncio) y mide en el DOM real todos los bloques de texto visibles.

| Regla | Primera pasada (tramos con problema) | Final |
|---|---|---|
| Ningún texto se pisa con otro (mínimo 12 px entre bloques) | 41 | 0 |
| Todo texto dentro de la zona segura de Reels (x 80-1000, y 270-1250) | 17 | 0 |
| Ningún texto sobre zonas de la imagen con mucha luz o mucho detalle (el fondo se mide con el texto oculto, cada 0,5 s) | 18 | 0 |

Correcciones que salieron de esa pasada:
- **Placa de cierre:** más aire entre el CTA y el destino.
- **Regla de composición en todos:** texto solo en la franja superior (y 280-620) o inferior (1000-1240), imagen en el centro óptico.
- **A03:** la columna ya no atraviesa el texto al salir; se hunde en el espejo.
- **A08:** el texto de cada etapa pasa a una columna más ancha y las rendijas de luz se corren al tercio derecho.
- **A09:** los anillos quedan en la mitad inferior y el texto arriba.
- **A10:** la galería se achica para que la ficha del caso no salga de la zona segura.
- **Horizonte del espejo (A03):** tenía una banda gris por una conversión de color lineal. Se corrigió y ahora es negro continuo.

Tamaños mínimos: titulares de 72 a 150 px, lectura de 42 a 56 px, rótulos técnicos de 24 px (solo datos, nunca el mensaje).

Revisión visual cuadro por cuadro (hojas de contacto en `entregables/_control/`, no versionadas): transiciones de salida y entrada con desenfoque, ningún corte en frío entre dos pantallas cargadas y una sola palabra en serif itálica por frase.

## 3. Sincronía audio-imagen

- Los efectos (clics, impactos, obturador, teclas, vidrio) salen del mismo SPEC que mueve la imagen. **Coinciden con su evento visual al cuadro.**
- **Grilla musical anclada a los cortes:** cada sección dura un número entero de pulsos, así el bombo, el bajo, los hats y el arpegio caen en tiempo fuerte en cada corte de sección. El tempo local varía entre secciones como máximo un 7 %.
- Quedan fuera de la grilla, a propósito, las entradas de texto dentro de una sección: su clic va con el texto y queda como síncopa.

## 4. Marca

Los diez se revisaron contra los siete criterios de pertenencia de la skill `focus-identidad` (§16):
- un punto focal por cuadro;
- tinta dominante y color como luz;
- solo Rotis y una palabra serif por frase;
- gestos y transiciones de la lista;
- voz de FOCUS sin exclamaciones, rayas ni clichés;
- datos verificables;
- cierre resuelto en foco, luz o logo.

Paleta: solo tinta, papel, grises y el espectro de siete pasos. Excepción controlada: la grilla genérica de A01, rotulada "Ejemplo genérico", y el póster de marca `img-06`, mostrado como obra.

## 5. Veracidad (afirmación por afirmación)

| Anuncio | Afirmación | Fuente |
|---|---|---|
| A01 | "Usamos IA" · "Nada de esto es plantilla" | Sitio (contenido con IA) · la campaña se renderizó con código propio (`produccion/`) |
| A02 | El sistema propio como ejemplo | Pósters, logo y sitio de FOCUS |
| A03 | Edición de reels y YouTube y redes de @santatuca | `WORKS` en `content.ts` |
| A04 | Código real · interfaz de concepto | `src/lib/locale.ts` · rótulo "Concepto" en pantalla |
| A05 | Aplicaciones del sistema | Todas propias: sitio, pósters, deck y perfil del design system |
| A06 | 12 estudios · auditoría de herramientas · 1.350 cuadros · banda original | `01-…md`, `02-…md`, `produccion/` |
| A07 | Prisma con scroll, refracción táctil, casos en foco, idioma según el navegador | Capturas reales del sitio (`capture.mjs`), incluida una con navegador en inglés |
| A08 | Proceso en cuatro etapas | **Propuesta: confirmar** (03, C1) |
| A09 | Seis casos de social media · qué incluye el acompañamiento | `WORKS` · **qué incluye: confirmar** (03, C2) |
| A10 | 8 marcas, 9 trabajos, 7 disciplinas, 1 línea nueva | `WORKS` y `SERVICES` en `content.ts`; la línea nueva, del brief |

En la revisión se corrigieron dos textos que decían más de lo que el sitio respalda:
- A03 decía "gestionamos contenido para creadores" (en plural) cuando hay un solo creador publicado.
- A09 decía "Hoy acompañamos a", y no se puede verificar que esas cuentas sigan activas.

Ningún anuncio, caption ni rótulo lleva precios, cifras de resultados, testimonios, premios o comparaciones con competidores.

## 6. Qué quedó pendiente

| Pendiente | Por qué | Cómo seguir |
|---|---|---|
| Imágenes generadas con IA (ChatGPT Pro u otro modelo) | No hay integración de ChatGPT Pro en esta sesión. Higgsfield tiene 0,4 créditos. `automatic-image-generation` maneja una sesión logueada y tiene una fuga de cookies sin parchear (02). | Todos los assets son renders propios o material del estudio. Cada guion trae el prompt para generar variantes cuando haya integración. |
| Voz en off | Sin locutor ni TTS disponible con calidad de marca | Los anuncios funcionan sin sonido. El texto de locución es la columna "Texto en pantalla" de 05. |
| Permisos de clientes | A03, A09 y A10 muestran clientes del sitio | Confirmar antes de pautar |
| Proceso (A08) y acompañamiento (A09) | Son propuestas del estudio | Confirmar el texto |
| Licencia de Rotis para publicidad | No verificable desde acá | Confirmar con Monotype/Linotype |
| "Software" en el sitio | A04 lleva tráfico a un sitio que todavía no nombra la línea | Sumar la línea al sitio antes de pautar A04 |
| Métricas de reels de Instagram | Instagram no muestra reproducciones sin sesión | La investigación usa likes, comentarios, Vimeo, LinkedIn y Clutch, y lo aclara |

## 7. Variantes B (pruebas A/B)

Las diez variantes (`entregables/anuncios/*_b.mp4`) salen del mismo archivo que su versión A y pasaron los mismos controles:

| Control | Resultado |
|---|---|
| Formato | 1080×1920, 30 fps, 1.350 cuadros, 45,00 s, yuv420p BT.709 en las diez |
| Loudness | Entre -14,1 y -14,7 LUFS; true peak de -1,5 dBTP o menos después del códec |
| Composición (`qa.mjs`) | 0 problemas en las diez: sin superposiciones, dentro de la zona segura, sin texto sobre zonas cargadas |
| Una sola variable | Revisado cuadro por cuadro: cada B cambia solo el tramo indicado en `08-variantes-ab.md`; el resto es idéntico a la A |
| Versiones A | Sin cambios: el render de las B no tocó los archivos A |

Veracidad de lo nuevo:
- A10 B junta las dos entradas de Top Láser en `WORKS` (web, e identidad, social media y audiovisual).
- A08 B y A09 B solo cambian el destino: WhatsApp y el contacto del sitio.

Ninguna variante suma afirmaciones que no estén en la A.

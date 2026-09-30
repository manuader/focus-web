# Casos en movimiento: plan y estado

La sección **Casos** del sitio muestra cada cliente como una tarjeta con su logo, todas iguales: lo único que cambia es la imagen y el video. El scroll frena en cada caso (un caso por gesto de rueda, trackpad o dedo), y cuando el caso del centro queda quieto menos de un segundo, el logo se funde a un video corto que muestra el trabajo hecho. Al seguir scrolleando, el video se va y vuelve el logo.

Esta carpeta produce esos videos. Es un proyecto HyperFrames (el renderer de la skill brag): `index.html` es siempre la composición que se está por renderizar y la escriben los scripts.

## 1. Criterio común

Flujo tomado del pipeline de contenido (brief, evidencia, producción, oráculos, entrega) y de brag (mostrar la cosa real, específico, corto, cada cuadro presentable).

- **Formato:** 720 × 900 (4:5, la proporción de la tarjeta), 30 fps, sin audio. En el sitio corre mudo y en loop dentro de la tarjeta. Los casos de redes duran 12 s; los web, 12,6 s (lo que dura su video más la entrada y la salida).
- **Sin costura:** el primer y el último cuadro son la misma tarjeta del sitio (`public/assets/clients/<id>-card.jpg`) a sangre. El fundido desde el logo no se nota, y el loop tampoco.
- **Arranca ya:** el sitio lo muestra a 0,85 s de que la tarjeta se asienta, así que el movimiento empieza a los 0,2 s del video: el logo se va de foco y sube un teléfono.
- **Solo material real:** el sitio en producción (su copy, sus imágenes, su identidad), y publicaciones y reels de la cuenta del cliente. Nada generado, nada inventado.
- **Sin métricas de redes de clientes:** el perfil de Instagram se muestra sin seguidores ni cantidad de publicaciones, y sin nada que hable de quien lo capturó ("te sigue…").

## 2. Plantillas

| `tipo` | Para | Qué muestra | Fuente |
|---|---|---|---|
| `web` | Clientes a los que se les hizo el sitio | Un iPhone entero en cuadro, girando apenas, con **el video del sitio** corriendo a pantalla completa: una pieza de motion graphics hecha con brag (ver punto 3), no una grabación de pantalla | `brag/<id>.html` + `scripts/material-brag.sh` |
| `redes` | Clientes de social media y de contenido | El perfil de Instagram (nombre, rubro, bio, destacadas y grilla reales); la grilla sube, se abre un reel, se pasa al siguiente, y la cámara baja al pie con el autor y el texto de la publicación | `capturar-instagram.mjs` (perfil y reels) |
| `audiovisual` | (en desuso) | Un vertical y, con el teléfono girado, un video de YouTube. Era Santa Tuca; pasó a `redes`. La plantilla sigue en `build.mjs` | `capturar-youtube.mjs` |

## 3. Los videos de los sitios (brag)

Uno por sitio, en `brag/<id>.html`: 780 × 1688 (la pantalla de un iPhone a 2x), 10,6 s, mudo. Cada uno está hecho **con el propio sitio**: sus colores y tipografías exactos, su copy textual y sus imágenes. Forma de brag: gancho, revelación, dos o tres puntos fuertes y cierre.

| Sitio | Identidad | Gancho | Escenas | Cierre |
|---|---|---|---|---|
| **Ader Studio** (arquitectura) | Papel `#fafaf7`, tinta `#1a1917`, Barlow Condensed 800 con la segunda voz en itálica liviana. Tono sobrio | La brújula del logo gira y se asienta: "Todos los proyectos tienen un norte." | Proceso: los seis planos, del terreno base a la planta baja, en el mismo marco · BIM: el modelo se arma capa por capa (estructura, cerramientos, arquitectura, instalaciones) · Renders: la sala se apaga y corren dos columnas del portfolio | "Construyamos algo juntos." y "Agendar reunión" |
| **OUSHY Studio** (estudio creativo) | Papel `#f6efe9`, tinta `#54574f`, naranja `#ea6330`; Fredoka, Space Mono y la letra manuscrita de sus notas. Tono lúdico | El logotipo salta a escena con su estrella: "Creamos, producimos y potenciamos tu marca" | Servicios: "todo en un mismo lugar", las cuatro tarjetas de a una, y de la estrategia a la ejecución · Manifiesto: el naranja toma la pantalla, "marcas sólidas, coherentes y memorables." · El feed: dos filas de trabajos que corren | "trabajemos juntos" y "Iniciar proyecto" |
| **Top Láser** (imprenta) | Blanco, tinta `#1d1d1f`, acento `#e85d04`, Inter, y el degradé de marca. Tono de producto | El logo cae como un sticker: "Impresión Profesional. Resultados Premium." | Servicios: las cinco líneas, una detrás de otra · Galería: los trabajos se pegan en pantalla como stickers · Proceso: del concepto a la entrega, cuatro pasos sobre negro | "¿Listo para dar vida a tu visión?" y "Solicitar Cotización" |

Lo que se cambió respecto de la receta de brag, y por qué: **sin música ni efectos** (en el sitio la tarjeta corre muda) y **10,6 s en vez de 15 a 25** (es un loop dentro de una tarjeta, no una pieza suelta). Las cifras que aparecen en el de Top Láser ("+30 años de experiencia") son las que el propio sitio publica en su portada.

Los mp4 sueltos quedan en `casos/<id>/media/brag.mp4` (no se versionan): sirven también como pieza vertical para redes.

## 4. Un video por cliente

| Caso (`id`) | Servicio en el sitio | Plantilla | Material | Estado |
|---|---|---|---|---|
| `ader-studio` | Página web | `web` | `brag/ader-studio.html` | Listo |
| `oushy` | Página web | `web` | `brag/oushy.html` | Listo |
| `top-laser-web` | Página web | `web` | `brag/top-laser-web.html` | Listo |
| `chillin` | Social media | `redes` | @chillin1390bar: grilla, el reel de los espacios del bar y un flyer animado de "Is not chill in" | Listo (perfil con restricción de edad: se capturó con sesión) |
| `santa-tuca` | Audiovisual, social media | `redes` | @santatuca: grilla y los reels de Gante y de los coffee shops de Ámsterdam | Listo (perfil con restricción de edad: se capturó con sesión) |
| `top-laser` | Identidad, social media, audiovisual | `redes` | @toplaserimprenta: grilla y los reels de hangtags y de corte | Listo |
| `chuchones` | Social media | `redes` | @chuchones_wines: grilla y los reels de catas y de vinos para la picada | Listo |
| `rsh-consultora` | Social media | `redes` | @rsh_consultora: grilla y dos reels de recorridas | Listo |
| `fernanda-estetica` | Social media | `redes` | @esteticaintegralfernanda: grilla y dos reels de tratamientos | Listo |

Los recortes exactos (qué reel, desde qué segundo) están en `casos/<id>/caso.json`.

El material de los clientes (`casos/<id>/media/`, salvo la tarjeta) **no se versiona**: lo bajan los scripts. Lo que queda en el repo es la receta y el video final en `public/assets/cases/`.

## 5. Producir o rehacer un caso

```bash
# 1. material (según el tipo)
casos-video/scripts/material-brag.sh                       # web: logo, imágenes y tipografías de los sitios
node casos-video/scripts/capturar-instagram.mjs <id>       # redes: perfil y reels

# 2. armar, revisar, renderizar y codificar
casos-video/scripts/render.sh <id>        # o: render.sh todos
                                          # (un caso web renderiza antes su brag, si falta o cambió)

# 3. oráculos
casos-video/verify.sh
node casos-video/scripts/qa-sitio.mjs     # con el sitio corriendo en localhost:3100
```

Para revisar antes de renderizar:

- Un brag: `scripts/brag.sh --hoja <id>` deja cuadros en `snapshots/`; `scripts/hoja.sh <salida.jpg>` los une en una hoja.
- Un caso: `node scripts/build.mjs <id>` y después `npx hyperframes snapshot --at 1,3,5,7,9` dentro de `casos-video/`.

**Mirá la hoja** antes de dar algo por bueno.

Hace falta ffmpeg, yt-dlp, HyperFrames (`npx hyperframes`, o `HF=<ruta al binario>`) y Playwright con Chromium (los scripts lo buscan en `casos-video/`, `content/` o `instagram/campana-ads-01/produccion/`).

### Perfiles con restricción de edad

Instagram no muestra @chillin1390bar ni @santatuca sin sesión. Una persona inicia sesión en un Chrome abierto con depuración remota y el script usa esa sesión: abre una pestaña, lee el perfil y la cierra. No guarda cookies ni credenciales.

```bash
node casos-video/scripts/capturar-instagram.mjs --cdp http://127.0.0.1:9223 chillin santa-tuca
```

### Agregar un cliente

1. Creá `casos/<id>/caso.json` copiando el del tipo que corresponda. `<id>` es el `id` del caso en `WORKS` (`src/lib/content.ts`).
2. Copiá la tarjeta a `casos/<id>/media/card.jpg`.
3. Si es web, escribí su `brag/<id>.html` (con el copy, los colores y las imágenes del sitio) y sumá su material a `material-brag.sh`.
4. Capturá, renderizá, verificá.
5. En `WORKS`, agregale `video: '/assets/cases/<id>.mp4'`.

## 6. Oráculos

| Qué | Comando | Verde |
|---|---|---|
| Composición | `npx hyperframes lint` (lo corren `brag.sh` y `render.sh`) | 0 errores |
| Maquetación | Hoja de cuadros de cada brag y de cada caso | Revisada: nada cortado, texto legible, teléfono dentro del cuadro |
| Entrega | `casos-video/verify.sh` | `VERIFY_EXIT 0`: cada caso de `WORKS` con `video` tiene su mp4 de 720 × 900, de la duración que declara, sin audio, de menos de 2,5 MB, y el primer y el último cuadro coinciden con la tarjeta |
| Sitio | `npx tsc --noEmit`, `npm run lint` y `npm run build` | Sin errores |
| Sitio en pantalla | `scripts/qa-sitio.mjs` | Capturas en escritorio, laptop y dos teléfonos; la película arranca a menos de un segundo |
| Paradas | `scripts/qa-paradas.mjs` | La rueda, el trackpad y el dedo frenan en cada caso (un caso por gesto), y por los extremos se sale de la sección |

## 7. Decisiones abiertas (son del estudio)

1. **Permisos:** los videos muestran publicaciones de las cuentas de los clientes (incluidas personas a cámara). Están publicadas por ellos, pero conviene avisarles que aparecen en el sitio del estudio.
2. **@santatuca:** la cuenta es de cultura cannábica y sus reels lo muestran. Se eligieron los dos de viaje (Gante y Ámsterdam), que además son los que más edición tienen. Si el estudio prefiere otros, se cambian en `casos/santa-tuca/caso.json`.
3. **Cuentas con colaboraciones:** la grilla de @chillin1390bar incluye publicaciones hechas por otras cuentas en colaboración. Los dos reels que se abren son de la cuenta del bar.

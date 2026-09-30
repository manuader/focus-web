# Casos en movimiento: plan y estado

La sección **Casos** del sitio muestra cada cliente como una tarjeta con su logo. Cuando el caso del centro queda quieto tres segundos, el logo se funde a un video corto que muestra el trabajo hecho. Al seguir scrolleando, el video se va y vuelve el logo.

Esta carpeta produce esos videos. Es un proyecto HyperFrames (el renderer de la skill brag): `index.html` es siempre el caso que se está por renderizar y lo genera `scripts/build.mjs`.

## 1. Criterio común

Flujo tomado del pipeline de contenido (brief, evidencia, producción, oráculos, entrega) y de brag (mostrar la cosa real, específico, corto, cada cuadro presentable).

- **Formato:** 720 × 900 (4:5, la proporción de la tarjeta), 30 fps, 12 s, sin audio. En el sitio corre mudo y en loop dentro de la tarjeta.
- **Sin costura:** el primer y el último cuadro son la misma tarjeta del sitio (`public/assets/clients/<id>-card.jpg`) a sangre. El fundido desde el logo no se nota, y el loop tampoco.
- **Estructura (12 s):**

  | Tramo | Qué pasa |
  |---|---|
  | 0,0 a 0,6 | La tarjeta, quieta |
  | 0,6 a 1,8 | El logo se va de foco y sube un teléfono desde abajo |
  | 1,8 a 8,9 | El trabajo real, en movimiento (ver cada plantilla) |
  | 8,9 a 10,4 | El teléfono baja y el logo vuelve a foco |
  | 10,4 a 12,0 | La tarjeta, quieta |

- **Solo material real:** capturas del sitio en producción, y publicaciones y reels de la cuenta del cliente. Nada generado, nada inventado.
- **Sin métricas de clientes:** el perfil de Instagram se muestra sin seguidores ni cantidad de publicaciones.
- **Sin texto agregado:** lo que se lee es del cliente (su sitio, su bio, el texto de su publicación). El nombre y el rubro ya los pone el sitio debajo de la tarjeta.

## 2. Plantillas

| `tipo` | Para | Qué muestra | Fuente |
|---|---|---|---|
| `web` | Clientes a los que se les hizo el sitio | El sitio real recorrido en un teléfono, con su dominio en la barra: portada, dos secciones y el cierre, con saltos rápidos entre una y otra mientras la cámara se acerca | `capturar-sitio.mjs` (Playwright, viewport móvil, un screenshot por cuadro) |
| `redes` | Clientes de social media | El perfil de Instagram (bio, destacadas y grilla reales); la grilla sube, se abre un reel, se pasa al siguiente, y la cámara baja al pie con el autor y el texto de la publicación | `capturar-instagram.mjs` (perfil público sin sesión; reels con yt-dlp) |
| `audiovisual` | Edición de reels y de YouTube | Un vertical a pantalla completa; el teléfono gira a horizontal y corre un video de YouTube, con su título debajo | `capturar-youtube.mjs` (yt-dlp) |

## 3. Un video por cliente

| Caso (`id`) | Servicio en el sitio | Plantilla | Material | Estado |
|---|---|---|---|---|
| `ader-studio` | Página web | `web` | ader-studio.vercel.app: la brújula de entrada que se asienta en el logo, el estudio, los renders y el cierre | Listo |
| `oushy` | Página web | `web` | oushy-web.vercel.app: portada, servicios, manifiesto y feed, contacto | Listo |
| `top-laser-web` | Página web | `web` | toplaserimprenta.com: portada, packs, proyectos, llamado final | Listo |
| `chillin` | Social media | `redes` | @chillin1390bar | **Bloqueado:** el perfil tiene restricción de edad y no se ve sin sesión |
| `santa-tuca` | Audiovisual, social media | `audiovisual` | Un Short del canal y el video "Recorriendo la ciudad medieval de Gante" | Listo. **A confirmar:** que esas dos piezas las editó el estudio |
| `top-laser` | Identidad, social media, audiovisual | `redes` | @toplaserimprenta: grilla y los reels de hangtags y de corte | Listo |
| `chuchones` | Social media | `redes` | @chuchones_wines: grilla y los reels de catas y de vinos para la picada | Listo |
| `rsh-consultora` | Social media | `redes` | @rsh_consultora: grilla y dos reels de recorridas | Listo |
| `fernanda-estetica` | Social media | `redes` | @esteticaintegralfernanda: grilla y dos reels de tratamientos | Listo |

Los recortes exactos (qué reel, desde qué segundo) están en `casos/<id>/caso.json`.

El material de los clientes (`casos/<id>/media/`, salvo la tarjeta) **no se versiona**: lo bajan los scripts de captura. Lo que queda en el repo es la receta y el video final en `public/assets/cases/`.

## 4. Producir o rehacer un caso

```bash
# 1. material (según el tipo)
node casos-video/scripts/capturar-sitio.mjs <id>
node casos-video/scripts/capturar-instagram.mjs <id>
node casos-video/scripts/capturar-youtube.mjs <id>

# 2. armar, revisar, renderizar y codificar
casos-video/scripts/render.sh <id>        # o: render.sh todos

# 3. oráculo
casos-video/verify.sh
```

Para revisar antes de renderizar: `node scripts/build.mjs <id>` y después `npx hyperframes snapshot --at 1,3,5,7,9` dentro de `casos-video/`. **Mirá la hoja** (`snapshots/contact-sheet.jpg`).

Hace falta ffmpeg, yt-dlp, HyperFrames (`npx hyperframes`, o `HF=<ruta al binario>`) y Playwright con Chromium (los scripts lo buscan en `casos-video/`, `content/` o `instagram/campana-ads-01/produccion/`).

### Agregar un cliente

1. Creá `casos/<id>/caso.json` copiando el del tipo que corresponda. `<id>` es el `id` del caso en `WORKS` (`src/lib/content.ts`).
2. Copiá la tarjeta a `casos/<id>/media/card.jpg`.
3. Capturá, renderizá, verificá.
4. En `WORKS`, agregale `video: '/assets/cases/<id>.mp4'`.

## 5. Oráculos

| Qué | Comando | Verde |
|---|---|---|
| Composición | `npx hyperframes lint` (lo corre `render.sh`) | 0 errores |
| Maquetación | Hoja de cuadros de cada caso | Revisada: teléfono dentro del cuadro, nada cortado, texto legible |
| Entrega | `casos-video/verify.sh` | `VERIFY_EXIT 0`: cada caso de `WORKS` con `video` tiene su mp4 de 720 × 900, 12 s, sin audio, de menos de 2,5 MB, y el primer y el último cuadro coinciden con la tarjeta |
| Sitio | `npx tsc --noEmit` y `npm run build` | Sin errores |

## 6. Decisiones abiertas (son del estudio)

1. **@chillin1390bar:** falta el video. El perfil pide sesión de Instagram por la restricción de edad; con una sesión iniciada por una persona se captura igual que los demás (`capturar-instagram.mjs --estado`). Después hay que elegir dos reels en `casos/chillin/caso.json`, sacarle `"pendiente": true` y sumar `video` en `WORKS`. Hasta entonces la tarjeta se queda en el logo.
2. **@santatuca:** confirmar que el Short y el video de Gante son piezas editadas por el estudio, o indicar cuáles usar.
3. **Permisos:** los videos muestran publicaciones de las cuentas de los clientes (incluidas personas a cámara). Están publicadas por ellos, pero conviene avisarles que aparecen en el sitio del estudio.
4. **Dominio de Ader Studio y de OUSHY:** la barra muestra el dominio real de hoy (`*.vercel.app`). Cuando tengan dominio propio, se recaptura.

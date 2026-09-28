# 01 · Marca: qué es FOCUS (investigación)

Fuentes revisadas el 28/09/2026:
- **focuscreatives.net**: es el sitio en vivo. Es este mismo repo (Next.js), así que el copy sale de `src/lib/content.ts`.
- **focus-creatives.com**: hoy muestra una página de "Próximamente".
- **Assets del repo**: `public/assets/` (logo, key visuals `img-01` a `img-06`, anillos, retícula, tarjetas de clientes), `src/app/globals.css` (tokens), `src/app/fonts/` (Rotis Semi Sans).
- **Historial de git**: 34 commits, del 03/08 al 28/09/2026.

Todo lo de este documento sale de esas fuentes, salvo lo marcado como **supuesto**.

## Propuesta de valor

> "No construimos marcas desde cero. Revelamos el ángulo que ya estaba ahí y lo volvemos imposible de ignorar." (hero del sitio)

- **Qué vende FOCUS:** criterio y claridad, no piezas sueltas. El sitio lo formula como "Siete disciplinas, un solo criterio: que la pieza no se pueda confundir con la de nadie más".
- **Concepto:** el umbral, "el punto donde una identidad dejó de ser lo que era y todavía no es lo que será. Ahí trabajamos".
- **Tagline:** *El punto donde todo cambia.*
- **Base:** Buenos Aires. Trabaja en español rioplatense y en inglés.

## Servicios (verificados en el sitio)

1. Identidad de marca: naming, isologotipo, sistema completo, manual.
2. Dirección de arte: campañas, producción fotográfica, styling.
3. Social media management: contenido, planificación, comunidad, métricas.
4. Contenido audiovisual: piezas para redes, film de marca, motion.
5. Estrategia: posicionamiento, arquitectura de marca, tono de voz.
6. Páginas web: diseño, desarrollo, SEO, mantenimiento.
7. Editorial y packaging: libros, catálogos, etiquetas, estuchería.

Además, el ticker del sitio suma "Contenido con inteligencia artificial".

**Software.** Lo declaró el estudio en el brief: productos digitales y experiencias interactivas. **Supuesto:** el sitio todavía no lo dice; hoy se presenta como "agencia de diseño integral y creación de contenido". La prueba pública de esta capacidad es el propio sitio: prisma animado por scroll, refracción táctil, puntero virtual en teléfonos, idioma según el navegador. Recomiendo sumar "producto digital" al sitio antes de que la tanda empuje ese frente.

## Casos verificados (`WORKS` en `content.ts`)

| Cliente | Rubro | Qué hizo FOCUS | Dónde se ve |
|---|---|---|---|
| Ader Studio | Arquitectura | Web | ader-studio.vercel.app |
| OUSHY Studio | Estudio creativo | Web | oushy-web.vercel.app |
| Top Láser | Imprenta | Web | toplaserimprenta.com |
| Top Láser | Imprenta | Identidad, social media, audiovisual | @toplaserimprenta |
| @chillin1390bar | Bar | Social media | Instagram |
| @santatuca | Creador de contenido | Edición de reels y YouTube, social media | Instagram |
| @chuchones_wines | Vinos boutique | Social media | Instagram |
| @rsh_consultora | Seguridad e higiene | Social media | Instagram |
| @esteticaintegralfernanda | Estética y salud | Social media | Instagram |

No hay métricas, resultados ni testimonios publicados de ninguno. **La tanda no inventa ninguno.**

### Portfolio a confirmar: Music Box, Alquilalo, Fisu Evolution

Lo busqué en la web y en GitHub. Ninguno se puede presentar hoy como trabajo de FOCUS.

- **Music Box:** no hay nada público. Existe un repo privado `manuader/musicboxd`, creado en 08/2026. No se puede verificar de qué se trata.
- **Alquilalo:** existe alquilalo.com.ar ("Si no lo usás, lo alquilás"), pero sin créditos, y no encontré ningún vínculo con FOCUS ni con el dueño. Además hay homónimos que no tienen relación.
- **Fisu Evolution:** existe el repo público `manuader/fisuevolution` (Swift/iOS, unos 544 commits, en desarrollo). Ninguna fuente lo atribuye a FOCUS.

Para sumarlos necesito, por cada uno: qué es, qué hizo FOCUS, si se puede mostrar (con permiso del cliente si hay cliente), capturas o grabaciones, y la URL pública. La matriz deja un lugar reservado (reel R-X).

## Tono (literal del sitio)

- Rioplatense, con voseo, corto y aforístico.
- Sin signos de exclamación ni rayas. Está escrito como regla en la cabecera de `content.ts`.
- Frases de marca: "Mirar no alcanza", "Una marca no se inventa. Se enfoca.", "Nos movemos para ver otro ángulo", "Un foco entre la dispersión", "La atención es el recurso más caro del mundo. No la pedimos, la capturamos.", "Enfoquemos lo que ya es tuyo".
- Valores: Libertad, Profundidad, Atención, Curiosidad.

## Identidad visual (tokens reales)

- **Colores:**
  - Base: Ink `#0A0A0B`, Ink 2 `#17181B`, Paper `#F6F6F4`.
  - Acentos de luz aditiva: magenta `#FF00FF`, azul `#0033FF` (para texto chico `#5B8CFF`), verde `#00FF33`.
  - Grises fríos para las zonas desenfocadas.
  - Regla del propio CSS: colores saturados "como acentos sobre tinta o papel, nunca como campos planos".
- **Tipografía:**
  - Rotis Semi Sans (Light, Light Italic, Italic, Bold, ExtraBold). Hay OTF en el repo.
  - Serif de apoyo: Source Serif 4 Italic, que reemplaza a Rotis Semi Serif, que nunca se entregó.
- **Logo:** wordmark FOCUS con la "C" abierta. Hay versión clara, oscura y animada (`logo animation.mp4`, `focus-logo-anim.webp`).
- **Recursos gráficos:** anillos concéntricos, retícula de enfoque, grano, viñeta, scanline, rótulos técnicos.
- **Key visuals de campaña** (`img-01` a `img-05`):
  - Fotografía en blanco y negro con intervención holográfica o RGB sobre un gesto (manos en un vidrio, ojo tras una lupa).
  - Lockup: TÍTULO en Bold mayúscula más bajada en Light Italic.
  - Ej.: "MIRAR / NO ALCANZA", "NOS MOVEMOS / PARA VER OTRO ÁNGULO", "UN FOCO / ENTRE LA DISPERSIÓN".
- **Póster de marca** (`img-06`): círculos saturados, cáusticas de agua. Usa rojo, amarillo y cian, que no están en la paleta del manual. Se trata como obra: se muestra tal cual y sus colores no se extienden al resto.
- **Motion del sitio** (sirve de referencia directa para video): rack focus del texto con el scroll, refracción en tres capas, superposición en modo diferencia, prisma invertido (siete bandas que entran, un haz "TU MARCA" que sale), umbral que se abre y lente que sigue al dedo.

## Qué falta (y cómo avancé)

| Falta | Impacto | Cómo avancé |
|---|---|---|
| Handle de Instagram | Menciones, CTA, portada | Las piezas no lo nombran; el CTA lleva a focuscreatives.net o al DM |
| Material y permiso de Music Box, Alquilalo, Fisu Evolution | Piezas de software con caso | Reservé el reel R-X; el software se demuestra con el sitio propio |
| Confirmar que los clientes aceptan aparecer en Instagram | R07, C03, S04 | Solo uso lo que ya está publicado en el sitio |
| Voz para la locución | R01 y R09 tienen voz en off opcional | Los videos funcionan sin voz; el guion de locución está listo |
| Licencia de Rotis para video y redes | Riesgo legal bajo, pero real | Pendiente: confirmar el alcance de la licencia de Monotype/Linotype |
| El dominio focus-creatives.com muestra "Próximamente", pero el SEO del sitio (`SITE_URL`) y `llms.txt` apuntan ahí | Enlaces rotos o confusos | Todas las piezas usan focuscreatives.net. Recomiendo redirigir .com a .net o corregir `SITE_URL` |

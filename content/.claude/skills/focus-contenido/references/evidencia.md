# Evidencia: lo que FOCUS puede afirmar

Toda afirmación de una pieza (cliente, servicio, cifra, detalle técnico o resultado) tiene que estar acá con su fuente. Si no está, no se afirma.

Cada dato lleva una de tres etiquetas:
- **Comprobado:** se verificó en una fuente primaria (el código, el sitio en vivo o el historial de git).
- **Declarado:** lo dijo el estudio, pero todavía no se ve en ninguna fuente pública.
- **A validar:** existe, pero falta confirmar la atribución o el permiso.

Última revisión: 30/09/2026.

## 1. El estudio

| Dato | Etiqueta | Fuente |
|---|---|---|
| FOCUS creatives es una agencia de diseño integral y creación de contenido de Buenos Aires | Comprobado | focuscreatives.net (hero); `focus-web/src/lib/content.ts` |
| Trabaja en español rioplatense y en inglés | Comprobado | Sitio bilingüe; `public/llms.txt` |
| Tagline: "El punto donde todo cambia" | Comprobado | `content.ts` (`COPY.tagline`) |
| Siete servicios: identidad de marca, dirección de arte, social media management, contenido audiovisual, estrategia, páginas web, editorial y packaging. Suma contenido con IA en el ticker | Comprobado | `content.ts` (`SERVICES`, `TICKER_ITEMS`) |
| Valores: Libertad, Profundidad, Atención, Curiosidad | Comprobado | `content.ts` (`VALUES`) |
| **Desarrolla productos digitales y experiencias interactivas (frente software)** | **Declarado** | Brief del estudio (28 y 30/09/2026). El sitio todavía no lo dice. |
| Contacto: info@focus-creatives.com · WhatsApp +54 9 11 5926 4267 · reunión de 30 min en calendly.com/focus-creatives-info/30min | Comprobado | `content.ts` (`CONTACT`) |
| Dominio vivo: **focuscreatives.net**. focus-creatives.com muestra "Próximamente" | Comprobado | Consulta HTTP del 28/09/2026 |

## 2. Casos de clientes (`WORKS` de `content.ts`)

Solo estos, con estos servicios. **No hay métricas, resultados ni testimonios publicados de ninguno.**

| Cliente | Rubro | Servicios | Dónde se ve | Etiqueta |
|---|---|---|---|---|
| Ader Studio | Arquitectura | Web (página web) | ader-studio.vercel.app | Comprobado |
| OUSHY Studio | Estudio creativo | Web | oushy-web.vercel.app | Comprobado |
| Top Láser | Imprenta | Web | toplaserimprenta.com | Comprobado |
| Top Láser | Imprenta | Identidad, social media, audiovisual | @toplaserimprenta | Comprobado |
| @chillin1390bar | Bar | Social media | Instagram | Comprobado |
| @santatuca | Creador de contenido | Edición de reels y YouTube, social media | Instagram | Comprobado |
| @chuchones_wines | Vinos boutique | Social media | Instagram | Comprobado |
| @rsh_consultora | Seguridad e higiene | Social media | Instagram | Comprobado |
| @esteticaintegralfernanda | Estética y salud | Social media | Instagram | Comprobado |

Etiquetar a los clientes en Instagram es una **decisión de negocio**: se confirma con cada uno antes de publicar.

## 3. El sitio como caso de software (Comprobado en el código)

| Dato | Fuente |
|---|---|
| Migrado de Claude Design a Next.js 15 + React 19 el 03/08/2026 | `git log` de focus-web |
| 34 commits entre el 03/08 y el 28/09/2026 | `git rev-list --count` (sin contar el WIP) |
| Superposición: dos círculos en `mix-blend-mode: difference` | `Superposicion.tsx` |
| Refracción: tres capas en modo screen que siguen el puntero y se recomponen | `Refraccion.tsx` |
| Prisma de servicios invertido, animado por scroll, con versión vertical propia para teléfono | `Servicios.tsx`, `PrismaMovil.tsx`, commit "Give phones a real prism" |
| Puntero virtual en pantallas táctiles | `PointerContext.tsx` |
| Idioma inicial según Accept-Language (y país) | `src/lib/locale.ts`, `middleware.ts` |
| Azul de texto `#5B8CFF` (6,2:1) porque `#0033FF` da 2,47:1 sobre tinta | `globals.css`, `content.ts` |
| Con "reducir movimiento" activado, una regla global corta los loops de animación ("kill the ambient loops") y las secciones animadas por JS lo respetan | `globals.css` (`@media (prefers-reduced-motion: reduce)`), `Servicios.tsx`, `PrismaMovil.tsx`, `Manifiesto.tsx` y más |
| El inglés del sitio está escrito para un lector nativo, no traducido palabra por palabra | Cabecera de `content.ts`; commit "Write the English for English readers" (18/09/2026) |
| Foco: la lente sigue al cursor, o al dedo en pantallas táctiles, y enfoca el párrafo | `Foco.tsx`, `foco.module.css`; pistas "Tu cursor es la lente" y "Tu dedo es la lente" en `content.ts` |
| Las capturas de las piezas se graban del sitio real en una vista de teléfono (432×768 a 2,5x), con tiempo virtual y **toques simulados**. Son grabaciones de pantalla editadas, no un dedo real ni una toma sin cortes | `kit/capture.mjs` |
| Commits que se pueden citar textualmente, con su fecha: 03/08 "Migrate FOCUS site from Claude Design to Next.js" · 06/08 "Open the site with the aperture spinning into the wordmark" · 19/08 "Rebuild Servicios as an inverted prism" · 20/08 "Add the vertical prism for phones, and fix contrast site-wide" · 25/08 "Give phones a pointer, so the cursor sections come alive" · 25/08 "Keep the affordance copy honest on every device" · 25/08 "Stop measuring five sections a frame to animate one" · 18/09 "Open the site in the visitor's language" · 18/09 "Write the English for English readers" · 28/09 "Give phones a real prism" | `git log` de focus-web (verificado el 30/09/2026) |

## 4. Portfolio del fundador (verificado el 30/09/2026)

Ninguno de estos proyectos figura en el sitio como trabajo de FOCUS. **Presentarlos como trabajo de FOCUS es una decisión de negocio** (ver §5).

| Proyecto | Qué es (verificado) | Quién aparece como autor | Público | Etiqueta |
|---|---|---|---|---|
| **AderGames · FisuEvolution** | Juego iOS *merge-idle* "From broke to God": 30 niveles de evolución, carreras, eventos de economía, reencarnación y progreso offline. "Coming soon to the App Store". Sitio bilingüe en Next.js | Ader Games, publicado como persona física **Manuel Ader**. Fundado en 2026 | adergames-site.vercel.app (200 OK) · repo público manuader/fisuevolution (Swift 6) | A validar (atribución a FOCUS) |
| **MusicBoxd** | Red social de reseñas de música: API REST en Java (Jersey, HATEOAS, ETag) y frontend React + Redux. Paquete `ar.edu.itba.paw`: proyecto de la materia PAW del ITBA | Repo privado manuader/musicboxd. Es un proyecto de equipo universitario | Sin URL pública | A validar (autoría compartida; sin demo pública) |
| **Alquilalo** | Marketplace de alquileres ("Alquilalo") en Next.js + Prisma, de 2024 | Repo MatiSapino/rent; el último commit es de MatiSapino | Sin deploy verificado. alquilalo.com.ar existe, pero sin créditos que la vinculen | A validar (autoría de terceros) |

**Lo que no se puede afirmar de ninguno:** descargas, usuarios, calificaciones, ingresos ni "lanzado". FisuEvolution todavía no salió: su estado público es *coming soon*.

## 5. Decisiones abiertas (son del usuario)

1. ¿FOCUS puede presentar FisuEvolution y el sitio de Ader Games como trabajo propio o como "producto del equipo"? Si la respuesta es sí, la pieza borrador `rx-fisuevolution` pasa a publicable.
2. ¿MusicBoxd y Alquilalo se pueden mostrar? Hace falta el consentimiento de los coautores y alguna demo pública.
3. ¿Se suma "producto digital / software" al sitio? Recomendado antes de publicar las piezas de software.
4. ¿Se confirma con cada cliente que se lo etiquete en Instagram?

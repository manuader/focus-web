# 03 · Sistema creativo de FOCUS para la campaña "Sin plantilla"

Fuentes: el design system de Claude Design (`design-system/`, incluye el manual `uploads/TP-Produ-Capella.pdf`), el sitio en vivo focuscreatives.net (este repo: `src/lib/content.ts`, `src/app/globals.css`, `public/`) y la skill `focus-identidad`. Donde el design system y el sitio difieren, se indica cuál manda y por qué.

Este documento tiene tres partes:
- **A. Lo que ya existe** y se mantiene en los diez anuncios.
- **B. Lo que se suma** al sistema: concepto, piezas y reglas nuevas. Quedó incorporado al design system v2 (`design-system/`) y a la skill.
- **C. Lo que hay que confirmar** del lado del estudio.

---

## A. Lo que ya existe (reglas que no se tocan)

### A1. La idea

- **FOCUS revela el ángulo que ya estaba ahí.** No inventa marcas: las enfoca. (Hero del sitio: "No construimos marcas desde cero. Revelamos el ángulo que ya estaba ahí y lo volvemos imposible de ignorar.")
- **El umbral:** el momento entre dos estados, cuando una identidad dejó de ser lo que era y todavía no es lo que será.
- **Tagline:** *El punto donde todo cambia.*
- **Cuatro conceptos del manual:** refracción (el triplete magenta, azul y verde desplazado), superposición (dos estados que se cruzan y el color nace donde se tocan, `mix-blend-mode: difference`), densidad (anillos concéntricos: cuanto más te acercás, más hay) y foco (un punto nítido por pieza, todo lo demás disuelto). Subconceptos: pasaje y umbral/limen ("lo que parece una puerta resulta ser un mundo").
- **Valores:** Libertad, Profundidad, Atención, Curiosidad.

### A2. Color

| Token | Hex | Uso |
|---|---|---|
| Ink | `#0A0A0B` | Superficie por defecto |
| Ink 2 | `#17181B` | Planos secundarios |
| Paper | `#F6F6F4` | Texto; superficie solo en piezas "de papel" |
| Magenta | `#FF00FF` | Acento 1 |
| Azul | `#0033FF` (texto chico sobre Ink: `#5B8CFF`) | Acento 2 |
| Verde | `#00FF33` | Acento 3 |
| Grises fríos | `#E7E9EC` `#A7ACB4` `#7C818A` `#6B7078` `#3A3D42` | Zonas fuera de foco y texto secundario |

- Color como **luz sobre oscuridad**, nunca como fondo plano. 85 a 95% del cuadro en tinta y grises.
- Espectro de transición, siete pasos (uno por disciplina): `#FF00FF #C010FF #8020FF #0033FF #0080DD #00C088 #00FF33`.
- Rojo, amarillo, naranja y cian no existen en la paleta. El póster de marca (`img-06`) se muestra como obra, sin extender sus colores.

### A3. Tipografía

- **Rotis Semi Sans** en todo: Light para titulares, Bold para una palabra de énfasis y para eyebrows en mayúsculas con tracking.
- **Source Serif 4 Italic** (sustituto de Rotis Semi Serif, que nunca se entregó) para *una* palabra por pieza, la que "enfoca".
- **Lockup de campaña:** TÍTULO en Bold mayúsculas y bajada en Light Italic mayúsculas al 40% ("MIRAR / *NO ALCANZA*").
- **Diferencia con el design system:** el DS propone Source Serif 4 como display y Archivo Black para el wordmark. El sitio no los usa así: titula en Rotis Semi Sans Light y el wordmark es siempre el archivo PNG. **Manda el sitio**, porque es la marca publicada. Archivo Black no se usa (el logo nunca se retipea).

### A4. Composición

- Un solo punto nítido por cuadro, descentrado (cerca de un tercio o de un borde).
- Logo fijo en una esquina, sin alterar. Recursos gráficos propios: anillos, retícula, grano, viñeta, rótulos técnicos.
- Sin esquinas redondeadas, sin sombras, sin bordes decorativos. Marco de 1 px gris solo para enmarcar trabajo real.

### A5. Imagen

- Fotografía: blanco y negro de alto contraste, un gesto humano y la intervención de color solo sobre el gesto.
- Fondo fuera de foco: `grayscale(1) brightness(0.3) contrast(1.25) blur(7px)`.
- Trabajo de clientes: en su color original, nítido, enmarcado y sin intervenir.

### A6. Voz

- Rioplatense con voseo, corta, aforística. Una idea por frase.
- Sin signos de exclamación, sin rayas, sin emojis en pantalla.
- Prohibido: "potenciá", "llevá al siguiente nivel", "soluciones integrales", "somos apasionados", "calidad premium", urgencia falsa y cifras sin fuente.

### A7. Veracidad

- Clientes y servicios: solo los de `WORKS` en `content.ts`.
  - Ader Studio · web
  - OUSHY Studio · web
  - Top Láser · web; identidad, social media, audiovisual
  - @chillin1390bar · social media
  - @santatuca · edición de reels y YouTube, social media
  - @chuchones_wines · social media
  - @rsh_consultora · social media
  - @esteticaintegralfernanda · social media
- Sin métricas, testimonios, premios ni resultados de clientes.
- Software: no hay caso de cliente verificado. Se demuestra con trabajo propio (el sitio, el motor que produjo esta campaña) y con prototipos rotulados "concepto".

---

## B. Lo que se suma al sistema

### B1. La plataforma de campaña: "Sin plantilla"

**Por qué esta idea.** En 2026 producir es barato: cualquiera genera cien piezas con IA en una tarde. Lo que se volvió caro es **distinguirse**. Los compradores premium lo saben, y le temen a dos cosas: pagar precio de estudio por algo que se ve genérico, o contratar a alguien que "usa IA" y entrega lo mismo que todos. FOCUS responde las dos con una sola postura: **usa IA y flujos agénticos para explorar, producir y probar más; decide con criterio de autor; y termina cada pieza a mano, a medida.**

- **Línea de campaña:** *Sin plantilla.* Aparece como rótulo técnico en el cierre de los diez anuncios ("Sin plantilla · 03/10"). No reemplaza al tagline: lo precede.
- **Es verificable en la propia campaña:** ninguno de los diez anuncios se hizo con plantillas ni con una app de edición. Cada cuadro se escribió en código y cada banda sonora se compuso para su anuncio (ver `produccion/`). El anuncio A06 lo muestra.
- **Relación con el concepto madre:** una plantilla es lo contrario de enfocar. Aplica una forma que ya existe a cualquier marca. FOCUS hace lo inverso: encuentra la forma que ya estaba en esa marca.

### B2. Atlas óptico: un fenómeno por anuncio

El sistema original tiene tres metáforas (foco, refracción, umbral) y cuatro conceptos del manual. Para que diez anuncios no repitan el mismo gesto, el sistema suma un **atlas de fenómenos ópticos**. Cada fenómeno tiene un significado para el cliente, un servicio al que sirve, un recurso visual, un movimiento y un sonido. Cada anuncio usa uno solo como gesto dominante.

| # | Fenómeno | Qué significa para el cliente | Servicio que ilustra | Recurso visual (motor) | Movimiento | Sonido |
|---|---|---|---|---|---|---|
| 1 | **Superposición** | Cuando todo se parece, se anula. Lo propio es lo que queda. | Contenido con IA · dirección de arte | Capas en `difference` que se cancelan a negro | Capas que se deslizan hasta coincidir | Acordes que se anulan y un tono que queda solo |
| 2 | **Profundidad de campo** | La marca está, pero fuera de foco. | Identidad · estrategia | Lente de vidrio 3D sobre imagen (`scenes/lens`) | Rack focus entre planos | Tick de lente en cada cambio de plano |
| 3 | **Reflexión** | Lo que queda cuando la persona sale del cuadro. | Marca para creadores · social media | Columna de vidrio sobre espejo negro (`scenes/mirror`) | La columna sube, el reflejo se vuelve anillo | Vidrio y aire, sin pulso |
| 4 | **Difracción** | La rejilla que ordena el ruido en estructura. | Software a medida | Interferencia que se alinea en grilla (`glsl.interference`) | Ondas que se ordenan | Pulso que se cuantiza al tempo |
| 5 | **Densidad** | Una decisión que se replica en todo. | Sistema de identidad · editorial y packaging | Anillos en zoom infinito (`glsl.density`) | Zoom continuo hacia adentro | Arpegio que suma una voz por anillo |
| 6 | **Exposición larga** | El trabajo como recorrido: etapas que convergen. | IA y flujos agénticos · audiovisual | Trayectorias de luz (`glsl.trails`) | Cinco caminos que convergen en un punto | Arpegio en loop que se resuelve |
| 7 | **Cáustica** | La interfaz como superficie que la luz atraviesa. | Páginas web | Red de luz de agua o vidrio (`glsl.caustic`) sobre capturas reales | Deriva lenta de la red | Pad acuoso y clics de interfaz |
| 8 | **Umbral** | Cada etapa del trabajo es una puerta que se cruza. | Proceso de trabajo | Rendija de luz volumétrica con polvo (`glsl.slit`) | Rendija que se abre y barre | Swell de aire y golpe grave en cada cruce |
| 9 | **Órbita** | Un ciclo que vuelve todos los meses. | Acompañamiento mensual · social media | Anillos de vidrio 3D con marcas (`scenes/orbit`) | Rotación lenta, un punto de luz por anillo | Pulso a 90 BPM, campana cada vuelta |
| 10 | **Dispersión y recomposición** | Siete disciplinas, un solo haz. | Todo el estudio | Prisma 3D con dispersión (`scenes/prism`) | El espectro entra, un haz blanco sale | Acorde que pasa de suspendido a mayor |

Reglas del atlas:
- **Un fenómeno dominante por pieza.** Los otros pueden aparecer como transición, nunca como protagonista.
- **Dos piezas seguidas en la pauta nunca comparten fenómeno.**
- **Toda pieza termina resuelta:** en foco, en luz blanca recompuesta o en el logo.
- El prisma de A10 no repite la toma del sitio: la luz cae **de arriba hacia abajo**, en vertical y en 3D, y en modo recomposición (el espectro entra, el blanco sale). Se evita la composición frontal de un haz horizontal sobre un prisma plano, que es la imagen de una portada de disco muy conocida.

### B3. Glifos ópticos: un diagrama por servicio (nuevo recurso)

El manual dice que no hay sistema de íconos. Se mantiene: los glifos no son íconos de interfaz sino **diagramas de física óptica**, dibujados como los anillos y la retícula (trazo de 1,5 px, `currentColor`, sin relleno), que se usan como rótulo técnico junto al nombre de un servicio.

| Archivo (`design-system/assets/glyphs/`) | Servicio | Diagrama |
|---|---|---|
| `estrategia.svg` | Estrategia | Lente convergente: tres rayos, un punto focal |
| `identidad.svg` | Identidad de marca | Prisma que abre un haz en tres |
| `direccion-de-arte.svg` | Dirección de arte | Red cáustica |
| `audiovisual.svg` | Contenido audiovisual | Trazo de exposición larga |
| `social-media.svg` | Social media management | Órbita elíptica con dos cuerpos |
| `web.svg` | Páginas web | Rayos que atraviesan una superficie rectangular |
| `editorial-packaging.svg` | Editorial y packaging | Anillos de densidad |
| `software.svg` | Software a medida | Rejilla de difracción y órdenes |
| `ia-agentes.svg` | IA y flujos agénticos | Dos espejos y un rayo que se multiplica |
| `umbral.svg` | Umbral (proceso) | Una línea y un punto que la cruza |

Uso: a 64 a 96 px en reels, en gris `#7C818A` o en un acento; nunca más de uno por cuadro; nunca decorativo.

### B4. Arquitectura de oferta (propuesta para confirmar)

Para que un comprador premium entienda en diez segundos qué contrata, los servicios se ordenan en **cuatro frentes y una forma de trabajo**. No se cambia ningún nombre del sitio; se agrupan.

| Frente | Servicios del sitio | Formato de contratación típico |
|---|---|---|
| **Marca** | Estrategia · Identidad de marca · Editorial y packaging | Proyecto |
| **Imagen** | Dirección de arte · Contenido audiovisual · Contenido con IA | Proyecto o campaña |
| **Presencia** | Social media management · Páginas web | Acompañamiento mensual (redes, contenido, mantenimiento web) |
| **Producto** (nuevo) | Software a medida · Flujos con IA y agentes | Proyecto, con mantenimiento opcional |

**Forma de trabajo** (para A08, a confirmar por el estudio): Diagnóstico → Dirección → Sistema → Acompañamiento. Un equipo, un criterio, un interlocutor.

**Precios:** los anuncios no publican ninguno. La referencia interna del brief (proyectos desde USD 10.000; acompañamientos cercanos a USD 5.000 mensuales) define a quién se le habla y con qué tono, pero no aparece en pantalla, en captions ni en rótulos. Tampoco se mezclan: los anuncios de proyecto (A02, A04, A05, A07, A10) nunca hablan de "por mes", y el de acompañamiento (A09) nunca habla de "proyecto cerrado".

### B5. Formato de anuncio en Reels (reglas nuevas)

- **Lienzo:** 1080×1920, 30 fps, 45 s (±1 s).
- **Zonas seguras de Reels pagos:** arriba 270 px y abajo 670 px sin texto; 140 px a la derecha libres de texto importante (botones de la interfaz). **Todo texto vive entre y = 280 e y = 1240, x = 80 a 940.** El motor tiene una guía (`F.safe`) que se enciende en los cuadros de control.
- **Tamaños mínimos:** titulares de 88 a 140 px; texto de lectura 44 a 56 px; rótulos 24 a 30 px (solo datos, nunca mensaje).
- **Estructura de 45 s:**
  1. **0 a 3 s, gancho.** El texto aparece antes de 0,5 s y anuncia qué vas a ver.
  2. **3 a 8 s, promesa.**
  3. **8 a 36 s, desarrollo** en tres o cuatro movimientos de 7 a 9 s. En cada movimiento cambia el estímulo: escala, plano o fenómeno.
  4. **36 a 41 s, giro o prueba.**
  5. **41 a 45 s, cierre** con placa común.
- **Placa de cierre común** (`F.end`):
  - Una frase de cierre.
  - Una regla fina.
  - El CTA en una línea.
  - El destino en gris.
  - El logo a 300 px.
  - El rótulo "Sin plantilla · NN/10".
  - Así los diez anuncios firman igual y la serie se reconoce.
- **Portada:** el cuadro 0 del video es la portada (el cuadro asentado más fuerte). Se entrega también como JPG.
- **Sin sonido:** todo anuncio se entiende en silencio. No hay voz en off en esta tanda (ver C).

### B6. Movimiento (tokens nuevos)

| Token | Valor | Uso |
|---|---|---|
| `--ease-focus` | `cubic-bezier(0.16, 1, 0.3, 1)` | Toda entrada. Lento para entrar, preciso para resolver. |
| `--ease-cross` | `cubic-bezier(0.65, 0, 0.35, 1)` | Cámaras, barridos, desplazamientos |
| `--dur-rack` | 0,9 s | Rack focus de texto (blur 16 → 0) |
| `--dur-read` | 0,3 s por palabra + 0,5 s | Tiempo mínimo en pantalla de un texto |
| `--stagger-word` | 0,06 a 0,09 s | Palabra por palabra |
| `--beat-cut` | 60/BPM | Los cortes caen en el tiempo fuerte del pulso de cada anuncio |

Archivo: `design-system/tokens/motion.css`.

### B7. Identidad sonora (nuevo)

Hasta ahora la marca tenía reglas de sonido pero no un **motivo propio**. Se suma:
- **Firma sonora:** tres notas de vidrio (tónica, quinta y octava de la tonalidad del anuncio), arpegiadas con 35 ms de separación y cola de 2,8 s. Suena cuando el logo entra en la placa de cierre.
- **Tonalidades por etapa:**
  - **TOFU:** Re y Mi, en modos suspendidos y menores que se abren a mayor.
  - **MOFU:** La y Do, con lidio (la luz).
  - **BOFU:** Re mayor 9, que resuelve.
- **Pulso:** entre 84 y 96 BPM, siempre con el bombo suave y con sidechain sobre el pad (la música respira con el pulso).
- **Efectos de marca:**
  - tick de lente (foco)
  - obturador (captura)
  - teclas (código)
  - subida de aire hacia un corte
  - impacto grave en los cruces de umbral
  - vidrio al revés antes de una revelación
  - **Nunca** whooshes genéricos.
- **Master:** -14 LUFS integrados, true peak por debajo de -1 dBTP, AAC 256 kbps a 48 kHz.

Archivo: `design-system/tokens/sound.md`.

### B8. Tratamiento de interfaz (para la línea de software)

La línea de software necesita mostrar pantallas sin romper la marca. Reglas:
- Ventanas con marco de 1 px gris y fondo Ink 2 al 78%. Sin esquinas redondeadas, sin sombras, sin "semáforos" de macOS.
- Texto de interfaz en Rotis. Estados con un punto de 10 px en acento con halo: verde = listo, magenta = en curso, azul = esperando.
- Todo prototipo que no es un producto entregado lleva el rótulo **"Concepto"** en la barra.
- Código real cuando se muestra código: el del sitio o el del motor de esta campaña. Nunca código inventado que simule un producto de cliente.

### B9. Posicionamiento ampliado

- **Hoy:** agencia de diseño integral y creación de contenido.
- **Propuesta:** **estudio de diseño y tecnología de Buenos Aires.** Marcas, imagen, presencia y producto, con un solo criterio. Trabajamos en español y en inglés.
- Justificación: el sitio ya es un producto de software (interacciones, detección de idioma, galería, SEO); la campaña se produjo con un flujo propio de agentes y código, y la nueva línea de software lo formaliza.
- Impresión buscada en el mercado: un estudio chico por elección, de criterio alto, que usa la tecnología con oficio y trabaja con marcas que quieren verse del tamaño que tienen.

---

## C. Para confirmar del lado del estudio

1. **Nombres y agrupación de la oferta** (B4) y la forma de trabajo en cuatro etapas (A08).
2. **Acompañamiento mensual:** confirmar qué incluye hoy (redes, contenido, mantenimiento web, flujos con IA) antes de pautar A09.
3. **Permiso de clientes** para aparecer en anuncios pagos (A09 y A10 muestran sus logos y handles tal como están en el sitio).
4. **Casos de software** (Music Box, Alquilalo, Fisu Evolution): material y autorización. Hasta entonces, A04 y A06 muestran concepto y trabajo propio.
5. **Licencia de Rotis** para uso en publicidad digital paga.
6. **Handle de Instagram** y cuenta publicitaria.
7. **Voz en off:** la tanda funciona sin voz. Para una variante con voz, el texto de locución sale de la columna "texto en pantalla" de cada guion.

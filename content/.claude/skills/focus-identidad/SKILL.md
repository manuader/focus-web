---
name: focus-identidad
description: Sistema de identidad y dirección de arte de FOCUS creatives para piezas de redes (reels, carruseles, historias, posteos). Usala antes de escribir, diseñar, animar o pedir a una IA cualquier pieza de FOCUS para Instagram u otra red, y para revisar si una pieza existente respeta la marca. Cubre concepto, color, tipografía, composición, movimiento, transiciones, tratamiento de imagen, logo, voz, sonido y reglas de veracidad.
---

# FOCUS · identidad y dirección de arte para redes

**Fuente de verdad: el design system** (`design-system/README.md` y `tokens.json`), que es un port 1:1 del sitio focuscreatives.net (repo focus-web). Si algo de esta guía contradice al sitio, gana el sitio y se corrigen las dos cosas.

Detalle ampliado en `design-system/guidelines/`:
- `05-formatos.md`: medidas, zonas seguras, duraciones y especificaciones de exportación;
- `10-movimiento-y-sonido.md`: biblioteca de movimientos y transiciones con sus tiempos;
- `90-checklist.md`: control de calidad antes de publicar.

Lo que se puede afirmar está en `.claude/skills/focus-contenido/references/evidencia.md`.

---

## 1. La idea en una línea

**FOCUS revela el ángulo que ya estaba ahí.** No inventa marcas: las enfoca.

Tres metáforas visuales, todas de óptica, y ninguna otra:

| Metáfora | Qué significa para el cliente | Cómo se ve |
|---|---|---|
| **Foco / desenfoque** | Entre el ruido, un punto nítido. | Todo arranca borroso y un solo elemento entra en foco. Nunca al revés sin motivo. |
| **Refracción** | Separamos estrategia, imagen y voz para ver de qué está hecha la marca, y las volvemos a juntar. | Un haz blanco que se abre en magenta, azul y verde, y vuelve a cerrarse en blanco. |
| **Umbral** | El punto donde una identidad dejó de ser lo que era y todavía no es lo que será. | Un antes y un después separados por una línea, una puerta, un anillo que se cruza. |

Regla de oro: **cada pieza termina en foco o en luz blanca recompuesta.** El
desorden puede ser el comienzo, nunca el final.

**Las metáforas son un sistema, no un eslogan.** Cada pieza elige *un* gesto
óptico dominante y lo pone al servicio de *otra* idea (un servicio, un
criterio, un proceso, un producto). La palabra "foco" no tiene que aparecer
en cada pieza; en una tanda de 20, aparece como mucho en 5. Dos piezas
seguidas en el feed nunca comparten gesto dominante ni apertura.

Tagline: *El punto donde todo cambia.* Frases de marca disponibles (literales
del sitio, se pueden citar tal cual): "Mirar no alcanza", "Una marca no se
inventa. Se enfoca.", "Nos movemos para ver otro ángulo", "Un foco entre la
dispersión", "El espectro entra · un solo haz sale", "Enfoquemos lo que ya es
tuyo", "Lo que parece una puerta resulta ser un mundo", "Siete disciplinas, un
solo criterio: que la pieza no se pueda confundir con la de nadie más.",
"La atención es el recurso más caro del mundo. No la pedimos, la capturamos."

## 2. Qué ofrece FOCUS

Dos frentes, un mismo criterio:
- **Marca y contenido** (lo que muestra el sitio hoy): identidad, dirección de
  arte, social media, audiovisual, estrategia, web, editorial y packaging,
  contenido con IA.
- **Software** (declarado por el estudio, todavía no está en el sitio):
  productos digitales, aplicaciones y experiencias interactivas. El propio
  sitio (prisma que responde al scroll, refracción que sigue al cursor, galería
  horizontal) es la prueba pública disponible de ese frente.

## 2b. A quién le hablamos

Dueños y directores de marcas con presupuesto para un trabajo integral
(proyectos de USD 10k o más): marcas que ya existen y facturan, pero se ven
más chicas de lo que son. No les hablamos a otros diseñadores ni a
emprendedores que buscan un logo barato.

Consecuencias para toda pieza:
- Hablar de **criterio, decisiones y resultado percibido**, no de herramientas
  ni de "tips de diseño".
- Mostrar **sistema** (cómo una decisión se replica en todo) más que piezas
  sueltas.
- Nunca precios, descuentos, urgencia falsa ("últimos cupos") ni promesas
  cuantificadas ("+300% de ventas").

## 3. Voz

Español rioplatense con voseo (tenés, mirá, enfocá). Inglés solo si la pieza
es bilingüe, escrito para un nativo, no traducido.

- Corta y aforística. Una idea por frase. Frases de 3 a 9 palabras en pantalla.
- **Sin signos de exclamación. Sin rayas (—). Sin emojis en pantalla.**
  En caption, como mucho un símbolo tipográfico (· o →), nunca emojis de fuego,
  cohetes o manos.
- Afirmar, no vender. "Revelamos el ángulo que ya estaba ahí" en vez de
  "¡Llevá tu marca al siguiente nivel!".
- Prohibido: "potenciá", "llevá al siguiente nivel", "destacá", "soluciones
  integrales", "somos apasionados", "calidad premium", "no te lo pierdas",
  "link en bio" como frase suelta, cualquier cliché de agencia.
- Los separadores del sitio son `·` y `:`. Úsalos igual en pantalla.
- Mayúsculas solo en eyebrows cortos (tracking amplio). Títulos en caja
  normal (sentence case).

## 4. Veracidad (no negociable)

- Solo se nombran clientes y trabajos que están en
  `.claude/skills/focus-contenido/references/evidencia.md` (que copia `WORKS` de
  focus-web), con los servicios que figuran ahí. Hoy: Ader Studio
  (web), OUSHY Studio (web), Top Láser (web; identidad, social media,
  audiovisual), @chillin1390bar (social media), @santatuca (edición de reels
  y YouTube, social media), @chuchones_wines, @rsh_consultora,
  @esteticaintegralfernanda (social media).
- El sitio focuscreatives.net es trabajo propio verificable: se puede mostrar
  su código, sus interacciones y su proceso.
- Software: no hay casos de producto de cliente publicados. Hasta que se
  verifique uno, las piezas de software muestran capacidades con el sitio
  propio o con prototipos rotulados como "exploración" o "concepto".
- El portfolio del fundador (MusicBoxd, Alquilalo, AderGames/FisuEvolution)
  está verificado en `evidencia.md` §4, pero su **atribución a FOCUS está
  "A validar"**: una pieza que lo muestre queda como borrador hasta que el
  usuario la apruebe. Nunca se le atribuyen descargas, usuarios ni
  lanzamiento (FisuEvolution figura como *coming soon*).
- Sin métricas, cifras, testimonios ni resultados que no estén documentados
  y autorizados por el cliente. Si un guion necesita un dato, se deja el
  placeholder `[DATO VERIFICADO]` y la pieza no sale hasta completarlo.
- Antes/después solo con material real del cliente. Si no hay "antes", el
  antes/después se hace sobre una pieza de FOCUS (su propio logo, su propio
  sitio, un layout propio), nunca sobre una marca ajena.
- Contenido generado con IA se usa para texturas, luz, fondos y transiciones.
  Nunca para simular trabajo de cliente, personas reales ni un equipo que no
  existe.

## 5. Color

Paleta de luz aditiva. Colores saturados **como luz sobre oscuridad**, nunca
como fondo plano.

| Token | Hex | Uso |
|---|---|---|
| Ink | `#0A0A0B` | Fondo por defecto de todo. |
| Ink 2 | `#17181B` | Planos secundarios, tarjetas. |
| Paper | `#F6F6F4` | Texto principal. Fondo solo en piezas "de papel" (cita, manifiesto impreso). |
| Magenta | `#FF00FF` | Acento 1. |
| Blue | `#0033FF` | Acento 2. En texto chico sobre Ink usar `#5B8CFF`. |
| Green | `#00FF33` | Acento 3. Hover, confirmación, el "sí". |
| Grises | `#E7E9EC` `#A7ACB4` `#7C818A` `#3A3D42` | Zonas desenfocadas, texto secundario (mínimo `#7C818A` sobre Ink). |

Espectro de transición (solo para el haz que se abre en siete bandas, una por
servicio): `#FF00FF #C010FF #8020FF #0033FF #0080DD #00C088 #00FF33`.

Reglas:
- Proporción por frame: 85-95 % Ink y grises, 5-15 % color. Si el color ocupa
  más, la pieza está gritando.
- Los tres acentos se mezclan en `screen`/aditivo: donde se superponen dan
  blanco. Ese blanco es el momento de marca.
- Máximo dos acentos protagonistas por frame; el tercero solo como filo o
  aberración cromática.
- Rojo, amarillo, naranja y cian no existen en la paleta. Excepción única: el
  póster de marca (`design-system/assets/key-visuals/poster-el-punto-donde-todo-cambia.jpg`) se puede mostrar tal cual, como
  obra, no se usan sus colores para otra cosa.
- Nada de degradés decorativos arbitrarios. Un degradé solo si es luz (un haz,
  un halo, una aberración).

## 6. Tipografía

Es la gramática del sitio, medida en sus módulos CSS. La tabla completa y las clases del motor están en `design-system/README.md`.

| Rol | Cómo | Ejemplo del sitio |
|---|---|---|
| **Titular** | Rotis ExtraBold 800, MAYÚSCULAS, tracking -3,5 %, interlineado 0,95 | QUÉ HACEMOS · CASOS · MIRAR |
| **Bajada serif** | Source Serif 4 Italic, caja normal, gris | ENFOQUEMOS / *lo que ya es tuyo* |
| **Enunciado** | Rotis Light 300, caja normal, con **una** palabra en ExtraBold | "Una marca no se inventa. Se **enfoca**." |
| **Eyebrow de sección** | Source Serif 4 Italic, gris, con filete de 54 px | — Servicios |
| **Micro-rótulo** | Rotis Bold, MAYÚSCULAS, tracking 0,26 em | TU DEDO ES LA LENTE |
| **Lockup de campaña** | TITULAR Bold/ExtraBold + bajada en Light Italic MAYÚSCULAS al 40 % | MIRAR / *NO ALCANZA* |
| **Logo** | Wordmark FOCUS: el archivo, nunca retipeado | Ver §9 |

Archivos: `design-system/fonts/`.

- La serif itálica **no** va dentro de un enunciado. Ahí el énfasis es ExtraBold.
- Un solo titular por cuadro.
- La jerarquía se hace con **escala y peso**, no con color.
- Tamaños en un reel de 1080×1920:
  - titular: 96–150 px;
  - enunciado: 84–132 px;
  - cuerpo: 44–56 px;
  - eyebrow: 38–42 px;
  - micro-rótulo: 24–30 px.
- Nunca menos de 40 px para algo que haya que leer.
- Máximo 14 palabras en pantalla a la vez.
- La tipografía también se enfoca: entra con `blur(12px)` y resuelve a 0, o se refracta en tres capas RGB que convergen.
- Tiempo de lectura: 0,3 s por palabra desde que la línea está completa, más 0,5 s de respiro.

## 7. Composición

- Grilla de 12 columnas con margen de 80 px en 1080 de ancho (el `--edge` del
  sitio escalado). Base de espaciado 8 px.
- Un solo punto focal por frame. Todo lo demás, desenfocado o en gris.
- Mucho vacío. Si hay duda, sacar.
- Anclajes permitidos: centro óptico (para foco y anillos) o esquina inferior
  izquierda (para texto, como el póster). Evitar la esquina superior derecha
  en reels (la tapa la interfaz).
- Recursos gráficos propios, los únicos:
  - **Anillos concéntricos** (`design-system/assets/graficos/anillos.svg`, trazo 1,5 px).
  - **Retícula de enfoque** (`design-system/assets/graficos/reticula.svg`).
  - **Grano** fino permanente y **viñeta** suave.
  - **Scanline** muy tenue, opcional, nunca protagonista.
  - **Rótulos técnicos**: numeración `01 / 07`, coordenadas, "f/1.4",
    "Densidad · el umbral · 2026". Chicos, en gris, como datos de cámara.
- Prohibido: stickers, flechas dibujadas a mano, emojis gigantes, mockups de
  teléfono genéricos, fotos de stock de "equipo trabajando", fondos con
  degradé violeta-naranja, texto con contorno, sombras paralelas.

## 8. Imagen

Tratamiento base para cualquier foto o video (propio o de cliente) que no sea
el protagonista del frame: `grayscale(1) brightness(0.3) contrast(1.25) blur(7px)`.
Es exactamente el tratamiento de fondo del sitio. El protagonista entra en
color y en foco.

- **Fotografía de campaña** (key visuals existentes `img-01` a `img-05`):
  blanco y negro de alto contraste, un gesto humano (manos que tocan un vidrio,
  un ojo detrás de una lupa) y la intervención de color **solo sobre el
  gesto**: halo holográfico, contorno RGB desplazado, cáusticas. Es el
  lenguaje para toda foto nueva de marca.
- Trabajo de clientes: siempre en su color original, nítido, sin filtros de
  FOCUS encima. Se enmarca, no se interviene.
- Foto propia: luz dura, fondos oscuros, reflejos, vidrio, prismas, lentes,
  agua (la textura cáustica del póster). Nada de oficinas, laptops ni manos
  señalando pantallas.
- Pantallas (web, software): capturas reales a resolución completa, grabadas
  con scroll suave, sobre Ink, sin mockup de dispositivo o con un marco
  mínimo de 1 px gris.
- IA: solo para luz, refracción, texturas, cáusticas, polvo en suspensión,
  macro de lentes. Prompt base: "macro photography, pure black background,
  single beam of white light passing through a glass prism, splitting into
  magenta, deep blue and neon green, volumetric light, fine film grain,
  shallow depth of field, no text, no people".

## 9. Logo

- Archivos: `design-system/logos/focus-logo-light.png` (sobre oscuro),
  `focus-logo-dark.png` (sobre claro), `focus-logo-anim.webp` y
  `focus-logo-animacion.mp4` (la animación oficial).
- El logo firma, no protagoniza: aparece al final (1,5-2 s) o como marca de
  agua chica. Excepción: el reel de presentación puede usar la animación
  oficial completa.
- Ancho en reel: 360-440 px al cierre; como firma permanente, 120-140 px.
- Área de respeto: la altura de la "O" alrededor.
- Nunca deformar, recolorear en acentos, ponerle sombra, contorno ni
  degradé. Permitido: entrar desde desenfoque, o recomponerse desde tres
  capas RGB desplazadas.
- La "C" abierta del wordmark es el único gesto que se puede aislar como
  recurso (un arco que se cierra, un obturador). Con moderación.
- Lockup completo: FOCUS + *creatives* (en Rotis Light, gris claro).

## 10. Movimiento

Carácter: **lento para entrar, preciso para resolver.** Ningún elemento rebota,
tiembla o hace "pop". Curva maestra: `cubic-bezier(0.16, 1, 0.3, 1)`
(ease-out-expo). Detalle en `design-system/guidelines/10-movimiento-y-sonido.md`.

Los cinco gestos de la marca:
1. **Rack focus**: blur 16→0 px en 0,8-1,2 s. Es el "corte" principal.
2. **Refracción**: tres capas (magenta, azul, verde) en `screen` se separan
   8-40 px y convergen a blanco en 0,6-1 s.
3. **Haz**: una línea blanca de luz cruza el frame, toca un prisma y se abre
   en el espectro (o al revés: el espectro converge en un haz).
4. **Umbral**: una línea o anillo barre el frame; lo que pasa del otro lado
   ya cambió.
5. **Anillos**: los anillos concéntricos giran lento (40-60 s por vuelta) o
   pulsan como una lente que busca foco.

Ritmo: planos de 1,5-3 s, cortes al beat, holds de lectura según §6. Una pieza
de 20 s tiene 5-8 planos, no 20.

## 11. Transiciones

Solo estas, en este orden de preferencia:
1. Desenfoque cruzado (sale a blur, entra desde blur). Nunca un crossfade
   limpio entre dos layouts cargados: primero sale uno, después entra el otro.
2. Separación RGB → corte → recomposición.
3. Barrido de umbral (una línea de 1 px que pasa y deja el nuevo estado).
4. Iris: un anillo se cierra al negro y se abre en la escena siguiente.
5. Corte seco al beat.

Prohibidas: glitch digital de plantilla, zoom punch, whip pan, spin, cubos 3D,
transiciones de CapCut o Canva, flashes blancos repetidos.

## 12. Sonido

- Base: ambient electrónico minimalista, pulso bajo (70-95 BPM) o sin pulso,
  pads cálidos, texturas de cristal. Referencias de carácter: Nils Frahm,
  Jon Hopkins en sus pasajes tranquilos, Ólafur Arnalds. Siempre música
  licenciada o audio original; tendencias de audio solo si encajan con este
  carácter.
- Diseño sonoro que acompaña los gestos: un "tick" de lente al entrar en foco,
  un swell de aire al abrirse el haz, un tono sinusoidal que se resuelve
  (acorde que pasa de disonante a consonante) en la recomposición.
- Los efectos van debajo de la música, en la misma tonalidad. Nada de
  whooshes genéricos, risas grabadas ni "cha-ching".
- Voz en off (cuando la hay): una voz, cercana, tranquila, rioplatense
  neutra, sin tono de locutor. Lenta: 2,2-2,6 palabras por segundo.
- Todo reel debe funcionar sin sonido: el texto en pantalla sostiene el
  mensaje; subtítulos quemados cuando hay voz.

## 13. CTA

Uno por pieza, sin imperativos de venta. Repertorio:
- "Enfoquemos lo que ya es tuyo. Escribinos."
- "Hablemos · focuscreatives.net"
- "Guardalo para cuando revises tu marca."
- "Mandáselo a quien está por cambiar de marca." (optimiza envíos)
- "Mirá el caso completo en focuscreatives.net"

Dominio vivo: **focuscreatives.net** (focus-creatives.com hoy muestra
"Próximamente"; no usarlo en piezas hasta que redirija).
Contacto real: info@focus-creatives.com · WhatsApp +54 9 11 5926 4267 ·
reuniones en calendly.com/focus-creatives-info/30min.

## 14. Captions

Estructura: una línea gancho (sin repetir lo que dice la pieza) · 2-4 líneas
de desarrollo · CTA · hashtags.
- 300-900 caracteres. Voseo. Sin emojis salvo `·` o `→`.
- 3-5 hashtags, específicos, al final: `#focuscreatives #identidaddemarca
  #direcciondearte #diseñoargentino #buenosaires` (elegir los pertinentes).
- Keywords en el texto (Instagram indexa captions para búsqueda):
  "identidad de marca", "dirección de arte", "agencia de diseño Buenos Aires".

## 15. Producción

Se produce con el pipeline de este repo (`./focus`), que sigue el método de `/brag-slim` de latent-spaces/brag, vendorizado en `.claude/skills/brag-slim` bajo licencia MIT:
- cada cuadro es una función pura del tiempo;
- se reutiliza lo real (el sitio grabado, sus fuentes, su logo);
- se revisan cuadros y transiciones antes del render;
- la portada va en el cuadro 0;
- música y efectos se componen como una sola pieza.

Los comandos exactos están en `AGENTS.md` §4.

**Alternativa con /brag-slim directo.** Se corre desde la raíz de focus-web, para que reutilice sus componentes:

```text
/brag-slim --format vertical --duration <s> --tone "polished, FOCUS: dark ink #0A0A0B, additive light magenta/blue/green, rack focus and RGB refraction only, Rotis Semi Sans (ExtraBold uppercase heads, Light statements with one ExtraBold word, Source Serif italic eyebrows), no exclamation marks, calm original ambient in D, ends in focus"
Before planning read <content-focus>/.claude/skills/focus-identidad/SKILL.md and <content-focus>/design-system/README.md and follow them over any /brag default.
Storyboard: <planos con tiempos y texto en pantalla exacto>.
```

**Claude Design.** Cada ficha trae un prompt con esta estructura:
1. Contexto de marca: el bloque `[MARCA]` de la ficha, o adjuntar `design-system/README.md`.
2. Formato y medidas.
3. Cuadro por cuadro, con el copy literal.
4. Restricciones: lo prohibido de §7 y §11.
5. Entregable: PNG o MP4 por cuadro, con capas editables.

## 16. ¿Esta pieza es de FOCUS? (criterio de pertenencia)

Una pieza pertenece a la marca si responde **sí** a las siete:
1. ¿Hay un único punto focal por frame y el resto está en segundo plano?
2. ¿Domina la oscuridad (Ink) y el color aparece como luz, no como fondo?
3. ¿Usa solo Rotis Semi Sans (y a lo sumo una palabra en serif itálica)?
4. ¿Se mueve con uno de los cinco gestos y transiciona con una de las cinco
   transiciones permitidas?
5. ¿El copy suena a FOCUS (voseo, corto, sin exclamaciones ni clichés) y
   dice algo que otra agencia no podría firmar tal cual?
6. ¿Todo dato, cliente o resultado es verificable (§4)?
7. ¿Termina resuelta: en foco, en blanco recompuesto o en el logo?

Test rápido: tapá el logo. Si la pieza podría ser de cualquier agencia, no
sale. Si parece un efecto de plantilla, no sale.

## 17. Antes de publicar

Pasar `design-system/guidelines/90-checklist.md`. Si falla un punto de §4 (veracidad), la pieza
no sale.

# Metodología de guion (FOCUS)

Adaptada de la metodología de content-urbe (rúbrica ≥ 8,5 con un revisor independiente) a una agencia que vende criterio a marcas con presupuesto de USD 10.000 o más.

En FOCUS, el guion es **texto en pantalla**: cada línea que se lee dispara un plano. La voz en off es opcional. Cuando la hay, dice lo mismo que la pantalla o menos, nunca más.

## 1. Antes de escribir

1. **Una idea por pieza**, escrita en una frase-concepto. Ej.: "Esto lo firma cualquiera", "Nadie lo va a notar". De ahí salen el gancho y el cierre.
2. **Evidencia primero.** Todo caso, cifra o detalle técnico sale de [evidencia.md](evidencia.md). Si no está ahí, no entra. La línea queda en `[DATO VERIFICADO]` y se le plantea al usuario.
3. **Gesto dominante.** Se elige uno de los cinco gestos de la skill `focus-identidad`: rack focus, refracción, haz, umbral o anillos, más retícula o iris como variantes. En una tanda, dos piezas vecinas nunca comparten gesto ni apertura.
4. **Chequeo de la serie.** La idea no puede repetir una pieza ya publicada ni una de la misma tanda. Ver [catalogo-piezas.md](catalogo-piezas.md), que incluye los dos reels de presentación de septiembre.

## 2. Estructura (18–22 s)

| Tramo | Función | Reglas |
|---|---|---|
| 0–2,5 s | **Gancho** | Texto en pantalla que dice qué vas a ver, o una imagen que no se entiende hasta el segundo 2. Nada de "Somos FOCUS". |
| 2,5–15 s | **Desarrollo** | Dos o tres momentos, una idea por plano. Mostrar lo real: el sitio funcionando, commits reales, tarjetas de clientes reales. |
| 15–18 s | **Remate** | Retoma la frase-concepto con otra forma. |
| 18–20 s | **Cierre + CTA** | Un solo CTA y distinto al del resto de la serie. Logo como firma, a 200 px. |

- **Lectura:** 0,3 s por palabra desde que la línea está completa, más 0,5 s de respiro.
- **Tope:** 14 palabras en pantalla a la vez.

## 3. Estilo

- **Voseo rioplatense, corto y afirmativo.** Sin exclamaciones, rayas ni emojis. Lista de clichés prohibidos: skill `focus-identidad` §3.
- **Tipografía:**
  - Enunciado en Light, con una palabra en ExtraBold (`*palabra*`).
  - Titular en ExtraBold mayúscula (`t-head`), con bajada en serif itálica (`t-subserif`).
  - Detalle en `design-system/README.md`.
- **Nombres exactos** de clientes y servicios, tal como están en `evidencia.md`.
- **No exagerar capacidades.** "Diseñamos y programamos", nunca "somos líderes". Nada de "resultados garantizados".

## 4. Rúbrica (umbral 8,5)

| Criterio | Peso | Qué mira |
|---|---|---|
| Gancho (primeros 2,5 s) | 20 % | ¿Frena el scroll de un dueño de marca? ¿Dice qué va a ver o genera una pregunta visual? |
| Claridad comercial | 15 % | Al terminar, ¿se entiende qué hace FOCUS y por qué contratarlo? |
| Veracidad | 25 % | ¿Cada caso, cifra o detalle técnico se puede rastrear a `evidencia.md`? ¿Hay algo inventado o exagerado? |
| Originalidad y marca | 15 % | ¿Otra agencia podría firmarla tal cual? ¿Usa el sistema óptico sin volverlo eslogan? |
| Retención y ritmo | 15 % | ¿Un momento nuevo cada 2 a 3 s? ¿Las líneas se pueden leer en el tiempo que duran? |
| Cierre y CTA | 10 % | ¿Cierre propio? ¿CTA único y distinto al del resto de la serie? |

### Proceso

1. Escribí todas las piezas de la serie en la ficha de la campaña, en una tabla por pieza con tiempo, imagen y texto.
2. Lanzá un **revisor independiente** (subagente sin tu contexto) con el prompt de abajo.
3. Aplicá las reescrituras y volvé a puntuar.
4. Recién cuando todas llegan a 8,5 o más, se produce. Si una pieza queda trabada por falta de prueba, es una **decisión de negocio**: se le plantea al usuario.

### Prompt del revisor

> Sos director creativo senior y editor de una agencia premium. Revisá estos guiones de reels de Instagram de FOCUS creatives, un estudio de diseño, contenido y software de Buenos Aires cuyos clientes objetivo invierten USD 10.000 o más. Leé primero `.claude/skills/focus-contenido/references/evidencia.md` y la skill `.claude/skills/focus-identidad/SKILL.md`. Para cada guion, puntuá de 0 a 10 cada criterio de la rúbrica (gancho 20 %, claridad comercial 15 %, veracidad 25 %, originalidad y marca 15 %, retención y ritmo 15 %, cierre y CTA 10 %) y calculá el total ponderado. Marcá cualquier afirmación que no esté respaldada en evidencia.md. Señalá repeticiones de gancho, argumento o CTA entre piezas, incluidas las ya publicadas que figuran en catalogo-piezas.md. Proponé reescrituras concretas, línea por línea, para toda pieza por debajo de 8,5, respetando las reglas de voz: voseo, sin exclamaciones, sin rayas, sin clichés. Devolvé una tabla de puntajes y, después, las reescrituras.

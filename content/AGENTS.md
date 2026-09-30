# AGENTS.md · manual para cualquier sesión de Claude (u otro agente) en este repo

Leelo entero antes de producir. Es corto a propósito y apunta a donde está el detalle.

## 1. Qué es este repo

Es el **pipeline de contenido de FOCUS creatives**, un estudio de diseño, contenido y software de Buenos Aires. Su sitio es focuscreatives.net (repo focus-web).
- El usuario pide una pieza en lenguaje natural y vos entregás la pieza terminada, verificada y dentro de la marca.
- Idioma con el usuario: **español rioplatense**.
- Decidí lo reversible y declaralo. Preguntá solo las decisiones de negocio (§7).

## 2. Primeros 60 segundos

```bash
cat docs/HANDOFF.md                  # dónde está el proyecto y qué quedó abierto
ls campanas/ work/ 2>/dev/null       # campañas y trabajo en curso
[ -x .venv/bin/python ] || ./focus setup
./focus list
```

Después cargá la skill **`focus-studio`**: es el router.

## 3. Mapa

| Ruta | Qué hay | Cuándo leerlo |
|---|---|---|
| `design-system/README.md` | Brand book: idea, color, tipografía (con las clases del motor), logo, imagen, formatos | **Siempre** |
| `.claude/skills/focus-identidad/SKILL.md` | Dirección de arte, voz, veracidad y las 7 preguntas de pertenencia | **Siempre** |
| `.claude/skills/focus-contenido/references/evidencia.md` | Lo que se puede afirmar, con su etiqueta | Antes de escribir |
| `.claude/skills/focus-contenido/references/catalogo-piezas.md` | Piezas que ya existen (v1, v3, tanda 1) | Antes de proponer ideas |
| `.claude/skills/focus-contenido/references/guion.md` | Estructura, rúbrica y prompt del revisor | Al escribir |
| `.claude/skills/focus-contenido/references/produccion.md` | API del motor, captura y audio | Al producir |
| `design-system/guidelines/*.md` | Formatos, movimiento y sonido, evidencia, carruseles, historias, imagen, redacción, checklist | Según el formato |
| `campanas/<c>/` | Fichas (`03-reels.md`, `04-carruseles.md`, `05-historias.md`), matriz y calendario (`06-…`), piezas (`.js`) y `entregas/` | Para retomar o para copiar el formato |
| `docs/investigacion/` | Marca, benchmark de reels y auditoría de skills | Para contexto |

## 4. Recetas

**Reel**
1. `./focus new <campaña> reel <slug>`.
2. Guion con la rúbrica. Lanzá un **revisor subagente** y no avances hasta tener 8,5 o más.
3. `./focus stills <pieza> 1,4,9,15,19`: **mirá la hoja** en `work/_control`.
4. `./focus render <pieza>` → `campanas/<c>/entregas/reels/<nombre>.mp4` + `.jpg`.
5. El caption va en `entregas/reels/<nombre>.txt`.

**Carrusel o historias**
1. `./focus new <campaña> carrusel|historia <slug>`.
2. `./focus pieza <pieza>` y revisá la hoja contra `guidelines/30-carruseles.md` o `35-historias.md`.
3. En historias, anotá el sticker nativo en la ficha.

**Campaña completa**
1. Carpeta `campanas/<aaaa-mm-slug>/` con fichas, matriz y calendario, como la de 2026-10.
2. `./focus campana campanas/<c>`.
3. `./focus verify campanas/<c>`.

**Mostrar el sitio**
1. En focus-web: `npm run build && npx next start -p 3100`.
2. `./focus capture <toma>`.
3. En la pieza: `seq({ dir: '/work/capturas/<toma>', count: N, … })`.

## 5. Oráculos (nada se entrega sin esto)

| Qué | Comando | Verde |
|---|---|---|
| Guion | Revisor subagente con el prompt de `guion.md` | ≥ 8,5, o decisión explícita del usuario |
| Maquetación | `./focus stills` / `./focus pieza` | Hoja revisada: sin colisiones, dentro de la zona segura, texto de 40 px o más |
| Entrega | `./focus verify campanas/<c>` | `VERIFY_EXIT 0` |
| Repo (si lo tocaste) | `./focus check` | `VERIFY_EXIT 0` |

Si no podés correr un oráculo, decilo. Nunca des por "listo" algo sin verificar.

## 6. Reglas que rompen una pieza

1. Sin métricas, resultados, testimonios ni clientes fuera de `evidencia.md`.
2. Los detalles técnicos se citan con su fuente real: archivo, commit, contraste medido.
3. No decir que una captura es "sin editar" o "un dedo real": las capturas usan toques simulados y tiempo virtual.
4. Sin exclamaciones, rayas ni emojis. Voseo.
5. La tipografía del sitio (design system) y color como luz sobre tinta. La variante papel, con moderación.
6. Una pieza "A validar" (portfolio del fundador) se entrega **como borrador**, con la marca en pantalla.

## 7. Qué es del usuario (preguntá, no decidas)

- Atribuir a FOCUS FisuEvolution/Ader Games, MusicBoxd o Alquilalo.
- Etiquetar o nombrar clientes en Instagram (fuera de lo que ya está en el sitio).
- Publicar, pautar, gastar dinero o crear cuentas.
- La voz de marca: casting y si se declara sintética.
- Publicar reels por debajo de 8,5.

## 8. Trampas conocidas

- **El servidor estático** lo levanta `render.mjs` en un puerto libre. No uses `python -m http.server` en segundo plano: cuelga los pipes (`./focus … | tail`).
- **`pkill -f "<patrón>"`** se mata a sí mismo si el patrón aparece en tu comando. Usá `pgrep -f "[x]patrón"`.
- **ExtraBold en mayúsculas** es más ancho que Light: bajá el tamaño entre un 15 y un 20 %.
- **Los key visuals traen texto horneado**: recortalo con `pos` y `zoom`.
- **La barra del sitio** en las capturas: tapala con un degradé de tinta arriba.
- **Las capturas del juego en adergames-site** todavía son placeholders: no las muestres.
- **Chromium en entornos con proxy TLS** puede no llegar a sitios https. Capturá los sitios en local.

## 9. Cómo dejar el repo

1. `./focus check` tiene que dar `VERIFY_EXIT 0`.
2. Commit en español que explique qué y por qué.
3. `git push`.

**Nunca commitear:** `.venv`, `node_modules`, `work/` (capturas y controles), secretos ni material de clientes que no esté en el sitio.

**Al cerrar una sesión:**
1. Escribí `docs/SESSION-<fecha>-<tema>.md`.
2. Actualizá `docs/HANDOFF.md`.

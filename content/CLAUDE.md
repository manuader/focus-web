# content-focus · instrucciones para Claude

@AGENTS.md

> El manual operativo completo es [AGENTS.md](AGENTS.md), que se importa arriba. Lo que sigue es el resumen.

Este repo es el pipeline de contenido de **FOCUS creatives**. El usuario pide una pieza en lenguaje natural y vos la producís terminada.

1. **Todo pedido de contenido** entra por la skill **`focus-studio`**.
2. **Fuente de verdad de la marca:** `design-system/` (empezá por `README.md`) y la skill `focus-identidad`.
3. **Lo que se afirma** sale de `.claude/skills/focus-contenido/references/evidencia.md`.
4. **Producí** en `campanas/<c>/` con `./focus`. Las entregas van a `campanas/<c>/entregas/`.
5. **Oráculos:** revisor de guion ≥ 8,5, hojas de control revisadas, `./focus verify` y `./focus check` con exit 0.
6. **Decisiones de negocio** (atribución del portfolio, etiquetar clientes, publicar): se le plantean al usuario.

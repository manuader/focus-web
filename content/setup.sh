#!/bin/bash
# setup.sh · prepara la máquina para el pipeline de contenido de FOCUS. Idempotente.
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"; cd "$ROOT"
say() { printf '\033[1;35m▸ %s\033[0m\n' "$*"; }
say "Chequeando herramientas del sistema"
command -v node >/dev/null && command -v npx >/dev/null || { echo "Falta Node.js/npx (brew install node)"; exit 1; }
PY=$(command -v python3.12 || command -v python3.11 || command -v python3)
"$PY" -c 'import sys; assert sys.version_info >= (3, 10), "Hace falta Python 3.10+"'
say "Entorno Python (.venv)"
[ -x .venv/bin/python ] || "$PY" -m venv .venv
.venv/bin/pip install -q --upgrade pip && .venv/bin/pip install -q -r requirements.txt
say "Playwright + Chromium (render de piezas y captura del sitio)"
npm install --silent --no-audit --no-fund
npx playwright install chromium >/dev/null
say "Chequeo rápido"
.venv/bin/python -c "import numpy, scipy, PIL, imageio_ffmpeg; print('  entorno OK ·', imageio_ffmpeg.get_ffmpeg_exe().split('/')[-1])"
cat <<'X'

Listo. Próximos pasos:
  • Abrí esta carpeta con Claude Code y pedí la pieza ("hacé un reel de FOCUS sobre …").
  • Para piezas que muestran el sitio: en focus-web, npm run build && npx next start -p 3100, y acá ./focus capture
  • ./focus list · ./focus check
X

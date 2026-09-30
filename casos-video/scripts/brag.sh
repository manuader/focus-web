#!/bin/bash
# Arma y renderiza el video de un sitio (brag/<id>.html): la pieza de
# motion graphics que después corre dentro del teléfono en el video del caso.
#   uso: casos-video/scripts/brag.sh <id> [<id>…]      render
#        casos-video/scripts/brag.sh --hoja <id> [t,t,…]  solo cuadros de control
# Sale a casos/<id>/media/brag.mp4 (780 × 1688, la pantalla de un iPhone a 2x).
set -euo pipefail
cd "$(dirname "$0")/.."
HF="${HF:-npx hyperframes}"
if [ "${1:-}" = "--hoja" ]; then
  cp "brag/$2.html" index.html
  $HF lint >/dev/null || { $HF lint; exit 1; }
  $HF snapshot --at "${3:-0.6,1.8,2.9,3.6,4.6,5.6,6.6,7.6,8.6,9.2,10,10.5}" 2>&1 | tail -2
  exit 0
fi
for id in "$@"; do
  cp "brag/$id.html" index.html
  $HF lint >/dev/null || { $HF lint; exit 1; }
  mkdir -p "work/$id"
  $HF render --quality looks --output "work/$id/brag-render.mp4" 2>&1 | tail -3
  ffmpeg -v error -y -i "work/$id/brag-render.mp4" -an -c:v libx264 -crf 15 -preset slow -g 15 -pix_fmt yuv420p "casos/$id/media/brag.mp4"
  echo "$id → casos/$id/media/brag.mp4"
done

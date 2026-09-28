#!/bin/sh
# ./ad.sh a01 [a02 …] → video + banda sonora + portada, listos en ../entregables/anuncios/
set -e
cd "$(dirname "$0")"
PY=${PY:-python3}
for id in "$@"; do
  S=$(node render.mjs "$id" | tr '\r' '\n' | grep '→' | sed 's/.*→ //')
  $PY audio2.py "${S%.silent.mp4}.cues.json"
done

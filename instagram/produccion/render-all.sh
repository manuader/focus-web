#!/bin/sh
# Renderiza todos los reels (3 en paralelo) y les mezcla la banda sonora.
cd "$(dirname "$0")"
for f in reels/*.js; do echo "${f%.js}"; done | xargs -P 3 -I{} sh -c '
  node render.mjs {} > /dev/null || exit 1
  N=$(sed -n "s/.*name: .\(focus_[^\x27]*\).*/\1/p" {}.js)
  python3 audio.py ../entregables/reels/$N.cues.json
  rm -f ../entregables/reels/$N.silent.mp4 ../entregables/reels/$N.wav ../entregables/reels/$N.cues.json'

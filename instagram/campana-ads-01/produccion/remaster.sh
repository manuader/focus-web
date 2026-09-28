#!/bin/sh
# Rehace audio y master final de todos los anuncios desde sus masters mudos.
cd "$(dirname "$0")"
PY=${PY:-python3}
for c in ../entregables/anuncios/focus_ad*.cues.json; do echo "$c"; done | xargs -P 3 -I{} $PY audio2.py {}

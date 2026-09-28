#!/bin/sh
# ./stills.sh reels/r02 "1,3,5" → hoja de contacto en _control/<nombre>.jpg
set -e
rm -rf ../entregables/_control/tmp && mkdir -p ../entregables/_control
node render.mjs "$1" --stills "$2" >/dev/null
N=$(ls ../entregables/_control/*.jpg | head -1 | xargs basename | sed 's/_[0-9.]*\.jpg$//')
python3 sheet.py "../entregables/_control/${N}_" "${3:-../entregables/_control/sheet_${N}.jpg}"
rm -f ../entregables/_control/${N}_*.jpg
echo "../entregables/_control/sheet_${N}.jpg"

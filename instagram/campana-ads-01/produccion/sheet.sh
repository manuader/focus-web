#!/bin/sh
# ./sheet.sh a01 "1,4,9" [ancho]  → hoja de contacto de cuadros de control
set -e
cd "$(dirname "$0")"
C=../entregables/_control
rm -f $C/$1_*.jpg
node render.mjs "$1" --stills "$2" > /dev/null
W=${3:-270}
FILES=$(ls $C/$1_*.jpg | sort)
N=$(echo "$FILES" | wc -l | tr -d ' ')
IN=""; F=""; i=0
for f in $FILES; do IN="$IN -i $f"; F="$F[$i]scale=$W:-1[s$i];"; i=$((i+1)); done
S=""; i=0; while [ $i -lt $N ]; do S="$S[s$i]"; i=$((i+1)); done
if [ "$N" -eq 1 ]; then cp $FILES $C/sheet_$1.jpg; else ffmpeg -loglevel error -y $IN -filter_complex "${F}${S}hstack=$N" $C/sheet_$1.jpg; fi
echo $C/sheet_$1.jpg

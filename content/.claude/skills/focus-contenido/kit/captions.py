"""Exporta los captions de las fichas de una campaña a sus entregas.
python3 captions.py campanas/<c>
- 03-reels.md: cada ficha con `nombre.mp4` y un bloque **Caption** → entregas/reels/<nombre>.txt
- 04-carruseles.md: en orden, a entregas/posts/<carpeta>/caption.txt"""
import pathlib, re, sys
C = pathlib.Path(sys.argv[1]); E = C / 'entregas'
def blocks(md):
    s = (C / md).read_text(encoding='utf-8') if (C / md).exists() else ''
    for b in re.split(r'\n## ', s)[1:]:
        cap = re.search(r'\*\*Caption[^*]*\*\*\n((?:  > .*\n)+)', b)
        if cap:
            yield b, '\n'.join(l.strip()[2:] for l in cap.group(1).splitlines()).strip() + '\n'
n = 0
for b, text in blocks('03-reels.md'):
    m = re.search(r'`(focus_[A-Za-z0-9_\-]+)\.mp4`', b)
    if m and (E / 'reels').exists():
        (E / 'reels' / f'{m.group(1)}.txt').write_text(text, encoding='utf-8'); n += 1
posts = sorted(p for p in (E / 'posts').iterdir() if p.is_dir()) if (E / 'posts').exists() else []
for (b, text), d in zip(blocks('04-carruseles.md'), posts):
    (d / 'caption.txt').write_text(text, encoding='utf-8'); n += 1
print(f'OK   {n} captions exportados')

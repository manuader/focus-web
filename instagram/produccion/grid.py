"""Hoja de contactos de una carpeta de PNG: python3 grid.py <carpeta> <salida>"""
import sys, glob
from PIL import Image
fs = sorted(glob.glob(sys.argv[1] + '/*.png'))
ims = [Image.open(f).convert('RGB') for f in fs]
s = 0.3
w, h = int(ims[0].width * s), int(ims[0].height * s)
c = Image.new('RGB', ((w + 6) * len(ims), h), 'white')
for i, im in enumerate(ims):
    c.paste(im.resize((w, h)), (i * (w + 6), 0))
c.save(sys.argv[2], quality=85)

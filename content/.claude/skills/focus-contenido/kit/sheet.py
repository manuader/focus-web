"""Hoja de contactos de cuadros de control: python3 sheet.py <prefijo> <salida>"""
import sys, glob
from PIL import Image
files = sorted(glob.glob(sys.argv[1] + '*.jpg'), key=lambda f: float(f.rsplit('_', 1)[1][:-4]))
ims = [Image.open(f) for f in files]
s = 0.26
w, h = int(ims[0].width * s), int(ims[0].height * s)
c = Image.new('RGB', (w * len(ims) + 4 * len(ims), h), 'white')
for i, im in enumerate(ims):
    c.paste(im.resize((w, h)), (i * (w + 4), 0))
c.save(sys.argv[2], quality=85)

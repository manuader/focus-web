"""Hoja resumen de una campaña: la portada de cada reel, carrusel e historia en una imagen.
python3 resumen.py campanas/<c>/entregas"""
import glob, sys
from PIL import Image
E = sys.argv[1]
reels = sorted(glob.glob(f'{E}/reels/*.jpg'))
posts = [sorted(glob.glob(d + '/*.png'))[0] for d in sorted(glob.glob(f'{E}/posts/*')) if glob.glob(d + '/*.png')]
hist = [sorted(glob.glob(d + '/*.png'))[0] for d in sorted(glob.glob(f'{E}/historias/*')) if glob.glob(d + '/*.png')]
W, H, P = 216, 384, 270
cols = max(len(reels), len(posts) + len(hist), 1)
c = Image.new('RGB', (cols * (W + 8) + 8, H * 2 + 24), '#0a0a0b')
for i, f in enumerate(reels): c.paste(Image.open(f).convert('RGB').resize((W, H)), (8 + i * (W + 8), 8))
for i, f in enumerate(posts): c.paste(Image.open(f).convert('RGB').resize((W, P)), (8 + i * (W + 8), H + 16 + (H - P) // 2))
for i, f in enumerate(hist): c.paste(Image.open(f).convert('RGB').resize((W, H)), (8 + (len(posts) + i) * (W + 8), H + 16))
c.save(f'{E}/resumen.jpg', quality=88); print(f'OK   {E}/resumen.jpg')

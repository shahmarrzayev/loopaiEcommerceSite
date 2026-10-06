from PIL import Image,ImageDraw
from pathlib import Path
import json
rows=json.load(open('work/product-images/downloaded.json'));keys=list(dict.fromkeys(r['product'] for r in rows))
canvas=Image.new('RGB',(1000,len(keys)*195),'#e9edf3');draw=ImageDraw.Draw(canvas)
for r in rows:
 if 'error' in r:continue
 im=Image.open(r['path']).convert('RGB');im.thumbnail((235,165));x=(r['index']-1)*250;y=keys.index(r['product'])*195
 canvas.paste(im,(x+(250-im.width)//2,y));draw.text((x+4,y+170),r['product']+'/'+str(r['index']),fill='black')
canvas.save('work/product-images/contact.jpg')

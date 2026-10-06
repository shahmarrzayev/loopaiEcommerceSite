from pathlib import Path
from PIL import Image,ImageDraw
import urllib.request,io,json,concurrent.futures
items={
'dyson-v8':'https://cdn11.bigcommerce.com/s-8ek7z3h3jn/images/stencil/2560w/products/9004/50117/dyson-v8-cordless-vacuum-or-447026-01__22091.1722438196.jpg?c=1',
'nespresso-pixie':'https://www.krups.ch/user/pages/03.nespresso/04.pixie/18.9100053288/XN306TCH.PT08.png',
'philips-hd9252':'https://cdn.allmarket.ge/2410/93/20/72/756a3b19f5fc45ddb2c497ecc12fd813/353553-1008898.jpg',
'xiaomi-air-purifier-4-lite':'https://i05.appmifile.com/586_item_cz/30/08/2024/a0eb1dea14cc1c9a573a938e65879224.png',
'xiaomi-kettle-2':'https://mi-shop.com/upload/katalog-2021/xiaomi-electric-kettle-2/01.jpg',
}
def get(item):
 key,url=item;data=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=25).read();im=Image.open(io.BytesIO(data));im.load();im.thumbnail((1400,1400));p=Path(f'src/assets/images/products/{key}/1.webp');p.parent.mkdir(parents=True,exist_ok=True);im.save(p,'WEBP',quality=88);return {'product':key,'path':str(p),'sourceUrl':url}
rows=list(concurrent.futures.ThreadPoolExecutor().map(get,items.items()));Path('work/catalog-expansion/sources.json').write_text(json.dumps(rows,indent=2))
canvas=Image.new('RGB',(1250,270),'white');d=ImageDraw.Draw(canvas)
for i,r in enumerate(rows):
 im=Image.open(r['path']).convert('RGB');im.thumbnail((230,220));canvas.paste(im,(i*250,0));d.text((i*250,230),r['product'],fill='black')
canvas.save('work/catalog-expansion/preview.jpg');print('5 yeni məhsul şəkli endirildi.')

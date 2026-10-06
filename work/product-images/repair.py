import json,urllib.request,io,re,html
from pathlib import Path
from PIL import Image
rows=json.load(open('work/product-images/downloaded.json'))
def save(k,i,u):
 data=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=25).read();im=Image.open(io.BytesIO(data));im.load();im.thumbnail((1600,1600));p=Path(f'src/assets/images/products/{k}/{i}.webp');im.save(p,'WEBP',quality=88)
 r=next(r for r in rows if r['product']==k and r['index']==i);r.clear();r.update(product=k,index=i,path=str(p),sourceUrl=u,width=im.width,height=im.height);print(k,i,'OK')
cdn='https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/'
s=json.load(open('work/product-images/candidates.json'))
save('iphone-16-pro',4,next(u for u in s['iphone-16-pro']['images'] if 'Writing-Tools-240909' in u and 'large.jpg' in u))
a=[u for u in s['xiaomi-lamp']['images'] if '381_operator' in u];save('xiaomi-lamp',3,'https:'+a[0] if a[0].startswith('//') else a[0])
# Use the black machine's front photo as the first product image.
r1=next(r for r in rows if r['product']=='nespresso' and r['index']==1);r4=next(r for r in rows if r['product']=='nespresso' and r['index']==4)
for key in ['sourceUrl','width','height']:r1[key],r4[key]=r4[key],r1[key]
# All black Nike Air Max 270 product photos.
u='https://www.buzzsneakers.ba/patike/40909-nike-patike-air-max-270'
s=urllib.request.urlopen(u).read().decode();urls=list(dict.fromkeys(html.unescape(x) for x in re.findall(r'(?:https?:)?//[^\s"<>]+',s) if 'AH8050-005' in x and re.search(r'\.(jpg|webp)',x)))
print('nike candidates',urls[:6])
fallback=[
'https://www.buzzsneakers.ba/files/images/slike-proizvoda/media/AH8/AH8050-005/images360/AH8050-005_3.jpg.webp',
'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/078/455/288/original/332449_03.jpg.jpeg?action=crop&width=900',
'https://img.eobuwie.cloud/eob_product_660w_880h%28d/d/7/1/dd714565308acf16b9bdd41efd577d748351aa8b_0000207770232_03_pa%2Cjpg%29/buty-nike-air-max-270-ah8050-005-black-black-black.jpg',
'https://www.buzzsneakers.ba/files/images/slike-proizvoda/media/AH8/AH8050-005/images/AH8050-005.jpg.webp']
for i,u in enumerate(fallback,1):save('nike-air-max-270',i,u)
Path('work/product-images/downloaded.json').write_text(json.dumps(rows,indent=2))

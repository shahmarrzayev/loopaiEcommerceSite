from pathlib import Path
from PIL import Image
import json
sources=json.load(open('src/localeDatas/productImageSources.json'))
rows=[]
for key in ['iphone-17','airpods-pro-3','airpods-max-2','magsafe-charger']:
 for i in range(1,4):
  p=Path(f'public/images/products/{key}/{i}.jpg');im=Image.open(p);im.load();out=Path(f'src/assets/images/products/{key}/{i}.webp');out.parent.mkdir(parents=True,exist_ok=True);im.save(out,'WEBP',quality=88)
  original=next(r for r in sources if r['product']==key and r['path'].endswith(f'/{i}.jpg'))
  rows.append(dict(product=key,index=i,path=str(out),sourceUrl=original['source'],width=im.width,height=im.height))
Path('work/catalog-distinct/copied.json').write_text(json.dumps(rows,indent=2))
print('4 modelin 12 şəkli assets qovluğuna yerləşdirildi.')

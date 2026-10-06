import ast,json,io,urllib.request,hashlib
from pathlib import Path
from PIL import Image
mod=ast.parse(Path('work/catalog-distinct/download.py').read_text()); manifest=json.loads(ast.literal_eval(mod.body[3].value.args[0]))
rows=json.loads(Path('work/catalog-distinct/images.json').read_text())
for key,idx in [('nike-air-force-1',3),('nintendo-switch-oled',3),('ipad-air-m3',2)]:
 used={r['sourceUrl'] for r in rows if r['product']==key}; hashes={hashlib.sha256(Path(r['path']).read_bytes()).hexdigest() for r in rows if r['product']==key and r['index']!=idx}
 for url in manifest[key]:
  if url in used or '2024' in url:continue
  try:
   im=Image.open(io.BytesIO(urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=12).read()));im.load();im.thumbnail((1600,1600)); buf=io.BytesIO();im.save(buf,'WEBP',quality=88)
   if hashlib.sha256(buf.getvalue()).hexdigest() in hashes:continue
   r=next(r for r in rows if r['product']==key and r['index']==idx);Path(r['path']).write_bytes(buf.getvalue());r.update(sourceUrl=url,width=im.width,height=im.height);print(key,url);break
  except Exception:pass
 else:raise RuntimeError(key)
Path('work/catalog-distinct/images.json').write_text(json.dumps(rows,indent=2))
p=Path('src/assets/images/products/sources.json');data=json.loads(p.read_text()); additions=rows+json.loads(Path('work/catalog-distinct/copied.json').read_text());merged={r['path']:r for r in data['images']+additions};data['images']=list(merged.values());p.write_text(json.dumps(data,indent=2)+'\n')

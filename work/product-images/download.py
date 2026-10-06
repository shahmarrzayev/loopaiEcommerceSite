import json,re,html,urllib.request,concurrent.futures,io
from pathlib import Path
from PIL import Image
r=json.load(open('work/product-images/candidates.json'))
def imgs(k):return r[k]['images']
def unique(a):
 seen=set();out=[]
 for u in a:
  u='https:'+u if u.startswith('//') else u.replace('http:','https:');u=u.split('?')[0]
  if u not in seen:seen.add(u);out.append(u)
 return out
def apple(k,parts):return [next(u for u in imgs(k) if part in u and 'large.jpg' in u) for part in parts]
a={
'iphone-16-pro':apple('iphone-16-pro',['hero-','finish-lineup-','camera-system-','light-and-durable']),
's25-ultra':unique([u for u in imgs('s25-ultra') if '/gallery/' in u and 's938uzkeatt' in u])[:4],
'macbook-air-15':apple('macbook-air-15',['hero-','sky-blue-','top-view-','side-view-']),
'ps5-slim':unique([u for u in imgs('ps5-slim') if 'PS5_D' in u and 'large.jpg' not in u])[:4],
'apple-watch-10':apple('apple-watch-10',['hero-','profile-','larger-display-','wide-angle-OLED']),
'nike-air-max-270':unique([u.replace('t_PDP_144_v1/f_auto,q_auto:eco','t_default') for u in imgs('nike-air-max-270') if 't_PDP_144_v1' in u])[:4],
'adidas-hoodie':unique([u for u in imgs('adidas-hoodie') if 'H12213' in u and 'grande' not in u])[:3],
'levis-501':[u for u in imgs('levis-501') if '1818x2000' in u][:4],
'rayban-aviator':unique([u for u in imgs('rayban-aviator') if 'Arista-Green' in u and 'grande' not in u])[:3],
'north-face-jacket':imgs('north-face-jacket')[:4],
'dyson-v15':[
'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/hero-locale/es_ES/446986-01.png',
'https://dyson-h.assetsadobe2.com/is/image/content/dam/dyson/images/products/hero-locale/de_DE/394451-01.png?fmt=png-alpha&scl=1',
'https://cdn11.bigcommerce.com/s-sp9oc95xrw/images/stencil/1280x1280/products/29977/93219/PRODUCT_IMAGE__92383.1742209750.png?c=2',
'https://product.hstatic.net/200000636469/product/cong-cu-ket-hop_43f66b9fbded479fbc5168aec58e6c8f_large.jpg'],
'philips-airfryer':list(dict.fromkeys(re.findall(r'https://images.philips.com/is/image/philipsconsumer/[\w-]+',html.unescape(Path('work/product-images/philips-airfryer.html').read_text()))))[:3],
'nespresso':[next(u for u in imgs('nespresso') if 'foodthinkers' in u and 'pdp.jpg' in u)]+[next(u for u in imgs('nespresso') if 'width=1304' in u and f'BEC320/dna{i}' in u) for i in range(1,4)],
'xiaomi-lamp':unique([u for u in imgs('xiaomi-lamp') if 'pms_1666850673' in u])+[u for u in unique(imgs('xiaomi-lamp')) if 'operator_sg' in u][:2],
'roborock':[
'https://m.media-amazon.com/images/I/71Xc4AQWlbL._AC_UF894%2C1000_QL80_.jpg',
'https://image.alza.cz/products/ROBRV514/ROBRV514-02.jpg',
'https://bermud.az/181329-large_default/robot-pylesos-roborock-s8-black.jpg',
'https://img.gkbcdn.com/p/2024-07-12/Roborock-S8-Robot-Vacuum-Cleaner-Black-10000359-0._w500_.jpg'],
}
Path('work/product-images/selected.json').write_text(json.dumps(a,indent=2))
def get(t):
 k,i,u=t
 try:
  if 'images.samsung.com/is/image/' in u or 'images.philips.com/is/image/' in u:u+='?wid=1200&hei=1200&fmt=png'
  data=urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read()
  im=Image.open(io.BytesIO(data));im.load();assert min(im.size)>100
  im.thumbnail((1600,1600));path=Path(f'src/assets/images/products/{k}/{i}.webp');path.parent.mkdir(parents=True,exist_ok=True);im.save(path,'WEBP',quality=88)
  return dict(product=k,index=i,path=str(path),sourceUrl=u,width=im.width,height=im.height)
 except Exception as e:return dict(product=k,index=i,error=str(e),sourceUrl=u)
rows=list(concurrent.futures.ThreadPoolExecutor(max_workers=8).map(get,[(k,i,u) for k,urls in a.items() for i,u in enumerate(urls,1)]))
Path('work/product-images/downloaded.json').write_text(json.dumps(rows,indent=2))
for row in rows:print(row['product'],row['index'],row.get('error','OK'))

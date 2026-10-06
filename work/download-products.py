from pathlib import Path
import urllib.request,json,concurrent.futures,re
cdn='https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/'
def shop(name): return cdn+name+'?wid=1000&hei=1000&fmt=jpeg&qlt=85'
candidates=json.load(open('work/candidates.json'))
def find(k,part): return 'https://www.apple.com'+next(x for x in candidates[k] if part in x and 'large.jpg' in x)
images={
 'iphone-18-pro':[shop('iphone-18-pro-finish-select-'+c+'-202609_AV2') for c in ['silver','burgundy','black']],
 'iphone-18-pro-max':[shop('iphone-18-pro-max-finish-select-'+c+'-202609_AV2') for c in ['silver','burgundy','black']],
 'iphone-17':[shop('iphone-17-finish-select-'+c+'-202509_AV2') for c in ['black','lavender','sage']],
 'iphone-air':[shop('iphone-air-finish-select-'+c+'-202509_AV2') for c in ['skyblue','cloudwhite','spaceblack']],
 'airpods-pro-3':[find('airpods-pro-3',p) for p in ['welcome/hero__','closer_look_initial__','hero_endframe__']],
 'airpods-max-2':['https://www.apple.com'+next(x for x in candidates['airpods-max-2'] if p in x and '_xlarge.jpg' in x) for p in ['bento_1_airpod_max_midnight','design_static','hifi_static']],
 'magsafe-charger':[shop(x) for x in ['MGD74','MGD74_AV1','MGD74_AV2']],
}
root=Path('public/images/products');root.mkdir(parents=True,exist_ok=True)
def download(item):
 slug,i,url=item
 data=urllib.request.urlopen(url,timeout=30).read()
 assert data[:2]==b'\xff\xd8', (slug,url,'not JPEG')
 folder=root/slug;folder.mkdir(exist_ok=True)
 (folder/f'{i}.jpg').write_bytes(data)
 return {'product':slug,'path':f'/images/products/{slug}/{i}.jpg','source':url,'bytes':len(data)}
rows=list(concurrent.futures.ThreadPoolExecutor(max_workers=6).map(download,[(k,i,u) for k,urls in images.items() for i,u in enumerate(urls,1)]))
json.dump(rows,open('work/downloaded-images.json','w'),indent=2)
for r in rows: print(r['path'],r['bytes'])

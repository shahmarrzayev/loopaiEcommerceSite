import urllib.request,re,html,json,concurrent.futures
from pathlib import Path
pages={
'iphone-16-pro':'https://www.apple.com/newsroom/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/',
's25-ultra':'https://www.samsung.com/us/smartphones/galaxy-s25-ultra/buy/galaxy-s25-ultra-256gb-unlocked-sm-s938uzkaxaa/',
'macbook-air-15':'https://www.apple.com/newsroom/2025/03/apple-introduces-macbook-air-with-the-m4-chip-and-a-sky-blue-color/',
'ps5-slim':'https://www.playstation.com/en-us/ps5/',
'apple-watch-10':'https://www.apple.com/newsroom/2024/09/introducing-apple-watch-series-10/',
'nike-air-max-270':'https://www.nike.com/t/air-max-270-mens-shoes-KkLcGR/AH8050-002',
'adidas-hoodie':'https://www.adidas.com/us/trefoil-essentials-hoodie/KS9807.html',
'levis-501':'https://levi.pt/en/product/jeans/501-original-fit-jeans-00501-0101',
'rayban-aviator':'https://www.sunglassconnection.com.au/ray-ban-sunglasses/aviator-classic-rb3025-3025w340058',
'north-face-jacket':'https://store.walkin-store.com/category/THE_NORTH_FACE/25LO_TNFAW92555.html',
'dyson-v15':'https://www.dyson.com/vacuum-cleaners/cordless/v15/detect-yellow',
'philips-airfryer':'https://www.philips.co.uk/c-p/HD9270_91/3000-series-airfryer-xl',
'nespresso':'https://www.nespresso.com/us/en/order/machines/original/essenza-plus-nespresso-c-black',
'xiaomi-lamp':'https://www.mi.com/global/product/mi-led-desk-lamp-1s/',
'roborock':'https://us.roborock.com/products/roborock-s8',
}
def run(pair):
 k,u=pair
 try:
  req=urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'})
  s=urllib.request.urlopen(req,timeout=20).read().decode();Path('work/product-images/'+k+'.html').write_text(s)
  s=html.unescape(s).replace('\\/','/').replace('\\u0026','&')
  urls=list(dict.fromkeys(re.findall(r'(?:https?:)?//[^\s"<>\\]+',s)))
  imgs=[x for x in urls if re.search(r'\.(jpg|jpeg|png|webp)(?:\?|$)',x,re.I) or 'images.samsung.com/is/image/' in x]
  Path('work/product-images/'+k+'.json').write_text(json.dumps(imgs,indent=2))
  print(k,len(imgs),'\n'+'\n'.join(imgs[:6]))
  return k,{'page':u,'images':imgs}
 except Exception as e: print(k,'FAILED',e);return k,{'page':u,'images':[]}
json.dump(dict(concurrent.futures.ThreadPoolExecutor(max_workers=6).map(run,pages.items())),open('work/product-images/candidates.json','w'),indent=2)

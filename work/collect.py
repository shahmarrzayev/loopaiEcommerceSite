import urllib.request,re,html,json,concurrent.futures
pages={'iphone-18-pro':'https://www.apple.com/shop/buy-iphone/iphone-18-pro','iphone-17':'https://www.apple.com/shop/buy-iphone/iphone-17','iphone-air':'https://www.apple.com/shop/buy-iphone/iphone-air','airpods-pro-3':'https://www.apple.com/airpods-pro/','airpods-max-2':'https://www.apple.com/airpods-max/','magsafe':'https://www.apple.com/shop/product/mgd74am/a/magsafe-charger-1-m'}
def get(item):
 k,u=item
 try:
  s=urllib.request.urlopen(u,timeout=20).read().decode()
  open('work/'+k+'.html','w').write(s)
  urls=list(dict.fromkeys(html.unescape(x) for x in re.findall(r'(?:https://[^\s"<>\\]+|/v/[^\s"<>]+)',s) if '/is/' in x or re.search(r'\.(?:png|jpg|jpeg)(?:\?|$)',x)))
  print(k,'\n'+'\n'.join(x.split('?')[0] for x in urls if '/is/' in x or ('overview' in x and 'large' in x))[:3500])
  return k,urls
 except Exception as e:
  print(k,str(e));return k,[]
json.dump(dict(concurrent.futures.ThreadPoolExecutor().map(get,pages.items())),open('work/candidates.json','w'))

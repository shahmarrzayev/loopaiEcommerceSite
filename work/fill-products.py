from pathlib import Path
import json,urllib.request
rows=json.load(open('work/downloaded-images.json'))
for slug,color,year in [('iphone-18-pro','silver','202609'),('iphone-18-pro-max','silver','202609'),('iphone-17','black','202509'),('iphone-air','skyblue','202509')]:
 url=f'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/{slug}-finish-select-{color}-{year}_AV2?wid=1000&hei=1000&fmt=jpeg&qlt=85'
 data=urllib.request.urlopen(url).read();Path(f'public/images/products/{slug}/3.jpg').write_bytes(data)
 r=next(r for r in rows if r['product']==slug and r['path'].endswith('/3.jpg'));r.update(source=url,bytes=len(data))
entries=[
 ('iphone-18-pro','Apple iPhone 18 Pro 256 GB',1199,'https://www.apple.com/shop/buy-iphone/iphone-18-pro','https://www.apple.com/iphone-18-pro/specs/',
  'A20 Pro prosessorlu premium smartfon. 6.3 düymlük OLED ekran, 120 Hz ProMotion və 48 MP Pro Fusion kamera sistemi ilə təchiz olunub.',
  [('Brend','Apple'),('Məhsul növü','Smartfon'),('Daxili yaddaş','256 GB'),('Prosessor','A20 Pro'),('Ekran','6.3 düym Super Retina XDR OLED'),('Yenilənmə tezliyi','120 Hz-dək ProMotion'),('Kamera sistemi','48 MP Pro Fusion'),('Rəng','Silver'),('Bağlantı','5G, Wi-Fi 7, Bluetooth 6'),('Şarj portu','USB-C')]),
 ('iphone-18-pro-max','Apple iPhone 18 Pro Max 256 GB',1299,'https://www.apple.com/shop/buy-iphone/iphone-18-pro','https://www.apple.com/iphone-18-pro/specs/',
  '6.9 düymlük OLED ekranlı premium smartfon. A20 Pro prosessoru, 48 MP Pro Fusion kameraları və 120 Hz-dək ProMotion ekran texnologiyası ilə təqdim olunur.',
  [('Brend','Apple'),('Məhsul növü','Smartfon'),('Daxili yaddaş','256 GB'),('Prosessor','A20 Pro'),('Ekran','6.9 düym Super Retina XDR OLED'),('Yenilənmə tezliyi','120 Hz-dək ProMotion'),('Kamera sistemi','48 MP Pro Fusion'),('Rəng','Silver'),('Bağlantı','5G, Wi-Fi 7, Bluetooth 6'),('Şarj portu','USB-C')]),
 ('iphone-17','Apple iPhone 17 256 GB',929,'https://www.apple.com/shop/buy-iphone/iphone-17','https://www.apple.com/iphone-17/specs/',
  'A19 prosessoru və 6.3 düymlük Super Retina XDR ekranı ilə gündəlik istifadə üçün smartfon. 48 MP Dual Fusion kamera sistemi və 18 MP Center Stage ön kamerası var.',
  [('Brend','Apple'),('Məhsul növü','Smartfon'),('Daxili yaddaş','256 GB'),('Prosessor','A19'),('Ekran','6.3 düym Super Retina XDR OLED'),('Yenilənmə tezliyi','120 Hz-dək ProMotion'),('Arxa kameralar','48 MP əsas + 48 MP ultra geniş'),('Ön kamera','18 MP Center Stage'),('Rəng','Black'),('Şarj portu','USB-C')]),
 ('iphone-air','Apple iPhone Air 256 GB',1099,'https://www.apple.com/shop/buy-iphone/iphone-air','https://www.apple.com/iphone-air/specs/',
  '5.64 mm qalınlığında titan korpuslu smartfon. A19 Pro prosessoru, 6.5 düymlük OLED ekranı və 48 MP Fusion əsas kamerası ilə təchiz olunub.',
  [('Brend','Apple'),('Məhsul növü','Smartfon'),('Daxili yaddaş','256 GB'),('Prosessor','A19 Pro'),('Ekran','6.5 düym Super Retina XDR OLED'),('Yenilənmə tezliyi','120 Hz-dək ProMotion'),('Əsas kamera','48 MP Fusion'),('Korpus','Titan, 5.64 mm'),('Rəng','Sky Blue'),('SIM kart','eSIM'),('Şarj portu','USB-C')]),
 ('airpods-pro-3','Apple AirPods Pro 3',249,'https://www.apple.com/shop/buy-airpods/airpods-pro-3','https://www.apple.com/airpods-pro/specs/',
  'Aktiv səs-küy azaltma və Adaptive Audio funksiyalı qulaqdaxili qulaqlıq. H2 çipi, məşq zamanı ürək döyüntüsü sensoru və USB-C MagSafe şarj qutusu ilə təqdim olunur.',
  [('Brend','Apple'),('Məhsul növü','Simsiz qulaqdaxili qulaqlıq'),('Çip','Apple H2'),('Səs-küy azaltma','Aktiv (ANC)'),('Bağlantı','Bluetooth 5.3'),('Dinləmə müddəti','ANC aktiv olduqda 8 saatadək'),('Qutu ilə dinləmə','ANC aktiv olduqda 24 saatadək'),('Qorunma','IP57, qulaqlıqlar və qutu'),('Şarj','USB-C, MagSafe, Qi'),('Rəng','Ağ')]),
 ('airpods-max-2','Apple AirPods Max 2',549,'https://www.apple.com/shop/buy-airpods/airpods-max-2','https://www.apple.com/airpods-max/specs/',
  'Aktiv səs-küy azaltma, Adaptive Audio və fərdiləşdirilmiş Spatial Audio funksiyalı başüstü qulaqlıq. Hər qulaq hissəsində H2 çipi, USB-C şarj və Digital Crown idarəetməsi var.',
  [('Brend','Apple'),('Məhsul növü','Simsiz başüstü qulaqlıq'),('Çip','Apple H2, hər qulaq hissəsində'),('Səs-küy azaltma','Aktiv (ANC)'),('Bağlantı','Bluetooth 5.3'),('Dinləmə müddəti','ANC aktiv olduqda 20 saatadək'),('Şarj portu','USB-C'),('İdarəetmə','Digital Crown'),('Çəki','386.2 qram'),('Rəng seçimləri','Midnight, Starlight, Blue, Purple, Orange')]),
 ('magsafe-charger','Apple MagSafe Charger 1 m (25 W)',39,'https://www.apple.com/shop/product/mgd74ll/a/magsafe-charger-1-m','https://www.apple.com/shop/product/mgd74ll/a/magsafe-charger-1-m',
  'Uyğun iPhone modellərinə maqnitlə birləşən simsiz şarj cihazı. 30 W USB-C adapterlə 25 W-dək şarjı dəstəkləyir. İnteqrasiya olunmuş kabeli 1 metrdir; adapter ayrıca satılır.',
  [('Brend','Apple'),('Məhsul növü','Simsiz şarj cihazı'),('Model kodu','MGD74LL/A'),('Maksimum güc','Uyğun cihaz və adapterlə 25 W-dək'),('Standartlar','MagSafe, Qi2 25W, Qi'),('Kabel uzunluğu','1 metr'),('Konnektor','USB-C'),('Tövsiyə olunan adapter','30 W USB-C, ayrıca satılır'),('Rəng','Ağ')]),
]
products=[]
for i,(slug,title,usd,price_source,spec_source,desc,attrs) in enumerate(entries,1):
 products.append(dict(id=i,slug=slug,price=round(usd*1.7,2),discountedPrice=None,currency='AZN',title=title,
  images=[f'/images/products/{slug}/{j}.jpg' for j in range(1,4)],description=desc,
  attributes=[dict(attribute=k,option=v) for k,v in attrs],
  sourceUrl=spec_source,
  priceReference=dict(sourceUrl=price_source,originalPrice=usd,originalCurrency='USD',exchangeRate=1.7,exchangeRateSource='https://www.cbar.az/currency/rates',checkedAt='2026-10-05',type='converted-reference',note='ABŞ rəsmi qiymətinin AZN ekvivalenti; yerli satış qiyməti deyil. Vergi, gömrük və çatdırılma daxil deyil.')))
data={'telefonVeAksesuarlar':{'name':'Telefon və aksesuarlar','slug':'telefonVeAksesuarlar','products':products}}
p=Path('src/localeDatas/datas.jsx');s=p.read_text();s=s[:s.index('export const allProductsData = {')]
s+='// Rəsmi məhsul məlumatları. Qiymətlər USD-dən AZN-ə çevrilmiş istinad qiymətləridir.\n'
s+='// Endirim təsdiqlənmədiyi üçün discountedPrice null saxlanılır.\n'
s+='export const allProductsData = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n';p.write_text(s)
Path('src/localeDatas/productImageSources.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('7 məhsul, hər birində 3 yerli şəkil; qiymətlər AZN.')

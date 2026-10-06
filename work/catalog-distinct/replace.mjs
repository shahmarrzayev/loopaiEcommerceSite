import fs from 'node:fs';
const path='src/localeDatas/datas.jsx';
const source=fs.readFileSync(path,'utf8');
const start=source.indexOf('const productsCatalog = ');
const end=source.indexOf('// Oxşar məhsullar',start);
const prefix=source.slice(0,start);
const imports=[...prefix.matchAll(/^import (\w+) from "[^"\n]+\.(?:webp|png|jpg|jpeg)";/gm)].map(m=>m[1]);
const catalog=Function(...imports,source.slice(start,end)+'\nreturn productsCatalog;')(...imports.map(n=>'__IMAGE_'+n+'__'));
fs.writeFileSync('work/catalog-distinct/before.json',JSON.stringify(catalog));
for(const category of Object.values(catalog))category.products=category.products.filter(p=>p.variantOf===undefined);
if(catalog.elektronika.products.length!==5||catalog.paltarVeAkssesuarlar.products.length!==5||catalog.evVeYasam.products.length!==10)throw Error('Unexpected catalog; aborting.');
const specs=[
 ['elektronika',16,'iphone-17','Apple iPhone 17','telefon',1699.99,'6.3 düymlük OLED ekranı, A19 prosessoru və 48 MP Dual Fusion kameraları ilə smartfon.',[['Brend','Apple'],['Model','iPhone 17'],['Yaddaş','256 GB'],['Ekran','6.3 düym OLED'],['Prosessor','A19']]],
 ['elektronika',17,'ipad-air-m3','Apple iPad Air 11 M3','planset',1499.99,'M3 prosessorlu 11 düymlük planşet. İş, dərs və multimedia istifadəsi üçün hazırlanıb.',[['Brend','Apple'],['Model','iPad Air 11 (M3)'],['Prosessor','Apple M3'],['Ekran','11 düym'],['Növ','Planşet']]],
 ['elektronika',18,'nintendo-switch-oled','Nintendo Switch OLED','oyun-konsolu',699.99,'Televizor, masaüstü və portativ rejimlərdə istifadə olunan OLED ekranlı oyun konsolu.',[['Brend','Nintendo'],['Model','Switch OLED'],['Ekran','7 düym OLED'],['Yaddaş','64 GB'],['Rəng','Ağ']]],
 ['elektronika',19,'sony-wh1000xm5','Sony WH-1000XM5','qulaqliq',599.99,'Aktiv səs-küy azaltma funksiyalı simsiz başüstü qulaqlıq.',[['Brend','Sony'],['Model','WH-1000XM5'],['Növ','Başüstü qulaqlıq'],['Bağlantı','Bluetooth'],['Səs-küy azaltma','Aktiv (ANC)']]],
 ['elektronika',20,'airpods-pro-3','Apple AirPods Pro 3','qulaqliq',429.99,'Aktiv səs-küy azaltma və Adaptive Audio funksiyalı qulaqdaxili qulaqlıq. USB-C MagSafe şarj qutusu ilə təqdim olunur.',[['Brend','Apple'],['Model','AirPods Pro 3'],['Növ','Qulaqdaxili qulaqlıq'],['Çip','Apple H2'],['Şarj','USB-C / MagSafe']]],
 ['elektronika',21,'airpods-max-2','Apple AirPods Max 2','qulaqliq',939.99,'Aktiv səs-küy azaltma və Spatial Audio funksiyalı simsiz başüstü qulaqlıq.',[['Brend','Apple'],['Model','AirPods Max 2'],['Növ','Başüstü qulaqlıq'],['Çip','Apple H2'],['Şarj portu','USB-C']]],
 ['elektronika',22,'magsafe-charger','Apple MagSafe Charger 25 W','sarj-cihazi',79.99,'Uyğun iPhone modellərinə maqnitlə birləşən, 1 metr kabelli simsiz şarj cihazı. Adapter ayrıca satılır.',[['Brend','Apple'],['Model','MagSafe Charger'],['Kabel uzunluğu','1 metr'],['Konnektor','USB-C'],['Şarj','Uyğun cihaz və adapterlə 25 W-dək']]],
 ['paltarVeAkssesuarlar',23,'adidas-samba-og','Adidas Samba OG','ayaqqabi',189.99,'Klassik aşağı profilli siluetə və rezin altlığa sahib gündəlik idman ayaqqabısı.',[['Brend','Adidas'],['Model','Samba OG'],['Növ','İdman ayaqqabısı'],['Rəng','Ağ / Qara']]],
 ['paltarVeAkssesuarlar',24,'nike-air-force-1','Nike Air Force 1 ’07','ayaqqabi',199.99,'Air Force 1 modelinin klassik ağ rəngli, aşağıboğaz gündəlik versiyası.',[['Brend','Nike'],['Model','Air Force 1 ’07'],['Növ','İdman ayaqqabısı'],['Rəng','Ağ']]],
 ['paltarVeAkssesuarlar',25,'new-balance-530','New Balance 530','ayaqqabi',179.99,'Retro qaçış ayaqqabılarından ilhamlanan, gündəlik istifadə üçün idman ayaqqabısı.',[['Brend','New Balance'],['Model','530'],['Növ','İdman ayaqqabısı'],['Rəng','Ağ / Gümüşü']]],
 ['paltarVeAkssesuarlar',31,'puma-suede-classic','Puma Suede Classic','ayaqqabi',139.99,'Klassik Suede silueti və zamşa üst hissəsi ilə gündəlik idman ayaqqabısı.',[['Brend','Puma'],['Model','Suede Classic'],['Material','Zamşa'],['Rəng','Qara / Ağ']]],
 ['paltarVeAkssesuarlar',32,'converse-chuck-70','Converse Chuck 70','ayaqqabi',159.99,'Yüksəkboğaz siluetli, tekstil üst hissəyə və rezin altlığa sahib klassik ayaqqabı.',[['Brend','Converse'],['Model','Chuck 70'],['Növ','Yüksəkboğaz ayaqqabı'],['Rəng','Qara']]],
 ['paltarVeAkssesuarlar',33,'vans-old-skool','Vans Old Skool','ayaqqabi',149.99,'Yan zolaqlı klassik aşağıboğaz skate ayaqqabısı.',[['Brend','Vans'],['Model','Old Skool'],['Növ','Skate ayaqqabısı'],['Rəng','Qara / Ağ']]],
 ['paltarVeAkssesuarlar',34,'casio-f91w','Casio F-91W','saat',49.99,'Yüngül korpuslu, siqnal və saniyəölçən funksiyalarına sahib rəqəmsal qol saatı.',[['Brend','Casio'],['Model','F-91W'],['Növ','Rəqəmsal qol saatı'],['Rəng','Qara']]],
 ['evVeYasam',35,'kitchenaid-artisan','KitchenAid Artisan 5KSM175','mikser',1199.99,'Xəmir yoğurmaq və müxtəlif qarışıqlar hazırlamaq üçün stasionar mətbəx mikseri.',[['Brend','KitchenAid'],['Model','Artisan 5KSM175'],['Növ','Stasionar mikser'],['Rəng','Qırmızı']]],
 ['evVeYasam',36,'tefal-ultimate-pure','Tefal Ultimate Pure FV9845','utu',249.99,'Gündəlik geyim ütüləmək üçün buxarlı elektrik ütüsü.',[['Brend','Tefal'],['Model','Ultimate Pure FV9845'],['Növ','Buxarlı ütü']]],
];
let imageImports='';
for(const [category,id,slug,title,productType,price,description,attrs] of specs){
 const base=slug.split('-').map((s,i)=>i?s[0].toUpperCase()+s.slice(1):s).join('');
 const images=[];
 for(let i=1;i<=3;i++){
  const name=base+'Image'+i;
  imageImports+=`import ${name} from "../assets/images/products/${slug}/${i}.webp";\n`;
  images.push('__IMAGE_'+name+'__');
 }
 catalog[category].products.push({id,slug,title,productType,price,discountedPrice:null,currency:'AZN',priceType:'demo',description,images,attributes:attrs.map(([attribute,option])=>({attribute,option}))});
}
// Renew every relationship after removing the repeated variants.
for(const category of Object.values(catalog)){
 for(const product of category.products){
  product.similarProductIds=category.products.filter(other=>other.id!==product.id).sort((a,b)=>Number(b.productType===product.productType)-Number(a.productType===product.productType)||Math.abs(a.price-product.price)-Math.abs(b.price-product.price)||a.id-b.id).slice(0,5).map(p=>p.id);
 }
}
const text=JSON.stringify(catalog,null,2).replace(/"__IMAGE_(\w+)__"/g,'$1');
fs.writeFileSync(path,imageImports+'\n'+prefix+'const productsCatalog = '+text+';\n\n'+source.slice(end));
fs.writeFileSync('work/catalog-distinct/expected.json',JSON.stringify(catalog));
console.log('36 müxtəlif məhsul; hər kateqoriyada 12; yaddaş/ölçü təkrarları çıxarıldı.');

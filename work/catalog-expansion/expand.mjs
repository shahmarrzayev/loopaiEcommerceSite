import fs from 'node:fs';
const file='src/localeDatas/datas.jsx';
const source=fs.readFileSync(file,'utf8');
const [prefix,body]=source.split('export const allProductsData = ');
const imageNames=[...prefix.matchAll(/^import (\w+) from "[^"\n]+\.(?:webp|png|jpg|jpeg)";/gm)].map(m=>m[1]);
const catalog=Function(...imageNames,`return ${body}`)(...imageNames.map(n=>`__IMAGE_${n}__`));
const existing=Object.values(catalog).flatMap(c=>c.products);
if(existing.length!==15) throw Error('Expected current 15-product catalog; refusing to overwrite changed data.');
fs.writeFileSync('work/catalog-expansion/before.json',JSON.stringify(catalog));
const slugs=['iphone-16-pro-256gb','samsung-galaxy-s25-ultra-256gb','macbook-air-15-m4-16gb-512gb','sony-playstation-5-slim','apple-watch-series-10-46mm','nike-air-max-270-42','adidas-essentials-hoodie-l','levis-501-original-jeans-32','ray-ban-aviator-classic','the-north-face-puffer-jacket-l','dyson-v15-detect','philips-airfryer','nespresso-coffee-machine','xiaomi-smart-led-desk-lamp','roborock-robot-vacuum'];
const types=['telefon','telefon','noutbuk','oyun-konsolu','saat','ayaqqabi','huddi','cins','eynek','godekce','tozsoran','airfryer','qehve-masini','isiqlandirma','tozsoran'];
existing.forEach((p,i)=>{p.slug=slugs[i];p.productType=types[i];p.currency='AZN';});
function variant(category,baseId,id,title,slug,attributes,price){
 const p=structuredClone(existing.find(p=>p.id===baseId));
 Object.assign(p,{id,title,slug,price,discountedPrice:null,priceType:'demo',variantOf:baseId});
 p.attributes=p.attributes.map(a=>({...a,option:attributes[a.attribute]??a.option}));
 p.description+=` Variant: ${Object.values(attributes).join(', ')}.`;
 catalog[category].products.push(p);
}
variant('elektronika',1,16,'iPhone 16 Pro 512 GB','iphone-16-pro-512gb',{'Yaddaş':'512 GB'},3899.99);
variant('elektronika',1,17,'iPhone 16 Pro 1 TB','iphone-16-pro-1tb',{'Yaddaş':'1 TB'},4299.99);
variant('elektronika',2,18,'Samsung Galaxy S25 Ultra 512 GB','samsung-galaxy-s25-ultra-512gb',{'Yaddaş':'512 GB'},2799.99);
variant('elektronika',2,19,'Samsung Galaxy S25 Ultra 1 TB','samsung-galaxy-s25-ultra-1tb',{'Yaddaş':'1 TB'},3299.99);
variant('elektronika',3,20,'MacBook Air 15 M4 24 GB / 512 GB','macbook-air-15-m4-24gb-512gb',{'RAM':'24 GB'},3699.99);
variant('paltarVeAkssesuarlar',6,21,'Nike Air Max 270 — 41','nike-air-max-270-41',{'Ölçü':'41'},149.99);
variant('paltarVeAkssesuarlar',6,22,'Nike Air Max 270 — 43','nike-air-max-270-43',{'Ölçü':'43'},149.99);
variant('paltarVeAkssesuarlar',7,23,'Adidas Essentials Hoodie — M','adidas-essentials-hoodie-m',{'Ölçü':'M'},89.99);
variant('paltarVeAkssesuarlar',8,24,"Levi's 501 Original Jeans — 34",'levis-501-original-jeans-34',{'Ölçü':'34'},129.99);
variant('paltarVeAkssesuarlar',10,25,'The North Face Puffer Jacket — M','the-north-face-puffer-jacket-m',{'Ölçü':'M'},199.99);
const home=[
 [26,'dyson-v8','Dyson V8','dysonV8Image1','tozsoran',599.99,'Gündəlik döşəmə və mebel təmizliyi üçün simsiz tozsoran.',[['Brend','Dyson'],['Model','V8'],['Növ','Simsiz tozsoran'],['İşləmə müddəti','40 dəqiqəyədək']]],
 [27,'nespresso-pixie','Nespresso Pixie','nespressoPixieImage1','qehve-masini',299.99,'Espresso və lungo hazırlamaq üçün kompakt kapsul qəhvə maşını.',[['Brend','Nespresso'],['Model','Pixie'],['Növ','Kapsul'],['İçki seçimləri','Espresso, Lungo']]],
 [28,'philips-hd9252','Philips Airfryer HD9252/90','philipsHd9252Image1','airfryer',249.99,'Rəqəmsal idarəetməli, 4.1 litrlik isti hava fritözü.',[['Brend','Philips'],['Model','HD9252/90'],['Tutum','4.1 L'],['Güc','1400 W'],['Rəng','Qara']]],
 [29,'xiaomi-air-purifier-4-lite','Xiaomi Smart Air Purifier 4 Lite','xiaomiAirPurifier4LiteImage1','hava-temizleyici',299.99,'Evdə hava keyfiyyətini izləmək və havanı filtrləmək üçün ağıllı hava təmizləyici.',[['Brend','Xiaomi'],['Model','Smart Air Purifier 4 Lite'],['Növ','Hava təmizləyici'],['Rəng','Ağ']]],
 [30,'xiaomi-kettle-2','Xiaomi Electric Kettle 2','xiaomiKettle2Image1','caydan',79.99,'1.7 litr tutumlu, ağ korpuslu elektrik çaydanı.',[['Brend','Xiaomi'],['Model','Electric Kettle 2'],['Tutum','1.7 L'],['Güc','1800 W'],['Rəng','Ağ']]],
];
let newImports='';
for(const [id,slug,title,image,productType,price,description,attrs] of home){
 newImports+=`import ${image} from "../assets/images/products/${slug}/1.webp";\n`;
 catalog.evVeYasam.products.push({id,slug,price,discountedPrice:null,currency:'AZN',priceType:'demo',title,productType,description,images:[`__IMAGE_${image}__`],attributes:attrs.map(([attribute,option])=>({attribute,option}))});
}
// Prefer the same product type, then the closest price, within the same category.
for(const category of Object.values(catalog)){
 for(const p of category.products){
  p.similarProductIds=category.products.filter(other=>other.id!==p.id).sort((a,b)=>Number(b.productType===p.productType)-Number(a.productType===p.productType)||Math.abs(a.price-p.price)-Math.abs(b.price-p.price)||a.id-b.id).slice(0,5).map(p=>p.id);
 }
}
let text=JSON.stringify(catalog,null,2).replace(/"__IMAGE_(\w+)__"/g,'$1');
const bottom=`
// Oxşar məhsullar tam kart məlumatlarıdır; iç-içə sonsuz istinad yaranmır.
const productsById = new Map(
  Object.values(productsCatalog).flatMap((category) =>
    category.products.map((product) => [product.id, product]),
  ),
);

export const allProductsData = Object.fromEntries(
  Object.entries(productsCatalog).map(([key, category]) => [
    key,
    {
      ...category,
      products: category.products.map((product) => ({
        ...product,
        similarProducts: product.similarProductIds.map((id) => productsById.get(id)),
      })),
    },
  ]),
);
`;
fs.writeFileSync(file,newImports+'\n'+prefix+'// Yeni məhsulların priceType: "demo" qiymətləri AZN ilə nümunə qiymətləridir.\nconst productsCatalog = '+text+';\n'+bottom);
fs.writeFileSync('work/catalog-expansion/expected.json',JSON.stringify(catalog));
console.log(Object.fromEntries(Object.entries(catalog).map(([k,v])=>[k,v.products.length])));

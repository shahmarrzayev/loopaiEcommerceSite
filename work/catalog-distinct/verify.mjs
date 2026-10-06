import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const source=fs.readFileSync('src/localeDatas/datas.jsx','utf8');const imports=[...source.matchAll(/^import (\w+) from "([^"]+)";/gm)];
for(const [,name,p] of imports.filter(r=>/\.(webp|jpg|png)$/.test(r[2])))assert(fs.existsSync(path.resolve('src/localeDatas',p)),`${name}: ${p}`);
const body=source.slice(source.indexOf('const productsCatalog =')).replaceAll('export const','const');const catalog=new Function(...imports.map(r=>r[1]),body+';return allProductsData;')(...imports.map(r=>r[2]));
const all=Object.values(catalog).flatMap(c=>c.products);assert.equal(all.length,36);assert.equal(new Set(all.map(p=>p.id)).size,36);assert.equal(new Set(all.map(p=>p.slug)).size,36);assert.equal(new Set(all.map(p=>p.title.toLowerCase())).size,36);
for(const [key,c] of Object.entries(catalog)){assert.equal(c.products.length,12);for(const p of c.products){assert(!p.variantOf);assert.equal(p.similarProducts.length,5);assert.equal(new Set(p.similarProductIds).size,5);assert(!p.similarProductIds.includes(p.id));for(const s of p.similarProducts)assert(c.products.some(q=>q.id===s.id));}console.log(key,c.products.length,c.products.map(p=>p.title).join(' | '));}
JSON.stringify(catalog);console.log('36 unique models; 5 valid similar products each; all image imports exist.');

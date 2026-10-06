import fs from 'node:fs';
const dir='src/assets/images/banners';fs.mkdirSync(dir,{recursive:true});
const banners=[
 ['iphone','APPLE IPHONE 17','Hər anı','yaxala.','Yeni nəsil telefonlarla tanış ol.','iphone-17/1.webp','#ecf2ff','#254ce2','TELEFONLAR'],
 ['macbook','MACBOOK AIR','Yüngül dizayn.','Böyük imkanlar.','İş, yaradıcılıq və gündəlik həyat üçün.','macbook-air-15/1.webp','#eff4ef','#29664d','NOUTBUKLAR'],
 ['sony','SONY WH-1000XM5','Səsə','köklən.','Sevdiyin musiqiyə daha yaxın ol.','sony-wh1000xm5/1.webp','#f0eaf8','#7044ac','QULAQLIQLAR'],
 ['style','GÜNDƏLİK STİL','Öz stilini','tamamla.','Geyim və aksesuar kolleksiyasını kəşf et.','converse-chuck-70/2.webp','#fff0df','#a75220','GEYİM VƏ AKSESUARLAR'],
 ['dyson','DYSON V15 DETECT','Evinə təmizlik,','həyatına rahatlıq.','Gündəlik işləri asanlaşdıran texnika.','dyson-v15/1.webp','#e8f4f5','#166570','EV VƏ YAŞAM'],
 ['coffee','NESPRESSO PIXIE','Qəhvə vaxtıdır.','','Hər günə sevdiyin dadla başla.','nespresso-pixie/1.webp','#f7efe7','#775036','QƏHVƏ MAŞINLARI'],
 ['gaming','PLAYSTATION 5','Oyuna qoşul.','','Yeni macəralar səni gözləyir.','ps5-slim/1.webp','#edf0ff','#354eb6','OYUN DÜNYASI'],
];
for(const [i,b] of banners.entries()){
 const [slug,eyebrow,title,second,subtitle,img,bg,accent,tag]=b;const small=i>=5;const height=small?800:960;const bytes=fs.readFileSync(`src/assets/images/products/${img}`);const data='data:image/webp;base64,'+bytes.toString('base64');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="${height}" viewBox="0 0 1600 ${height}">
 <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="${bg}"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>
 <rect width="1600" height="${height}" fill="url(#bg)"/><circle cx="1480" cy="80" r="410" fill="${accent}" opacity=".06"/>
 <rect x="845" y="80" width="675" height="${height-160}" rx="72" fill="white"/>
 <image href="${data}" x="875" y="110" width="615" height="${height-220}" preserveAspectRatio="xMidYMid meet"/>
 <g font-family="Arial, Helvetica, sans-serif" fill="#17212c">
 <text x="80" y="${small?155:185}" font-size="30" letter-spacing="4" fill="${accent}" font-weight="700">${eyebrow}</text>
 <text x="76" y="${small?300:355}" font-size="${small?72:84}" font-weight="700" letter-spacing="-3">${title}</text>
 ${second?`<text x="76" y="455" font-size="84" font-weight="700" letter-spacing="-3">${second}</text>`:''}
 <text x="80" y="${small?385:545}" font-size="30" fill="#5d6672">${subtitle}</text>
 <rect x="80" y="${small?470:650}" width="330" height="82" rx="41" fill="${accent}"/>
 <text x="120" y="${small?522:702}" font-size="28" font-weight="700" fill="white">Kəşf et</text><path d="M338 ${small?496:676} l14 15 -14 15 M313 ${small?511:691} h38" fill="none" stroke="white" stroke-width="3"/>
 <text x="80" y="${height-75}" font-size="22" letter-spacing="3" fill="${accent}">${tag}</text>
 </g></svg>`;
 fs.writeFileSync(`${dir}/${slug}.svg`,svg);
}
let s=fs.readFileSync('src/localeDatas/datas.jsx','utf8');for(const [i,b] of banners.entries())s=s.replace(`../assets/images/mainBanner${i+1}.jpeg`,`../assets/images/banners/${b[0]}.svg`);fs.writeFileSync('src/localeDatas/datas.jsx',s);

from pathlib import Path
import re,json,hashlib
root=Path('src');files=[p for p in root.rglob('*') if p.suffix in ['.css','.scss']]
backup={str(p):p.read_text() for p in files};Path('work/colors/before.json').write_text(json.dumps(backup))
assets={str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in (root/'assets').rglob('*') if p.is_file()};Path('work/colors/assets-before.json').write_text(json.dumps(assets))
primary='var(--color-primary)';ink='var(--color-text)';muted='var(--color-muted)';line='var(--color-border)';soft='var(--color-soft)'
hexes={'#0048de':primary,'#003bbb':'var(--color-primary-hover)','#2563eb':primary,'#007bff':primary,'#0997da':primary,'#207299':primary,'#1f71a9':primary,'#1e7aa5':primary,'#0d47a1':ink,'#416ac7':primary,'#242635':ink,'#1a1a1a':ink,'#fbfafc':'var(--color-page)','#edf3ff':soft,'#f0f4ff':soft,'#e8f0fe':soft,'#d1dfff':line,'#b5cbfc':line,'#e8e8ea':line,'#d0d0d0':line,'#e0e0e0':line,'#e2e2e2':line,'#f0f2f7':'var(--color-page)','#f5f7fb':'var(--color-page)','#f7f8fa':'var(--color-page)','#f5f7fe':soft,'#fafbfd':soft,'#f97316':'var(--color-accent)','#7ab738':'var(--color-success)','#7ca104':'var(--color-success)','#28a745':'var(--color-success)','#2e7d32':'var(--color-success)','#738692':muted,'#444':ink,'#555':muted,'#666':muted,'#cee1ea':line}
rgbmap={(66,90,139):ink,(77,100,146):muted,(9,151,218):primary,(32,114,153):primary,(0,173,238):primary,(34,161,220):primary,(55,104,122):muted,(253,150,54):'var(--color-accent)',(140,158,197):muted,(14,34,77):ink,(14,87,231):primary,(10,10,10):ink,(0,73,147):ink,(106,132,142):muted,(124,161,4):'var(--color-success)',(78,116,51):'var(--color-success)',(240,243,248):'var(--color-footer)',(1,148,219):line}
changed=[]
for p in files:
 s=backup[str(p)]
 def hexreplace(m):return hexes.get(m[0].lower(),m[0])
 def rgbreplace(m):
  parts=[v.strip() for v in m[1].split(',')]
  try:rgb=tuple(int(v) for v in parts[:3]);alpha=float(parts[3]) if len(parts)>3 else 1
  except ValueError:return m[0]
  return rgbmap.get(rgb,m[0]) if alpha==1 else m[0]
 s=re.sub(r'#[0-9a-fA-F]{3,8}\b',hexreplace,s);s=re.sub(r'rgba?\(([^)]*)\)',rgbreplace,s)
 s=re.sub(r'(?<=color: )black\b',ink,s)
 if s!=backup[str(p)]:p.write_text(s);changed.append(str(p))
p=Path('src/index.css');s=p.read_text();tokens=''' :root {
  --color-primary: #087f82;
  --color-primary-hover: #066568;
  --color-text: #182e4b;
  --color-muted: #607189;
  --color-page: #f0f4f7;
  --color-border: #d4e0e7;
  --color-soft: #e7f3f2;
  --color-accent: #b76518;
  --color-success: #25805b;
  --color-footer: #e4ecf1;
}

''';p.write_text(tokens+s)
p=Path('src/components/Header/Header.module.scss');s=p.read_text().replace('rgba(0, 48, 130, 0.12)','rgba(24, 46, 75, 0.12)');p.write_text(s)
p=Path('src/components/PrCart/PrCart.module.scss');s=p.read_text().replace('rgba(0, 0, 0, 0.16)','rgba(24, 46, 75, 0.10)').replace('text-decoration-color: red','text-decoration-color: var(--color-accent)');p.write_text(s)
print('Updated styles:',len(changed))

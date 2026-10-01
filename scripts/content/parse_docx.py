import re, json
lines = open('docx.md').read().split('\n')
# service sections are "NN / TITLE" followed by "# Title", for NN in 03..38
starts = [i for i,l in enumerate(lines) if re.match(r'^(\d\d) / ', l) and 3 <= int(l[:2]) <= 38]
ends = starts[1:] + [next(i for i,l in enumerate(lines) if l.startswith('39 / '))]
out = []
for s, e in zip(starts, ends):
    block = lines[s:e]
    num = int(block[0][:2])
    name = block[1][2:].strip()
    tagline = block[2].strip()
    sec = None; d = {'A':[], 'B':[], 'C':[], 'D':[], 'SEO':[], 'CLOSE':[], 'ARCH':[]}
    for l in block[3:]:
        t = l.replace('   [ListBullet]', '').strip()
        if t == 'ARCHITECTURE': sec='ARCH'; continue
        m = re.match(r'^([ABCD]) / ', t)
        if m: sec = m.group(1); continue
        if t.startswith('LEGACY / SEO'): sec='SEO'; continue
        if t.startswith('RECOMMENDED PAGE CLOSE'): sec='CLOSE'; continue
        if sec: d[sec].append(t)
    arch = [r for r in d['ARCH'] if r.startswith('|') and 'PARENT FAMILY' not in r]
    fam, role, page_role = [c.strip() for c in arch[0].strip('|').split('|')] if arch else ('','','')
    out.append(dict(num=num, name=name, tagline=tagline, family=fam, role=role, pageRole=page_role,
        what=d['A'], whyNow=d['B'], whyUs=d['C'], sourceProof=d['D'],
        seoTerms=[x.strip() for x in ' '.join(d['SEO']).split(';') if x.strip()],
        close=' '.join(d['CLOSE'])))
json.dump(out, open('services_raw.json','w'), indent=1, ensure_ascii=False)
print(len(out), 'services')
from collections import Counter
print(Counter(x['family'] for x in out))
for x in out:
    print(f"{x['num']:>2} {x['name'][:42]:42} A{len(x['what'])} B{len(x['whyNow'])} C{len(x['whyUs'])} D{len(x['sourceProof'])} seo{len(x['seoTerms'])} close={'Y' if x['close'] else 'N'}  role={x['role']}")

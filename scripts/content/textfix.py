import re
KEEP = ["GTM","ABM","AI","CEO","OSINT","IAM","ICP","CRM","B2B","US","CXO","SDR","ROI","DOSF","LinkedIn","LeadStrategus","ExpoToFunnel","Sales","Marketing"]
KEEP_UP = {k.upper(): k for k in KEEP if k not in ("Sales","Marketing")}
def undash(s):
    s = re.sub(r'(\d)\s*[–—]\s*(\d)', r'\1 to \2', s)          # ranges
    s = re.sub(r'\s+[—–]\s+', ', ', s)                         # spaced, mid-sentence
    s = re.sub(r'[—–]', ', ', s)                                # any stragglers
    s = s.replace(',,', ',').replace(' ,', ',')
    return s
def sentence(caps):
    words = undash(caps).split(' ')
    out = []
    for i, w in enumerate(words):
        core = re.sub(r'[^A-Za-z0-9\-]', '', w)
        up = core.upper()
        # preserve acronyms, including hyphenated ones like DEMAND-GEN
        if up in KEEP_UP: out.append(w.replace(core, KEEP_UP[up])); continue
        if '-' in core and all(p.upper() in KEEP_UP for p in core.split('-') if p):
            out.append(w); continue
        lw = w.lower()
        out.append(lw[:1].upper() + lw[1:] if i == 0 else lw)
    s = ' '.join(out)
    # a fixed set of proper nouns that appear inside taglines
    for k in ["LinkedIn","LeadStrategus","ExpoToFunnel"]:
        s = re.sub(k, k, s, flags=re.I)
    return s

import json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from textfix import undash, sentence
import os
HERE = os.path.dirname(os.path.abspath(__file__))
d = json.load(open(os.environ.get('SERVICES_RAW', os.path.join(HERE, 'services_raw.json'))))

SLUG = {3:"gtm-setup",4:"repositioning",5:"market-intelligence",6:"research-and-forecasting",7:"scenario-planning",
 8:"founder-brand",9:"account-prospect-intelligence",10:"intent-account-intelligence",11:"osint-for-sales",
 12:"product-marketing-as-a-service",13:"pitch-deck",14:"sales-deck",15:"content-marketing",16:"sales-messaging",
 17:"account-based-marketing",18:"social-selling",19:"lead-generation-in-a-box",20:"digital-only-sales-funnel",
 21:"sales-marketing-consulting",22:"diagnostic-workshops",23:"inside-sales-setup",24:"field-sales-enablement",
 25:"coaching-and-training",26:"channel-strategy",27:"event-abm",28:"custom-events",29:"webinar-as-a-service",
 30:"quiz-as-a-service",31:"event-lead-generation",32:"ai-agent-build",33:"gtm-ai-twin",34:"ai-demand-gen-system",
 35:"event-discovery",36:"buyer-matching",37:"meeting-intelligence",38:"revenue-operations"}
GROUP = {"GTM Strategy & Market Intelligence":"gtm-strategy","Account & Buying Intelligence":"account-intelligence",
 "Positioning, Product Marketing & Revenue Content":"positioning-content","Demand Generation & ABM":"demand-generation",
 "Sales Enablement & Revenue Productivity":"enablement","Event & Community Demand Generation":"events",
 "LeadStrategus.ai":"leadstrategus-ai","ExpoToFunnel":"expotofunnel","Revenue Operations / GTM Operations":"revenue-operations"}
# old slugs from the previous build that should 301 to the closest new page
LEGACY = {"gtm-setup":["icp-definition","india-entry"],"repositioning":["pricing-and-packaging"],
 "market-intelligence":["competitive-intelligence"],"research-and-forecasting":["market-research"],
 "account-prospect-intelligence":["database-as-a-service"],"lead-generation-in-a-box":["outbound-sequencing"],
 "sales-marketing-consulting":["change-management"],"coaching-and-training":["sales-coaching","marketing-training","ai-in-gtm-training"]}
CHAIN = ["DECIDE","DISCOVER","PRIORITISE","POSITION","ENGAGE","MEET","CONVERT","LEARN / SCALE"]
def stages(role):
    r = role.replace("OPERATE", "LEARN / SCALE").replace("ALL", "DECIDE → LEARN / SCALE")
    if "→" in r:
        ends = [x.strip() for x in r.split("→")]
        idx = [CHAIN.index(e) for e in ends if e in CHAIN]
        return CHAIN[min(idx):max(idx)+1]
    toks = [t.strip() for t in r.replace("LEARN / SCALE", "LEARN#SCALE").split("/")]
    # "LEARN" or "SCALE" on its own is the last stage of the chain
    norm = {"LEARN#SCALE": "LEARN / SCALE", "LEARN": "LEARN / SCALE", "SCALE": "LEARN / SCALE"}
    out = []
    for t in toks:
        t = norm.get(t, t)
        if t and t not in out: out.append(t)
    return out

def strip_note(close):
    m = re.search(r'\s*Editorial note:.*$', close)
    return (close[:m.start()].strip(), m.group(0).replace('Editorial note:', '').strip()) if m else (close, None)

js = lambda v: json.dumps(v, ensure_ascii=False)
rows = []
for x in d:
    close, note = strip_note(x['close'])
    slug = SLUG[x['num']]
    rec = {
      "slug": slug, "num": x['num'], "name": undash(x['name']), "tagline": sentence(x['tagline']),
      "group": GROUP[x['family']], "role": undash(x['role']).replace(" , ", " → "), "stages": stages(x['role']),
      "what": undash(' '.join(x['what'])), "whyNow": undash(' '.join(x['whyNow'])),
      "whyUs": [undash(b) for b in x['whyUs']], "close": undash(close),
      "seoTerms": [undash(t) for t in x['seoTerms']], "sourceProof": [undash(p) for p in x['sourceProof']],
    }
    if note: rec["editorialNote"] = undash(note)
    if slug == "gtm-ai-twin": rec["href"] = "/gtm-ai-twin"
    if slug in LEGACY: rec["legacy"] = LEGACY[slug]
    rows.append(rec)

body = ",\n".join("  " + js(r) for r in rows)
ts = f'''/**
 * Every LeadStrategus service, transcribed from the master service portfolio
 * ("Full MECE Service Portfolio & Website Copy, 2026").
 *
 * This file is GENERATED from that document by
 * scripts/content/gen_services.py, so the page copy is the document's own
 * wording. The only edits are typographic: em and en dashes are replaced with
 * a comma (or "to" in a numeric range), and the all-caps taglines are set in
 * sentence case with acronyms preserved. Edit the document, then regenerate,
 * rather than hand-editing a service here.
 *
 *   what      A / What is the service?
 *   whyNow    B / Why is it important now?
 *   whyUs     C / Why LeadStrategus?
 *   close     the recommended page close
 *   stages    the service's span on the master value chain
 *   sourceProof, editorialNote
 *             carried from the document for the team, never rendered. The
 *             service pages show sample case studies until named proof is
 *             published (see work.ts).
 */
export type ServiceGroupSlug =
  | "gtm-strategy" | "account-intelligence" | "positioning-content" | "demand-generation"
  | "enablement" | "events" | "leadstrategus-ai" | "expotofunnel" | "revenue-operations";

export type Stage = "DECIDE" | "DISCOVER" | "PRIORITISE" | "POSITION" | "ENGAGE" | "MEET" | "CONVERT" | "LEARN / SCALE";

export const valueChain: Stage[] = {js(CHAIN)};

export type Service = {{
  slug: string;
  /** Position in the master portfolio document, which is also the canonical order. */
  num: number;
  name: string;
  tagline: string;
  group: ServiceGroupSlug;
  /** The document's own horizontal-role notation, e.g. "DISCOVER → LEARN / SCALE". */
  role: string;
  stages: Stage[];
  what: string;
  whyNow: string;
  whyUs: string[];
  close: string;
  seoTerms: string[];
  sourceProof: string[];
  editorialNote?: string;
  /** A service with its own page elsewhere on the site. */
  href?: string;
  /** Slugs from the previous build that 301 here. */
  legacy?: string[];
}};

export const services: Service[] = [
{body},
];

export const serviceHref = (s: Service) => s.href ?? `/services/${{s.slug}}`;
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const servicesFor = (group: ServiceGroupSlug) => services.filter((s) => s.group === group);
'''
open(os.path.join(HERE, '..', '..', 'src', 'content', 'services.ts'), 'w').write(ts)
print("wrote", len(rows), "services")
# safety: no dashes survive anywhere in rendered fields
bad = [(r['slug'], k) for r in rows for k, v in r.items() if k not in ('sourceProof','editorialNote') and re.search('[—–]', json.dumps(v, ensure_ascii=False))]
print("dashes remaining in rendered fields:", bad or "none")
print({r['slug']: r['stages'] for r in rows if r['group'] in ('leadstrategus-ai','expotofunnel','revenue-operations')})

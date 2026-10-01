// Crawls every route on a running server (default http://localhost:3000) and
// checks what search and answer engines read: one h1, a title and description
// of sane length, canonical, Open Graph and Twitter tags, an og:image that
// resolves, parseable JSON-LD with a breadcrumb on inner pages, alt text on
// every image, and no em or en dashes in visible text.
// Usage: node scripts/seo-audit.mjs [baseUrl]
const base = process.argv[2] ?? "http://localhost:3000";
const get = async (p) => { const r = await fetch(base + p, { redirect: "manual" }); return { status: r.status, text: await r.text(), type: r.headers.get("content-type") ?? "" }; };

const sm = (await get("/sitemap.xml")).text;
const fromSitemap = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const work = (await get("/work")).text;
const extra = [...new Set([...work.matchAll(/href="(\/work\/[^"#?]+)"/g)].map((m) => m[1]))];
const routes = [...new Set([...fromSitemap, ...extra, "/contact/thanks"])];

const meta = (h, attr, key) => (h.match(new RegExp(`<meta[^>]+${attr}="${key}"[^>]*content="([^"]*)"`)) ?? h.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]*${attr}="${key}"`)))?.[1];
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " ");
const problems = [];
const warnings = [];
const ogSeen = new Set();
for (const r of routes) {
  const { status, text: h } = await get(r);
  const bad = (m) => problems.push(`${r}: ${m}`);
  if (status !== 200) { bad(`status ${status}`); continue; }
  const title = h.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const desc = meta(h, "name", "description") ?? "";
  const robots = meta(h, "name", "robots") ?? "";
  const noindex = robots.includes("noindex");
  const h1s = (h.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) bad(`${h1s} h1 elements`);
  if (!title) bad("no title"); else if (title.length > 70) warnings.push(`${r}: title ${title.length} chars (search results will truncate)`);
  if (!desc) bad("no description"); else if (desc.length < 50 || desc.length > 165) bad(`description ${desc.length} chars`);
  if (!/<link rel="canonical"/.test(h)) bad("no canonical");
  for (const k of ["og:title", "og:description", "og:url", "og:image", "og:type", "og:site_name"]) if (!meta(h, "property", k)) bad(`no ${k}`);
  for (const k of ["twitter:card", "twitter:title"]) if (!meta(h, "name", k)) bad(`no ${k}`);
  const og = meta(h, "property", "og:image");
  if (og) ogSeen.add(new URL(og).pathname + new URL(og).search);
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let types = [];
  for (const b of blocks) { try { const j = JSON.parse(b); const flat = [j].flat().flatMap((x) => x["@graph"] ?? [x]); types.push(...flat.map((x) => [x["@type"]].flat().join("+"))); } catch { bad("JSON-LD does not parse"); } }
  if (r !== "/" && !noindex && !types.includes("BreadcrumbList")) bad("no BreadcrumbList");
  if (!noindex && r !== "/" && types.filter((t) => t !== "BreadcrumbList" && !t.includes("Organization") && t !== "WebSite" && t !== "Person").length === 0) bad("no page-level JSON-LD");
  for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/\balt="/.test(m[0])) bad(`img without alt: ${m[0].slice(0, 80)}`);
  const visible = strip(h);
  const dash = visible.match(/.{0,40}[–—].{0,40}/);
  if (dash) bad(`dash in text: …${dash[0].trim()}…`);
  if (/[–—]/.test(title + desc)) bad("dash in title or description");
}
for (const p of ogSeen) {
  const r = await fetch(base + p);
  if (r.status !== 200 || !(r.headers.get("content-type") ?? "").startsWith("image/")) problems.push(`og:image ${p}: ${r.status} ${r.headers.get("content-type")}`);
}
for (const p of ["/robots.txt", "/llms.txt", "/llms-full.txt", "/manifest.webmanifest", "/sitemap.xml"]) {
  const r = await get(p);
  if (r.status !== 200) problems.push(`${p}: ${r.status}`);
  if (/[–—]/.test(r.text)) problems.push(`${p}: contains a dash`);
}
if (warnings.length) console.log("warnings:\n" + warnings.join("\n"));
console.log(`${routes.length} routes, ${ogSeen.size} distinct og:images checked`);
if (problems.length) { console.log(problems.join("\n")); process.exit(1); }
console.log("SEO audit: clean");

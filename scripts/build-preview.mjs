// Bundles the built site into ONE self-contained HTML file (hash-routed) for previewing as an Artifact.
// Usage: BASE=http://localhost:3100 OUT=preview.html node scripts/build-preview.mjs
import { readFileSync, writeFileSync } from "node:fs";
const BASE = process.env.BASE ?? "http://localhost:3100";
const OUT = process.env.OUT ?? "preview.html";
const wait = async () => { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE); if (r.ok) return; } catch {} await new Promise((r) => setTimeout(r, 1000)); } throw new Error("server not up"); };
await wait();
const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
const routes = [...sm.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1].replace(/\/+$/, "") || "/");
routes.push("/contact/thanks");
// sample case studies are kept out of the sitemap, so find them from the index
const workIndex = await (await fetch(`${BASE}/work`)).text();
for (const m of workIndex.matchAll(/href="(\/work\/[^"#?]+)"/g)) if (!routes.includes(m[1])) routes.push(m[1]);
const pages = [];
let css = "";
for (const r of routes) {
  const html = await (await fetch(BASE + r)).text();
  if (!css) { const m = html.match(/<link[^>]+href="(\/_next\/static\/css\/[^"]+\.css)"/); if (m) css = await (await fetch(BASE + m[1])).text(); }
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? "";
  pages.push([r, body]);
}
const nf = await (await fetch(BASE + "/__preview_404__")).text();
pages.push(["/__404", nf.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? ""]);
// local images (the founders' photos) travel inside the file as data URIs
const images = new Map();
for (const [, b] of pages) for (const m of b.matchAll(/src="(\/(?:founders|brand)\/[^"]+\.(?:jpe?g|png|svg|webp))"/g)) images.set(m[1], null);
for (const src of images.keys()) {
  const r = await fetch(BASE + src);
  const type = r.headers.get("content-type") ?? "image/jpeg";
  images.set(src, `data:${type};base64,${Buffer.from(await r.arrayBuffer()).toString("base64")}`);
}
// each image is embedded once; pages point at it by index and the shim fills it in
const imageList = [...images.keys()];
const inline = (b) => b.replace(/src="(\/(?:founders|brand)\/[^"]+)"/g, (all, src) => (images.get(src) ? `data-pv-img="${imageList.indexOf(src)}"` : all));
const clean = (b) => inline(b).replace(/<script[\s\S]*?<\/script>/g, "").replace(/<script[^>]*\/>/g, "").replace(/<next-route-announcer[\s\S]*?<\/next-route-announcer>/g, "");
css = css.replace(/@font-face\s*\{[^}]*\}/g, "");
const shim = readFileSync(new URL("./preview-shim.js", import.meta.url), "utf8");
const out = `<title>LeadStrategus 2.0</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Instrument+Serif:ital@0;1&family=Cinzel:wght@700&family=Montserrat:wght@500&display=swap">
<style>
${css}
:root { --font-geist-sans: "Geist"; --font-geist-mono: "Geist Mono"; --font-serif: "Instrument Serif", Georgia, serif; }
@supports (font-variation-settings: normal) { :root { --font-display: "Bricolage Grotesque", system-ui, sans-serif; } }
html { color-scheme: light; }
body { background: #ffffff; color: #17120d; }
#app { min-height: 100vh; }
.preview-badge { position: fixed; right: 14px; bottom: 14px; z-index: 70; font: 500 11px/1 "Geist Mono", ui-monospace, monospace; letter-spacing: .08em; text-transform: uppercase; color: #6e645a; background: rgba(255,255,255,.94); border: 1px solid #e9e2d6; border-radius: 999px; padding: 8px 12px; box-shadow: 0 8px 24px -14px rgba(23,18,13,.45); }
.preview-badge b { color: #c10d18; font-weight: 600; }
</style>
<div id="app"></div>
<div class="preview-badge">Preview · <b>${pages.length - 1} pages</b> · forms simulated</div>
${pages.map(([r, b]) => `<template data-route="${r}">${clean(b)}</template>`).join("\n")}
<script>window.__PV_IMG = ${JSON.stringify(imageList.map((k) => images.get(k)))};</script>
<script>${shim}</script>
`;
writeFileSync(OUT, out);
console.log(`wrote ${OUT}: ${pages.length} pages, ${(out.length / 1024).toFixed(0)} KB`);

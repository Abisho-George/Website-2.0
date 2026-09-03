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
const clean = (b) => b.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<script[^>]*\/>/g, "").replace(/<next-route-announcer[\s\S]*?<\/next-route-announcer>/g, "");
css = css.replace(/@font-face\s*\{[^}]*\}/g, "");
const shim = readFileSync(new URL("./preview-shim.js", import.meta.url), "utf8");
const out = `<title>LeadStrategus 2.0</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&family=Bricolage+Grotesque:opsz,wght@12..96,400..800&display=swap">
<style>
${css}
:root { --font-geist-sans: "Geist"; --font-geist-mono: "Geist Mono"; }
@supports (font-variation-settings: normal) { :root { --font-display: "Bricolage Grotesque", system-ui, sans-serif; } }
html { color-scheme: light; }
body { background: #ffffff; color: #17120d; }
#app { min-height: 100vh; }
.preview-badge { position: fixed; right: 14px; bottom: 14px; z-index: 70; font: 500 11px/1 "Geist Mono", ui-monospace, monospace; letter-spacing: .08em; text-transform: uppercase; color: #6e645a; background: rgba(255,255,255,.94); border: 1px solid #e9e2d6; border-radius: 999px; padding: 8px 12px; box-shadow: 0 8px 24px -14px rgba(23,18,13,.45); }
.preview-badge b { color: #c2410c; font-weight: 600; }
</style>
<div class="spine" aria-hidden><div class="spine__fill" data-spine-fill style="height:0%"></div></div>
<div id="app"></div>
<div class="preview-badge">Preview · <b>${pages.length - 1} pages</b> · forms simulated</div>
${pages.map(([r, b]) => `<template data-route="${r}">${clean(b)}</template>`).join("\n")}
<script>${shim}</script>
`;
writeFileSync(OUT, out);
console.log(`wrote ${OUT}: ${pages.length} pages, ${(out.length / 1024).toFixed(0)} KB`);

// Full-page screenshots of key routes at desktop + mobile. Usage: BASE=http://localhost:3100 OUT=./shots node scripts/screenshots.mjs
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const BASE = process.env.BASE ?? "http://localhost:3100";
const OUT = process.env.OUT ?? "shots";
mkdirSync(OUT, { recursive: true });
const routes = ["/", "/gtm-ai-twin", "/services", "/services/webinar-as-a-service", "/services/osint-for-sales", "/practices", "/practices/demand-generation", "/work", "/work/devtools-outbound-engine", "/insights", "/insights/what-an-ai-sdr-does-all-day", "/faq", "/pricing", "/resources", "/about", "/contact", "/book", "/authors/kingshuk-hazra", "/careers", "/does-not-exist"];
const wait = async () => { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE); if (r.ok || r.status === 404) return; } catch {} await new Promise((r) => setTimeout(r, 1000)); } throw new Error("server not up"); };
await wait();
const browser = await pw.chromium.launch();
const errors = [];
for (const [name, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, reducedMotion: "no-preference" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${name} pageerror: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error") errors.push(`${name} console: ${m.text()}`); });
  for (const r of routes) {
    const res = await page.goto(BASE + r, { waitUntil: "networkidle" });
    // trigger reveals
    await page.evaluate(async () => { const h = document.body.scrollHeight; for (let y = 0; y < h; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); } window.scrollTo(0, 0); document.querySelectorAll(".reveal").forEach((e) => e.classList.add("in")); await new Promise((r) => setTimeout(r, 1200)); });
    const file = `${OUT}/${name}${r === "/" ? "_home" : r.replace(/\//g, "_")}.png`;
    await page.screenshot({ path: file, fullPage: true });
    const sw = await page.evaluate(() => document.documentElement.scrollWidth); 
    console.log(`${res?.status()} ${name} ${r} scrollWidth=${sw}${sw > vp.width ? "  <-- HORIZONTAL OVERFLOW" : ""}`);
  }
  await ctx.close();
}
await browser.close();
if (errors.length) { console.log("\nERRORS:"); errors.forEach((e) => console.log(" -", e)); } else console.log("\nno console/page errors");

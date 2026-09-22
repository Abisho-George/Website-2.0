// Full-page screenshots of key routes at desktop + mobile, plus a reduced-motion
// audit. Usage: BASE=http://localhost:3100 OUT=./shots node scripts/screenshots.mjs
// Exits non-zero on horizontal overflow, console/page errors, or any animation
// still running under prefers-reduced-motion.
import { mkdirSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let pw; try { pw = require("playwright"); } catch { pw = require("/opt/node22/lib/node_modules/playwright"); }
const BASE = process.env.BASE ?? "http://localhost:3100";
const OUT = process.env.OUT ?? "shots";
mkdirSync(OUT, { recursive: true });
const routes = ["/", "/gtm-ai-twin", "/services", "/services/webinar-as-a-service", "/services/osint-for-sales", "/practices", "/practices/demand-generation", "/work", "/work/devtools-outbound-engine", "/insights", "/insights/what-an-ai-sdr-does-all-day", "/faq", "/pricing", "/resources", "/about", "/contact", "/book", "/authors/kingshuk-hazra", "/careers", "/contact/thanks", "/does-not-exist"];

const wait = async () => { for (let i = 0; i < 60; i++) { try { const r = await fetch(BASE); if (r.ok || r.status === 404) return; } catch {} await new Promise((r) => setTimeout(r, 1000)); } throw new Error("server not up"); };
await wait();

// Scroll the whole page to fire every reveal / whileInView, then force any that
// are still hidden and let entrances settle. Both the class contract and the
// data-attribute contract are handled so this cannot silently become a no-op.
const settle = async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
  window.scrollTo(0, 0);
  const legacy = document.querySelectorAll(".reveal");
  legacy.forEach((e) => e.classList.add("in"));
  const flagged = document.querySelectorAll("[data-reveal]");
  flagged.forEach((e) => { e.style.opacity = "1"; e.style.transform = "none"; });
  await new Promise((r) => setTimeout(r, 1600)); // 900ms entrance ceiling + spring settle
  // An unstyled page measures as one enormous overflow and every layout claim
  // made about it is noise. Prove the stylesheet arrived before believing a number.
  const styled = getComputedStyle(document.documentElement).getPropertyValue("--color-ember").trim() !== "";
  return { legacy: legacy.length, flagged: flagged.length, styled };
};

const browser = await pw.chromium.launch();
const errors = [];
const overflows = [];
let revealsSeen = 0;
let current = "";
// /does-not-exist is deliberately a 404; its own document response is not a defect.
const realError = (t) => !(current === "/does-not-exist" && /404 \(Not Found\)/.test(t));

for (const [name, vp] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, reducedMotion: "no-preference" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`${name} pageerror: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" && realError(m.text())) errors.push(`${name} console: ${m.text()}`); });
  for (const r of routes) {
    current = r;
    const res = await page.goto(BASE + r, { waitUntil: "networkidle" });
    const seen = await page.evaluate(settle);
    revealsSeen += seen.legacy + seen.flagged;
    if (!seen.styled) { errors.push(`${name} ${r}: stylesheet did not load — measurements below are meaningless`); continue; }
    const file = `${OUT}/${name}${r === "/" ? "_home" : r.replace(/\//g, "_")}.png`;
    await page.screenshot({ path: file, fullPage: true });
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    const over = sw > vp.width;
    if (over) overflows.push(`${name} ${r} scrollWidth=${sw} > ${vp.width}`);
    console.log(`${res?.status()} ${name} ${r} scrollWidth=${sw}${over ? "  <-- HORIZONTAL OVERFLOW" : ""}`);
  }
  await ctx.close();
}

// Reduced motion: nothing may still be animating once the page has settled.
const stuck = [];
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => errors.push(`reduced pageerror: ${e.message}`));
  page.on("console", (m) => { if (m.type() === "error" && realError(m.text())) errors.push(`reduced console: ${m.text()}`); });
  for (const r of routes) {
    current = r;
    await page.goto(BASE + r, { waitUntil: "networkidle" });
    const seen = await page.evaluate(settle);
    if (!seen.styled) { errors.push(`reduced ${r}: stylesheet did not load`); continue; }
    const running = await page.evaluate(() =>
      document.getAnimations().map((a) => {
        const t = a.effect?.target;
        const sel = t ? `${t.tagName.toLowerCase()}${t.className && typeof t.className === "string" ? "." + t.className.trim().split(/\s+/).slice(0, 3).join(".") : ""}` : "?";
        return `${a.constructor.name}<${a.animationName ?? a.transitionProperty ?? "?"}> on ${sel}`;
      }),
    );
    if (running.length) stuck.push(`${r}: ${running.length} animating — ${running.slice(0, 4).join("; ")}`);
    console.log(`reduced ${r} animations=${running.length}`);
  }
  await ctx.close();
}

await browser.close();

console.log(`\nreveal targets found across the sweep: ${revealsSeen}`);
if (!revealsSeen) errors.push("no .reveal or [data-reveal] elements found anywhere — the reveal selector has drifted and this harness was failing open");
if (stuck.length) { console.log("\nANIMATING UNDER prefers-reduced-motion:"); stuck.forEach((s) => console.log(" -", s)); }
if (overflows.length) { console.log("\nHORIZONTAL OVERFLOW:"); overflows.forEach((o) => console.log(" -", o)); }
if (errors.length) { console.log("\nERRORS:"); errors.forEach((e) => console.log(" -", e)); }
if (!stuck.length && !overflows.length && !errors.length) console.log("\nclean: no overflow, no console/page errors, nothing animating under reduced motion");

process.exit(overflows.length || errors.length || stuck.length ? 1 : 0);

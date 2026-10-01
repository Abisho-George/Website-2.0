// Every service page must have at least two case studies to show.
// Usage: node scripts/content/check-cases.mjs   (exits non-zero on a gap)
import { readFileSync } from "node:fs";
const services = [...readFileSync("src/content/services.ts", "utf8").matchAll(/"slug": "([a-z0-9-]+)"/g)].map((m) => m[1]);
const work = readFileSync("src/content/work.ts", "utf8");
const lists = [...work.matchAll(/services: \[([^\]]*)\]/g)].map((m) => [...m[1].matchAll(/"([a-z0-9-]+)"/g)].map((x) => x[1]));
const count = Object.fromEntries(services.map((s) => [s, 0]));
const unknown = new Set();
for (const l of lists) for (const s of l) (s in count ? count[s]++ : unknown.add(s));
const thin = Object.entries(count).filter(([, n]) => n < 2);
console.log(`${services.length} services, ${lists.length} case studies`);
if (unknown.size) console.log("case studies reference unknown services:", [...unknown]);
if (thin.length) console.log("services with fewer than two cases:", thin);
process.exit(thin.length || unknown.size ? 1 : 0);

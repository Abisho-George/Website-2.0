// Exercises the lead delivery rules in src/lib/leads.ts with a fake network:
// when a visitor is told "thanks" and when they see the fallback. Nothing is
// sent anywhere.
// Usage: node scripts/check-leads.mjs
import { deliverLead } from "../src/lib/leads.ts";

const lead = {
  name: "Asha Rao",
  email: "asha@example.com",
  company: "Acme",
  type: "gtm-ai-twin",
  typeLabel: "GTM AI Twin",
  message: "We sell to CFOs and nothing converts.",
  source: "/contact",
};
const base = { webhookUrl: "https://script.example/exec?token=test", production: true };

// a fake fetch answering with a status and body, or throwing like a network failure
const net = (status, body) => {
  const calls = [];
  const f = async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body), headers: init.headers });
    if (status === "down") throw new Error("connect ECONNREFUSED");
    return new Response(body, { status });
  };
  f.calls = calls;
  return f;
};

let failures = 0;
const check = (name, cond, detail = "") => {
  console.log(`${cond ? "ok  " : "FAIL"} ${name}${!cond && detail ? `: ${detail}` : ""}`);
  if (!cond) failures++;
};

const cases = [
  ["row and email done (ok:true): thanks", base, net(200, '{"ok":true}'), true],
  ["script says ok:false (row or email failed): fallback", base, net(200, '{"ok":false,"error":"email failed"}'), false],
  ["Apps Script error page (200, HTML): fallback", base, net(200, "<html>Script function not found</html>"), false],
  ["200 with no ok field: fallback", base, net(200, "{}"), false],
  ["webhook 500: fallback", base, net(500, "oops"), false],
  ["webhook unreachable: fallback", base, net("down"), false],
  ["no webhook, production: fallback", { ...base, webhookUrl: undefined }, net(200, '{"ok":true}'), false],
  ["no webhook, development: thanks (logged)", { ...base, webhookUrl: undefined, production: false }, net(200, '{"ok":true}'), true],
];
for (const [name, settings, f, expected] of cases) {
  const r = await deliverLead(lead, settings, f);
  check(name, r.delivered === expected, JSON.stringify(r));
}

// what the script receives
const f = net(200, '{"ok":true}');
await deliverLead(lead, base, f, new Date("2026-10-07T10:00:00Z"));
const sent = f.calls[0];
check("posts to the configured URL, token included", sent.url === base.webhookUrl);
check("sends JSON", sent.headers["content-type"] === "application/json");
check("payload has every field and a timestamp", ["receivedAt", "name", "email", "company", "type", "typeLabel", "message", "source"].every((k) => k in sent.body) && sent.body.receivedAt === "2026-10-07T10:00:00.000Z");
const offline = net(200, '{"ok":true}');
await deliverLead(lead, { ...base, webhookUrl: undefined, production: false }, offline);
check("nothing is sent when no webhook is configured", offline.calls.length === 0);

console.log(failures ? `\n${failures} check(s) failed` : "\nall lead delivery checks passed");
process.exit(failures ? 1 : 0);

// Exercises the lead delivery rules in src/lib/leads.ts with a fake network:
// when a visitor is told "thanks", when they see the fallback, and what the
// email contains. Nothing is sent anywhere.
// Usage: node scripts/check-leads.mjs
import { deliverLead, leadEmail } from "../src/lib/leads.ts";

const lead = {
  name: "Asha <script>",
  email: "asha@example.com",
  company: "Acme\r\nBcc: evil@example.com",
  type: "gtm-ai-twin",
  typeLabel: "GTM AI Twin",
  message: "We sell to <b>CFOs</b> & nothing converts.",
  source: "/contact",
};
const base = { resendKey: "re_test", from: "LeadStrategus Website <leads@leadstrategus.com>", to: "kingshuk@leadstrategus.com", webhookUrl: "https://script.example/exec?token=test", production: true };

// fake fetch: per host, a status (body chosen to match) or "down", "okfalse", "html"
const net = (answers) => {
  const calls = [];
  const f = async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body), headers: init.headers });
    const a = answers[new URL(url).host];
    if (a === "down") throw new Error("connect ECONNREFUSED");
    if (a === "okfalse") return new Response('{"ok":false,"error":"sheet error"}', { status: 200 });
    if (a === "html") return new Response("<html>Script error</html>", { status: 200 });
    return new Response(a === 200 ? '{"ok":true,"id":"x"}' : "nope", { status: a });
  };
  f.calls = calls;
  return f;
};

let failures = 0;
const check = (name, cond, detail = "") => {
  console.log(`${cond ? "ok  " : "FAIL"} ${name}${!cond && detail ? `: ${detail}` : ""}`);
  if (!cond) failures++;
};

const R = "api.resend.com", G = "script.example";
const cases = [
  ["email ok, sheet ok: thanks", base, { [R]: 200, [G]: 200 }, true, true],
  ["email ok, sheet ok:false: thanks, sheet failure reported", base, { [R]: 200, [G]: "okfalse" }, true, false],
  ["email ok, sheet error page: thanks", base, { [R]: 200, [G]: "html" }, true, false],
  ["email ok, sheet unreachable: thanks", base, { [R]: 200, [G]: "down" }, true, false],
  ["email ok, no sheet configured: thanks", { ...base, webhookUrl: undefined }, { [R]: 200 }, true, false],
  ["email rejected, sheet ok: fallback", base, { [R]: 403, [G]: 200 }, false, true],
  ["email unreachable: fallback", base, { [R]: "down", [G]: 200 }, false, true],
  ["key set, no sender: fallback", { ...base, from: undefined }, { [G]: 200 }, false, true],
  ["sender set, no key: fallback", { ...base, resendKey: undefined }, { [G]: 200 }, false, true],
  ["no email configured, production: fallback", { ...base, resendKey: undefined, from: undefined }, { [G]: 200 }, false, true],
  ["no email configured, development: thanks (logged)", { ...base, resendKey: undefined, from: undefined, production: false }, { [G]: 200 }, true, true],
];
for (const [name, settings, answers, delivered, sheetOk] of cases) {
  const r = await deliverLead(lead, settings, net(answers));
  check(name, r.delivered === delivered && r.sheet.ok === sheetOk, JSON.stringify(r));
}

const f = net({ [R]: 200, [G]: 200 });
await deliverLead(lead, base, f, new Date("2026-10-08T10:00:00Z"));
const mail = f.calls.find((c) => c.url.includes("resend")).body;
const sheet = f.calls.find((c) => c.url.includes("script")).body;
check("email goes to the company inbox", JSON.stringify(mail.to) === JSON.stringify(["kingshuk@leadstrategus.com"]));
check("reply-to is the visitor", mail.reply_to === "asha@example.com");
check("sender is the configured address", mail.from === base.from);
check("API key sent as a bearer token", f.calls.find((c) => c.url.includes("resend")).headers.authorization === "Bearer re_test");
check("subject is one line and names the visitor", !/[\r\n]/.test(mail.subject) && mail.subject.startsWith("New website enquiry: Asha"), mail.subject);
check("HTML is escaped", !mail.html.includes("<script>") && mail.html.includes("&lt;b&gt;CFOs"));
check("sheet copy has every field and a timestamp", ["receivedAt", "name", "email", "company", "type", "typeLabel", "message", "source"].every((k) => k in sheet) && sheet.receivedAt === "2026-10-08T10:00:00.000Z");
check("subject is capped", leadEmail({ ...lead, company: "x".repeat(400) }, "t").subject.length <= 200);

console.log(failures ? `\n${failures} check(s) failed` : "\nall lead delivery checks passed");
process.exit(failures ? 1 : 0);

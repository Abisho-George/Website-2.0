// Exercises the lead delivery rules in src/lib/leads.ts with a fake network:
// when a visitor is told "thanks", when they see the fallback, and what the
// email contains. No real email is sent.
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
const base = { resendKey: "re_test", from: "LeadStrategus Website <leads@leadstrategus.com>", to: "kingshuk@leadstrategus.com", webhookUrl: "https://hook.example/sheet", production: true };

// a fake fetch: each host answers with a status, or throws to simulate a network failure
const net = (answers) => {
  const calls = [];
  const f = async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body), headers: init.headers });
    const a = answers[new URL(url).host];
    if (a === "down") throw new Error("connect ECONNREFUSED");
    if (a === "refused") return new Response('{"ok":false,"error":"bad token"}', { status: 200 });
    return new Response(a === 200 ? '{"ok":true}' : "nope", { status: a });
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
  ["email ok, sheet ok: thanks", base, { "api.resend.com": 200, "hook.example": 200 }, true],
  ["email ok, sheet fails: thanks (lead is in the inbox)", base, { "api.resend.com": 200, "hook.example": 500 }, true],
  ["email ok, sheet unreachable: thanks", base, { "api.resend.com": 200, "hook.example": "down" }, true],
  ["email rejected, sheet ok: error shown", base, { "api.resend.com": 403, "hook.example": 200 }, false],
  ["email unreachable: error shown", base, { "api.resend.com": "down", "hook.example": 200 }, false],
  ["key set but no sender: error shown", { ...base, from: undefined }, { "hook.example": 200 }, false],
  ["no email configured, sheet ok: thanks", { ...base, resendKey: undefined }, { "hook.example": 200 }, true],
  ["no email configured, sheet fails: error shown", { ...base, resendKey: undefined }, { "hook.example": 502 }, false],
  ["no email configured, sheet script says ok:false (200): error shown", { ...base, resendKey: undefined }, { "hook.example": "refused" }, false],
  ["nothing configured, production: error shown", { ...base, resendKey: undefined, webhookUrl: undefined }, {}, false],
  ["nothing configured, development: thanks (logged)", { ...base, resendKey: undefined, webhookUrl: undefined, production: false }, {}, true],
];
for (const [name, settings, answers, expected] of cases) {
  const r = await deliverLead(lead, settings, net(answers));
  check(name, r.delivered === expected, JSON.stringify(r));
}

// what Resend is asked to send
const f = net({ "api.resend.com": 200, "hook.example": 200 });
await deliverLead(lead, base, f, new Date("2026-10-06T10:00:00Z"));
const mail = f.calls.find((c) => c.url.includes("resend")).body;
const hook = f.calls.find((c) => c.url.includes("hook")).body;
check("email goes to the company inbox", JSON.stringify(mail.to) === JSON.stringify(["kingshuk@leadstrategus.com"]));
check("reply-to is the visitor", mail.reply_to === "asha@example.com");
check("sender is the configured address", mail.from === base.from);
check("API key sent as a bearer token", f.calls[0].headers.authorization === "Bearer re_test");
check("subject is one line (no header injection)", !/[\r\n]/.test(mail.subject), mail.subject);
check("subject names the enquiry and company", mail.subject.startsWith("New enquiry: GTM AI Twin · Acme"), mail.subject);
check("HTML is escaped", !mail.html.includes("<script>") && !mail.html.includes("<b>CFOs") && mail.html.includes("&lt;b&gt;CFOs"));
check("plain-text part carries the message", mail.text.includes("We sell to <b>CFOs</b> & nothing converts."));
check("sheet copy has every field and a timestamp", ["receivedAt", "name", "email", "company", "type", "typeLabel", "message", "source"].every((k) => k in hook) && hook.receivedAt === "2026-10-06T10:00:00.000Z");

const { subject } = leadEmail({ ...lead, company: "x".repeat(400) }, "t");
check("subject is capped", subject.length <= 200);

console.log(failures ? `\n${failures} check(s) failed` : "\nall lead delivery checks passed");
process.exit(failures ? 1 : 0);

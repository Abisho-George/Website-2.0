/**
 * Lead delivery: every enquiry is emailed to the company inbox through Resend
 * (visitor as reply-to), and copied to a Google Sheet through an Apps Script
 * webhook as a backup.
 *
 * The email is the delivery that counts. The visitor is told "thanks" only
 * when Resend accepts the email. A failure of the sheet copy alone does not
 * fail the enquiry, because the lead has already reached the inbox; it is
 * reported so the caller can log it.
 *
 * Settings come in as arguments and nothing here throws, so a missing setting
 * can never break a page, and the rules can be exercised with a fake fetch
 * (scripts/check-leads.mjs).
 */

export type Lead = {
  name: string;
  email: string;
  company: string;
  type: string;
  typeLabel: string;
  message: string;
  /** The page the form was sent from, e.g. /contact or /book. */
  source?: string;
};

export type LeadSettings = {
  /** Resend API key. */
  resendKey?: string;
  /** Verified sender, e.g. "LeadStrategus Website <leads@leadstrategus.com>". */
  from?: string;
  /** Where leads are emailed. */
  to: string;
  /** Backup copy: the Apps Script web app URL, with ?token=... */
  webhookUrl?: string;
  /** In production, an enquiry that cannot be emailed is an error, not a log line. */
  production: boolean;
  resendUrl?: string;
};

export type ChannelResult = { ok: boolean; skipped?: boolean; error?: string };
export type DeliveryResult = { delivered: boolean; email: ChannelResult; sheet: ChannelResult };

type Fetch = typeof fetch;

const EMAIL_TIMEOUT_MS = 10_000;
/** Apps Script can be slow to wake. */
const SHEET_TIMEOUT_MS = 15_000;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** One line of text, so a header like the subject cannot be split by a crafted name. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export function leadEmail(lead: Lead, receivedAt: string) {
  const subject = oneLine(`New website enquiry: ${lead.name} (${lead.company})`).slice(0, 200);
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["About", lead.typeLabel],
    ["Sent from", lead.source || "website"],
    ["Received", receivedAt],
  ];
  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Message:", lead.message, "", "Reply to this email to answer them directly."].join("\n");
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#17120d">
<p style="margin:0 0 16px;font-size:18px;font-weight:bold">New enquiry from the website</p>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 16px">
${rows.map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#6e645a;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0">${k === "Email" ? `<a href="mailto:${escapeHtml(v)}">${escapeHtml(v)}</a>` : escapeHtml(v)}</td></tr>`).join("\n")}
</table>
<p style="margin:0 0 6px;color:#6e645a">Message</p>
<p style="margin:0 0 20px;white-space:pre-wrap">${escapeHtml(lead.message)}</p>
<p style="margin:0;color:#6e645a;font-size:13px">Reply to this email to answer them directly.</p>
</div>`;
  return { subject, text, html };
}

async function sendEmail(lead: Lead, receivedAt: string, s: LeadSettings, f: Fetch): Promise<ChannelResult> {
  if (!s.resendKey && !s.from) return { ok: false, skipped: true };
  if (!s.resendKey) return { ok: false, error: "RESEND_API_KEY is not set" };
  if (!s.from) return { ok: false, error: "LEADS_FROM is not set" };
  const { subject, text, html } = leadEmail(lead, receivedAt);
  try {
    const res = await f(s.resendUrl ?? "https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${s.resendKey}`, "content-type": "application/json" },
      // reply_to is the visitor, so answering the email answers the lead
      body: JSON.stringify({ from: s.from, to: [s.to], reply_to: lead.email, subject, text, html }),
      signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
    });
    if (!res.ok) return { ok: false, error: `Resend ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: `Resend unreachable: ${(e as Error).message}` };
  }
}

async function copyToSheet(lead: Lead, receivedAt: string, s: LeadSettings, f: Fetch): Promise<ChannelResult> {
  if (!s.webhookUrl) return { ok: false, skipped: true };
  try {
    const res = await f(s.webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ receivedAt, ...lead }),
      signal: AbortSignal.timeout(SHEET_TIMEOUT_MS),
    });
    const body = await res.text().catch(() => "");
    if (!res.ok) return { ok: false, error: `Sheet webhook ${res.status}: ${body.slice(0, 200)}` };
    // Apps Script answers 200 even when the script fails; it reports its own
    // result as {"ok": true|false}
    let reply: { ok?: unknown } | null = null;
    try {
      reply = JSON.parse(body);
    } catch {
      /* not JSON: an Apps Script error page or the wrong URL */
    }
    if (reply?.ok === true) return { ok: true };
    return { ok: false, error: `Sheet webhook did not confirm: ${body.slice(0, 200)}` };
  } catch (e) {
    return { ok: false, error: `Sheet webhook unreachable: ${(e as Error).message}` };
  }
}

export async function deliverLead(lead: Lead, s: LeadSettings, f: Fetch = fetch, now = new Date()): Promise<DeliveryResult> {
  const receivedAt = now.toISOString();
  const [email, sheet] = await Promise.all([sendEmail(lead, receivedAt, s, f), copyToSheet(lead, receivedAt, s, f)]);
  // email decides; with no email configured at all, only development lets it through
  const delivered = email.skipped ? !s.production : email.ok;
  return { delivered, email, sheet };
}

/**
 * Lead delivery: every enquiry is emailed to the company inbox through Resend,
 * and copied to a webhook (a Google Sheet, via Apps Script) as a backup.
 *
 * The email is the delivery that counts. A visitor is only told "thanks" when
 * the enquiry has reached the inbox, or, if email is not configured, when the
 * webhook has stored it. The backup copy failing on its own does not fail the
 * enquiry, because the lead has already arrived; it is logged instead.
 *
 * Kept free of framework imports and given its settings as arguments, so the
 * rules above can be exercised with a fake fetch (scripts/check-leads.mjs).
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
  /** Resend API key. Unset means email is not configured. */
  resendKey?: string;
  /** Verified sender, e.g. "LeadStrategus Website <leads@leadstrategus.com>". */
  from?: string;
  /** Where leads are emailed. */
  to: string;
  /** Backup copy: JSON is POSTed here. */
  webhookUrl?: string;
  /** In production, an enquiry with nowhere to go is an error, not a log line. */
  production: boolean;
  resendUrl?: string;
};

export type ChannelResult = { ok: boolean; skipped?: boolean; error?: string };
export type DeliveryResult = { delivered: boolean; email: ChannelResult; webhook: ChannelResult };

type Fetch = typeof fetch;

const TIMEOUT_MS = 10_000;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** One line of text, so a header like the subject cannot be split by a crafted name. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export function leadEmail(lead: Lead, receivedAt: string) {
  const subject = oneLine(`New enquiry: ${lead.typeLabel} · ${lead.company} (${lead.name})`).slice(0, 200);
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["About", lead.typeLabel],
    ["Sent from", lead.source || "website"],
    ["Received", receivedAt],
  ];
  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    lead.message,
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");
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
  if (!s.resendKey) return { ok: false, skipped: true };
  if (!s.from) return { ok: false, error: "LEADS_FROM is not set" };
  const { subject, text, html } = leadEmail(lead, receivedAt);
  try {
    const res = await f(s.resendUrl ?? "https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${s.resendKey}`, "content-type": "application/json" },
      // reply_to is the visitor, so answering the email answers the lead
      body: JSON.stringify({ from: s.from, to: [s.to], reply_to: lead.email, subject, text, html }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return { ok: false, error: `Resend ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: `Resend unreachable: ${(e as Error).message}` };
  }
}

async function sendWebhook(lead: Lead, receivedAt: string, s: LeadSettings, f: Fetch): Promise<ChannelResult> {
  if (!s.webhookUrl) return { ok: false, skipped: true };
  try {
    const res = await f(s.webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ receivedAt, ...lead }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return { ok: false, error: `Webhook ${res.status}` };
    // Google Apps Script answers 200 even when the script fails, so the sheet
    // script reports its own result in the body; any JSON {"ok": false} counts
    const body = await res.text().catch(() => "");
    try {
      if ((JSON.parse(body) as { ok?: unknown }).ok === false) return { ok: false, error: `Webhook refused: ${body.slice(0, 200)}` };
    } catch {
      /* not JSON: a 2xx is success */
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: `Webhook unreachable: ${(e as Error).message}` };
  }
}

export async function deliverLead(lead: Lead, s: LeadSettings, f: Fetch = fetch, now = new Date()): Promise<DeliveryResult> {
  const receivedAt = now.toISOString();
  const [email, webhook] = await Promise.all([sendEmail(lead, receivedAt, s, f), sendWebhook(lead, receivedAt, s, f)]);

  let delivered: boolean;
  if (!email.skipped) delivered = email.ok; // email is configured: it decides
  else if (!webhook.skipped) delivered = webhook.ok; // no email: the webhook is the only copy
  else delivered = !s.production; // nothing configured: fine while developing, a failure in production

  return { delivered, email, webhook };
}

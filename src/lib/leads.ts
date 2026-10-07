/**
 * Lead delivery: every enquiry is POSTed as JSON to one webhook, the Google
 * Apps Script in scripts/google-sheet-leads.gs, which adds a row to the leads
 * sheet and emails the lead to the company inbox.
 *
 * The script answers {"ok": true} only when both the row and the email have
 * succeeded. Apps Script replies 200 even when a script fails, so the status
 * code alone proves nothing: anything other than a 2xx carrying ok:true counts
 * as not delivered, and the visitor is shown the fallback instead of a false
 * "thanks".
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
  /** The Apps Script web app URL, with ?token=... */
  webhookUrl?: string;
  /** In production, an enquiry with nowhere to go is an error, not a log line. */
  production: boolean;
};

export type DeliveryResult = { delivered: boolean; skipped?: boolean; error?: string };

type Fetch = typeof fetch;

/** Apps Script can be slow to wake: the row and the email both happen inside this. */
const TIMEOUT_MS = 20_000;

export async function deliverLead(lead: Lead, s: LeadSettings, f: Fetch = fetch, now = new Date()): Promise<DeliveryResult> {
  if (!s.webhookUrl) {
    // nothing configured: fine while developing, a failure in production
    return s.production ? { delivered: false, error: "CONTACT_WEBHOOK_URL is not set" } : { delivered: true, skipped: true };
  }
  try {
    const res = await f(s.webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ receivedAt: now.toISOString(), ...lead }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const body = await res.text().catch(() => "");
    if (!res.ok) return { delivered: false, error: `Webhook ${res.status}: ${body.slice(0, 200)}` };
    let reply: { ok?: unknown; error?: unknown } | null = null;
    try {
      reply = JSON.parse(body);
    } catch {
      /* not JSON: an Apps Script error page, a login page, or the wrong URL */
    }
    if (reply?.ok === true) return { delivered: true };
    return { delivered: false, error: `Webhook did not confirm delivery: ${body.slice(0, 200)}` };
  } catch (e) {
    return { delivered: false, error: `Webhook unreachable: ${(e as Error).message}` };
  }
}

# Incoming leads

Every enquiry from the Contact and Book a call forms is:

1. **Emailed to kingshuk@leadstrategus.com** through [Resend](https://resend.com).
   The email's reply-to is the visitor, so replying answers them directly.
2. **Copied to a Google Sheet** as a backup, through a small Apps Script web app.

The visitor only sees the thank-you page once the email has been accepted by
Resend. If it is not, they see an error with kingshuk@leadstrategus.com as a
fallback (and a link that opens their mail app with their message already in
it), and their text stays in the form. A failure of the sheet copy alone does
not fail the enquiry; it is logged on the server. If a lead reaches nowhere,
its full contents are written to the server log under `[enquiry] NOT DELIVERED`
so it can still be recovered.

The rules are in `src/lib/leads.ts` and checked by `node scripts/check-leads.mjs`.

## 1. Resend

1. Create a Resend account and go to **Domains > Add domain**. Add
   `leadstrategus.com` (region: the default, North Virginia, is fine).
2. Add the DNS records Resend shows you at your DNS provider (see below) and
   press **Verify**. Verification usually takes minutes, occasionally a few hours.
3. Go to **API Keys > Create API key**, permission **Sending access**, domain
   `leadstrategus.com`. Copy the key (it starts with `re_`).

### DNS records

Resend lists the exact values for your account; copy them from its dashboard
rather than from here. They will look like this (shown for `leadstrategus.com`
and the North Virginia region):

| Type | Name / Host | Value | Priority |
|---|---|---|---|
| MX | `send` | `feedback-smtp.us-east-1.amazonses.com` | 10 |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | |
| TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEB…` (a long key unique to your account) | |
| TXT | `_dmarc` | `v=DMARC1; p=none;` (recommended; only if you have no DMARC record yet) | |

Notes:

- The MX and SPF records sit on the `send` subdomain (`send.leadstrategus.com`),
  not on the root. They do **not** replace or touch the MX and SPF records that
  deliver your normal email (Google Workspace or similar), so incoming mail to
  kingshuk@leadstrategus.com is unaffected.
- Some DNS providers want the full name (`send.leadstrategus.com`), others only
  the part before the domain (`send`). Use whichever your provider's other
  records use.
- If `_dmarc.leadstrategus.com` already exists, keep it and do not add a second one.

## 2. Google Sheet backup

1. Create a Google Sheet (for example "Website leads").
2. **Extensions > Apps Script**. Replace the contents with
   `scripts/google-sheet-leads.gs` from this repository.
3. Change `TOKEN` at the top to a long random string and save.
4. **Deploy > New deployment**, type **Web app**: Execute as **Me**, Who has
   access **Anyone**. Authorise it, then copy the web app URL
   (`https://script.google.com/macros/s/…/exec`).
5. The webhook address for the site is that URL plus `?token=` and your string:
   `https://script.google.com/macros/s/…/exec?token=your-long-random-string`

A "Leads" tab is created on the first enquiry, with columns Received, Name,
Email, Company, About, Message and Sent from. If you edit the script later,
use **Deploy > Manage deployments > Edit > New version** so the URL stays the same.

## 3. Settings on the host

Set these where the site is hosted (for example Vercel > Project > Settings >
Environment Variables), then redeploy:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | the `re_…` key from step 1 |
| `LEADS_FROM` | `LeadStrategus Website <leads@leadstrategus.com>` (any address on the verified domain; it does not need a mailbox) |
| `CONTACT_WEBHOOK_URL` | the Apps Script URL with `?token=…` from step 2 |
| `LEADS_TO` | optional; defaults to kingshuk@leadstrategus.com |

## 4. Test it

Submit the form on `/contact` once the site is deployed. You should get the
email within a minute and a new row in the sheet. If the visitor sees the
error instead, the server log says which part failed (`[enquiry] email failed: …`
or `[enquiry] webhook failed: …`).

# Incoming leads

Every enquiry from the Contact and Book a call forms is:

1. **Emailed to kingshuk@leadstrategus.com** through [Resend](https://resend.com).
   The email's reply-to is the visitor, so replying answers them directly.
   The subject is "New website enquiry: [name] ([company])".
2. **Copied to a Google Sheet** as a backup, through a small Apps Script web app
   (`scripts/google-sheet-leads.gs`). The script only adds the row; it sends
   no email, so each lead reaches the inbox once.

The email is the delivery that counts. The visitor sees the thank-you page
only when Resend accepts the email. If it does not (or Resend is not
configured in production), they see "We could not send your enquiry just
now" with kingshuk@leadstrategus.com as a fallback, their text stays in the
form, and the lead is written to the server log under
`[enquiry] NOT DELIVERED` so it can be recovered.

If only the sheet copy fails, the visitor still sees the thank-you page (the
lead is in your inbox) and the server log says `[enquiry] sheet backup failed:`
with the reason. The script also logs why it answered `ok: false` (bad token,
a request that is not JSON, or a sheet error, with the full error) in the
Apps Script editor under **Executions**. The token itself is never logged.

The site-side rules are in `src/lib/leads.ts` and checked by
`node scripts/check-leads.mjs`. A missing setting never breaks a page: the
forms render without any of these settings, and a submission then shows the
fallback (production) or is logged (development).

## 1. Resend

1. In Resend, **Domains > Add domain** `leadstrategus.com` and add the DNS
   records it shows at your DNS provider, then **Verify**. They look like this
   (copy the exact values, especially the DKIM key, from Resend):

   | Type | Name | Value | Priority |
   |---|---|---|---|
   | MX | `send` | `feedback-smtp.us-east-1.amazonses.com` | 10 |
   | TXT | `send` | `v=spf1 include:amazonses.com ~all` | |
   | TXT | `resend._domainkey` | `p=MIGfMA0…` (from Resend) | |
   | TXT | `_dmarc` | `v=DMARC1; p=none;` (only if you have none yet) | |

   The `send` records sit on a subdomain and do not touch the records that
   deliver your normal email.
2. **API Keys > Create API key**, permission **Sending access**, domain
   `leadstrategus.com`. Copy the key (it starts with `re_`).

## 2. The Google Sheet backup

1. Create a Google Sheet (for example "Website leads").
2. **Extensions > Apps Script**. Replace the contents with
   `scripts/google-sheet-leads.gs` from this repository.
3. Change `TOKEN` near the top to a long random string (letters and numbers)
   and save. Keep the token out of this repository.
4. **Deploy > New deployment**, type **Web app**: Execute as **Me**, Who has
   access **Anyone**. Authorise it, then copy the web app URL.
5. The webhook address for the site is that URL plus `?token=` and your string.

**Updating the script later:** paste the new version, save, then
**Deploy > Manage deployments > (pencil) Edit > Version: New version > Deploy**.
That keeps the same URL.

The sheet's columns are Received, Name, Email, Company, About, Message and
Sent from. (An older version of the script added an "Emailed" column; rows
from now on leave it empty, and it can be deleted.)

## 3. Settings on the host

Set these where the site is hosted (Vercel > Project > Settings > Environment
Variables), then redeploy:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | the `re_…` key from step 1 |
| `LEADS_FROM` | `LeadStrategus Website <leads@leadstrategus.com>` (any address on the verified domain; it needs no mailbox) |
| `CONTACT_WEBHOOK_URL` | the Apps Script URL with `?token=…` from step 2 |
| `LEADS_TO` | optional; defaults to kingshuk@leadstrategus.com |

## 4. Test it

Submit the form on `/contact` once the site is deployed. You should get one
email within a minute and a new row in the sheet. If the visitor sees the
error instead, the Vercel log line `[enquiry] NOT DELIVERED:` says why.

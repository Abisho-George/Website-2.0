# Incoming leads

Every enquiry from the Contact and Book a call forms is sent to one Google
Apps Script web app (`scripts/google-sheet-leads.gs`), which:

1. **adds a row to a Google Sheet** ("Leads" tab), and
2. **emails the lead to kingshuk@leadstrategus.com** with MailApp. The email's
   reply-to is the visitor, so replying answers them directly. The subject is
   "New website enquiry: [name]".

The script answers `{"ok": true}` only when both the row and the email
succeeded. The visitor sees the thank-you page only on that answer. Anything
else (the script reports `ok: false`, an error page, a timeout, or no webhook
configured in production) shows the visitor "We could not send your enquiry
just now" with kingshuk@leadstrategus.com as a fallback, and their text stays
in the form. The lead is also written to the server log under
`[enquiry] NOT DELIVERED` so it can be recovered.

The sheet's **Emailed** column says `yes` for every lead that reached the
inbox. If the email step fails after the row was saved, it says `FAILED: …`.

The site-side rules are in `src/lib/leads.ts` and checked by
`node scripts/check-leads.mjs`. Nothing else (no email provider, no API key)
is involved.

## 1. The sheet and the script

1. Create a Google Sheet (for example "Website leads") in the Google account
   that should send the lead emails.
2. **Extensions > Apps Script**. Replace the contents with
   `scripts/google-sheet-leads.gs` from this repository.
3. Change `TOKEN` near the top to a long random string (letters and numbers)
   and save. Keep the token out of this repository.
4. **Deploy > New deployment**, type **Web app**: Execute as **Me**, Who has
   access **Anyone**. Authorise it when asked; it needs permission to edit
   the sheet and to send email as you. Copy the web app URL
   (`https://script.google.com/macros/s/…/exec`).
5. The webhook address for the site is that URL plus `?token=` and your string:
   `https://script.google.com/macros/s/…/exec?token=your-long-random-string`

**Updating the script later:** paste the new version, save, then
**Deploy > Manage deployments > (pencil) Edit > Version: New version > Deploy**.
That keeps the same URL. If the new version needs a new permission (this one
adds sending email), Google asks you to authorise it again.

The emails are sent from the Google account that owns the script, counted
against its daily MailApp quota (about 100 a day for a personal Gmail account,
1,500 for Google Workspace).

## 2. Settings on the host

Where the site is hosted (Vercel > Project > Settings > Environment
Variables), only one setting is used:

| Variable | Value |
|---|---|
| `CONTACT_WEBHOOK_URL` | the Apps Script URL with `?token=…` from step 1 |

`RESEND_API_KEY`, `LEADS_FROM` and `LEADS_TO` are no longer read; delete them.
Redeploy after changing settings.

If you had added Resend's DNS records (`send` MX and TXT, `resend._domainkey`
TXT) they are no longer needed and can be removed. Keep any `_dmarc` record.

## 3. Test it

Submit the form on `/contact` once the site is deployed. You should get the
email within a minute and a new row in the sheet with Emailed `yes`. If the
visitor sees the error instead, the Vercel log line `[enquiry] NOT DELIVERED:`
says why (for example `bad token`, or the email error from the script).

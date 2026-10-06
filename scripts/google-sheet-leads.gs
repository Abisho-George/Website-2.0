/**
 * LeadStrategus website: copies every enquiry into this Google Sheet.
 *
 * Paste this into the sheet's Extensions > Apps Script, set TOKEN to a long
 * random string, then Deploy > New deployment > Web app (Execute as: Me,
 * Who has access: Anyone). The site's CONTACT_WEBHOOK_URL is the web app URL
 * with ?token=<the same string> on the end. Full steps: docs/LEADS.md.
 */
const TOKEN = "replace-with-a-long-random-string";
const SHEET_NAME = "Leads";
const HEADERS = ["Received", "Name", "Email", "Company", "About", "Message", "Sent from"];

function doPost(e) {
  try {
    if (!e || !e.parameter || e.parameter.token !== TOKEN) return reply({ ok: false, error: "bad token" });
    const lead = JSON.parse(e.postData.contents);

    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);

    // a value starting with = + - or @ would run as a formula; store it as text
    const cell = (v) => {
      const s = v == null ? "" : String(v);
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    };
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      sheet.appendRow([lead.receivedAt, lead.name, lead.email, lead.company, lead.typeLabel, lead.message, lead.source].map(cell));
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

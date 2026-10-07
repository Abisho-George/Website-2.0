/**
 * LeadStrategus website: receives every enquiry, adds it to this Google Sheet
 * and emails it to the inbox below.
 *
 * Paste this into the sheet's Extensions > Apps Script, set TOKEN to a long
 * random string, then Deploy > New deployment > Web app (Execute as: Me,
 * Who has access: Anyone). The site's CONTACT_WEBHOOK_URL is the web app URL
 * with ?token=<the same string> on the end. Full steps: docs/LEADS.md.
 *
 * The reply is {"ok": true} only when both the row and the email succeeded;
 * otherwise {"ok": false, "error": ...} and the visitor is shown the fallback.
 */
const TOKEN = "replace-with-a-long-random-string";
const NOTIFY = "kingshuk@leadstrategus.com";
const SHEET_NAME = "Leads";
const HEADERS = ["Received", "Name", "Email", "Company", "About", "Message", "Sent from", "Emailed"];

function doPost(e) {
  try {
    if (!e || !e.parameter || e.parameter.token !== TOKEN) return reply({ ok: false, error: "bad token" });
    const lead = JSON.parse(e.postData.contents);

    // 1. the row
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    // a value starting with = + - or @ would run as a formula; store it as text
    const cell = (v) => {
      const s = v == null ? "" : String(v);
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    };
    let row;
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
      sheet.appendRow([lead.receivedAt, lead.name, lead.email, lead.company, lead.typeLabel, lead.message, lead.source, "sending"].map(cell));
      row = sheet.getLastRow();
    } finally {
      lock.releaseLock();
    }
    const emailedCell = sheet.getRange(row, HEADERS.indexOf("Emailed") + 1);

    // 2. the email
    try {
      const oneLine = (v) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim();
      MailApp.sendEmail({
        to: NOTIFY,
        replyTo: oneLine(lead.email),
        subject: ("New website enquiry: " + oneLine(lead.name)).slice(0, 200),
        body: [
          "Name: " + oneLine(lead.name),
          "Email: " + oneLine(lead.email),
          "Company: " + oneLine(lead.company),
          "About: " + oneLine(lead.typeLabel),
          "Sent from: " + oneLine(lead.source || "website"),
          "Received: " + oneLine(lead.receivedAt),
          "",
          "Message:",
          String(lead.message == null ? "" : lead.message),
          "",
          "Reply to this email to answer them directly.",
        ].join("\n"),
      });
      emailedCell.setValue("yes");
    } catch (err) {
      emailedCell.setValue("FAILED: " + String(err).slice(0, 200));
      return reply({ ok: false, error: "row saved, email failed: " + String(err) });
    }

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

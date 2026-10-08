/**
 * LeadStrategus website: backup copy of every enquiry in this Google Sheet.
 * The lead email itself is sent by the website through Resend; this script
 * only adds the row, so each lead arrives in the inbox once.
 *
 * Paste this into the sheet's Extensions > Apps Script, set TOKEN to a long
 * random string, then Deploy > New deployment > Web app (Execute as: Me,
 * Who has access: Anyone). The site's CONTACT_WEBHOOK_URL is the web app URL
 * with ?token=<the same string> on the end. Full steps: docs/LEADS.md.
 *
 * The reply is {"ok": true} when the row was added, otherwise
 * {"ok": false, "error": ...}. Every ok:false is also logged with its reason:
 * see Apps Script > Executions.
 */
const TOKEN = "replace-with-a-long-random-string";
const SHEET_NAME = "Leads";
const HEADERS = ["Received", "Name", "Email", "Company", "About", "Message", "Sent from"];

function doPost(e) {
  try {
    return handle(e);
  } catch (err) {
    return fail("unexpected error", err);
  }
}

function handle(e) {
  // 0. who is asking (the token itself is never logged)
  if (!e || !e.parameter || !e.parameter.token) return fail("bad token: the request had no token");
  if (e.parameter.token !== TOKEN) return fail("bad token: the token did not match TOKEN in this script");

  // 1. what was sent
  let lead;
  try {
    lead = JSON.parse(e.postData.contents);
  } catch (err) {
    return fail("bad request: the body is not valid JSON", err);
  }

  // 2. the row
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
    // a value starting with = + - or @ would run as a formula; store it as text
    const cell = (v) => {
      const s = v == null ? "" : String(v);
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    };
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
      sheet.appendRow([lead.receivedAt, lead.name, lead.email, lead.company, lead.typeLabel, lead.message, lead.source].map(cell));
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return fail("sheet error: the row could not be added", err);
  }

  return reply({ ok: true });
}

/** Logs why the request failed, with the full error, then answers ok:false. */
function fail(reason, err) {
  console.log("ok:false, " + reason + (err === undefined ? "" : "\n" + describe(err)));
  return reply({ ok: false, error: reason + (err === undefined ? "" : ": " + String(err)) });
}

/** The full error: its stack trace (which starts with the message) when there is one. */
function describe(err) {
  const message = String(err);
  if (!err || !err.stack) return message;
  const stack = String(err.stack);
  return stack.indexOf(message) === 0 ? stack : message + "\n" + stack;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

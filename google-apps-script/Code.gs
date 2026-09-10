/**
 * Credarc website — Contact form -> Google Sheets backend.
 *
 * SETUP:
 * 1. Create (or open) a Google Sheet that will collect submissions.
 * 2. In the Sheet, go to Extensions > Apps Script.
 * 3. Delete any boilerplate code and paste this file's contents in.
 * 4. In the script editor, set the SHEET_NAME constant below to match the
 *    tab name you want rows written to (a tab with that name is created
 *    automatically if it doesn't exist).
 * 5. Deploy > New deployment > select type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 6. Copy the deployment's Web app URL and put it in the site's .env file
 *    as VITE_GOOGLE_SCRIPT_URL (see .env.example).
 * 7. Whenever you edit this script, redeploy (Deploy > Manage deployments
 *    > pencil icon > New version) so the live URL picks up your changes.
 */

const SHEET_NAME = "Contact Submissions";

// Columns written to the sheet, in order. Keys must match the field
// names sent from the contact form (src/pages/Contact.jsx).
const FIELDS = [
  { key: "timestamp", label: "Timestamp" },
  { key: "name", label: "Full name" },
  { key: "email", label: "Work email" },
  { key: "phone", label: "Phone number" },
  { key: "company", label: "Company" },
  { key: "segment", label: "You are" },
  { key: "message", label: "Message" },
  { key: "source", label: "Source page" },
];

function doPost(e) {
  try {
    const data = parseRequest(e);
    const sheet = getOrCreateSheet();
    appendRow(sheet, data);
    return jsonResponse({ result: "success" });
  } catch (err) {
    return jsonResponse({ result: "error", message: String(err) });
  }
}

// Allows a quick GET check that the deployment is live.
function doGet() {
  return jsonResponse({ result: "ok", message: "Credarc form endpoint is live." });
}

function parseRequest(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("No form data received.");
  }

  let data;
  const contentType = e.postData.type || "";

  if (contentType.indexOf("application/json") !== -1) {
    data = JSON.parse(e.postData.contents);
  } else {
    // Fallback: x-www-form-urlencoded / multipart, available via e.parameter.
    data = e.parameter || {};
  }

  data.timestamp = new Date();
  return data;
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(FIELDS.map((f) => f.label));
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function appendRow(sheet, data) {
  const row = FIELDS.map((f) => data[f.key] || "");
  sheet.appendRow(row);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

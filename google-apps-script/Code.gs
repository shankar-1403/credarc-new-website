/**
 * Credarc website — Firebase Realtime Database -> Google Sheets sync.
 *
 * The contact form (src/pages/Contact.jsx) writes each submission straight
 * into Firebase Realtime Database, under `contact_submissions`. This script
 * runs on a time-driven trigger, pulls whatever is new since the last run,
 * and appends it to this Sheet — it does NOT run on every form submission,
 * it polls on an interval (e.g. every 5 minutes).
 *
 * SETUP:
 * 1. In Firebase Console -> Project settings -> Service accounts ->
 *    Database secrets, generate a legacy secret (or use one you already
 *    have). This lets the script read the database even though public
 *    read access is off in the security rules.
 * 2. Open your Google Sheet -> Extensions > Apps Script.
 * 3. Delete any boilerplate code and paste this file's contents in.
 * 4. Set DATABASE_URL and DATABASE_SECRET below.
 * 5. Run `setupTrigger` once from the script editor (select it from the
 *    function dropdown, click Run). This creates a time-driven trigger
 *    that calls `syncSubmissions` automatically every 5 minutes. Google
 *    will ask you to authorize the script the first time.
 * 6. Optionally run `syncSubmissions` once manually to pull in anything
 *    already sitting in the database.
 *
 * You do NOT need to "deploy as web app" for this — there is no HTTP
 * endpoint here, it's purely trigger-driven.
 */

const DATABASE_URL =
  "https://credarc-esg-website-default-rtdb.asia-southeast1.firebasedatabase.app";
const DATABASE_SECRET = "PASTE_YOUR_FIREBASE_DATABASE_SECRET_HERE";

const SHEET_NAME = "Contact Submissions";
const LAST_KEY_PROPERTY = "lastSyncedSubmissionKey";

// Columns written to the sheet, in order.
const FIELDS = [
  { key: "submittedAt", label: "Timestamp" },
  { key: "name", label: "Full name" },
  { key: "email", label: "Work email" },
  { key: "phone", label: "Phone number" },
  { key: "company", label: "Company" },
  { key: "segment", label: "You are" },
  { key: "message", label: "Message" },
  { key: "source", label: "Source page" },
];

/** Run this once manually to create the recurring trigger. */
function setupTrigger() {
  // Avoid creating duplicate triggers if this is run more than once.
  ScriptApp.getProjectTriggers().forEach((t) => {
    if (t.getHandlerFunction() === "syncSubmissions") {
      ScriptApp.deleteTrigger(t);
    }
  });

  ScriptApp.newTrigger("syncSubmissions")
    .timeBased()
    .everyMinutes(5)
    .create();
}

/** Called automatically by the trigger created in setupTrigger. */
function syncSubmissions() {
  const properties = PropertiesService.getScriptProperties();
  const lastKey = properties.getProperty(LAST_KEY_PROPERTY);

  const submissions = fetchNewSubmissions(lastKey);
  const keys = Object.keys(submissions);

  if (keys.length === 0) return;

  const sheet = getOrCreateSheet();
  keys.sort(); // Firebase push() keys sort chronologically.

  keys.forEach((key) => {
    appendRow(sheet, submissions[key]);
  });

  const newestKey = keys[keys.length - 1];
  properties.setProperty(LAST_KEY_PROPERTY, newestKey);
}

function fetchNewSubmissions(lastKey) {
  let url =
    DATABASE_URL +
    "/contact_submissions.json?auth=" +
    encodeURIComponent(DATABASE_SECRET) +
    "&orderBy=%22$key%22";

  if (lastKey) {
    // startAt is inclusive, so we'll filter the already-seen key back out.
    url += "&startAt=%22" + encodeURIComponent(lastKey) + "%22";
  }

  const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  const data = JSON.parse(response.getContentText() || "{}") || {};

  if (lastKey && data[lastKey]) {
    delete data[lastKey];
  }

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
  const row = FIELDS.map((f) => (data && data[f.key]) || "");
  sheet.appendRow(row);
}

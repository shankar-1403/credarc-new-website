/**
 * Contact form submission — writes to Firebase Realtime Database only.
 * A time-driven Google Apps Script trigger (see google-apps-script/Code.gs)
 * periodically pulls new rows from `contact_submissions` and appends them
 * to the Google Sheet, so the client never needs to know about the sheet.
 */
import { ref, push } from "firebase/database";
import { db } from "./firebase";

export async function submitForm(data) {
  const payload = { ...data, submittedAt: new Date().toISOString() };
  const submissionsRef = ref(db, "contact_submissions");
  const result = await push(submissionsRef, payload);
  return { id: result.key };
}

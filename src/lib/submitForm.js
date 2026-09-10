/**
 * Contact form submission pipeline — same two-step structure used on the
 * PCRED site: write the submission to Firebase Realtime Database first
 * (the durable record of the lead), then relay it to the Google Sheet via
 * the Apps Script web app (see google-apps-script/Code.gs).
 *
 * The Sheets relay is best-effort: if it fails, the submission has still
 * been captured in the database, so we don't fail the whole submission
 * over it (mirrors PCRED's Promise.allSettled behaviour for the Sheets
 * step, just done client-side since this project has no server).
 */
import { ref, push } from "firebase/database";
import { db } from "./firebase";

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

async function writeToDatabase(data) {
  const submissionsRef = ref(db, "contact_submissions");
  const result = await push(submissionsRef, data);
  return result.key;
}

async function appendToSheet(data) {
  if (!SCRIPT_URL) {
    console.warn(
      "[contact] VITE_GOOGLE_SCRIPT_URL not configured — skipping Sheets relay."
    );
    return;
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    // text/plain avoids a CORS preflight, which Apps Script web apps don't
    // handle; the body is still JSON and is parsed as JSON server-side.
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Sheets relay failed with status ${response.status}`);
  }

  const result = await response.json();
  if (result.result !== "success") {
    throw new Error(result.message || "Sheets relay failed.");
  }
}

export async function submitForm(data) {
  const payload = { ...data, submittedAt: new Date().toISOString() };

  // The database write is the source of truth — if this fails, the
  // submission genuinely failed and the caller should show an error.
  const id = await writeToDatabase(payload);

  // The Sheets relay is a convenience mirror of the database; don't let a
  // Sheets/network hiccup block the user from seeing "submitted".
  try {
    await appendToSheet(payload);
  } catch (err) {
    console.error("[contact] Sheets relay failed (submission still saved):", err);
  }

  return { id };
}

/**
 * Submits form data to the Google Apps Script web app backing our
 * Google Sheet (see google-apps-script/Code.gs for the backend + setup).
 *
 * The endpoint URL comes from VITE_GOOGLE_SCRIPT_URL, set in .env
 * (see .env.example). Requests are sent with a `text/plain` content type
 * to avoid triggering a CORS preflight, which Apps Script web apps don't
 * handle — the body itself is still JSON and is parsed as JSON server-side.
 */

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export async function submitForm(data) {
  if (!SCRIPT_URL) {
    throw new Error(
      "Form endpoint is not configured. Set VITE_GOOGLE_SCRIPT_URL in .env."
    );
  }

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Form submission failed with status ${response.status}`);
  }

  const result = await response.json();

  if (result.result !== "success") {
    throw new Error(result.message || "Form submission failed.");
  }

  return result;
}

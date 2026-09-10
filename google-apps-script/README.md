# Contact form → Google Sheets

The site's Contact form (`src/pages/Contact.jsx`) posts submissions to a
Google Apps Script web app, which appends each one as a row in a Google
Sheet. No Firebase/backend server is used for this.

## Setup

1. Create a new Google Sheet (or open the one you want submissions in).
2. **Extensions → Apps Script**, replace the default code with the contents
   of [`Code.gs`](./Code.gs).
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the deployment URL (ends in `/exec`).
5. In the project root, copy `.env.example` to `.env` and set:
   ```
   VITE_GOOGLE_SCRIPT_URL=<paste the deployment URL here>
   ```
6. Restart `npm run dev` (or rebuild) so Vite picks up the new env var.

Submissions land in a sheet tab called **Contact Submissions** (auto-created
on first submission) with columns: Timestamp, Full name, Work email,
Company, You are, Message, Source page.

## Updating the script later

Any time you edit `Code.gs` in the Apps Script editor, you must redeploy for
the live URL to reflect changes: **Deploy → Manage deployments → pencil icon
→ New version → Deploy**.

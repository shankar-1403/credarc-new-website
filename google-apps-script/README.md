# Contact form → Firebase → Google Sheets

The site's Contact form (`src/pages/Contact.jsx`) submits in two steps,
same structure as the PCRED site's contact pipeline:

1. **Firebase Realtime Database** (`src/lib/firebase.js`) — the submission
   is written to the `contact_submissions` node first. This is the durable
   record of the lead.
2. **Google Apps Script → Google Sheet** (`Code.gs` in this folder) — the
   same submission is then relayed to a Google Sheet as a convenience
   mirror. If this step fails (network hiccup, script not deployed yet),
   the submission is still safely in Firebase — it does not block the user
   from seeing "submitted".

Both steps run client-side (this is a static Vite SPA with no Node
server), unlike PCRED's Next.js API route which did this server-side —
functionally the same order of operations, just called directly from the
browser.

## Setup

### 1. Firebase Realtime Database rules

The database is already configured in `src/lib/firebase.js` (project
`credarc-esg-website`). Make sure the Realtime Database's rules allow
writes to `contact_submissions` from the site, e.g.:

```json
{
  "rules": {
    "contact_submissions": {
      ".read": false,
      ".write": true
    }
  }
}
```

(Tighten this to your actual security needs — e.g. rate limiting via
App Check — before going to production if spam is a concern.)

### 2. Google Apps Script → Sheets relay

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
on first submission) with columns: Timestamp, Full name, Work email, Phone
number, Company, You are, Message, Source page.

## Updating the script later

Any time you edit `Code.gs` in the Apps Script editor, you must redeploy for
the live URL to reflect changes: **Deploy → Manage deployments → pencil icon
→ New version → Deploy**.

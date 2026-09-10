# Contact form → Firebase → Google Sheets (scheduled sync)

The site's Contact form ([src/pages/Contact.jsx](../src/pages/Contact.jsx))
writes straight to **Firebase Realtime Database** — nothing else. A separate
**Google Apps Script running on a time-driven trigger** periodically pulls
whatever is new from the database and appends it to a Google Sheet.

```
Browser (Contact form)
        │  push()
        ▼
Firebase Realtime Database   (contact_submissions/*)
        ▲
        │  polled every 5 min
        │
Google Apps Script (syncSubmissions, trigger-driven)
        │  appendRow()
        ▼
Google Sheet ("Contact Submissions" tab)
```

The client never talks to Apps Script directly, and the Sheet never needs
to be reachable from the browser — the pull happens entirely on Google's
side, on a schedule.

## Setup

### 1. Firebase Realtime Database rules

In the Firebase Console → project `credarc-esg-website` → Realtime
Database → **Rules**, set:

```json
{
  "rules": {
    "contact_submissions": {
      ".read": false,
      ".write": true
    },
    "$other": {
      ".read": false,
      ".write": false
    }
  }
}
```

This lets the public site write submissions but not read them back
(`.read: false`). The Apps Script sync bypasses this using a database
secret (next step), so this stays locked down.

### 2. Get a Firebase database secret

Apps Script needs a way to read the database even though public reads are
off. In the Firebase Console → **Project settings** (gear icon) →
**Service accounts** tab → **Database secrets** → generate/reveal a
legacy secret. Copy it.

(This is Firebase's older "legacy token" auth method for the Realtime
Database REST API — it still works and is the simplest option for a
script like this that isn't running as a real backend.)

### 3. Set up the Apps Script

1. Open your Google Sheet → **Extensions → Apps Script**.
2. Replace the default code with the contents of [`Code.gs`](./Code.gs).
3. At the top of the file, set:
   ```js
   const DATABASE_URL = "https://credarc-esg-website-default-rtdb.asia-southeast1.firebasedatabase.app";
   const DATABASE_SECRET = "<paste the secret from step 2>";
   ```
4. In the function dropdown at the top of the editor, select **setupTrigger**
   and click **Run** (▶). This creates a trigger that calls
   `syncSubmissions` automatically every 5 minutes. The first run will ask
   you to authorize the script — allow it.
5. (Optional) Run **syncSubmissions** once manually to pull in anything
   already sitting in the database from testing.

There is **no web app deployment** needed for this version — it's
trigger-driven, not HTTP-driven.

Submissions land in a sheet tab called **Contact Submissions** (auto-created
on first sync) with columns: Timestamp, Full name, Work email, Phone
number, Company, You are, Message, Source page.

## Changing the sync interval

Edit the `.everyMinutes(5)` call in `setupTrigger`, then re-run
`setupTrigger` once (it clears any existing trigger for this function
before creating the new one, so it won't double up).

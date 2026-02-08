# Request Demo + Supabase — one-time setup

Do these **once** so demo requests are saved and visible in Supabase.

---

## 1. Add your Service Role Key

1. Open: **https://supabase.com/dashboard/project/akufiunsqigybadthbfl/settings/api**
2. Under **Project API keys**, copy the **`service_role`** key (secret).
3. Open **`velarix/.env.local`** and replace:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=REPLACE_WITH_YOUR_SERVICE_ROLE_KEY
   ```
   with your pasted key (keep the rest of the line as-is).

---

## 2. Run the database schema

1. Open: **https://supabase.com/dashboard/project/akufiunsqigybadthbfl/sql/new**
2. Open the file **`velarix/supabase/migrations/001_leads_schema.sql`** in your editor, select all, copy.
3. Paste into the Supabase SQL Editor and click **Run**.

*(Or from terminal: `node scripts/run-leads-migration.mjs` and copy the printed SQL into the same link.)*

---

## 3. Install dependencies and start the app

From the **`velarix`** folder:

```bash
npm install
npm run dev
```

---

## 4. Verify

1. Open **http://localhost:3000/request-demo** and submit the form (Step 1 is enough).
2. In Supabase: **Table Editor** → **`leads`** — you should see the new row.

You and your team can always view leads in **Supabase Dashboard → Table Editor → leads** (and **questionnaire_responses** for Step 2 data).

#!/usr/bin/env node
/**
 * One-time setup: run the leads schema in Supabase.
 * 1. Put your SUPABASE_SERVICE_ROLE_KEY in .env.local (see SETUP-LEADS.md).
 * 2. Run: node scripts/run-leads-migration.mjs
 *
 * This prints the SQL and the link; copy the SQL and run it in the dashboard.
 */

import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const sqlPath = join(__dirname, "..", "supabase", "migrations", "001_leads_schema.sql")
const sql = readFileSync(sqlPath, "utf8")
const editorUrl = "https://supabase.com/dashboard/project/akufiunsqigybadthbfl/sql/new"

console.log("Run this SQL in Supabase SQL Editor:\n")
console.log("→ " + editorUrl + "\n")
console.log("--- Paste below ---\n")
console.log(sql)
console.log("\n--- End ---")

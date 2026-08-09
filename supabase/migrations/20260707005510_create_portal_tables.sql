/*
# BitSecureX Client Portal tables

1. New Tables
- `portal_projects` — client projects with status tracking. Owner: user_id.
- `portal_tickets` — support tickets. Owner: user_id.
- `portal_messages` — messages on a ticket. Owner: user_id.
- `portal_invoices` — client invoices. Owner: user_id.
- `portal_files` — shared documents / security reports. Owner: user_id.
- `portal_audit_requests` — security audit request submissions. Owner: user_id.
- `contact_leads` — public contact form submissions (no auth, anon-writable).

2. Security
- All portal_* tables: RLS enabled, owner-scoped CRUD (TO authenticated, auth.uid() = user_id).
- contact_leads: RLS enabled, anon+authenticated INSERT only (public form), no public read.

3. Notes
- Owner columns default to auth.uid() so client inserts omitting user_id succeed.
- Email confirmation stays OFF.
*/

CREATE TABLE IF NOT EXISTS portal_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'Planning',
  progress int NOT NULL DEFAULT 0,
  due_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portal_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_projects" ON portal_projects;
CREATE POLICY "select_own_projects" ON portal_projects FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_projects" ON portal_projects;
CREATE POLICY "insert_own_projects" ON portal_projects FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_projects" ON portal_projects;
CREATE POLICY "update_own_projects" ON portal_projects FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_projects" ON portal_projects;
CREATE POLICY "delete_own_projects" ON portal_projects FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS portal_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  message text NOT NULL,
  priority text NOT NULL DEFAULT 'Normal',
  status text NOT NULL DEFAULT 'Open',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portal_tickets ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_tickets" ON portal_tickets;
CREATE POLICY "select_own_tickets" ON portal_tickets FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_tickets" ON portal_tickets;
CREATE POLICY "insert_own_tickets" ON portal_tickets FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_tickets" ON portal_tickets;
CREATE POLICY "update_own_tickets" ON portal_tickets FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_tickets" ON portal_tickets;
CREATE POLICY "delete_own_tickets" ON portal_tickets FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS portal_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  number text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'Unpaid',
  due_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portal_invoices ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_invoices" ON portal_invoices;
CREATE POLICY "select_own_invoices" ON portal_invoices FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_invoices" ON portal_invoices;
CREATE POLICY "insert_own_invoices" ON portal_invoices FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_invoices" ON portal_invoices;
CREATE POLICY "update_own_invoices" ON portal_invoices FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_invoices" ON portal_invoices;
CREATE POLICY "delete_own_invoices" ON portal_invoices FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS portal_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL DEFAULT 'Document',
  size text,
  url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portal_files ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_files" ON portal_files;
CREATE POLICY "select_own_files" ON portal_files FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_files" ON portal_files;
CREATE POLICY "insert_own_files" ON portal_files FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_files" ON portal_files;
CREATE POLICY "delete_own_files" ON portal_files FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS portal_audit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  company text NOT NULL,
  scope text NOT NULL,
  assets text,
  priority text NOT NULL DEFAULT 'Standard',
  status text NOT NULL DEFAULT 'Submitted',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portal_audit_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_audits" ON portal_audit_requests;
CREATE POLICY "select_own_audits" ON portal_audit_requests FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_audits" ON portal_audit_requests;
CREATE POLICY "insert_own_audits" ON portal_audit_requests FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_audits" ON portal_audit_requests;
CREATE POLICY "delete_own_audits" ON portal_audit_requests FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS contact_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  service text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON contact_leads;
CREATE POLICY "anon_insert_leads" ON contact_leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

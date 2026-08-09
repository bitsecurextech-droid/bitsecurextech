/*
# Add description column to admin_projects + public read access

1. Modified Tables
- `admin_projects` — add `description` text column for a longer project description shown on the portfolio.
- `admin_projects` — add `accent` text column for the gradient accent class used in portfolio cards (defaults to 'from-cyber-500 to-electric-500').

2. Security
- Add an anon SELECT policy on `admin_projects` so the public portfolio page can read uploaded projects without signing in.
- Existing owner-scoped authenticated CRUD policies remain unchanged.
*/

ALTER TABLE admin_projects ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE admin_projects ADD COLUMN IF NOT EXISTS accent text NOT NULL DEFAULT 'from-cyber-500 to-electric-500';

-- Public read access for portfolio display (anon can SELECT, no writes)
DROP POLICY IF EXISTS "public_select_admin_projects" ON admin_projects;
CREATE POLICY "public_select_admin_projects" ON admin_projects FOR SELECT
  TO anon, authenticated USING (true);

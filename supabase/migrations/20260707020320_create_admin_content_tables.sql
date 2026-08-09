/*
# BitSecureX content management tables

1. New Tables
- `admin_blog_posts` — blog articles managed from admin. Owner: user_id.
- `admin_testimonials` — client testimonials with approve/reject workflow. Owner: user_id.
- `admin_certifications` — certification badges with expiry and ordering. Owner: user_id.
- `admin_team_members` — team profiles. Owner: user_id.
- `admin_resources` — resource center items (guides, tutorials, reports). Owner: user_id.
- `admin_projects` — portfolio projects managed from admin. Owner: user_id.
- `admin_waf_logs` — simulated WAF blocked request logs. Owner: user_id.
- `admin_honeypot_logs` — honeypot access attempt logs. Owner: user_id.
- `admin_blacklist` — IP blacklist/whitelist entries. Owner: user_id.
- `admin_ab_variants` — A/B test hero headline variants. Owner: user_id.

2. Security
- All tables: RLS enabled, owner-scoped CRUD (TO authenticated, auth.uid() = user_id).
- Owner columns default to auth.uid().

3. Notes
- These tables support the admin dashboard's full CRUD capabilities.
- Existing portal_* and contact_leads tables from prior migration remain unchanged.
*/

CREATE TABLE IF NOT EXISTS admin_blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text,
  category text NOT NULL DEFAULT 'Cybersecurity',
  excerpt text,
  content text,
  image_url text,
  status text NOT NULL DEFAULT 'Draft',
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE admin_blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_blog_posts" ON admin_blog_posts;
CREATE POLICY "select_own_blog_posts" ON admin_blog_posts FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_blog_posts" ON admin_blog_posts;
CREATE POLICY "insert_own_blog_posts" ON admin_blog_posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_blog_posts" ON admin_blog_posts;
CREATE POLICY "update_own_blog_posts" ON admin_blog_posts FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_blog_posts" ON admin_blog_posts;
CREATE POLICY "delete_own_blog_posts" ON admin_blog_posts FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS admin_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text,
  company text,
  project text,
  rating int NOT NULL DEFAULT 5,
  text text NOT NULL,
  image_url text,
  verified boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE admin_testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_testimonials" ON admin_testimonials;
CREATE POLICY "select_own_testimonials" ON admin_testimonials FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_testimonials" ON admin_testimonials;
CREATE POLICY "insert_own_testimonials" ON admin_testimonials FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_testimonials" ON admin_testimonials;
CREATE POLICY "update_own_testimonials" ON admin_testimonials FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_testimonials" ON admin_testimonials;
CREATE POLICY "delete_own_testimonials" ON admin_testimonials FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS admin_certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  issuer text NOT NULL,
  color text DEFAULT '#0066ff',
  expiry_date date,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE admin_certifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_certs" ON admin_certifications;
CREATE POLICY "select_own_certs" ON admin_certifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_certs" ON admin_certifications;
CREATE POLICY "insert_own_certs" ON admin_certifications FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_certs" ON admin_certifications;
CREATE POLICY "update_own_certs" ON admin_certifications FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_certs" ON admin_certifications;
CREATE POLICY "delete_own_certs" ON admin_certifications FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS admin_team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  image_url text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE admin_team_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_team" ON admin_team_members;
CREATE POLICY "select_own_team" ON admin_team_members FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_team" ON admin_team_members;
CREATE POLICY "insert_own_team" ON admin_team_members FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_team" ON admin_team_members;
CREATE POLICY "update_own_team" ON admin_team_members FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_team" ON admin_team_members;
CREATE POLICY "delete_own_team" ON admin_team_members FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS admin_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  type text NOT NULL DEFAULT 'Guide',
  description text,
  url text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE admin_resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_resources" ON admin_resources;
CREATE POLICY "select_own_resources" ON admin_resources FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_resources" ON admin_resources;
CREATE POLICY "insert_own_resources" ON admin_resources FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_resources" ON admin_resources;
CREATE POLICY "update_own_resources" ON admin_resources FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_resources" ON admin_resources;
CREATE POLICY "delete_own_resources" ON admin_resources FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS admin_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Web Apps',
  industry text,
  problem text,
  solution text,
  tech text[],
  image_url text,
  live_demo_url text,
  github_url text,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE admin_projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_admin_projects" ON admin_projects;
CREATE POLICY "select_own_admin_projects" ON admin_projects FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_admin_projects" ON admin_projects;
CREATE POLICY "insert_own_admin_projects" ON admin_projects FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_admin_projects" ON admin_projects;
CREATE POLICY "update_own_admin_projects" ON admin_projects FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_admin_projects" ON admin_projects;
CREATE POLICY "delete_own_admin_projects" ON admin_projects FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS admin_waf_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  ip text NOT NULL,
  attack_type text NOT NULL,
  payload text,
  path text,
  country text,
  blocked boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE admin_waf_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_waf" ON admin_waf_logs;
CREATE POLICY "select_own_waf" ON admin_waf_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_waf" ON admin_waf_logs;
CREATE POLICY "insert_own_waf" ON admin_waf_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_waf" ON admin_waf_logs;
CREATE POLICY "delete_own_waf" ON admin_waf_logs FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS admin_honeypot_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  ip text NOT NULL,
  port int,
  attempts int NOT NULL DEFAULT 1,
  country text,
  fingerprint text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE admin_honeypot_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_honeypot" ON admin_honeypot_logs;
CREATE POLICY "select_own_honeypot" ON admin_honeypot_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_honeypot" ON admin_honeypot_logs;
CREATE POLICY "insert_own_honeypot" ON admin_honeypot_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_honeypot" ON admin_honeypot_logs;
CREATE POLICY "delete_own_honeypot" ON admin_honeypot_logs FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS admin_blacklist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  ip text NOT NULL,
  type text NOT NULL DEFAULT 'block',
  reason text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE admin_blacklist ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_blacklist" ON admin_blacklist;
CREATE POLICY "select_own_blacklist" ON admin_blacklist FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_blacklist" ON admin_blacklist;
CREATE POLICY "insert_own_blacklist" ON admin_blacklist FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_blacklist" ON admin_blacklist;
CREATE POLICY "delete_own_blacklist" ON admin_blacklist FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS admin_ab_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  headline text NOT NULL,
  traffic_pct int NOT NULL DEFAULT 33,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE admin_ab_variants ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "select_own_ab" ON admin_ab_variants;
CREATE POLICY "select_own_ab" ON admin_ab_variants FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_ab" ON admin_ab_variants;
CREATE POLICY "insert_own_ab" ON admin_ab_variants FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_ab" ON admin_ab_variants;
CREATE POLICY "update_own_ab" ON admin_ab_variants FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_ab" ON admin_ab_variants;
CREATE POLICY "delete_own_ab" ON admin_ab_variants FOR DELETE TO authenticated USING (auth.uid() = user_id);

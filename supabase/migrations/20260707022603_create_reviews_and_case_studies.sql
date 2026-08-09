/*
# Public reviews table

1. New Tables
- `public_reviews` — customer reviews/testimonials submitted by visitors. Public insert (anon), admin-managed.
  - name, role, company, project, rating (1-5), text, status (Pending/Approved)
- `admin_case_studies` — case studies managed from admin. Owner: user_id.

2. Security
- public_reviews: RLS enabled. anon+authenticated INSERT (public form). No public SELECT (admin reads via authenticated).
- admin_case_studies: RLS enabled, owner-scoped CRUD.
*/

CREATE TABLE IF NOT EXISTS public_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  company text,
  project text,
  rating int NOT NULL DEFAULT 5,
  text text NOT NULL,
  status text NOT NULL DEFAULT 'Pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_reviews" ON public_reviews;
CREATE POLICY "anon_insert_reviews" ON public_reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "select_own_reviews" ON public_reviews;
CREATE POLICY "select_own_reviews" ON public_reviews FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "update_own_reviews" ON public_reviews;
CREATE POLICY "update_own_reviews" ON public_reviews FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "delete_own_reviews" ON public_reviews;
CREATE POLICY "delete_own_reviews" ON public_reviews FOR DELETE
  TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS admin_case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  client text,
  industry text,
  challenge text,
  strategy text,
  design text,
  development text,
  security text,
  results jsonb,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_case_studies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_case_studies" ON admin_case_studies;
CREATE POLICY "select_own_case_studies" ON admin_case_studies FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_case_studies" ON admin_case_studies;
CREATE POLICY "insert_own_case_studies" ON admin_case_studies FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_case_studies" ON admin_case_studies;
CREATE POLICY "update_own_case_studies" ON admin_case_studies FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_case_studies" ON admin_case_studies;
CREATE POLICY "delete_own_case_studies" ON admin_case_studies FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

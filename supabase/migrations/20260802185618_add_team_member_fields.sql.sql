/*
# Add service_name and experience to team members

1. Modified Tables
- `admin_team_members`: add `service_name` (text, nullable)
- `admin_team_members`: add `experience` (text, nullable)
2. Security
- No policy changes. Existing RLS policies remain in effect.
3. Notes
- Both columns are nullable so existing rows are not affected.
- Idempotent: uses DO $$ ... IF NOT EXISTS ... END $$ blocks.
*/

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'admin_team_members' AND column_name = 'service_name') THEN
    ALTER TABLE admin_team_members ADD COLUMN service_name text;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'admin_team_members' AND column_name = 'experience') THEN
    ALTER TABLE admin_team_members ADD COLUMN experience text;
  END IF;
END $$;

/*
# Add phone and target_platform columns to inquiries table

1. Modified Tables
- `inquiries`
  - Added `phone` (text, nullable) — optional phone/WhatsApp number from the contact form
  - Added `target_platform` (text, nullable) — the platform the video is intended for (YouTube, Instagram, etc.)
  - Added `duration` (text, nullable) — desired video duration from the project details step

2. Security
- No changes to RLS. Existing anon+authenticated policies cover the new columns.

3. Notes
- All three new columns are nullable so existing rows and the simpler homepage form remain compatible.
*/

ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS target_platform text;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS duration text;

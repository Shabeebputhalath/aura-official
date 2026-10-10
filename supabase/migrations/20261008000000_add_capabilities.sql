/*
  Add capabilities table for the homepage scrolling gallery.

  Columns:
    id          — uuid primary key
    label       — display name shown on the card (e.g. "Cinematic Worlds")
    image_url   — full URL to the cover image (9:16 aspect ratio recommended)
    sort_order  — integer for manual ordering
    is_active   — when false the card is hidden from the public gallery
    created_at
    updated_at
*/

CREATE TABLE IF NOT EXISTS capabilities (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label       text NOT NULL,
  image_url   text NOT NULL DEFAULT '',
  sort_order  integer NOT NULL DEFAULT 0,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;

-- Public read (used by the homepage gallery)
DROP POLICY IF EXISTS "anon_read_capabilities" ON capabilities;
CREATE POLICY "anon_read_capabilities" ON capabilities
  FOR SELECT TO anon, authenticated USING (true);

-- Admin write (publishable key = anon role on this client-side app)
DROP POLICY IF EXISTS "anon_write_capabilities" ON capabilities;
CREATE POLICY "anon_write_capabilities" ON capabilities
  FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Seed with the default 12 capabilities
INSERT INTO capabilities (label, image_url, sort_order, is_active) VALUES
  ('Cinematic Worlds',      'https://images.pexels.com/photos/35161189/pexels-photo-35161189.jpeg?auto=compress&cs=tinysrgb&w=600',  1,  true),
  ('Product Visualization', 'https://images.pexels.com/photos/13186049/pexels-photo-13186049.jpeg?auto=compress&cs=tinysrgb&w=600',  2,  true),
  ('AI Characters',         'https://images.pexels.com/photos/8107826/pexels-photo-8107826.jpeg?auto=compress&cs=tinysrgb&w=600',   3,  true),
  ('Fashion & Editorial',   'https://images.pexels.com/photos/12264712/pexels-photo-12264712.jpeg?auto=compress&cs=tinysrgb&w=600',  4,  true),
  ('Architecture',          'https://images.pexels.com/photos/3137084/pexels-photo-3137084.jpeg?auto=compress&cs=tinysrgb&w=600',   5,  true),
  ('Automotive',            'https://images.pexels.com/photos/24589327/pexels-photo-24589327.jpeg?auto=compress&cs=tinysrgb&w=600', 6,  true),
  ('Sci-Fi',                'https://images.pexels.com/photos/36775812/pexels-photo-36775812.jpeg?auto=compress&cs=tinysrgb&w=600', 7,  true),
  ('Fantasy',               'https://images.pexels.com/photos/4616822/pexels-photo-4616822.jpeg?auto=compress&cs=tinysrgb&w=600',   8,  true),
  ('Luxury',                'https://images.pexels.com/photos/9202892/pexels-photo-9202892.jpeg?auto=compress&cs=tinysrgb&w=600',   9,  true),
  ('Food & Beverage',       'https://images.pexels.com/photos/12584751/pexels-photo-12584751.jpeg?auto=compress&cs=tinysrgb&w=600', 10, true),
  ('Technology',            'https://images.pexels.com/photos/8640331/pexels-photo-8640331.jpeg?auto=compress&cs=tinysrgb&w=600',   11, true),
  ('Music Videos',          'https://images.pexels.com/photos/6270135/pexels-photo-6270135.jpeg?auto=compress&cs=tinysrgb&w=600',   12, true)
ON CONFLICT DO NOTHING;

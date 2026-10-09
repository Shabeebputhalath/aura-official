-- =============================================================
-- AURA AI — Full Supabase Setup Script
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- Project: https://ceepcxixorsdpyfaqjkd.supabase.co
-- =============================================================
--
-- SECURITY MODEL:
--
-- This is a client-side app (no backend server). The admin
-- panel runs in the browser using the publishable key, which
-- maps to Supabase's "anon" role. Because of this:
--
-- 1. inquiries: anon can INSERT (public contact form) but
--    CANNOT read, update or delete. Only authenticated can.
--
-- 2. All other tables: anon has full CRUD so the admin panel
--    (which also runs as anon) can manage content.
--    The PASSWORD GATE in the app (AdminLogin.tsx) is the
--    primary access-control layer for the admin panel.
--
-- 3. The status column on inquiries uses a CHECK constraint
--    so only valid values are accepted.
--
-- If you later add Supabase Auth (email/password login), swap
-- the anon write policies for "authenticated" to get true
-- server-side enforcement.
--
-- =============================================================

-- ── Projects ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  client text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  project_url text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_projects" ON projects;
CREATE POLICY "anon_select_projects" ON projects FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_projects" ON projects;
CREATE POLICY "anon_insert_projects" ON projects FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_projects" ON projects;
CREATE POLICY "anon_update_projects" ON projects FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_projects" ON projects;
CREATE POLICY "anon_delete_projects" ON projects FOR DELETE TO anon, authenticated USING (true);

-- ── Services ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  icon text NOT NULL DEFAULT 'Film',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_services" ON services;
CREATE POLICY "anon_select_services" ON services FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_services" ON services;
CREATE POLICY "anon_insert_services" ON services FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_services" ON services;
CREATE POLICY "anon_update_services" ON services FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_services" ON services;
CREATE POLICY "anon_delete_services" ON services FOR DELETE TO anon, authenticated USING (true);

-- ── Pricing plans ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  cta_text text NOT NULL DEFAULT '',
  is_popular boolean NOT NULL DEFAULT false,
  is_enabled boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_pricing" ON pricing_plans;
CREATE POLICY "anon_select_pricing" ON pricing_plans FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_pricing" ON pricing_plans;
CREATE POLICY "anon_insert_pricing" ON pricing_plans FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_pricing" ON pricing_plans;
CREATE POLICY "anon_update_pricing" ON pricing_plans FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_pricing" ON pricing_plans;
CREATE POLICY "anon_delete_pricing" ON pricing_plans FOR DELETE TO anon, authenticated USING (true);

-- ── Inquiries ─────────────────────────────────────────────────
-- STRICTER: anon can only INSERT (public contact form).
-- Reads/updates/deletes are authenticated (admin) only.
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company text NOT NULL DEFAULT '',
  email text NOT NULL,
  phone text,
  project_type text NOT NULL DEFAULT '',
  budget text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  details text NOT NULL DEFAULT '',
  reference_url text NOT NULL DEFAULT '',
  target_platform text,
  duration text,
  status text NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','contacted','in_progress','completed','archived')),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone (public contact form) can submit an inquiry
DROP POLICY IF EXISTS "public_insert_inquiry" ON inquiries;
CREATE POLICY "public_insert_inquiry" ON inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can read, update, or delete inquiries
DROP POLICY IF EXISTS "admin_select_inquiry" ON inquiries;
CREATE POLICY "admin_select_inquiry" ON inquiries
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_update_inquiry" ON inquiries;
CREATE POLICY "admin_update_inquiry" ON inquiries
  FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_inquiry" ON inquiries;
CREATE POLICY "admin_delete_inquiry" ON inquiries
  FOR DELETE TO authenticated
  USING (true);

-- ── Testimonials ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  company text NOT NULL DEFAULT '',
  position text NOT NULL DEFAULT '',
  quote text NOT NULL DEFAULT '',
  avatar_url text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_testimonials" ON testimonials;
CREATE POLICY "anon_insert_testimonials" ON testimonials FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_testimonials" ON testimonials;
CREATE POLICY "anon_update_testimonials" ON testimonials FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_testimonials" ON testimonials;
CREATE POLICY "anon_delete_testimonials" ON testimonials FOR DELETE TO anon, authenticated USING (true);

-- ── Site content ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text UNIQUE NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_site_content" ON site_content;
CREATE POLICY "anon_select_site_content" ON site_content FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_site_content" ON site_content;
CREATE POLICY "anon_insert_site_content" ON site_content FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_site_content" ON site_content;
CREATE POLICY "anon_update_site_content" ON site_content FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_site_content" ON site_content;
CREATE POLICY "anon_delete_site_content" ON site_content FOR DELETE TO anon, authenticated USING (true);

-- =============================================================
-- SEED DATA
-- =============================================================

INSERT INTO projects (title, client, category, description, image_url, featured, published, sort_order) VALUES
('NEON FUTURE', 'VOLT Industries', 'Brand Film', 'Cinematic futuristic campaign created entirely with AI.', 'https://images.pexels.com/photos/35161171/pexels-photo-35161171.jpeg?auto=compress&cs=tinysrgb&w=1200', true, true, 1),
('ORIGIN', 'Lumière', 'Product Commercial', 'Luxury product film combining AI environments and cinematic storytelling.', 'https://images.pexels.com/photos/9202892/pexels-photo-9202892.jpeg?auto=compress&cs=tinysrgb&w=800', true, true, 2),
('DREAMSCAPE', 'Atelier Noir', 'Fashion Film', 'Experimental fashion campaign built around surreal AI-generated worlds.', 'https://images.pexels.com/photos/32321598/pexels-photo-32321598.jpeg?auto=compress&cs=tinysrgb&w=800', false, true, 3),
('BEYOND EARTH', 'Orbital Tech', 'Concept Film', 'Sci-fi cinematic experience created for a global technology brand.', 'https://images.pexels.com/photos/36941390/pexels-photo-36941390.jpeg?auto=compress&cs=tinysrgb&w=1200', true, true, 4),
('MIDNIGHT RUN', 'Apex Motors', 'Automotive', 'High-energy AI automotive commercial.', 'https://images.pexels.com/photos/28984433/pexels-photo-28984433.jpeg?auto=compress&cs=tinysrgb&w=800', false, true, 5),
('THE LAST LIGHT', 'Ember Pictures', 'Short Film', 'Emotional cinematic storytelling created with generative AI.', 'https://images.pexels.com/photos/19615558/pexels-photo-19615558.jpeg?auto=compress&cs=tinysrgb&w=800', false, true, 6)
ON CONFLICT DO NOTHING;

INSERT INTO services (name, description, icon, display_order, is_active) VALUES
('AI Commercials', 'Cinematic advertisements designed for brands, products, and campaigns.', 'Film', 1, true),
('AI Brand Films', 'High-concept visual storytelling that builds brand identity.', 'Clapperboard', 2, true),
('Product Videos', 'Premium product visualization without traditional production limitations.', 'Package', 3, true),
('Social Media Content', 'High-volume, scroll-stopping AI content for Instagram, TikTok, YouTube, and more.', 'Smartphone', 4, true),
('AI Music Videos', 'Experimental and cinematic music visuals powered by AI.', 'Music', 5, true),
('Concept & Pre-Visualization', 'Turn ideas, scripts, and concepts into cinematic visual experiences before production.', 'Lightbulb', 6, true),
('AI Character & World Creation', 'Build original characters, environments, and visual worlds.', 'Users', 7, true),
('Post-Production', 'Editing, sound design, color treatment, compositing, motion graphics, and final delivery.', 'Scissors', 8, true)
ON CONFLICT DO NOTHING;

INSERT INTO pricing_plans (name, price, tagline, features, cta_text, is_popular, is_enabled, sort_order) VALUES
('STARTER', '$499', 'For creators and small campaigns.', '["1 AI video","Up to 30 seconds","Creative concept","AI generation","Basic editing","1 revision","Social media delivery"]'::jsonb, 'Get Started', false, true, 1),
('STUDIO', '$1,499', 'Most Popular', '["Up to 3 AI videos","Up to 60 seconds each","Creative direction","Storyboarding","Advanced AI generation","Cinematic editing","Sound design","2 revisions","Multiple aspect ratios"]'::jsonb, 'Start a Project', true, true, 2),
('SIGNATURE', '$3,999+', 'For brands and major campaigns.', '["Custom campaign","Multiple videos","Full creative direction","Advanced cinematic AI production","Custom characters/worlds","Professional sound design","Motion graphics","Color grading","Multiple revisions","Dedicated creative support"]'::jsonb, 'Talk to Our Team', false, true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (client_name, company, position, quote, avatar_url, is_published, sort_order) VALUES
('Sarah Chen', 'VOLT Industries', 'VP of Marketing', 'AURA AI transformed our brand campaign into something that felt like a Hollywood production — at a fraction of the cost and timeline. The cinematic quality stunned our entire team.', 'https://images.pexels.com/photos/38197025/pexels-photo-38197025.jpeg?auto=compress&cs=tinysrgb&w=200', true, 1),
('Marcus Webb', 'Lumière', 'Creative Director', 'We needed a product film that felt premium and otherworldly. What they delivered exceeded every expectation. It became our highest-performing ad creative of the year.', 'https://images.pexels.com/photos/36687799/pexels-photo-36687799.jpeg?auto=compress&cs=tinysrgb&w=200', true, 2),
('Elena Rodriguez', 'Atelier Noir', 'Head of Brand', 'The level of artistic direction combined with AI generation is unmatched. They don''t just use AI — they direct it like filmmakers. That difference shows in every frame.', 'https://images.pexels.com/photos/36623225/pexels-photo-36623225.jpeg?auto=compress&cs=tinysrgb&w=200', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO site_content (section, data) VALUES
('hero', '{"badge": "AI Video Production Studio", "headline1": "AI-Powered Films.", "headline2": "Human-Level Creativity.", "subheading": "From concept to final frame, we create cinematic AI videos that make brands impossible to ignore.", "primaryCta": "Start a Project", "secondaryCta": "Explore Our Work", "indicators": ["AI Films", "Commercials", "Product Videos", "Social Content"]}'::jsonb),
('stats', '[{"value": 10, "suffix": "x", "label": "Faster Ideation"}, {"value": 50, "suffix": "+", "label": "Creative Projects"}, {"value": 100, "suffix": "+", "label": "AI Films Created"}, {"value": 0, "suffix": "", "label": "Global Creative Reach", "text": "Global"}]'::jsonb),
('about', '{"heading1": "We Make Ideas", "heading2": "Look Impossible.", "paragraph1": "AURA AI is a creative technology studio where artificial intelligence meets filmmaking. We combine AI, film, design, technology, and storytelling to create visual experiences that would traditionally require large production teams and budgets.", "paragraph2": "Our team of directors, designers, and AI specialists work together to craft every project with intention — from the first concept sketch to the final color grade.", "ctaText": "Meet the Studio"}'::jsonb),
('footer', '{"description": "AI-powered cinematic production for brands, creators, and ambitious ideas.", "email": "hello@auraai.studio", "location": "Remote · Worldwide", "copyright": "© 2026 AURA AI. All rights reserved."}'::jsonb),
('social', '{"instagram": "#", "youtube": "#", "linkedin": "#", "twitter": "#"}'::jsonb)
ON CONFLICT (section) DO NOTHING;

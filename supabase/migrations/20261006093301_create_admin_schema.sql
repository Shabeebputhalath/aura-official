/*
# AURA AI Admin Dashboard Schema

1. New Tables
- `projects` — AI video projects showcased on the website. Columns: id, title, client, category, description, image_url, project_url, featured (bool), published (bool), sort_order (int), created_at, updated_at.
- `services` — Service offerings listed on the website. Columns: id, name, description, icon (text key for lucide icon), display_order (int), is_active (bool), created_at, updated_at.
- `pricing_plans` — Pricing tiers for the website. Columns: id, name, price, tagline, features (jsonb), cta_text, is_popular (bool), is_enabled (bool), sort_order (int), created_at, updated_at.
- `inquiries` — Contact form submissions from the website. Columns: id, full_name, company, email, project_type, budget, timeline, details, reference_url, created_at, status (text: new/contacted/in_progress/completed/archived).
- `testimonials` — Client testimonials. Columns: id, client_name, company, position, quote, avatar_url, is_published (bool), sort_order (int), created_at, updated_at.
- `site_content` — Editable homepage content (hero, stats, about, footer, social). Single-row key-value style table with a `section` key and jsonb `data` value. Columns: id, section (text unique), data (jsonb), updated_at.

2. Security
- Enable RLS on all tables.
- Policies: allow anon + authenticated full CRUD on all tables (single-tenant admin panel, no auth screen required per instructions — the admin panel manages data, and the website reads it).
- All data is intentionally shared/public for this admin-managed content app.

3. Seed Data
- Inserts initial projects (6), services (8), pricing plans (3), testimonials (3), and site_content sections matching the website.
*/

-- Projects
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

DROP POLICY IF EXISTS "anon_crud_projects_select" ON projects;
CREATE POLICY "anon_crud_projects_select" ON projects FOR SELECT
TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_crud_projects_insert" ON projects;
CREATE POLICY "anon_crud_projects_insert" ON projects FOR INSERT
TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_projects_update" ON projects;
CREATE POLICY "anon_crud_projects_update" ON projects FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_projects_delete" ON projects;
CREATE POLICY "anon_crud_projects_delete" ON projects FOR DELETE
TO anon, authenticated USING (true);

-- Services
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

DROP POLICY IF EXISTS "anon_crud_services_select" ON services;
CREATE POLICY "anon_crud_services_select" ON services FOR SELECT
TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_crud_services_insert" ON services;
CREATE POLICY "anon_crud_services_insert" ON services FOR INSERT
TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_services_update" ON services;
CREATE POLICY "anon_crud_services_update" ON services FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_services_delete" ON services;
CREATE POLICY "anon_crud_services_delete" ON services FOR DELETE
TO anon, authenticated USING (true);

-- Pricing plans
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

DROP POLICY IF EXISTS "anon_crud_pricing_select" ON pricing_plans;
CREATE POLICY "anon_crud_pricing_select" ON pricing_plans FOR SELECT
TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_crud_pricing_insert" ON pricing_plans;
CREATE POLICY "anon_crud_pricing_insert" ON pricing_plans FOR INSERT
TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_pricing_update" ON pricing_plans;
CREATE POLICY "anon_crud_pricing_update" ON pricing_plans FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_pricing_delete" ON pricing_plans;
CREATE POLICY "anon_crud_pricing_delete" ON pricing_plans FOR DELETE
TO anon, authenticated USING (true);

-- Inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company text NOT NULL DEFAULT '',
  email text NOT NULL,
  project_type text NOT NULL DEFAULT '',
  budget text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  details text NOT NULL DEFAULT '',
  reference_url text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_crud_inquiries_select" ON inquiries;
CREATE POLICY "anon_crud_inquiries_select" ON inquiries FOR SELECT
TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_crud_inquiries_insert" ON inquiries;
CREATE POLICY "anon_crud_inquiries_insert" ON inquiries FOR INSERT
TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_inquiries_update" ON inquiries;
CREATE POLICY "anon_crud_inquiries_update" ON inquiries FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_inquiries_delete" ON inquiries;
CREATE POLICY "anon_crud_inquiries_delete" ON inquiries FOR DELETE
TO anon, authenticated USING (true);

-- Testimonials
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

DROP POLICY IF EXISTS "anon_crud_testimonials_select" ON testimonials;
CREATE POLICY "anon_crud_testimonials_select" ON testimonials FOR SELECT
TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_crud_testimonials_insert" ON testimonials;
CREATE POLICY "anon_crud_testimonials_insert" ON testimonials FOR INSERT
TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_testimonials_update" ON testimonials;
CREATE POLICY "anon_crud_testimonials_update" ON testimonials FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_testimonials_delete" ON testimonials;
CREATE POLICY "anon_crud_testimonials_delete" ON testimonials FOR DELETE
TO anon, authenticated USING (true);

-- Site content (key-value by section)
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text UNIQUE NOT NULL,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_crud_site_content_select" ON site_content;
CREATE POLICY "anon_crud_site_content_select" ON site_content FOR SELECT
TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_crud_site_content_insert" ON site_content;
CREATE POLICY "anon_crud_site_content_insert" ON site_content FOR INSERT
TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_site_content_update" ON site_content;
CREATE POLICY "anon_crud_site_content_update" ON site_content FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_crud_site_content_delete" ON site_content;
CREATE POLICY "anon_crud_site_content_delete" ON site_content FOR DELETE
TO anon, authenticated USING (true);

-- Seed: Projects
INSERT INTO projects (title, client, category, description, image_url, featured, published, sort_order) VALUES
('NEON FUTURE', 'VOLT Industries', 'Brand Film', 'Cinematic futuristic campaign created entirely with AI.', 'https://images.pexels.com/photos/35161171/pexels-photo-35161171.jpeg?auto=compress&cs=tinysrgb&w=1200', true, true, 1),
('ORIGIN', 'Lumière', 'Product Commercial', 'Luxury product film combining AI environments and cinematic storytelling.', 'https://images.pexels.com/photos/9202892/pexels-photo-9202892.jpeg?auto=compress&cs=tinysrgb&w=800', true, true, 2),
('DREAMSCAPE', 'Atelier Noir', 'Fashion Film', 'Experimental fashion campaign built around surreal AI-generated worlds.', 'https://images.pexels.com/photos/32321598/pexels-photo-32321598.jpeg?auto=compress&cs=tinysrgb&w=800', false, true, 3),
('BEYOND EARTH', 'Orbital Tech', 'Concept Film', 'Sci-fi cinematic experience created for a global technology brand.', 'https://images.pexels.com/photos/36941390/pexels-photo-36941390.jpeg?auto=compress&cs=tinysrgb&w=1200', true, true, 4),
('MIDNIGHT RUN', 'Apex Motors', 'Automotive', 'High-energy AI automotive commercial.', 'https://images.pexels.com/photos/28984433/pexels-photo-28984433.jpeg?auto=compress&cs=tinysrgb&w=800', false, true, 5),
('THE LAST LIGHT', 'Ember Pictures', 'Short Film', 'Emotional cinematic storytelling created with generative AI.', 'https://images.pexels.com/photos/19615558/pexels-photo-19615558.jpeg?auto=compress&cs=tinysrgb&w=800', false, true, 6)
ON CONFLICT DO NOTHING;

-- Seed: Services
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

-- Seed: Pricing plans
INSERT INTO pricing_plans (name, price, tagline, features, cta_text, is_popular, is_enabled, sort_order) VALUES
('STARTER', '$499', 'For creators and small campaigns.', '["1 AI video","Up to 30 seconds","Creative concept","AI generation","Basic editing","1 revision","Social media delivery"]'::jsonb, 'Get Started', false, true, 1),
('STUDIO', '$1,499', 'Most Popular', '["Up to 3 AI videos","Up to 60 seconds each","Creative direction","Storyboarding","Advanced AI generation","Cinematic editing","Sound design","2 revisions","Multiple aspect ratios"]'::jsonb, 'Start a Project', true, true, 2),
('SIGNATURE', '$3,999+', 'For brands and major campaigns.', '["Custom campaign","Multiple videos","Full creative direction","Advanced cinematic AI production","Custom characters/worlds","Professional sound design","Motion graphics","Color grading","Multiple revisions","Dedicated creative support"]'::jsonb, 'Talk to Our Team', false, true, 3)
ON CONFLICT DO NOTHING;

-- Seed: Testimonials
INSERT INTO testimonials (client_name, company, position, quote, avatar_url, is_published, sort_order) VALUES
('Sarah Chen', 'VOLT Industries', 'VP of Marketing', 'AURA AI transformed our brand campaign into something that felt like a Hollywood production — at a fraction of the cost and timeline. The cinematic quality stunned our entire team.', 'https://images.pexels.com/photos/38197025/pexels-photo-38197025.jpeg?auto=compress&cs=tinysrgb&w=200', true, 1),
('Marcus Webb', 'Lumière', 'Creative Director', 'We needed a product film that felt premium and otherworldly. What they delivered exceeded every expectation. It became our highest-performing ad creative of the year.', 'https://images.pexels.com/photos/36687799/pexels-photo-36687799.jpeg?auto=compress&cs=tinysrgb&w=200', true, 2),
('Elena Rodriguez', 'Atelier Noir', 'Head of Brand', 'The level of artistic direction combined with AI generation is unmatched. They don''t just use AI — they direct it like filmmakers. That difference shows in every frame.', 'https://images.pexels.com/photos/36623225/pexels-photo-36623225.jpeg?auto=compress&cs=tinysrgb&w=200', true, 3)
ON CONFLICT DO NOTHING;

-- Seed: Site content
INSERT INTO site_content (section, data) VALUES
('hero', '{"badge": "AI Video Production Studio", "headline1": "AI-Powered Films.", "headline2": "Human-Level Creativity.", "subheading": "From concept to final frame, we create cinematic AI videos that make brands impossible to ignore.", "primaryCta": "Start a Project", "secondaryCta": "Explore Our Work", "indicators": ["AI Films", "Commercials", "Product Videos", "Social Content"]}'::jsonb),
('stats', '[{"value": 10, "suffix": "x", "label": "Faster Ideation"}, {"value": 50, "suffix": "+", "label": "Creative Projects"}, {"value": 100, "suffix": "+", "label": "AI Films Created"}, {"value": 0, "suffix": "", "label": "Global Creative Reach", "text": "Global"}]'::jsonb),
('about', '{"heading1": "We Make Ideas", "heading2": "Look Impossible.", "paragraph1": "AURA AI is a creative technology studio where artificial intelligence meets filmmaking. We combine AI, film, design, technology, and storytelling to create visual experiences that would traditionally require large production teams and budgets.", "paragraph2": "Our team of directors, designers, and AI specialists work together to craft every project with intention — from the first concept sketch to the final color grade.", "ctaText": "Meet the Studio"}'::jsonb),
('footer', '{"description": "AI-powered cinematic production for brands, creators, and ambitious ideas.", "email": "hello@auraai.studio", "location": "Remote · Worldwide", "copyright": "© 2026 AURA AI. All rights reserved."}'::jsonb),
('social', '{"instagram": "#", "youtube": "#", "linkedin": "#", "twitter": "#"}'::jsonb)
ON CONFLICT (section) DO NOTHING;


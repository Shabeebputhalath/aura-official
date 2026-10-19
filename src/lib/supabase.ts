import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  image_url: string;
  project_url: string;
  embed_code: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta_text: string;
  is_popular: boolean;
  is_enabled: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type InquiryStatus = 'new' | 'contacted' | 'in_progress' | 'completed' | 'archived';

export interface Inquiry {
  id: string;
  full_name: string;
  company: string;
  email: string;
  phone: string | null;
  project_type: string;
  budget: string;
  timeline: string;
  details: string;
  reference_url: string;
  target_platform: string | null;
  duration: string | null;
  status: InquiryStatus;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  position: string;
  quote: string;
  avatar_url: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteContent {
  id: string;
  section: string;
  data: Record<string, unknown>;
  updated_at: string;
}

export interface Capability {
  id: string;
  label: string;
  image_url: string;
  video_url: string | null;
  embed_code: string | null;
  instagram_embed: string | null;
  sort_order: number;
  is_active: boolean;
  href?: string;
  created_at: string;
  updated_at: string;
}


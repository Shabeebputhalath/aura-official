-- Add instagram_embed column to capabilities table
-- Run in Supabase SQL Editor

ALTER TABLE capabilities ADD COLUMN IF NOT EXISTS instagram_embed text;

-- Add embed_code column to capabilities table
-- Run in Supabase SQL Editor if the table already exists

ALTER TABLE capabilities ADD COLUMN IF NOT EXISTS embed_code text;

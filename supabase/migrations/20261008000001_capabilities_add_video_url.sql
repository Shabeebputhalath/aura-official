-- Add video_url column to capabilities table
-- Run this in Supabase SQL Editor if the table already exists

ALTER TABLE capabilities ADD COLUMN IF NOT EXISTS video_url text;

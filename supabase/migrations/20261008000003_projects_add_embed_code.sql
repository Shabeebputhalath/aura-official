-- Add embed_code column to projects table
-- Run in Supabase SQL Editor

ALTER TABLE projects ADD COLUMN IF NOT EXISTS embed_code text;

-- Migration: 007 - Add Strategy Details
-- Description: Adds manual success rate and detailed documentation fields to strategies table
ALTER TABLE public.strategies
ADD COLUMN IF NOT EXISTS success_rate TEXT DEFAULT 'Medium',
    ADD COLUMN IF NOT EXISTS description TEXT,
    ADD COLUMN IF NOT EXISTS required_parameters TEXT,
    ADD COLUMN IF NOT EXISTS execution_method TEXT,
    ADD COLUMN IF NOT EXISTS holding_period TEXT,
    ADD COLUMN IF NOT EXISTS exclusions TEXT,
    ADD COLUMN IF NOT EXISTS trading_guide TEXT;
-- Optional: Add check constraint for success_rate if desired, but user said "Manual", so free text or broad categories are fine.
-- We'll keep it as TEXT for flexibility as requested "Trader has to add it by his experience".
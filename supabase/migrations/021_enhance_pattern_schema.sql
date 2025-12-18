-- Migration: 021 - Enhance Pattern Schema
-- Description: Add detailed columns for market context, invalidation, etc., and change success_ratio to TEXT.

-- 1. Change success_ratio to TEXT
-- We cast existing numeric values to text first.
ALTER TABLE public.learning_patterns
ALTER COLUMN success_ratio TYPE TEXT USING success_ratio::TEXT;

-- 2. Add new columns for detailed breakdown
ALTER TABLE public.learning_patterns
ADD COLUMN IF NOT EXISTS market_context TEXT,
ADD COLUMN IF NOT EXISTS invalidation_conditions TEXT,
ADD COLUMN IF NOT EXISTS timeframe_suitability TEXT,
ADD COLUMN IF NOT EXISTS volume_confirmation TEXT,
ADD COLUMN IF NOT EXISTS difficulty_level TEXT;

-- 3. Comment on columns for clarity
COMMENT ON COLUMN public.learning_patterns.market_context IS 'Best Market Conditions (e.g. Extended uptrend)';
COMMENT ON COLUMN public.learning_patterns.invalidation_conditions IS 'When This Pattern Fails (e.g. Forms in chop)';
COMMENT ON COLUMN public.learning_patterns.timeframe_suitability IS 'Timeframe Suitability (e.g. H1, H4, Daily)';
COMMENT ON COLUMN public.learning_patterns.volume_confirmation IS 'Volume Confirmation criteria';
COMMENT ON COLUMN public.learning_patterns.difficulty_level IS 'Difficulty Level (e.g. Beginner, Intermediate)';

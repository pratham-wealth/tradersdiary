-- Migration: 004 - Add Strategy to Studies
-- Description: Link Studies to Strategies for better tracking
-- 1. Add strategy_id to studies
ALTER TABLE public.studies
ADD COLUMN IF NOT EXISTS strategy_id UUID REFERENCES public.strategies(id) ON DELETE
SET NULL;
-- 2. Create index for performance
CREATE INDEX IF NOT EXISTS idx_studies_strategy ON public.studies(strategy_id);
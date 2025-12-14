-- Migration: 003 - Workflow Updates
-- Description: Align schema with "Architecture" request (Strategy Rules, WatchList Strategy Link)
-- 1. Update strategies table
ALTER TABLE public.strategies
ADD COLUMN IF NOT EXISTS timeframe TEXT,
    ADD COLUMN IF NOT EXISTS risk_profile TEXT;
-- 2. Update watch_list table
ALTER TABLE public.watch_list
ADD COLUMN IF NOT EXISTS strategy_id UUID REFERENCES public.strategies(id) ON DELETE
SET NULL;
-- 3. Create index for performance
CREATE INDEX IF NOT EXISTS idx_watch_list_strategy ON public.watch_list(strategy_id);
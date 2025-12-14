-- Migration 009: Fundamental Screeners
-- Description: Table for storing stock screener criteria and codes.
CREATE TABLE IF NOT EXISTS public.fundamental_screeners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    -- "Quick Summary"
    criteria TEXT [],
    -- Array of strings for "Criteria's Used"
    code TEXT,
    -- "Screener Code"
    success_rate TEXT,
    -- "Likely Success Ratio" (e.g., "70-80%")
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- RLS Policies
ALTER TABLE public.fundamental_screeners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own screeners" ON public.fundamental_screeners FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own screeners" ON public.fundamental_screeners FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own screeners" ON public.fundamental_screeners FOR
UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own screeners" ON public.fundamental_screeners FOR DELETE USING (auth.uid() = user_id);
-- Trigger for updated_at
CREATE TRIGGER update_fundamental_screeners_updated_at BEFORE
UPDATE ON public.fundamental_screeners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
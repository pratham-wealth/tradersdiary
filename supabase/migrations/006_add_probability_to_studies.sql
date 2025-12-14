-- Migration: 006 - Add Probability to Studies
-- Description: Add probability field to studies for risk assessment categorization
-- 1. Add probability column to studies
ALTER TABLE public.studies
ADD COLUMN IF NOT EXISTS probability TEXT CHECK (
        probability IN (
            'HIGH',
            'MEDIUM',
            'LOW',
            'RISKY',
            'WATCH_ONLY'
        )
    );
-- 2. Create index for filtering by probability
CREATE INDEX IF NOT EXISTS idx_studies_probability ON public.studies(probability);
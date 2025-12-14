-- Migration 010: Update Studies Type Check Constraint
-- Description: Expand the accepted values for study_type to include new standarized categories.
-- Remove the old constraint
ALTER TABLE public.studies DROP CONSTRAINT IF EXISTS studies_study_type_check;
-- Add the new constraint with expanded values
ALTER TABLE public.studies
ADD CONSTRAINT studies_study_type_check CHECK (
        study_type IN (
            'TECHNICAL',
            'FUNDAMENTAL',
            'FUNDAMENTAL_ANALYSIS',
            'MARKET_ANALYSIS',
            'PATTERN',
            'OTHER',
            'CHART_PATTERN',
            'TECHNICAL_SETUP',
            'STOCK_ANALYSIS',
            'NEWS_IMPACT',
            'SECTOR_STUDY'
        )
    );
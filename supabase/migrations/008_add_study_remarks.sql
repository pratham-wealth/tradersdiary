-- Migration 008: Add Remarks and Outcome Date to Studies
-- Description: Adds 'remarks' and 'outcome_date' columns to the 'studies' table.
ALTER TABLE public.studies
ADD COLUMN IF NOT EXISTS remarks TEXT,
    ADD COLUMN IF NOT EXISTS outcome_date TIMESTAMPTZ;
-- Ensure 'outcome' exists (idempotent check, though likely exists)
DO $$ BEGIN IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'studies'
        AND column_name = 'outcome'
) THEN
ALTER TABLE public.studies
ADD COLUMN outcome TEXT CHECK (outcome IN ('SUCCESS', 'FAILURE', 'NEUTRAL'));
END IF;
END $$;
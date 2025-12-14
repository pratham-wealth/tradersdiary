-- Migration: 005 - Add Price and Direction to Studies
-- Description: Add fields for detailed study tracking
ALTER TABLE public.studies
ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2),
    ADD COLUMN IF NOT EXISTS direction TEXT CHECK (direction IN ('LONG', 'SHORT', 'NEUTRAL')),
    ADD COLUMN IF NOT EXISTS percentage_change DECIMAL(5, 2);
-- Create index for filtering by direction
CREATE INDEX IF NOT EXISTS idx_studies_direction ON public.studies(direction);
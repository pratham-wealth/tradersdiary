-- Migration: 003 - Integrated Workflow
-- Description: Link WatchList to Studies, Track Study Status
-- 1. Add study_id to watch_list
ALTER TABLE public.watch_list
ADD COLUMN IF NOT EXISTS study_id UUID REFERENCES public.studies(id) ON DELETE
SET NULL;
-- 2. Add status to studies
ALTER TABLE public.studies
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'ARCHIVED'));
-- 3. Add outcome to studies (to track if analysis was successful)
ALTER TABLE public.studies
ADD COLUMN IF NOT EXISTS outcome TEXT CHECK (outcome IN ('SUCCESS', 'FAILURE', 'NEUTRAL'));
-- 4. Create index for performance
CREATE INDEX IF NOT EXISTS idx_watch_list_study ON public.watch_list(study_id);
CREATE INDEX IF NOT EXISTS idx_studies_status ON public.studies(status);
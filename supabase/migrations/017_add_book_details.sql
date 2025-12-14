-- Migration 017: Add Book Access Level and Price
-- Description: Support for Premium/Paid books and Access Levels.
ALTER TABLE public.user_books
ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'free' CHECK (access_level IN ('free', 'premium', 'paid')),
    ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2) DEFAULT 0.00;
-- Index for filtering
CREATE INDEX IF NOT EXISTS idx_user_books_access ON public.user_books(access_level);
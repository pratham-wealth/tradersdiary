-- Migration: 006 - Global Content & Ads
-- Description: Add columns for Global/Premium content and create Ads table.
-- 1. Updates to user_books
ALTER TABLE public.user_books
ADD COLUMN IF NOT EXISTS is_global BOOLEAN DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'free';
-- 'free', 'premium'
-- Index for faster filtering
CREATE INDEX IF NOT EXISTS idx_user_books_global ON public.user_books(is_global);
-- 2. Update user_books RLS to allow reading Global Items
DROP POLICY IF EXISTS "Users can view own books" ON public.user_books;
CREATE POLICY "Users can view own or global books" ON public.user_books FOR
SELECT USING (
        auth.uid() = user_id
        OR is_global = true
    );
-- Note: Insert/Delete/Update policies remain "Own Only" so normal users can't mess with Global items.
-- Admins will need to use the Service Role or be the 'owner' (user_id = admin_id).
-- 3. Create Ads Table
CREATE TABLE IF NOT EXISTS public.ads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    target_url TEXT,
    location TEXT NOT NULL,
    -- 'dashboard_top', 'sidebar_bottom'
    title TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- 4. Ads RLS
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Active Ads" ON public.ads FOR
SELECT TO public USING (is_active = true);
-- 5. Storage Policy Update for 'books' bucket
-- To allow downloading global books, we need to relax the 'owner only' rule for SELECT.
-- We'll allow SELECT if the user is authenticated. 
-- For finer control, we'd check DB, but storage policies with cross-table selects are slow.
-- Since the file URL is somewhat secret/signed, giving auth users READ access to the 'books' bucket is a pragmatic trade-off.
DROP POLICY IF EXISTS "Users can view own books files" ON storage.objects;
CREATE POLICY "Authenticated users can view book files" ON storage.objects FOR
SELECT TO authenticated USING (bucket_id = 'books');
-- (Keep Insert/Delete strict to owner)
-- "Authenticated Users can upload books" -> Already exists (Owner check)
-- "Users can delete own books files" -> Already exists (Owner check)
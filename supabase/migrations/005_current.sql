-- Migration: 005 - Library Books
-- Description: Create table for User Books and Storage Buckets
-- 1. Create user_books table
CREATE TABLE IF NOT EXISTS public.user_books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    title TEXT NOT NULL,
    author TEXT,
    description TEXT,
    pdf_url TEXT NOT NULL,
    cover_url TEXT,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 2. Enable RLS
ALTER TABLE public.user_books ENABLE ROW LEVEL SECURITY;
-- 3. App Policies
CREATE POLICY "Users can view own books" ON public.user_books FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own books" ON public.user_books FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own books" ON public.user_books FOR DELETE USING (auth.uid() = user_id);
-- 4. Storage Buckets initialization
-- Note: We insert into storage.buckets if they don't exist.
INSERT INTO storage.buckets (id, name, public)
VALUES ('books', 'books', false) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public)
VALUES ('book_covers', 'book_covers', true) ON CONFLICT (id) DO NOTHING;
-- 5. Storage Policies for 'books' (Private)
CREATE POLICY "Authenticated Users can upload books" ON storage.objects FOR
INSERT TO authenticated WITH CHECK (
        bucket_id = 'books'
        AND auth.uid() = owner
    );
CREATE POLICY "Users can view own books files" ON storage.objects FOR
SELECT TO authenticated USING (
        bucket_id = 'books'
        AND auth.uid() = owner
    );
CREATE POLICY "Users can delete own books files" ON storage.objects FOR DELETE TO authenticated USING (
    bucket_id = 'books'
    AND auth.uid() = owner
);
-- 6. Storage Policies for 'book_covers' (Public Read, Auth Write)
CREATE POLICY "Authenticated Users can upload covers" ON storage.objects FOR
INSERT TO authenticated WITH CHECK (
        bucket_id = 'book_covers'
        AND auth.uid() = owner
    );
CREATE POLICY "Anyone can view covers" ON storage.objects FOR
SELECT TO public USING (bucket_id = 'book_covers');
CREATE POLICY "Users can delete own covers" ON storage.objects FOR DELETE TO authenticated USING (
    bucket_id = 'book_covers'
    AND auth.uid() = owner
);
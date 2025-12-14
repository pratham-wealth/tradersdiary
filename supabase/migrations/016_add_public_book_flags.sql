-- Migration 016: Add Public Book Flags
-- Description: Allow creating global/public books visible to all users.
ALTER TABLE public.user_books
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE;
-- Update RLS Policy for viewing books
-- Drop existing select policy to replace it
DROP POLICY IF EXISTS "Users can view own books" ON public.user_books;
CREATE POLICY "Users can view own and public books" ON public.user_books FOR
SELECT USING (
        auth.uid() = user_id
        OR is_public = true
    );
-- Note: Insert/Update/Delete still restricted to owner (user_id).
-- Admins will use Service Role to bypass this or we can add specific Admin policies.
-- In our Implementation, Admin Dashboard will use Service Key, so no extra policy needed for writes.
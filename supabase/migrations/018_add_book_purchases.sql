-- Migration 018: Add Book Purchases
-- Description: Track user purchases of individual books.
CREATE TABLE IF NOT EXISTS public.book_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES public.user_books(id) ON DELETE CASCADE,
    purchased_at TIMESTAMPTZ DEFAULT NOW(),
    price_paid DECIMAL(10, 2) NOT NULL,
    transaction_id TEXT,
    -- Optional linkage to payments table if unified
    CONSTRAINT unique_user_book_purchase UNIQUE(user_id, book_id)
);
-- Index
CREATE INDEX IF NOT EXISTS idx_book_purchases_user ON public.book_purchases(user_id);
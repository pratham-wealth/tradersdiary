-- Migration 019: Add USD Price for Books
-- Description: Add separate price column for International users (PayPal).
ALTER TABLE public.user_books
ADD COLUMN IF NOT EXISTS price_usd DECIMAL(10, 2) DEFAULT 0.00;
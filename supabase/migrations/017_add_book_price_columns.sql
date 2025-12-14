-- Migration 017: Add Price Columns to User Books
-- Description: Add price and price_usd columns to user_books table for paid content.
ALTER TABLE public.user_books
ADD COLUMN IF NOT EXISTS price NUMERIC DEFAULT 0,
    ADD COLUMN IF NOT EXISTS price_usd NUMERIC DEFAULT 0,
    ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'free';
-- 'free', 'premium', 'paid'
-- Explanation:
-- price: Price in INR (or base currency)
-- price_usd: Price in USD
-- access_level: helper to quickly filter free/paid/premium items without inferring from price
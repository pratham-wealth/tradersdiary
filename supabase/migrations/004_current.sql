-- Migration: 004 - Learning Patterns
-- Description: Create table for Chart and Candlestick patterns
CREATE TABLE IF NOT EXISTS public.learning_patterns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT CHECK (type IN ('CHART', 'CANDLESTICK')),
    group_name TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    understanding TEXT,
    -- detailed explanation
    trading_rules TEXT,
    success_ratio DECIMAL(5, 2),
    image_url TEXT,
    video_url TEXT,
    is_premium BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Enable RLS (Read only for users)
ALTER TABLE public.learning_patterns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view patterns" ON public.learning_patterns FOR
SELECT USING (auth.role() = 'authenticated');
-- Insert Sample Data (Chart Patterns)
INSERT INTO public.learning_patterns (
        type,
        group_name,
        name,
        description,
        understanding,
        trading_rules,
        success_ratio,
        is_premium
    )
VALUES (
        'CHART',
        'Triangle Patterns',
        'Ascending Triangle',
        'A bullish continuation pattern characterized by a flat upper trendline and a rising lower trendline.',
        'Buyers are becoming more aggressive, making higher lows, while sellers are holding a resistance level. Eventually, buyers overwhelm sellers and price breakouts.',
        '1. Enter on a breakout above the upper resistance.\n2. Stop loss below the recent swing low.\n3. Target is the height of the triangle projected upward.',
        72.5,
        TRUE
    ),
    (
        'CHART',
        'Triangle Patterns',
        'Descending Triangle',
        'A bearish continuation pattern characterized by a flat lower trendline and a falling upper trendline.',
        'Sellers are becoming more aggressive, making lower highs, while buyers are holding a support level. Eventually, sellers overwhelm buyers.',
        '1. Enter on a breakdown below the lower support.\n2. Stop loss above the recent swing high.\n3. Target is the height of the triangle projected downward.',
        68.0,
        TRUE
    );
-- Insert Sample Data (Candlestick Patterns)
INSERT INTO public.learning_patterns (
        type,
        group_name,
        name,
        description,
        understanding,
        trading_rules,
        success_ratio,
        is_premium
    )
VALUES (
        'CANDLESTICK',
        'Single Candle Patterns',
        'Hammer',
        'A bullish reversal pattern formed by a small body and a long lower wick.',
        'Shows that sellers pushed price down, but buyers rejected the lower prices and pushed it back up to close near the open.',
        '1. Look for this at the bottom of a downtrend.\n2. Enter on the break of the high of the hammer.\n3. Stop loss below the low of the wick.',
        65.0,
        TRUE
    ),
    (
        'CANDLESTICK',
        'Single Candle Patterns',
        'Shooting Star',
        'A bearish reversal pattern formed by a small body and a long upper wick.',
        'Shows that buyers pushed price up, but sellers rejected the higher prices and pushed it back down to close near the open.',
        '1. Look for this at the top of an uptrend.\n2. Enter on the break of the low of the star.\n3. Stop loss above the high of the wick.',
        63.5,
        TRUE
    );
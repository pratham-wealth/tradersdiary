-- Migration: 015 - Add Radar Date to Trades
-- Description: Adds radar_date column to track when a trade was identified before entry

ALTER TABLE public.trades 
ADD COLUMN IF NOT EXISTS radar_date TIMESTAMPTZ DEFAULT NOW();

-- Create index for performance on date filtering including radar_date if needed
CREATE INDEX IF NOT EXISTS idx_trades_radar_date ON public.trades(radar_date);

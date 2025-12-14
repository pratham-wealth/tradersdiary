-- TradeNote Database Schema
-- Migration: 001 - Initial Schema
-- Description: Create core tables for traders study journal
-- ============================================
-- TABLE: user_settings
-- Extends Supabase auth.users with app preferences
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_settings (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    morning_notification_time TIME DEFAULT '08:00',
    default_view TEXT DEFAULT 'studies',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- ============================================
-- TABLE: strategies (The Vault)
-- Stores trading strategies with rules checklist
-- ============================================
CREATE TABLE IF NOT EXISTS public.strategies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    rules TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_strategy UNIQUE(user_id, name)
);
-- ============================================
-- TABLE: studies (The Watchlist)
-- Pre-trade planning and analysis
-- ============================================
CREATE TABLE IF NOT EXISTS public.studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    instrument TEXT NOT NULL,
    current_price DECIMAL(10, 2),
    direction TEXT NOT NULL CHECK (direction IN ('LONG', 'SHORT')),
    entry_price DECIMAL(10, 2),
    stop_loss DECIMAL(10, 2),
    target_price DECIMAL(10, 2),
    reason_note TEXT,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONVERTED', 'ARCHIVED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- ============================================
-- TABLE: trades (The Journal)
-- Actual trades taken (from studies or direct entry)
-- ============================================
CREATE TABLE IF NOT EXISTS public.trades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    study_id UUID REFERENCES public.studies(id) ON DELETE
    SET NULL,
        strategy_id UUID REFERENCES public.strategies(id) ON DELETE
    SET NULL,
        instrument TEXT NOT NULL,
        direction TEXT NOT NULL CHECK (direction IN ('LONG', 'SHORT')),
        entry_date TIMESTAMPTZ DEFAULT NOW(),
        entry_price DECIMAL(10, 2) NOT NULL,
        exit_price DECIMAL(10, 2),
        stop_loss DECIMAL(10, 2),
        target_price DECIMAL(10, 2),
        outcome TEXT DEFAULT 'OPEN' CHECK (
            outcome IN (
                'OPEN',
                'WIN',
                'LOSS',
                'BREAKEVEN',
                'MANUAL_EXIT'
            )
        ),
        pnl_points DECIMAL(10, 2),
        notes TEXT,
        tags TEXT [],
        image_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- ============================================
-- INDEXES for Performance
-- ============================================
-- Studies: Filter by user and status (PENDING studies for morning review)
CREATE INDEX idx_studies_user_status ON public.studies(user_id, status);
-- Trades: Reverse chronological list for journal view
CREATE INDEX idx_trades_user_date ON public.trades(user_id, entry_date DESC);
-- Trades: Group by strategy for analytics
CREATE INDEX idx_trades_strategy ON public.trades(strategy_id)
WHERE strategy_id IS NOT NULL;
-- Strategies: User-specific strategy lookup
CREATE INDEX idx_strategies_user ON public.strategies(user_id);
-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
-- User Settings Policies
CREATE POLICY "Users can view own settings" ON public.user_settings FOR
SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own settings" ON public.user_settings FOR
INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own settings" ON public.user_settings FOR
UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can delete own settings" ON public.user_settings FOR DELETE USING (auth.uid() = id);
-- Strategies Policies
CREATE POLICY "Users can view own strategies" ON public.strategies FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own strategies" ON public.strategies FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own strategies" ON public.strategies FOR
UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own strategies" ON public.strategies FOR DELETE USING (auth.uid() = user_id);
-- Studies Policies
CREATE POLICY "Users can view own studies" ON public.studies FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own studies" ON public.studies FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own studies" ON public.studies FOR
UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own studies" ON public.studies FOR DELETE USING (auth.uid() = user_id);
-- Trades Policies
CREATE POLICY "Users can view own trades" ON public.trades FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own trades" ON public.trades FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own trades" ON public.trades FOR
UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own trades" ON public.trades FOR DELETE USING (auth.uid() = user_id);
-- ============================================
-- TRIGGERS for updated_at timestamps
-- ============================================
-- Create trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Apply to all tables
CREATE TRIGGER update_user_settings_updated_at BEFORE
UPDATE ON public.user_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_strategies_updated_at BEFORE
UPDATE ON public.strategies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_studies_updated_at BEFORE
UPDATE ON public.studies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_trades_updated_at BEFORE
UPDATE ON public.trades FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
-- TradeNote Database Schema (Revised)
-- Migration: 002 - Complete Schema with Payments
-- Description: Full schema with watch list, diary, payments, and subscriptions
-- ============================================
-- TABLE: user_settings
-- Extends Supabase auth.users with app preferences
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_settings (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    country_code TEXT DEFAULT 'IN',
    payment_gateway TEXT DEFAULT 'razorpay' CHECK (
        payment_gateway IN ('razorpay', 'stripe', 'paypal')
    ),
    -- Subscription fields
    subscription_id TEXT,
    subscription_status TEXT DEFAULT 'trial' CHECK (
        subscription_status IN ('trial', 'active', 'cancelled', 'expired')
    ),
    plan_type TEXT DEFAULT 'basic' CHECK (plan_type IN ('basic', 'pro')),
    subscription_start DATE,
    subscription_end DATE,
    -- Usage limits (based on plan)
    monthly_trades_limit INTEGER DEFAULT 100,
    monthly_studies_limit INTEGER DEFAULT 20,
    watch_list_limit INTEGER DEFAULT 10,
    storage_limit_mb INTEGER DEFAULT 50,
    -- App preferences
    morning_notification_time TIME DEFAULT '08:00',
    default_view TEXT DEFAULT 'dashboard',
    theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- ============================================
-- TABLE: strategies (The Vault)
-- Trading strategies with rules checklist
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
-- TABLE: watch_list (Trades on Watch)
-- Monitor instruments with levels and breakouts
-- ============================================
CREATE TABLE IF NOT EXISTS public.watch_list (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    instrument TEXT NOT NULL,
    current_price DECIMAL(10, 2),
    direction TEXT CHECK (direction IN ('LONG', 'SHORT')),
    entry_level DECIMAL(10, 2),
    stop_loss DECIMAL(10, 2),
    target_price DECIMAL(10, 2),
    breakout_level DECIMAL(10, 2),
    notes TEXT,
    status TEXT DEFAULT 'WATCHING' CHECK (status IN ('WATCHING', 'CLOSED')),
    alert_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- ============================================
-- TABLE: diary_entries (Daily Planning)
-- Daily journal with things to do and analysis
-- ============================================
CREATE TABLE IF NOT EXISTS public.diary_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    things_to_do JSONB DEFAULT '[]'::jsonb,
    -- Array of {text: string, completed: boolean}
    market_analysis TEXT,
    notes TEXT,
    mood TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_diary_date UNIQUE(user_id, entry_date)
);
-- ============================================
-- TABLE: studies (Research & Analysis)
-- Market research and technical/fundamental analysis
-- ============================================
CREATE TABLE IF NOT EXISTS public.studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    instrument TEXT,
    study_type TEXT CHECK (
        study_type IN (
            'TECHNICAL',
            'FUNDAMENTAL',
            'MARKET_ANALYSIS',
            'PATTERN',
            'OTHER'
        )
    ),
    content TEXT,
    images TEXT [],
    -- Array of image URLs
    tags TEXT [],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- ============================================
-- TABLE: trades (The Journal)
-- Actual trades taken (manually logged)
-- ============================================
CREATE TABLE IF NOT EXISTS public.trades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    watch_list_id UUID REFERENCES public.watch_list(id) ON DELETE
    SET NULL,
        study_id UUID REFERENCES public.studies(id) ON DELETE
    SET NULL,
        strategy_id UUID REFERENCES public.strategies(id) ON DELETE
    SET NULL,
        instrument TEXT NOT NULL,
        direction TEXT NOT NULL CHECK (direction IN ('LONG', 'SHORT')),
        entry_date TIMESTAMPTZ DEFAULT NOW(),
        entry_price DECIMAL(10, 2) NOT NULL,
        exit_date TIMESTAMPTZ,
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
        pnl_currency DECIMAL(10, 2),
        notes TEXT,
        tags TEXT [],
        images TEXT [],
        -- Array of image URLs
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- ============================================
-- TABLE: payments
-- Payment transaction history
-- ============================================
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    payment_gateway TEXT NOT NULL CHECK (
        payment_gateway IN ('razorpay', 'stripe', 'paypal')
    ),
    gateway_payment_id TEXT UNIQUE,
    gateway_order_id TEXT,
    gateway_subscription_id TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    plan_type TEXT NOT NULL CHECK (plan_type IN ('basic', 'pro')),
    payment_status TEXT DEFAULT 'pending' CHECK (
        payment_status IN ('pending', 'success', 'failed', 'refunded')
    ),
    payment_method TEXT,
    -- UPI, Card, NetBanking, etc.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- ============================================
-- INDEXES for Performance
-- ============================================
-- User settings
CREATE INDEX IF NOT EXISTS idx_user_settings_country ON public.user_settings(country_code);
CREATE INDEX IF NOT EXISTS idx_user_settings_subscription ON public.user_settings(subscription_status, plan_type);
-- Watch list
CREATE INDEX IF NOT EXISTS idx_watch_list_user_status ON public.watch_list(user_id, status);
CREATE INDEX IF NOT EXISTS idx_watch_list_alert ON public.watch_list(user_id, alert_enabled)
WHERE alert_enabled = true;
-- Diary entries
CREATE INDEX IF NOT EXISTS idx_diary_user_date ON public.diary_entries(user_id, entry_date DESC);
-- Studies
CREATE INDEX IF NOT EXISTS idx_studies_user ON public.studies(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_studies_type ON public.studies(user_id, study_type);
-- Trades
CREATE INDEX IF NOT EXISTS idx_trades_user_date ON public.trades(user_id, entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_trades_strategy ON public.trades(strategy_id)
WHERE strategy_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_trades_outcome ON public.trades(user_id, outcome);
-- Index on entry_date for monthly queries (simpler and works with any date filter)
CREATE INDEX IF NOT EXISTS idx_trades_entry_date ON public.trades(entry_date);
-- Strategies
CREATE INDEX IF NOT EXISTS idx_strategies_user ON public.strategies(user_id, is_active);
-- Payments
CREATE INDEX IF NOT EXISTS idx_payments_user ON public.payments(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_gateway_id ON public.payments(gateway_payment_id);
-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watch_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
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
-- Watch List Policies
CREATE POLICY "Users can view own watch list" ON public.watch_list FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own watch items" ON public.watch_list FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own watch items" ON public.watch_list FOR
UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own watch items" ON public.watch_list FOR DELETE USING (auth.uid() = user_id);
-- Diary Entries Policies
CREATE POLICY "Users can view own diary" ON public.diary_entries FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own diary" ON public.diary_entries FOR
INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own diary" ON public.diary_entries FOR
UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own diary" ON public.diary_entries FOR DELETE USING (auth.uid() = user_id);
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
-- Payments Policies
CREATE POLICY "Users can view own payments" ON public.payments FOR
SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service can insert payments" ON public.payments FOR
INSERT WITH CHECK (true);
-- Allow service role
CREATE POLICY "Service can update payments" ON public.payments FOR
UPDATE USING (true);
-- Allow service role
-- ============================================
-- TRIGGERS for updated_at timestamps
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Apply to all tables
CREATE TRIGGER update_user_settings_updated_at BEFORE
UPDATE ON public.user_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_strategies_updated_at BEFORE
UPDATE ON public.strategies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_watch_list_updated_at BEFORE
UPDATE ON public.watch_list FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_diary_entries_updated_at BEFORE
UPDATE ON public.diary_entries FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_studies_updated_at BEFORE
UPDATE ON public.studies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_trades_updated_at BEFORE
UPDATE ON public.trades FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE
UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
-- ============================================
-- FUNCTIONS for Plan Limits
-- ============================================
-- Function to check if user can add more trades this month
CREATE OR REPLACE FUNCTION public.can_add_trade(p_user_id UUID) RETURNS BOOLEAN AS $$
DECLARE v_plan_type TEXT;
v_limit INTEGER;
v_count INTEGER;
BEGIN -- Get user plan and limit
SELECT plan_type,
    monthly_trades_limit INTO v_plan_type,
    v_limit
FROM public.user_settings
WHERE id = p_user_id;
-- Pro plan has unlimited
IF v_plan_type = 'pro' THEN RETURN TRUE;
END IF;
-- Count trades this month
SELECT COUNT(*) INTO v_count
FROM public.trades
WHERE user_id = p_user_id
    AND DATE_TRUNC('month', entry_date) = DATE_TRUNC('month', NOW());
RETURN v_count < v_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Function to check if user can add more studies
CREATE OR REPLACE FUNCTION public.can_add_study(p_user_id UUID) RETURNS BOOLEAN AS $$
DECLARE v_plan_type TEXT;
v_limit INTEGER;
v_count INTEGER;
BEGIN
SELECT plan_type,
    monthly_studies_limit INTO v_plan_type,
    v_limit
FROM public.user_settings
WHERE id = p_user_id;
IF v_plan_type = 'pro' THEN RETURN TRUE;
END IF;
SELECT COUNT(*) INTO v_count
FROM public.studies
WHERE user_id = p_user_id;
RETURN v_count < v_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Function to check watch list limit
CREATE OR REPLACE FUNCTION public.can_add_watch_item(p_user_id UUID) RETURNS BOOLEAN AS $$
DECLARE v_plan_type TEXT;
v_limit INTEGER;
v_count INTEGER;
BEGIN
SELECT plan_type,
    watch_list_limit INTO v_plan_type,
    v_limit
FROM public.user_settings
WHERE id = p_user_id;
IF v_plan_type = 'pro' THEN RETURN TRUE;
END IF;
SELECT COUNT(*) INTO v_count
FROM public.watch_list
WHERE user_id = p_user_id
    AND status = 'WATCHING';
RETURN v_count < v_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
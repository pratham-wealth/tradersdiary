-- Migration 014: Fix Plan Constraints
-- Description: Explicitly allow 'free' and 'trial' in user_settings and payments
-- This ensures the new 'Starter Pass' (free) can be saved.
-- 1. Update user_settings
ALTER TABLE public.user_settings DROP CONSTRAINT IF EXISTS user_settings_plan_type_check;
ALTER TABLE public.user_settings
ADD CONSTRAINT user_settings_plan_type_check CHECK (
        plan_type IN ('free', 'basic', 'pro', 'premium', 'trial')
    );
-- 2. Update payments (to match)
ALTER TABLE public.payments DROP CONSTRAINT IF EXISTS payments_plan_type_check;
ALTER TABLE public.payments
ADD CONSTRAINT payments_plan_type_check CHECK (
        plan_type IN ('free', 'basic', 'pro', 'premium', 'trial')
    );
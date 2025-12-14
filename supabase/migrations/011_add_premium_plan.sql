-- Migration 011: Add Premium Plan
-- Description: Update check constraints to allow 'premium' plan type.
-- Update user_settings table
ALTER TABLE public.user_settings DROP CONSTRAINT IF EXISTS user_settings_plan_type_check;
ALTER TABLE public.user_settings
ADD CONSTRAINT user_settings_plan_type_check CHECK (plan_type IN ('basic', 'pro', 'premium'));
-- Update payments table
ALTER TABLE public.payments DROP CONSTRAINT IF EXISTS payments_plan_type_check;
ALTER TABLE public.payments
ADD CONSTRAINT payments_plan_type_check CHECK (plan_type IN ('basic', 'pro', 'premium'));
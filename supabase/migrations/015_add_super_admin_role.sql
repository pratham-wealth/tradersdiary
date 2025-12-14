-- Migration 015: Add Super Admin Role
-- Description: Add role column to user_settings to distinguish super_admins.
ALTER TABLE public.user_settings
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';
-- Add check constraint to ensure only valid roles
ALTER TABLE public.user_settings DROP CONSTRAINT IF EXISTS user_settings_role_check;
ALTER TABLE public.user_settings
ADD CONSTRAINT user_settings_role_check CHECK (role IN ('user', 'super_admin'));
-- Add index for faster role lookups
CREATE INDEX IF NOT EXISTS idx_user_settings_role ON public.user_settings(role);
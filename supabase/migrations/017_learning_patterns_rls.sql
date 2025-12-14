-- Migration: 017 - Fix Learning Patterns RLS for Admins
-- Description: Allow Admins to Insert/Update/Delete patterns
DROP POLICY IF EXISTS "Admins can manage patterns" ON public.learning_patterns;
CREATE POLICY "Admins can manage patterns" ON public.learning_patterns FOR ALL TO authenticated USING (
    EXISTS (
        SELECT 1
        FROM public.user_settings
        WHERE user_settings.id = auth.uid()
            AND user_settings.role = 'super_admin'
    )
);
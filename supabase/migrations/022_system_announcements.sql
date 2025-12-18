-- Migration: 022 - System Announcements
-- Description: Table for admin-posted announcements to appear on user dashboards.

CREATE TABLE IF NOT EXISTS public.system_announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'alert')),
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast lookup of active announcements
CREATE INDEX IF NOT EXISTS idx_announcements_active ON public.system_announcements(is_active) WHERE is_active = true;

-- RLS Policies
ALTER TABLE public.system_announcements ENABLE ROW LEVEL SECURITY;

-- Everyone can view active announcements
CREATE POLICY "Everyone can view active announcements" ON public.system_announcements
    FOR SELECT USING (is_active = true);

-- Only Admins can insert/update/delete (We assume service role or admin check logic in actions, 
-- but for RLS, we can restrict to authenticated users if we had an 'role' column, 
-- for now we allow authenticated inserts and rely on backend logic to ensure only admins call it)
-- Actually, let's just allow read for now. Writes will be done via Service Role or specific admin checks.

CREATE POLICY "Admins can manage announcements" ON public.system_announcements
    FOR ALL USING (auth.uid() IN (
        SELECT id FROM public.user_settings WHERE plan_type = 'admin' -- Hypothetical check, or just rely on server actions
    ));

-- Trigger for updated_at
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.system_announcements
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

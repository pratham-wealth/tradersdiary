'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface Announcement {
    id: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'alert';
    is_active: boolean;
    created_at: string;
}

export async function getLatestAnnouncement(): Promise<Announcement | null> {
    const supabase = await createClient();

    // Fetch the latest ACTIVE announcement
    const { data, error } = await supabase
        .from('system_announcements')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error || !data) {
        return null;
    }

    return data as Announcement;
}

export async function createAnnouncement(message: string, type: 'info' | 'warning' | 'success' | 'alert' = 'info') {
    // 1. Auth Check (Standard Client)
    const supabase = await createClient();

    // Try getUser first (more secure)
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('getUser failed:', userError);

        // Fallback to getSession (less secure but helps debug)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session?.user) {
            console.error('getSession failed:', sessionError);
            return { error: `Not Authenticated: ${userError?.message || sessionError?.message || 'No User'}` };
        }

        // If session works, use that user (Edge case where getUser fails but session exists)
        // ideally we shouldn't rely on this but to unblock the user:
        // const user = session.user; // Scope issue, let's just return error for now to see MESSAGE.
        return { error: `Auth Error (getUser): ${userError?.message}` };
    }

    // 2. Admin Operations (Service Role Client - Bypasses RLS)
    const adminSupabase = await createAdminClient();

    // 3. Deactivate all previous active announcements
    await adminSupabase
        .from('system_announcements')
        .update({ is_active: false })
        .eq('is_active', true);

    // 4. Insert new one
    const { error } = await adminSupabase
        .from('system_announcements')
        .insert({
            message,
            type,
            is_active: true,
            created_by: user.id
        });

    if (error) return { error: error.message };

    revalidatePath('/dashboard');
    return { success: true };
}

export async function deactivateAllAnnouncements() {
    const supabase = await createAdminClient();

    // Deactivate all
    const { error } = await supabase
        .from('system_announcements')
        .update({ is_active: false })
        .eq('is_active', true); // Optimize by only targeting active ones

    if (error) return { error: error.message };

    revalidatePath('/dashboard');
    return { success: true };
}

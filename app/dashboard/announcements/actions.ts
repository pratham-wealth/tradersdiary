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
    const supabase = await createAdminClient(); // Admin only
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Not authenticated' };

    // 1. Deactivate all previous active announcements (so only one shows at a time)
    await supabase
        .from('system_announcements')
        .update({ is_active: false })
        .eq('is_active', true);

    // 2. Insert new one
    const { error } = await supabase
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

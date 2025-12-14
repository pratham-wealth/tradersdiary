'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateSettings(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Not authenticated' };

    const theme = formData.get('theme') as string;
    const defaultView = formData.get('defaultView') as string;
    const morningNotificationTime = formData.get('morningNotificationTime') as string;

    const { error } = await supabase
        .from('user_settings')
        .upsert({
            id: user.id,
            theme,
            default_view: defaultView,
            morning_notification_time: morningNotificationTime,
        });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/settings');
    return { success: true };
}

export async function getSettings() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data } = await supabase
        .from('user_settings')
        .select('*')
        .eq('id', user.id)
        .single();

    return data;
}

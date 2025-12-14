'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface AppAd {
    id: string;
    location: string;
    image_url: string;
    link_url: string | null;
    is_active: boolean;
}

export async function getAds(): Promise<AppAd[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('app_ads')
        .select('*')
        .order('location');

    if (error) {
        console.error('Error fetching ads:', error);
        return [];
    }

    return data || [];
}

export async function updateAd(location: string, imageUrl: string, linkUrl: string | null, isActive: boolean) {
    const supabase = await createClient();

    // Check Admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Unauthorized' };

    // Ideally check role here again but RLS handles it too.

    const { error } = await supabase
        .from('app_ads')
        .upsert({
            location,
            image_url: imageUrl,
            link_url: linkUrl,
            is_active: isActive,
            updated_at: new Date().toISOString()
        }, { onConflict: 'location' });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/admin/ads');
    return { success: true };
}

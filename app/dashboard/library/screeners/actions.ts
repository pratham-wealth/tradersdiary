'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getScreeners() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { data, error } = await supabase
        .from('fundamental_screeners')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        return { error: error.message };
    }

    return { data };
}

export async function createScreener(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const code = formData.get('code') as string;
    const successRate = formData.get('successRate') as string;
    const criteriaRaw = formData.get('criteria') as string;

    // Split criteria by newlines or commas and filter empty
    const criteria = criteriaRaw
        ? criteriaRaw.split('\n').map(c => c.trim()).filter(c => c.length > 0)
        : [];

    const { error } = await supabase
        .from('fundamental_screeners')
        .insert({
            user_id: user.id,
            name,
            description,
            code,
            success_rate: successRate,
            criteria
        });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/library/screeners');
    return { success: true };
}

export async function deleteScreener(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { error } = await supabase
        .from('fundamental_screeners')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/library/screeners');
    return { success: true };
}

export async function updateScreener(id: string, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const code = formData.get('code') as string;
    const successRate = formData.get('successRate') as string;
    const criteriaRaw = formData.get('criteria') as string;

    const criteria = criteriaRaw
        ? criteriaRaw.split('\n').map(c => c.trim()).filter(c => c.length > 0)
        : [];

    const { error } = await supabase
        .from('fundamental_screeners')
        .update({
            name,
            description,
            code,
            success_rate: successRate,
            criteria
        })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/library/screeners');
    return { success: true };
}

'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

import { WatchItem } from '@/components/watch-card';

export async function getWatchList(): Promise<{ data?: WatchItem[], error?: string }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { data, error } = await supabase
        .from('watch_list')
        .select('*, strategy:strategies(id, name), study:studies(id, title)')
        .eq('user_id', user.id)
        .eq('status', 'WATCHING')
        .order('created_at', { ascending: false });

    if (error) {
        return { error: error.message };
    }

    return { data: (data as unknown as WatchItem[]) };
}

export async function addWatchItem(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    // Check Usage Limit (Subscription Guard)
    const { checkUsageLimit } = await import('@/lib/subscription-guard');
    const limitCheck = await checkUsageLimit(user.id, 'watch');

    if (!limitCheck.allowed) {
        return { error: `Free Plan Limit Reached (${limitCheck.currentCount}/10). Upgrade to Pro for unlimited watchlist items!` };
    }

    const instrument = formData.get('instrument') as string;
    const direction = formData.get('direction') as string;
    const currentPrice = parseFloat(formData.get('currentPrice') as string);
    const entryLevel = parseFloat(formData.get('entryLevel') as string) || null;
    const stopLoss = parseFloat(formData.get('stopLoss') as string) || null;
    const targetPrice = parseFloat(formData.get('targetPrice') as string) || null;
    const breakoutLevel = parseFloat(formData.get('breakoutLevel') as string) || null;
    const supportLevel = parseFloat(formData.get('supportLevel') as string) || null;
    const resistanceLevel = parseFloat(formData.get('resistanceLevel') as string) || null;
    const notes = formData.get('notes') as string;
    const strategyId = formData.get('strategyId') as string || null;
    const studyId = formData.get('studyId') as string || null;
    const alertEnabled = formData.get('alertEnabled') === 'on';

    const { error } = await supabase.from('watch_list').insert({
        user_id: user.id,
        instrument,
        direction,
        current_price: currentPrice,
        entry_level: entryLevel,
        stop_loss: stopLoss,
        target_price: targetPrice,
        breakout_level: breakoutLevel,
        // support_level: supportLevel, // Schema mismatch: column missing in Prod DB
        // resistance_level: resistanceLevel, // Schema mismatch: column missing in Prod DB
        notes,
        strategy_id: strategyId,
        study_id: studyId, // Link the study
        alert_enabled: alertEnabled,
        status: 'WATCHING',
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/watch');
    return { success: true };
}

export async function updateWatchItem(id: string, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const currentPrice = parseFloat(formData.get('currentPrice') as string);
    const entryLevel = parseFloat(formData.get('entryLevel') as string) || null;
    const stopLoss = parseFloat(formData.get('stopLoss') as string) || null;
    const targetPrice = parseFloat(formData.get('targetPrice') as string) || null;
    const breakoutLevel = parseFloat(formData.get('breakoutLevel') as string) || null;
    const supportLevel = parseFloat(formData.get('supportLevel') as string) || null;
    const resistanceLevel = parseFloat(formData.get('resistanceLevel') as string) || null;
    const notes = formData.get('notes') as string;
    const alertEnabled = formData.get('alertEnabled') === 'on';

    const { error } = await supabase
        .from('watch_list')
        .update({
            current_price: currentPrice,
            entry_level: entryLevel,
            stop_loss: stopLoss,
            target_price: targetPrice,
            breakout_level: breakoutLevel,
            // support_level: supportLevel,
            // resistance_level: resistanceLevel,
            notes,
            alert_enabled: alertEnabled,
        })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/watch');
    return { success: true };
}

export async function closeWatchItem(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { error } = await supabase
        .from('watch_list')
        .update({ status: 'CLOSED' })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/watch');
    return { success: true };
}

export async function deleteWatchItem(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { error } = await supabase
        .from('watch_list')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/watch');
    return { success: true };
}

export async function getWatchItemById(id: string) {
    const supabase = await createClient(); // Try normal client first for RLS check? No, we need public access.
    // Wait, patterns/studies use createAdminClient for public access.
    // We need createAdminClient here too.
    const adminSupabase = await createAdminClient();

    const { data: item, error } = await adminSupabase
        .from('watch_list')
        .select('*, strategy:strategies(id, name), study:studies(id, title)')
        .eq('id', id)
        .single();

    if (error || !item) {
        return null;
    }

    return item as WatchItem;
}

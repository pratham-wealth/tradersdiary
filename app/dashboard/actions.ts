'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getTodaysDiary() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('entry_date', today)
        .single();

    if (error && error.code !== 'PGRST116') {
        return { error: error.message };
    }

    // Create empty diary if doesn't exist
    if (!data) {
        // Carry forward logic: Find most recent entry
        const { data: previousEntry } = await supabase
            .from('diary_entries')
            .select('things_to_do')
            .eq('user_id', user.id)
            .order('entry_date', { ascending: false })
            .limit(1)
            .single();

        // Extract uncompleted tasks to carry forward
        const uncompletedTasks = (previousEntry?.things_to_do || [])
            .filter((task: any) => !task.completed);

        const { data: newDiary, error: createError } = await supabase
            .from('diary_entries')
            .insert({
                user_id: user.id,
                entry_date: today,
                things_to_do: uncompletedTasks, // Initialize with carried over tasks
                market_analysis: '',
                notes: '',
                mood: null,
            })
            .select()
            .single();

        if (createError) {
            return { error: createError.message };
        }

        return { data: newDiary };
    }

    return { data };
}

export async function updateDiary(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const today = new Date().toISOString().split('T')[0];
    const marketAnalysis = formData.get('marketAnalysis') as string;
    const notes = formData.get('notes') as string;
    const mood = formData.get('mood') as string;

    const { error } = await supabase
        .from('diary_entries')
        .update({
            market_analysis: marketAnalysis,
            notes: notes,
            mood: mood || null,
        })
        .eq('user_id', user.id)
        .eq('entry_date', today);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
}

export async function updateThingsToDo(thingsToDo: Array<{ text: string; completed: boolean }>) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const today = new Date().toISOString().split('T')[0];

    const { error } = await supabase
        .from('diary_entries')
        .update({
            things_to_do: thingsToDo,
        })
        .eq('user_id', user.id)
        .eq('entry_date', today);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
}

export async function getDashboardStats() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { openTrades: 0, watchingCount: 0 };
    }

    // Get open trades count
    const { count: openTrades } = await supabase
        .from('trades')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('outcome', 'OPEN');

    // Get watching items count
    const { count: watchingCount } = await supabase
        .from('watch_list')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'WATCHING');

    // Get recent trades
    const { data: recentTrades } = await supabase
        .from('trades')
        .select('*')
        .eq('user_id', user.id)
        .order('entry_date', { ascending: false })
        .limit(5);

    return {
        openTrades: openTrades || 0,
        watchingCount: watchingCount || 0,
        recentTrades: recentTrades || [],
    };
}

export async function getUserSettings() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) {
        return { error: error.message };
    }

    return { data };
}

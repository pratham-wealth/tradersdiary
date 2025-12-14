'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addTask(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const taskDate = formData.get('date') as string;
    const taskText = formData.get('task') as string;

    if (!taskDate || !taskText) {
        return { error: 'Date and task are required' };
    }

    // 1. Check if entry exists for this date
    const { data: existingEntry } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('entry_date', taskDate)
        .single();

    const newTask = { text: taskText, completed: false };

    if (existingEntry) {
        // 2. Update existing entry
        // Ensure things_to_do is an array
        const currentTasks = Array.isArray(existingEntry.things_to_do)
            ? existingEntry.things_to_do
            : [];

        const updatedTasks = [...currentTasks, newTask];

        const { error } = await supabase
            .from('diary_entries')
            .update({ things_to_do: updatedTasks })
            .eq('id', existingEntry.id);

        if (error) return { error: error.message };
    } else {
        // 3. Create new entry
        const { error } = await supabase
            .from('diary_entries')
            .insert({
                user_id: user.id,
                entry_date: taskDate,
                things_to_do: [newTask],
                market_analysis: '',
                notes: '',
            });

        if (error) return { error: error.message };
    }

    revalidatePath('/dashboard/tasks');
    revalidatePath('/dashboard'); // Update dashboard too
    return { success: true };
}

export interface TodoItem {
    text: string;
    completed: boolean;
}

export async function getUpcomingTasks(): Promise<{ data?: { entry_date: string; things_to_do: TodoItem[] }[], error?: string }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { data: [] };

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('diary_entries')
        .select('entry_date, things_to_do')
        .eq('user_id', user.id)
        .gte('entry_date', today)
        .order('entry_date', { ascending: true });

    if (error) return { error: error.message };

    // Filter out entries with empty tasks or null tasks
    const relevantEntries = data?.filter(entry =>
        Array.isArray(entry.things_to_do) && entry.things_to_do.length > 0
    ) || [];

    return { data: relevantEntries as any };
}

export async function toggleTask(date: string, taskIndex: number, completed: boolean) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Not authenticated' };

    const { data: existingEntry } = await supabase
        .from('diary_entries')
        .select('*')
        .eq('user_id', user.id)
        .eq('entry_date', date)
        .single();

    if (!existingEntry || !Array.isArray(existingEntry.things_to_do)) {
        return { error: 'Task not found' };
    }

    const tasks = [...existingEntry.things_to_do];
    if (tasks[taskIndex]) {
        tasks[taskIndex].completed = completed;
    }

    const { error } = await supabase
        .from('diary_entries')
        .update({ things_to_do: tasks })
        .eq('id', existingEntry.id);

    if (error) return { error: error.message };

    revalidatePath('/dashboard/tasks');
    revalidatePath('/dashboard');
    return { success: true };
}

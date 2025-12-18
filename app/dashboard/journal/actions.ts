'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

import { Trade } from '@/components/trade-card';
import { Strategy } from '@/components/strategy-card';

export async function getTrades(filter: 'all' | 'open' | 'closed' = 'all'): Promise<{ data?: Trade[], error?: string }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    let query = supabase
        .from('trades')
        .select('*, watch_list(*), study:studies(*), strategy:strategies(*)')
        .eq('user_id', user.id)
        .order('entry_date', { ascending: false });

    if (filter === 'open') {
        query = query.eq('outcome', 'OPEN');
    } else if (filter === 'closed') {
        query = query.neq('outcome', 'OPEN');
    }

    const { data, error } = await query;

    if (error) {
        return { error: error.message };
    }

    return { data: data as any as Trade[] };
}

export async function addTrade(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    // Check if user can add more trades (plan limit)
    const { data: canAdd } = await supabase.rpc('can_add_trade', {
        p_user_id: user.id,
    });

    if (!canAdd) {
        return { error: 'Monthly trade limit reached. Upgrade to Pro for unlimited trades!' };
    }

    const instrument = formData.get('instrument') as string;
    const direction = formData.get('direction') as string;
    const entryPrice = parseFloat(formData.get('entryPrice') as string);
    const stopLoss = parseFloat(formData.get('stopLoss') as string) || null;
    const targetPrice = parseFloat(formData.get('targetPrice') as string) || null;
    const notes = formData.get('notes') as string;
    const strategyId = formData.get('strategyId') as string || null;
    const watchListId = formData.get('watchListId') as string || null;
    const studyId = formData.get('studyId') as string || null;
    const radarDate = formData.get('radarDate') as string || null;
    const entryDate = formData.get('entryDate') as string || null; // Trigger Date

    const { data, error } = await supabase.from('trades').insert({
        user_id: user.id,
        instrument,
        direction,
        entry_price: entryPrice,
        stop_loss: stopLoss,
        target_price: targetPrice,
        notes,
        strategy_id: strategyId,
        watch_list_id: watchListId,
        study_id: studyId,
        outcome: 'OPEN',
        radar_date: radarDate ? new Date(radarDate).toISOString() : null,
        entry_date: entryDate ? new Date(entryDate).toISOString() : new Date().toISOString(),
    }).select().single();

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/journal');
    revalidatePath('/dashboard');
    return { success: true, data };
}

export async function closeTrade(id: string, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const exitPrice = parseFloat(formData.get('exitPrice') as string);
    const outcome = formData.get('outcome') as string;
    const exitDate = formData.get('exitDate') as string; // Optional manual override
    const modNote = formData.get('mod_note') as string;

    // Get the trade to calculate P&L
    const { data: trade } = await supabase
        .from('trades')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    if (!trade) {
        return { error: 'Trade not found' };
    }

    // Calculate P&L in points
    let pnlPoints = 0;
    if (trade.direction === 'LONG') {
        pnlPoints = exitPrice - trade.entry_price;
    } else {
        pnlPoints = trade.entry_price - exitPrice;
    }

    // Append closing note if provided
    let updatedNotes = trade.notes || '';
    if (modNote && modNote.trim()) {
        updatedNotes = updatedNotes ? `${updatedNotes}\n\n[Closing Note]: ${modNote}` : `[Closing Note]: ${modNote}`;
    }

    const { error } = await supabase
        .from('trades')
        .update({
            exit_price: exitPrice,
            exit_date: exitDate ? new Date(exitDate).toISOString() : new Date().toISOString(),
            outcome,
            pnl_points: pnlPoints,
            notes: updatedNotes,
        })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/journal');
    revalidatePath('/dashboard');
    return { success: true };
}

export async function updateTrade(id: string, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const instrument = formData.get('instrument') as string;
    const direction = formData.get('direction') as string;
    const entryPrice = parseFloat(formData.get('entryPrice') as string);
    const stopLoss = parseFloat(formData.get('stopLoss') as string) || null;
    const targetPrice = parseFloat(formData.get('targetPrice') as string) || null;
    const notes = formData.get('notes') as string;
    const strategyId = formData.get('strategyId') as string || null;
    const studyId = formData.get('studyId') as string || null;
    const radarDate = formData.get('radarDate') as string || null;
    const entryDate = formData.get('entryDate') as string || null;

    const { error } = await supabase
        .from('trades')
        .update({
            instrument,
            direction,
            entry_price: entryPrice,
            stop_loss: stopLoss,
            target_price: targetPrice,
            notes,
            strategy_id: strategyId,
            study_id: studyId,
            radar_date: radarDate ? new Date(radarDate).toISOString() : null,
            ...(entryDate && { entry_date: new Date(entryDate).toISOString() }),
        })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/journal');
    revalidatePath('/dashboard');
    return { success: true };
}

export async function deleteTrade(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { error } = await supabase
        .from('trades')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/journal');
    revalidatePath('/dashboard');
    return { success: true };
}

export async function getStrategies(): Promise<{ data?: Strategy[], error?: string }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: [] };
    }

    const { data } = await supabase
        .from('strategies')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('name');

    return { data: (data as any as Strategy[]) || [] };
}

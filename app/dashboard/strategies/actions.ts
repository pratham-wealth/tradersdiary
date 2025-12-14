'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getStrategies() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('strategies')
        .select('*')
        .eq('user_id', user.id)
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching strategies:', error);
        return [];
    }

    return data;
}

export async function createStrategy(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const name = formData.get('name') as string;
    const rules = formData.get('rules') as string;
    const timeframe = formData.get('timeframe') as string;
    const riskProfile = formData.get('riskProfile') as string;

    // New Fields
    const successRate = formData.get('successRate') as string;
    const description = formData.get('description') as string;
    const requiredParameters = formData.get('requiredParameters') as string;
    const executionMethod = formData.get('executionMethod') as string;
    const holdingPeriod = formData.get('holdingPeriod') as string;
    const exclusions = formData.get('exclusions') as string;
    const tradingGuide = formData.get('tradingGuide') as string;

    if (!name) {
        return { error: 'Strategy name is required' };
    }

    const { error } = await supabase
        .from('strategies')
        .insert({
            user_id: user.id,
            name,
            rules,
            timeframe,
            risk_profile: riskProfile,
            success_rate: successRate || 'Medium',
            description,
            required_parameters: requiredParameters,
            execution_method: executionMethod,
            holding_period: holdingPeriod,
            exclusions,
            trading_guide: tradingGuide,
            is_active: true,
        });

    if (error) {
        if (error.code === '23505') {
            return { error: 'A strategy with this name already exists' };
        }
        return { error: error.message };
    }

    revalidatePath('/dashboard/strategies');
    return { success: true };
}

export async function updateStrategy(id: string, formData: FormData) {
    const supabase = await createClient();

    const name = formData.get('name') as string;
    const rules = formData.get('rules') as string;
    const timeframe = formData.get('timeframe') as string;
    const riskProfile = formData.get('riskProfile') as string;
    const isActive = formData.get('isActive') === 'true';

    // New Fields
    const successRate = formData.get('successRate') as string;
    const description = formData.get('description') as string;
    const requiredParameters = formData.get('requiredParameters') as string;
    const executionMethod = formData.get('executionMethod') as string;
    const holdingPeriod = formData.get('holdingPeriod') as string;
    const exclusions = formData.get('exclusions') as string;
    const tradingGuide = formData.get('tradingGuide') as string;

    const { error } = await supabase
        .from('strategies')
        .update({
            name,
            rules,
            timeframe,
            risk_profile: riskProfile,
            is_active: isActive,
            success_rate: successRate,
            description,
            required_parameters: requiredParameters,
            execution_method: executionMethod,
            holding_period: holdingPeriod,
            exclusions,
            trading_guide: tradingGuide
        })
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/strategies');
    return { success: true };
}

export async function deleteStrategy(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('strategies')
        .delete()
        .eq('id', id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/strategies');
    return { success: true };
}

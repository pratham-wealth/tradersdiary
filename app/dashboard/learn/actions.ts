'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';

export interface LearningPattern {
    id: string;
    type: 'CHART' | 'CANDLESTICK';
    group_name: string;
    name: string;
    description: string;
    understanding: string;
    trading_rules: string;
    success_ratio: string; // Changed to string
    image_url: string | null;
    video_url: string | null;
    is_premium: boolean;
    // New Fields
    market_context?: string;
    invalidation_conditions?: string;
    timeframe_suitability?: string;
    volume_confirmation?: string;
    difficulty_level?: string;
}

export async function getPatternsByType(type: 'CHART' | 'CANDLESTICK'): Promise<Record<string, LearningPattern[]>> {
    const supabase = await createClient();

    // In a real app, we would check subscription status here for is_premium logic
    // For now, we return all, and UI can handle the lock if needed, or we filter.
    // User said "Pre Filled For The Users and It will be for Premium Users"
    // We'll just fetch them all for now.

    const { data: patterns, error } = await supabase
        .from('learning_patterns')
        .select('*')
        .eq('type', type)
        .order('group_name', { ascending: true });

    if (error || !patterns) {
        console.error('Error fetching patterns:', error);
        return {};
    }

    // Group by group_name
    const grouped: Record<string, LearningPattern[]> = {};

    patterns.forEach((pattern) => {
        if (!grouped[pattern.group_name]) {
            grouped[pattern.group_name] = [];
        }
        grouped[pattern.group_name].push(pattern as LearningPattern);
    });

    return grouped;
}

export async function getPatternById(id: string): Promise<LearningPattern | null> {
    const supabase = await createAdminClient();

    const { data: pattern, error } = await supabase
        .from('learning_patterns')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !pattern) {
        console.error('Error fetching pattern by ID:', error);
        return null;
    }

    return pattern as LearningPattern;
}

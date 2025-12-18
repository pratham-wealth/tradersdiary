'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// import { Study } from '@/components/study-card';

export async function getStudies(typeFilter: string = 'all', statusFilter: string = 'ACTIVE'): Promise<{ data?: any[], error?: string }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    let query = supabase
        .from('studies')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (typeFilter !== 'all') {
        query = query.eq('study_type', typeFilter);
    }

    if (statusFilter !== 'all') {
        // query = query.eq('status', statusFilter); // Uncomment when migration confirmed
    }

    const { data, error } = await query;

    if (error) {
        return { error: error.message };
    }

    return { data: data as any[] };
}

export async function getActiveStudies() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    // Check if status column exists effectively by trying to select it or just select * if we assume migration run.
    // Given the "playground" nature, we assume migration 003 applied.
    // If not, this might throw error on 'status' column.
    // We will select id and title for the dropdown.
    const { data, error } = await supabase
        .from('studies')
        .select('id, title, study_type, created_at')
        .eq('user_id', user.id)
        // .eq('status', 'ACTIVE') // Uncomment when migration is confirmed
        .order('created_at', { ascending: false });

    if (error) {
        return { error: error.message };
    }

    return { data: data || [] };
}

export async function getStudyById(id: string) {
    const supabase = await createAdminClient();

    // We fetch without user_id restriction for public sharing
    const { data: study, error } = await supabase
        .from('studies')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !study) {
        return null;
    }

    return study;
}

// ... (imports remain)

export async function createStudy(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    // Check if user can add more studies (plan limit)
    const { data: canAdd } = await supabase.rpc('can_add_study', {
        p_user_id: user.id,
    });

    if (!canAdd) {
        return { error: 'Monthly study limit reached. Upgrade to Pro for unlimited studies!' };
    }

    const title = formData.get('title') as string;
    const instrument = formData.get('instrument') as string;
    const price = parseFloat(formData.get('price') as string) || null;
    const direction = formData.get('direction') as string;
    const studyType = formData.get('studyType') as string;
    const content = formData.get('content') as string;
    const tags = formData.get('tags') as string;
    const imagesJson = formData.get('images') as string;
    const strategyId = formData.get('strategyId') as string || null;
    const probability = formData.get('probability') as string;

    const tagsArray = tags ? tags.split(',').map(t => t.trim()) : [];
    const imagesArray = imagesJson ? JSON.parse(imagesJson) : [];

    const { data, error } = await supabase
        .from('studies')
        .insert({
            user_id: user.id,
            title,
            instrument,
            price,
            direction,
            study_type: studyType,
            content,
            tags: tagsArray,
            images: imagesArray,
            strategy_id: strategyId,
            probability: probability || null,
            status: 'ACTIVE',
        })
        .select()
        .single();

    if (error) {
        return { error: error.message };
    }

    // ... (linking logic remains)

    revalidatePath('/dashboard/studies');
    return { success: true, data };
}

export async function updateStudy(id: string, formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const title = formData.get('title') as string;
    const instrument = formData.get('instrument') as string;
    const price = parseFloat(formData.get('price') as string) || null;
    const direction = formData.get('direction') as string;
    const content = formData.get('content') as string;
    const tags = formData.get('tags') as string;
    const strategyId = formData.get('strategyId') as string || null;
    const probability = formData.get('probability') as string;
    const imagesJson = formData.get('images') as string;

    const tagsArray = tags ? tags.split(',').map(t => t.trim()) : [];
    let updateData: any = {
        title,
        instrument,
        price,
        direction,
        content,
        tags: tagsArray,
        strategy_id: strategyId,
        probability: probability || null,
    };

    if (imagesJson) {
        updateData.images = JSON.parse(imagesJson);
    }

    const { error } = await supabase
        .from('studies')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/studies');
    return { success: true };
}

// ... (deleteStudy and updateStudyStatus remain)

export async function addToWatchlist(studyId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    // 1. Fetch study details
    const { data: study, error: studyError } = await supabase
        .from('studies')
        .select('*')
        .eq('id', studyId)
        .single();

    if (studyError || !study) {
        return { error: 'Study not found' };
    }

    if (!study.instrument) {
        return { error: 'Cannot add to watchlist: No stock/instrument name defined.' };
    }

    // 2. Add to Watchlist
    const { error: watchError } = await supabase
        .from('watch_list')
        .insert({
            user_id: user.id,
            instrument: study.instrument,
            current_price: study.price,
            direction: study.direction,
            study_id: study.id,
            status: 'WATCHING'
        });

    if (watchError) {
        return { error: watchError.message };
    }

    revalidatePath('/dashboard/watch');
    return { success: true };
}

export async function deleteStudy(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { error } = await supabase
        .from('studies')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/studies');
    return { success: true };
}

export async function updateStudyStatus(id: string, status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED', outcome?: 'SUCCESS' | 'FAILURE' | 'NEUTRAL') {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const updateData: any = { status };
    if (outcome) {
        updateData.outcome = outcome;
    }

    const { error } = await supabase
        .from('studies')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/studies');
    return { success: true };
}

export async function updateStudyOutcome(id: string, outcome: 'SUCCESS' | 'FAILURE' | 'NEUTRAL' | null, remarks: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { error } = await supabase
        .from('studies')
        .update({
            outcome: outcome,
            remarks: remarks,
            outcome_date: new Date().toISOString(),
            status: 'COMPLETED' // Auto-complete when outcome is set
        })
        .eq('id', id)
        .eq('user_id', user.id);

    if (error) {
        return { error: error.message };
    }

    revalidatePath('/dashboard/studies');
    revalidatePath(`/dashboard/studies/${id}`);
    return { success: true };
}

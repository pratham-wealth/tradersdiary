'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const fullName = formData.get('fullName') as string;
    const phoneNumber = formData.get('phoneNumber') as string;

    // 1. Update public.user_settings (Application Data)
    const { data: existingSettings, error: updateError } = await supabase
        .from('user_settings')
        .update({
            full_name: fullName,
            phone: phoneNumber,
        })
        .eq('id', user.id)
        .select();

    if (updateError) {
        return { error: updateError.message };
    }

    // If no row existed to update, we must INSERT it
    if (!existingSettings || existingSettings.length === 0) {
        const { error: insertError } = await supabase
            .from('user_settings')
            .insert({
                id: user.id,
                full_name: fullName,
                phone: phoneNumber,
                // Add defaults since this is a fresh insert
                subscription_status: 'active', // Starter Pass is active
                plan_type: 'free', // Starter Pass
                subscription_start: new Date().toISOString().split('T')[0],
                // Trial/Starter end = 3 days from now
                subscription_end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                monthly_trades_limit: 10,
                monthly_studies_limit: 10,
                watch_list_limit: 10,
                storage_limit_mb: 50,
            });

        if (insertError) return { error: insertError.message };
    }

    // 2. Update auth.users (Core Auth Data) - Phone & Metadata
    // Note: Updating phone might require verification depending on Supabase settings.
    const { error: authError } = await supabase.auth.updateUser({
        phone: phoneNumber,
        data: {
            full_name: fullName,
            phone: phoneNumber,
        } // Keep metadata in sync
    });

    if (authError) {
        return { error: `Auth Update Failed: ${authError.message}` };
    }

    revalidatePath('/dashboard/profile');
    return { success: true };
}

export async function updatePassword(formData: FormData) {
    const supabase = await createClient();

    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!newPassword || !confirmPassword) {
        return { error: 'Both fields are required' };
    }

    if (newPassword !== confirmPassword) {
        return { error: 'Passwords do not match' };
    }

    if (newPassword.length < 6) {
        return { error: 'Password must be at least 6 characters' };
    }

    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

export async function getProfile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    console.log('DEBUG: getProfile user.email_confirmed_at:', user.email_confirmed_at);

    const { data: settings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('id', user.id)
        .single();

    return {
        email: user.email,
        emailVerified: user.email_confirmed_at !== null, // Check if confirmed
        fullName: settings?.full_name || '',
        phoneNumber: settings?.phone || '',
        subscriptionStatus: settings?.subscription_status || 'free',
        planType: settings?.plan_type || 'free',
    };
}

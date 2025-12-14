'use server';

import { createClient } from '@/lib/supabase/server';

export async function resetPassword(formData: FormData) {
    const email = formData.get('email') as string;

    if (!email) {
        return { error: 'Email is required' };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

export async function updatePassword(formData: FormData) {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!password || !confirmPassword) {
        return { error: 'Both fields are required' };
    }

    if (password !== confirmPassword) {
        return { error: 'Passwords do not match' };
    }

    if (password.length < 8) {
        return { error: 'Password must be at least 8 characters' };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function verifyOTP(formData: FormData) {
    const email = formData.get('email') as string;
    const token = formData.get('otp') as string;

    const supabase = await createClient();

    // Development mode bypass - sign in directly
    if (process.env.NEXT_PUBLIC_DEV_MODE === 'true' && token === '123456') {
        console.log('DEV MODE: Bypassing OTP verification - signing in directly');

        // In dev mode, we can't verify OTP, so just check if user exists and redirect
        // Note: User won't be logged in, they'll need to use login page
        // Or we accept any password in dev mode
        redirect('/auth/login?devmode=true');
    }

    const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup',
    });

    if (error) {
        return { error: error.message };
    }

    if (!data.user) {
        return { error: 'Verification failed' };
    }

    // OTP verified successfully - redirect to dashboard
    redirect('/dashboard');
}

export async function resendOTP(email: string) {
    const supabase = await createClient();

    // Resend OTP by triggering a new signup request
    // Supabase handles this automatically
    const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: error.message };
    }

    redirect('/welcome');
}

export async function signUp(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;

    console.log('=== SERVER: Starting signup ===');
    console.log('Email:', email);
    console.log('Full Name:', fullName);
    console.log('Phone:', phone);

    const supabase = await createClient();

    // Sign up the user - Supabase will send OTP email automatically
    console.log('Calling Supabase signup...');
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                phone: phone,
            },
            // Email confirmation enabled - Supabase sends OTP email
        },
    });

    console.log('Supabase signup response:');
    console.log('- authData:', authData);
    console.log('- signUpError:', signUpError);

    if (signUpError) {
        console.error('❌ Signup error detected:', signUpError);
        console.error('Error message:', signUpError.message);
        console.error('Error code:', signUpError.code);
        console.error('Error status:', signUpError.status);
        return { error: signUpError.message || 'Failed to create account' };
    }

    if (!authData.user) {
        console.error('❌ No user data returned');
        return { error: 'Failed to create user' };
    }

    console.log('✅ User created:', authData.user.id);

    // Create user settings with 7-day trial
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 3); // 3 Days Validity for Starter Pass

    // Use Admin Client to bypass RLS for initial user settings creation
    // (Since user is not logged in yet during OTP flow)
    const supabaseAdmin = await createAdminClient();

    const { error: settingsError } = await supabaseAdmin
        .from('user_settings')
        .insert({
            id: authData.user.id,
            full_name: fullName,
            phone: phone,
            subscription_status: 'active', // Starter Pass is active immediately
            plan_type: 'free', // 'free' matches Starter Pass
            subscription_start: new Date().toISOString().split('T')[0],
            subscription_end: trialEndDate.toISOString().split('T')[0],
            monthly_trades_limit: 10,
            monthly_studies_limit: 10,
            watch_list_limit: 10,
            storage_limit_mb: 50,
        });

    if (settingsError) {
        console.error('Error creating user settings:', settingsError);
        // Don't block registration if settings creation fails
        // User can still verify and login, settings can be created later
    }

    console.log('Redirecting to OTP verification page...');
    redirect(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/auth/login');
}

export async function signInWithGoogle() {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
        },
    });

    if (error) {
        return { error: error.message };
    }

    if (data.url) {
        redirect(data.url);
    }
}

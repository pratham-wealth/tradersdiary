import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// OAuth callback handler
export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const supabase = await createClient();
        await supabase.auth.exchangeCodeForSession(code);

        // Get user data
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            // Check if user settings exist
            const { data: settings } = await supabase
                .from('user_settings')
                .select('id')
                .eq('id', user.id)
                .single();

            // Create settings if they don't exist (for OAuth users)
            if (!settings) {
                const trialEndDate = new Date();
                trialEndDate.setDate(trialEndDate.getDate() + 7);

                await supabase.from('user_settings').insert({
                    id: user.id,
                    full_name: user.user_metadata.full_name || user.email?.split('@')[0],
                    subscription_status: 'trial',
                    plan_type: 'pro',
                    subscription_start: new Date().toISOString().split('T')[0],
                    subscription_end: trialEndDate.toISOString().split('T')[0],
                    monthly_trades_limit: null,
                    monthly_studies_limit: null,
                    watch_list_limit: null,
                    storage_limit_mb: 500,
                });
            }
        }
    }

    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
}

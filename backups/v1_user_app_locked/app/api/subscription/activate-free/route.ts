import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user already used free plan? 
        // For now, we just let them switch. Or maybe we want to restrict it?
        // User asked for "Curious People's Database", so let's just activate it.
        // We can add a "free_trial_claimed" flag later if needed.

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 3); // 3 Days validity

        const { error } = await supabase
            .from('user_settings')
            .update({
                plan_type: 'free',
                subscription_status: 'active',
                subscription_start: startDate.toISOString(),
                subscription_end: endDate.toISOString()
            })
            .eq('id', user.id);

        if (error) throw error;

        return NextResponse.json({ success: true, message: 'Free plan activated' });

    } catch (error: any) {
        console.error('Free Plan Activation Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

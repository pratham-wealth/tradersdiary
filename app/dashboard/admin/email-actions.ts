'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { sendRenewalEmail } from '@/lib/email-service';

export async function sendRenewalNotification(userId: string) {
    const supabase = await createAdminClient();

    // 1. Fetch User Data
    const { data: userSettings, error: settingsError } = await supabase
        .from('user_settings')
        .select('full_name, plan_type, subscription_end')
        .eq('id', userId)
        .single();

    if (settingsError || !userSettings) {
        return { success: false, error: "User details not found" };
    }

    const { data: { user: authUser }, error: authError } = await supabase.auth.admin.getUserById(userId);

    if (authError || !authUser?.email) {
        return { success: false, error: "User email not found" };
    }

    // 2. Determine Status
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(userSettings.subscription_end);
    endDate.setHours(0, 0, 0, 0);

    let status: 'due_today' | 'due_week' | 'missed' = 'due_week';
    if (endDate < today) status = 'missed';
    else if (endDate.getTime() === today.getTime()) status = 'due_today';

    // 3. Send Email via Nodemailer
    const result = await sendRenewalEmail(
        authUser.email,
        userSettings.full_name || 'Trader',
        userSettings.plan_type || 'Basic',
        endDate.toLocaleDateString(),
        status
    );

    return result;
}

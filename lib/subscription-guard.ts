import { createClient } from '@/lib/supabase/server';

export type UsageCheckResult = {
    allowed: boolean;
    reason?: 'LIMIT_REACHED' | 'subscription_active' | 'within_limit';
    currentCount?: number;
    limit?: number;
};

export async function checkUsageLimit(
    userId: string,
    type: 'watch' | 'trade'
): Promise<UsageCheckResult> {
    const supabase = await createClient();

    // 1. Fetch User Settings (Subscription Status)
    const { data: userSettings, error: settingsError } = await supabase
        .from('user_settings')
        .select('plan_type, subscription_status, subscription_end')
        .eq('id', userId)
        .single();

    // If fetch fails, we default to restrictive (Safe Fail) or open? 
    // Usually safe fail -> prevent creation if we can't verify.
    if (settingsError || !userSettings) {
        console.error('UsageGuard: Failed to fetch settings', settingsError);
        return { allowed: false, reason: 'LIMIT_REACHED' }; // Default to block on error
    }

    const { plan_type, subscription_status, subscription_end } = userSettings;

    // 2. Check Subscription Validity
    const isActive = subscription_status === 'active' || subscription_status === 'trialing';
    // const notExpired = subscription_end ? new Date(subscription_end) > new Date() : true; // If null, assume active if status is active? Or lifetime?

    // For now, simplify: If plan is NOT free AND status is active, allow.
    // NOTE: We might need robust Expiry date checking if status doesn't auto-update.
    // Assuming 'active' status is reliable from webhook updates.
    if (plan_type !== 'free' && isActive) {
        return { allowed: true, reason: 'subscription_active' };
    }

    // 3. User is FREE or INACTIVE -> Check Constraints
    const LIMIT = 10;
    const tableName = type === 'watch' ? 'user_watch_list' : 'user_trades';

    const { count, error: countError } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true }) // efficient count
        .eq('user_id', userId);

    if (countError) {
        console.error('UsageGuard: Failed to count items', countError);
        return { allowed: false, reason: 'LIMIT_REACHED' };
    }

    const currentCount = count || 0;

    if (currentCount >= LIMIT) {
        return {
            allowed: false,
            reason: 'LIMIT_REACHED',
            currentCount,
            limit: LIMIT
        };
    }

    return {
        allowed: true,
        reason: 'within_limit',
        currentCount,
        limit: LIMIT
    };
}

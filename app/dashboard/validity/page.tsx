import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

function getDaysRemaining(endDate: string) {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

function formatDate(dateStr: string) {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function getPlanName(type: string) {
    if (type === 'free' || type === 'basic') return 'Starter Pass';
    if (type === 'pro') return 'Pro Trader';
    if (type === 'premium') return 'Premium Elite';
    return 'Free Plan';
}

export default async function ValidityPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    const { data: settings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!settings) {
        return <div className="p-8">Loading subscription details...</div>;
    }

    const daysRemaining = settings.subscription_end ? getDaysRemaining(settings.subscription_end) : 0;
    const isFree = settings.plan_type === 'free' || settings.plan_type === 'basic';
    const planName = getPlanName(settings.plan_type);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Plan Validity
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Your subscription details
                </p>
            </div>

            {/* Current Status */}
            <div className="card p-6 border-2 border-long">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {planName}
                    </h3>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${settings.subscription_status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                        }`}>
                        {settings.subscription_status?.toUpperCase() || 'INACTIVE'}
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Start Date</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {formatDate(settings.subscription_start)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Renewal Date</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                            {formatDate(settings.subscription_end)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Days Remaining</span>
                        <span className="font-bold text-long text-xl">
                            {daysRemaining} days
                        </span>
                    </div>
                </div>

                {!isFree && (
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600 dark:text-gray-400">Auto-Renewal</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    defaultChecked
                                    aria-label="Auto-Renewal"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-long/20 dark:peer-focus:ring-long/40 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-long"></div>
                            </label>
                        </div>
                    </div>
                )}
            </div>

            {/* Usage Stats (Limits) */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Plan Limits
                </h3>

                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600 dark:text-gray-400">Monthly Trades</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                {settings.monthly_trades_limit ? settings.monthly_trades_limit : 'Unlimited'}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            {/* Visual progress can be added later when we track usage count */}
                            <div className="bg-indigo-500 h-2 rounded-full w-0"></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600 dark:text-gray-400">Monthly Studies</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                {settings.monthly_studies_limit ? settings.monthly_studies_limit : 'Unlimited'}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-indigo-500 h-2 rounded-full w-0"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600 dark:text-gray-400">Watchlist Items</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                                {settings.watch_list_limit ? settings.watch_list_limit : 'Unlimited'}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-indigo-500 h-2 rounded-full w-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

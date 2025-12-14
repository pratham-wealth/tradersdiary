
'use client';

import { useState } from 'react';
import { AdminUser, updateUserPlan } from '@/app/dashboard/admin/actions';
import { X, ShieldCheck, Crown, Calendar, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AdminUpgradeModalProps {
    user: AdminUser;
    onClose: () => void;
}

export function AdminUpgradeModal({ user, onClose }: AdminUpgradeModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [plan, setPlan] = useState<'pro' | 'premium'>('pro');
    const [duration, setDuration] = useState<'1m' | '1y' | 'lifetime'>('1m');
    const router = useRouter();

    const getEndDate = () => {
        const now = new Date();
        if (duration === 'lifetime') return new Date('2099-12-31');
        if (duration === '1y') return new Date(now.setFullYear(now.getFullYear() + 1));
        return new Date(now.setDate(now.getDate() + 30)); // 1 Month
    };

    const endDate = getEndDate();

    async function handleUpgrade() {
        setIsLoading(true);
        try {
            const result = await updateUserPlan(
                user.id,
                plan,
                endDate.toISOString()
            );

            if (result.success) {
                toast.success(`Upgraded ${user.fullName} to ${plan.toUpperCase()}`);
                router.refresh();
                onClose();
            } else {
                toast.error(result.error || 'Upgrade failed');
            }
        } catch (error) {
            toast.error('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Crown className="w-5 h-5 text-gold-400" />
                        Upgrade User
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* User Info */}
                    <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-lg font-bold text-slate-300">
                            {user.fullName.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">{user.fullName}</p>
                            <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                    </div>

                    {/* Plan Selection */}
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Select Plan</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setPlan('pro')}
                                className={cn(
                                    "p-3 rounded-xl border text-left transition-all",
                                    plan === 'pro'
                                        ? "bg-amber-500/10 border-amber-500/50 text-amber-500"
                                        : "bg-slate-950 border-white/5 text-slate-400 hover:bg-slate-900"
                                )}
                            >
                                <div className="font-bold text-sm mb-1">Professional</div>
                                <div className="text-[10px] opacity-80">Full Access</div>
                            </button>
                            <button
                                onClick={() => setPlan('premium')}
                                className={cn(
                                    "p-3 rounded-xl border text-left transition-all",
                                    plan === 'premium'
                                        ? "bg-purple-500/10 border-purple-500/50 text-purple-500"
                                        : "bg-slate-950 border-white/5 text-slate-400 hover:bg-slate-900"
                                )}
                            >
                                <div className="font-bold text-sm mb-1">Premium</div>
                                <div className="text-[10px] opacity-80">VIP Access</div>
                            </button>
                        </div>
                    </div>

                    {/* Duration Selection */}
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Duration</label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value as any)}
                            className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 focus:outline-none"
                        >
                            <option value="1m">1 Month (30 Days)</option>
                            <option value="1y">1 Year (365 Days)</option>
                            <option value="lifetime">Lifetime Access</option>
                        </select>
                        <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            Valid until: {endDate.toLocaleDateString(undefined, { dateStyle: 'long' })}
                        </p>
                    </div>

                    <button
                        onClick={handleUpgrade}
                        disabled={isLoading}
                        className={cn(
                            "w-full py-3 font-bold rounded-xl transition-all flex items-center justify-center gap-2",
                            plan === 'pro' ? "bg-amber-500 hover:bg-amber-600 text-black" : "bg-purple-600 hover:bg-purple-700 text-white"
                        )}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                <ShieldCheck className="w-4 h-4" />
                                Confirm Upgrade
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

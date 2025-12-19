'use client';

import { useState } from 'react';
import { Mail, Check, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { sendRenewalNotification } from '@/app/dashboard/admin/actions';
import { cn } from '@/lib/utils';

interface RenewalNotifyButtonProps {
    userId: string;
    email: string;
    status: 'due_today' | 'due_week' | 'missed';
}

export function RenewalNotifyButton({ userId, email, status }: RenewalNotifyButtonProps) {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSend = async () => {
        setLoading(true);
        try {
            const result = await sendRenewalNotification(userId);

            if (result.success) {
                setSent(true);
                toast.success(`Renewal email sent to ${email}`);
            } else {
                toast.error("Failed to send email", {
                    description: typeof result.error === 'string' ? result.error : 'Unknown error'
                });
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <button disabled className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-900/20 text-emerald-400 text-xs font-medium rounded-lg border border-emerald-500/20 cursor-not-allowed">
                <Check className="w-3 h-3" />
                Sent
            </button>
        );
    }

    return (
        <button
            onClick={handleSend}
            disabled={loading}
            className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors",
                loading ? "bg-slate-800 text-slate-400 border-slate-700" :
                    "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
            )}
        >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Mail className="w-3 h-3" />}
            {loading ? 'Sending...' : 'Notify'}
        </button>
    );
}

'use client';

import { useState } from 'react';
import { createAnnouncement, deactivateAllAnnouncements } from '@/app/dashboard/announcements/actions';
import { Megaphone, XCircle, CheckCircle, AlertTriangle, Info, Send } from 'lucide-react';
import { toast } from 'sonner';

export function AnnouncementManager() {
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'info' | 'warning' | 'success'>('info');
    const [isLoading, setIsLoading] = useState(false);

    const handleBroadcast = async () => {
        if (!message.trim()) return;
        setIsLoading(true);

        const result = await createAnnouncement(message, type);

        if (result.success) {
            toast.success('Announcement Broadcasted!');
            setMessage('');
        } else {
            toast.error(result.error || 'Failed to broadcast');
        }
        setIsLoading(false);
    };

    const handleClear = async () => {
        if (!confirm('Are you sure you want to remove the specific banner from all users?')) return;
        setIsLoading(true);

        const result = await deactivateAllAnnouncements();

        if (result.success) {
            toast.success('Announcement Cleared');
        } else {
            toast.error(result.error);
        }
        setIsLoading(false);
    };

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                    <Megaphone className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Broadcast Announcement</h3>
                    <p className="text-xs text-slate-400">Send a message to all users' dashboards immediately.</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Type Selection */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setType('info')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${type === 'info' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                    >
                        <Info className="w-3 h-3" /> Info
                    </button>
                    <button
                        onClick={() => setType('success')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${type === 'success' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                    >
                        <CheckCircle className="w-3 h-3" /> Success
                    </button>
                    <button
                        onClick={() => setType('warning')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-2 ${type === 'warning' ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'}`}
                    >
                        <AlertTriangle className="w-3 h-3" /> Alert
                    </button>
                </div>

                {/* Input */}
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-amber-500 min-h-[80px]"
                />

                {/* Actions */}
                <div className="flex justify-between items-center pt-2">
                    <button
                        onClick={handleClear}
                        disabled={isLoading}
                        className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
                    >
                        <XCircle className="w-4 h-4" /> Clear Active Banner
                    </button>

                    <button
                        onClick={handleBroadcast}
                        disabled={isLoading || !message.trim()}
                        className="bg-amber-500 hover:bg-amber-400 text-amber-950 px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Sending...' : (
                            <>
                                Broadcast <Send className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

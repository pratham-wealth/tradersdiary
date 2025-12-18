'use client';

import { Announcement } from '@/app/dashboard/announcements/actions';
import { Megaphone, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AnnouncementBanner({ announcement }: { announcement: Announcement | null }) {
    if (!announcement) return null;

    const getIcon = () => {
        switch (announcement.type) {
            case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
            case 'success': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
            case 'alert': return <Megaphone className="w-5 h-5 text-rose-500" />;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getColors = () => {
        switch (announcement.type) {
            case 'warning': return 'bg-amber-500/10 border-amber-500/20 shadow-amber-500/5';
            case 'success': return 'bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/5';
            case 'alert': return 'bg-rose-500/10 border-rose-500/20 shadow-rose-500/5';
            default: return 'bg-blue-500/10 border-blue-500/20 shadow-blue-500/5';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0, scale: 0.95 }}
                animate={{ height: 'auto', opacity: 1, scale: 1 }}
                exit={{ height: 0, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="overflow-hidden"
            >
                <div className={`
                    rounded-xl border p-4 mb-8 flex items-start gap-4 shadow-lg backdrop-blur-sm relative overflow-hidden
                    ${getColors()}
                `}>
                    {/* Glowing effect */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>

                    <div className="mt-0.5 shrink-0 bg-white/5 p-2 rounded-lg backdrop-blur-md border border-white/5 shadow-inner">
                        {getIcon()}
                    </div>

                    <div className="flex-1 z-10">
                        <h4 className="font-bold text-white text-base tracking-tight mb-1 flex items-center gap-2">
                            System Announcement
                            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/50 font-normal">
                                {new Date(announcement.created_at).toLocaleDateString()}
                            </span>
                        </h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                            {announcement.message}
                        </p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}


import { Metadata, ResolvingMetadata } from 'next';
import { getWatchItemById } from '@/app/dashboard/watch/actions';
import { notFound } from 'next/navigation';
import { ArrowRight, Trophy, AlertTriangle, TrendingUp, TrendingDown, Target, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

type Props = {
    params: { id: string }
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { id } = await params;
    const item = await getWatchItemById(id);

    if (!item) return { title: 'Trade Setup Not Found' };

    const directionEmoji = item.direction === 'LONG' ? '🚀' : '📉';

    return {
        title: `${directionEmoji} ${item.instrument} ${item.direction} Setup - Traders Diary`,
        description: `View this potential trade setup. Entry: ${item.entry_level || 'Market'} | Target: ${item.target_price || 'Open'}`,
        openGraph: {
            title: `Trade Alert: ${item.instrument} ${item.direction}`,
            description: item.notes || 'Check out this trade setup on Traders Diary.',
            url: `https://tradediary.equitymarvels.com/share/watch/${id}`,
            type: 'article',
            // images: Automatically handled by opengraph-image.tsx
        },
        twitter: {
            card: 'summary_large_image',
            title: `${item.instrument} ${item.direction} Setup`,
            description: `Entry: ${item.entry_level} | Target: ${item.target_price}`,
            // images: Automatically handled by opengraph-image.tsx
        }
    };
}

export default async function ShareWatchPage({ params }: Props) {
    const { id } = await params;
    const item = await getWatchItemById(id);

    if (!item) return notFound();

    const isLong = item.direction === 'LONG';
    const mainColor = isLong ? 'text-emerald-400' : 'text-rose-400';
    const bgGradient = isLong ? 'from-emerald-900/40' : 'from-rose-900/40';
    const borderColor = isLong ? 'border-emerald-500/20' : 'border-rose-500/20';

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            {/* Ticket Container */}
            <div className={`max-w-md w-full bg-slate-900 border ${borderColor} rounded-3xl overflow-hidden shadow-2xl relative`}>

                {/* Background Glow */}
                <div className={`absolute top-0 inset-x-0 h-48 bg-gradient-to-b ${bgGradient} to-transparent pointer-events-none`} />

                <div className="p-8 relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-slate-800 text-slate-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                    Watchlist
                                </span>
                                <span className="text-slate-500 text-xs">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h1 className="text-4xl font-black text-white tracking-tight">{item.instrument}</h1>
                        </div>

                        {/* Direction Badge */}
                        <div className={`px-4 py-2 rounded-xl font-black text-sm uppercase flex items-center gap-2 shadow-lg ${isLong ? 'bg-emerald-500 text-slate-900' : 'bg-rose-500 text-white'}`}>
                            {isLong ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            {item.direction}
                        </div>
                    </div>

                    {/* Price Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {/* Current Price */}
                        <div className="col-span-2 bg-slate-800/50 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                            <div className="text-xs uppercase font-bold text-slate-500">Current Price</div>
                            <div className="text-2xl font-bold text-white">{item.current_price}</div>
                        </div>

                        {/* Entry */}
                        <div className="bg-slate-800/30 p-4 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 mb-1">
                                <Zap className="w-3 h-3" /> Entry
                            </div>
                            <div className="text-xl font-bold text-blue-400">{item.entry_level || 'Market'}</div>
                        </div>

                        {/* Stop Loss */}
                        <div className="bg-slate-800/30 p-4 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 mb-1">
                                <Shield className="w-3 h-3" /> Stop
                            </div>
                            <div className="text-xl font-bold text-rose-400">{item.stop_loss || '-'}</div>
                        </div>

                        {/* Target */}
                        <div className="col-span-2 bg-slate-800/30 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500">
                                <Target className="w-3 h-3" /> Target
                            </div>
                            <div className="text-2xl font-bold text-emerald-400">{item.target_price || 'Open'}</div>
                        </div>
                    </div>

                    {/* Notes */}
                    {item.notes && (
                        <div className="bg-slate-900/50 border border-dashed border-slate-700 p-4 rounded-xl mb-8">
                            <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Trader Notes</div>
                            <p className="text-slate-300 text-sm italic leading-relaxed">
                                "{item.notes}"
                            </p>
                        </div>
                    )}

                    {/* Footer / CTA */}
                    <div className="pt-6 border-t border-white/5">
                        <Link
                            href="https://tradediary.equitymarvels.com/dashboard/watch"
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                        >
                            View in Traders Diary <ArrowRight className="w-4 h-4" />
                        </Link>
                        <p className="text-center text-slate-600 text-[10px] mt-4">
                            Track your own trades and improve performance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

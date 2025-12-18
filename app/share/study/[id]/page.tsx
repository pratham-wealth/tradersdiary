
import { Metadata, ResolvingMetadata } from 'next';
import { getStudyById } from '@/app/dashboard/studies/actions';
import { notFound } from 'next/navigation';
import { TrendingUp, TrendingDown, Target, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
    params: { id: string }
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { id } = await params;
    const study = await getStudyById(id);

    if (!study) return { title: 'Study Not Found' };

    return {
        title: `${study.direction} ${study.instrument} - Trade Idea`,
        description: `View this trade setup for ${study.instrument}: Entry ${study.price}, Stop ${study.stop_loss || '-'}, Target ${study.target_price || '-'}`,
        openGraph: {
            title: `Trade Idea: ${study.instrument} ${study.direction}`,
            description: study.content || 'Check out this potential trade setup!',
            images: [`/share/study/${id}/opengraph-image`], // Dynamic OG Image
        },
        twitter: {
            card: 'summary_large_image',
            title: `${study.instrument} ${study.direction} Setup`,
            description: `Entry: ${study.price} | Stop: ${study.stop_loss} | Target: ${study.target_price}`,
            images: [`/share/study/${id}/opengraph-image`],
        }
    };
}

export default async function ShareStudyPage({ params }: Props) {
    const { id } = await params;
    const study = await getStudyById(id);

    if (!study) return notFound();

    const isLong = study.direction === 'LONG';
    const mainColor = isLong ? 'text-emerald-400' : 'text-rose-400';
    const bgGradient = isLong ? 'from-emerald-500/10' : 'from-rose-500/10';

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className={`max-w-md w-full bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative`}>
                {/* Decorative BG */}
                <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${bgGradient} to-transparent opacity-50`} />

                <div className="p-8 relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Trade Idea</div>
                            <h1 className="text-4xl font-black text-white">{study.instrument}</h1>
                        </div>
                        <div className={`px-4 py-2 rounded-xl font-bold text-sm bg-slate-800 border border-white/5 shadow-lg ${mainColor}`}>
                            {study.direction}
                        </div>
                    </div>

                    {/* Levels Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 text-center">
                            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Entry</div>
                            <div className="text-xl font-bold text-white">{study.price || '-'}</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 text-center">
                            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Stop</div>
                            <div className="text-xl font-bold text-rose-400">{study.stop_loss || '-'}</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 text-center">
                            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">Target</div>
                            <div className="text-xl font-bold text-emerald-400">{study.target_price || '-'}</div>
                        </div>
                    </div>

                    {/* Images Logic Check */}
                    {study.images && study.images.length > 0 && (
                        <div className="mb-8 rounded-xl overflow-hidden border border-white/10 shadow-lg relative aspect-video bg-black/50 group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={study.images[0]} alt={`${study.instrument} Chart`} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        </div>
                    )}

                    {/* Logic / Content */}
                    {study.content && (
                        <div className="bg-slate-800/30 p-6 rounded-2xl border border-white/5 mb-8">
                            <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">Logic</div>
                            <p className="text-slate-300 text-sm leading-relaxed italic">
                                "{study.content}"
                            </p>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2 px-2">
                            <span>SETUP DATE: {new Date(study.created_at).toLocaleDateString()}</span>
                        </div>

                        <Link
                            href="https://tradediary.equitymarvels.com/dashboard/watch"
                            className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-white transition-all shadow-lg hover:shadow-xl active:scale-95 ${isLong ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20' : 'bg-rose-600 hover:bg-rose-500 shadow-rose-900/20'}`}
                        >
                            Open in App <ArrowRight className="w-5 h-5" />
                        </Link>
                        <p className="text-center text-slate-600 text-[10px]">
                            Log in to track this setup and see more.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


import { Metadata, ResolvingMetadata } from 'next';
import { getPatternById } from '@/app/dashboard/learn/actions';
import { notFound } from 'next/navigation';
import { Trophy, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

type Props = {
    params: { id: string }
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { id } = await params;
    const pattern = await getPatternById(id);

    if (!pattern) return { title: 'Pattern Not Found' };

    return {
        title: `${pattern.name} - Trading Pattern Guide`,
        description: pattern.description || `Learn how to trade the ${pattern.name} pattern with high accuracy.`,
        openGraph: {
            title: `Master the ${pattern.name} Pattern | Win Rate: ${pattern.success_ratio}`,
            description: pattern.understanding?.substring(0, 150) + '...',
            images: pattern.image_url ? [pattern.image_url] : ['https://tradenote.app/og-image.jpg'], // Fallback image if needed
        },
        twitter: {
            card: 'summary_large_image',
            title: `${pattern.name} - Trading Strategy`,
            description: `Success Rate: ${pattern.success_ratio}. Learn the rules and logic behind this setup.`,
            images: pattern.image_url ? [pattern.image_url] : [],
        }
    };
}

export default async function SharePatternPage({ params }: Props) {
    const { id } = await params;
    const pattern = await getPatternById(id);

    if (!pattern) return notFound();

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Image */}
                <div className="aspect-video bg-black/50 relative">
                    {pattern.image_url ? (
                        <img src={pattern.image_url} alt={pattern.name} className="w-full h-full object-contain" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600 font-bold">
                            TRADERS DIARY
                        </div>
                    )}
                    <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {pattern.success_ratio} WR
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div>
                        <div className="text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">{pattern.group_name}</div>
                        <h1 className="text-2xl font-bold text-white mb-2">{pattern.name}</h1>
                        <p className="text-slate-400 text-sm leading-relaxed">{pattern.description}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                            <div className="text-slate-500 text-xs uppercase mb-1">Type</div>
                            <div className="text-white font-medium text-sm">{pattern.type}</div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg text-center">
                            <div className="text-slate-500 text-xs uppercase mb-1">Status</div>
                            <div className="text-emerald-400 font-medium text-sm flex items-center justify-center gap-1">
                                {pattern.is_premium ? <Lock className="w-3 h-3" /> : null}
                                {pattern.is_premium ? 'Premium' : 'Free'}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6">
                        <Link
                            href="https://tradediary.equitymarvels.com/dashboard/learn/candlesticks"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20"
                        >
                            Open in App <ArrowRight className="w-4 h-4" />
                        </Link>
                        <p className="text-center text-slate-600 text-xs mt-4">
                            Log in to view full trading rules and examples.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

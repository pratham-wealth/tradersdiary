import { AdminPatternUploader } from '@/components/admin/admin-pattern-uploader';
import { Sparkles, BarChart2, Flame } from 'lucide-react';
import { getAllPatterns } from '@/app/dashboard/admin/actions';
import { PatternActions } from '@/components/admin/content-actions';
import Image from 'next/image';

export default async function AdminPatternsPage() {
    const { patterns, error } = await getAllPatterns();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Pattern Library</h2>
                    <p className="text-slate-400">Create new Chart and Candlestick learning modules.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Uploader Section */}
                <div className="xl:col-span-1">
                    <div className="bg-slate-900 border border-white/5 rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                                <Sparkles className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Pattern Creator</h3>
                                <p className="text-sm text-slate-400">Define rules, logic, and visuals.</p>
                            </div>
                        </div>

                        <AdminPatternUploader />
                    </div>
                </div>

                {/* List Section */}
                <div className="xl:col-span-2 space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <BarChart2 className="w-5 h-5 text-gold-400" />
                        Pattern Library ({patterns?.length || 0})
                    </h3>

                    {error && (
                        <div className="p-4 bg-red-900/20 text-red-200 rounded-lg border border-red-500/50">
                            Error loading patterns: {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {patterns?.map((pattern: any) => (
                            <div key={pattern.id} className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex gap-4 hover:border-slate-600 transition-colors">
                                <div className="w-20 h-20 bg-slate-800 rounded-lg flex-shrink-0 relative overflow-hidden border border-white/5">
                                    {pattern.image_url ? (
                                        <Image
                                            src={pattern.image_url}
                                            alt={pattern.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            {pattern.type === 'CANDLESTICK' ?
                                                <Flame className="w-8 h-8 text-slate-600" /> :
                                                <BarChart2 className="w-8 h-8 text-slate-600" />
                                            }
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <h4 className="font-bold text-slate-200 truncate pr-2">{pattern.name}</h4>
                                        <PatternActions patternId={pattern.id} name={pattern.name} />
                                    </div>

                                    <p className="text-xs text-slate-400 mb-2">{pattern.group_name}</p>

                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] px-2 py-0.5 rounded border ${pattern.type === 'CANDLESTICK'
                                                ? 'bg-red-900/50 text-red-300 border-red-500/20'
                                                : 'bg-blue-900/50 text-blue-300 border-blue-500/20'
                                            }`}>
                                            {pattern.type}
                                        </span>
                                        {pattern.is_premium && (
                                            <span className="text-[10px] bg-amber-900/50 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">
                                                PREMIUM
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {(!patterns || patterns.length === 0) && (
                            <div className="col-span-full p-8 text-center border-2 border-dashed border-slate-700 rounded-xl">
                                <p className="text-slate-400">No patterns found in the library.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

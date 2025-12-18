'use client';

import { useState } from 'react';
import { LearningPattern } from '@/app/dashboard/learn/actions';
import { BookOpen, Download, Share2, X, PlayCircle, Trophy } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PatternPDF } from './pattern-pdf';
import { ShareWithSocials } from './share-with-socials';

interface PatternCardProps {
    pattern: LearningPattern;
}

export function PatternCard({ pattern }: PatternCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Share Text
    const shareText = `Mastering the ${pattern.name} pattern on TradeNote!\n\nSuccess Rate: ${pattern.success_ratio}\n\nLearn more and track your trading journey:`;

    return (
        <>
            {/* Card (Collapsed View) */}
            <div
                onClick={() => setIsExpanded(true)}
                className="group relative bg-slate-800 border border-white/5 rounded-xl overflow-hidden hover:border-gold-400/50 hover:shadow-lg hover:shadow-gold-400/10 transition-all cursor-pointer h-full flex flex-col"
            >
                {/* Image Thumbnail */}
                <div className="h-40 bg-slate-700/50 overflow-hidden relative">
                    {pattern.image_url ? (
                        <img
                            src={pattern.image_url}
                            alt={pattern.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800">
                            <img
                                src="https://images.unsplash.com/photo-1611974765270-ca6e1128bbb5?w=800&auto=format&fit=crop&q=60" // Generic Trading Placeholder
                                alt="Pattern Placeholder"
                                className="w-full h-full object-cover opacity-50"
                            />
                        </div>
                    )}
                    {/* Badge */}
                    <div className="absolute top-2 right-2 bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm backdrop-blur-sm">
                        {pattern.success_ratio} WR
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-gold-400 transition-colors">
                        {pattern.name}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
                        {pattern.description}
                    </p>

                    <div className="flex items-center text-xs text-gold-400 font-medium">
                        Read Guide <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                </div>
            </div>

            {/* Expanded Modal */}
            {isExpanded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setIsExpanded(false)}
                    />

                    <div className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">

                        {/* Header Content (Scrollable below this) */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl z-10">
                            <div>
                                <h2 className="text-xl font-bold text-white uppercase tracking-wider">{pattern.name}</h2>
                                <p className="text-sm text-slate-400">{pattern.group_name}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* PDF Download */}
                                <PDFDownloadLink
                                    document={
                                        <PatternPDF
                                            name={pattern.name}
                                            group={pattern.group_name}
                                            description={pattern.description}
                                            understanding={pattern.understanding}
                                            rules={pattern.trading_rules}
                                            successRatio={pattern.success_ratio}
                                            imageUrl={pattern.image_url}
                                            marketContext={pattern.market_context}
                                            invalidationConditions={pattern.invalidation_conditions}
                                            timeframeSuitability={pattern.timeframe_suitability}
                                            volumeConfirmation={pattern.volume_confirmation}
                                            difficultyLevel={pattern.difficulty_level}
                                        />
                                    }
                                    fileName={`${pattern.name.replace(/\s+/g, '_')}_Guide.pdf`}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    title="Download PDF Guide"
                                >
                                    <Download className="w-5 h-5" />
                                </PDFDownloadLink>

                                {/* Social Share */}
                                <ShareWithSocials
                                    title={`Master ${pattern.name}`}
                                    text={shareText}
                                    url={`${typeof window !== 'undefined' ? window.location.origin : 'https://tradenote.app'}/share/pattern/${pattern.id}`}
                                    hashTags={['trading', 'patterns', 'education']}
                                />

                                {/* Close */}
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-2"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Content */}
                        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">

                            {/* Visuals */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Image */}
                                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 aspect-video relative group">
                                    {pattern.image_url ? (
                                        <img src={pattern.image_url} alt={pattern.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                                            <span className="text-sm">No Image Available</span>
                                        </div>
                                    )}
                                </div>

                                {/* Metrics or Video */}
                                <div className="space-y-4">
                                    {/* Stats Box */}
                                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Trophy className="w-5 h-5 text-gold-400" />
                                            <span className="text-sm font-bold text-slate-300 uppercase tracking-wide">Performance Metric</span>
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <span className="text-2xl font-bold text-white">{pattern.success_ratio}</span>
                                            <span className="text-sm text-slate-400 mb-1">Success Rate</span>
                                        </div>
                                    </div>

                                    {/* Video Placeholder (or real embed if we had url logic) */}
                                    <div className="bg-slate-800/50 rounded-xl p-4 border border-white/5 flex flex-col justify-center min-h-[120px]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <PlayCircle className="w-5 h-5 text-red-400" />
                                            <span className="text-sm font-bold text-slate-300 uppercase tracking-wide">Video Tutorial</span>
                                        </div>
                                        {pattern.video_url ? (
                                            <a href={pattern.video_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline text-sm">
                                                Watch Breakdown on YouTube &rarr;
                                            </a>
                                        ) : (
                                            <p className="text-sm text-slate-500 italic">Video tutorial coming soon.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Text Content - Scripted Chapter Style */}
                            <div className="space-y-8 max-w-3xl">

                                {/* Understanding */}
                                <div className="animate-in slide-in-from-bottom-4 duration-500 delay-100">
                                    <h3 className="text-lg font-bold text-gold-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <span className="w-8 h-[2px] bg-gold-400"></span>
                                        Understanding The Logic
                                    </h3>
                                    <p className="text-slate-300 leading-relaxed text-lg font-light whitespace-pre-line">
                                        {pattern.understanding}
                                    </p>
                                </div>

                                {/* Extra Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500 delay-150">
                                    {(pattern.market_context || pattern.invalidation_conditions) && (
                                        <>
                                            {pattern.market_context && (
                                                <div className="bg-slate-800/20 p-5 rounded-xl border border-white/5">
                                                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Ideal Context</h4>
                                                    <p className="text-sm text-slate-300 whitespace-pre-line">{pattern.market_context}</p>
                                                </div>
                                            )}
                                            {pattern.invalidation_conditions && (
                                                <div className="bg-slate-800/20 p-5 rounded-xl border border-white/5">
                                                    <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Invalidation</h4>
                                                    <p className="text-sm text-slate-300 whitespace-pre-line">{pattern.invalidation_conditions}</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {(pattern.timeframe_suitability || pattern.volume_confirmation || pattern.difficulty_level) && (
                                        <div className="col-span-full bg-slate-800/20 p-5 rounded-xl border border-white/5 flex flex-wrap gap-8">
                                            {pattern.timeframe_suitability && (
                                                <div>
                                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Timeframes</h4>
                                                    <p className="text-sm text-white font-medium">{pattern.timeframe_suitability}</p>
                                                </div>
                                            )}
                                            {pattern.volume_confirmation && (
                                                <div>
                                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Volume</h4>
                                                    <p className="text-sm text-white font-medium">{pattern.volume_confirmation}</p>
                                                </div>
                                            )}
                                            {pattern.difficulty_level && (
                                                <div>
                                                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Difficulty</h4>
                                                    <p className="text-sm text-white font-medium">{pattern.difficulty_level}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Rules */}
                                <div className="bg-slate-800/30 rounded-2xl p-6 border border-white/5 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                                    <h3 className="text-lg font-bold text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                        <span className="w-8 h-[2px] bg-emerald-400"></span>
                                        System Rules & Execution
                                    </h3>
                                    <div className="space-y-4">
                                        {pattern.trading_rules?.split('\n').map((rule, idx) => (
                                            <div key={idx} className="flex gap-4">
                                                <span className="flex-none w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/20">
                                                    {idx + 1}
                                                </span>
                                                <p className="text-slate-300 leading-relaxed">
                                                    {rule}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

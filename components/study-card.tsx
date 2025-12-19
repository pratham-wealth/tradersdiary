'use client';

import { useState } from 'react';
import Link from 'next/link';
import { deleteStudy, updateStudyStatus, addToWatchlist } from '@/app/dashboard/studies/actions';
import { CheckCircle, XCircle, Archive, Edit2, Trash2, Eye, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { SocialShareModal } from './social-share-modal';

export interface Study {
    id: string;
    title: string;
    instrument?: string;
    price?: number;
    direction?: 'LONG' | 'SHORT' | 'NEUTRAL';
    percentage_change?: number;
    study_type: string;
    content: string;
    tags: string[];
    images: string[];
    created_at: string;
    status?: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
    outcome?: 'SUCCESS' | 'FAILURE' | 'NEUTRAL';
    probability?: 'HIGH' | 'MEDIUM' | 'LOW' | 'RISKY' | 'WATCH_ONLY';
}

interface StudyCardProps {
    study: Study;
    onAddToWatch?: () => void;
}

const studyTypeLabels: Record<string, { label: string; emoji: string }> = {
    MARKET_ANALYSIS: { label: 'Market Analysis', emoji: '📊' },
    CHART_PATTERN: { label: 'Chart Pattern', emoji: '📈' },
    SECTOR_STUDY: { label: 'Sector Study', emoji: '🏭' },
    STOCK_ANALYSIS: { label: 'Stock Analysis', emoji: '💹' },
    TECHNICAL_SETUP: { label: 'Technical Setup', emoji: '🎯' },
    FUNDAMENTAL_ANALYSIS: { label: 'Fundamental Analysis', emoji: '💼' },
    NEWS_IMPACT: { label: 'News Impact', emoji: '📰' },
    OTHER: { label: 'Other', emoji: '📝' },
    // Legacy / Fallback mappings
    PATTERN: { label: 'Chart Pattern', emoji: '📈' },
    TECHNICAL: { label: 'Technical Analysis', emoji: '🎯' },
    FUNDAMENTAL: { label: 'Fundamental Analysis', emoji: '💼' },
};

const probabilityStyles: Record<string, { border: string; bg: string; badge: string; shadow: string }> = {
    HIGH: {
        border: 'border-l-emerald-500',
        bg: 'from-emerald-500/10 via-emerald-500/0 to-transparent',
        shadow: 'hover:shadow-emerald-500/30 dark:hover:shadow-emerald-500/20',
        badge: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
    },
    MEDIUM: {
        border: 'border-l-amber-500',
        bg: 'from-amber-500/10 via-amber-500/0 to-transparent',
        shadow: 'hover:shadow-amber-500/30 dark:hover:shadow-amber-500/20',
        badge: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30'
    },
    LOW: {
        border: 'border-l-slate-500',
        bg: 'from-slate-500/10 via-slate-500/0 to-transparent',
        shadow: 'hover:shadow-slate-400/30 dark:hover:shadow-slate-400/20',
        badge: 'bg-slate-500/20 text-slate-400 dark:text-slate-400 border-slate-500/30'
    },
    RISKY: {
        border: 'border-l-rose-500',
        bg: 'from-rose-500/10 via-rose-500/0 to-transparent',
        shadow: 'hover:shadow-rose-500/30 dark:hover:shadow-rose-500/20',
        badge: 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30'
    },
    WATCH_ONLY: {
        border: 'border-l-blue-500',
        bg: 'from-blue-500/10 via-blue-500/0 to-transparent',
        shadow: 'hover:shadow-blue-500/30 dark:hover:shadow-blue-500/20',
        badge: 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30'
    },
};

export function StudyCard({ study, onAddToWatch }: StudyCardProps) {
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    async function handleDelete(e: React.MouseEvent) {
        e.stopPropagation();
        if (!confirm('Delete this study permanently?')) return;
        setLoading(true);
        await deleteStudy(study.id);
    }

    async function handleStatusUpdate(status: 'ACTIVE' | 'COMPLETED' | 'ARCHIVED', outcome?: 'SUCCESS' | 'FAILURE' | 'NEUTRAL') {
        setLoading(true);
        await updateStudyStatus(study.id, status, outcome);
        setLoading(false);
    }

    async function handleAddToWatchlist(e: React.MouseEvent) {
        e.stopPropagation();

        if (onAddToWatch) {
            onAddToWatch();
            return;
        }

        // Fallback for standalone usage (if any)
        setLoading(true);
        const result = await addToWatchlist(study.id);
        setLoading(false);
        if (result?.error) {
            alert(result.error);
        } else {
            alert('Added to Watchlist!');
        }
    }



    const typeInfo = studyTypeLabels[study.study_type] || studyTypeLabels.OTHER;
    const isCompleted = study.status === 'COMPLETED';

    // Get styles based on probability (default to LOW/slate if undefined)
    const styles = study.probability ? probabilityStyles[study.probability] : probabilityStyles.LOW;

    return (
        <div
            id={`study-card-${study.id}`}
            className={`relative rounded-lg overflow-hidden transition-all duration-300 bg-slate-800/90 bg-gradient-to-r ${styles.bg} border-l-[3px] ${styles.border} ${styles.shadow} ${expanded ? 'shadow-2xl shadow-black/50 border-t border-r border-b border-white/10' : 'border-t border-r border-b border-transparent hover:border-white/5'}`}
        >

            {/* Main Card Area - Click to expand */}
            <div
                onClick={() => setExpanded(!expanded)}
                className="p-3 cursor-pointer hover:bg-white/5 transition-colors"
            >
                {/* Top Bar: Stock Name & Price */}
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3 pl-2">
                        {/* Compact Icon */}
                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-sm shadow-inner text-white">
                            {study.instrument ? study.instrument.charAt(0).toUpperCase() : typeInfo.emoji}
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white leading-none tracking-tight">
                                {study.instrument || study.title}
                            </h3>
                            {study.instrument && study.title !== study.instrument && (
                                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 font-medium">{study.title}</p>
                            )}
                            {!study.instrument && (
                                <p className="text-[10px] text-slate-400 mt-0.5 font-medium uppercase tracking-wider">{typeInfo.label}</p>
                            )}
                            {/* Created Date Display */}
                            <p className="text-[9px] text-slate-500 mt-0.5">
                                Created: {new Date(study.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">

                        <button
                            onClick={handleDelete}
                            className="text-gray-400 hover:text-red-500 transition-colors z-20 relative"
                            title="Delete study"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-start mb-2 px-2">
                    {/* Price Block (Moved down slightly or kept separate) */}
                    <div className="w-full text-right">
                        {study.price ? (
                            <>
                                <div className="text-sm font-bold text-white tabular-nums leading-tight tracking-tight">
                                    {study.price.toFixed(2)}
                                </div>
                                <div className="flex items-center justify-end gap-1 mt-0.5">
                                    {study.direction === 'LONG' && <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Long</span>}
                                    {study.direction === 'SHORT' && <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider">Short</span>}
                                    {study.direction === 'NEUTRAL' && <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Neutral</span>}
                                </div>
                            </>
                        ) : (
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">No Price</span>
                        )}
                    </div>
                </div>

                {/* Tags / Strategy / Probability */}
                <div className="flex flex-wrap gap-1.5 mb-2 pl-2">
                    {study.probability && (
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border border-white/5 ${styles.badge.replace('bg-', 'bg-transparent text-').replace('border-', 'border-').split(' ')[1]}`}>
                            {study.probability.replace('_', ' ')}
                        </span>
                    )}

                    {study.tags && study.tags.map((tag, i) => (
                        <span key={i} className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-slate-700/50 text-slate-400 border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Preview Content (if not expanded) */}
                {!expanded && (
                    <div className="pl-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {study.content}
                    </div>
                )}
            </div>

            {/* Expanded Content Area */}
            {
                expanded && (
                    <div className="px-5 pb-5 pt-0 animate-in slide-in-from-top-1 duration-200">
                        <hr className="border-white/5 mb-4" />

                        <div className="prose prose-sm prose-invert max-w-none mb-4 text-slate-300 text-sm leading-relaxed">
                            <p className="whitespace-pre-wrap">{study.content}</p>
                        </div>

                        {/* Images */}
                        {study.images && study.images.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {study.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }}
                                        className="aspect-video relative rounded-lg overflow-hidden border border-white/10 bg-black/20 cursor-zoom-in group/img"
                                    >
                                        <img
                                            src={img}
                                            alt="Analysis"
                                            className="w-full h-full object-cover opacity-90 group-hover/img:opacity-100 transition-all duration-300 group-hover/img:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/5">
                            {/* ... existing buttons ... */}
                            {/* Outcome Buttons */}
                            {!isCompleted ? (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleStatusUpdate('COMPLETED', 'SUCCESS'); }}
                                        className="bg-slate-800 hover:bg-emerald-600 active:scale-95 text-white shadow-sm border border-white/5 hover:border-transparent text-[10px] font-bold uppercase tracking-wider py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-3.5 h-3.5" />
                                        Success
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleStatusUpdate('COMPLETED', 'FAILURE'); }}
                                        className="bg-slate-800 hover:bg-rose-600 active:scale-95 text-white shadow-sm border border-white/5 hover:border-transparent text-[10px] font-bold uppercase tracking-wider py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-3.5 h-3.5" />
                                        Failure
                                    </button>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 py-2 px-3 rounded-lg justify-center border border-white/5">
                                    {study.outcome === 'SUCCESS' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : study.outcome === 'FAILURE' ? <XCircle className="w-3.5 h-3.5 text-rose-400" /> : <Archive className="w-3.5 h-3.5" />}
                                    {study.outcome || 'Completed'}
                                </div>
                            )}

                            <div className="flex-1"></div>

                            {/* Add to Watchlist */}
                            {study.instrument && !isCompleted && (
                                <button
                                    onClick={handleAddToWatchlist}
                                    disabled={loading}
                                    className="p-2 bg-slate-800 hover:bg-blue-600 active:scale-95 text-slate-400 hover:text-white rounded-lg border border-white/5 hover:border-transparent transition-all shadow-sm"
                                    title="Add to Watchlist"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                            )}

                            {/* Edit / Delete */}
                            <div className="flex items-center gap-2">
                                <Link href={`/dashboard/studies/${study.id}`} className="p-2 bg-slate-800 hover:bg-indigo-600 active:scale-95 text-slate-400 hover:text-white rounded-lg border border-white/5 hover:border-transparent transition-all shadow-sm">
                                    <Edit2 className="w-4 h-4" />
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="p-2 bg-slate-800 hover:bg-rose-600 active:scale-95 text-slate-400 hover:text-white rounded-lg border border-white/5 hover:border-transparent transition-all shadow-sm"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Lightbox / Zoom User Interface */}
            {
                selectedImage && (
                    <div
                        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
                        onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                    >
                        <button
                            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            onClick={() => setSelectedImage(null)}
                        >
                            <XCircle className="w-10 h-10" />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Zoomed Chart"
                            className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200 select-none"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )
            }

            {/* Share Modal */}
            <SocialShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                title={`Analysis: ${study.title}`}
                instrument={study.instrument || 'Market'}
                variant="study"
                data={study}
                shareText={`📊 My Analysis: ${study.title}\n\n"${study.content.substring(0, 100)}${study.content.length > 100 ? '...' : ''}"\n\nRead full analysis on Traders Diary: https://tradediary.equitymarvels.com/share/study/${study.id}`}
                shareUrl={`https://tradediary.equitymarvels.com/share/study/${study.id}`}
            />
        </div >
    );
}

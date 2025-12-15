'use client';

import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { getStudies } from '@/app/dashboard/studies/actions';
import { AddStudyForm } from '@/components/add-study-form';
import { AddWatchForm } from '@/components/add-watch-form';
import { Strategy } from '@/components/strategy-card';
import { Study, StudyCard } from '@/components/study-card';
import { BookOpen, CheckCircle, Activity } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function StudiesPageContent({ initialStudies, strategies }: { initialStudies: Study[], strategies: Strategy[] }) {
    const searchParams = useSearchParams();
    const deepLinkId = searchParams.get('id');

    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState<'ACTIVE' | 'COMPLETED'>('ACTIVE');
    const [studies, setStudies] = useState(initialStudies);
    const [watchFormStudy, setWatchFormStudy] = useState<Study | null>(null);

    // Deep link effect
    useEffect(() => {
        if (deepLinkId) {
            const target = studies.find(s => s.id === deepLinkId);
            if (target && target.status === 'COMPLETED') {
                setStatusFilter('COMPLETED');
            }
        }
    }, [deepLinkId, studies]);

    async function handleFilterChange(newType: string) {
        setTypeFilter(newType);
        const result = await getStudies(newType, statusFilter);
        if (result.data) {
            setStudies(result.data);
        }
    }

    async function handleStatusTabChange(newStatus: 'ACTIVE' | 'COMPLETED') {
        setStatusFilter(newStatus);
    }

    const displayedStudies = studies.filter(s => {
        const sStatus = s.status || 'ACTIVE';
        if (deepLinkId && s.id === deepLinkId) return true; // Always show deep linked
        return sStatus === statusFilter;
    });

    const studyTypes = [
        { value: 'all', label: 'All Studies' },
        { value: 'MARKET_ANALYSIS', label: 'Market Analysis' },
        { value: 'CHART_PATTERN', label: 'Chart Pattern' },
        { value: 'TECHNICAL_SETUP', label: 'Technical Setup' },
        { value: 'FUNDAMENTAL_ANALYSIS', label: 'Fundamental Analysis' },
        { value: 'STOCK_ANALYSIS', label: 'Stock Analysis' },
        { value: 'NEWS_IMPACT', label: 'News Impact' },
        { value: 'OTHER', label: 'Other' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Studies & Research
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        Document your market research and analysis
                    </p>
                </div>

                {/* Status Tabs */}
                <div className="flex p-1 bg-slate-800/50 rounded-lg">
                    <button
                        onClick={() => handleStatusTabChange('ACTIVE')}
                        className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${statusFilter === 'ACTIVE' ? 'bg-slate-700 text-gold-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Activity className="w-3 h-3 inline mr-1.5 -mt-0.5" />
                        Active
                    </button>
                    <button
                        onClick={() => handleStatusTabChange('COMPLETED')}
                        className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${statusFilter === 'COMPLETED' ? 'bg-slate-700 text-emerald-400 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <CheckCircle className="w-3 h-3 inline mr-1.5 -mt-0.5" />
                        Completed
                    </button>
                </div>
            </div>

            {/* Controls Row: Filter & Add Button */}
            <div className="flex items-center gap-3 w-full">
                {/* Filters (Dropdown) */}
                <div className="relative flex-1 min-w-0">
                    <select
                        value={typeFilter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="w-full appearance-none bg-slate-800 border border-white/5 text-slate-300 text-xs font-bold uppercase tracking-wider py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-transparent transition-all cursor-pointer shadow-sm hover:bg-slate-700"
                    >
                        {studyTypes.map((type) => (
                            <option key={type.value} value={type.value} className="bg-slate-800 text-slate-300">
                                {type.label}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {/* Add Study Form */}
                <AddStudyForm
                    strategies={strategies}
                    triggerClassName="flex-1 w-full flex items-center justify-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold uppercase tracking-wider text-xs shadow-lg shadow-emerald-500/20 transition-all active:scale-95 border border-emerald-400/20 whitespace-nowrap"
                    triggerLabel="+ New Study"
                />
            </div>

            {/* Add Watch Form (Modal) */}
            {watchFormStudy && (
                <AddWatchForm
                    isOpen={!!watchFormStudy}
                    onClose={() => setWatchFormStudy(null)}
                    strategies={strategies}
                    studies={studies} // Pass all studies for linking options 
                    initialValues={{
                        instrument: watchFormStudy.instrument || watchFormStudy.title,
                        direction: watchFormStudy.direction,
                        currentPrice: watchFormStudy.price,
                        studyId: watchFormStudy.id,
                        notes: `Analysis from ${watchFormStudy.probability || ''} probability study: ${watchFormStudy.title}`
                    }}
                />
            )}

            {/* Studies Display */}
            {displayedStudies.length === 0 ? (
                <div className="card p-12 text-center">
                    <BookOpen className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        No {statusFilter.toLowerCase()} studies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {statusFilter === 'ACTIVE' ? 'Start a new study or check your archives.' : 'Complete an active study to see it here.'}
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {displayedStudies.length} stud{displayedStudies.length !== 1 ? 'ies' : 'y'}
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {displayedStudies.map((study) => (
                            <StudyCard
                                key={study.id}
                                study={study}
                                onAddToWatch={() => setWatchFormStudy(study)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function StudiesPageClient(props: { initialStudies: Study[], strategies: Strategy[] }) {
    return (
        <Suspense fallback={<div className="text-white text-center p-8">Loading studies...</div>}>
            <StudiesPageContent {...props} />
        </Suspense>
    );
}

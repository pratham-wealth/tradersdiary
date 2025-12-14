import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { ChevronLeft, Calendar, FileText, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { EditStudyForm } from '@/components/edit-study-form';
import { StudyOutcomeForm } from '@/components/study-outcome-form';
import { getStrategies } from '@/app/dashboard/strategies/actions';

interface PageProps {
    params: Promise<{
        id: string;
    }>
}

export default async function StudyDetailsPage({ params }: PageProps) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { id } = await params;

    const { data: study, error } = await supabase
        .from('studies')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

    const strategies = await getStrategies();

    if (error || !study) {
        if (error) console.error(error);
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header / Nav */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard/watch"
                        className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-midnight-800 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{study.title}</h1>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(study.created_at).toLocaleDateString()}</span>
                            <span className="text-midnight-700">•</span>
                            <span className={`px-2 py-0.5 rounded textxs font-medium ${study.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400' :
                                study.status === 'COMPLETED' ? 'bg-indigo-500/10 text-indigo-400' :
                                    'bg-slate-500/10 text-slate-400'
                                }`}>
                                {study.status || 'Active'}
                            </span>
                        </div>
                    </div>
                </div>
                <EditStudyForm study={study} strategies={strategies || []} />
            </div>

            {/* Main Content (The "Blog Post") */}
            <article className="prose prose-invert prose-indigo max-w-none bg-midnight-900 border border-midnight-800 rounded-xl p-6 shadow-xl">
                {/* Content */}
                <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-sans text-lg">
                    {study.content}
                </div>

                {/* Images */}
                {study.images && study.images.length > 0 && (
                    <div className="grid gap-4 mt-8">
                        {study.images.map((img: string, i: number) => (
                            <div key={i} className="rounded-lg overflow-hidden border border-midnight-700 bg-midnight-950">
                                <img src={img} alt={`Study Image ${i + 1}`} className="w-full h-auto object-contain max-h-[600px]" />
                            </div>
                        ))}
                    </div>
                )}
            </article>

            {/* Outcome / Remarks Section */}
            <StudyOutcomeForm
                studyId={study.id}
                initialOutcome={study.outcome}
                initialRemarks={study.remarks}
            />
        </div>
    );
}

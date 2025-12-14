import { getTodaysDiary } from '../actions';
import { DiaryForm } from '@/components/diary-form';
import { ThingsToDo } from '@/components/things-to-do';

export default async function DiaryPage() {
    const { data: diary } = await getTodaysDiary();

    const initialData = {
        market_analysis: diary?.market_analysis || '',
        notes: diary?.notes || '',
        mood: diary?.mood,
    };

    const initialTodos = diary?.things_to_do || [];

    // Get date string
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Daily Planner</h1>
                <p className="text-gold-400 font-medium">{date}</p>
            </div>

            {/* Todo List Section */}
            <div className="bg-midnight-900/50 border border-midnight-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-gold-400">✓</span> Today's Focus
                </h2>
                <ThingsToDo initialTodos={initialTodos} />
            </div>

            {/* Analysis & Notes */}
            <div className="bg-midnight-900/50 border border-midnight-800 rounded-2xl p-6">
                <DiaryForm initialData={initialData} />
            </div>
        </div>
    );
}

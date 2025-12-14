'use client';

import { ListTodo } from 'lucide-react';

export function DailyRoutine() {
    const routineItems = [
        "Create Your Strategies in the Strategies Page and Track them.",
        "Visit Library Section to Learn & Review.",
        "Add Study, while you Analyse Charts and Stocks.",
        "Follow all rules of Strategies or Risk management.",
        "Check Watchlist and Add the Stocks on Terminal.",
        "Create an Entry When you Trade.",
        "Check Events and Newsflow for the day."
    ];

    return (
        <div className="bg-gradient-to-br from-midnight-900 to-midnight-800 border border-white/5 rounded-xl p-4 shadow-xl relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-3 relative z-10">
                <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                    <ListTodo className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                    <h3 className="text-base font-bold text-white tracking-tight">Trading Routine</h3>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Follow Discipline</p>
                </div>
            </div>

            <div className="space-y-1 relative z-10">
                {routineItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/5 transition-colors group/item border border-transparent hover:border-white/5">
                        <div className="min-w-[1rem]">
                            <div className="w-5 h-5 rounded-full border border-slate-600 group-hover/item:border-emerald-500/50 flex items-center justify-center transition-colors">
                                <span className="text-xs font-bold text-slate-500 group-hover/item:text-emerald-400">{index + 1}</span>
                            </div>
                        </div>
                        <p className="text-sm text-slate-300 font-medium leading-normal group-hover/item:text-white transition-colors">
                            {item}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

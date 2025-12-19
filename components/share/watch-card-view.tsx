import React from 'react';

interface WatchItem {
    instrument: string;
    direction: string;
    current_price: number;
    entry_level?: number | null;
    stop_loss?: number | null;
    target_price?: number | null;
    resistance_level?: number | null;
    support_level?: number | null;
    breakout_level?: number | null;
    notes?: string | null;
    strategy?: { name: string } | null;
}

export const WatchCardView = ({ item }: { item: WatchItem }) => {
    const isLong = item.direction === 'LONG';

    // Helper for formatting prices
    const f = (val?: number | null) => val ? val.toFixed(2) : '-';

    return (
        <div className="w-[800px] h-[1000px] bg-[#020410] flex flex-col relative overflow-hidden font-sans text-white border-[3px] border-[#c29648]">
            {/* Background Texture/Gradient - Deep Royal Navy */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-[#020410] opacity-100"></div>

            {/* Main Content Padding */}
            <div className="relative z-10 p-10 flex-1 flex flex-col">

                {/* Header Section */}
                <div className="flex justify-between items-start mb-12">
                    <div className="space-y-1">
                        <h3 className="text-[#c29648] text-sm font-bold tracking-[0.2em] uppercase shadow-black drop-shadow-md">Trade Idea</h3>
                        <h1 className="text-7xl font-black text-white tracking-tight uppercase shadow-black drop-shadow-xl">
                            {item.instrument}
                        </h1>
                    </div>
                    <div>
                        <span className={`px-8 py-3 rounded-2xl text-2xl font-black uppercase tracking-widest shadow-xl border border-white/5 ${isLong ? 'bg-gradient-to-br from-[#c29648] to-[#9f7632] text-black' : 'bg-gradient-to-br from-rose-500 to-rose-700 text-white'}`}>
                            {item.direction}
                        </span>
                    </div>
                </div>

                {/* Primary Data Grid (Blue Brushed Metal Cards) */}
                <div className="grid grid-cols-3 gap-5 mb-10">
                    {[
                        { label: 'Entry', val: f(item.entry_level), color: 'text-white' },
                        { label: 'Stop', val: f(item.stop_loss), color: 'text-white' },
                        { label: 'Target', val: f(item.target_price), color: 'text-white' }
                    ].map((cell, i) => (
                        <div key={i} className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-3xl p-6 border border-[#c29648]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_8px_20px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center aspect-[4/5]">
                            <p className="text-[#c29648] text-xs font-bold uppercase tracking-[0.2em] mb-4 opacity-90">{cell.label}</p>
                            <p className={`text-4xl font-bold ${cell.color} tracking-tighter drop-shadow-lg`}>{cell.val}</p>
                            <div className="w-12 h-[1px] bg-[#c29648]/30 mt-6"></div>
                        </div>
                    ))}
                </div>

                {/* Logic / Analysis Section - Navy Glass */}
                <div className="bg-gradient-to-b from-[#1e293b]/50 to-[#0f172a]/50 rounded-[32px] border border-[#c29648]/20 p-8 flex-1 relative mb-4 backdrop-blur-sm shadow-inner">
                    <div className="absolute -top-3 left-8 bg-[#020617] border border-[#c29648]/30 px-4 py-0.5 rounded-full text-[#c29648] text-xs font-bold uppercase tracking-[0.2em]">
                        Logic
                    </div>
                    {item.notes ? (
                        <p className="text-2xl text-slate-200 font-medium italic leading-relaxed text-center opacity-90 px-4 pt-4 drop-shadow-md">
                            &quot;{item.notes}&quot;
                        </p>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-500 text-sm font-medium italic">
                            No strategic notes added.
                        </div>
                    )}
                </div>
            </div>

            {/* Premium Integrated Footer - Darkest Navy */}
            <div className="relative z-10 bg-[#020410] border-t border-[#c29648]/30 p-8 flex items-center gap-5">
                {/* TD Logo Badge */}
                <div className="w-16 h-16 rounded-2xl border-2 border-[#c29648] flex items-center justify-center bg-[#020410] shadow-[0_0_20px_rgba(194,150,72,0.1)] shrink-0">
                    <span className="text-[#c29648] text-3xl font-black tracking-tighter shadow-orange-500/20 drop-shadow-lg">TD</span>
                </div>

                <div className="flex-1">
                    <h2 className="text-white text-2xl font-bold leading-none mb-1 tracking-tight">Traders Diary</h2>
                    <p className="text-slate-400 text-sm font-medium tracking-wide">tradediary.equitymarvels.com</p>
                </div>

                <div className="text-right text-slate-500 text-xs font-bold tracking-widest uppercase">
                    {new Date().toLocaleDateString('en-GB')}
                </div>
            </div>
        </div>
    );
};

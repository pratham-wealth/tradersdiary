import React from 'react';

interface StudyData {
    title: string;
    instrument?: string;
    price?: number;
    direction?: string;
    content: string;
    tags?: string[];
    images?: string[];
    probability?: string;
    study_type?: string;
    created_at: string;
}

export const StudyCardView = ({ data }: { data: StudyData }) => {
    // Helper for formatting prices
    const f = (val?: number) => val ? val.toFixed(2) : '-';

    return (
        <div className="w-[800px] h-[1000px] bg-[#020410] flex flex-col relative overflow-hidden font-sans text-white border-[3px] border-[#c29648]">
            {/* Background Texture - Deep Royal Navy */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-[#020410] opacity-100"></div>

            {/* Main Content Padding */}
            <div className="relative z-10 p-10 flex-1 flex flex-col gap-6">

                {/* 1. Header Section (Compact) */}
                <div className="flex flex-col gap-2 mb-2">
                    <h3 className="text-[#c29648] text-sm font-bold tracking-[0.2em] uppercase opacity-90">Market Analysis</h3>
                    <h1 className="text-5xl font-black text-white tracking-tight uppercase shadow-black drop-shadow-xl leading-none">
                        {data.instrument || data.title} <span className="text-slate-500 font-bold">{data.title !== data.instrument ? data.title : 'Outlook'}</span>
                    </h1>
                </div>

                {/* 2. Chart Section (Dominant - 40% height approx) */}
                <div className="h-[380px] w-full rounded-[24px] border-[2px] border-[#c29648] relative overflow-hidden bg-[#050505] shadow-2xl shrink-0">
                    {data.images && data.images.length > 0 ? (
                        <>
                            <img
                                src={data.images[0]}
                                alt="Chart"
                                className="w-full h-full object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020410]/50 via-transparent to-transparent"></div>

                            {/* Chart Watermark */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                {data.probability && (
                                    <span className="px-3 py-1 bg-black/60 border border-[#c29648]/50 rounded text-[10px] font-bold text-[#c29648] uppercase tracking-widest backdrop-blur-md">
                                        {data.probability} Prob
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-4">
                            <div className="w-16 h-16 rounded-full border-2 border-slate-700 flex items-center justify-center">
                                <span className="text-2xl opacity-50">📊</span>
                            </div>
                            <p className="font-bold text-sm tracking-widest uppercase opacity-50">Chart Unavailable</p>
                        </div>
                    )}
                </div>

                {/* 3. Important Readings (Middle Row) */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-[#c29648] text-xs font-bold tracking-[0.2em] uppercase ml-1 opacity-80">Important Readings</h4>
                    <div className="grid grid-cols-3 gap-4 h-[110px]">
                        {/* CMP Card */}
                        <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-[20px] border border-[#c29648] flex flex-col items-center justify-center shadow-lg relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[#c29648]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">CMP</span>
                            <span className="text-3xl font-black text-white tracking-tighter">
                                {data.price ? `₹${data.price}` : '-'}
                            </span>
                        </div>

                        {/* Target 1 */}
                        <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-[20px] border border-[#c29648] flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#c29648] opacity-50"></div>
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Target 1</span>
                            <span className="text-3xl font-black text-white tracking-tighter">
                                {data.direction === 'LONG' ? '⬆' : data.direction === 'SHORT' ? '⬇' : ''}
                            </span>
                        </div>

                        {/* Target 2 */}
                        <div className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-[20px] border border-[#c29648] flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#c29648] opacity-50"></div>
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Target 2</span>
                            <span className="text-3xl font-black text-white tracking-tighter">
                                🎯
                            </span>
                        </div>
                    </div>
                </div>

                {/* 4. Analysis Section (Bottom Block) */}
                <div className="flex-1 flex flex-col gap-2 relative">
                    <div className="absolute -top-3 left-6 z-10">
                        <span className="bg-[#020410] px-3 py-0.5 text-[#c29648] text-[10px] font-bold tracking-[0.2em] uppercase border border-[#c29648]/30 rounded-full">
                            Analysis
                        </span>
                    </div>
                    <div className="flex-1 rounded-[24px] border border-[#c29648]/30 bg-[#1e293b]/30 p-6 pt-8 backdrop-blur-sm">
                        <p className="text-lg text-slate-200 font-medium leading-relaxed drop-shadow-md line-clamp-4">
                            {data.content}
                        </p>
                    </div>
                </div>
            </div>

            {/* Premium Integrated Footer - Darkest Navy */}
            <div className="relative z-10 bg-[#020410] border-t border-[#c29648]/30 px-8 py-6 flex items-center gap-5 mt-auto">
                {/* TD Logo Badge */}
                <div className="w-14 h-14 rounded-xl border-2 border-[#c29648] flex items-center justify-center bg-[#020410] shadow-[0_0_20px_rgba(194,150,72,0.1)] shrink-0">
                    <span className="text-[#c29648] text-2xl font-black tracking-tighter shadow-orange-500/20 drop-shadow-lg">TD</span>
                </div>

                <div className="flex-1">
                    <h2 className="text-white text-xl font-bold leading-none mb-1 tracking-tight">Traders Diary</h2>
                    <p className="text-slate-400 text-xs font-medium tracking-wide">tradediary.equitymarvels.com</p>
                </div>

                <div className="text-right text-slate-500 text-[10px] font-bold tracking-widest uppercase opacity-70">
                    PUBLISHED: {new Date().toLocaleDateString('en-GB')}
                </div>
            </div>
        </div>
    );
};

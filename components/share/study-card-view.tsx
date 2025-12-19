import React from 'react';

// User Defined Colors (Exact Match)
const COLORS = {
    NAVY: '#001F3F',
    GOLD: '#D4AF37',
    WHITE: '#FFFFFF'
};

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
    // Is Long?
    const isLong = data.direction === 'LONG';

    return (
        <div
            className="w-[800px] h-[1000px] flex flex-col relative overflow-hidden font-sans"
            style={{ backgroundColor: COLORS.NAVY, border: `4px solid ${COLORS.GOLD}` }}
        >
            {/* Background Texture - Subtle Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#002b5c_0%,_#001F3F_60%)] opacity-100"></div>

            {/* Main Content Padding */}
            <div className="relative z-10 p-10 flex-1 flex flex-col gap-6 h-full">

                {/* 1. Header Section */}
                <div className="flex flex-col gap-2 shrink-0">
                    <h3 className="text-sm font-bold tracking-[1px] uppercase opacity-100" style={{ color: COLORS.GOLD }}>
                        MARKET ANALYSIS
                    </h3>
                    <h1 className="text-5xl font-bold tracking-tight uppercase leading-none truncate" style={{ color: COLORS.WHITE }}>
                        {data.instrument || data.title}
                    </h1>
                    {data.title !== data.instrument && (
                        <span className="font-bold text-2xl uppercase tracking-tight opacity-70" style={{ color: COLORS.WHITE }}>{data.title}</span>
                    )}
                </div>

                {/* 2. Chart Section (Matches Proportion Reference: ~45%) */}
                <div
                    className="h-[420px] w-full rounded-[15px] relative overflow-hidden bg-black shadow-2xl shrink-0 flex items-center justify-center"
                    style={{ border: `2px solid ${COLORS.GOLD}` }}
                >
                    {data.images && data.images.length > 0 ? (
                        <>
                            <img
                                src={data.images[0]}
                                alt="Chart"
                                className="w-full h-full object-cover opacity-100"
                            />
                            {/* Chart Watermark */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                {data.probability && (
                                    <span className="px-4 py-2 rounded text-xs font-bold uppercase tracking-widest shadow-xl"
                                        style={{ backgroundColor: COLORS.NAVY, color: COLORS.GOLD, border: `1px solid ${COLORS.GOLD}` }}>
                                        {data.probability} Prob
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <div style={{ color: COLORS.GOLD, fontStyle: 'italic' }}>Chart Placeholder</div>
                    )}
                </div>

                {/* 3. Important Readings (Middle Row) */}
                <div className="flex flex-col gap-3 shrink-0">
                    <h4 className="text-xs font-bold tracking-[1px] uppercase opacity-90" style={{ color: COLORS.GOLD }}>IMPORTANT READINGS</h4>
                    <div className="grid grid-cols-3 gap-4 h-[110px]">
                        {/* CMP Card */}
                        <div className="rounded-[10px] flex flex-col items-center justify-center shadow-lg relative overflow-hidden"
                            style={{ border: `1px solid ${COLORS.GOLD}`, backgroundColor: 'transparent' }}>
                            <span className="text-[12px] font-bold uppercase mb-2 block" style={{ color: COLORS.WHITE }}>CMP</span>
                            <span className="text-3xl font-bold" style={{ color: COLORS.WHITE }}>
                                {data.price ? `₹${data.price}` : '-'}
                            </span>
                        </div>

                        {/* Target 1 */}
                        <div className="rounded-[10px] flex flex-col items-center justify-center shadow-lg relative overflow-hidden"
                            style={{ border: `1px solid ${COLORS.GOLD}`, backgroundColor: 'transparent' }}>
                            <span className="text-[12px] font-bold uppercase mb-2 block" style={{ color: COLORS.WHITE }}>Target 1</span>
                            {isLong ? (
                                <span className="text-3xl font-bold text-emerald-400">⬆ 🎯</span>
                            ) : (
                                <span className="text-3xl font-bold text-rose-400">⬇ 🎯</span>
                            )}
                        </div>

                        {/* Target 2 */}
                        <div className="rounded-[10px] flex flex-col items-center justify-center shadow-lg relative overflow-hidden"
                            style={{ border: `1px solid ${COLORS.GOLD}`, backgroundColor: 'transparent' }}>
                            <span className="text-[12px] font-bold uppercase mb-2 block" style={{ color: COLORS.WHITE }}>Target 2</span>
                            <span className="text-3xl font-bold" style={{ color: COLORS.WHITE }}>
                                🚀
                            </span>
                        </div>
                    </div>
                </div>

                {/* 4. Analysis Section (Bottom Block) */}
                <div className="flex-1 flex flex-col gap-2 relative min-h-0">
                    <h4 className="text-xs font-bold tracking-[1px] uppercase" style={{ color: COLORS.GOLD }}>ANALYSIS</h4>
                    <div className="flex-1 rounded-[10px] p-5 relative"
                        style={{ border: `1px solid ${COLORS.GOLD}`, backgroundColor: 'transparent' }}>
                        <p className="text-lg font-medium leading-1.5 drop-shadow-md line-clamp-4" style={{ color: COLORS.WHITE }}>
                            {data.content}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer - Matching Template */}
            <div className="relative z-10 p-6 flex items-center justify-between mt-auto shrink-0"
                style={{ borderTop: `1px solid ${COLORS.GOLD}`, backgroundColor: 'transparent', marginTop: '25px' }}>

                <div>
                    <span className="font-bold text-lg" style={{ color: COLORS.GOLD }}>TD</span>
                    <span className="ml-2 font-bold" style={{ color: COLORS.GOLD }}>Traders Diary</span>
                    <br />
                    <span className="text-xs" style={{ color: COLORS.WHITE }}>https://tradediary.equitymarvels.com</span>
                </div>

                <div className="text-right text-xs" style={{ color: COLORS.WHITE }}>
                    <span style={{ color: COLORS.GOLD }}>PUBLISHED:</span> {new Date().toLocaleDateString('en-GB')}
                </div>
            </div>
        </div>
    );
};

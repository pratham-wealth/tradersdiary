import React from 'react';

// User Defined Colors for Watchlist (Trading Card)
const COLORS = {
    BLUE: '#001F5B',
    GOLD: '#C0A060', // Note: specific gold from snippet
    WHITE: '#FFFFFF'
};

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
    // Helper for formatting prices
    const f = (val?: number | null) => val ? val.toFixed(2) : '-';

    return (
        <div
            className="w-[800px] h-[1000px] flex flex-col relative overflow-hidden font-sans"
            style={{
                backgroundColor: COLORS.BLUE,
                border: `4px solid ${COLORS.GOLD}`, // Scaled up border
                padding: '50px' // Scaled padding (20px * 2.5)
            }}
        >
            {/* Main Flex Container */}
            <div className="flex-1 flex flex-col">

                {/* 1. Header (Symbol + Button) */}
                <div className="flex justify-between items-start mb-12"> {/* Scaled margin */}
                    <div className="flex flex-col gap-2">
                        <div className="font-bold tracking-[1px] text-xl" style={{ color: COLORS.GOLD }}>
                            TRADE IDEA
                        </div>
                        <h1 className="text-7xl font-bold m-0 leading-none" style={{ color: COLORS.WHITE }}>
                            {item.instrument}
                        </h1>
                    </div>
                    <div className="px-8 py-3 rounded-[40px] font-bold text-3xl tracking-wide border-none"
                        style={{ backgroundColor: COLORS.GOLD, color: COLORS.BLUE }}>
                        {item.direction}
                    </div>
                </div>

                {/* 2. Data Blocks (Row) */}
                <div className="flex justify-between mb-12 gap-4">
                    {[
                        { label: 'ENTRY', val: f(item.entry_level) },
                        { label: 'STOP', val: f(item.stop_loss) },
                        { label: 'TARGET', val: f(item.target_price) }
                    ].map((cell, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center justify-center p-6 text-center rounded-[24px]"
                            style={{
                                backgroundColor: COLORS.BLUE,
                                border: `4px solid ${COLORS.GOLD}` // thicker border for scale
                            }}>
                            <span className="font-bold mb-4 block uppercase text-xl" style={{ color: COLORS.GOLD }}>{cell.label}</span>
                            <span className="text-5xl font-bold" style={{ color: COLORS.WHITE }}>{cell.val}</span>
                        </div>
                    ))}
                </div>

                {/* 3. Logic Block */}
                <div className="relative p-10 mb-8 rounded-[24px]"
                    style={{
                        backgroundColor: COLORS.BLUE,
                        border: `4px solid ${COLORS.GOLD}`
                    }}>
                    <span className="absolute -top-5 left-10 px-4 py-1 font-bold text-lg uppercase"
                        style={{ backgroundColor: COLORS.BLUE, color: COLORS.GOLD }}>
                        LOGIC
                    </span>
                    <p className="text-3xl italic leading-relaxed m-0 text-center text-slate-100">
                        "{item.notes || 'No strategic notes added.'}"
                    </p>
                </div>

                {/* 4. Date */}
                <div className="text-center text-2xl mb-12 opacity-80" style={{ color: COLORS.WHITE }}>
                    {new Date().toLocaleDateString('en-GB')}
                </div>

            </div>

            {/* 5. Footer - Sticky Bottom */}
            <div className="flex items-center pt-8 mt-auto"
                style={{ borderTop: `2px solid ${COLORS.GOLD}` }}>

                {/* Logo Box */}
                <div className="w-16 h-16 flex justify-center items-center font-bold text-3xl rounded-[16px] mr-6"
                    style={{ backgroundColor: COLORS.GOLD, color: COLORS.BLUE }}>
                    TD
                </div>

                {/* Footer Text */}
                <div className="flex flex-col">
                    <span className="font-bold text-3xl mb-1" style={{ color: COLORS.WHITE }}>Traders Diary</span>
                    <span className="text-xl opacity-80" style={{ color: COLORS.WHITE }}>https://tradediary.equitymarvels.com</span>
                </div>
            </div>
        </div>
    );
};

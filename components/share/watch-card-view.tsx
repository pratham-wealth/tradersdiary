import React from 'react';

interface WatchCardViewProps {
    item: {
        instrument: string;
        direction: 'LONG' | 'SHORT';
        entry_level?: number | string | null;
        stop_loss?: number | string | null;
        target_price?: number | string | null;
        notes?: string | null;
        created_at: string;
    };
}

export function WatchCardView({ item }: WatchCardViewProps) {
    const isLong = item.direction === 'LONG';
    const entry = item.entry_level || 'Market';
    const stop = item.stop_loss || '-';
    const target = item.target_price || '-';
    const dateStr = new Date(item.created_at).toLocaleDateString();

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#020617', // Slate-950
            padding: '40px', // p-10 equivalent
            fontFamily: 'sans-serif',
            boxSizing: 'border-box',
        }}>
            {/* Content Container */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 12, color: '#818cf8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                            Trade Idea
                        </span>
                        {/* Title - 36px matches text-4xl */}
                        <span style={{ fontSize: 36, fontWeight: 900, color: 'white', letterSpacing: '-0.025em', lineHeight: 1 }}>
                            {item.instrument}
                        </span>
                    </div>
                    {/* Badge */}
                    <div style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: isLong ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        border: `1px solid ${isLong ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                        color: isLong ? '#4ade80' : '#f87171'
                    }}>
                        <span style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase' }}>{item.direction}</span>
                    </div>
                </div>

                {/* Levels Grid */}
                <div style={{ display: 'flex', gap: '12px', margin: '8px 0' }}>
                    {/* Entry */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 400, marginBottom: 4, display: 'block' }}>Entry</span>
                        <span style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>{entry}</span>
                    </div>
                    {/* Stop */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 400, marginBottom: 4, display: 'block' }}>Stop</span>
                        <span style={{ fontSize: 18, fontWeight: 700, color: '#f87171' }}>{stop}</span>
                    </div>
                    {/* Target */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 400, marginBottom: 4, display: 'block' }}>Target</span>
                        <span style={{ fontSize: 18, fontWeight: 700, color: '#4ade80' }}>{target}</span>
                    </div>
                </div>

                {/* Logic Box */}
                {item.notes && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'rgba(30, 41, 59, 0.3)',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        position: 'relative',
                        marginTop: '0'
                    }}>
                        <span style={{
                            position: 'absolute',
                            top: '-8px',
                            left: '16px',
                            padding: '0 8px',
                            backgroundColor: '#0f172a',
                            color: '#94a3b8',
                            fontSize: 10,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            /* borderRadius: '0' */
                        }}>
                            Logic
                        </span>
                        <span style={{ fontSize: 14, color: '#cbd5e1', fontStyle: 'italic', lineHeight: 1.625 }}>
                            "{item.notes}"
                        </span>
                    </div>
                )}

                {/* Footer */}
                <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>TD</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>Traders Diary</span>
                            <span style={{ fontSize: 12, color: '#94a3b8' }}>tradediary.equitymarvels.com</span>
                        </div>
                    </div>
                    <span style={{ fontSize: 12, color: '#64748b' }}>{dateStr}</span>
                </div>
            </div>
        </div>
    );
}

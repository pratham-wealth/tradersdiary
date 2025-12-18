import React from 'react';

/* eslint-disable @next/next/no-img-element */

interface StudyCardViewProps {
    data: {
        title: string;
        direction: 'LONG' | 'SHORT' | 'NEUTRAL' | string;
        images?: string[];
        price?: number;
        probability?: string;
        content?: string;
        created_at: string;
        target_price?: number;
        stop_loss?: number;
    };
}

export function StudyCardView({ data }: StudyCardViewProps) {
    const isLong = data.direction === 'LONG';
    const isShort = data.direction === 'SHORT';

    // Theme Colors
    const greenBg = 'rgba(34, 197, 94, 0.1)';
    const greenBorder = 'rgba(34, 197, 94, 0.2)';
    const greenText = '#4ade80';

    const redBg = 'rgba(239, 68, 68, 0.1)';
    const redBorder = 'rgba(239, 68, 68, 0.2)';
    const redText = '#f87171';

    const dateStr = new Date(data.created_at).toLocaleDateString();

    return (
        <div style={{
            width: '800px', // Exact width
            // height: '100%', // Natural height in modal, but 1000px in OG
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#020617', // Slate-950
            padding: '40px', // p-10
            fontFamily: 'sans-serif',
            boxSizing: 'border-box',
            position: 'relative'
        }}>
            {/* Header Section */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 12, color: '#818cf8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                        Market Analysis
                    </span>
                    <span style={{ fontSize: 36, fontWeight: 900, color: 'white', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                        {data.title}
                    </span>
                </div>
                {/* Badge */}
                <div style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: isLong ? greenBg : isShort ? redBg : 'rgba(51, 65, 85, 0.5)',
                    border: `1px solid ${isLong ? greenBorder : isShort ? redBorder : 'rgba(255,255,255,0.1)'}`,
                    color: isLong ? greenText : isShort ? redText : '#94a3b8'
                }}>
                    <span style={{ fontSize: 24, fontWeight: 700, textTransform: 'uppercase' }}>{data.direction || 'NEUTRAL'}</span>
                </div>
            </div>

            {/* Image Section - Reduced Height as requested (was flex-1) */}
            {data.images && data.images.length > 0 && (
                <div style={{
                    width: '100%',
                    height: '380px', // Reduced height fixed
                    backgroundColor: '#000000', // Black bg for chart contrast
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px'
                }}>
                    <img
                        src={data.images[0]}
                        alt="Chart"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain'
                        }}
                    />
                </div>
            )}

            {/* Data Bar */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {data.price && (
                    <div style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>CMP</span>
                        <span style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>₹{data.price.toFixed(2)}</span>
                    </div>
                )}
                {data.probability && (
                    <div style={{
                        padding: '8px 16px', borderRadius: '8px',
                        backgroundColor: data.probability === 'HIGH' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(30, 41, 59, 0.5)',
                        border: `1px solid ${data.probability === 'HIGH' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)'}`,
                        display: 'flex', alignItems: 'center', gap: '12px'
                    }}>
                        <span style={{ fontSize: 12, color: data.probability === 'HIGH' ? '#4ade80' : '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', opacity: 0.8 }}>Prob</span>
                        <span style={{ fontSize: 24, fontWeight: 700, color: 'white', textTransform: 'uppercase' }}>{data.probability.replace('_', ' ')}</span>
                    </div>
                )}
                {data.target_price && (
                    <div style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>Target</span>
                        <span style={{ fontSize: 24, fontWeight: 700, color: '#4ade80' }}>{data.target_price}</span>
                    </div>
                )}
            </div>

            {/* Logic Content - Increased Font Size */}
            <div style={{
                backgroundColor: 'rgba(30, 41, 59, 0.3)',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative',
                flex: 1, // Fill remaining space
            }}>
                <span style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '24px',
                    padding: '2px 8px',
                    backgroundColor: '#0f172a',
                    color: '#94a3b8',
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '4px'
                }}>
                    Logic
                </span>
                <p style={{
                    fontSize: 20, // Increased from 18px (text-lg) to 20px
                    color: '#cbd5e1',
                    fontWeight: 500,
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    margin: 0
                }}>
                    {data.content}
                </p>
            </div>

            {/* Footer - Updated Font Size */}
            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>TD</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>Traders Diary</span>
                        <span style={{ fontSize: 14, color: '#94a3b8' }}>tradediary.equitymarvels.com</span>
                    </div>
                </div>
                {/* Increased Date Font Size from 12px to 14px */}
                <div style={{ fontSize: 14, color: '#64748b', fontFamily: 'monospace' }}>
                    {dateStr}
                </div>
            </div>

        </div>
    );
}

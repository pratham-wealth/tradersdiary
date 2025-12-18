
import { ImageResponse } from 'next/og';
import { getWatchItemById } from '@/app/dashboard/watch/actions';

export const runtime = 'edge';

export default async function Image({ params }: { params: { id: string } }) {
    const { id } = await params;
    const item = await getWatchItemById(id);

    if (!item) {
        return new ImageResponse(
            (
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#020617',
                    color: '#64748B',
                    fontSize: 48,
                    fontWeight: 'bold',
                }}>
                    Trade Setup Not Found
                </div>
            ),
            { width: 1200, height: 630 }
        );
    }

    const isLong = item.direction === 'LONG';
    const mainColor = isLong ? '#10B981' : '#F43F5E'; // Emerald-500 : Rose-500
    const cardBg = '#1e293b'; // Slate-800

    return new ImageResponse(
        (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#020617', // Slate-950
                padding: '40px',
                fontFamily: '"DM Sans", sans-serif',
            }}>
                {/* Background Decoration */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '1000px',
                    height: '1000px',
                    background: `radial-gradient(circle, ${isLong ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)'} 0%, transparent 70%)`,
                    zIndex: 0
                }} />

                {/* Main Centered Card Container */}
                <div style={{
                    width: '900px', // Constrained width
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: cardBg,
                    borderRadius: '32px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.7)',
                    padding: '50px',
                    position: 'relative',
                    zIndex: 10,
                }}>
                    {/* Header: Instrument & Direction */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 20, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '8px' }}>
                                Trade Idea
                            </span>
                            <span style={{ fontSize: 64, fontWeight: 900, color: 'white', lineHeight: 1 }}>
                                {item.instrument}
                            </span>
                        </div>

                        {/* Direction Badge */}
                        <div style={{
                            backgroundColor: isLong ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)',
                            border: `2px solid ${mainColor}`,
                            color: mainColor,
                            fontSize: 28,
                            fontWeight: 900,
                            padding: '12px 30px',
                            borderRadius: '16px',
                            textTransform: 'uppercase',
                        }}>
                            {item.direction}
                        </div>
                    </div>

                    {/* Levels Grid */}
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
                        {/* Entry */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(2, 6, 23, 0.4)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: 16, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Entry</span>
                            <span style={{ fontSize: 36, fontWeight: 'bold', color: '#60A5FA' }}>{item.entry_level || 'MKT'}</span>
                        </div>

                        {/* Stop */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(2, 6, 23, 0.4)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: 16, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Stop Loss</span>
                            <span style={{ fontSize: 36, fontWeight: 'bold', color: '#F43F5E' }}>{item.stop_loss || '-'}</span>
                        </div>

                        {/* Target */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(2, 6, 23, 0.4)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: 16, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Target</span>
                            <span style={{ fontSize: 36, fontWeight: 'bold', color: '#10B981' }}>{item.target_price || 'Open'}</span>
                        </div>
                    </div>

                    {/* Logic / Notes */}
                    {item.notes && (
                        <div style={{
                            backgroundColor: 'rgba(2, 6, 23, 0.2)',
                            borderRadius: '20px',
                            padding: '24px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '30px'
                        }}>
                            <span style={{ fontSize: 14, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>Logic</span>
                            <span style={{ fontSize: 20, color: '#CBD5E1', lineHeight: 1.5, fontStyle: 'italic', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                "{item.notes}"
                            </span>
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>TD</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Traders Diary</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8' }}>
                            <span style={{ fontSize: 16, fontWeight: 'bold' }}>{new Date(item.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}

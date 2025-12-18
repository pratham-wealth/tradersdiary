
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
    const bgColor = '#0f172a'; // Slate-900
    const cardBg = '#1e293b'; // Slate-800

    return new ImageResponse(
        (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#020617', // Slate-950
                padding: '60px',
                fontFamily: 'sans-serif',
            }}>
                {/* Decoration Gradient */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    background: `linear-gradient(to bottom, ${isLong ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)'}, transparent)`,
                }} />

                {/* Main Card */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: cardBg,
                    borderRadius: '40px',
                    border: '2px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    padding: '60px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Header: Instrument & Direction */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '60px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 24, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '10px' }}>
                                Trade Idea
                            </span>
                            <span style={{ fontSize: 80, fontWeight: 900, color: 'white', lineHeight: 1 }}>
                                {item.instrument}
                            </span>
                        </div>

                        {/* Direction Badge */}
                        <div style={{
                            backgroundColor: mainColor,
                            color: isLong ? '#020617' : 'white',
                            fontSize: 32,
                            fontWeight: 900,
                            padding: '16px 40px',
                            borderRadius: '20px',
                            textTransform: 'uppercase',
                            boxShadow: `0 10px 30px -10px ${mainColor}`,
                        }}>
                            {item.direction}
                        </div>
                    </div>

                    {/* Levels Grid */}
                    <div style={{ display: 'flex', gap: '40px', marginBottom: 'auto' }}>
                        {/* Entry */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(2, 6, 23, 0.3)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: 20, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Entry</span>
                            <span style={{ fontSize: 48, fontWeight: 'bold', color: '#60A5FA' }}>{item.entry_level || 'MKT'}</span>
                        </div>

                        {/* Stop */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(2, 6, 23, 0.3)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: 20, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Stop Loss</span>
                            <span style={{ fontSize: 48, fontWeight: 'bold', color: '#F43F5E' }}>{item.stop_loss || '-'}</span>
                        </div>

                        {/* Target */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(2, 6, 23, 0.3)', padding: '30px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: 20, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Target</span>
                            <span style={{ fontSize: 48, fontWeight: 'bold', color: '#10B981' }}>{item.target_price || 'Open'}</span>
                        </div>
                    </div>

                    {/* Logic / Notes (Missing in previous version) */}
                    {item.notes && (
                        <div style={{
                            backgroundColor: 'rgba(30, 41, 59, 0.3)',
                            borderRadius: '24px',
                            padding: '30px',
                            marginBottom: '40px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-15px',
                                left: '30px',
                                backgroundColor: '#0F172A',
                                color: '#94A3B8',
                                fontSize: 16,
                                fontWeight: 'bold',
                                padding: '5px 15px',
                                borderRadius: '8px',
                                textTransform: 'uppercase',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}>
                                Logic
                            </div>
                            <span style={{ fontSize: 24, color: '#CBD5E1', lineHeight: 1.5, fontStyle: 'italic' }}>
                                "{item.notes}"
                            </span>
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Traders Diary</span>
                            <span style={{ fontSize: 16, color: '#94A3B8' }}>tradediary.equitymarvels.com</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94A3B8', fontSize: 18 }}>
                            <span>{new Date(item.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}

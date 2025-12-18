
import { ImageResponse } from 'next/og';
import { getWatchItemById } from '@/app/dashboard/watch/actions';

export const runtime = 'nodejs';

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
            { width: 800, height: 1000 }
        );
    }

    const isLong = item.direction === 'LONG';

    return new ImageResponse(
        (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#020617', // Slate-950 (Capture background)
                padding: '40px', // Matches capture default padding
                fontFamily: '"DM Sans", sans-serif',
            }}>
                {/* Content Container - Matches 'flex flex-col gap-4' */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', height: '100%' }}>

                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 14, color: '#818cf8', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                                Trade Idea
                            </span>
                            <span style={{ fontSize: 48, fontWeight: 900, color: 'white', letterSpacing: '-0.025em', lineHeight: 1 }}>
                                {item.instrument}
                            </span>
                        </div>
                        <div style={{
                            padding: '6px 16px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: isLong ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            border: `1px solid ${isLong ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                            color: isLong ? '#4ade80' : '#f87171'
                        }}>
                            <span style={{ fontSize: 20, fontWeight: 700, textTransform: 'uppercase' }}>{item.direction}</span>
                        </div>
                    </div>

                    {/* Levels Grid - Matches 'grid grid-cols-3 gap-3' */}
                    <div style={{ display: 'flex', gap: '12px', margin: '8px 0' }}>
                        {/* Entry */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 4 }}>Entry</span>
                            <span style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>{item.entry_level || 'MKT'}</span>
                        </div>
                        {/* Stop */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 4 }}>Stop</span>
                            <span style={{ fontSize: 24, fontWeight: 700, color: '#f87171' }}>{item.stop_loss || '-'}</span>
                        </div>
                        {/* Target */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', backgroundColor: 'rgba(30, 41, 59, 0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <span style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 4 }}>Target</span>
                            <span style={{ fontSize: 24, fontWeight: 700, color: '#4ade80' }}>{item.target_price || '-'}</span>
                        </div>
                    </div>

                    {/* Logic Box */}
                    {item.notes && (
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'rgba(30, 41, 59, 0.3)',
                            padding: '24px',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            position: 'relative',
                            marginTop: '10px'
                        }}>
                            <span style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '16px',
                                padding: '2px 8px',
                                backgroundColor: '#0f172a',
                                color: '#94a3b8',
                                fontSize: 10,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                borderRadius: '4px'
                            }}>
                                Logic
                            </span>
                            <span style={{ fontSize: 18, color: '#cbd5e1', fontStyle: 'italic', lineHeight: 1.6 }}>
                                "{item.notes}"
                            </span>
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: 40, height: 40, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>TD</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>Traders Diary</span>
                                <span style={{ fontSize: 12, color: '#94a3b8' }}>tradediary.equitymarvels.com</span>
                            </div>
                        </div>
                        <span style={{ fontSize: 12, color: '#64748b' }}>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>

                </div>
            </div>
        ),
        { width: 800, height: 1000 }
    );
}

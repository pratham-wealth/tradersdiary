
import { ImageResponse } from 'next/og';
import { getStudyById } from '@/app/dashboard/studies/actions';

export const runtime = 'edge';

export default async function Image({ params }: { params: { id: string } }) {
    const { id } = await params;
    const study = await getStudyById(id);

    if (!study) {
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
                    Study Not Found
                </div>
            ),
            { width: 1200, height: 630 }
        );
    }

    const isLong = study.direction === 'LONG';
    const mainColor = isLong ? '#10B981' : '#F43F5E'; // Emerald-500 : Rose-500

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#020617', // Slate-950
                    padding: '40px',
                    fontFamily: '"DM Sans", sans-serif',
                }}
            >
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 20, fontWeight: 'bold', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '2px' }}>Market Analysis</span>
                        <span style={{ fontSize: 48, fontWeight: 900, color: 'white', lineHeight: 1.1 }}>{study.instrument || study.title}</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        backgroundColor: isLong ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                        border: `2px solid ${mainColor}`,
                        borderRadius: '12px',
                        padding: '8px 24px',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ fontSize: 24, fontWeight: 'bold', color: mainColor }}>{study.direction}</span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '20px', overflow: 'hidden' }}>

                    {/* Chart Image Container - Fixed Height Constraint */}
                    {study.images && study.images.length > 0 && (
                        <div style={{
                            display: 'flex',
                            height: '320px', // Fixed height
                            width: '100%',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            backgroundColor: '#0F172A',
                            border: '1px solid rgba(255,255,255,0.1)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}>
                            <img
                                src={study.images[0]}
                                style={{
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    )}

                    {/* Data Row & Logic */}
                    <div style={{ display: 'flex', gap: '20px', flex: 1 }}>

                        {/* Data Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '280px', flexShrink: 0 }}>
                            {study.price && (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderRadius: '12px', backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ fontSize: 16, color: '#94A3B8', fontWeight: 'bold' }}>CMP</span>
                                    <span style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>₹{study.price.toFixed(2)}</span>
                                </div>
                            )}
                            {study.probability && (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderRadius: '12px', backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ fontSize: 16, color: '#94A3B8', fontWeight: 'bold' }}>Prob</span>
                                    <span style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>{study.probability.replace('_', ' ')}</span>
                                </div>
                            )}
                        </div>

                        {/* Logic / Description */}
                        <div style={{
                            flex: 1,
                            backgroundColor: 'rgba(30, 41, 59, 0.3)',
                            borderRadius: '16px',
                            padding: '20px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}>
                            <span style={{ fontSize: 14, color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Analysis</span>
                            <span style={{ fontSize: 18, color: '#CBD5E1', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {study.content || 'Analysis provided inside.'}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>TD</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Traders Diary</span>
                            <span style={{ fontSize: 12, color: '#94A3B8' }}>tradediary.equitymarvels.com</span>
                        </div>
                    </div>
                    <span style={{ fontSize: 14, color: '#64748B', fontWeight: 'bold' }}>
                        {new Date(study.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}

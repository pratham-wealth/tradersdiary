
import { ImageResponse } from 'next/og';
import { getStudyById } from '@/app/dashboard/studies/actions';

export const runtime = 'edge';

export default async function Image({ params }: { params: { id: string } }) {
    const { id } = await params;
    const study = await getStudyById(id);

    if (!study) {
        return new ImageResponse(
            (
                <div
                    style={{
                        fontSize: 40,
                        color: 'white',
                        background: '#020617',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Study Not Found
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    }

    const isLong = study.direction === 'LONG';
    const mainColor = isLong ? '#10B981' : '#F43F5E'; // Emerald-500 : Rose-500
    // Darker bg
    const bgGradient = isLong
        ? 'linear-gradient(to bottom right, #020617, #064E3B)'
        : 'linear-gradient(to bottom right, #020617, #881337)';

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#020617', // Slate-950
                    padding: '60px',
                    fontFamily: '"DM Sans", sans-serif',
                }}
            >
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 24, fontWeight: 'bold', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '5px' }}>Market Analysis</span>
                        <span style={{ fontSize: 70, fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-2px' }}>{study.instrument || study.title}</span>
                    </div>

                    <div style={{
                        display: 'flex',
                        backgroundColor: isLong ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                        border: `2px solid ${mainColor}`,
                        borderRadius: '20px',
                        padding: '10px 40px',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <span style={{ fontSize: 36, fontWeight: 'bold', color: mainColor }}>{study.direction}</span>
                    </div>
                </div>

                {/* Main Content Area: Image + Text */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '30px' }}>

                    {/* Image Area (If exists) use roughly 50-60% of vertical space */}
                    {study.images && study.images.length > 0 ? (
                        <div style={{
                            display: 'flex',
                            flex: 1,
                            minHeight: '300px',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}>
                            {/* We use backgroundImage for better sizing control in OG, or standard img tag */}
                            <img
                                src={study.images[0]}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                    ) : (
                        // Fallback: Large Price/Levels if no image
                        <div style={{ display: 'flex', gap: '30px', flex: 1, alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#1E293B', borderRadius: '24px', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', height: '100%' }}>
                                <span style={{ fontSize: 24, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Entry</span>
                                <span style={{ fontSize: 60, fontWeight: 'bold', color: 'white' }}>{study.price || '-'}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#1E293B', borderRadius: '24px', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', height: '100%' }}>
                                <span style={{ fontSize: 24, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Target</span>
                                <span style={{ fontSize: 60, fontWeight: 'bold', color: '#10B981' }}>{study.target_price || '-'}</span>
                            </div>
                        </div>
                    )}

                    {/* Data Row: Price/Prob (Only show if Image is present, otherwise shown above) */}
                    {study.images && study.images.length > 0 && (
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {study.price && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 20px', borderRadius: '12px', backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ fontSize: 20, color: '#94A3B8', fontWeight: 'bold' }}>CMP</span>
                                    <span style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>₹{study.price.toFixed(2)}</span>
                                </div>
                            )}
                            {study.probability && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 20px', borderRadius: '12px', backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ fontSize: 20, color: '#94A3B8', fontWeight: 'bold' }}>Prob</span>
                                    <span style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>{study.probability.replace('_', ' ')}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Logic / Analysis Text */}
                    <div style={{
                        backgroundColor: 'rgba(30, 41, 59, 0.3)',
                        borderRadius: '20px',
                        padding: '30px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <span style={{ fontSize: 28, color: '#CBD5E1', lineHeight: 1.4, whiteSpace: 'pre-wrap', maxHeight: '120px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                            {study.content || 'Analysis provided inside.'}
                        </span>
                    </div>

                </div>

                {/* Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.4)' }}>
                            <span style={{ fontSize: 32, fontWeight: 900, color: 'white' }}>TD</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Traders Diary</span>
                            <span style={{ fontSize: 16, color: '#94A3B8' }}>tradediary.equitymarvels.com</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}

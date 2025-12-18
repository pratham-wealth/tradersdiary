
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
                    backgroundColor: '#020617', // Slate-950
                    fontFamily: '"DM Sans", sans-serif',
                }}
            >
                {/* Left Side: Chart (65%) */}
                <div style={{
                    flex: 1.8,
                    display: 'flex',
                    backgroundColor: '#0F172A',
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px'
                }}>
                    {/* Background Grid */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle at 10% 10%, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                    {study.images && study.images.length > 0 ? (
                        <img
                            src={study.images[0]}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'
                            }}
                        />
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: 40, color: '#334155', fontWeight: 'bold' }}>CHART PREVIEW</span>
                        </div>
                    )}

                    {/* Branding overlay on chart */}
                    <div style={{ position: 'absolute', bottom: '30px', left: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>TD</span>
                        </div>
                        <span style={{ fontSize: 18, fontWeight: 'bold', color: 'rgba(255,255,255,0.8)' }}>Traders Diary</span>
                    </div>
                </div>

                {/* Right Side: Data Card (35%) */}
                <div style={{
                    flex: 1.2,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '50px',
                    justifyContent: 'center',
                    backgroundColor: '#020617', // Darker background
                    position: 'relative'
                }}>
                    {/* Header */}
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span style={{ fontSize: 18, fontWeight: 'bold', color: '#6366f1', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Trade Idea</span>

                            {/* Direction Badge */}
                            <div style={{
                                backgroundColor: isLong ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                                border: `1px solid ${mainColor}`,
                                borderRadius: '8px',
                                padding: '6px 16px',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: 20, fontWeight: 'bold', color: mainColor }}>{study.direction}</span>
                            </div>
                        </div>
                        <span style={{ fontSize: 60, fontWeight: 900, color: 'white', lineHeight: 1 }}>{study.instrument || study.title}</span>
                    </div>

                    {/* Stats Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            {/* CMP */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', backgroundColor: '#1E293B', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>Price</span>
                                <span style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>
                                    {study.price ? `₹${study.price.toFixed(2)}` : '-'}
                                </span>
                            </div>
                            {/* Probability */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', backgroundColor: '#1E293B', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <span style={{ fontSize: 14, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>Probability</span>
                                <span style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>
                                    {study.probability ? study.probability.replace('_', ' ') : '-'}
                                </span>
                            </div>
                        </div>

                        {/* Targets/Stops if available (Simplified) */}
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {study.target_price && (
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                    <span style={{ fontSize: 14, color: '#6EE7B7', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>Target</span>
                                    <span style={{ fontSize: 32, fontWeight: 'bold', color: '#34D399' }}>₹{study.target_price}</span>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Logic Snippet */}
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                        <span style={{ fontSize: 14, color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Analysis</span>
                        <span style={{ fontSize: 20, color: '#CBD5E1', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {study.content || 'Detailed analysis available on Traders Diary.'}
                        </span>
                    </div>

                    <div style={{ marginTop: '30px', fontSize: 14, color: '#475569', fontWeight: 'bold' }}>
                        {new Date(study.created_at).toLocaleDateString()}
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

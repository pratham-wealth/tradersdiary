
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
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    backgroundColor: '#020617',
                    padding: '60px',
                    fontFamily: '"DM Sans", sans-serif',
                }}
            >
                {/* Card Container similar to user's image */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                }}>

                    {/* Header Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 24, fontWeight: 'bold', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Trade Idea</span>
                            <span style={{ fontSize: 90, fontWeight: 900, color: 'white', lineHeight: 1 }}>{study.instrument}</span>
                        </div>

                        <div style={{
                            backgroundColor: 'rgba(30, 41, 59, 0.5)',
                            border: `2px solid ${mainColor}`,
                            borderRadius: '20px',
                            padding: '15px 40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <span style={{ fontSize: 32, fontWeight: 'bold', color: mainColor }}>{study.direction}</span>
                        </div>
                    </div>

                    {/* Levels Boxes */}
                    <div style={{ display: 'flex', gap: '30px', marginBottom: '50px' }}>
                        {/* Entry */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#1E293B', borderRadius: '24px', padding: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ fontSize: 20, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Entry</span>
                            <span style={{ fontSize: 48, fontWeight: 'bold', color: 'white' }}>{study.price || '-'}</span>
                        </div>
                        {/* Stop */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#1E293B', borderRadius: '24px', padding: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ fontSize: 20, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Stop</span>
                            <span style={{ fontSize: 48, fontWeight: 'bold', color: '#fb7185' }}>{study.stop_loss || '-'}</span>
                        </div>
                        {/* Target */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#1E293B', borderRadius: '24px', padding: '30px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ fontSize: 20, color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px' }}>Target</span>
                            <span style={{ fontSize: 48, fontWeight: 'bold', color: '#34d399' }}>{study.target_price || '-'}</span>
                        </div>
                    </div>

                    {/* Logic Box */}
                    <div style={{
                        flex: 1,
                        backgroundColor: 'rgba(30, 41, 59, 0.3)',
                        borderRadius: '24px',
                        padding: '40px',
                        border: '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <span style={{ display: 'flex', backgroundColor: '#0F172A', color: '#94A3B8', fontSize: 16, fontWeight: 'bold', padding: '5px 15px', borderRadius: '8px', alignSelf: 'flex-start', marginBottom: '20px', textTransform: 'uppercase' }}>Logic</span>
                        <span style={{ fontSize: 32, color: 'white', fontStyle: 'italic', lineHeight: 1.4 }}>"{study.content || 'Analysis provided inside.'}"</span>
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            {/* Logo Mock */}
                            <div style={{ width: 60, height: 60, borderRadius: 15, background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>TD</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Traders Diary</span>
                                <span style={{ fontSize: 16, color: '#94A3B8' }}>tradediary.equitymarvels.com</span>
                            </div>
                        </div>
                        <span style={{ fontSize: 16, color: '#64748B', fontWeight: 'bold' }}>
                            SETUP DATE: {new Date(study.created_at).toLocaleDateString()}
                        </span>
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

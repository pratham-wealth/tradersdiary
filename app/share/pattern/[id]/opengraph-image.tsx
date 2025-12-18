
import { ImageResponse } from 'next/og';
import { getPatternById } from '@/app/dashboard/learn/actions';

export const runtime = 'nodejs';

// Font configuration (if you had custom fonts, but using system sans for simplicity/reliability in this env)

export default async function Image({ params }: { params: { id: string } }) {
    const { id } = await params;
    const pattern = await getPatternById(id);

    if (!pattern) {
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
                    Pattern Not Found
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    }

    // Color logic
    const isPremium = pattern.is_premium;
    const accentColor = '#10B981'; // Emerald
    const goldColor = '#fbbf24'; // Amber-400

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#020617', // Slate-950
                    padding: '50px',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Background Decor */}
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-20%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(2, 6, 23, 0) 70%)',
                    zIndex: 0
                }} />

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    zIndex: 10
                }}>

                    {/* Header: Title and Win Rate */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 22, fontWeight: 'bold', color: goldColor, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>
                                {pattern.group_name || 'Trading Pattern'}
                            </span>
                            <span style={{ fontSize: 72, fontWeight: 900, color: 'white', lineHeight: 1.1 }}>
                                {pattern.name}
                            </span>
                        </div>

                        {/* Win Rate Badge */}
                        <div style={{
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            border: `2px solid ${accentColor}`,
                            borderRadius: '50px',
                            padding: '12px 35px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 30px rgba(16, 185, 129, 0.2)'
                        }}>
                            <span style={{ fontSize: 36, fontWeight: 'bold', color: accentColor }}>{pattern.success_ratio} WR</span>
                        </div>
                    </div>

                    {/* Main Content Area: Vertical Stack */}
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '30px' }}>

                        {/* Chart Image Container (Prominent) */}
                        <div style={{
                            flex: 1,
                            minHeight: '300px',
                            display: 'flex',
                            backgroundColor: '#0F172A', // Slate-900
                            borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
                        }}>
                            {/* Grid Lines Mock */}
                            <div style={{ position: 'absolute', top: 40, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.05)' }} />
                            <div style={{ position: 'absolute', top: 120, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.05)' }} />

                            {pattern.image_url ? (
                                <img
                                    src={pattern.image_url}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain'
                                    }}
                                />
                            ) : (
                                <span style={{ fontSize: 24, color: '#475569' }}>No Chart Preview</span>
                            )}
                        </div>

                        {/* Mid Row: Tags and Description */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {/* Tags Row */}
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{
                                    padding: '8px 20px',
                                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                                    borderRadius: '12px',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#94A3B8',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    {pattern.type}
                                </div>
                                <div style={{
                                    padding: '8px 20px',
                                    backgroundColor: isPremium ? 'rgba(244, 63, 94, 0.1)' : 'rgba(30, 41, 59, 0.5)',
                                    borderRadius: '12px',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: isPremium ? '#F43F5E' : '#94A3B8',
                                    border: `1px solid ${isPremium ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255,255,255,0.1)'}`
                                }}>
                                    {isPremium ? 'PREMIUM' : 'FREE'}
                                </div>
                            </div>

                            {/* Description Box */}
                            <div style={{
                                backgroundColor: 'rgba(30, 41, 59, 0.3)',
                                borderRadius: '20px',
                                padding: '30px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <span style={{ fontSize: 24, color: '#CBD5E1', lineHeight: 1.5, display: '-webkit-box', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                    {pattern.description || 'Master this trading setup using our comprehensive guide.'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '30px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {/* Logo */}
                            <div style={{
                                width: 50,
                                height: 50,
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                            }}>
                                <span style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>TD</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Traders Diary</span>
                                <span style={{ fontSize: 14, color: '#94A3B8' }}>tradediary.equitymarvels.com</span>
                            </div>
                        </div>

                        {/* Call to Action Visual */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: '#e2e8f0',
                            fontSize: 16,
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            padding: '10px 20px',
                            borderRadius: '30px',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <span>Learn More in App</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
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

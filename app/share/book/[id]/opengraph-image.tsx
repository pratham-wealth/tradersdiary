
import { ImageResponse } from 'next/og';
import { getBookById } from '@/app/dashboard/library/actions';

export const runtime = 'nodejs';

export default async function Image({ params }: { params: { id: string } }) {
    const { id } = await params;
    const book = await getBookById(id);

    if (!book) {
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
                    Book Not Found
                </div>
            ),
            { width: 1200, height: 630 }
        );
    }

    // Colors
    const goldColor = '#fbbf24'; // Amber-400
    const bgColor = '#0f172a'; // Slate-900

    return new ImageResponse(
        (
            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                backgroundColor: '#020617',
                padding: '0',
            }}>
                {/* Left: Cover Image Container (40%) */}
                <div style={{
                    width: '40%',
                    height: '100%',
                    backgroundColor: '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Background Gradient */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, #1e293b, #0f172a)' }} />

                    {/* Book Cover Mockup */}
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        width: '300px',
                        height: '450px',
                        boxShadow: '20px 20px 60px rgba(0,0,0,0.5)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        transform: 'rotate(-5deg)'
                    }}>
                        {book.cover_url ? (
                            <img src={book.cover_url} width="300" height="450" style={{ objectFit: 'cover' }} />
                        ) : (
                            <div style={{ width: '100%', height: '100%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, padding: 20, textAlign: 'center', color: 'white' }}>
                                {book.title}
                            </div>
                        )}
                        {/* Spine Highlight */}
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '10px', background: 'linear-gradient(to right, rgba(255,255,255,0.2), transparent)' }} />
                    </div>
                </div>

                {/* Right: Info (60%) */}
                <div style={{
                    width: '60%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '60px',
                    color: 'white',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <span style={{ fontSize: 16, color: goldColor, letterSpacing: '2px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                            Traders Diary
                        </span>
                        <div style={{ width: '40px', height: '2px', backgroundColor: goldColor, marginLeft: '15px' }} />
                    </div>

                    <span style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}>
                        {book.title.length > 50 ? book.title.substring(0, 50) + '...' : book.title}
                    </span>

                    <span style={{ fontSize: 32, color: '#94A3B8', marginBottom: '40px' }}>
                        by {book.author || 'Unknown Author'}
                    </span>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{
                            padding: '12px 24px',
                            backgroundColor: 'rgba(251, 191, 36, 0.1)',
                            border: `1px solid ${goldColor}`,
                            color: goldColor,
                            borderRadius: '50px',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>
                            Premium Library
                        </div>
                    </div>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}

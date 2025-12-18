import { ImageResponse } from 'next/og';
import { getWatchItemById } from '@/app/dashboard/watch/actions';
import { WatchCardView } from '@/components/share/watch-card-view';

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

    return new ImageResponse(
        (
            <WatchCardView item={{
                ...item,
                direction: item.direction as 'LONG' | 'SHORT'
            }} />
        ),
        { width: 800, height: 1000 }
    );
}


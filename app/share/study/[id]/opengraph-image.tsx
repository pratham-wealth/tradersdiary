
import { ImageResponse } from 'next/og';
import { getStudyById } from '@/app/dashboard/studies/actions';
import { StudyCardView } from '@/components/share/study-card-view';

export const runtime = 'nodejs';

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
            { width: 800, height: 1000 }
        );
    }

    return new ImageResponse(
        (
            <StudyCardView data={study} />
        ),
        { width: 800, height: 1000 }
    );
}


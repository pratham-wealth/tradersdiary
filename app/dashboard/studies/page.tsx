import { getStudies } from './actions';
import { getStrategies } from '@/app/dashboard/strategies/actions';
import StudiesPageClient from '@/components/studies-page-client';

export default async function StudiesPage() {
    const { data: studies } = await getStudies('all');
    const strategies = await getStrategies();

    return <StudiesPageClient initialStudies={studies || []} strategies={strategies || []} />;
}

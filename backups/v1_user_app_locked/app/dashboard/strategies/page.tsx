import { getStrategies } from './actions';
import { StrategiesPageClient } from '@/components/strategies-page-client';

export default async function StrategiesPage() {
    const strategies = await getStrategies();

    return <StrategiesPageClient strategies={strategies} />;
}

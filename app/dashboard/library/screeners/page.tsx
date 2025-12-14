import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getScreeners } from './actions';
import { ScreenersPageClient } from '@/components/screeners-page-client';
import { Filter } from 'lucide-react';

export default async function ScreenersPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: screeners } = await getScreeners();

    return <ScreenersPageClient screeners={screeners || []} />;
}

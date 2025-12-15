import { getGlobalBooks } from '@/app/dashboard/admin/actions';
import { AdminBooksClient } from '@/components/admin/admin-books-client';

export default async function AdminBooksPage() {
    const { books, error } = await getGlobalBooks();

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return <AdminBooksClient books={books || []} />;
}

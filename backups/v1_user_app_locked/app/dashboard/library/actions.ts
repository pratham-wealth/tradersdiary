'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

export interface UserBook {
    id: string;
    title: string;
    author: string | null;
    description: string | null;
    pdf_url: string; // The path in storage
    cover_url: string | null;
    is_favorite: boolean;
    created_at: string;
    is_global?: boolean;
    access_level?: 'free' | 'premium';
}

export async function getUserBooks(): Promise<UserBook[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('user_books')
        .select('*')
        .or(`user_id.eq.${user.id},is_global.eq.true`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user books:', error);
        return [];
    }

    return data;
}

export type CreateBookParams = {
    title: string;
    author: string;
    description: string;
    pdfPath: string;
    coverUrl: string | null;
};

export async function createBook(params: CreateBookParams) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { title, author, description, pdfPath, coverUrl } = params;

    if (!title || !pdfPath) {
        return { error: 'Title and PDF are required' };
    }

    // 3. Insert Record
    const { error: dbError } = await supabase
        .from('user_books')
        .insert({
            user_id: user.id,
            title,
            author,
            description,
            pdf_url: pdfPath, // Storing path
            cover_url: coverUrl,
        });

    if (dbError) {
        return { error: `Database Error: ${dbError.message}` };
    }

    revalidatePath('/dashboard/library');
    return { success: true };
}

export async function deleteBook(id: string, pdfPath: string, coverUrl: string | null) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Not authenticated' };

    // 1 Verify Ownership & Global Status
    const { data: book } = await supabase
        .from('user_books')
        .select('user_id, is_global')
        .eq('id', id)
        .single();

    if (!book) return { error: 'Book not found' };

    // Prevent deletion if Global (unless admin, but safe default)
    if (book.is_global) {
        return { error: 'You cannot delete global books.' };
    }

    // 2. Delete DB Record
    const { error: dbError } = await supabase
        .from('user_books')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

    if (dbError) return { error: dbError.message };

    // 2. Delete PDF
    if (pdfPath) {
        await supabase.storage.from('books').remove([pdfPath]);
    }

    // 3. Delete Cover (if it exists and is not a generic url)
    if (coverUrl) {
        // Extract path from URL? It's 'book_covers/{userId}/{uuid}.png' usually.
        // URL: https://.../storage/v1/object/public/book_covers/...
        const path = coverUrl.split('/book_covers/').pop();
        if (path) {
            await supabase.storage.from('book_covers').remove([path]);
        }
    }

    revalidatePath('/dashboard/library');
    return { success: true };
}

export async function getBookDownloadUrl(pdfPath: string) {
    const supabase = await createClient();
    // Create a signed URL valid for 1 hour
    const { data, error } = await supabase.storage
        .from('books')
        .createSignedUrl(pdfPath, 3600);

    if (error) return null;
    return data.signedUrl;
}

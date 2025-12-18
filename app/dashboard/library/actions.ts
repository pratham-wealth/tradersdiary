'use server';

import { createClient, createAdminClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

// ... (Types and getUserBooks remain same)

export async function getBookDownloadUrl(pdfPath: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    // 1. Fetch Book Details
    const { data: book } = await supabase
        .from('user_books')
        .select('id, user_id, is_public, access_level')
        .eq('pdf_url', pdfPath)
        .single();

    if (!book) return null;

    // 2. Check Access
    let hasAccess = false;

    if (book.user_id === user.id) {
        hasAccess = true;
    } else if (book.is_public) {
        if (book.access_level === 'free') {
            hasAccess = true;
        } else if (book.access_level === 'premium') {
            const { data: userSettings } = await supabase
                .from('user_settings')
                .select('plan_type')
                .eq('id', user.id)
                .single();
            if (userSettings?.plan_type === 'premium' || userSettings?.plan_type === 'pro') {
                hasAccess = true;
            }
        } else if (book.access_level === 'paid') {
            const { data: purchase } = await supabase
                .from('book_purchases')
                .select('id')
                .eq('user_id', user.id)
                .eq('book_id', book.id)
                .single();
            if (purchase) {
                hasAccess = true;
            }
        }
    }

    if (!hasAccess) return null;

    // 3. Generate Signed URL
    const adminSupabase = await createAdminClient();
    const { data, error } = await adminSupabase.storage
        .from('books')
        .createSignedUrl(pdfPath, 3600); // 1 Hour

    if (error) {
        console.error('Storage Error:', error);
        return null;
    }

    return data.signedUrl;
}

// Extended UserBook type (ensure interface allows new fields)
export interface UserBook {
    id: string;
    title: string;
    author: string | null;
    description: string | null;
    pdf_url: string;
    cover_url: string | null;
    is_favorite: boolean;
    created_at: string;
    user_id: string; // Needed for ownership check
    is_public: boolean;
    is_global?: boolean;
    access_level?: 'free' | 'premium' | 'paid';
    price?: number;
    price_usd?: number;
    // Computed Fields
    has_access?: boolean;
    is_owned?: boolean; // Personally uploaded
    is_purchased?: boolean;
}

export async function getUserBooks(): Promise<UserBook[]> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    // 1. Fetch User Settings (for Plan)
    const { data: userSettings } = await supabase
        .from('user_settings')
        .select('plan_type')
        .eq('id', user.id)
        .single();

    const isPremium = userSettings?.plan_type === 'premium' || userSettings?.plan_type === 'pro';

    // 2. Fetch Books (Own OR Public)
    const { data: booksRaw, error } = await supabase
        .from('user_books')
        .select('*')
        .or(`user_id.eq.${user.id},is_public.eq.true`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching books:', error);
        return [];
    }

    // 3. Fetch Purchases
    const { data: purchases } = await supabase
        .from('book_purchases')
        .select('book_id')
        .eq('user_id', user.id);

    const purchasedBookIds = new Set(purchases?.map(p => p.book_id) || []);

    // 4. Compute Access
    const enrichedBooks: UserBook[] = booksRaw.map((book: any) => {
        const isOwner = book.user_id === user.id;
        const isPurchased = purchasedBookIds.has(book.id);

        // Determine Access
        let hasAccess = false;

        if (isOwner) {
            hasAccess = true;
        } else if (book.is_public) {
            if (book.access_level === 'free') hasAccess = true;
            else if (book.access_level === 'premium' && isPremium) hasAccess = true;
            else if (book.access_level === 'paid' && isPurchased) hasAccess = true;
        }

        return {
            ...book,
            user_id: book.user_id, // Ensure this exists in select
            has_access: hasAccess,
            is_owned: isOwner,
            is_purchased: isPurchased
        };
    });

    return enrichedBooks;
}

// Action to "Buy" a book (Mock)
export async function purchaseBook(bookId: string, price: number) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not User' };

    // In real app: Verify Payment Gateway logic here.
    // For now: Insert record directly.

    const { error } = await supabase
        .from('book_purchases')
        .insert({
            user_id: user.id,
            book_id: bookId,
            price_paid: price
        });

    if (error) return { error: error.message };

    revalidatePath('/dashboard/library');
    return { success: true };
}

export type CreateBookParams = {
    title: string;
    author: string;
    description: string;
    pdfPath: string;
    coverUrl: string | null;
    isPublic: boolean;
    accessLevel: 'free' | 'premium' | 'paid';
    price?: number;
    priceUsd?: number;
};

export async function createBook(params: CreateBookParams) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { title, author, description, pdfPath, coverUrl, isPublic, accessLevel, price, priceUsd } = params;

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
            pdf_url: pdfPath,
            cover_url: coverUrl,
            is_public: isPublic,
            access_level: accessLevel,
            price: price || 0,
            price_usd: priceUsd || 0,
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

// Duplicate import removed

// ... (keep existing imports)

// End of file

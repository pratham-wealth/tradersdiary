import { createClient } from '@/lib/supabase/server';

export async function uploadImage(
    file: File,
    folder: 'studies' | 'trades'
): Promise<{ url: string; path: string } | { error: string }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${folder}/${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
        .from('tradenote-images')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        return { error: error.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('tradenote-images')
        .getPublicUrl(data.path);

    return { url: publicUrl, path: data.path };
}

export async function deleteImage(path: string): Promise<{ success: boolean } | { error: string }> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const { error } = await supabase.storage
        .from('tradenote-images')
        .remove([path]);

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

export function getImageUrl(path: string): string {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return `${supabaseUrl}/storage/v1/object/public/tradenote-images/${path}`;
}


import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Credentials');
    process.exit(1);
}

async function updateBucket(id: string, limitBytes: number | null, isPublic: boolean) {
    const url = `${supabaseUrl}/storage/v1/bucket/${id}`;

    console.log(`Updating ${id} via FETCH to ${url}...`);

    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                public: isPublic,
                file_size_limit: limitBytes, // null means unlimited
                allowed_mime_types: null
            })
        });

        if (!res.ok) {
            const text = await res.text();
            console.error(`❌ Failed to update ${id}: ${res.status} ${res.statusText}`, text);
        } else {
            const json = await res.json();
            console.log(`✅ Success for ${id}:`, json.message || 'Updated');
        }
    } catch (err) {
        console.error(`Error fetch updating ${id}:`, err);
    }
}

async function run() {
    // Setting limit to null for unlimited size
    const limit = null;

    await updateBucket('books', limit, false);
    await updateBucket('book_covers', limit, true);
    await updateBucket('tradenote-images', limit, true);
}

run();

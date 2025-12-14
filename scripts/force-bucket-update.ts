
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function forceUpdate() {
    console.log('Attemping Direct Update of storage.buckets...');

    const limit = 209715200; // 200MB

    // buckets to update
    const ids = ['books', 'book_covers', 'tradenote-images'];

    for (const id of ids) {
        // Try to update via 'storage' schema directly
        // This relies on PostgREST exposing 'storage' or Service Role access bypassing it (which it might not for REST)
        const { data, error } = await supabase
            .schema('storage')
            .from('buckets')
            .update({ file_size_limit: limit })
            .eq('id', id)
            .select();

        if (error) {
            console.error(`Failed to update ${id}:`, error.message);
        } else {
            console.log(`✅ Updated ${id} limit to ${limit} bytes.`, data);
        }
    }
}

forceUpdate();

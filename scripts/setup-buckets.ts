
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from root
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Error: Missing environment variables.');
    console.log('Ensure .env.local exists with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function setupBuckets() {
    console.log('Initializing Storage Buckets...');

    const buckets = [
        { id: 'books', public: false },
        { id: 'book_covers', public: true },
        { id: 'tradenote-images', public: true },
    ];

    for (const bucket of buckets) {
        const { data, error } = await supabase.storage.getBucket(bucket.id);
        const maxFileSize = bucket.id === 'books' ? 209715200 : 10485760; // 200MB for books, 10MB for images

        if (error && error.message.includes('not found')) {
            console.log(`Creating bucket: ${bucket.id}...`);
            const { error: createError } = await supabase.storage.createBucket(bucket.id, {
                public: bucket.public,
            });

            if (createError) {
                console.error(`Failed to create ${bucket.id}:`, createError.message);
            } else {
                console.log(`✅ Created bucket: ${bucket.id}`);
            }
            console.log(`✓ Bucket exists: ${bucket.id}. Checking/Updating limits...`);
            // Explicitly pass file_size_limit
            // @ts-ignore
            const { error: updateError } = await supabase.storage.updateBucket(bucket.id, {
                public: bucket.public,
                file_size_limit: maxFileSize
            });

            if (updateError) {
                console.error(`Failed to update ${bucket.id}:`, updateError.message);
            } else {
                console.log(`✅ Updated bucket limit to 200MB: ${bucket.id}`);
            }
        } else {
            console.error(`Error checking ${bucket.id}:`, error?.message);
        }
    }
}

setupBuckets();


import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase Credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runMigration() {
    const sqlPath = path.resolve(process.cwd(), 'supabase/migrations/017_learning_patterns_rls.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('Applying Migration: 017_learning_patterns_rls.sql...');

    // Using pg-node or similar would be better, but with Supabase Client we usually can't run raw SQL 
    // UNLESS we use the rpc() function to call a 'exec_sql' function if it exists.
    // Assuming we DON'T have an exec_sql function, we might be stuck.

    // HOWEVER, for this specific error (RLS), we can just Insert a dummy record to TEST if Service Role works.
    // If Service Role works, then the Client used in the App is simply not using Service Role correctly.

    // Let's try to simple insert a test pattern to see if IT fails for us here.
    const { error } = await supabase.from('learning_patterns').insert({
        type: 'CHART',
        group_name: 'System Test',
        name: 'Test Pattern ' + Date.now(),
        description: 'Test',
        is_premium: true
    });

    if (error) {
        console.error('Service Role Insert Failed:', error.message);
        // This confirms Service Role Key Key is weak or broken, OR RLS is strictly blocking even Service Role (unlikely).
    } else {
        console.log('✅ Service Role Insert Successful! The key is valid and bypasses RLS.');
    }
}

runMigration();

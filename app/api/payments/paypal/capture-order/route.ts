import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { orderID, planId, amount, currency, purchaseType, itemId } = body;

        const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
        const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            return NextResponse.json({ error: 'PayPal credentials missing' }, { status: 500 });
        }

        // 1. Get Access Token
        const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        const tokenRes = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        });

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        // 2. Capture Order
        const captureRes = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        const captureData = await captureRes.json();

        // Check if capture was successful
        if (captureData.status !== 'COMPLETED') {
            return NextResponse.json({ error: 'Payment capture failed' }, { status: 400 });
        }

        // 3. Update Database
        const { error: paymentError } = await supabase.from('payments').insert({
            user_id: user.id,
            payment_gateway: 'paypal',
            gateway_payment_id: captureData.id, // Capture ID
            gateway_order_id: orderID,
            amount: amount,
            currency: currency, // 'USD'
            plan_type: purchaseType === 'book' ? 'book' : planId,
            payment_status: 'success',
            payment_method: 'online'
        });

        if (paymentError) {
            console.error('DB Insert Error:', paymentError);
        }

        // 4. Handle Specific Logic
        if (purchaseType === 'book') {
            // Insert Book Purchase
            const { error: bookError } = await supabase
                .from('book_purchases')
                .insert({
                    user_id: user.id,
                    book_id: itemId, // bookId passed from client
                    price_paid: amount,
                    transaction_id: captureData.id
                });

            if (bookError && bookError.code !== '23505') {
                console.error('Book Purchase Error:', bookError);
                return NextResponse.json({ error: 'Book purchase recording failed' }, { status: 500 });
            }

            return NextResponse.json({ success: true, data: captureData });
        }

        // Subscription Logic (Existing)
        const startDate = new Date();
        const endDate = new Date(startDate);
        const { billingCycle: cycle } = body;

        if (planId === 'trial') {
            endDate.setDate(endDate.getDate() + 7);
        } else if (cycle === 'annual') {
            endDate.setDate(endDate.getDate() + 365);
        } else {
            endDate.setDate(endDate.getDate() + 30);
        }

        const { error: settingsError } = await supabase
            .from('user_settings')
            .update({
                plan_type: planId,
                subscription_status: 'active',
                subscription_start: startDate.toISOString(),
                subscription_end: endDate.toISOString()
            })
            .eq('id', user.id);

        return NextResponse.json({ success: true, data: captureData });

    } catch (error: any) {
        console.error('PayPal Verify Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

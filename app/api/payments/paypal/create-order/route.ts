import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { amount, currency, purchaseType = 'subscription', itemId } = body;
        // For subscription, itemId = planId. For book, itemId = bookId.
        const referenceId = itemId;

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

        if (!tokenRes.ok) {
            throw new Error('Failed to get PayPal Access Token');
        }

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        // 2. Create Order
        const orderRes = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    reference_id: referenceId, // Using generic reference
                    amount: {
                        currency_code: currency, // 'USD'
                        value: amount.toString()
                    }
                }]
            })
        });

        const orderData = await orderRes.json();

        return NextResponse.json(orderData);
    } catch (error: any) {
        console.error('PayPal Order Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

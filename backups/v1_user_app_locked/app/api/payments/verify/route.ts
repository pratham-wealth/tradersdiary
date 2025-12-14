import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { orderCreationId, razorpayPaymentId, razorpaySignature, planId, amount, currency } = body;

        // 1. Verify Signature
        const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest('hex');

        if (digest !== razorpaySignature) {
            return NextResponse.json({ error: 'Transaction not legit!' }, { status: 400 });
        }

        // 2. Transaction is valid, update Database
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return NextResponse.json({ error: 'User not found' }, { status: 401 });

        // Insert Payment Record
        const { error: paymentError } = await supabase.from('payments').insert({
            user_id: user.id,
            payment_gateway: 'razorpay',
            gateway_payment_id: razorpayPaymentId,
            gateway_order_id: orderCreationId,
            amount: amount,
            currency: currency,
            plan_type: planId, // 'pro' or 'premium'
            payment_status: 'success',
            payment_method: 'online'
        });

        if (paymentError) {
            console.error('Payment DB Insert Error:', paymentError);
            // We still return success as payment gateway confirmed it, but log error
        }

        // Update User Subscription
        const startDate = new Date();
        const endDate = new Date(startDate);

        const { billingCycle } = body;

        if (planId === 'trial') {
            endDate.setDate(endDate.getDate() + 7);
        } else if (billingCycle === 'annual') {
            endDate.setDate(endDate.getDate() + 365);
        } else {
            // Default to monthly
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

        return NextResponse.json({ success: true, message: 'Subscription activated' });

    } catch (error: any) {
        console.error('Verify Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

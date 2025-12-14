import { NextResponse } from 'next/server';
import { razorpay } from '@/lib/razorpay';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log("User ID:", user.id);

        const body = await req.json();
        const { amount, currency, planId } = body;

        console.log("Create Order: ", { amount, currency, planId });
        console.log("Keys: ", {
            keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? 'Exists' : 'Missing',
            secret: process.env.RAZORPAY_KEY_SECRET ? 'Exists' : 'Missing'
        });

        const options = {
            amount: Math.round(amount * 100), // Razorpay expects amount in paisa
            currency: currency,
            receipt: `rect_${Date.now()}_${user.id.substring(0, 5)}`,
            notes: {
                userId: user.id,
                planId: planId
            }
        };

        console.log("Razorpay Options:", options);

        const order = await razorpay.orders.create(options);
        console.log("Order Created:", order);

        return NextResponse.json(order);
    } catch (error: any) {
        console.error('Razorpay Order Error Full:', error);
        return NextResponse.json({ error: error.message, details: error }, { status: 500 });
    }
}

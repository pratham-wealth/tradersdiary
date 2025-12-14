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

        const body = await req.json();
        const { amount, currency, purchaseType = 'subscription', itemId } = body;
        // itemId can be planId (for subs) or bookId (for books)

        console.log("Create Order:", { amount, currency, purchaseType, itemId, userId: user.id });

        const options = {
            amount: Math.round(amount * 100), // Razorpay expects paisa
            currency: currency,
            receipt: `rect_${Date.now()}_${user.id.substring(0, 5)}`,
            notes: {
                userId: user.id,
                purchaseType: purchaseType,
                itemId: itemId // Save what is being bought in notes
            }
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json(order);
    } catch (error: any) {
        console.error('Razorpay Order Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

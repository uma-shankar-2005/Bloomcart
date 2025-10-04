import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const { amount, items } = await request.json()
    
    // Get the current user
    const supabase = createRouteHandlerClient({ cookies })
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paisa
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    })

    // Create order in database
    const { data: orderData, error } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        amount: amount,
        razorpay_order_id: order.id,
        status: 'PENDING',
        items: items
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      dbOrderId: orderData.id
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Error creating order' },
      { status: 500 }
    )
  }
}
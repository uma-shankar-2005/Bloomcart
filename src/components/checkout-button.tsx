'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store'
import { supabase } from '@/lib/supabase'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutButton() {
  const router = useRouter()
  const { items, total, clearCart } = useCartStore()

  useEffect(() => {
    const loadRazorpay = async () => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)
    }
    loadRazorpay()
  }, [])

  const handleCheckout = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth')
        return
      }

      // Create order on backend
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total(),
          items: items,
        }),
      })

      const data = await response.json()

      if (!data.orderId) {
        throw new Error('No order ID received')
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'BloomCart',
        description: 'Flower Purchase',
        order_id: data.orderId,
        handler: async (response: any) => {
          try {
            // Update order status in database
            const { error } = await supabase
              .from('orders')
              .update({
                status: 'PAID',
                razorpay_payment_id: response.razorpay_payment_id,
              })
              .eq('razorpay_order_id', data.orderId)

            if (error) throw error

            clearCart()
            router.push('/orders')
          } catch (error) {
            console.error('Error updating order:', error)
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: '#F87171',
        },
      }

      const razorpayInstance = new window.Razorpay(options)
      razorpayInstance.open()
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      className="w-full"
      disabled={items.length === 0}
    >
      Proceed to Checkout
    </Button>
  )
}
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          type: string
          price: number
          original_price: number | null
          category: string
          occasion: string[]
          stock: number
          is_active: boolean
          is_featured: boolean
          rating: number
          review_count: number
          partner_id: string
          partner_name: string
          image: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          type: string
          price: number
          original_price?: number | null
          category: string
          occasion: string[]
          stock?: number
          is_active?: boolean
          is_featured?: boolean
          rating?: number
          review_count?: number
          partner_id: string
          partner_name: string
          image: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          type?: string
          price?: number
          original_price?: number | null
          category?: string
          occasion?: string[]
          stock?: number
          is_active?: boolean
          is_featured?: boolean
          rating?: number
          review_count?: number
          partner_id?: string
          partner_name?: string
          image?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row']

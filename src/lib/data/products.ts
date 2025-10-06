import { supabase } from '@/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

const handleError = (error: Error | PostgrestError, context: string) => {
  logger.error(`Failed while ${context}`, 'products', error);
};

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  category: string | null;
  occasion: string | null;
  image_url: string;
  is_active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  type?: string[];
  category?: string[];
  occasion?: string[];
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  totalCount: number;
  totalPages: number;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .eq('featured', true)
      .limit(6)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    handleError(error as Error, 'fetching featured products');
    return [];
  }
}

export async function getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
  try {
    const limit = filters.limit || 12;
    const page = filters.page || 1;
    const from = (page - 1) * limit;

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });

    if (filters.type?.length) {
      query = query.in('type', filters.type);
    }
    
    if (filters.category?.length) {
      query = query.in('category', filters.category);
    }

    if (filters.occasion?.length) {
      query = query.in('occasion', filters.occasion);
    }

    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }

    const { count } = await query;
    const totalCount = count || 0;

    const { data, error } = await query
      .order('created_at', { ascending: false })
      .range(from, from + limit - 1);

    if (error) throw error;

    return {
      products: data || [],
      totalCount,
      totalPages: Math.ceil(totalCount / limit)
    } as const;
  } catch (error) {
    handleError(error as Error, 'fetching products');
    return {
      products: [],
      totalCount: 0,
      totalPages: 0
    };
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    handleError(error as Error, 'fetching product by ID');
    return null;
  }
}

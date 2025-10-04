import { ProductType } from "@/lib/types";
import { supabase, type Product as SupabaseProduct } from "@/lib/supabase";

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

// Transform Supabase product to match our interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  type: ProductType;
  category: string;
  occasion: string[];
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  partnerId: string;
  partnerName: string;
  image: string; // Single image URL from Supabase
  createdAt: string;
  updatedAt: string;
}

// Transform Supabase product to our Product interface
function transformSupabaseProduct(product: SupabaseProduct): Product {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price / 100, // Convert from paise to rupees
    originalPrice: product.original_price ? product.original_price / 100 : undefined,
    type: product.type as ProductType,
    category: product.category,
    occasion: product.occasion,
    stock: product.stock,
    isActive: product.is_active,
    isFeatured: product.is_featured,
    rating: product.rating,
    reviewCount: product.review_count,
    partnerId: product.partner_id,
    partnerName: product.partner_name,
    image: product.image,
    createdAt: product.created_at,
    updatedAt: product.updated_at,
  };
}

// All product data now comes from Supabase

export async function getProducts(filters: ProductFilters = {}) {
  try {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

  // Apply filters
  if (filters.type && filters.type.length > 0) {
      query = query.in('type', filters.type);
  }

  if (filters.category && filters.category.length > 0) {
      query = query.in('category', filters.category);
  }

  if (filters.occasion && filters.occasion.length > 0) {
      // Use overlap operator for array fields
      query = query.overlaps('occasion', filters.occasion);
  }

  if (filters.search) {
      const searchTerm = `%${filters.search}%`;
      query = query.or(`name.ilike.${searchTerm},description.ilike.${searchTerm},category.ilike.${searchTerm}`);
  }

  if (filters.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice * 100); // Convert to paise
  }

  if (filters.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice * 100); // Convert to paise
  }

  // Apply sorting
  switch (filters.sortBy) {
    case "price-low":
        query = query.order('price', { ascending: true });
      break;
    case "price-high":
        query = query.order('price', { ascending: false });
      break;
    case "rating":
        query = query.order('rating', { ascending: false });
      break;
    case "newest":
        query = query.order('created_at', { ascending: false });
      break;
    case "featured":
    default:
        query = query.order('is_featured', { ascending: false }).order('rating', { ascending: false });
      break;
  }

    // Get total count for pagination
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

  // Apply pagination
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const startIndex = (page - 1) * limit;
    
    query = query.range(startIndex, startIndex + limit - 1);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    const products = data?.map(transformSupabaseProduct) || [];
    const totalCount = count || 0;
  const totalPages = Math.ceil(totalCount / limit);

  return {
      products,
    totalCount,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
  } catch (error) {
    console.error('Error in getProducts:', error);
    // Fallback to empty results
    return {
      products: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      console.error('Error fetching product by id:', error);
      return null;
    }

    return transformSupabaseProduct(data);
  } catch (error) {
    console.error('Error in getProductById:', error);
    return null;
  }
}

export async function getFeaturedProducts(limit: number = 8): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching featured products:', error);
      return [];
    }

    return data?.map(transformSupabaseProduct) || [];
  } catch (error) {
    console.error('Error in getFeaturedProducts:', error);
    return [];
  }
}

export async function getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
  try {
  const product = await getProductById(productId);
  if (!product) return [];

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .eq('category', product.category)
      .neq('id', productId)
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching related products:', error);
      return [];
    }

    return data?.map(transformSupabaseProduct) || [];
  } catch (error) {
    console.error('Error in getRelatedProducts:', error);
    return [];
  }
}
import { User, Product, Order, Partner, Review, Event } from "@prisma/client";

export type UserRole = "CUSTOMER" | "PARTNER" | "ADMIN";
export type ProductType = "FRESH_FLOWERS" | "DRIED_FLOWERS" | "ARTIFICIAL_FLOWERS" | "DECOR_ITEMS" | "EVENT_PACKAGES" | "CUSTOM_BOUQUETS";
export type PaymentStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CANCELLED";
export type DeliveryStatus = "PENDING" | "CONFIRMED" | "PACKED" | "DISPATCHED" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED" | "RETURNED";
export type EventStatus = "PENDING" | "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface ExtendedUser extends User {
  addresses?: Address[];
  orders?: Order[];
  reviews?: Review[];
  events?: Event[];
}

export interface ExtendedProduct extends Product {
  images: ProductImage[];
  partner: Partner;
  reviews?: Review[];
  _count?: {
    reviews: number;
  };
}

export interface ExtendedOrder extends Order {
  user: User;
  partner?: Partner;
  items: OrderItem[];
  address?: Address;
  tracking?: OrderTracking[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  name: string;
  product?: Product;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
  order: number;
}

export interface Address {
  id: string;
  userId: string;
  orderId?: string;
  type: "HOME" | "OFFICE" | "DELIVERY" | "BILLING";
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderTracking {
  id: string;
  orderId: string;
  status: string;
  description?: string;
  location?: string;
  timestamp: Date;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}

export interface ExtendedPartner extends Partner {
  products?: Product[];
  orders?: Order[];
  _count?: {
    products: number;
    orders: number;
  };
}

export interface ExtendedReview extends Review {
  user: User;
  product: Product;
}

export interface ExtendedEvent extends Event {
  user: User;
}

export interface SearchFilters {
  type?: ProductType[];
  category?: string[];
  occasion?: string[];
  minPrice?: number;
  maxPrice?: number;
  city?: string;
  pincode?: string;
  rating?: number;
  inStock?: boolean;
  featured?: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret?: string;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

export interface NotificationData {
  type: "order_update" | "payment_success" | "delivery_update" | "event_reminder";
  title: string;
  message: string;
  data?: any;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface WhatsAppMessage {
  to: string;
  message: string;
  template?: string;
  variables?: Record<string, string>;
}

// Form types
export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  phone?: string;
}

export interface SignInFormData {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ProductFormData {
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
  images: File[];
}

export interface AddressFormData {
  type: "HOME" | "OFFICE" | "DELIVERY" | "BILLING";
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault: boolean;
}

export interface EventFormData {
  title: string;
  description?: string;
  eventDate: Date;
  eventTime: string;
  duration?: number;
  guestCount?: number;
  location: string;
  packageType: string;
  notes?: string;
}

export interface ReviewFormData {
  rating: number;
  title?: string;
  comment?: string;
}
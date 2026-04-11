export interface Image {
  url: string;
  publicId?: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  categoryLabel?: string;
  specs?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  mainImage: Image;
  images?: Image[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  label: string;
  value: string;
  image?: Image;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: Image;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  userId?: string;
  guestId?: string;
  items: CartItem[];
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Favorite {
  _id: string;
  userId?: string;
  guestId?: string;
  products: Product[];
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  userId?: string;
  guestId?: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: "card" | "cash" | "paypal";
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface SearchParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  sort?: "price_asc" | "price_desc" | "rating" | "newest";
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
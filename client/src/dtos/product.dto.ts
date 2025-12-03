import { Product } from "../types";

// Request DTOs
export interface CreateProductRequest {
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  stock?: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image?: string;
  stock?: number;
}

// Response DTOs
export interface ProductResponse {
  success: boolean;
  data: Product;
  message?: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  message?: string;
}

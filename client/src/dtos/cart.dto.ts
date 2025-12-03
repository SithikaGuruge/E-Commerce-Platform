import { Cart, CartItem } from "../types";

// Request DTOs
export interface AddToCartRequest {
  userId: string;
  Products: CartItem[];
}

export interface UpdateCartRequest {
  Products: CartItem[];
}

// Response DTOs
export interface CartResponse {
  success: boolean;
  data: Cart;
  message?: string;
}

export interface CartsResponse {
  success: boolean;
  data: Cart[];
  message?: string;
}

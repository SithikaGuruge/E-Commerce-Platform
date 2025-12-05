import { Types } from "mongoose";

export interface AddToCartDto {
  productId: string | Types.ObjectId;
  quantity: number;
  price: number;
  name: string;
  shopId?: string | Types.ObjectId; // Optional: will use default if not provided
}

export interface UpdateCartItemDto {
  quantity: number;
}

export interface CartItemResponseDto {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  subtotal: number;
}

export interface CartResponseDto {
  items: CartItemResponseDto[];
  totalAmount: number;
  totalItems: number;
}

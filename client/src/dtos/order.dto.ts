import { Order, OrderItem } from "../types";

// Request DTOs
export interface CreateOrderRequest {
  userId: string;
  Products: OrderItem[];
}

export interface UpdateOrderRequest {
  status?: string;
  Products?: OrderItem[];
}

// Response DTOs
export interface OrderResponse {
  success: boolean;
  data: Order;
  message?: string;
}

export interface OrdersResponse {
  success: boolean;
  data: Order[];
  message?: string;
}

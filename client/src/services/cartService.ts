import { apiClient } from "@/lib/api-client";

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  subtotal: number;
}

export interface CartResponse {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  shopId?: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

const ORDER_SERVICE_URL =
  import.meta.env.VITE_ORDER_API_URL || "http://localhost:4000/api";

class CartService {
  async getCart(): Promise<CartResponse> {
    const response = await apiClient.get<CartResponse>(
      `${ORDER_SERVICE_URL}/cart`
    );
    return response.data;
  }

  async addToCart(item: AddToCartRequest): Promise<CartResponse> {
    const response = await apiClient.post<CartResponse>(
      `${ORDER_SERVICE_URL}/cart/add`,
      item
    );
    return response.data;
  }

  async updateCartItem(
    productId: string,
    quantity: number
  ): Promise<CartResponse> {
    const response = await apiClient.put<CartResponse>(
      `${ORDER_SERVICE_URL}/cart/update/${productId}`,
      { quantity }
    );
    return response.data;
  }

  async removeCartItem(productId: string): Promise<CartResponse> {
    const response = await apiClient.delete<CartResponse>(
      `${ORDER_SERVICE_URL}/cart/remove/${productId}`
    );
    return response.data;
  }

  async clearCart(): Promise<void> {
    await apiClient.delete(`${ORDER_SERVICE_URL}/cart/clear`);
  }

  async checkoutCart(orderData: {
    paymentMethod: string;
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
      phone: string;
    };
  }): Promise<any> {
    const response = await apiClient.post(
      `${ORDER_SERVICE_URL}/cart/checkout`,
      orderData
    );
    return response.data;
  }
}

export const cartService = new CartService();

import { orderApiClient } from "@/lib/api-client";

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

class CartService {
  async getCart(): Promise<CartResponse> {
    const response = await orderApiClient.get<CartResponse>(`/cart`);
    return response.data;
  }

  async addToCart(item: AddToCartRequest): Promise<CartResponse> {
    const response = await orderApiClient.post<CartResponse>(`/cart/add`, item);
    return response.data;
  }

  async updateCartItem(
    productId: string,
    quantity: number
  ): Promise<CartResponse> {
    const response = await orderApiClient.put<CartResponse>(
      `/cart/update/${productId}`,
      { quantity }
    );
    return response.data;
  }

  async removeCartItem(productId: string): Promise<CartResponse> {
    const response = await orderApiClient.delete<CartResponse>(
      `/cart/remove/${productId}`
    );
    return response.data;
  }

  async clearCart(): Promise<void> {
    await orderApiClient.delete(`/cart/clear`);
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
    const response = await orderApiClient.post(`/cart/checkout`, orderData);
    return response.data;
  }
}

export const cartService = new CartService();

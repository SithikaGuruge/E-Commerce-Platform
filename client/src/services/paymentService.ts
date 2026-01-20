import { orderApiClient } from "@/lib/api-client";

export interface CreatePaymentIntentRequest {
  orderId: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
}

export const paymentService = {
  /**
   * Create a payment intent for an order
   */
  async createPaymentIntent(
    orderId: string,
  ): Promise<{ success: boolean; data: PaymentIntentResponse }> {
    const response = await orderApiClient.post<{
      success: boolean;
      data: PaymentIntentResponse;
    }>("/payment/create-payment-intent", { orderId });
    return response.data;
  },

  /**
   * Get payment intent details
   */
  async getPaymentIntent(paymentIntentId: string) {
    const response = await orderApiClient.get(
      `/payment/payment-intent/${paymentIntentId}`,
    );
    return response.data;
  },
};

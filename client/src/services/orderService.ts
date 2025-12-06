import { orderApiClient } from "@/lib/api-client";

export const getOrdersByUserId = async (userId: string) => {
  try {
    const response = await orderApiClient.get(`/order/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const createOrder = async (orderData: any) => {
  try {
    const response = await orderApiClient.post(`/order`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const updateOrder = async (orderId: string, orderData: any) => {
  try {
    const response = await orderApiClient.put(`/order/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const response = await orderApiClient.delete(`/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const placeOrderFromCart = async (userId: string, products: any[]) => {
  try {
    const orderData = {
      userId,
      Products: products.map((product: any) => ({
        productId: product.productId || product._id,
        quantity: product.quantity || 1,
      })),
    };
    const response = await orderApiClient.post(`/order`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const response = await orderApiClient.get(`/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const cancelOrder = async (orderId: string) => {
  try {
    const response = await orderApiClient.delete(`/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
};

export const getAllOrders = async () => {
  try {
    const response = await orderApiClient.get(`/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

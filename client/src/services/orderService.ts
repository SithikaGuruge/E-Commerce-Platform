import axios from "axios";

const API_URL = import.meta.env.VITE_ORDER_API_URL || "http://localhost:4000";

// Get orders by user ID
export const getOrdersByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/order/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Create new order
export const createOrder = async (orderData: any) => {
  try {
    const response = await axios.post(`${API_URL}/order`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Update order
export const updateOrder = async (orderId: string, orderData: any) => {
  try {
    const response = await axios.put(`${API_URL}/order/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// Delete order
export const deleteOrder = async (orderId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

// Place order from cart
export const placeOrderFromCart = async (userId: string, products: any[]) => {
  try {
    const orderData = {
      userId,
      Products: products.map((product: any) => ({
        productId: product.productId || product._id,
        quantity: product.quantity || 1,
      })),
    };
    const response = await axios.post(`${API_URL}/order`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

// Get order by ID
export const getOrderById = async (orderId: string) => {
  try {
    const response = await axios.get(`${API_URL}/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

// Cancel order
export const cancelOrder = async (orderId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling order:", error);
    throw error;
  }
};

// Get all orders (admin)
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

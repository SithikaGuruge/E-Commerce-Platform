import axios from "axios";

const API_URL = import.meta.env.VITE_CART_API_URL || "http://localhost:4001";

// Get cart by user ID
export const getCartByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Create or add to cart
export const addToCart = async (cartData: any) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, cartData);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Update cart
export const updateCart = async (cartId: string, cartData: any) => {
  try {
    const response = await axios.put(`${API_URL}/cart/${cartId}`, cartData);
    return response.data;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
};

// Delete cart
export const deleteCart = async (cartId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/${cartId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
};

// Clear user cart
export const clearUserCart = async (userId: string) => {
  try {
    const cart = await getCartByUserId(userId);
    if (cart && cart.length > 0) {
      await deleteCart(cart[0]._id);
    }
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

// Add single item to cart
export const addItemToCart = async (
  userId: string,
  productId: string,
  quantity: number = 1
) => {
  try {
    const cartData = {
      userId,
      Products: [
        {
          productId,
          quantity,
        },
      ],
    };
    const response = await axios.post(`${API_URL}/cart`, cartData);
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

// Update item quantity in cart
export const updateCartItemQuantity = async (
  cartId: string,
  productId: string,
  quantity: number
) => {
  try {
    const cartData = {
      Products: [
        {
          productId,
          quantity,
        },
      ],
    };
    const response = await axios.put(`${API_URL}/cart/${cartId}`, cartData);
    return response.data;
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};

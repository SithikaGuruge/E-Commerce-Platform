import { useState, useEffect } from "react";
import { Cart } from "../types";
import * as cartService from "../services/cartService";

export const useCart = (userId?: string) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);

  const fetchCart = async (userId: string) => {
    try {
      setLoading(true);
      const data = await cartService.getCartByUserId(userId);
      setCart(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (cartData: any) => {
    try {
      setLoading(true);
      const data = await cartService.addToCart(cartData);
      setCart(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add to cart");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addItemToCart = async (
    userId: string,
    productId: string,
    quantity: number = 1
  ) => {
    try {
      setLoading(true);
      const data = await cartService.addItemToCart(userId, productId, quantity);
      setCart(data);
      setError(null);
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add item to cart"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (cartId: string, cartData: any) => {
    try {
      setLoading(true);
      const data = await cartService.updateCart(cartId, cartData);
      setCart(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update cart");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = async (
    cartId: string,
    productId: string,
    quantity: number
  ) => {
    try {
      setLoading(true);
      const data = await cartService.updateCartItemQuantity(
        cartId,
        productId,
        quantity
      );
      setCart(data);
      setError(null);
      return data;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update item quantity"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async (userId: string) => {
    try {
      setLoading(true);
      await cartService.clearUserCart(userId);
      setCart(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cart");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCart = async (cartId: string) => {
    try {
      setLoading(true);
      await cartService.deleteCart(cartId);
      setCart(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete cart");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    loading,
    error,
    fetchCart,
    addToCart,
    addItemToCart,
    updateCart,
    updateCartItemQuantity,
    clearCart,
    deleteCart,
  };
};

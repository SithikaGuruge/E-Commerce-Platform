import { useState, useEffect } from "react";
import { Order } from "../types";
import * as orderService from "../services/orderService";

export const useOrders = (userId?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchOrders(userId);
    }
  }, [userId]);

  const fetchOrders = async (userId: string) => {
    try {
      setLoading(true);
      const data = await orderService.getOrdersByUserId(userId);
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (orderId: string) => {
    try {
      setLoading(true);
      const data = await orderService.getOrderById(orderId);
      setError(null);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: any) => {
    try {
      setLoading(true);
      const newOrder = await orderService.createOrder(orderData);
      setOrders([...orders, newOrder]);
      setError(null);
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const placeOrderFromCart = async (userId: string, products: any[]) => {
    try {
      setLoading(true);
      const newOrder = await orderService.placeOrderFromCart(userId, products);
      setOrders([...orders, newOrder]);
      setError(null);
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (orderId: string, orderData: any) => {
    try {
      setLoading(true);
      const updatedOrder = await orderService.updateOrder(orderId, orderData);
      setOrders(orders.map((o) => (o._id === orderId ? updatedOrder : o)));
      setError(null);
      return updatedOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId: string) => {
    try {
      setLoading(true);
      await orderService.cancelOrder(orderId);
      setOrders(orders.filter((o) => o._id !== orderId));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    getOrderById,
    createOrder,
    placeOrderFromCart,
    updateOrder,
    cancelOrder,
  };
};

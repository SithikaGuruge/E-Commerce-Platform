import axios from "axios";
import { Shop } from "@/types";

const API_URL =
  import.meta.env.VITE_SHOP_API_URL || "http://localhost:4001/api";

export interface ShopQueryParams {
  status?: string;
  category?: string;
  ownerId?: string;
  search?: string;
}

export const getAllShops = async (
  params?: ShopQueryParams
): Promise<Shop[]> => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.status) {
      queryParams.append("status", params.status);
    }

    if (params?.category) {
      queryParams.append("category", params.category);
    }

    if (params?.ownerId) {
      queryParams.append("ownerId", params.ownerId);
    }

    if (params?.search) {
      queryParams.append("search", params.search);
    }

    const url = queryParams.toString()
      ? `${API_URL}/shops?${queryParams.toString()}`
      : `${API_URL}/shops`;

    const response = await axios.get(url);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching shops:", error);
    throw error;
  }
};

export const getShopById = async (id: string): Promise<Shop> => {
  try {
    const response = await axios.get(`${API_URL}/shops/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching shop:", error);
    throw error;
  }
};

export const getShopsByOwner = async (ownerId: string): Promise<Shop[]> => {
  try {
    const response = await axios.get(`${API_URL}/shops/owner/${ownerId}`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching shops by owner:", error);
    throw error;
  }
};

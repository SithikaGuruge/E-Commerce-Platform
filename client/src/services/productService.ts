import { productApiClient } from "@/lib/api-client";
import { Product } from "@/types";

export interface ProductQueryParams {
  type?: string;
  category?: string;
  limit?: number;
  page?: number;
  search?: string;
  shopId?: string;
}

export interface PaginatedProductsResponse {
  success: boolean;
  data: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const getAllProducts = async (
  params?: ProductQueryParams
): Promise<Product[]> => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.type && params.type !== "all") {
      queryParams.append("type", params.type);
    }

    if (params?.category && params.category !== "all") {
      queryParams.append("category", params.category);
    }

    if (params?.search) {
      queryParams.append("search", params.search);
    }

    if (params?.shopId) {
      queryParams.append("shopId", params.shopId);
    }

    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }

    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }

    const url = queryParams.toString()
      ? `/products?${queryParams.toString()}`
      : `/products`;

    const response = await productApiClient.get(url);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductsPaginated = async (
  params?: ProductQueryParams
): Promise<PaginatedProductsResponse> => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.type && params.type !== "all") {
      queryParams.append("type", params.type);
    }

    if (params?.category && params.category !== "all") {
      queryParams.append("category", params.category);
    }

    if (params?.search) {
      queryParams.append("search", params.search);
    }

    if (params?.shopId) {
      queryParams.append("shopId", params.shopId);
    }

    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }

    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }

    const url = queryParams.toString()
      ? `/products?${queryParams.toString()}`
      : `/products`;

    const response = await productApiClient.get<PaginatedProductsResponse>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await productApiClient.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const createProduct = async (productData: any) => {
  try {
    const response = await productApiClient.post(`/products`, productData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, productData: any) => {
  try {
    const response = await productApiClient.put(`/products/${id}`, productData);
    return response.data.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const response = await productApiClient.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProductsByCategory = async (
  category: string,
  limit?: number
) => {
  try {
    const params: ProductQueryParams = { category };
    if (limit) {
      params.limit = limit;
    }
    return await getAllProducts(params);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export const getProductsByType = async (type: string, limit?: number) => {
  try {
    const params: ProductQueryParams = { type };
    if (limit) {
      params.limit = limit;
    }
    return await getAllProducts(params);
  } catch (error) {
    console.error("Error fetching products by type:", error);
    throw error;
  }
};

export const getProductsByShopId = async (shopId: string, limit?: number) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("shopId", shopId);
    if (limit) {
      queryParams.append("limit", limit.toString());
    }

    const url = `/products?${queryParams.toString()}`;
    const response = await productApiClient.get(url);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products by shop:", error);
    throw error;
  }
};

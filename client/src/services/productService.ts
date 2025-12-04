import axios from "axios";

const API_URL =
  import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:4002/api";

// Product query parameters interface
export interface ProductQueryParams {
  type?: string;
  category?: string;
  limit?: number;
}

// Get all products with optional filters
export const getAllProducts = async (params?: ProductQueryParams) => {
  console.log("API_URL:", API_URL);
  try {
    const queryParams = new URLSearchParams();

    if (params?.type) {
      queryParams.append("type", params.type);
    }

    if (params?.category) {
      queryParams.append("category", params.category);
    }

    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }

    const url = queryParams.toString()
      ? `${API_URL}/products?${queryParams.toString()}`
      : `${API_URL}/products`;

    const response = await axios.get(url);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Create new product
export const createProduct = async (productData: any) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id: string, productData: any) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, productData);
    return response.data.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Get products by category
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

// Get products by type
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

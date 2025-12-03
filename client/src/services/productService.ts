import axios from "axios";

const API_URL = import.meta.env.VITE_PRODUCT_API_URL || "http://localhost:4002";

// Get all products
export const getAllProducts = async () => {
  console.log("API_URL:", API_URL);
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// Create new product
export const createProduct = async (productData: any) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Update product
export const updateProduct = async (id: string, productData: any) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, productData);
    return response.data;
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
export const getProductsByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const products = response.data;
    return products.filter((product: any) => product.category === category);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

import { useState, useEffect } from "react";
import { Product } from "../types";
import * as productService from "../services/productService";
import { ProductQueryParams } from "../services/productService";

export const useProducts = (params?: ProductQueryParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [params?.type, params?.category, params?.limit]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts(params);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    try {
      setLoading(true);
      const data = await productService.getProductById(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: Partial<Product>) => {
    try {
      setLoading(true);
      const newProduct = await productService.createProduct(productData);
      setProducts([...products, newProduct]);
      setError(null);
      return newProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    try {
      setLoading(true);
      const updatedProduct = await productService.updateProduct(
        id,
        productData
      );
      setProducts(products.map((p) => (p._id === id ? updatedProduct : p)));
      setError(null);
      return updatedProduct;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      await productService.deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (category: string) => {
    try {
      setLoading(true);
      const data = await productService.getProductsByCategory(category);
      setError(null);
      return data;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch products by category"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
  };
};

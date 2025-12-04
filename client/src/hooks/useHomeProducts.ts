import { useState, useEffect } from "react";
import { Product } from "../types";
import * as productService from "../services/productService";

interface HomeProductsState {
  trendingProducts: Product[];
  newArrivals: Product[];
  importedProducts: Product[];
  regularProducts: Product[];
  loading: boolean;
  error: string | null;
}

export const useHomeProducts = (limit: number = 8) => {
  const [state, setState] = useState<HomeProductsState>({
    trendingProducts: [],
    newArrivals: [],
    importedProducts: [],
    regularProducts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true }));

        // Fetch products for each type in parallel
        const [trending, newArr, imported, regular] = await Promise.all([
          productService.getAllProducts({ type: "trending", limit }),
          productService.getAllProducts({ type: "new-arrivals", limit }),
          productService.getAllProducts({ type: "imported", limit }),
          productService.getAllProducts({ type: "regular", limit }),
        ]);

        setState({
          trendingProducts: trending,
          newArrivals: newArr,
          importedProducts: imported,
          regularProducts: regular,
          loading: false,
          error: null,
        });
      } catch (err) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            err instanceof Error ? err.message : "Failed to fetch products",
        }));
      }
    };

    fetchAllProducts();
  }, [limit]);

  return state;
};

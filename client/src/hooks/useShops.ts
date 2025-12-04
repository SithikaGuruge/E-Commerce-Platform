import { useState, useEffect } from "react";
import { Shop } from "@/types";
import * as shopService from "@/services/shopService";

interface UseShopsResult {
  shops: Shop[];
  shop: Shop | null;
  loading: boolean;
  error: string | null;
}

export const useShops = (
  filters?: shopService.ShopQueryParams,
  shopId?: string
): UseShopsResult => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (shopId) {
          // Fetch single shop
          const data = await shopService.getShopById(shopId);
          setShop(data);
        } else {
          // Fetch multiple shops
          const data = await shopService.getAllShops(filters);
          setShops(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch shops");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    shopId,
    filters?.status,
    filters?.category,
    filters?.ownerId,
    filters?.search,
  ]);

  return { shops, shop, loading, error };
};

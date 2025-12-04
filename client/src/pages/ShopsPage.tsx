import { useShops } from "@/hooks";
import { ShopCard } from "@/components/Shops/ShopCard";
import { ShopFilterBar, ShopFilters } from "@/components/Shops/ShopFilterBar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Store } from "lucide-react";
import { useState, useEffect } from "react";

export default function ShopsPage() {
  const [filters, setFilters] = useState<ShopFilters>({
    search: "",
    category: "all",
  });

  const [queryParams, setQueryParams] = useState<any>(undefined);

  useEffect(() => {
    const params: any = {};
    if (filters.category !== "all") {
      params.category = filters.category;
    }
    if (filters.search) {
      params.search = filters.search;
    }
    setQueryParams(Object.keys(params).length > 0 ? params : undefined);
  }, [filters]);

  const { shops, loading, error } = useShops(queryParams);

  const handleFiltersChange = (newFilters: ShopFilters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    // Filters auto-apply via state change
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Store className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">All Shops</h1>
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="text-6xl">😞</div>
          <h2 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold">All Shops</h1>
        </div>
        <div className="text-sm text-gray-600">
          {shops.length} {shops.length === 1 ? "shop" : "shops"} found
        </div>
      </div>

      {/* Filter Bar */}
      <ShopFilterBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onApplyFilters={handleApplyFilters}
      />

      {/* Shops Grid */}
      {shops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {shops.map((shop) => (
            <ShopCard key={shop._id} shop={shop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🏪</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No Shops Found
          </h3>
          <p className="text-gray-600 mb-4">
            {filters.search || filters.category !== "all"
              ? "Try adjusting your filters"
              : "Check back soon for exciting new shops!"}
          </p>
          {(filters.search || filters.category !== "all") && (
            <Button
              variant="outline"
              onClick={() => {
                setFilters({ search: "", category: "all" });
                handleApplyFilters();
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

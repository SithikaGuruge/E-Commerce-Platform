import { useProducts } from "@/hooks";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

export default function Products() {
  const { products, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(
    (product: Product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">All Products</h1>
        <Skeleton className="h-10 w-full max-w-md" />
        <div className="grid grid-cols-1 gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">All Products</h1>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-4">
        {filteredProducts.map((product: Product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              <div
                className="w-32 h-32 rounded flex-shrink-0 flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.05)" }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="text-gray-400 text-4xl">📦</div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    {product.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {product.description}
                      </p>
                    )}
                  </div>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">
                    ${(product.new_price || product.price || 0).toFixed(2)}
                  </span>
                  {product.stock !== undefined && (
                    <span className="text-sm text-gray-500">
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </span>
                  )}
                </div>
                <Button disabled={product.stock === 0}>Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {searchQuery
            ? "No products found matching your search"
            : "No products available"}
        </div>
      )}
    </div>
  );
}

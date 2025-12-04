import { useProducts } from "@/hooks";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Plus } from "lucide-react";

export default function ShopPage() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Shop</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
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
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Shop</h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shop</h1>
        <Badge variant="secondary">{products.length} Products</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              className="aspect-square flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ShoppingCart className="w-20 h-20 text-gray-300" />
              )}
            </div>
            <div className="p-4 space-y-3">
              <h3 className="font-semibold text-lg line-clamp-1">
                {product.name}
              </h3>
              {product.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold">
                  ${(product.new_price || product.price || 0).toFixed(2)}
                </span>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              {product.stock !== undefined && (
                <div className="text-sm text-gray-500">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </div>
              )}
              <Button className="w-full" disabled={product.stock === 0}>
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No products available
        </div>
      )}
    </div>
  );
}

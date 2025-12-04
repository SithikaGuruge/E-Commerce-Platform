import { useProducts } from "@/hooks";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Percent, Tag as TagIcon } from "lucide-react";

export default function Offers() {
  const { products, loading, error } = useProducts();

  const offerProducts = products.filter(
    (p: Product) => p.price && p.price < 50
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Special Offers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Special Offers</h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Percent className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold">Special Offers</h1>
        </div>
        <Badge variant="destructive">{offerProducts.length} Deals</Badge>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-red-700 mb-2">
          Limited Time Offers!
        </h2>
        <p className="text-gray-700">
          Don't miss out on these amazing deals. Shop now and save big!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offerProducts.map((product: Product) => (
          <div
            key={product._id}
            className="border border-red-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow relative"
          >
            <Badge
              variant="destructive"
              className="absolute top-2 right-2 z-10"
            >
              <TagIcon className="w-3 h-3 mr-1" />
              SALE
            </Badge>
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
                <div className="text-6xl">🎁</div>
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
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-red-600">
                  ${(product.new_price || product.price || 0).toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  $
                  {(
                    product.old_price ||
                    (product.new_price || product.price || 0) * 1.3
                  ).toFixed(2)}
                </span>
                <Badge variant="outline" className="ml-auto">
                  Save 30%
                </Badge>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      {offerProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No special offers available at the moment
        </div>
      )}
    </div>
  );
}

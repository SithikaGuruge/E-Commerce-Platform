import { useProducts } from "@/hooks";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useMemo } from "react";

export default function Categories() {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const categoryMap = new Map<string, Product[]>();

    products.forEach((product: Product) => {
      const category = product.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)?.push(product);
    });

    return Array.from(categoryMap.entries()).map(([name, items]) => ({
      name,
      count: items.length,
      products: items,
    }));
  }, [products]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Categories</h1>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  const displayProducts = selectedCategory
    ? categories.find((c) => c.name === selectedCategory)?.products || []
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Badge variant="secondary">{categories.length} Categories</Badge>
      </div>

      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold capitalize">
                  {category.name}
                </h3>
                <Badge>{category.count}</Badge>
              </div>
              <p className="text-gray-600 text-sm">
                {category.count} {category.count === 1 ? "product" : "products"}{" "}
                available
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-blue-600 hover:underline"
            >
              ← Back to categories
            </button>
            <h2 className="text-2xl font-semibold capitalize">
              {selectedCategory}
            </h2>
            <Badge>{displayProducts.length}</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product: Product) => (
              <div
                key={product._id}
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">📦</div>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                  <p className="text-xl font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {categories.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No categories available
        </div>
      )}
    </div>
  );
}

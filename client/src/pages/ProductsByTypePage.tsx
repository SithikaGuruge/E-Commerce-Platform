import { useProducts } from "@/hooks";
import { Product, ProductType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { TrendingUp, Sparkles, Globe, ArrowLeft, Package } from "lucide-react";
import { theme } from "@/config/theme";

const typeConfig: Record<
  ProductType,
  {
    title: string;
    icon: React.ReactNode;
    gradient: string;
    description: string;
  }
> = {
  trending: {
    title: "Trending Now",
    icon: <TrendingUp className="w-10 h-10 text-white" />,
    gradient: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600",
    description: "Discover what's hot and trending right now",
  },
  "new-arrivals": {
    title: "New Arrivals",
    icon: <Sparkles className="w-10 h-10 text-white" />,
    gradient: "bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600",
    description: "Check out our latest products just for you",
  },
  imported: {
    title: "Imported Collection",
    icon: <Globe className="w-10 h-10 text-white" />,
    gradient: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600",
    description: "Premium products from around the world",
  },
  regular: {
    title: "Our Collection",
    icon: <Package className="w-10 h-10 text-white" />,
    gradient: "bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-700",
    description: "Browse our complete product catalog",
  },
};

export default function ProductsByTypePage() {
  const { type } = useParams<{ type: ProductType }>();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts(type ? { type } : undefined);

  if (!type || !typeConfig[type]) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="text-6xl">❓</div>
          <h2 className="text-2xl font-bold">Invalid Product Type</h2>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const config = typeConfig[type];

  if (loading) {
    return (
      <div className="space-y-8 py-8">
        <Skeleton className="h-32 w-full rounded-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-64 w-full rounded-xl" />
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
          <h2 className="text-2xl font-bold">Oops! Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div
        className={`${config.gradient} rounded-3xl p-10 shadow-2xl relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              {config.icon}
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white">{config.title}</h1>
              <p className="text-white/90 text-lg mt-2">{config.description}</p>
            </div>
          </div>
          <p className="text-white/80 text-base">
            Found {products.length}{" "}
            {products.length === 1 ? "product" : "products"}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product: Product) => (
            <div
              key={product._id}
              className="group border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.15) 100%)",
                borderColor: theme.colors.primary[400],
              }}
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden relative">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-6xl">📦</div>
                )}
                {product.stock !== undefined &&
                  product.stock < 10 &&
                  product.stock > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute top-3 right-3"
                    >
                      Only {product.stock} left!
                    </Badge>
                  )}
                {product.stock === 0 && (
                  <Badge variant="secondary" className="absolute top-3 right-3">
                    Out of Stock
                  </Badge>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-1">
                  <h3
                    className="font-bold text-base line-clamp-2 flex-1 transition-colors"
                    style={{ color: theme.colors.text.primary }}
                  >
                    {product.name}
                  </h3>
                  <Badge
                    variant="outline"
                    className="shrink-0 text-xs font-semibold"
                    style={{
                      borderColor: theme.colors.primary.DEFAULT,
                      color: theme.colors.primary.DEFAULT,
                    }}
                  >
                    {product.category}
                  </Badge>
                </div>
                {product.description && (
                  <p
                    className="text-xs line-clamp-2"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    {product.description}
                  </p>
                )}
                <div
                  className="flex items-center justify-between pt-2 border-t"
                  style={{ borderColor: theme.colors.border.light }}
                >
                  <div className="flex items-baseline gap-1">
                    <span
                      className="text-xl font-extrabold"
                      style={{ color: theme.colors.primary.DEFAULT }}
                    >
                      ${(product.new_price || product.price || 0).toFixed(2)}
                    </span>
                    <span
                      className="text-xs line-through"
                      style={{ color: theme.colors.text.tertiary }}
                    >
                      $
                      {(
                        product.old_price ||
                        (product.new_price || product.price || 0) * 1.3
                      ).toFixed(2)}
                    </span>
                  </div>
                  <Badge
                    className="font-semibold shadow-sm"
                    style={{ backgroundColor: theme.colors.success.DEFAULT }}
                  >
                    Save 30%
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛍️</div>
          <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
          <p className="text-gray-600 mb-6">
            We couldn't find any products in this category
          </p>
          <Button onClick={() => navigate("/")}>Browse All Products</Button>
        </div>
      )}
    </div>
  );
}

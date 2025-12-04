import { Product, ProductType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { theme } from "@/config/theme";
interface ProductSectionProps {
  title: string;
  products: Product[];
  type: ProductType;
  icon: React.ReactNode;
  gradient: string;
}

export function ProductSection({
  title,
  products,
  type,
  icon,
  gradient,
}: ProductSectionProps) {
  const navigate = useNavigate();

  // Ensure products is an array
  const productsArray = Array.isArray(products) ? products : [];

  if (productsArray.length === 0) return null;

  return (
    <div className="py-12">
      <div
        className={`${gradient} rounded-3xl p-10 mb-8 shadow-2xl relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              {icon}
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">{title}</h2>
              <p className="text-white/90 text-base">
                Discover our {title.toLowerCase()} collection
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate(`/products/type/${type}`)}
            className="gap-2 bg-white text-gray-900 hover:bg-white/90 shadow-lg"
            size="lg"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsArray.map((product: Product) => (
          <div
            key={product._id}
            className="group border rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 cursor-pointer"
            style={{
              boxShadow: theme.shadows.md,
              background:
                "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.15) 100%)",
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

      <div className="flex justify-center mt-10">
        <Button
          size="lg"
          onClick={() => navigate(`/products/type/${type}`)}
          className="gap-3 group px-8 py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          style={{
            backgroundColor: theme.colors.primary.DEFAULT,
            color: theme.colors.text.inverse,
          }}
        >
          Show More {title}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { theme } from "@/config/theme";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  return (
    <div
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
            <Badge variant="destructive" className="absolute top-3 right-3">
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
  );
}

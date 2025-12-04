import { useNavigate } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
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
      <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <ShoppingCart className="w-20 h-20 text-gray-300" />
        )}
      </div>
      <div className="p-4 space-y-3">
        <h3
          className="font-semibold text-lg line-clamp-1"
          style={{ color: theme.colors.text.primary }}
        >
          {product.name}
        </h3>
        {product.description && (
          <p
            className="text-sm line-clamp-2"
            style={{ color: theme.colors.text.secondary }}
          >
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span
            className="text-xl font-bold"
            style={{ color: theme.colors.primary.DEFAULT }}
          >
            ${(product.new_price || product.price || 0).toFixed(2)}
          </span>
          <Badge
            variant="outline"
            style={{
              borderColor: theme.colors.primary.DEFAULT,
              color: theme.colors.primary.DEFAULT,
            }}
          >
            {product.category}
          </Badge>
        </div>
        {product.stock !== undefined && (
          <div
            className="text-sm"
            style={{ color: theme.colors.text.tertiary }}
          >
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </div>
        )}
        <Button
          className="w-full"
          disabled={product.stock === 0}
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart logic here
          }}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

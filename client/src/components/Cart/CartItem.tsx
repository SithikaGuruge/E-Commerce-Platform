import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import type { CartItem as CartItemType } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  return (
    <div
      className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      style={{
        backgroundColor: theme.colors.background.card,
        border: `1px solid ${theme.colors.border.DEFAULT}`,
      }}
    >
      <div className="flex gap-6">
        {/* Product Image */}
        <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3
                className="text-xl font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                {item.product.name}
              </h3>
              <p
                className="text-sm"
                style={{ color: theme.colors.text.secondary }}
              >
                {item.product.category}
              </p>
              {item.selectedSize && (
                <p
                  className="text-sm mt-1"
                  style={{ color: theme.colors.text.tertiary }}
                >
                  Size:{" "}
                  <span className="font-semibold">{item.selectedSize}</span>
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(item.product._id)}
              className="hover:bg-red-50"
            >
              <Trash2
                className="w-5 h-5"
                style={{ color: theme.colors.error.DEFAULT }}
              />
            </Button>
          </div>

          <div className="flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  onUpdateQuantity(item.product._id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
                className="h-8 w-8"
                style={{
                  borderColor: theme.colors.border.DEFAULT,
                  color: theme.colors.text.inverse,
                }}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span
                className="text-lg font-bold w-8 text-center"
                style={{ color: theme.colors.text.primary }}
              >
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  onUpdateQuantity(item.product._id, item.quantity + 1)
                }
                className="h-8 w-8"
                style={{
                  borderColor: theme.colors.border.DEFAULT,
                  color: theme.colors.text.inverse,
                }}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Price */}
            <div className="text-right">
              <p
                className="text-2xl font-bold"
                style={{ color: theme.colors.primary.DEFAULT }}
              >
                $
                {(
                  (item.product.new_price || item.product.price || 0) *
                  item.quantity
                ).toFixed(2)}
              </p>
              {item.product.old_price &&
                item.product.old_price > (item.product.new_price || 0) && (
                  <p
                    className="text-sm line-through"
                    style={{ color: theme.colors.text.tertiary }}
                  >
                    ${(item.product.old_price * item.quantity).toFixed(2)}
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

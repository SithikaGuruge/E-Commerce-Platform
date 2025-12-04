import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import CartItem from "./CartItem";
import type { CartItem as CartItemType } from "@/context/CartContext";

interface CartItemsListProps {
  items: CartItemType[];
  onRemove: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
}

export default function CartItemsList({
  items,
  onRemove,
  onUpdateQuantity,
  onClearCart,
}: CartItemsListProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      {items.map((item) => (
        <CartItem
          key={`${item.product._id}-${item.selectedSize}`}
          item={item}
          onRemove={onRemove}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}

      {/* Clear Cart Button */}
      <Button
        variant="outline"
        onClick={onClearCart}
        className="w-full"
        style={{
          borderColor: theme.colors.error.DEFAULT,
          color: theme.colors.error.DEFAULT,
        }}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Clear Cart
      </Button>
    </div>
  );
}

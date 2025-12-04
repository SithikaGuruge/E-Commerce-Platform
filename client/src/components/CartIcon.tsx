import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { theme } from "@/config/theme";

export function CartIcon() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <button
      onClick={() => navigate("/cart")}
      className="relative p-2 rounded-lg hover:scale-110 transition-all duration-300"
      style={{
        backgroundColor: `${theme.colors.primary.DEFAULT}20`,
      }}
    >
      <ShoppingCart
        className="w-6 h-6"
        style={{ color: theme.colors.primary.DEFAULT }}
      />
      {cartCount > 0 && (
        <span
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
          style={{
            backgroundColor: theme.colors.error.DEFAULT,
            border: `2px solid ${theme.colors.background.tertiary}`,
          }}
        >
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </button>
  );
}

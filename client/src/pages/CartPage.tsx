import { useCart } from "@/context/CartContext";
import EmptyCart from "@/components/Cart/EmptyCart";
import CartHeader from "@/components/Cart/CartHeader";
import CartItemsList from "@/components/Cart/CartItemsList";
import OrderSummary from "@/components/Cart/OrderSummary";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    clearCart,
  } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="space-y-6">
      <CartHeader itemCount={getCartCount()} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CartItemsList
          items={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClearCart={clearCart}
        />

        <OrderSummary
          itemCount={getCartCount()}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { CreditCard, Package, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { orderApiClient } from "@/lib/api-client";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export default function OrderSummary({
  itemCount,
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { cartItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      showErrorToast("Please login to proceed with checkout");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      showErrorToast("Your cart is empty");
      return;
    }

    try {
      setIsProcessing(true);

      // Group cart items by shop (using product's shop info if available)
      const itemsByShop = cartItems.reduce(
        (acc, item) => {
          const shopId = (item.product as any).shopId || "default-shop";
          if (!acc[shopId]) {
            acc[shopId] = [];
          }
          acc[shopId].push(item);
          return acc;
        },
        {} as Record<string, typeof cartItems>,
      );

      // Create orders for each shop
      const orderPromises = Object.entries(itemsByShop).map(
        async ([shopId, items]) => {
          const orderData = {
            userId: user!.id,
            shopId: shopId,
            products: items.map((item) => ({
              productId: item.product._id,
              quantity: item.quantity,
              price: item.product.new_price || item.product.price || 0,
              name: item.product.name,
            })),
            totalAmount: items.reduce(
              (sum, item) =>
                sum +
                (item.product.new_price || item.product.price || 0) *
                  item.quantity,
              0,
            ),
            shippingAddress: {
              street: "123 Main St", // TODO: Get from user profile or form
              city: "San Francisco",
              state: "CA",
              country: "USA",
              zipCode: "94102",
              phone: user?.contactNumber || "1234567890",
            },
          };

          return orderApiClient.post("/orders", orderData);
        },
      );

      const orders = await Promise.all(orderPromises);

      // For simplicity, use the first order for payment
      // In production, you might want to handle multiple orders differently
      if (orders.length > 0 && orders[0].data.success) {
        const orderId = orders[0].data.data._id;
        showSuccessToast("Order created successfully!");

        // Navigate to checkout with orderId
        navigate(`/checkout?orderId=${orderId}`);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      showErrorToast("Failed to proceed with checkout");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="lg:col-span-1">
      <div
        className="rounded-2xl p-6 shadow-lg sticky top-6"
        style={{
          backgroundColor: theme.colors.background.card,
          border: `1px solid ${theme.colors.border.DEFAULT}`,
        }}
      >
        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: theme.colors.text.primary }}
        >
          Order Summary
        </h2>

        <div className="space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between">
            <span style={{ color: theme.colors.text.secondary }}>
              Subtotal ({itemCount} items)
            </span>
            <span
              className="font-semibold"
              style={{ color: theme.colors.text.primary }}
            >
              ${subtotal.toFixed(2)}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex justify-between">
            <span style={{ color: theme.colors.text.secondary }}>Shipping</span>
            <span
              className="font-semibold"
              style={{
                color:
                  shipping === 0
                    ? theme.colors.success.DEFAULT
                    : theme.colors.text.primary,
              }}
            >
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          {/* Tax */}
          <div className="flex justify-between">
            <span style={{ color: theme.colors.text.secondary }}>
              Tax (10%)
            </span>
            <span
              className="font-semibold"
              style={{ color: theme.colors.text.primary }}
            >
              ${tax.toFixed(2)}
            </span>
          </div>

          {shipping > 0 && (
            <div
              className="p-3 rounded-lg text-sm"
              style={{
                backgroundColor: `${theme.colors.primary.DEFAULT}10`,
                color: theme.colors.primary.DEFAULT,
              }}
            >
              💡 Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
            </div>
          )}

          <div
            className="border-t pt-4"
            style={{ borderColor: theme.colors.border.light }}
          >
            <div className="flex justify-between items-center">
              <span
                className="text-xl font-bold"
                style={{ color: theme.colors.text.primary }}
              >
                Total
              </span>
              <span
                className="text-3xl font-bold"
                style={{ color: theme.colors.primary.DEFAULT }}
              >
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full py-6 text-lg font-semibold"
            style={{
              backgroundColor: theme.colors.primary.DEFAULT,
              color: "white",
            }}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </>
            )}
          </Button>

          {/* Accepted Payments */}
          <div className="pt-4 space-y-2">
            <p
              className="text-sm text-center"
              style={{ color: theme.colors.text.tertiary }}
            >
              We accept
            </p>
            <div className="flex justify-center gap-3">
              {["💳", "🏦", "📱", "💰"].map((icon, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                  style={{
                    backgroundColor: theme.colors.background.tertiary,
                    border: `1px solid ${theme.colors.border.light}`,
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Security Badge */}
          <div
            className="flex items-center justify-center gap-2 p-3 rounded-lg"
            style={{
              backgroundColor: `${theme.colors.success.DEFAULT}10`,
              color: theme.colors.success.DEFAULT,
            }}
          >
            <Package className="w-4 h-4" />
            <span className="text-sm font-semibold">
              Secure Checkout Guaranteed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

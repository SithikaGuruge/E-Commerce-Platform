import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { CreditCard, Package } from "lucide-react";

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
            className="w-full py-6 text-lg font-semibold"
            style={{
              backgroundColor: theme.colors.primary.DEFAULT,
              color: "white",
            }}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Proceed to Checkout
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

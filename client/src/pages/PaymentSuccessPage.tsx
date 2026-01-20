import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const paymentIntentId = searchParams.get("payment_intent");

  useEffect(() => {
    if (!paymentIntentId) {
      navigate("/");
      return;
    }

    // Countdown to redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/account");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentIntentId, navigate]);

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Success Icon */}
        <div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full mx-auto"
          style={{
            backgroundColor: `${theme.colors.success.DEFAULT}20`,
          }}
        >
          <CheckCircle2
            className="w-16 h-16"
            style={{ color: theme.colors.success.DEFAULT }}
          />
        </div>

        {/* Success Message */}
        <div>
          <h1
            className="text-3xl font-bold mb-3"
            style={{ color: theme.colors.text.primary }}
          >
            Payment Successful!
          </h1>
          <p className="text-lg" style={{ color: theme.colors.text.secondary }}>
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {/* Order Details Card */}
        <div
          className="p-6 rounded-xl text-left"
          style={{
            backgroundColor: theme.colors.background.card,
            border: `1px solid ${theme.colors.border.DEFAULT}`,
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Package
              className="w-6 h-6"
              style={{ color: theme.colors.primary.DEFAULT }}
            />
            <h3
              className="text-lg font-semibold"
              style={{ color: theme.colors.text.primary }}
            >
              Order Confirmed
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span style={{ color: theme.colors.text.tertiary }}>
                Payment ID
              </span>
              <span
                className="font-mono text-sm"
                style={{ color: theme.colors.text.secondary }}
              >
                {paymentIntentId?.substring(0, 20)}...
              </span>
            </div>

            <div
              className="pt-3 border-t"
              style={{ borderColor: theme.colors.border.light }}
            >
              <p
                className="text-sm"
                style={{ color: theme.colors.text.secondary }}
              >
                📧 A confirmation email has been sent to your email address.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate("/account")}
            className="w-full py-3"
            style={{
              backgroundColor: theme.colors.primary.DEFAULT,
              color: "white",
            }}
          >
            View My Orders
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="w-full py-3"
            style={{
              borderColor: theme.colors.border.DEFAULT,
              color: theme.colors.text.secondary,
            }}
          >
            Continue Shopping
          </Button>
        </div>

        {/* Auto Redirect Notice */}
        <p className="text-sm" style={{ color: theme.colors.text.tertiary }}>
          Redirecting to your orders in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}

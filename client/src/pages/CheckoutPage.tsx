import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { paymentService } from "@/services/paymentService";
import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard, ShieldCheck, Lock } from "lucide-react";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

// Initialize Stripe with specific API version
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    "",
);

// Checkout Form Component
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        showErrorToast(error.message || "Payment failed");
        console.error("Payment error:", error);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        showSuccessToast("Payment successful!");
        console.log("Payment succeeded:", paymentIntent);
        // Navigate to success page
        navigate(`/payment-success?payment_intent=${paymentIntent.id}`);
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      showErrorToast("An error occurred during payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        className="p-6 rounded-lg"
        style={{
          backgroundColor: theme.colors.background.tertiary,
          border: `1px solid ${theme.colors.border.light}`,
        }}
      >
        <PaymentElement />
      </div>

      <div
        className="flex items-center gap-3 p-4 rounded-lg"
        style={{
          backgroundColor: `${theme.colors.success.DEFAULT}10`,
          border: `1px solid ${theme.colors.success.DEFAULT}`,
        }}
      >
        <ShieldCheck
          className="w-5 h-5"
          style={{ color: theme.colors.success.DEFAULT }}
        />
        <div>
          <p
            className="font-semibold text-sm"
            style={{ color: theme.colors.success.DEFAULT }}
          >
            Secure Payment
          </p>
          <p className="text-xs" style={{ color: theme.colors.text.tertiary }}>
            Your payment information is encrypted and secure
          </p>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
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
            <Lock className="w-5 h-5 mr-2" />
            Pay Now
          </>
        )}
      </Button>
    </form>
  );
}

// Main Checkout Page Component
export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      showErrorToast("Order ID is missing");
      navigate("/cart");
      return;
    }

    const initializePayment = async () => {
      try {
        setIsLoading(true);
        console.log("Creating payment intent for order:", orderId);

        const response = await paymentService.createPaymentIntent(orderId);

        if (response.success && response.data) {
          setClientSecret(response.data.clientSecret);
          setAmount(response.data.amount);
          console.log("Payment intent created:", response.data.paymentIntentId);
        } else {
          throw new Error("Failed to create payment intent");
        }
      } catch (error) {
        console.error("Payment initialization error:", error);
        showErrorToast("Failed to initialize payment");
        navigate("/cart");
      } finally {
        setIsLoading(false);
      }
    };

    initializePayment();
  }, [orderId, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2
            className="w-12 h-12 animate-spin mx-auto mb-4"
            style={{ color: theme.colors.primary.DEFAULT }}
          />
          <p
            className="text-lg font-semibold"
            style={{ color: theme.colors.text.secondary }}
          >
            Preparing checkout...
          </p>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p
            className="text-lg font-semibold"
            style={{ color: theme.colors.error.DEFAULT }}
          >
            Failed to load checkout
          </p>
          <Button
            onClick={() => navigate("/cart")}
            className="mt-4"
            style={{
              backgroundColor: theme.colors.primary.DEFAULT,
              color: "white",
            }}
          >
            Return to Cart
          </Button>
        </div>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: theme.colors.primary.DEFAULT,
        colorBackground: theme.colors.background.card,
        colorText: theme.colors.text.inverse,
        colorDanger: theme.colors.error.DEFAULT,
        fontFamily: "system-ui, sans-serif",
        borderRadius: "8px",
      },
    },
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{
            backgroundColor: `${theme.colors.primary.DEFAULT}20`,
          }}
        >
          <CreditCard
            className="w-8 h-8"
            style={{ color: theme.colors.primary.DEFAULT }}
          />
        </div>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: theme.colors.text.primary }}
        >
          Secure Checkout
        </h1>
        <p className="text-lg" style={{ color: theme.colors.text.secondary }}>
          Complete your payment to place your order
        </p>
      </div>

      {/* Amount Display */}
      <div
        className="p-6 rounded-xl text-center"
        style={{
          backgroundColor: theme.colors.background.card,
          border: `1px solid ${theme.colors.border.DEFAULT}`,
        }}
      >
        <p
          className="text-sm mb-2"
          style={{ color: theme.colors.text.secondary }}
        >
          Total Amount
        </p>
        <p
          className="text-4xl font-bold"
          style={{ color: theme.colors.primary.DEFAULT }}
        >
          ${amount.toFixed(2)}
        </p>
      </div>

      {/* Payment Form */}
      <div
        className="p-6 rounded-xl"
        style={{
          backgroundColor: theme.colors.background.card,
          border: `1px solid ${theme.colors.border.DEFAULT}`,
        }}
      >
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>

      {/* Security Info */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Lock
            className="w-4 h-4"
            style={{ color: theme.colors.success.DEFAULT }}
          />
          <span style={{ color: theme.colors.text.tertiary }}>
            SSL Encrypted
          </span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck
            className="w-4 h-4"
            style={{ color: theme.colors.success.DEFAULT }}
          />
          <span style={{ color: theme.colors.text.tertiary }}>
            PCI Compliant
          </span>
        </div>
      </div>
    </div>
  );
}

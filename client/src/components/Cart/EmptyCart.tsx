import { useNavigate } from "react-router-dom";
import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <div className="text-center space-y-6">
        <div
          className="w-32 h-32 rounded-full mx-auto flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary[400]}20, ${theme.colors.primary[600]}30)`,
          }}
        >
          <ShoppingBag
            className="w-16 h-16"
            style={{ color: theme.colors.primary.DEFAULT }}
          />
        </div>
        <h2
          className="text-3xl font-bold"
          style={{ color: theme.colors.text.primary }}
        >
          Your Cart is Empty
        </h2>
        <p style={{ color: theme.colors.text.secondary }}>
          Looks like you haven't added anything to your cart yet
        </p>
        <Button
          onClick={() => navigate("/products")}
          className="mt-4"
          style={{
            backgroundColor: theme.colors.primary.DEFAULT,
            color: "white",
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

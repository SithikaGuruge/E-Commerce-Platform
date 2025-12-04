import { useNavigate } from "react-router-dom";
import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CartHeaderProps {
  itemCount: number;
}

export default function CartHeader({ itemCount }: CartHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1
          className="text-4xl font-bold"
          style={{ color: theme.colors.text.primary }}
        >
          Shopping Cart
        </h1>
        <p style={{ color: theme.colors.text.secondary }}>
          {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>
      <Button
        variant="ghost"
        onClick={() => navigate("/products")}
        style={{ color: theme.colors.primary.DEFAULT }}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Continue Shopping
      </Button>
    </div>
  );
}

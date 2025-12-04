import { useParams, useNavigate } from "react-router-dom";
import { useShops } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ShopBanner } from "@/components/Shops/ShopBanner";
import { ShopInfo } from "@/components/Shops/ShopInfo";
import { ShopProductsGrid } from "@/components/Shops/ShopProductsGrid";
import { ArrowLeft } from "lucide-react";

export default function ShopDetailPage() {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const {
    shop,
    loading: shopLoading,
    error: shopError,
  } = useShops(undefined, shopId);

  if (shopLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (shopError || !shop) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="text-6xl">😞</div>
          <h2 className="text-2xl font-bold text-gray-900">Shop Not Found</h2>
          <p className="text-gray-600">
            {shopError || "The shop you're looking for doesn't exist"}
          </p>
          <Button onClick={() => navigate("/shops")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shops
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate("/shops")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Shops
      </Button>

      {/* Shop Banner */}
      <ShopBanner shop={shop} />

      {/* Shop Info */}
      <ShopInfo shop={shop} />

      {/* Products Section */}
      <ShopProductsGrid shopId={shop._id} />
    </div>
  );
}

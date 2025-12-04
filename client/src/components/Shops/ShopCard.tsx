import { Shop } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, MapPin, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { theme } from "@/config/theme";

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  const navigate = useNavigate();

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      electronics: "bg-blue-100 text-blue-800",
      fashion: "bg-pink-100 text-pink-800",
      home_garden: "bg-green-100 text-green-800",
      sports: "bg-orange-100 text-orange-800",
      books: "bg-purple-100 text-purple-800",
      toys: "bg-yellow-100 text-yellow-800",
      food: "bg-red-100 text-red-800",
      health: "bg-teal-100 text-teal-800",
      beauty: "bg-rose-100 text-rose-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.other;
  };

  const formatCategory = (category: string) => {
    return category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden border rounded-2xl"
      style={{
        boxShadow: theme.shadows.md,
        background:
          "linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.15) 100%)",
        borderColor: theme.colors.primary[400],
      }}
      onClick={() => navigate(`/shops/${shop._id}`)}
    >
      {/* Banner Image */}
      <div className="h-40 bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
        {shop.banner ? (
          <img
            src={shop.banner}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-6xl opacity-50">
            🏪
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className={getCategoryColor(shop.category)}>
            {formatCategory(shop.category)}
          </Badge>
        </div>
      </div>

      <CardContent className="pt-6">
        {/* Logo and Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex-shrink-0 -mt-10">
            {shop.logo ? (
              <img
                src={shop.logo}
                alt={shop.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">
                🏬
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-bold text-lg truncate"
              style={{ color: theme.colors.text.primary }}
            >
              {shop.name}
            </h3>
            <p
              className="text-sm line-clamp-2"
              style={{ color: theme.colors.text.secondary }}
            >
              {shop.description}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span
                className="font-semibold"
                style={{ color: theme.colors.text.primary }}
              >
                {shop.rating.toFixed(1)}
              </span>
            </div>
            <div
              className="flex items-center gap-1"
              style={{ color: theme.colors.text.secondary }}
            >
              <Package className="w-4 h-4" />
              <span>{shop.totalProducts} Products</span>
            </div>
          </div>

          {/* Location */}
          <div
            className="flex items-center gap-1 text-sm"
            style={{ color: theme.colors.text.secondary }}
          >
            <MapPin className="w-4 h-4" />
            <span className="truncate">
              {shop.address.city}, {shop.address.country}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        {shop.status !== "active" && (
          <div className="mt-3">
            <Badge variant="outline" className="capitalize">
              {shop.status}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Shop } from "@/types/shop.types";
import { Badge } from "@/components/ui/badge";

interface ShopBannerProps {
  shop: Shop;
}

export function ShopBanner({ shop }: ShopBannerProps) {
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
    <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
      {shop.banner ? (
        <img
          src={shop.banner}
          alt={shop.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white text-8xl opacity-50">
          🏪
        </div>
      )}
      <div className="absolute top-4 right-4">
        <Badge className={getCategoryColor(shop.category)}>
          {formatCategory(shop.category)}
        </Badge>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  Sparkles,
  Globe,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { theme } from "@/config/theme";
import { useHomeProducts } from "@/hooks";
import { ProductSection } from "@/components/Home/ProductSection";

export default function HomePage() {
  const navigate = useNavigate();
  const {
    trendingProducts,
    newArrivals,
    importedProducts,
    regularProducts,
    loading,
    error,
  } = useHomeProducts(8);
  if (loading) {
    return (
      <div className="space-y-12 py-8">
        {[...Array(4)].map((_, sectionIndex) => (
          <div key={sectionIndex} className="space-y-6">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-64 w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="text-6xl">😞</div>
          <h2 className="text-2xl font-bold text-gray-900">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="space-y-16 py-6"
      style={{ backgroundColor: theme.colors.background.tertiary }}
    >
      {/* Hero Section */}
      <div
        className="rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden"
        style={{ background: theme.gradients.hero }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <ShoppingBag className="w-full h-full" />
        </div>
        <div className="max-w-3xl relative z-10">
          <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <span className="text-sm font-semibold">Welcome to Buy Easy</span>
          </div>
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            Discover Your Perfect Style
          </h1>
          <p className="text-xl text-white/95 mb-10 leading-relaxed">
            Shop the latest trends with exclusive deals and unbeatable prices.
            Your satisfaction is our priority.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button
              size="lg"
              onClick={() => navigate("/products")}
              className="px-8 py-6 text-base font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all"
              style={{
                backgroundColor: theme.colors.secondary.DEFAULT,
                color: theme.colors.text.inverse,
              }}
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("/offers")}
              className="px-8 py-6 text-base font-semibold rounded-xl border-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all shadow-lg"
              style={{ borderColor: "white", color: "white" }}
            >
              View Offers
            </Button>
          </div>
        </div>
      </div>

      {/* Trending Products */}
      <ProductSection
        title="Trending Now"
        products={trendingProducts}
        type="trending"
        icon={<TrendingUp className="w-10 h-10 text-white" />}
        gradient="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600"
      />

      {/* New Arrivals */}
      <ProductSection
        title="New Arrivals"
        products={newArrivals}
        type="new-arrivals"
        icon={<Sparkles className="w-10 h-10 text-white" />}
        gradient="bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600"
      />

      {/* Imported Products */}
      <ProductSection
        title="Imported Collection"
        products={importedProducts}
        type="imported"
        icon={<Globe className="w-10 h-10 text-white" />}
        gradient="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600"
      />

      {/* Regular Products */}
      <ProductSection
        title="Our Collection"
        products={regularProducts}
        type="regular"
        icon={<Package className="w-10 h-10 text-white" />}
        gradient="bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-700"
      />

      {/* If no products in any category */}
      {trendingProducts.length === 0 &&
        newArrivals.length === 0 &&
        importedProducts.length === 0 &&
        regularProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Products Available
            </h3>
            <p className="text-gray-600">
              Check back soon for exciting new products!
            </p>
          </div>
        )}
    </div>
  );
}

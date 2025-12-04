import { Product, ProductType } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "./ProductCard";
interface ProductSectionProps {
  title: string;
  products: Product[];
  type: ProductType;
  icon: React.ReactNode;
  gradient: string;
}

export function ProductSection({
  title,
  products,
  type,
  icon,
  gradient,
}: ProductSectionProps) {
  const navigate = useNavigate();

  // Ensure products is an array
  const productsArray = Array.isArray(products) ? products : [];

  if (productsArray.length === 0) return null;

  return (
    <div className="py-12">
      <div
        className={`${gradient} rounded-3xl p-10 mb-8 shadow-2xl relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              {icon}
            </div>
            <div>
              <h2 className="text-4xl font-bold text-white mb-1">{title}</h2>
              <p className="text-white/90 text-base">
                Discover our {title.toLowerCase()} collection
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate(`/products/type/${type}`)}
            className="gap-2 bg-white text-gray-900 hover:bg-white/90 shadow-lg"
            size="lg"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsArray.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button
          size="lg"
          onClick={() => navigate(`/products/type/${type}`)}
          className="gap-3 group px-8 py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all bg-primary text-primary-foreground"
        >
          Show More {title}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

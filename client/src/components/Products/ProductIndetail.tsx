import { useState } from "react";
import star_icon from "@/assets/star_icon.png";
import star_dull_icon from "@/assets/star_dull_icon.png";
import { Product } from "../../types";
import { useCart } from "@/context/CartContext";
import { theme } from "@/config/theme";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";

interface ProductIndetailProps {
  product: Product;
}

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function ProductIndetail({ product }: ProductIndetailProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="flex m-6 sm:flex-row flex-col lg:grid lg:grid-cols-2 items-center sm:items-start gap-8">
      <div className="flex gap-5">
        <div className="sm:flex flex-col gap-5 hidden ">
          <img
            className="w-40 rounded-lg"
            src={product.image}
            alt={product.name}
          />
          <img
            className="w-40 rounded-lg"
            src={product.image}
            alt={product.name}
          />
          <img
            className="w-40 rounded-lg"
            src={product.image}
            alt={product.name}
          />
          <img
            className="w-40 rounded-lg"
            src={product.image}
            alt={product.name}
          />
        </div>
        <div>
          <img
            className="w-full max-w-lg rounded-xl shadow-lg"
            src={product.image}
            alt={product.name}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1
          className="text-2xl md:text-3xl lg:text-4xl font-bold"
          style={{ color: theme.colors.text.primary }}
        >
          {product.name}
        </h1>
        <div className="flex flex-row items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(product.rating ?? 4)
                    ? star_icon
                    : star_dull_icon
                }
                alt="star"
                className="w-5 h-5"
              />
            ))}
          </div>
          <p style={{ color: theme.colors.text.secondary }}>
            ({product.reviewCount ?? 122} reviews)
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <p
            className="text-3xl font-bold"
            style={{ color: theme.colors.primary.DEFAULT }}
          >
            ${(product.new_price || product.price || 0).toFixed(2)}
          </p>
          {product.old_price &&
            product.old_price > (product.new_price || 0) && (
              <p
                className="text-xl line-through"
                style={{ color: theme.colors.text.tertiary }}
              >
                ${product.old_price.toFixed(2)}
              </p>
            )}
          {product.old_price &&
            product.old_price > (product.new_price || 0) && (
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: theme.colors.error.DEFAULT }}
              >
                {Math.round(
                  ((product.old_price - (product.new_price || 0)) /
                    product.old_price) *
                    100
                )}
                % OFF
              </span>
            )}
        </div>
        <div>
          <p
            className="text-base leading-relaxed"
            style={{ color: theme.colors.text.secondary }}
          >
            {product.description}
          </p>
        </div>

        {/* Size Selection */}
        <div className="flex gap-4 flex-col">
          <h2
            className="text-lg font-semibold"
            style={{ color: theme.colors.text.primary }}
          >
            Select Size
          </h2>
          <div className="flex justify-start flex-row gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className="px-5 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor:
                    selectedSize === size
                      ? theme.colors.primary.DEFAULT
                      : theme.colors.background.card,
                  color:
                    selectedSize === size ? "white" : theme.colors.text.primary,
                  border: `2px solid ${
                    selectedSize === size
                      ? theme.colors.primary.DEFAULT
                      : theme.colors.border.DEFAULT
                  }`,
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="flex gap-4 flex-col">
          <h2
            className="text-lg font-semibold"
            style={{ color: theme.colors.text.primary }}
          >
            Quantity
          </h2>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              style={{
                borderColor: theme.colors.border.DEFAULT,
                color: theme.colors.text.inverse,
              }}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span
              className="text-2xl font-bold w-12 text-center"
              style={{ color: theme.colors.text.primary }}
            >
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              style={{
                borderColor: theme.colors.border.DEFAULT,
                color: theme.colors.text.inverse,
              }}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: added
              ? theme.colors.success.DEFAULT
              : theme.colors.primary.DEFAULT,
            color: "white",
          }}
        >
          {added ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </>
          )}
        </Button>

        {/* Product Info */}
        <div
          className="mt-4 space-y-2"
          style={{ color: theme.colors.text.secondary }}
        >
          <p>
            <span
              className="font-semibold"
              style={{ color: theme.colors.text.primary }}
            >
              Category:{" "}
            </span>
            {product.category}
          </p>
          <p>
            <span
              className="font-semibold"
              style={{ color: theme.colors.text.primary }}
            >
              Type:{" "}
            </span>
            {product.type}
          </p>
          {product.tags && product.tags.length > 0 && (
            <p>
              <span
                className="font-semibold"
                style={{ color: theme.colors.text.primary }}
              >
                Tags:{" "}
              </span>
              {product.tags.join(", ")}
            </p>
          )}
          <p>
            <span
              className="font-semibold"
              style={{ color: theme.colors.text.primary }}
            >
              Stock:{" "}
            </span>
            {product.stock > 0 ? (
              <span style={{ color: theme.colors.success.DEFAULT }}>
                {product.stock} available
              </span>
            ) : (
              <span style={{ color: theme.colors.error.DEFAULT }}>
                Out of stock
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

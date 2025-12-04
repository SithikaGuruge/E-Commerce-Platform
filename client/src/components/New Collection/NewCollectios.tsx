import Item from "../Item/item.js";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/index.js";
import { Product } from "../../types";

export default function NewCollections() {
  const [all_product, setAllProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts({
          type: "new-arrivals",
          limit: 8,
        });
        console.log("New Collections products:", response);
        setAllProduct(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className=" flex flex-col lg:gap-10 gap-8 items-center mt-10">
      <div className="space-y-3">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold pt-5">
          New Collection
        </h1>
        <hr className=" border-2 border-black mb-5" />
      </div>
      <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-24 lg:gap-x-44 lg:gap-y-5 md:gap-y-5">
        {all_product.map((product: Product, i: number) => {
          return (
            <Item
              key={i}
              productId={product._id}
              name={product.name}
              image={product.image || ""}
              new_price={product.new_price || product.price || 0}
              old_price={
                product.old_price ||
                (product.new_price || product.price || 0) * 1.2
              }
            />
          );
        })}
      </div>
    </div>
  );
}

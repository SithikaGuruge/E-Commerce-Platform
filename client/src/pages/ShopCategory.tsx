import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";
import Item from "../components/Item/item";
import { Product } from "../types";

interface ShopCategoryProps {
  category: string;
  banner?: string;
}

export default function ShopCategory({ category, banner }: ShopCategoryProps) {
  const [clicked, setClicked] = useState(false);
  const context = useContext(ShopContext);
  const all_product = context?.all_product || [];

  const filteredProducts = all_product.filter(
    (product: Product) => product.category === category
  );

  const productsToShow = clicked
    ? filteredProducts
    : filteredProducts.slice(0, 12);

  return (
    <div className="">
      {banner && <img src={banner} alt={category} className="object-cover" />}
      <div className="flex text-lg ml-8 my-[80px] justify-between items-center">
        <p>
          <span className="font-semibold">
            Showing 1-{clicked ? filteredProducts.length : 12}
          </span>{" "}
          of {filteredProducts.length} results
        </p>
        <div className="flex flex-row gap-2 mr-10">
          Sort By <img src={dropdown_icon} alt="sort" />
        </div>
      </div>
      <div className="items-center justify-center">
        <div className="mx-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-24 lg:gap-x-40 lg:gap-y-8 md:gap-y-5 sm:gap-y-3">
          {productsToShow.map((product: Product, i: number) => (
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
          ))}
        </div>
      </div>
      <button
        onClick={() => setClicked(!clicked)}
        className="flex mt-8 justify-center items-center w-36 text-center mx-auto h-12 bg-[#ededed] text-[#787878] rounded-3xl border-2"
      >
        <h1>{clicked ? "Show Less" : "Explore More"}</h1>
      </button>
    </div>
  );
}

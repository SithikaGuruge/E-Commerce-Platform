import React from "react";
import { useEffect, useState } from "react";
import Item from "../Item/item.jsx";
import axios from "axios";

export default function popular() {
  const [all_product, setAllProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4002/products");
        console.log(response.data);
        setAllProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className=" flex flex-col lg:gap-10 gap-8 items-center ">
      <div className="space-y-3">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold pt-5">
          Popular in Women
        </h1>
        <hr className=" border-2 border-black" />
      </div>
      <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-24 lg:gap-x-44 lg:gap-y-5 md:gap-y-5">
        {all_product.map((product, i) => {
          if (product.category === "women" && i < 5) {
            console.log("product", product);
            return (
              <Item
                key={i}
                productId={product._id}
                name={product.name}
                image={product.image}
                new_price={product.new_price}
                old_price={product.old_price}
              />
            );
          }
        })}
      </div>

      <div className="space-y-3">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold pt-5">
          Popular in Men
        </h1>
        <hr className=" border-2 border-black" />
      </div>
      <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-24 lg:gap-x-44 lg:gap-y-5 md:gap-y-5">
        {all_product.map((product, i) => {
          if (product.category === "men" && i < 17) {
            return (
              <Item
                key={i}
                productId={product._id}
                name={product.name}
                image={product.image}
                new_price={product.new_price}
                old_price={product.old_price}
              />
            );
          }
        })}
      </div>

      <div className="space-y-3">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold pt-5">
          Popular in Kids
        </h1>
        <hr className=" border-2 border-black" />
      </div>
      <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-24 lg:gap-x-44 lg:gap-y-5 md:gap-y-5">
        {all_product.map((product, i) => {
          if (product.category === "kid" && i < 29) {
            return (
              <Item
                key={i}
                productId={product._id}
                name={product.name}
                image={product.image}
                new_price={product.new_price}
                old_price={product.old_price}
              />
            );
          }
        })}
      </div>

    </div>
  );
}

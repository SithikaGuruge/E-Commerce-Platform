import React from "react";
import all_product from "../../assets/all_product.js";
import Item from "../Item/item.jsx";

export default function popular() {
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
          if (product.category !== "women") return null;
          return (
            <Item
              key={i}
              id={product.id}
              name={product.name}
              image={product.image}
              new_price={product.new_price}
              old_price={product.old_price}
            />
          );
        })}
      </div>
    </div>
  );
}

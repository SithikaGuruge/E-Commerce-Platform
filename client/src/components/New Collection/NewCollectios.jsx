import React from "react";
import all_product from "../../assets/all_product.js";
import Item from "../Item/item.jsx";

export default function NewCollections() {
  return (
    <div className=" flex flex-col lg:gap-10 gap-8 items-center mt-10">
      <div className="space-y-3">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold pt-5">
          New Collection
        </h1>
        <hr className=" border-2 border-black mb-5" />
      </div>
      <div className="mx-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-24 lg:gap-x-44 lg:gap-y-5 md:gap-y-5">
        {all_product.map((product, i) => {
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

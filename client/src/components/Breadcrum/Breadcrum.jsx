import React from "react";
import arrow_icon from "../../assets/breadcrum_arrow.png";

export default function Breadcrum(props) {
  const { product } = props;
  return (
    <div className="flex flex-row py-2 space-x-2 items-center font-semibold font-[#5e5e5e] capitalize ml-2">
      <div>Home</div> <img src={arrow_icon} className="h-3 w-3 relative" />
      <div> Shop</div>
      <img src={arrow_icon} className="h-3 w-3 relative" />
      <div>{product.category}</div>
      <img src={arrow_icon} className="h-3 w-3 relative" />{" "}
      <div>{product.name}</div>
    </div>
  );
}

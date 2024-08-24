import React from "react";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
export default function ProductDisplay(props) {
  return (
    <div className="flex m-6 sm:flex-row flex-col lg:grid lg:grid-cols-2 items-center sm:items-start">
      <div className="flex gap-5">
        <div className="sm:flex flex-col gap-5 hidden ">
          <img className="w-40" src={props.product.image} alt={props.name} />
          <img className="w-40" src={props.product.image} alt={props.name} />
          <img className="w-40" src={props.product.image} alt={props.name} />
          <img className="w-40" src={props.product.image} alt={props.name} />
        </div>
        <div>
          <img className="w-72" src={props.product.image} alt={props.name} />
        </div>
      </div>
      <div className="m-5 flex flex-col">
        <h1 className="text-l md:text-xl lg:text-4xl font-semibold">
          {props.product.name}
        </h1>
        <div className="flex flex-row items-center mt-2">
          <img src={star_icon} alt={props.name} />
          <img src={star_icon} alt={props.name} />
          <img src={star_icon} alt={props.name} />
          <img src={star_icon} alt={props.name} />
          <img src={star_dull_icon} alt={props.name} />
          <p>122</p>
        </div>
        <div className="flex my-3 gap-3 font-semibold">
          <p className="line-through">{props.product.old_price}</p>
          <p className="text-red-500">{props.product.new_price}</p>
        </div>
        <div>
          <p className="mt-5 text-[#656565] font-semibold">
            {props.product.description}
          </p>
        </div>
        <div className="flex gap-4 flex-col">
          <h1>Select Size</h1>
          <div className=" flex justify-start flex-row gap-2 md:gap-3 ">
            <div className="border bg-[#fbfbfb] cursor-pointer p-2">S</div>
            <div className="border bg-[#fbfbfb] cursor-pointer p-2">M</div>
            <div className="border bg-[#fbfbfb] cursor-pointer p-2">L</div>
            <div className="border bg-[#fbfbfb] cursor-pointer p-2">XL</div>
            <div className="border bg-[#fbfbfb] cursor-pointer p-2">XXL</div>
          </div>
        </div>
        <div>
          <button className="w-auto border my-4 p-2 text-center bg-[#ff4141]">Add to Cart</button>
          <p>
            <span>Category :</span> Women,T-shirt,Crop Top
          </p>
          <p className="my-4">
            <span>Tags :</span> Modern.Latest
          </p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import exclusive_image from "../../assets/exclusive_image.png";

export default function Offers() {
  return (
    <div className="flex w-[65%] lg:w - [80%] py-10 m-auto px-2 mb-16 mt-10 bg-gradient-to-t from-[#fde1ff] to-[#e1ffea22]">
      <div className="flex flex-row justify-between w-full">
        <div className="flex justify-center flex-col ml-5 md:ml-20 lg:gap-y-3">
          <h1 className="text-[#171717] text-4xl lg:text-5xl font-semibold">
            Exclusive
          </h1>
          <h2 className="text-[#171717] text-3xl lg:text-4xl font-semibold">
            Offers for you
          </h2>
          <p>ONLY ON BEST SELLERS PRODUCTS</p>
          <button
            className="rounded-lg bg-[#ff4141] text-white mt-3 cursor-pointer w-24 h-8 justify-center items-center"
          >
            Check Now
          </button>
        </div>
        <div className="ml-auto lg:mr-20">
          <img src={exclusive_image} className="h-[300px] w-auto"></img>
        </div>
      </div>
    </div>
  );
}

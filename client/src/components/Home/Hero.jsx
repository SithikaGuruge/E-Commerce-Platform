import React from "react";
import hand_icon from "../../assets/hand_icon.png";
import ArrowIcon from "../../assets/arrow.png";
import Hero_png from "../../assets/hero_image.png";

export default function Hero() {
  return (
    <div className="flex bg-gradient-to-b from-red-100 to-gray-300 justify-between">
      <div className="flex flex-col justify-center gap-3 pl-24">
        <h1 className="text-5xl font-semibold">New Arrivals Only</h1>
        <div>
          <div className="flex items-center gap-10 text-2xl font-semibold mb-0">
            <p>New</p>
            <img src={hand_icon} alt="hand_icon" className="w-[70px]" />
          </div>
          <p className="text-2xl font-semibold">Collection</p>
          <p className="text-2xl font-semibold">for ereryone</p>
        </div>
        <div className="flex gap-2 bg-red-400 rounded-xl p-3 w-48">
          <h1>Latest Collection</h1>
          <img src={ArrowIcon} alt="ArrowIcon" />
        </div>
      </div>
      <div className="flex justify-center mr-24">
        <img src={Hero_png} alt="Hero_png" className="w-[500px] h-auto" />
      </div>
    </div>
  );
}

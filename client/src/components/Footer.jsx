import React from "react";
import LogoBig from "../assets/logo_big.png";
import instagram_icon from "../assets/instagram_icon.png";
import whatsapp_icon from "../assets/whatsapp_icon.png";  
export default function Footer() {
  return <div className="flex flex-col items-center justify-center gap-5 bg-orange-400 mt-10">
    <div className="flex items-center gap -8">
      <img src={LogoBig}/>
      <p className="text-[#383838] text-2xl font-semibold">BUY EASY</p>
    </div>
    <ul className="flex gap-6 text-[#252525]">
      <li>
        Company
      </li>
      <li>
     Product
      </li>
      <li>
        Offices
      </li>
      <li>
        About Us
      </li>
    </ul>
    <div className="flex gap-x-3">
      <div className="p-2 bg-[#fbfbfb] rounded-lg">
        <img src={instagram_icon} /> 
      </div>
      <div className="p-2 bg-[#fbfbfb] border-2 rounded-lg">
        <img src={whatsapp_icon}/> 
      </div>

    </div>
    <div className="flex item-center w-full mb-5 justify-center">
      <p>© 2024 Buy Easy. All rights reserved.</p>
    </div>
  </div>;
}

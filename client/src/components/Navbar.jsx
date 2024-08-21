import react, { useState } from "react";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import { Link } from "react-router-dom";
import na_dropdown from "../assets/dropdown_icon.png";

export default function Navbar() {
  const [selectedItem, setSelectedItem] = useState("Shop");
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const routes = {
    Shop: "/",
    Men: "/men",
    Women: "/women",
    Kids: "/kids",
  };

  const dropdown_togle = (e) => {
    console.log("dropdown_togle");
  }
  return (
    <div className="flex justify-between p-2 shadow-xl items-center">
      <div className="flex flex-row gap-3 items-center ml-6">
        <img src={logo} alt="logo" className="size-10 md:size-20 lg:size-30"/>
        <h1 className="text-2xl font-bold">Buy Easy</h1>
      </div>
      <ul className="flex gap-6 cursor-pointer">
        {["Shop", "Men", "Women", "Kids"].map((item) => (
          <li
            key={item}
            className={`${
              selectedItem === item ? "text-red-500 font-semibold" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            <Link to={routes[item]}>{item}</Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-row justify-evenly gap-3 lg:gap-5">
        <Link to="/login">
          {" "}
          <button className="justify-center item-center text-sm text-center md:text-lg rounded-xl bg-slate-300 hover:bg-orange-400 py-2 px-4 font-semibold cursor-pointer w-16 h-8 md:w-20 md:h-10">
            Login
          </button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="cart_icon" className="size-8 md:size-9 lg:size-10"/>
        </Link>
        <h1 className="size-[16px] px-1 display-flex mt-[-12px] ml-[-20px] rounded-full bg-red-500 text-white text-xs">
          0
        </h1>
      </div>
    </div>
  );
}

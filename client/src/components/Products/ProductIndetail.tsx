import star_icon from "@/assets/star_icon.png";
import star_dull_icon from "@/assets/star_dull_icon.png";
import { Product } from "../../types";

interface ProductIndetailProps {
  product: Product;
}

export default function ProductIndetail({ product }: ProductIndetailProps) {
  return (
    <div className="flex m-6 sm:flex-row flex-col lg:grid lg:grid-cols-2 items-center sm:items-start">
      <div className="flex gap-5">
        <div className="sm:flex flex-col gap-5 hidden ">
          <img className="w-40" src={product.image} alt={product.name} />
          <img className="w-40" src={product.image} alt={product.name} />
          <img className="w-40" src={product.image} alt={product.name} />
          <img className="w-40" src={product.image} alt={product.name} />
        </div>
        <div>
          <img className="w-72" src={product.image} alt={product.name} />
        </div>
      </div>
      <div className="m-5 flex flex-col">
        <h1 className="text-l md:text-xl lg:text-4xl font-semibold">
          {product.name}
        </h1>
        <div className="flex flex-row items-center mt-2">
          <img src={star_icon} alt={product.name} />
          <img src={star_icon} alt={product.name} />
          <img src={star_icon} alt={product.name} />
          <img src={star_icon} alt={product.name} />
          <img src={star_dull_icon} alt={product.name} />
          <p>122</p>
        </div>
        <div className="flex my-3 gap-3 font-semibold">
          <p className="line-through">
            ${(product.old_price || product.new_price * 1.2 || 0).toFixed(2)}
          </p>
          <p className="text-red-500">
            ${(product.new_price || product.price || 0).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="mt-5 text-[#656565] font-semibold">
            {product.description}
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
          <button className="w-auto border my-4 p-2 text-center bg-[#ff4141]">
            Add to Cart
          </button>
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

import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/Breadcrum/Breadcrum";
import ProductDisplay from "../components/Product Display/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";

export default function Product() {
  const { all_product } = useContext(ShopContext);
  const product_id = useParams().id;
  console.log(useParams());
  console.log("use params", product_id);
  const product = all_product.find((product) => product._id == product_id);
  console.log("product", product);
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
    </div>
  );
}

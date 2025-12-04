import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../components/Breadcrum/Breadcrum";
import ProductDisplay from "../components/Product Display/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import { getProductById } from "../services";
import { Product as ProductType } from "../types";

export default function Product() {
  const { id } = useParams(); // Destructure to get just the id
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          const data = await getProductById(id); // Await the async call
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center p-8">Product not found</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
    </div>
  );
}

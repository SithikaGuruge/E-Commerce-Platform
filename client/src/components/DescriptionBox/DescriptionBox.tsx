import { Product } from "../../types";

interface DescriptionBoxProps {
  product?: Product;
}

export default function DescriptionBox({ product }: DescriptionBoxProps) {
  if (!product) {
    return (
      <div className="m-5">
        <h1 className="text-2xl font-bold mb-4">Description</h1>
        <p className="text-gray-500">No product information available.</p>
      </div>
    );
  }

  return (
    <div className="m-5">
      <h1 className="text-2xl font-bold mb-4">Description</h1>
      <div className="prose max-w-none">
        {product.description ? (
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        ) : (
          <p className="text-gray-500 italic">
            No description available for this product.
          </p>
        )}
      </div>
    </div>
  );
}

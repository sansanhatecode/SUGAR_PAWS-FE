import { ProductDetail } from "@/types/product";
import React from "react";

interface ProductDescriptionProps {
  product: Pick<
    ProductDetail,
    "description" | "benefits" | "productDetails" | "moreDetails"
  >;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <div className="text-gray-700 space-y-6 text-sm leading-relaxed">
      <div>
        <h3 className="font-semibold text-base text-gray-800 mb-2">
          Product Description
        </h3>
        <p>{product.description}</p>
      </div>
      {product.benefits?.length > 0 && (
        <div>
          <h3 className="font-semibold text-base text-gray-800 mb-2">
            Benefits
          </h3>
          <ul className="list-disc list-outside pl-5 space-y-1">
            {product.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      {product.productDetails?.length > 0 && (
        <div>
          <h3 className="font-semibold text-base text-gray-800 mb-2">
            Product Details
          </h3>
          <ul className="list-disc list-outside pl-5 space-y-1">
            {product.productDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
      {product.moreDetails?.length > 0 && (
        <div>
          <h3 className="font-semibold text-base text-gray-800 mb-2">
            More Details
          </h3>
          <ul className="list-disc list-outside pl-5 space-y-1">
            {product.moreDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;

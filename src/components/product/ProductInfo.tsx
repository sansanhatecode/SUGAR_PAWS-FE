// components/product/ProductInfo.tsx
import { ProductDetail } from "@/types/product";
import React from "react";
import { FiHeart, FiShare2 } from "react-icons/fi";
import StarRating from "./rating/StarRating";

interface ProductInfoProps {
  product: Pick<
    ProductDetail,
    "title" | "brand" | "price" | "oldPrice" | "rating" | "reviewsCount"
  >;
  onWishlistClick?: () => void; // Optional click handlers
  onShareClick?: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  onWishlistClick,
  onShareClick,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          {product.title}
        </h1>
        <div className="flex gap-3 text-gray-500 pt-1">
          <button
            aria-label="Add to Wishlist"
            className="hover:text-red-500"
            onClick={onWishlistClick}
          >
            <FiHeart size={20} />
          </button>
          <button
            aria-label="Share Product"
            className="hover:text-custom-rose"
            onClick={onShareClick}
          >
            <FiShare2 size={20} />
          </button>
        </div>
      </div>

      <p className="text-gray-500 text-sm">{product.brand}</p>

      <div className="flex items-center gap-3 mt-2">
        <span className="text-2xl md:text-3xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        {product.oldPrice && (
          <span className="text-lg line-through text-gray-400">
            ${product.oldPrice.toFixed(2)}
          </span>
        )}
      </div>

      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600 mt-1">
        <StarRating rating={product.rating} size={16} />
        <span className="font-medium">{product.rating.toFixed(1)}</span>
        <span className="text-gray-400 hidden sm:inline">|</span>
        <a href="#reviews-section" className="hover:underline">
          {product.reviewsCount} Reviews
        </a>
        <span className="text-gray-400 hidden sm:inline">|</span>
        <span className="text-green-600 font-medium">
          93% Recommended
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;

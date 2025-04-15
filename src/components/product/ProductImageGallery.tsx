// components/product/ProductImageGallery.tsx
import React from "react";
import Image from "next/image";
import { ProductDetail } from "@/types/product";

interface ProductImageGalleryProps {
  images: ProductDetail["images"];
  selectedImage: string;
  onThumbnailClick: (image: string) => void;
  productTitle: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  selectedImage,
  onThumbnailClick,
  productTitle,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-sm border border-gray-200">
        <Image
          src={selectedImage}
          alt={`Main view of ${productTitle}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover transition-opacity duration-300 ease-in-out"
          priority
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${
              selectedImage === img
                ? "border-custom-rose ring-1 ring-custom-rose ring-offset-1"
                : "border-gray-200 hover:border-gray-400"
            }`}
            onClick={() => onThumbnailClick(img)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1} for ${productTitle}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;

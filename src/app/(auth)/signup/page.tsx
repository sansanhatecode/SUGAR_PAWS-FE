"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface ProductImageGalleryProps {
  images: Product["displayImage"];
  selectedImage: string | null;
  onThumbnailClick: (image: string) => void;
  productTitle: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  selectedImage,
  onThumbnailClick,
  productTitle,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;
  const endIndex = startIndex + visibleCount;
  const thumbnails = images.slice(startIndex, endIndex);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    if (startIndex + visibleCount < images.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-sm border border-gray-200">
        <Image
          src={
            selectedImage ||
            (images.length > 0 ? images[0] : "/placeholder.jpg")
          }
          alt={`Main view of ${productTitle}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover transition-opacity duration-300 ease-in-out"
          priority
        />
      </div>

      {/* Thumbnail navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="p-2 rounded-full bg-white shadow disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div className="flex gap-2">
          {thumbnails.map((img, index) => (
            <div
              key={startIndex + index}
              className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 ${
                selectedImage === img
                  ? "border-custom-rose ring-1 ring-custom-rose ring-offset-1"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              onClick={() => onThumbnailClick(img)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${startIndex + index + 1} for ${productTitle}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={endIndex >= images.length}
          className="p-2 rounded-full bg-white shadow disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default ProductImageGallery;

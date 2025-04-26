import React from "react";
import Image from "next/image";

interface CategoryPageBannerProps {
  title: string;
  description?: string;
  imageSrc?: string;
  isLoading: boolean;
}

const CategoryPageBanner = ({
  title,
  description = "Explore our exclusive collection.",
  imageSrc = "https://store.lolitacollective.com/cdn/shop/products/Candy-Shoppe-OTKs-Sax-x-Pink_a02047d9-622c-4238-8f34-7b4f1db67516_98x.png?v=1660765917",
  isLoading,
}: CategoryPageBannerProps) => {
  return (
    <div className="w-full">
      {isLoading ? (
        <div className="bg-custom-pink h-[250px] flex items-center justify-center relative">
          <div className="relative text-center">
            <div className="w-[200px] h-[32px] bg-gray-300 animate-pulse mb-2 rounded"></div>
            <div className="w-[300px] h-[16px] bg-gray-300 animate-pulse rounded"></div>
          </div>
        </div>
      ) : (
        <div className="bg-custom-pink h-[250px] flex items-center justify-center relative">
          {imageSrc && (
            <Image
              fill
              src={imageSrc}
              alt={title}
              className="absolute w-full h-full object-cover opacity-50"
            />
          )}
          <div className="relative text-center">
            <h1 className="text-white text-[32px] font-bold">{title}</h1>
            {description && (
              <p className="text-white text-[16px] mt-2">{description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPageBanner;

"use client";

import React from "react";

interface ProductDescriptionProps {
  description?: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  // Nếu không có mô tả, hiển thị mặc định
  if (!description || description.trim() === "") {
    return (
      <div className="text-gray-500 text-center py-8">
        No description available.
      </div>
    );
  }

  // Làm sạch HTML cơ bản (bỏ thẻ meta)
  const cleanDescription = description.replace(/<meta[^>]*>/g, "");

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Product Description
      </h2>
      <div
        className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl 
                     prose-p:text-gray-800 prose-p:leading-relaxed 
                     prose-li:marker:text-custom-rose prose-li:mb-1 
                     prose-a:text-blue-600 hover:prose-a:underline 
                     prose-strong:text-gray-900 prose-img:rounded-xl 
                     prose-img:shadow-md dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: cleanDescription }}
      />
    </div>
  );
}

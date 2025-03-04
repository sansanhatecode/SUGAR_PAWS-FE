"use client";

import React from "react";

const ImageLayout: React.FC = () => {
  const images = [
    "https://source.unsplash.com/random/800x600",
    "https://source.unsplash.com/random/801x601",
    "https://source.unsplash.com/random/802x602",
    "https://source.unsplash.com/random/803x603",
    "https://source.unsplash.com/random/804x604",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {images.map((src, index) => (
        <div key={index} className="relative">
          <img
            src={src}
            alt={`Random ${index}`}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageLayout;

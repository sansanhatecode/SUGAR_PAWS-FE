"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const images = [
  "assets/images/slider-img/slider-img1.png",
  "assets/images/slider-img/slider-img2.webp",
  "assets/images/slider-img/slider-img3.png",
  "assets/images/slider-img/slider-img4.png",
  "assets/images/slider-img/slider-img5.webp",
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
  }, []);

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const goToPrevious = () => {
    stopAutoSlide();
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    startAutoSlide();
  };

  const goToNext = () => {
    stopAutoSlide();
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [startAutoSlide]);

  return (
    <div className="relative w-full h-[620px] overflow-hidden group">
      {/* Nút điều hướng (Ẩn mặc định, chỉ hiển thị khi hover) */}
      <div className="absolute flex items-center justify-between z-10 px-5 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={goToPrevious}
          className="w-8 h-8 flex justify-center items-center shadow-md bg-custom-yellow text-custom-rose rounded-full transition-transform duration-300 hover:scale-125"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button
          onClick={goToNext}
          className="w-8 h-8 flex justify-center items-center shadow-md bg-custom-yellow text-custom-rose rounded-full transition-transform duration-300 hover:scale-125"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>

      <div className="w-full h-full overflow-hidden">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`rounded-full border-[1px] transition-all duration-300 ease-in-out ${
              index === currentIndex ? "w-8 h-3" : "w-3 h-3 opacity-60"
            } ${
              currentIndex !== 0
                ? "border-custom-purple"
                : "border-custom-yellow"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;

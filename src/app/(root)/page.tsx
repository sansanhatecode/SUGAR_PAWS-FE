import Slider from "@/components/Slider";
import Image from "next/image";
import React from "react";

type PopularItem = { imgSrc: string; name: string };

export default function HomePage() {
  const popularItems: PopularItem[] = [
    { imgSrc: "/assets/images/popular-img/blouse.png", name: "Blouses" },
    { imgSrc: "/assets/images/popular-img/skirt.png", name: "Jumperskirts" },
    { imgSrc: "/assets/images/popular-img/shoes.png", name: "Shoes" },
    { imgSrc: "/assets/images/popular-img/sock.png", name: "Socks" },
    { imgSrc: "/assets/images/popular-img/hair.png", name: "Hair Accessories" },
    { imgSrc: "/assets/images/popular-img/enamel-pins.png", name: "Enamel Pins" },
    { imgSrc: "/assets/images/popular-img/ring.png", name: "Rings" },
    { imgSrc: "/assets/images/popular-img/necklaces.png", name: "Necklaces" },
    { imgSrc: "/assets/images/popular-img/hair-clip.png", name: "Hair Clips" },
    { imgSrc: "/assets/images/popular-img/earing.png", name: "Earings" },
  ];

  return (
    <div>
      <Slider />
      <div className="text-center text-[12px] h-8 bg-custom-rose py-2">
        NOW SHIPPING ALL VIETNAM - 7 days free return!
      </div>
      <section className="w-full py-10">
        <div className="max-w-[1200px] min-w-[928px] w-[60%] flex flex-col gap-10 m-auto">
          <h2 className="text-center text-[40px] font-bold">
            Popular Items
          </h2>
          <div className="flex flex-col gap-16">
            {Array.from({ length: Math.ceil(popularItems.length / 5) }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex justify-between">
                {popularItems.slice(rowIndex * 5, (rowIndex + 1) * 5).map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-6 cursor-pointer group"
                  >
                    <div className="w-[160px] h-[160px] rounded-full overflow-hidden transition-transform duration-700 group-hover:scale-110">
                      <Image
                        width={160}
                        height={160}
                        src={item.imgSrc}
                        alt={item.name}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[16px] font-bold transition-all duration-500 group-hover:tracking-wider">{item.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

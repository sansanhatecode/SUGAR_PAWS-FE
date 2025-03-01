"use client";

import Slider from "@/components/Slider";
import {
  faCircleCheck,
  faHeart,
  faStar,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import CtaButton from "@/components/CtaButton";

type PopularItem = { imgSrc: string; name: string };

type PlusSizeItem = { imgSrc: string; name: string; price: string };

const cards = [
  {
    title: "Upcomming Events",
    description: "Catch us at a pop-up shop near you.",
    image: "/assets/images/featured-directory/img1.png",
  },
  {
    title: "Featured Designers",
    description: "See what inspires artists from around the world.",
    image: "/assets/images/featured-directory/img2.png",
  },
  {
    title: "The LC Team",
    description: "Get acquainted with LC.",
    image: "/assets/images/featured-directory/img3.png",
  },
  {
    title: "Our newsletter",
    description: "Community happenings.",
    image: "/assets/images/featured-directory/img4.png",
  },
];

export default function HomePage() {
  const popularItems: PopularItem[] = [
    { imgSrc: "/assets/images/popular-img/blouse.png", name: "Blouses" },
    { imgSrc: "/assets/images/popular-img/skirt.png", name: "Jumperskirts" },
    { imgSrc: "/assets/images/popular-img/shoes.png", name: "Shoes" },
    { imgSrc: "/assets/images/popular-img/sock.png", name: "Socks" },
    { imgSrc: "/assets/images/popular-img/hair.png", name: "Hair Accessories" },
    {
      imgSrc: "/assets/images/popular-img/enamel-pins.png",
      name: "Enamel Pins",
    },
    { imgSrc: "/assets/images/popular-img/ring.png", name: "Rings" },
    { imgSrc: "/assets/images/popular-img/necklaces.png", name: "Necklaces" },
    { imgSrc: "/assets/images/popular-img/hair-clip.png", name: "Hair Clips" },
    { imgSrc: "/assets/images/popular-img/earing.png", name: "Earings" },
  ];

  const products: PlusSizeItem[] = [
    {
      imgSrc: "/assets/images/plus-size/plus-size1.png",
      name: "Be day go crime T-shirt 1",
      price: "$29.99",
    },
    {
      imgSrc: "/assets/images/plus-size/plus-size2.png",
      name: "Be day go crime T-shirt 2",
      price: "$34.99",
    },
    {
      imgSrc: "/assets/images/plus-size/plus-size3.png",
      name: "Be day go crime T-shirt 3",
      price: "$39.99",
    },
    {
      imgSrc: "/assets/images/plus-size/plus-size4.png",
      name: "Be day go crime T-shirt 4",
      price: "$44.99",
    },
  ];

  return (
    <div>
      <Slider />
      <div className="text-center text-[12px] h-8 bg-custom-rose py-2">
        NOW SHIPPING ALL VIETNAM - 7 days free return!
      </div>
      <section className="w-full py-12">
        <div className="max-w-[1200px] min-w-[928px] w-[60%] flex flex-col gap-10 m-auto">
          <h2 className="text-center text-[40px] font-bold ">POPULAR ITEMS</h2>
          <div className="flex flex-col gap-16">
            {Array.from({ length: Math.ceil(popularItems.length / 5) }).map(
              (_, rowIndex) => (
                <div key={rowIndex} className="flex justify-between">
                  {popularItems
                    .slice(rowIndex * 5, (rowIndex + 1) * 5)
                    .map((item, index) => (
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
                        <span className="text-[16px] font-bold transition-all duration-500 group-hover:tracking-wider">
                          {item.name}
                        </span>
                      </div>
                    ))}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="w-full bg-custom-pink text-custom-purple">
        <div className="max-w-[1200px] min-w-[928px] w-[60%] flex justify-between items-center gap-10 m-auto min-h-[180px]">
          <div className="flex flex-col gap-2 justify-center items-center">
            <FontAwesomeIcon size="lg" icon={faStar} className="mb-1" />
            <h6 className="font-medium text-[16px]">Hanoi - Based</h6>
            <p className="text-[12px]">
              Our store is located in Hanoi, Vietnam
            </p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <FontAwesomeIcon size="lg" icon={faCircleCheck} className="mb-1" />
            <h6 className="font-medium text-[16px]">Hassle-Free Returns</h6>
            <p className="text-[12px]">within 7 days</p>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center">
            <FontAwesomeIcon size="lg" icon={faHeart} className="mb-1" />
            <h6 className="font-medium text-[16px]">Independent Designers</h6>
            <p className="text-[12px]">
              Supporting creators all over the world
            </p>
          </div>
        </div>
      </section>

      <section className="w-full py-12">
        <h2 className="text-center text-[40px] font-bold">OUR BRANDS</h2>
        <InfiniteCarousel />
      </section>

      <section className="min-h-[536px] w-full text-custom-purple bg-custom-pink py-10 flex justify-center">
        <div className="max-w-[1200px] min-w-[928px] w-[60%] flex justify-between items-center gap-10">
          <div className="w-[50%] h-[460px] rounded-[16px] overflow-hidden relative">
            <Image
              src="/assets/images/retail-store.png"
              alt="Retail Store"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6 px-4">
            <p className="text-[20px]">OUR RETAIL STORE</p>
            <h2 className="text-[32px] font-bold">Location & Hours</h2>
            <div className="mt-4 text-[12px]">
              <p className="leading-relaxed">Thursday - Sunday: 11 am - 7 pm</p>
              <p className="leading-relaxed">Monday & Tuesday: closed</p>
              <p className="leading-relaxed">Wednesday: by appointment only</p>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-[536px] w-full  py-12 flex justify-center">
        <div className="max-w-[1200px] min-w-[928px] w-[60%] flex justify-between items-center gap-10">
          <div className="w-[40%]">
            <h2 className="text-[32px] text-custom-purple font-bold mb-6">
              Plus Size? We got you!
            </h2>
            <p className="mb-6 text-[12px]">
              Look cute at any size with dresses, skirts, blouses, legwear and
              more.
            </p>
            <p className="leading-relaxed mt-4 mb-6 italic text-[12px]">
              We define our plus-size garments as having a bust equal to or
              greater than 125cm (49 in) and a waist equal to or greater than
              100cm (39 in). Some of our items can go up to 178cm (70 in)!
            </p>
            <CtaButton
              text="BROWSE ALL PLUS PRICE"
              onClick={() => console.log("click")}
            />
          </div>
          <div className="w-[50%]">
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {products.map((product, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="w-full h-[260px] relative rounded-[10px] overflow-hidden">
                    <Image
                      src={product.imgSrc}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-2 flex justify-between w-full text-[12px]">
                    <h3 className="font-medium group-hover:text-gray-700">
                      {product.name}
                    </h3>
                    <p className="font-light">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-[476px] w-full bg-custom-pink py-10 flex justify-center">
        <div className="max-w-[1200px] min-w-[928px] w-[60%] flex justify-between items-center gap-10">
          <div className="w-[42%] h-[379px] relative">
            <div className="w-[328px] h-[379px] relative rounded-[10px] overflow-hidden">
              <Image
                src="/assets/images/high-laced.png"
                alt="Retail Store"
                fill
                className="object-cover"
              />
            </div>
            <Image
              src="/assets/images/high-laced.png"
              alt="Retail Store"
              width={238}
              height={230}
              className="rounded-[10px] h-auto absolute right-0 top-1/2 transform -translate-y-1/2"
            />
            <svg
              className="w-64 h-64 animate-spin-slow absolute -top-28 -left-32"
              viewBox="0 0 250 250"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 125, 125
         m -60, 0
         a 60,60 0 1,1 130,0
         a 60,60 0 1,1 -130,0"
                />
              </defs>
              <text
                className="fill-custom-rose font-bold text-2xl tracking-widest"
                stroke="white"
                strokeWidth="2"
                paintOrder="stroke fill"
              >
                <textPath href="#circlePath" startOffset="15%">
                  ~INSTANT SHIPPING~
                </textPath>
              </text>
            </svg>
          </div>
          <div className="w-1/2">
            <div className="mb-6">
              <p className="text-[20px] text-custom-purple">INSTANT SHIPPING</p>
              <p className="font-semibold text-custom-purple text-[32px] underline underline-offset-8 decoration-1">
                High Laced Collar Blouse
              </p>
              <p className="font-semibold text-[32px] text-[rgba(51,16,72,0.5)]">
                Ruffled Heart Pumpkin Pants All Instant Shipping Items
              </p>
            </div>
            <div className="mb-6 text-[12px]">
              <p className="leading-relaxed text-custom-purple font-medium">
                Instant Shipping! High Laced Collar Long Sleeve Blouse 1.132.000
                VND
              </p>
              <p className="leading-relaxed">
                Aristocratic AirAdd the High Laced Collar Long Sleeve Blouse
                from Xilia for Victorian splendor. The blouse features a high
                lace collar that is enclosed with with pintucks and ru...
              </p>
            </div>
            <CtaButton
              text="CHECK IT OUT"
              onClick={() => console.log("clicked")}
            />
          </div>
        </div>
      </section>

      <section className="w-full py-10">
        <div className="max-w-[1200px] min-w-[928px] w-[60%] m-auto grid gap-4 p-6">
          <div className="grid grid-cols-[2fr_1fr] gap-4 h-[226px]">
            {cards.slice(0, 2).map((card, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-75"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
                  <h2 className="text-[32px] font-bold">{card.title}</h2>
                  <p className="text-[12px] mt-1">{card.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[1fr_2fr] gap-4 h-[226px]">
            {cards.slice(2, 4).map((card, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-75"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-4">
                  <h2 className="text-[32px] font-bold">{card.title}</h2>
                  <p className="text-[12px] mt-1">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

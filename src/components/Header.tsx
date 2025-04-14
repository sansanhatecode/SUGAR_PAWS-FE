"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";

type NestedNavBarItem = {
  imageSrc?: string;
  titleItem?: { name: string; link: string };
  itemlist?: {
    name: string;
    link: string;
  }[];
};

type NavBarItem = {
  name: string;
  link: string;
  nestedItems?: NestedNavBarItem[];
};

const navbarItems: NavBarItem[] = [
  {
    name: "ABOUT",
    link: "/about",
    nestedItems: [
      {
        itemlist: [
          { name: "about us", link: "/about" },
          { name: "retail localtion", link: "/retail-location" },
          { name: "faq's", link: "/faqs" },
          { name: "event calendar", link: "/event-calendar" },
          { name: "event booking", link: "/event-booking" },
        ],
      },
    ],
  },
  {
    name: "ACCESSORIES",
    link: "/accessories",
    nestedItems: [
      {
        imageSrc: "/assets/images/accessories/access-1.png",
        titleItem: {
          name: "accessories",
          link: "/accessories",
        },
        itemlist: [
          { name: "GLOVES", link: "/accessories/gloves" },
          { name: "harnesses and belts", link: "/accessories/harnesses-belts" },
          { name: "LASHES", link: "/accessories/lashes" },
          { name: "NECKWEAR", link: "/accessories/neckwears" },
          { name: "PARASOLS", link: "/accessories/parasols" },
          { name: "WRIRSTCUFFS", link: "/accessories/wrirstcuffs" },
          { name: "⭐ ALL ACCESSORIES ⭐", link: "/accessories" },
        ],
      },
      {
        titleItem: {
          name: "bags",
          link: "/accessories/bags",
        },
        imageSrc: "/assets/images/accessories/access-2.png",
        itemlist: [
          { name: "purses", link: "/accessories/" },
          { name: "make up bags", link: "/accessories/make-up-bags" },
          { name: "totes", link: "/accessories/totes" },
          { name: "wallets", link: "/accessories/wallets" },
          { name: "⭐ ALL BAGS ⭐", link: "/accessories/bags" },
        ],
      },
      {
        titleItem: {
          name: "PINS AND PATCHES",
          link: "/accessories/pins-patches",
        },
        imageSrc: "/assets/images/accessories/access-3.png",
        itemlist: [
          { name: "brooches", link: "/accessories/brooches" },
          { name: "buttons", link: "/accesories/buttons" },
          { name: "enamel pins", link: "/accessories/enamel-pins" },
          { name: "patches", link: "/accessories/patches" },
          {
            name: "⭐ ALL PINS & PATHCHES ⭐",
            link: "/accessories/pins-patches",
          },
        ],
      },
      {
        imageSrc: "/assets/images/accessories/access-4.png",
        titleItem: {
          name: "SHOES",
          link: "/accessories/shoes",
        },
        itemlist: [
          { name: "flats", link: "/accessories/flats" },
          { name: "heels", link: "/accessories/heels" },
          { name: "platforms", link: "/accessories/platforms" },
          { name: "⭐ ALL SHOES ⭐", link: "/accessories/shoes" },
        ],
      },
    ],
  },
  {
    name: "HAIR",
    link: "/hair",
    nestedItems: [
      {
        imageSrc: "/assets/images/hair/hair-1.png",
        titleItem: {
          name: "hair accessories",
          link: "/hair",
        },
        itemlist: [
          { name: "bows", link: "/hair/bows" },
          { name: "hair claws", link: "/hair/claws" },
          { name: "hair cups", link: "/hair/cups" },
          { name: "scrunchies", link: "/hair/scrunchies" },
          { name: "star clips", link: "/hair/star-clips" },
          { name: "⭐ ALL hair ACCESSORIES ⭐", link: "/hair" },
        ],
      },
      {
        titleItem: {
          name: "hats",
          link: "/hair/hats",
        },
        imageSrc: "/assets/images/hair/hair-2.png",
        itemlist: [
          { name: "berets", link: "/hair/berets" },
          { name: "bonnets", link: "/hair/bonnets" },
          { name: "crowns", link: "/hair/crowns" },
          { name: "⭐ ALL hats ⭐", link: "/hair/hats" },
        ],
      },
      {
        titleItem: {
          name: "headbands & hairbows",
          link: "/hair/headbands-hairbows",
        },
        imageSrc: "/assets/images/hair/hair-3.png",
        itemlist: [
          { name: "halos", link: "/hair/halos" },
          { name: "headbands", link: "/accesories/headbands" },
          { name: "hairbows", link: "/hair/hairbows" },
          { name: "headdresses", link: "/hair/headdresses" },
          {
            name: "⭐ ALL headbands & hairbows ⭐",
            link: "/hair/headbands-hairbows",
          },
        ],
      },
    ],
  },
  {
    name: "CLOTHING",
    link: "/clothing",
    nestedItems: [
      {
        imageSrc: "/assets/images/clothing/clothing-1.png",
        titleItem: {
          name: "TOPS",
          link: "/clothing/tops",
        },
        itemlist: [
          { name: "blouses", link: "/clothing/blouses" },
          { name: "button up shirts", link: "/clothing/button-up" },
          { name: "cardigans", link: "/clothing/cardigans" },
          { name: "cutsews", link: "/clothing/cutsews" },
          { name: "outerwears", link: "/clothing/outerwears" },
          { name: "t-shirts", link: "/clothing/tshirts" },
          { name: "⭐ ALL tops ⭐", link: "/clothing/tops" },
        ],
      },
      {
        titleItem: {
          name: "dresses",
          link: "/clothing/dresses",
        },
        imageSrc: "/assets/images/clothing/clothing-2.png",
        itemlist: [
          { name: "aprons", link: "/clothing/aprons" },
          { name: "jumperskirts", link: "/clothing/jumperskirts" },
          { name: "onepieces", link: "/clothing/onepieces" },
          { name: "⭐ ALL dresses ⭐", link: "/clothing/dresses" },
        ],
      },
      {
        titleItem: {
          name: "bottoms",
          link: "/clothing/pins-patches",
        },
        imageSrc: "/assets/images/clothing/clothing-3.png",
        itemlist: [
          { name: "bottoms", link: "/clothing/bottoms" },
          { name: "skirts", link: "/accesories/skirts" },
          { name: "petticoats", link: "/clothing/petticoats" },
          { name: "bloomers", link: "/clothing/bloomers" },
          { name: "shorts & pants", link: "/clothing/shorts-pants" },
          { name: "sweetpants", link: "/clothing/sweetpants" },
          {
            name: "⭐ ALL dresses ⭐",
            link: "/clothing/dresses",
          },
        ],
      },
      {
        imageSrc: "/assets/images/clothing/clothing-4.png",
        titleItem: {
          name: "legwears",
          link: "/clothing/legwears",
        },
        itemlist: [
          { name: "leggings", link: "/clothing/leggings" },
          { name: "socks", link: "/clothing/socks" },
          { name: "tights", link: "/clothing/tights" },
          { name: "⭐ ALL legwears ⭐", link: "/clothing/legwears" },
        ],
      },
      {
        imageSrc: "/assets/images/clothing/clothing-5.png",
        titleItem: {
          name: "swimwear",
          link: "/clothing/swimwear",
        },
      },
    ],
  },
  {
    name: "JEWELRY",
    link: "/jewelry",
    nestedItems: [
      {
        imageSrc: "/assets/images/jewelry/jewelry-1.png",
        titleItem: {
          name: "bracelets",
          link: "/jewelry/bracelets",
        },
        itemlist: [
          { name: "bracelets", link: "/jewelry/bracelets" },
          { name: "wrirstcuffs", link: "/jewelry/wrirstcuffs" },
          { name: "⭐ ALL bracelets ⭐", link: "/jewelry/bracelets" },
        ],
      },
      {
        titleItem: {
          name: "earings",
          link: "/jewelry/earings",
        },
        imageSrc: "/assets/images/jewelry/jewelry-2.png",
        itemlist: [
          { name: "hanging earings", link: "/jewelry/hanging-earings" },
          { name: "stud earings", link: "/jewelry/stud-earings" },
          { name: "cup on earings", link: "/jewelry/cup-on-earings" },
          { name: "⭐ ALL earings ⭐", link: "/jewelry/earings" },
        ],
      },
      {
        titleItem: {
          name: "flairs",
          link: "/jewelry/flairs",
        },
        imageSrc: "/assets/images/jewelry/jewelry-3.png",
        itemlist: [
          { name: "brooches", link: "/jewelry/brooches" },
          { name: "buttons", link: "/accesories/buttons" },
          { name: "enamel pins", link: "/jewelry/enamel-pins" },
          { name: "rosettes", link: "/jewelry/rosettes" },
          {
            name: "⭐ ALL flairs ⭐",
            link: "/jewelry/flairs",
          },
        ],
      },
      {
        imageSrc: "/assets/images/jewelry/jewelry-4.png",
        titleItem: {
          name: "necklaces",
          link: "/jewelry/necklaces",
        },
        itemlist: [
          { name: "chockers and collars", link: "/jewelry/chockers-collars" },
          { name: "long necklaces", link: "/jewelry/long-necklaces" },
          { name: "⭐ ALL necklaces ⭐", link: "/jewelry/necklaces" },
        ],
      },
      {
        imageSrc: "/assets/images/jewelry/jewelry-5.png",
        titleItem: {
          name: "rings",
          link: "/jewelry/rings",
        },
      },
    ],
  },
  {
    name: "PLUS SIZE",
    link: "/plus-size",
    nestedItems: [
      {
        itemlist: [
          { name: "plus size dresses", link: "/plus-size/dresses" },
          { name: "plus size skirts", link: "/plus-size/skirts" },
          { name: "plus size blouses", link: "/plus-size/blouses" },
          {
            name: "plus size petticoat & bloomers",
            link: "/plus-size/petticoat-bloomer",
          },
          { name: "⭐ all plus size clothing ⭐", link: "/plus-size" },
        ],
      },
    ],
  },
  // { name: "BRAND", link: "/brand" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md hover:bg-custom-yellow ${
        isScrolled
          ? "backdrop-blur-md h-[52px] bg-white/30"
          : "bg-custom-yellow h-[72px]"
      }`}
    >
      <nav className="flex justify-between items-center h-full px-5">
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-custom-rose"
        >
          <span
            className={`font-jua ${isScrolled ? "text-[32px]" : "text-[40px]"} z-20 font-medium text-transparent bg-gradient-to-b 
                      from-custom-rose to-pink-500 bg-clip-text hover:text-custom-rose`}
          >
            Sugar Paws
          </span>
          <Image
            src="/assets/favicon/sugar-paws-logo.png"
            alt="Sugar Paws logo"
            height={isScrolled ? 40 : 50}
            width={isScrolled ? 32 : 40}
            className="w-auto z-20"
          />
        </Link>
        <ul className="flex h-full">
          {navbarItems.map((item) => {
            const isActive =
              pathname === item.link || pathname.startsWith(`${item.link}/`);
            return (
              <li key={item.name} className="h-full px-4 relative group">
                <Link
                  href={item.link}
                  className={`z-20 relative flex items-center h-full text-[13px] tracking-wider after:content-[''] after:absolute after:w-full 
                              after:h-[1px] after:bg-black after:left-0 after:bottom-4 after:transition-transform after:duration-300 ${
                                isActive
                                  ? "after:scale-x-100"
                                  : "after:scale-x-0"
                              } group-hover:after:scale-x-100`}
                >
                  {item.name}
                </Link>
                {item.nestedItems?.length && item.nestedItems.length > 1 && (
                  <div
                    className={`fixed ${isScrolled ? "top-[52px]" : "top-[72px]"} w-[100vw] gap-10 items-stretch left-0 bg-custom-yellow shadow-xl 
                                group-hover:flex overflow-hidden text-[12px] ${item.nestedItems.length === 3 ? "px-[20%]" : "px-[10%]"} h-0 group-hover:h-auto 
                                transform -translate-y-5 group-hover:translate-y-0 transition-transform duration-500 ease-in-out group-hover:py-5
                                opacity-0 group-hover:opacity-100 scale-y-95 group-hover:scale-y-100 origin-top z-10 rounded-b-md `}
                  >
                    {item.nestedItems.map((subItem) => (
                      <div
                        key={subItem.imageSrc}
                        className="flex flex-1 flex-col items-start"
                      >
                        {/* {subItem.imageSrc && (

                        )} */}
                        {subItem.titleItem && subItem.imageSrc && (
                          <Link
                            href={subItem.titleItem.link}
                            className="hover:text-custom-rose text-[16px] w-full hover:font-semibold uppercase py-2 whitespace-nowrap"
                          >
                            <div
                              className={`relative rounded-[10px] h-[140px] w-full overflow-hidden mb-3 z-10`}
                            >
                              <Image
                                src={subItem.imageSrc}
                                alt="access logo"
                                fill
                                className="object-cover hover:scale-125 transition-all duration-500 z-10"
                              />
                            </div>
                            {subItem.titleItem.name}
                          </Link>
                        )}
                        {subItem.itemlist &&
                          subItem.itemlist.map((item, index) => (
                            <Link
                              href={item.link}
                              key={index}
                              className="hover:text-custom-rose w-full hover:font-semibold uppercase py-2 whitespace-nowrap"
                            >
                              {item.name}
                            </Link>
                          ))}
                      </div>
                    ))}
                  </div>
                )}

                {item.nestedItems?.length === 1 && (
                  <div
                    className="absolute top-full left-0 bg-custom-yellow rounded-b-md shadow-xl group-hover:flex group-hover:flex-col 
                                overflow-hidden text-[12px] w-auto h-0 group-hover:h-auto group-hover:scale-y-100 origin-top
                                transform -translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-in-out 
                                opacity-0 group-hover:opacity-100 scale-y-95"
                  >
                    {item.nestedItems[0].itemlist &&
                      item.nestedItems[0].itemlist.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.link}
                          className="hover:text-custom-rose hover:font-semibold hover:bg-custom-pink uppercase py-2 px-5 whitespace-nowrap"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex space-x-[40px]">
          <FontAwesomeIcon icon={faSearch} className="text-[14px]" />
          <FontAwesomeIcon
            icon={faUser}
            className="text-[14px] hover:text-custom-rose"
            onClick={() => router.push("/signin")}
          />
          <FontAwesomeIcon icon={faShoppingCart} className="text-[14px]" />
        </div>
      </nav>
    </header>
  );
};

export default Header;

/* eslint-disable prettier/prettier */
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
import Cart from "./cart/Cart";
import { CartItem } from "@/types/cart";
import { navbarItems } from "@/const/navbarItems";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  // Sample cart data - replace with your actual cart data
  const cartItems: CartItem[] = [
    {
      id: "1",
      product: {
        name: "Pink T-shirt",
        productId: "prod1",
        id: "prod1",
        price: 250000,
        image: {
          id: "img1",
          url: "/assets/images/clothing/clothing-1.png",
        },
        color: "Pink",
        size: "One Size",
        rating: 0,
        reviewsCount: 0,
        moreDetails: [],
      },
      quantity: 1,
    },
    {
      id: "2",
      product: {
        name: "Pink T-shirt",
        productId: "prod2",
        id: "prod2",
        price: 1200000,
        image: {
          id: "img1",
          url: "/assets/images/clothing/clothing-1.png",
        },
        color: "White",
        size: "M",
        rating: 0,
        reviewsCount: 0,
        moreDetails: [],
      },
      quantity: 2,
    },
    {
      id: "3",
      product: {
        name: "Pink T-shirt",
        productId: "prod2",
        id: "prod2",
        price: 1200000,
        image: {
          id: "img1",
          url: "/assets/images/clothing/clothing-1.png",
        },
        color: "White",
        size: "M",
        rating: 0,
        reviewsCount: 0,
        moreDetails: [],
      },
      quantity: 2,
    },
    {
      id: "4",
      product: {
        name: "Pink T-shirt",
        productId: "prod2",
        id: "prod2",
        price: 1200000,
        image: {
          id: "img1",
          url: "/assets/images/clothing/clothing-1.png",
        },
        color: "White",
        size: "M",
        rating: 0,
        reviewsCount: 0,
        moreDetails: [],
      },
      quantity: 2,
    },
    {
      id: "5",
      product: {
        name: "Pink T-shirt",
        productId: "prod2",
        id: "prod2",
        price: 1200000,
        image: {
          id: "img1",
          url: "/assets/images/clothing/clothing-1.png",
        },
        color: "White",
        size: "M",
        rating: 0,
        reviewsCount: 0,
        moreDetails: [],
      },
      quantity: 2,
    },
    {
      id: "6",
      product: {
        name: "Pink T-shirt",
        productId: "prod2",
        id: "prod2",
        price: 1200000,
        image: {
          id: "img1",
          url: "/assets/images/clothing/clothing-1.png",
        },
        color: "White",
        size: "M",
        rating: 0,
        reviewsCount: 0,
        moreDetails: [],
      },
      quantity: 2,
    },
    {
      id: "7",
      product: {
        name: "Pink T-shirt",
        productId: "prod2",
        id: "prod2",
        price: 1200000,
        image: {
          id: "img1",
          url: "/assets/images/clothing/clothing-1.png",
        },
        color: "White",
        size: "M",
        rating: 0,
        reviewsCount: 0,
        moreDetails: [],
      },
      quantity: 2,
    },
  ];

  const handleUpdateItem = (id: string, quantity: number) => {
    console.log(`Update item ${id} to quantity ${quantity}`);
    // Implement actual update logic
  };

  const handleRemoveItem = (id: string) => {
    console.log(`Remove item ${id}`);
    // Implement actual remove logic
  };

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

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isCartOpen &&
        !target.closest(".cart-container") &&
        !target.closest(".cart-icon")
      ) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 shadow-md hover:bg-custom-yellow ${
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
              className={`font-jua ${
                isScrolled ? "text-[32px]" : "text-[40px]"
              } z-20 font-medium text-transparent bg-gradient-to-b 
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
                      className={`fixed ${
                        isScrolled ? "top-[52px]" : "top-[72px]"
                      } w-[100vw] gap-10 items-stretch left-0 bg-custom-yellow shadow-xl z-50 
                                group-hover:flex overflow-hidden text-[12px] ${
                                  item.nestedItems.length === 3
                                    ? "px-[20%]"
                                    : "px-[10%]"
                                } h-0 group-hover:h-auto 
                                transform -translate-y-5 group-hover:translate-y-0 transition-transform duration-500 ease-in-out group-hover:py-5
                                opacity-0 group-hover:opacity-100 scale-y-95 group-hover:scale-y-100 origin-top z-10 rounded-b-md `}
                    >
                      {item.nestedItems.map((subItem) => (
                        <div
                          key={subItem.imageSrc}
                          className="flex flex-1 flex-col items-start"
                        >
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
              className="text-[14px] hover:text-custom-rose cursor-pointer"
              onClick={() => router.push("/signin")}
            />
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={`text-[14px] ${pathname==='/cart' ? "text-custom-rose" : ""} hover:text-custom-rose cursor-pointer cart-icon`}
              onClick={() => setIsCartOpen(!isCartOpen)}
            />
          </div>
        </nav>
      </header>

      {/* Cart Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`cart-container fixed top-0 right-0 h-screen w-[400px] max-w-full transform transition-transform duration-300 ease-in-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          } overflow-auto z-[101]`}
        >
          <Cart
            cartItems={cartItems}
            onUpdateItem={handleUpdateItem}
            onRemoveItem={handleRemoveItem}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default Header;

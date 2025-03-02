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
import { usePathname } from "next/navigation";

type NavBarItem = {
  name: string;
  link: string;
};

const navbarItems: NavBarItem[] = [
  { name: "ABOUT", link: "/about" },
  { name: "ACCESSORIES", link: "/accessories" },
  { name: "CLOTHING", link: "/clothing" },
  { name: "JEWELRY", link: "/jewelry" },
  { name: "PLUS SIZE", link: "/plus-size" },
  { name: "MORE", link: "/more" },
  { name: "BRAND", link: "/brand" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

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
            className={`font-jua ${isScrolled ? "text-[32px]" : "text-[40px]"} font-medium text-transparent bg-gradient-to-b from-custom-rose to-pink-500 bg-clip-text`}
          >
            Sugar Paws
          </span>
          <Image
            src="/assets/favicon/sugar-paws-logo.png"
            alt="Sugar Paws logo"
            height={isScrolled ? 40 : 50}
            width={isScrolled ? 32 : 40}
            className="w-auto"
          />
        </Link>
        <ul className="flex space-x-[30px] h-full">
          {navbarItems.map((item) => {
            const isActive =
              pathname === item.link || pathname.startsWith(`${item.link}/`);
            return (
              <li key={item.name} className="h-full">
                <Link
                  href={item.link}
                  className={`relative flex items-center h-full text-[13px] tracking-wider after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-black after:left-0 after:bottom-4 after:transition-transform after:duration-300 ${
                    isActive ? "after:scale-x-100" : "after:scale-x-0"
                  } hover:after:scale-x-100`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex space-x-[40px]">
          <FontAwesomeIcon icon={faSearch} className="text-[14px]" />
          <FontAwesomeIcon icon={faUser} className="text-[14px]" />
          <FontAwesomeIcon icon={faShoppingCart} className="text-[14px]" />
        </div>
      </nav>
    </header>
  );
};

export default Header;

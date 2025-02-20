import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

type NavBarItem = {
  name: string;
  link: string;
  image?: string;
  children?: NavBarItem[];
};

const Header = () => {
  const navbarItems: NavBarItem[] = [
    { name: "ABOUT", link: "/about" },
    { name: "ACCESSORIES", link: "/accessories" },
    { name: "CLOTHING", link: "/clothing" },
    { name: "JEWELRY", link: "/jewelry" },
    { name: "PLUS SIZE", link: "/plus-size" },
    { name: "MORE", link: "/more" },
    { name: "BRAND", link: "/brand" },
  ];

  return (
    <header className="h-[72px] px-5">
      <nav className="flex justify-between items-center h-full">
        <div className="flex items-center gap-2">
          <span className="font-jua text-[40px] font-medium text-transparent bg-gradient-to-b from-custom-rose to-pink-500 bg-clip-text relative">
            Sugar Paws
          </span>
          <Image
            src={"/assets/favicon/sugar-paws-logo.png"}
            alt="Sugar Paws logo"
            height={50}
            width={40}
          />
        </div>
        <ul className="flex space-x-[30px]">
          {navbarItems.map((item) => (
            <li
              key={item.name}
            >
              <Link
                href={item.link}
                className="relative text-[12px] font-medium after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-16px] after:h-[1px] after:bg-black after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.name}
              </Link>
            </li>
          ))}
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

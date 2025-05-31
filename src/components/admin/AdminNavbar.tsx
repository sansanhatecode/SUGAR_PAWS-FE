"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaShoppingBag,
  FaUsers,
  FaClipboardList,
  FaChartBar,
  FaFileAlt,
  FaUser,
} from "react-icons/fa";

export default function AdminNavbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(path);
  };

  const getLinkClassName = (path: string) => {
    const baseClasses =
      "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105";
    const activeClasses = "bg-custom-rose text-white";
    const inactiveClasses =
      "bg-white/80 hover:bg-custom-rose hover:text-white text-custom-purple";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300 shadow-xl bg-gradient-to-r from-custom-yellow to-custom-pink h-[80px] flex items-center justify-between px-8 border-b-2 border-custom-rose/20">
        <Link
          href="/admin"
          className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          <span className="font-jua text-[36px] font-bold text-transparent bg-gradient-to-r from-custom-rose to-custom-wine bg-clip-text tracking-wide">
            SUGAR PAWS
          </span>
          <Image
            src="/assets/favicon/sugar-paws-logo.png"
            alt="Sugar Paws logo"
            height={50}
            width={40}
            className="w-auto drop-shadow-md"
          />
          <div className="bg-custom-wine text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            Admin
          </div>
        </Link>
        <nav className="flex gap-6 text-base font-semibold h-full items-center">
          <Link href="/admin" className={getLinkClassName("/admin")}>
            <FaHome className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className={getLinkClassName("/admin/products")}
          >
            <FaShoppingBag className="w-5 h-5" />
            Products
          </Link>
          <Link
            href="/admin/users"
            className={getLinkClassName("/admin/users")}
          >
            <FaUsers className="w-5 h-5" />
            Users
          </Link>
          <Link
            href="/admin/orders"
            className={getLinkClassName("/admin/orders")}
          >
            <FaClipboardList className="w-5 h-5" />
            Orders
          </Link>
          <Link
            href="/admin/revenue"
            className={getLinkClassName("/admin/revenue")}
          >
            <FaChartBar className="w-5 h-5" />
            Revenue
          </Link>
          <Link
            href="/admin/financial-report"
            className={getLinkClassName("/admin/financial-report")}
          >
            <FaFileAlt className="w-5 h-5" />
            Reports
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/admin/profile"
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 border-2 border-custom-rose/20 ${
              isActive("/admin/profile")
                ? "bg-custom-rose text-white"
                : "bg-white text-custom-rose hover:bg-custom-rose hover:text-white"
            }`}
          >
            <FaUser className="w-5 h-5" />
            <span>Profile</span>
          </Link>
        </div>
      </header>
      <div className="h-[80px] w-full"></div>
    </>
  );
}

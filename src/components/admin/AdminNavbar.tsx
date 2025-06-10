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
      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 hover:shadow-md";
    const activeClasses = "bg-custom-rose text-white shadow-md";
    const inactiveClasses =
      "bg-white/70 hover:bg-custom-rose hover:text-white text-custom-purple";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300 shadow-lg bg-gradient-to-r from-custom-yellow to-custom-pink h-[60px] flex items-center justify-between px-6 border-b border-custom-rose/20">
        <Link
          href="/admin"
          className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
        >
          <span className="font-jua text-[24px] font-bold text-transparent bg-gradient-to-r from-custom-rose to-custom-wine bg-clip-text tracking-wide">
            SUGAR PAWS
          </span>
          <Image
            src="/assets/favicon/sugar-paws-logo.png"
            alt="Sugar Paws logo"
            height={35}
            width={28}
            className="w-auto drop-shadow-md"
          />
          <div className="bg-custom-wine text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Admin
          </div>
        </Link>
        <nav className="flex gap-3 text-sm font-semibold h-full items-center">
          <Link href="/admin" className={getLinkClassName("/admin")}>
            <FaHome className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link
            href="/admin/products"
            className={getLinkClassName("/admin/products")}
          >
            <FaShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Products</span>
          </Link>
          <Link
            href="/admin/users"
            className={getLinkClassName("/admin/users")}
          >
            <FaUsers className="w-4 h-4" />
            <span className="hidden sm:inline">Users</span>
          </Link>
          <Link
            href="/admin/orders"
            className={getLinkClassName("/admin/orders")}
          >
            <FaClipboardList className="w-4 h-4" />
            <span className="hidden sm:inline">Orders</span>
          </Link>
          <Link
            href="/admin/revenue"
            className={getLinkClassName("/admin/revenue")}
          >
            <FaChartBar className="w-4 h-4" />
            <span className="hidden sm:inline">Revenue</span>
          </Link>
          <Link
            href="/admin/financial-report"
            className={getLinkClassName("/admin/financial-report")}
          >
            <FaFileAlt className="w-4 h-4" />
            <span className="hidden sm:inline">Reports</span>
          </Link>
          <Link
            href="/admin/profile"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all duration-200 border border-custom-rose/20 ${
              isActive("/admin/profile")
                ? "bg-custom-rose text-white shadow-md"
                : "bg-white/70 text-custom-rose hover:bg-custom-rose hover:text-white"
            }`}
          >
            <FaUser className="w-4 h-4" />
            <span className="hidden md:inline">Profile</span>
          </Link>
        </nav>
      </header>
      <div className="h-[60px] w-full"></div>
    </>
  );
}

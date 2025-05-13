"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaUser,
  FaBell,
  FaLock,
  FaMapMarkerAlt,
  FaCreditCard,
  FaKey,
  FaClipboardList,
  FaTicketAlt,
  // FaCoins,
} from "react-icons/fa";
import { useAppSelector } from "@/store/store";
import { selectName } from "@/store/slices/userSlice";

const sidebarItems = [
  { label: "Profile", icon: <FaUser />, href: "/user/account/profile" },
  { label: "Bank", icon: <FaCreditCard />, href: "/user/account/bank" },
  { label: "Address", icon: <FaMapMarkerAlt />, href: "/user/account/address" },
  {
    label: "Change Password",
    icon: <FaKey />,
    href: "/user/account/change-password",
  },
  {
    label: "Notification Settings",
    icon: <FaBell />,
    href: "/user/account/notification",
  },
  {
    label: "Privacy Settings",
    icon: <FaLock />,
    href: "/user/account/privacy",
  },
  { label: "Orders", icon: <FaClipboardList />, href: "/user/account/orders" },
  {
    label: "Voucher Wallet",
    icon: <FaTicketAlt />,
    href: "/user/account/voucher",
  },
  // { label: "Shopee Coins", icon: <FaCoins />, href: "/user/account/coins" },
];

const AccountSidebar = () => {
  const pathname = usePathname();
  const name = useAppSelector(selectName);
  return (
    <aside className="w-full max-w-xs md:w-64 bg-white rounded-xl shadow p-4 md:p-6 flex flex-col gap-2 mx-auto md:mx-0">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-400 mb-2">
          <FaUser />
        </div>
        <span className="font-semibold text-base md:text-lg text-center break-all w-full flex justify-center">
          {name}
        </span>
        <Link
          href="#"
          className="text-xs text-custom-wine hover:underline mt-1 text-center w-full flex justify-center"
        >
          Edit Profile
        </Link>
      </div>
      <nav className="flex flex-col gap-1 w-full">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-2 md:px-3 py-2 rounded-lg transition font-medium text-sm hover:bg-pink-50 w-full ${
              pathname === item.href
                ? "bg-pink-100 text-custom-wine"
                : "text-gray-700"
            }`}
          >
            <span className="text-lg shrink-0">{item.icon}</span>
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AccountSidebar;

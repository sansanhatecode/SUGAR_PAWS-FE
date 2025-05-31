/* eslint-disable prettier/prettier */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiShoppingBag,
  FiLogOut,
  FiUserCheck,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import Cart from "./cart/Cart";
import { navbarItems } from "@/const/navbarItems";
import {
  useGetCartItems,
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/hooks/queries/useCart";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, selectUser, setUser } from "@/store/slices/userSlice";
import { useGetMyInfo } from "@/hooks/queries/useUser";
import LoginRequiredModal from "./ui/LoginRequiredModal";
import { clearStorage } from "@/helper/storage";
import { deselectAll } from "@/store/slices/cartSlice";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const pathname = usePathname() ?? "";
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const { getMyInfo } = useGetMyInfo();

  const { getCartItems } = useGetCartItems();
  const { data: cartData } = getCartItems;
  const { mutate: updateCart } = useUpdateCartItem();
  const { mutate: removeCart } = useRemoveCartItem();

  // Fetch user info and update Redux state
  useEffect(() => {
    if (getMyInfo.data) {
      dispatch(
        setUser({
          username: getMyInfo.data.username,
          email: getMyInfo.data.email,
          name: getMyInfo.data.name,
          role: getMyInfo.data.role,
        })
      );
    }
  }, [dispatch, getMyInfo.data]);

  const handleUpdateItem = (id: number, quantity: number) => {
    updateCart({ cartItemId: id, quantity: Math.max(1, quantity) });
  };

  const handleRemoveItem = (id: number) => {
    removeCart(id);
  };

  const handleCartIconClick = () => {
    if (!userInfo || !userInfo.username) {
      setIsLoginModalOpen(true);
    } else {
      setIsCartOpen(!isCartOpen);
    }
  };

  const handleSignOut = () => {
    clearStorage();
    dispatch(removeUser());
    // Clear cart data when signing out
    dispatch(deselectAll());
    router.push("/signin");
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
          <div className="flex h-full items-center">
            <div className="flex items-center mr-5">
              <FiSearch
                size={20}
                className="hover:text-custom-rose cursor-pointer"
              />
            </div>
            <div className="relative group h-full px-5 group">
              <div className="flex h-full items-center cursor-pointer group-hover:text-custom-rose">
                <FiUser
                  size={20}
                  className={`${pathname.includes("/user") ? "text-custom-rose" : ""}`}
                />
                {userInfo && userInfo.username && (
                  <span
                    className={`ml-2 text-[14px] ${pathname.includes("/user") ? "text-custom-rose" : ""}`}
                  >
                    {userInfo.name}
                  </span>
                )}
              </div>
              <div
                className="absolute top-full right-0 bg-custom-yellow rounded-b-md shadow-xl group-hover:flex group-hover:flex-col 
                overflow-hidden text-[12px] w-[180px] h-0 group-hover:h-auto group-hover:scale-y-100 origin-top
                transform -translate-y-3 group-hover:translate-y-0 transition-all duration-500 ease-in-out 
                opacity-0 group-hover:opacity-100 scale-y-95 z-50"
              >
                {userInfo && userInfo.username ? (
                  // Logged in dropdown options
                  <>
                    <Link
                      href="/user/account/profile"
                      className="hover:text-custom-rose hover:font-semibold hover:bg-custom-pink py-3 px-5 whitespace-nowrap text-[14px] flex items-center"
                    >
                      <FiUserCheck className="mr-3 text-[18px]" />
                      My Account
                    </Link>
                    <Link
                      href="/user/orders"
                      className="hover:text-custom-rose hover:font-semibold hover:bg-custom-pink py-3 px-5 whitespace-nowrap text-[14px] flex items-center"
                    >
                      <FiShoppingBag className="mr-3 text-[18px]" />
                      Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-left hover:text-custom-rose hover:font-semibold hover:bg-custom-pink py-3 px-5 whitespace-nowrap text-[14px] flex items-center w-full"
                    >
                      <FiLogOut className="mr-3 text-[18px]" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  // Logged out dropdown options
                  <>
                    <Link
                      href="/signin"
                      className="hover:text-custom-rose hover:font-semibold hover:bg-custom-pink py-3 px-5 whitespace-nowrap text-[14px] flex items-center"
                    >
                      <FiLogIn className="mr-3 text-[18px]" />
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="hover:text-custom-rose hover:font-semibold hover:bg-custom-pink py-3 px-5 whitespace-nowrap text-[14px] flex items-center"
                    >
                      <FiUserPlus className="mr-3 text-[18px]" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center ml-5 cart-icon relative">
              <FiShoppingCart
                size={20}
                className={`${pathname === "/cart" ? "text-custom-rose" : ""} hover:text-custom-rose cursor-pointer`}
                onClick={handleCartIconClick}
              />
              {cartData?.cartItems && cartData.cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-custom-rose text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartData.cartItems.length}
                </span>
              )}
            </div>
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
            cartItems={cartData?.cartItems ?? []}
            onUpdateItem={handleUpdateItem}
            onRemoveItem={handleRemoveItem}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </div>

      {/* Login Required Modal */}
      <LoginRequiredModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        message="You need to sign in to view your cart"
      />
    </>
  );
};

export default Header;

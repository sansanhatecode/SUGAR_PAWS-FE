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
import SearchDropdown from "./SearchDropdown";
import { Product } from "@/types/product";
import "@/styles/Search.css";

// Extend Window interface for searchTimeout
declare global {
  interface Window {
    searchTimeout: NodeJS.Timeout;
  }
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const pathname = usePathname() ?? "";
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const { getMyInfo } = useGetMyInfo();

  const { getCartItems } = useGetCartItems();
  const { data: cartData } = getCartItems;
  const { mutate: updateCart } = useUpdateCartItem();
  const { mutate: removeCart } = useRemoveCartItem();

  // Sample product data for search
  const sampleProducts: Product[] = [
    {
      id: "1",
      name: "Premium Dog Food - Chicken & Rice",
      minPrice: 25.99,
      maxPrice: 45.99,
      displayImage: ["/assets/images/products/dog-food-1.jpg"],
      vendor: "PetNutrition",
      colors: ["brown"],
      totalStock: 150,
      discount: 15,
      rating: 4.8,
      description: "High-quality premium dog food with real chicken and rice",
    },
    {
      id: "2",
      name: "Cat Scratching Post Tower",
      minPrice: 89.99,
      maxPrice: 89.99,
      displayImage: ["/assets/images/products/cat-tower-1.jpg"],
      vendor: "FelineHome",
      colors: ["gray", "beige"],
      totalStock: 45,
      rating: 4.6,
      description:
        "Multi-level cat tower with scratching posts and cozy hideouts",
    },
    {
      id: "3",
      name: "Interactive Dog Toy Ball",
      minPrice: 12.99,
      maxPrice: 18.99,
      displayImage: ["/assets/images/products/dog-toy-1.jpg"],
      vendor: "PlayfulPaws",
      colors: ["red", "blue", "green"],
      totalStock: 200,
      discount: 10,
      rating: 4.5,
      description:
        "Durable interactive ball that keeps dogs entertained for hours",
    },
    {
      id: "4",
      name: "Orthopedic Pet Bed - Large",
      minPrice: 75.99,
      maxPrice: 125.99,
      displayImage: ["/assets/images/products/pet-bed-1.jpg"],
      vendor: "ComfortPet",
      colors: ["brown", "gray", "navy"],
      totalStock: 80,
      rating: 4.9,
      description:
        "Memory foam orthopedic bed for senior pets and large breeds",
    },
    {
      id: "5",
      name: "Automatic Pet Water Fountain",
      minPrice: 35.99,
      maxPrice: 55.99,
      displayImage: ["/assets/images/products/water-fountain-1.jpg"],
      vendor: "HydratePet",
      colors: ["white", "gray"],
      totalStock: 120,
      discount: 20,
      rating: 4.7,
      description: "Circulating water fountain with filtration system",
    },
  ];

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

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus on input when opening search
      setTimeout(() => {
        const searchInput = document.getElementById("search-input");
        if (searchInput) {
          searchInput.focus();
        }
      }, 300);
    } else {
      // Clear search when closing
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      if (query.trim().length > 0) {
        // Filter sample products based on search query
        const filtered = sampleProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.vendor?.toLowerCase().includes(query.toLowerCase()) ||
            product.description?.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 5)); // Show max 5 results
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
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

      // Handle search outside click
      if (
        isSearchOpen &&
        !target.closest(".search-container") &&
        !target.closest(".search-icon")
      ) {
        handleSearchClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCartOpen, isSearchOpen]);

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

  // Handle keyboard events for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        handleSearchClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

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
                                  sizes="(max-width: 768px) 100vw, 200px"
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
            <div className="flex items-center mr-5 relative search-container">
              <div
                className={`flex items-center search-input-container transition-all duration-300 ease-in-out ${
                  isSearchOpen
                    ? "w-64 bg-white/95 backdrop-blur-md rounded-full border border-gray-300 shadow-lg expanded"
                    : "w-auto"
                }`}
              >
                <FiSearch
                  size={20}
                  className={`hover:text-custom-rose cursor-pointer search-icon transition-all duration-300 ${
                    isSearchOpen
                      ? "ml-3 text-gray-600"
                      : "search-icon-pulse hover:scale-110"
                  }`}
                  onClick={handleSearchIconClick}
                />
                <input
                  id="search-input"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search products..."
                  className={`transition-all duration-300 ease-in-out bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-500 ${
                    isSearchOpen
                      ? "w-48 ml-2 mr-3 py-2 opacity-100"
                      : "w-0 opacity-0 pointer-events-none"
                  }`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      // Navigate to search results page
                      router.push(
                        `/search?q=${encodeURIComponent(searchQuery)}`
                      );
                      handleSearchClose();
                    }
                  }}
                />
                {isSearchOpen && searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                    className="mr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    ×
                  </button>
                )}
              </div>

              <SearchDropdown
                searchResults={searchResults}
                isVisible={isSearchOpen && searchQuery.trim().length > 0}
                searchQuery={searchQuery}
                onClose={handleSearchClose}
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

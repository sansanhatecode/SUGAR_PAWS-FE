"use client";

import React, { useState, useEffect } from "react";
import { formatCurrency } from "@/helper/renderNumber";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CtaButton from "@/components/ui/CtaButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import CartItemRow from "@/components/cart/CartItemRow";
import { useGetCartItems, useRemoveCartItem } from "@/hooks/queries/useCart";
import { CartItem as ApiCartItem } from "@/types/cart";
import { ProductDetail } from "@/types/product";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<ApiCartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [voucher, setVoucher] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const { getCartItems } = useGetCartItems();
  const { data: cartData, isSuccess } = getCartItems;
  const removeCartItemMutation = useRemoveCartItem();

  // Sync cartItems with API data
  useEffect(() => {
    if (isSuccess && cartData?.cartItems) {
      setCartItems(cartData.cartItems);
    }
  }, [isSuccess, cartData]);

  // Update selected items when "Select All" changes
  useEffect(() => {
    if (selectAll) {
      setSelectedItems(new Set(cartItems.map((item) => String(item.id))));
    } else if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    }
  }, [selectAll, cartItems, selectedItems.size]);

  // Update selectAll status when individual selections change
  useEffect(() => {
    setSelectAll(
      selectedItems.size === cartItems.length && cartItems.length > 0,
    );
  }, [selectedItems, cartItems.length]);

  // Calculate total amount from selected cart items
  const selectedTotal = cartItems
    .filter((item) => selectedItems.has(String(item.id)))
    .reduce(
      (total, item) => total + item.productDetail.price * item.quantity,
      0,
    );

  // Calculate total of all items (regardless of selection)
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.productDetail.price * item.quantity,
    0,
  );

  const handleSelectItem = (id: number, selected: boolean) => {
    const newSelectedItems = new Set(selectedItems);
    if (selected) {
      newSelectedItems.add(id.toString());
    } else {
      newSelectedItems.delete(id.toString());
    }
    setSelectedItems(newSelectedItems);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item,
      ),
    );
  };

  const handleUpdateColor = (id: number, newColor: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              productDetail: { ...item.productDetail, color: newColor },
            }
          : item,
      ),
    );
  };

  const handleUpdateSize = (id: number, newSize: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              productDetail: { ...item.productDetail, size: newSize },
            }
          : item,
      ),
    );
  };

  const handleRemoveItem = (id: number) => {
    removeCartItemMutation.mutate(id);
    // UI sẽ tự refetch nhờ react-query, không cần setCartItems thủ công
    if (selectedItems.has(id.toString())) {
      const newSelectedItems = new Set(selectedItems);
      newSelectedItems.delete(id.toString());
      setSelectedItems(newSelectedItems);
    }
  };

  const handleApplyVoucher = () => {
    if (!voucher.trim()) return;
    setIsApplying(true);

    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      alert("Voucher code is invalid or expired");
    }, 1000);
  };

  const handleCheckout = () => {
    if (selectedItems.size === 0) {
      alert("Please select at least one item to checkout");
      return;
    }

    // Navigate to checkout with selected items
    console.log(
      "Checking out with selected items:",
      cartItems.filter((item) => selectedItems.has(String(item.id))),
    );
    // In a real implementation, you would pass these selected items to checkout
  };

  // Define local ProductDetail type for conversion
  type ProductImage = {
    url: string;
  };

  type ProductDetailLocal = {
    id: string;
    name: string;
    price: number;
    color: string;
    size: string;
    image: ProductImage;
    availableColors?: string[];
    availableSizes?: string[];
  };

  function toLocalProductDetail(
    apiDetail: ProductDetail & {
      availableColors?: string[];
      availableSizes?: string[];
    },
  ): ProductDetailLocal {
    return {
      id: String(apiDetail.id),
      name: apiDetail.name || "",
      price: apiDetail.price,
      color: apiDetail.color,
      size: apiDetail.size,
      image: { url: apiDetail.image?.url || "" },
      availableColors: apiDetail.availableColors,
      availableSizes: apiDetail.availableSizes,
    };
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="mb-8 text-gray-600">
            Looks like you haven&apos;t added any items to your cart yet.
          </p>
          <Link href="/collections">
            <CtaButton
              text="Continue Shopping"
              onClick={() => console.log("ckucfds")}
            />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center">
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-5 h-5 accent-custom-wine"
                  />
                </div>
                <div className="col-span-11 md:col-span-6 lg:col-span-5">
                  <span className="font-semibold">Product</span>
                </div>
                <div className="hidden md:block md:col-span-1 text-center">
                  <span className="font-semibold">Price</span>
                </div>
                <div className="hidden md:block md:col-span-2 text-center">
                  <span className="font-semibold">Quantity</span>
                </div>
                <div className="hidden md:block md:col-span-2 text-center">
                  <span className="font-semibold">Subtotal</span>
                </div>
                <div className="hidden md:block md:col-span-1"></div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <CartItemRow
                  key={String(item.id)}
                  id={item.id}
                  product={toLocalProductDetail(item.productDetail)}
                  quantity={item.quantity}
                  isSelected={selectedItems.has(String(item.id))}
                  onSelect={handleSelectItem}
                  onUpdateQuantity={handleUpdateQuantity}
                  onUpdateColor={handleUpdateColor}
                  onUpdateSize={handleUpdateSize}
                  onRemove={handleRemoveItem}
                />
              ))}

              <div className="p-4">
                <Link
                  href="/collections"
                  className="text-custom-wine inline-flex items-center hover:underline"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4 text-xl">Cart Summary</h3>

              <div className="mb-6 border-b pb-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Items Selected:</span>
                  <span className="font-semibold">
                    {selectedItems.size} of {cartItems.length}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Subtotal (Selected):</span>
                  <span className="font-semibold">
                    {formatCurrency(selectedTotal)} VND
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold">
                    {selectedItems.size > 0 ? "Calculated at checkout" : "—"}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between py-2">
                  <span className="text-gray-800 font-bold">
                    Total (Selected):
                  </span>
                  <span className="font-bold text-lg">
                    {formatCurrency(selectedTotal)} VND
                  </span>
                </div>
                {selectedItems.size < cartItems.length && (
                  <div className="text-xs text-gray-600 mt-1">
                    Cart total (all items): {formatCurrency(cartTotal)} VND
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 border rounded p-2"
                    placeholder="Enter voucher code"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                  />
                  <SecondaryButton
                    text={isApplying ? "Applying..." : "Apply"}
                    onClick={handleApplyVoucher}
                    // disabled={isApplying}
                  />
                </div>
                <CtaButton
                  text="Checkout Selected Items"
                  className={`w-full py-3 ${selectedItems.size === 0 ? "opacity-70 cursor-not-allowed" : ""}`}
                  onClick={handleCheckout}
                  disabled={selectedItems.size === 0}
                />
              </div>

              <div className="text-sm text-gray-500 mt-4">
                <p>* Taxes and shipping calculated at checkout</p>
                <p>* You can enter discount codes at checkout</p>
                <p>* Only selected items will be included in checkout</p>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
              <h4 className="font-semibold mb-2">We Accept</h4>
              <div className="flex gap-2 flex-wrap">
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
                <div className="w-12 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

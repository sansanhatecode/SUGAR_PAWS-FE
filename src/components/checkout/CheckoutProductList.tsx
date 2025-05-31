"use client";

import React from "react";
import Image from "next/image";
import { CartItem } from "@/types/cart";
import { ensureAbsoluteUrl } from "@/helper/renderNumber";

interface CheckoutProductListProps {
  selectedItems: CartItem[];
}

const CheckoutProductList: React.FC<CheckoutProductListProps> = ({
  selectedItems,
}) => {
  console.log("selectedItems", selectedItems);
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="font-semibold text-lg text-custom-purple mb-4">
        Products
      </div>
      {selectedItems.length === 0 ? (
        <div className="text-gray-500">No products in your cart.</div>
      ) : (
        selectedItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mb-2">
            {/* Sử dụng Image của Next.js */}
            <div className="w-16 h-16 relative">
              <Image
                src={ensureAbsoluteUrl(
                  item.productDetail.image?.url ??
                    (item.productDetail.displayImage &&
                    item.productDetail.displayImage.length > 0
                      ? item.productDetail.displayImage[0]
                      : ""),
                )}
                alt={item.productDetail.name || "product"}
                fill
                className="rounded object-cover border"
                sizes="64px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex-1">
              <div className="font-medium">
                {item.productDetail.vendor
                  ? `${item.productDetail.vendor} | `
                  : ""}
                {item.productDetail.name || "Product name"}
              </div>
              {/* Hiển thị màu, size và type rõ ràng */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                <span>
                  Color:{" "}
                  <span className="font-semibold text-gray-700">
                    {item.productDetail.color}
                  </span>
                </span>
                {item.productDetail.size && (
                  <>
                    <span className="mx-1">|</span>
                    <span>
                      Size:{" "}
                      <span className="font-semibold text-gray-700">
                        {item.productDetail.size}
                      </span>
                    </span>
                  </>
                )}
                {item.productDetail.type && (
                  <>
                    <span className="mx-1">|</span>
                    <span>
                      Type:{" "}
                      <span className="font-semibold text-gray-700">
                        {item.productDetail.type}
                      </span>
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className="text-base font-semibold">
              {item.productDetail.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            <div className="text-base">x{item.quantity}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default CheckoutProductList;

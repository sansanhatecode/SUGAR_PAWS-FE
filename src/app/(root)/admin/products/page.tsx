"use client";

import { useGetAllProducts } from "@/hooks/queries/useProducts";
import { Product } from "@/types/product";
import React, { useState } from "react";
import Image from "next/image";

const AdminProductsPage = () => {
  // Lấy tất cả sản phẩm, không lọc theo category
  const { getAllProducts } = useGetAllProducts();
  const { data: products, isLoading, error } = getAllProducts;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">All Products</h1>
      {isLoading && <div>Loading products...</div>}
      {error && (
        <div className="text-red-500 text-center my-4">
          An error occurred while loading products
        </div>
      )}
      {products && products.totalAmount > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Image</th>
                <th className="px-4 py-2 border-b">Product Name</th>
                <th className="px-4 py-2 border-b">Min Price</th>
                <th className="px-4 py-2 border-b">Max Price</th>
                <th className="px-4 py-2 border-b">Stock</th>
                <th className="px-4 py-2 border-b">Sold</th>
                <th className="px-4 py-2 border-b">Discount (%)</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: Product) => (
                <tr
                  key={product.id}
                  className="text-center hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <td className="px-4 py-2 border-b">
                    <div className="w-16 h-16 mx-auto relative">
                      <Image
                        src={
                          product.displayImage[0]
                            ? product.displayImage[0].startsWith("//")
                              ? `https:${product.displayImage[0]}`
                              : product.displayImage[0]
                            : "/assets/images/loading/no-image.png"
                        }
                        alt={product.name}
                        fill
                        className="object-cover rounded"
                        sizes="64px"
                        priority={false}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b font-medium">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {product.minPrice.toLocaleString()}₫
                  </td>
                  <td className="px-4 py-2 border-b">
                    {product.maxPrice.toLocaleString()}₫
                  </td>
                  <td className="px-4 py-2 border-b">{product.totalStock}</td>
                  <td className="px-4 py-2 border-b">
                    {product.totalSales ?? 0}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {product.discount ?? 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && <div className="text-center">No products found.</div>
      )}
      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>
            <div className="flex flex-col items-center gap-4">
              <div className="w-40 h-40 relative">
                <Image
                  src={
                    selectedProduct.displayImage[0]
                      ? selectedProduct.displayImage[0].startsWith("//")
                        ? `https:${selectedProduct.displayImage[0]}`
                        : selectedProduct.displayImage[0]
                      : "/assets/images/loading/no-image.png"
                  }
                  alt={selectedProduct.name}
                  fill
                  className="object-cover rounded"
                  sizes="160px"
                />
              </div>
              <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
              <div className="flex flex-col gap-1 w-full">
                <div>
                  <span className="font-semibold">Min Price: </span>
                  {selectedProduct.minPrice.toLocaleString()}₫
                </div>
                <div>
                  <span className="font-semibold">Max Price: </span>
                  {selectedProduct.maxPrice.toLocaleString()}₫
                </div>
                <div>
                  <span className="font-semibold">Stock: </span>
                  {selectedProduct.totalStock}
                </div>
                <div>
                  <span className="font-semibold">Sold: </span>
                  {selectedProduct.totalSales ?? 0}
                </div>
                <div>
                  <span className="font-semibold">Discount: </span>
                  {selectedProduct.discount ?? 0}%
                </div>
                {selectedProduct.description && (
                  <div className="mt-2">
                    <span className="font-semibold">Description: </span>
                    <span>{selectedProduct.description}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;

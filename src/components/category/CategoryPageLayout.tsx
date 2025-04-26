import React, { ReactNode } from "react";
import ProductLoading from "@/components/loading/ProductLoading";
import ProductsSection from "@/components/product/ProductsSection";
import { Product } from "@/types/product";

interface CategoryPageLayoutProps {
  isLoading: boolean;
  error: unknown;
  products: Product[];
  filters: ReactNode;
  banner: ReactNode;
  isEmpty?: string;
}

const CategoryPageLayout = ({
  isLoading,
  error,
  products,
  filters,
  banner,
  isEmpty = "No products found.",
}: CategoryPageLayoutProps) => {
  return (
    <>
      {banner}
      <div className="px-10 flex gap-8 text-[12px]">
        {filters}
        <div className="w-full relative">
          {isLoading ? (
            <ProductLoading />
          ) : error ? (
            <div className="flex-1 flex justify-center items-center min-h-[300px]">
              <p>Error loading products. Please try again later.</p>
            </div>
          ) : products.length === 0 ? (
            <div className="flex-1 flex justify-center items-center min-h-[300px]">
              <p>{isEmpty}</p>
            </div>
          ) : (
            <ProductsSection products={products} />
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPageLayout;

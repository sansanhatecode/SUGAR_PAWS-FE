import React from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard"; // Cập nhật path nếu khác

type ProductsSectionProps = {
  products: Product[];
};

const ProductsSection: React.FC<ProductsSectionProps> = ({ products }) => {
  return (
    <section className="max-w-full w-full pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-stretch">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;

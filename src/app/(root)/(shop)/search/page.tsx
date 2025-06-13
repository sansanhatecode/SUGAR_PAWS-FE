// app/(root)/(shop)/search/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSearchProducts } from "@/hooks/queries/useProducts";
import ProductCard from "@/components/product/ProductCard";
import DefaultLoading from "@/components/loading/DefaultLoading";
import Breadcrumbs from "@/components/ui/BreadCrum";
import { FiSearch, FiFilter } from "react-icons/fi";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams?.get("q") || "";

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(query);
  const itemPerPage = 20;

  const { searchProducts } = useSearchProducts({
    searchTerm: query,
    page: currentPage,
    itemPerPage,
  });

  const { data: searchData, isLoading, error } = searchProducts;

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Search Results", href: "/search" },
  ];

  useEffect(() => {
    setSearchTerm(query);
    setCurrentPage(1); // Reset page when search query changes
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = searchData?.totalProducts
    ? Math.ceil(searchData.totalProducts / itemPerPage)
    : 0;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-[10%] lg:px-[15%] py-8">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex justify-center items-center h-64">
          <DefaultLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-[10%] lg:px-[15%] py-8">
      <Breadcrumbs items={breadcrumbItems} />

      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Search Results
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for products..."
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-custom-rose focus:border-custom-rose"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <div className="bg-custom-rose text-white px-4 py-2 rounded-md hover:bg-custom-rose/90 transition-colors">
                Search
              </div>
            </button>
          </div>
        </form>

        {/* Results Summary */}
        {query && (
          <div className="flex items-center justify-between mb-4">
            <div>
              {searchData?.totalProducts ? (
                <p className="text-gray-600">
                  Found{" "}
                  <span className="font-semibold">
                    {searchData.totalProducts}
                  </span>
                  {searchData.totalProducts === 1 ? " result" : " results"} for{" "}
                  <span className="font-semibold">&quot;{query}&quot;</span>
                </p>
              ) : (
                <p className="text-gray-600">
                  No results found for{" "}
                  <span className="font-semibold">&quot;{query}&quot;</span>
                </p>
              )}
            </div>

            {/* Filter button placeholder - can be expanded later */}
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FiFilter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        )}
      </div>

      {/* Search Results */}
      {error ? (
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            <FiSearch className="h-12 w-12 mx-auto mb-4 opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Search Error
          </h3>
          <p className="text-gray-600">
            Something went wrong while searching. Please try again.
          </p>
        </div>
      ) : !query ? (
        <div className="text-center py-12">
          <FiSearch className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Search for Products
          </h3>
          <p className="text-gray-600">
            Enter a search term to find products in our store.
          </p>
        </div>
      ) : searchData?.products && searchData.products.length > 0 ? (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {searchData.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                if (page > totalPages) return null;

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-custom-rose text-white border-custom-rose"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <FiSearch className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-600 mb-4">
            We couldn&apos;t find any products matching &quot;{query}&quot;.
          </p>
          <div className="text-sm text-gray-500">
            <p>Try:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Checking your spelling</li>
              <li>Using different keywords</li>
              <li>Using more general terms</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

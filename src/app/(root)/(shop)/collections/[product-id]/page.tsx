"use client";

import Breadcrumbs from "@/components/ui/BreadCrum";
import DefaultLoading from "@/components/loading/DefaultLoading";
import DeliveryInfo from "@/components/product/DeliveryInfo";
import ProductDescription from "@/components/product/ProductDescription";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductOptions from "@/components/product/ProductOptions";
import QuantityAddToCart from "@/components/product/QuantityAddToCart";
import ProductReviews from "@/components/product/rating/ProductReviews";
import { Product, Review } from "@/types/product";
import React, { useState, useEffect } from "react";

const fetchProductData = async (productId: string): Promise<Product> => {
  // Giả lập fetch
  await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate network delay
  const productData: Product = {
    id: productId, // Thêm ID
    name: "Embrace Sideboard",
    vendor: "Teixeira Design Studio",
    minPrice: 71.56,
    maxPrice: 74.56,
    rating: 4.8,
    reviewsCount: 67, // Sửa tên
    colors: ["#EED9C4", "#9CA3AF", "#A5B4FC", "#FBCFE8", "#FCA5A5"],
    sizes: ["Small", "Medium", "Large", "Extra Large", "XXL"],
    images: [
      "https://via.placeholder.com/600x700/EED9C4/333?text=Main+View",
      "https://via.placeholder.com/600x700/D1CFC0/333?text=Alt+1",
      "https://via.placeholder.com/600x700/A5A8DD/333?text=Alt+2",
      "https://via.placeholder.com/600x700/C8D8A9/333?text=Alt+3",
    ],
    description: "Detailed product description goes here...",
    benefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
    productDetails: ["Detail A", "Detail B"],
    moreDetails: ["More Detail X", "More Detail Y"],
  };
  return productData;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchReviewsData = async (productId: string): Promise<Review[]> => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const sampleReviews: Review[] = [
    {
      id: 1,
      name: "Nicolas Cage",
      rating: 5,
      time: "2 days ago",
      title: "Amazing!",
      comment: "Great product, fast delivery.",
    },
    {
      id: 2,
      name: "Robert Downey Jr",
      rating: 4,
      time: "1 week ago",
      title: "Good Value",
      comment: "Solid build quality for the price.",
    },
    {
      id: 3,
      name: "Tony Stark",
      rating: 5,
      time: "2 weeks ago",
      title: "Excellent!",
      comment: "Exactly what I needed.",
    },
  ];
  return sampleReviews;
};

const ProductDetailComponent: React.FC<{ productId: string }> = ({
  productId,
}) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1); // Bắt đầu từ 1
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [productData, reviewsData] = await Promise.all([
          fetchProductData(productId),
          fetchReviewsData(productId),
        ]);

        setProduct(productData);
        setReviews(reviewsData);

        // Set initial state based on fetched data
        if (productData) {
          setSelectedImage(productData.images[0] || "");
          setSelectedColor(productData.colors[0] || "");
          setSelectedSize(productData.sizes[0] || "");
        }
      } catch (err) {
        console.error("Failed to load product data:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [productId]);

  // --- Handlers ---
  const handleColorSelect = (color: string) => setSelectedColor(color);
  const handleSizeSelect = (size: string) => setSelectedSize(size);
  const handleDecrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrementQuantity = () => setQuantity((q) => q + 1);
  const handleQuantityChange = (newQuantity: number) =>
    setQuantity(newQuantity);

  const handleAddToCart = () => {
    if (!product) return;
    console.log("Adding to cart:", {
      productId: product.id, // Sử dụng ID
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
    });
    // Logic thêm vào giỏ hàng
  };

  const handleSubmitReview = (reviewData: {
    rating: number;
    title: string;
    content: string;
  }) => {
    if (!product) return;
    console.log("Submitting review for product:", product.id, reviewData);
    // Logic gửi review lên API
    // Sau khi thành công, có thể fetch lại reviews hoặc thêm review mới vào state
    const newReview: Review = {
      id: Date.now(), // ID tạm thời
      name: "Current User", // Lấy tên user đang đăng nhập
      rating: reviewData.rating,
      time: "Just now",
      title: reviewData.title,
      comment: reviewData.content,
    };
    setReviews((prevReviews) => [newReview, ...prevReviews]); // Thêm vào đầu danh sách
  };

  // --- Render Logic ---
  if (isLoading) {
    return <DefaultLoading />;
  }

  if (error) {
    return (
      <div className="container mx-auto text-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        Product not found.
      </div>
    );
  }

  // Dữ liệu cho Breadcrumbs
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Decoration", href: "/decoration" }, // Example links
    { name: "Furniture", href: "/furniture" },
    { name: "Storage", href: "/storage" },
    { name: product.title }, // Current page, no link
  ];

  return (
    <div className="container mx-auto px-4 md:px-[10%] lg:px-[15%] py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Cột trái: Hình ảnh */}
        <ProductImageGallery
          images={product.images}
          selectedImage={selectedImage}
          onThumbnailClick={setSelectedImage}
          productTitle={product.title}
        />

        {/* Cột phải: Thông tin, options, actions */}
        <div className="flex flex-col gap-5">
          <ProductInfo
            product={{
              title: product.title,
              brand: product.brand,
              price: product.price,
              oldPrice: product.oldPrice,
              rating: product.rating,
              reviewsCount: reviews.length, // Lấy số lượng thực tế từ reviews đã fetch
            }}
            // Thêm onWishlistClick, onShareClick nếu cần
          />
          <ProductOptions
            colors={product.colors}
            sizes={product.sizes}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onColorSelect={handleColorSelect}
            onSizeSelect={handleSizeSelect}
          />
          <QuantityAddToCart
            quantity={quantity}
            onDecrement={handleDecrementQuantity}
            onIncrement={handleIncrementQuantity}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
          />
          <DeliveryInfo />
        </div>
      </div>

      {/* Phần Tabs */}
      <div id="reviews-section" className="border-t border-gray-200 pt-8">
        <div className="flex justify-center border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-150 focus:outline-none ${
              activeTab === "description"
                ? "border-b-2 border-custom-rose text-custom-rose"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-150 focus:outline-none ${
              activeTab === "reviews"
                ? "border-b-2 border-custom-rose text-custom-rose"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className="mt-6">
          {activeTab === "description" && (
            <ProductDescription
              product={{
                description: product.description,
                benefits: product.benefits,
                productDetails: product.productDetails,
                moreDetails: product.moreDetails,
              }}
            />
          )}
          {activeTab === "reviews" && (
            <ProductReviews
              productRating={product.rating}
              reviews={reviews}
              onSubmitReview={handleSubmitReview}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;

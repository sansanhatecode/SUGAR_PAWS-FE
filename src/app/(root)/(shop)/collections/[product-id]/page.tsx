/* eslint-disable prettier/prettier */
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
import { ImageDetail, Review, ProductDetail } from "@/types/product";
import { useGetProductDetail } from "@/hooks/queries/useProducts";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userSlice";
import LoginRequiredModal from "@/components/ui/LoginRequiredModal";
import { useAddProductToCart } from "@/hooks/queries/useCart";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchReviewsData = async (productId: string): Promise<Review[]> => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return [
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
};

export default function ProductDetailPage() {
  const pathname = usePathname();
  const productId = (pathname ?? "").split("/").pop();

  const { getProductDetail } = useGetProductDetail(productId ?? "");
  const { data: product, isLoading, error } = getProductDetail;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageDetail | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] =
    useState<ProductDetail | null>(null);
  const user = useSelector(selectUser);

  // Effect for loading reviews and initializing selected image
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData = await fetchReviewsData(productId ?? "");
        setReviews(reviewsData);
      } catch (err) {
        console.error("Failed to load reviews:", err);
      }
    };
    loadReviews();
  }, [productId]);

  useEffect(() => {
    if (product) {
      const images: ImageDetail[] = product.displayImage.map((url) => ({
        id: "NA",
        url: url.startsWith("//") ? "https:" + url : url,
      }));

      const productDetailImages: ImageDetail[] = product.productDetails
        ? (() => {
            const uniqueIds = new Set<string>();
            return product.productDetails
              .map((productDetail) => productDetail.image)
              .filter((image) => {
                if (!image || !image.id) return false;
                if (uniqueIds.has(String(image.id))) return false;
                uniqueIds.add(String(image.id));
                return true;
              });
          })()
        : [];

      if ([...images, ...productDetailImages].length > 0 && !selectedImage) {
        setSelectedImage([...images, ...productDetailImages][0]);
      }
    }
  }, [product, selectedImage]);

  // Effect to update selectedProductDetail when color, size, or type changes
  useEffect(() => {
    if (product && product.productDetails) {
      // Get available options from productDetails
      const availableColors = Array.from(
        new Set(
          product.productDetails.map((detail) => detail.color).filter(Boolean)
        )
      );
      const availableSizes = Array.from(
        new Set(
          product.productDetails.map((detail) => detail.size).filter(Boolean)
        )
      );
      const availableTypes = Array.from(
        new Set(
          product.productDetails.map((detail) => detail.type).filter(Boolean)
        )
      );

      // Check if all required selections are made
      const hasRequiredColor = availableColors.length === 0 || selectedColor;
      const hasRequiredSize = availableSizes.length === 0 || selectedSize;
      const hasRequiredType = availableTypes.length === 0 || selectedType;

      // Only find matching detail if all required selections are made
      if (hasRequiredColor && hasRequiredSize && hasRequiredType) {
        const matchingDetail = product.productDetails.find(
          (detail) =>
            (!availableColors.length || detail.color === selectedColor) &&
            (!availableSizes.length || detail.size === selectedSize) &&
            (!availableTypes.length || detail.type === selectedType)
        );

        setSelectedProductDetail(matchingDetail || null);

        // Update selected image if a matching product detail is found and has an image
        if (matchingDetail && matchingDetail.image) {
          setSelectedImage(matchingDetail.image);
        }
      } else {
        // Clear selection if not all required options are selected
        setSelectedProductDetail(null);
      }
    }
  }, [product, selectedColor, selectedSize, selectedType]);

  const handleColorSelect = (color: string) => setSelectedColor(color);
  const handleSizeSelect = (size: string) => setSelectedSize(size);
  const handleTypeSelect = (type: string) => setSelectedType(type);
  const handleDecrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrementQuantity = () => setQuantity((q) => q + 1);
  const handleQuantityChange = (newQuantity: number) =>
    setQuantity(newQuantity);

  // Import hook for adding to cart
  const { addProductToCart } = useAddProductToCart();

  const handleAddToCart = async () => {
    if (!product) return;

    if (!user || !user.username) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      // Find the correct ProductDetail based on selected color, size, and type
      const selectedProductDetail = product.productDetails?.find(
        (detail) =>
          (!selectedColor || detail.color === selectedColor) &&
          (!selectedSize || detail.size === selectedSize) &&
          (!selectedType || detail.type === selectedType)
      );

      if (!selectedProductDetail) {
        console.error("No product available with selected options");
        return;
      }

      // Call the API to add product to cart
      await addProductToCart(selectedProductDetail.id, quantity);

      // You could add a toast notification here to inform the user
      console.log("Successfully added to cart:", {
        productId: selectedProductDetail.id,
        color: selectedColor,
        size: selectedSize,
        type: selectedType,
        quantity,
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const handleSubmitReview = (reviewData: {
    rating: number;
    title: string;
    content: string;
  }) => {
    if (!product) return;
    const newReview: Review = {
      id: Date.now(),
      name: "Current User",
      rating: reviewData.rating,
      time: "Just now",
      title: reviewData.title,
      comment: reviewData.content,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  if (isLoading) return <DefaultLoading />;
  if (error) {
    return (
      <div className="container mx-auto text-center py-20 text-red-600">
        {error.message || "An error occurred while loading the product"}
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

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Collection", href: "/collections" },
    { name: product.name },
  ];

  const images: ImageDetail[] = product.displayImage.map((url) => ({
    id: "NA",
    url: url.startsWith("//") ? "https:" + url : url,
  }));

  const productDetailImages: ImageDetail[] = product.productDetails
    ? (() => {
        const uniqueIds = new Set<string>();
        return product.productDetails
          .map((productDetail) => productDetail.image)
          .filter((image) => {
            // Skip images without an ID
            if (!image || !image.id) return false;
            // Only keep if this ID hasn't been seen yet
            if (uniqueIds.has(String(image.id))) return false;
            uniqueIds.add(String(image.id));
            return true;
          });
      })()
    : [];

  return (
    <div className="container mx-auto px-4 md:px-[10%] lg:px-[15%] py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        <ProductImageGallery
          images={[...images, ...productDetailImages]}
          selectedImage={selectedImage}
          onThumbnailClick={setSelectedImage}
          productTitle={product.name}
        />

        <div className="flex flex-col gap-5">
          <ProductInfo
            product={product}
            selectedProductDetail={selectedProductDetail}
          />
          <ProductOptions
            colors={product.colors}
            sizes={
              product.productDetails
                ? Array.from(
                    new Set(
                      product.productDetails
                        .map((detail) => detail.size)
                        .filter((size): size is string => Boolean(size))
                    )
                  )
                : []
            }
            types={
              product.productDetails
                ? Array.from(
                    new Set(
                      product.productDetails
                        .map((detail) => detail.type)
                        .filter((type): type is string => Boolean(type))
                    )
                  )
                : []
            }
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            selectedType={selectedType}
            onColorSelect={handleColorSelect}
            onSizeSelect={handleSizeSelect}
            onTypeSelect={handleTypeSelect}
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
          {activeTab === "description" ? (
            <ProductDescription description={product.description} />
          ) : (
            <ProductReviews
              productRating={product.rating ?? 5}
              reviews={reviews}
              onSubmitReview={handleSubmitReview}
            />
          )}
        </div>
      </div>

      {/* Login Required Modal */}
      <LoginRequiredModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        message="You need to sign in to add products to your cart"
      />
    </div>
  );
}

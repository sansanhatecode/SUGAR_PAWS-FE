import { useQuery } from "@tanstack/react-query";
import {
  useReviewService,
  ReviewResponse,
  ReviewStatsResponse,
} from "@/api/service/reviewService";

export const useGetProductReviews = (productId: string) => {
  const { getReviewsByProductId } = useReviewService();

  return useQuery<ReviewResponse[]>({
    queryKey: ["reviews", "product", productId],
    queryFn: () => getReviewsByProductId(productId),
    enabled: !!productId,
  });
};

export const useGetProductReviewStats = (productId: string) => {
  const { getReviewStatsByProductId } = useReviewService();

  return useQuery<ReviewStatsResponse>({
    queryKey: ["reviewStats", "product", productId],
    queryFn: () => getReviewStatsByProductId(productId),
    enabled: !!productId,
  });
};

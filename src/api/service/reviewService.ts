import { useRequest } from "../Request";
import API from "../api";

export interface ReviewResponse {
  id: number;
  orderItemId: number;
  rating: number;
  comment?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  userName?: string;
  productName?: string;
  productId?: number;
  orderDate?: string;
  orderId?: number;
}

export interface ReviewStatsResponse {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: { [key: number]: number };
}

export function useReviewService() {
  const { Request } = useRequest();

  const getReviewsByProductId = async (
    productId: string,
  ): Promise<ReviewResponse[]> => {
    try {
      const { data } = await Request.get<ReviewResponse[]>(
        `/${API.REVIEWS}/product/${productId}`,
      );
      return data || [];
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      throw error;
    }
  };

  const getReviewStatsByProductId = async (
    productId: string,
  ): Promise<ReviewStatsResponse> => {
    try {
      const { data } = await Request.get<ReviewStatsResponse>(
        `/${API.REVIEWS}/product/${productId}/stats`,
      );
      return (
        data || { totalReviews: 0, averageRating: 0, ratingDistribution: {} }
      );
    } catch (error) {
      console.error("Failed to fetch review stats:", error);
      throw error;
    }
  };

  return {
    getReviewsByProductId,
    getReviewStatsByProductId,
  };
}

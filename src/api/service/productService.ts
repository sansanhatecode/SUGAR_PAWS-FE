/* eslint-disable prettier/prettier */
import API from "@/api/api";
import { useRequest } from "@/api/Request";
import {
  GetColorsRequest,
  GetProductsRequest,
  GetSizesRequest,
  Product,
} from "@/types/product";

export function useGetProductservice() {
  const { Request } = useRequest();

  const getProducts = async ({
    categoryName,
    colors,
    sizes,
    minPrice,
    maxPrice,
    sortBy,
  }: GetProductsRequest) => {
    try {
      const { data } = await Request.get<Product[]>(API.PRODUCTS, {
        category: categoryName,
        colors: colors,
        sizes: sizes,
        minPrice: minPrice,
        maxPrice: maxPrice,
        sortBy: sortBy,
      });
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "GetProducts Error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch products."
      );
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await Request.get<Product[]>(API.ALL_PRODUCTS);
      return data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      console.error(
        "GetAllProducts Error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch all products."
      );
    }
  };

  const getColors = async ({ categoryName }: GetColorsRequest) => {
    try {
      const { data } = await Request.get<string[]>(API.COLORS, {
        category: categoryName,
      });
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("GetColors Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch colors."
      );
    }
  };

  const getSizes = async ({ categoryName }: GetSizesRequest) => {
    try {
      const { data } = await Request.get<string[]>(API.SIZES, {
        category: categoryName,
      });
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("GetSizesError:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch colors."
      );
    }
  };

  const getProductDetail = async (id: string) => {
    try {
      const { data } = await Request.get<Product>(API.PRODUCT_DETAIL + id);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "GetProductDetail Error:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch product detail."
      );
    }
  };

  return { getProducts, getColors, getSizes, getProductDetail, getAllProducts };
}

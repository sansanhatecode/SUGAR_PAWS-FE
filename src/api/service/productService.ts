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
    page,
    itemPerPage,
  }: GetProductsRequest) => {
    try {
      const { data } = await Request.get<{
        products: Product[];
        totalProducts: number;
      }>(API.PRODUCTS, {
        category: categoryName,
        colors: colors,
        sizes: sizes,
        minPrice: minPrice,
        maxPrice: maxPrice,
        sortBy: sortBy,
        page: page,
        itemPerPage: itemPerPage,
      });
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: unknown) {
      let message = "Failed to fetch products.";
      if (typeof error === "object" && error !== null) {
        const err = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        message = err.response?.data?.message || err.message || message;
        console.error("GetProducts Error:", err.response?.data || err.message);
      } else {
        console.error("GetProducts Error:", error);
      }
      throw new Error(message);
    }
  };

  const getAllProducts = async ({
    page = 1,
    itemPerPage = 10,
  }: {
    page?: number;
    itemPerPage?: number;
  }) => {
    try {
      const { data } = await Request.get<{
        products: Product[];
        totalProducts: number;
      }>(API.ALL_PRODUCTS, {
        page,
        itemPerPage,
      });
      return data;
    } catch (error: unknown) {
      let message = "Failed to fetch all products.";
      if (typeof error === "object" && error !== null) {
        const err = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        message = err.response?.data?.message || err.message || message;
        console.error(
          "GetAllProducts Error:",
          err.response?.data || err.message
        );
      } else {
        console.error("GetAllProducts Error:", error);
      }
      throw new Error(message);
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

  const updateProduct = async (id: string, updateData: Partial<Product>) => {
    try {
      const { data } = await Request.patch<Product>(
        API.PRODUCT_DETAIL + id,
        updateData
      );
      return data;
    } catch (error: unknown) {
      let message = "Failed to update product.";
      if (typeof error === "object" && error !== null) {
        const err = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        message = err.response?.data?.message || err.message || message;
        console.error(
          "UpdateProduct Error:",
          err.response?.data || err.message
        );
      } else {
        console.error("UpdateProduct Error:", error);
      }
      throw new Error(message);
    }
  };

  return {
    getProducts,
    getColors,
    getSizes,
    getProductDetail,
    getAllProducts,
    updateProduct,
  };
}

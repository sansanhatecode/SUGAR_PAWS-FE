import { Cart, CartItem } from "@/types/cart";
import { useRequest } from "../Request";
import API from "../api";

export function useCartService() {
  const { Request } = useRequest();

  const addToCart = async (productDetailId: number, quantity: number) => {
    try {
      const { data } = await Request.post<CartItem>(API.CART_ITEM, {
        productDetailId,
        quantity,
      });
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("AddToCart Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to add product to cart.",
      );
    }
  };

  const getCartItems = async () => {
    try {
      const { data } = await Request.get<Cart>(API.CART);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "GetCartItems Error:",
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || "Failed to fetch cart items.",
      );
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    try {
      const { data } = await Request.del(`${API.CART_ITEM}/${cartItemId}`);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "RemoveFromCart Error:",
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || "Failed to remove product from cart.",
      );
    }
  };

  const updateCart = async (
    cartItemId: number,
    quantity: number,
    newProductDetailId?: number,
  ) => {
    try {
      const { data } = await Request.patch<CartItem>(
        `${API.CART_ITEM}/${cartItemId}`,
        {
          quantity,
          newProductDetailId: newProductDetailId,
        },
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("UpdateCart Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to update cart item.",
      );
    }
  };

  return { addToCart, getCartItems, removeFromCart, updateCart };
}

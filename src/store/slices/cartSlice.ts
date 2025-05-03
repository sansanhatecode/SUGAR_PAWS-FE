import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a cart item interface
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  size?: string;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

// Helper function to calculate totals
const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return { totalQuantity, totalAmount };
};

// Create the cart slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.color === newItem.color &&
          item.size === newItem.size
      );

      if (existingItemIndex >= 0) {
        // If the item already exists, update its quantity
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Otherwise, add the new item to the cart
        state.items.push(newItem);
      }

      // Recalculate totals
      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        color: string;
        size?: string;
        quantity: number;
      }>
    ) => {
      const { id, color, size, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.id === id && item.color === color && item.size === size
      );

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove the item if quantity is zero or negative
          state.items.splice(itemIndex, 1);
        } else {
          // Otherwise update the quantity
          state.items[itemIndex].quantity = quantity;
        }

        // Recalculate totals
        const { totalQuantity, totalAmount } = calculateTotals(state.items);
        state.totalQuantity = totalQuantity;
        state.totalAmount = totalAmount;
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{
        id: string;
        color: string;
        size?: string;
      }>
    ) => {
      const { id, color, size } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.id === id && item.color === color && item.size === size
      );

      if (itemIndex >= 0) {
        // Remove the item from the cart
        state.items.splice(itemIndex, 1);

        // Recalculate totals
        const { totalQuantity, totalAmount } = calculateTotals(state.items);
        state.totalQuantity = totalQuantity;
        state.totalAmount = totalAmount;
      }
    },
    clearCart: (state) => {
      return initialState;
    },
  },
});

// Export the actions
export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

// Export selectors
export const selectCart = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.totalQuantity;
export const selectCartTotalAmount = (state: RootState) =>
  state.cart.totalAmount;

// Export the reducer
export default cartSlice.reducer;

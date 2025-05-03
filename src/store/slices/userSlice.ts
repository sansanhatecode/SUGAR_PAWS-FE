import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the user state interface
interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  name: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: UserState = {
  id: null,
  username: null,
  email: null,
  name: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create the user slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{
      id?: string;
      username?: string;
      email?: string;
      name?: string;
      accessToken: string;
    }>) => {
      state.loading = false;
      state.id = action.payload.id || null;
      state.username = action.payload.username || null;
      state.email = action.payload.email || null;
      state.name = action.payload.name || null;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      return initialState;
    },
    updateUserProfile: (state, action: PayloadAction<{
      username?: string;
      email?: string;
      name?: string;
    }>) => {
      if (action.payload.username) state.username = action.payload.username;
      if (action.payload.email) state.email = action.payload.email;
      if (action.payload.name) state.name = action.payload.name;
    },
  },
});

// Export the actions
export const { loginStart, loginSuccess, loginFailure, logout, updateUserProfile } = userSlice.actions;

// Export selectors
export const selectUser = (state: RootState) => state.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

// Export the reducer
export default userSlice.reducer;
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isSignedUp: false,
  isLoggedIn: false,
  isUpdatingProfile: false,

  // Function to check auth
  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const response = await axiosInstance.get("/auth/check");
      // Assuming your backend sends { user: {...} } when auth is valid
      set({
        authUser: response.data.user || null,
        isLoggedIn: !!response.data.user,
      });
    } catch (error) {
      console.error("Auth check failed:", error.response?.data || error.message);
      set({
        authUser: null,
        isLoggedIn: false,
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));

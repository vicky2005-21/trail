import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id?: string;
  name?: string;
  email?: string;
  age?: number;
  gender?: string;
  interests?: string[];
  intent?: string;
  photo?: string;
  bio?: string;
  location?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { email: string; password: string }) => void;
  signup: (user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (credentials) => {
        // In a real app, you would validate credentials with an API
        set({
          isAuthenticated: true,
          user: {
            id: "1",
            name: "John Doe",
            email: credentials.email,
            photo:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop",
            interests: ["Coffee", "Travel", "Technology", "Music"],
            location: "New York, USA",
            bio: "Coffee enthusiast, avid traveler, and tech lover. Always looking for new connections and adventures!",
          },
        });
      },
      signup: (user) => {
        // In a real app, you would send user data to an API
        set({
          isAuthenticated: true,
          user: {
            id: "1",
            ...user,
          },
        });
      },
      updateUser: (updatedUser) => {
        set((state) => ({
          user: {
            ...state.user,
            ...updatedUser,
          },
        }));
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

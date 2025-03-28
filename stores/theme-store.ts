import { create } from "zustand";

interface ThemeState {
  isDark: boolean;
  isDarkMode: boolean; // Added property
  setDarkMode: (value: boolean) => void; // Added property
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  isDarkMode: false, // Initialize property
  setDarkMode: (value) => set({ isDarkMode: value }), // Initialize setter
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));

// Add a default export for Expo Router compatibility
export default function ThemeStoreComponent() {
  // This is just a dummy component to satisfy the Expo Router requirement
  return null;
}

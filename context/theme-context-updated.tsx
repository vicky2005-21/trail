import { useThemeStore } from "../stores/theme-store"; // Updated import path
import React, { createContext, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isDarkMode, setDarkMode } = useThemeStore();
  const systemColorScheme = useColorScheme();

  // Initialize theme based on system preference if not already set
  useEffect(() => {
    if (isDarkMode === null) {
      setDarkMode(systemColorScheme === "dark");
    }
  }, [systemColorScheme, isDarkMode, setDarkMode]);

  const isDark = isDarkMode === true;

  const toggleTheme = () => {
    setDarkMode(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

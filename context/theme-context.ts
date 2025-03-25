import React, { createContext, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { useThemeStore } from "@/stores/theme-store";

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
  const { theme, setTheme } = useThemeStore();
  const systemColorScheme = useColorScheme();

  // Initialize theme based on system preference if not already set
  useEffect(() => {
    if (!theme) {
      setTheme(systemColorScheme === "dark" ? "dark" : "light");
    }
  }, [systemColorScheme, theme, setTheme]);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

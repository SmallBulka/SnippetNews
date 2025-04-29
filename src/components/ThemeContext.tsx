import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  textColor: string;
  bgColor: string;
  cardBg: string;
  borderColor: string;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  const themeColors = {
    light: {
      bgColor: "#ffffff",
      textColor: "#222222",
      cardBg: "#f8f9fa",
      borderColor: "#e0e0e0",
    },
    dark: {
      bgColor: "#121212",
      textColor: "#f0f0f0",
      cardBg: "#1e1e1e",
      borderColor: "#333333",
    },
  };

  const [colors, setColors] = useState(themeColors.light);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

    setTheme(initialTheme);
    setColors(themeColors[initialTheme]);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setColors(themeColors[newTheme]);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        textColor: colors.textColor,
        bgColor: colors.bgColor,
        cardBg: colors.cardBg,
        borderColor: colors.borderColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

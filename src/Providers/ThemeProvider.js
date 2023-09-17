import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();
const ToggleThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const savedTheme = window.localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme ? savedTheme : "dark");

  const toggleTheme = () => {
    window.localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={theme}>
      <ToggleThemeContext.Provider value={toggleTheme}>
        {children}
      </ToggleThemeContext.Provider>
    </ThemeContext.Provider>
  );
};

const useThemeState = () => {
  return useContext(ThemeContext);
};

const useToggleTheme = () => {
  return useContext(ToggleThemeContext);
};

export { ThemeProvider, useThemeState, useToggleTheme };

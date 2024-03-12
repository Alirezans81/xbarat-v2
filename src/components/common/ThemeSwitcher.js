import React from "react";
import { useThemeState, useToggleTheme } from "../../Providers/ThemeProvider";

export default function ThemeSwitcher({ horizental }) {
  const theme = useThemeState();
  const lightSwitch = theme === "light" ? "on" : "off";
  const darkSwitch = theme === "dark" ? "on" : "off";
  const horizentalCirclePosition = theme === "light" ? "left-2" : "right-2";
  const verticalCirclePosition = theme === "light" ? "top-2" : "bottom-2";

  const toggleTheme = useToggleTheme();

  if (horizental) {
    return (
      <button
        onClick={toggleTheme}
        className={`bg-${theme}-back flex flex-row items-center px-3 relative py-3.5 rounded-full transition-all duration-200`}
      >
        <div
          className={`w-9 h-9 transition-all duration-300 bg-${theme} absolute rounded-full ${horizentalCirclePosition}`}
        />
        <img
          className="w-6 h-6 z-10"
          src={require(`../../Images/pages/layout/Navbar/ThemeSwitcher/light-${lightSwitch}.png`)}
        />
        <img
          className="w-6 h-6 z-10 ml-5"
          src={require(`../../Images/pages/layout/Navbar/ThemeSwitcher/dark-${darkSwitch}.png`)}
        />
      </button>
    );
  } else {
    return (
      <button
        onClick={toggleTheme}
        className={`bg-${theme}-back flex flex-col items-center px-3 relative py-3.5 rounded-full transition-all duration-200`}
      >
        <div
          className={`w-9 h-9 transition-all duration-300 bg-${theme} absolute rounded-full ${verticalCirclePosition}`}
        />
        <img
          className="w-6 h-6 z-10"
          src={require(`../../Images/pages/layout/Navbar/ThemeSwitcher/light-${lightSwitch}.png`)}
        />
        <img
          className="w-6 h-6 z-10 mt-5"
          src={require(`../../Images/pages/layout/Navbar/ThemeSwitcher/dark-${darkSwitch}.png`)}
        />
      </button>
    );
  }
}

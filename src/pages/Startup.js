import React from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useFontState } from "../Providers/FontProvider";

export default function Startup() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  return (
    <div
      className={`w-browser h-browser bg-${theme} relative transition-all duration-300`}
    >
      <div className="absolute w-browser h-browser bg-login flex justify-evenly">
        <div className="block my-auto mx-auto">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-56 h-w-56"
              src={require("../Images/pages/layout/logo.png")}
            />
            <h1
              className={`text-7xl md:text-8xl font-${font}-bold text-yellow-gradient pt-2 mt-2 -mb-4 md:-mb-6`}
            >
              Xbarat
            </h1>
            <span
              className={`text-3xl md:text-4xl font-${font}-thin text-${oppositeTheme}`}
            >
              {font === "Fa" || font === "Ar"
                ? ""
                : "When you are enough" + "."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

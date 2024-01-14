import React from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useTokenState } from "../Providers/TokenProvider";
import { useFontState } from "../Providers/FontProvider";

export default function Updating() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  return (
    <div className={`w-browser h-browser bg-${theme}`}>
      <div className="absolute w-browser h-browser bg-login flex justify-center items-center px-10">
        <div
          className={`min-w-4/12 h-3/6 bg-${theme}-glass rounded-3xl py-7 px-7 md:px-10 flex flex-col justify-center items-center`}
        >
          <img
            className="w-40"
            src={require("../Images/pages/Updating/icon.png")}
          />
          <div
            className={`flex flex-col gap-y-1 items-center mt-7 font-${font}-regular text-${oppositeTheme}`}
          >
            <span className="text-3xl">Updating...</span>
            <span className={`text-xl text-center font-${font}-thin`}>
              The server is on update. We'll be back soon.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

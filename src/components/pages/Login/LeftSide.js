import React from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useFontState } from "../../../Providers/FontProvider";

export default function LeftSide() {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const lang = useLanguageState();
  const font = useFontState();

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="w-56 h-w-56"
        src={require("../../../Images/pages/layout/logo.png")}
      />
      <h1
        className={`text-8xl font-${font}-bold text-yellow-gradient pt-2 mt-2 -mb-6`}
      >
        {lang["logo-header"]}
      </h1>
      <span className={`text-4xl font-${font}-thin text-${oppositeTheme}`}>
        {lang["slogan"] + "."}
      </span>
    </div>
  );
}

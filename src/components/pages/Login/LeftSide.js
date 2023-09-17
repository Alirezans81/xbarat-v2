import React from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";

export default function LeftSide() {
  const theme = useThemeState();
  const oppositeTheme = theme === "light" ? "dark" : "light";
  const lang = useLanguageState();

  return (
    <div className="flex flex-col justify-center items-center">
      <img
        className="w-56 h-w-56"
        src={require("../../../Images/pages/layout/logo.png")}
      />
      <h1 className="text-8xl font-mine-bold text-blue-gradient mt-5 -mb-6">
        {lang["logo-header"]}
      </h1>
      <span className={`text-4xl font-mine-thin text-${oppositeTheme}`}>
        {lang["slogan"] + "."}
      </span>
    </div>
  );
}

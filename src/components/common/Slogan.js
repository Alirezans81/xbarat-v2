import React from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { useNavigate } from "react-router-dom";

export default function Slogan() {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex flex-col items-center"
    >
      <span className={`font-${font}-bold text-4xl text-yellow-gradient`}>
        {lang["logo-header"]}
      </span>
      <span className={`text-${oppositeTheme} text-xl font-${font}-thin`}>
        {lang["slogan"] + "."}
      </span>
    </button>
  );
}

import React from "react";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useThemeState } from "../Providers/ThemeProvider";
import { useFontState } from "../Providers/FontProvider";

export default function OnLoad({ children }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  if (children) {
    return <div>{children}</div>;
  } else {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <span className={`text-${oppositeTheme} font-${font}-thin text-3xl`}>
          {lang["loading"]}
        </span>
      </div>
    );
  }
}

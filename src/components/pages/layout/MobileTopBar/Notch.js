import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import LanguageSwitcher from "../../../common/LanguageSwitcher";
import { useFontState } from "../../../../Providers/FontProvider";
import { Link } from "react-router-dom";

export default function Notch() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();

  return (
    <div className="flex-1 flex items-end -mx-5">
      <img
        className="w-10 h-10 object-cover"
        src={require(`../../../../Images/pages/layout/MobileTopBar/left-${theme}.png`)}
      />
      <div
        className={`flex-1 bg-${theme}-back rounded-t-3xl h-14 flex justify-between items-center pl-1 pr-3 z-50`}
      >
        <Link to="/">
          <div dir="ltr" className="flex items-center">
            <img
              className="h-7 w-h-7"
              src={require("../../../../Images/pages/layout/logo.png")}
              alt="logo"
            />
            <div className="flex flex-col">
              <h1
                className={`font-${font}-bold text-lg text-yellow-gradient pt-1 -mt-1 -mb-3`}
              >
                {lang["logo-header"]}
              </h1>
              <h5
                className={`text-${oppositeTheme} mt-1 whitespace-nowrap font-${font}-thin text-xs`}
              >
                {font !== "Fa" ? lang["slogan"] : "⠀"}
              </h5>
            </div>
          </div>
        </Link>
        <LanguageSwitcher with_background />
      </div>
      <img
        className="w-10 h-10 object-cover"
        src={require(`../../../../Images/pages/layout/MobileTopBar/right-${theme}.png`)}
      />
    </div>
  );
}

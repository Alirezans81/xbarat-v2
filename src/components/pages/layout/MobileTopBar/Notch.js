import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import LanguageSwitcher from "../../../common/LanguageSwitcher";
import { useFontState } from "../../../../Providers/FontProvider";
import { Link } from "react-router-dom";
import { useUserState } from "../../../../Providers/UserProvider";

export default function Notch() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const userInfo = useUserState();

  return (
    <div className="flex-1 flex items-end -mx-5">
      <img
        className="w-10 h-10 object-cover"
        src={require(`../../../../Images/pages/layout/MobileTopBar/left-${theme}.png`)}
      />
      <div
        className={`flex-1 bg-${theme}-back rounded-t-3xl h-14 flex justify-between items-center pl-1 pr-3 z-50`}
      >
        <Link to={userInfo ? "/home" : "/"}>
          <div className="flex flex-col">
            <div dir="ltr" className="flex gap-x-0.5 items-center">
              <img
                className={`h-6 w-h-6 ${font === "Fa" ? "-mb-2" : ""}`}
                src={require("../../../../Images/pages/layout/logo.png")}
                alt="logo"
              />
              <h1
                className={`font-${font}-bold ${
                  font === "Fa" ? "text-2xl" : "text-[1.75rem]"
                } text-yellow-gradient pt-1 -mb-1`}
              >
                {lang["logo-header"]}
              </h1>
            </div>
            <h5
              className={`text-${oppositeTheme} ${
                font === "Fa" ? "" : "-mt-1.5"
              } whitespace-nowrap font-${font}-thin text-xs`}
            >
              {lang["slogan"] + "."}
            </h5>
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

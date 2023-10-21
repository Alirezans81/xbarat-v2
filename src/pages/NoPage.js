import React from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useNavigate } from "react-router-dom";
import { useTokenState } from "../Providers/TokenProvider";

export default function NoPage() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const navigate = useNavigate();
  const token = useTokenState();

  return (
    <div className={`w-screen h-screen bg-${theme}`}>
      <div className="absolute w-screen h-screen bg-login flex justify-center items-center">
        <div
          className={`bg-${theme}-glass rounded-3xl p-7 flex flex-col justify-center items-center`}
        >
          <img
            className="w-32 h-32"
            src={require("../Images/pages/NoPage/image.png")}
          />
          <div
            className={`flex flex-col items-center mt-7 font-mine-regular text-${oppositeTheme}`}
          >
            <span className="text-3xl">{lang["404-page-title"]}</span>
            <span className="text-lg font-mine-thin">
              {lang["404-page-description-1st"]}
            </span>
            <span className="text-lg font-mine-thin -mt-1">
              {lang["404-page-description-2nd"]}
            </span>
          </div>
          {token ? (
            <button
              onClick={() => navigate("/home")}
              className="bg-blue-gradient rounded-full pt-2 px-8 text-xl p font-mine-regular text-light mt-3"
            >
              {lang["home"]}
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-gradient rounded-full pt-2 px-8 text-xl p font-mine-regular text-light mt-3"
            >
              {lang["log-in"]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

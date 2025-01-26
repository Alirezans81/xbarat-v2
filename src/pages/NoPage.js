import React, { useEffect } from "react";
import { useThemeState } from "../Providers/ThemeProvider";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useNavigate } from "react-router-dom";
import { useTokenState, useTokenSetState } from "../Providers/TokenProvider";
import { useUserSetState } from "../Providers/UserProvider";
import { useFontState } from "../Providers/FontProvider";

export default function NoPage() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const navigate = useNavigate();
  const token = useTokenState();
  const setToken = useTokenSetState();
  const setUser = useUserSetState();

  useEffect(() => {
    const savedStringToken = window.localStorage.getItem("authToken");
    const savedStringUser = window.localStorage.getItem("userInfo");
    const savedExpireTime = window.localStorage.getItem("expireTime");

    if (
      savedStringToken !== "undefined" &&
      savedStringToken !== "null" &&
      savedStringUser !== "undefined" &&
      savedStringUser !== "null" &&
      (savedExpireTime === "undefined" ||
        !savedExpireTime ||
        new Date(savedExpireTime) >= new Date())
    ) {
      const savedToken = JSON.parse(savedStringToken);
      const savedUser = JSON.parse(savedStringUser);
      setToken(savedToken);
      setUser(savedUser);
    } else {
      setToken(null);
      setUser(null);
    }
  }, []);

  return (
    <div className={`w-browser h-browser bg-${theme}`}>
      <div className="absolute w-browser h-browser bg-login flex justify-center items-center">
        <div
          className={`bg-${theme}-glass rounded-3xl p-7 flex flex-col justify-center items-center`}
        >
          <img
            className="w-32 h-32"
            src={require("../Images/pages/NoPage/image.png")}
          />
          <div
            className={`flex flex-col items-center mt-7 font-${font}-regular text-${oppositeTheme}`}
          >
            <span className="text-3xl">{lang["404-page-title"]}</span>
            <span className={`text-lg font-${font}-thin`}>
              {lang["404-page-description-1st"]}
            </span>
            <span className={`text-lg font-${font}-thin -mt-1`}>
              {lang["404-page-description-2nd"]}
            </span>
          </div>
          {token ? (
            <button
              onClick={() => navigate("/")}
              className={`bg-blue-gradient rounded-full pt-2 px-8 text-xl p font-${font}-regular text-light mt-3`}
            >
              {lang["home"]}
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className={`bg-blue-gradient rounded-full pt-2 px-8 text-xl p font-${font}-regular text-light mt-3`}
            >
              {lang["log-in"]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

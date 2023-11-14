import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useThemeState } from "../Providers/ThemeProvider";

export default function OnLoad() {
  const navigate = useNavigate();
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const saveStringToken = window.localStorage.getItem("authToken");
    const saveStringUserInfo = window.localStorage.getItem("userInfo");
    if (
      saveStringToken !== "undefined" &&
      saveStringToken !== "null" &&
      saveStringUserInfo !== "undefined" &&
      saveStringUserInfo !== "null"
    ) {
      navigate("/home");
    } else {
      window.localStorage.removeItem("linksShown");
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <span className={`text-${oppositeTheme} font-mine-thin text-3xl`}>
        {lang["loading"]}
      </span>
    </div>
  );
}

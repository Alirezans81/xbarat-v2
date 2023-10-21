import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenSetState } from "../Providers/TokenProvider";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useThemeState } from "../Providers/ThemeProvider";

export default function OnLoad() {
  const navigate = useNavigate();
  const setToken = useTokenSetState();
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const saveStringToken = window.localStorage.getItem("authToken");
    if (saveStringToken !== "undefined") {
      const savedToken = JSON.parse(saveStringToken);

      // if (new Date(savedToken.expiration) > new Date()) {
      //   setToken(savedToken);
      //   navigate("/home");
      // } else navigate("/login");

      navigate("/login");
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

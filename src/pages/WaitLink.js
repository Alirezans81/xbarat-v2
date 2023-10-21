import React, { useEffect } from "react";
import ThemeSwitcher from "../components/pages/layout/Navbar/ThemeSwitcher";
import { useThemeState } from "../Providers/ThemeProvider";
import { useDirectionState } from "../Providers/DirectionProvider";
import { useLanguageState } from "../Providers/LanguageProvider";
import { useNavigate } from "react-router-dom";

export default function WaitLink() {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { three: direction } = useDirectionState();
  const themeSwitcherDivClasses = direction === "rtl" ? "left-4" : "right-4";

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  }, []);

  return (
    <div
      dir={direction}
      className={`w-screen h-screen bg-${theme} relative transition-all duration-300`}
    >
      <div className="absolute w-screen h-screen bg-login flex justify-center items-center">
        <div className={`absolute top-3 ${themeSwitcherDivClasses}`}>
          <ThemeSwitcher />
        </div>
        <div className="w-screen h-screen flex justify-evenly items-center">
          <div
            className={`bg-${theme}-glass rounded-3xl flex w-4/12 flex-col items-center p-8 gap-y-6`}
          >
            <img
              className="w-44 h-44"
              src={require("../Images/pages/layout/WaitLink/key.png")}
            />
            <span
              className={`text-center text-2xl font-mine-bold text-${oppositeTheme}`}
            >
              {lang["wait-link-message"] + "."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

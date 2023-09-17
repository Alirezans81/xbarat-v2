import React from "react";
import Links from "./Navbar/Links";
import ThemeSwitcher from "./Navbar/ThemeSwitcher";
import { Link } from "react-router-dom";
import { CustomTooltip } from "../../common/CustomTooltip";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useTokenSetState } from "../../../Providers/TokenProvider";

export default function Navbar({ links }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();

  const setToken = useTokenSetState();

  return (
    <div className="flex flex-col transition-all duration-200 justify-between py-6 items-center">
      <Links links={links} />
      <div className="absolute bottom-32">
        <ThemeSwitcher />
      </div>
      <div className="mx-5">
        <CustomTooltip
          placement="right"
          content={lang["log-out"]}
          className={`tooltip-${oppositeTheme}`}
          style={oppositeTheme}
        >
          <Link
            onClick={() => setToken(null)}
            to="/login"
            data-tooltip-id="logout-tooltip"
          >
            <div className="relative top-0 left-0">
              <img className="w-8 h-8 opacity-0" />
              <img
                className="w-8 h-8 transition-all duration-100 hover:opacity-0 absolute top-0 left-0"
                src={require("../../../Images/pages/layout/Navbar/logout-gray.png")}
              />
              <img
                className="w-8 h-8 transition-all duration-100 opacity-0 hover:opacity-100 absolute top-0 left-0"
                src={require(`../../../Images/pages/layout/Navbar/logout-${oppositeTheme}.png`)}
              />
            </div>
          </Link>
        </CustomTooltip>
      </div>
    </div>
  );
}

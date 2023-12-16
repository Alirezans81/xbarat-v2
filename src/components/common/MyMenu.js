import React, { useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
import { useThemeState } from "../../Providers/ThemeProvider";
import { Link } from "react-router-dom";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useFontState } from "../../Providers/FontProvider";
import ThemeSwitcher from "./ThemeSwitcher";
import { CustomTooltip } from "./CustomTooltip";
import { useLogout } from "../../apis/pages/Layout/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";

export default function MyMenu() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const setLoading = useIsLoadingSplashScreenSetState();

  const { logout, error, isLoading } = useLogout();
  useEffect(() => setLoading(isLoading), [isLoading]);

  return (
    <Menu
      customBurgerIcon={
        <img
          src={require(`../../Images/pages/layout/MobileTopBar/menu-${oppositeTheme}.png`)}
        />
      }
      customCrossIcon={
        <img src={require(`../../Images/close-${oppositeTheme}.png`)} />
      }
      burgerButtonClassName="w-6 h-6 mt-2 w-24"
      crossButtonClassName="w-5 h-5 mr-1 mt-1"
      className={`bg-${theme} border-r border-gray -ml-4 -mt-13`}
      noOverlay
    >
      <div className="w-full px-3 pt-14">
        <Link
          className="w-full flex gap-x-2 items-center border border-gray rounded-xl px-3.5 pt-3 pb-2"
          to="/wallet"
        >
          <img
            className="w-6 h-6 -mt-1"
            src={require(`../../Images/pages/layout/Navbar/wallet-${oppositeTheme}.png`)}
          />
          <span className={`font-${font}-regular text-${oppositeTheme}`}>
            {lang["wallet"]}
          </span>
        </Link>
        <div className="w-full mt-5 flex justify-between items-center">
          <ThemeSwitcher horizental />
          <Link
            onClick={() => logout()}
            to="/login"
            data-tooltip-id="logout-tooltip"
          >
            <div className="relative top-0 left-0">
              <img className="w-8 h-8 opacity-0" />
              <img
                className="w-8 h-8 transition-all duration-100 hover:opacity-0 absolute top-0 left-0"
                src={require("../../Images/pages/layout/Navbar/logout-gray.png")}
              />
              <img
                className="w-8 h-8 transition-all duration-100 opacity-0 hover:opacity-100 absolute top-0 left-0"
                src={require(`../../Images/pages/layout/Navbar/logout-${oppositeTheme}.png`)}
              />
            </div>
          </Link>
        </div>
      </div>
    </Menu>
  );
}

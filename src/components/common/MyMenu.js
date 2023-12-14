import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useThemeState } from "../../Providers/ThemeProvider";
import { Link } from "react-router-dom";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useFontState } from "../../Providers/FontProvider";

export default function MyMenu() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();

  const showSettings = (event) => {
    event.preventDefault();
  };

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
      </div>
    </Menu>
  );
}

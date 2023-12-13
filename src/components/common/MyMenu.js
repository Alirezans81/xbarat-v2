import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useThemeState } from "../../Providers/ThemeProvider";

export default function MyMenu() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

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
      burgerButtonClassName="w-6 h-6 mt-2"
      crossButtonClassName="w-5 h-5 mr-1 mt-1"
      className={`absolute w-screen h-screen bg-${theme} border-r border-gray -ml-4 -mt-13`}
      bodyClassName=""
      noOverlay
    >
      <a id="home" className="menu-item" href="/">
        Home
      </a>
      <a id="about" className="menu-item" href="/about">
        About
      </a>
      <a id="contact" className="menu-item" href="/contact">
        Contact
      </a>
      <a onClick={showSettings} className="menu-item--small" href="">
        Settings
      </a>
    </Menu>
  );
}

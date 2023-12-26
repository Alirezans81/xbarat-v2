import React, { useEffect, useRef, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { Link } from "react-router-dom";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import ThemeSwitcher from "../../../common/ThemeSwitcher";
import LeftSide from "../TobBar/LeftSide";
import { useLogout } from "../../../../apis/pages/Layout/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import { useUserState } from "../../../../Providers/UserProvider";
import Element from "../NavbarSetting/Element";

export default function MyMenu({ switchBlur }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const userInfo = useUserState();

  const { logout, error, isLoading } = useLogout();
  useEffect(() => setLoading(isLoading), [isLoading]);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const [allLinks, setAllLinks] = useState([
    {
      title: lang["home"],
      route: "/home",
      imgs: {
        dark: require("../../../../Images/pages/layout/Navbar/home-dark.png"),
        light: require("../../../../Images/pages/layout/Navbar/home-light.png"),
        gray: require("../../../../Images/pages/layout/Navbar/home-gray.png"),
      },
      shown: true,
    },
    {
      title: lang["wallet"],
      route: "/wallet",
      imgs: {
        dark: require("../../../../Images/pages/layout/Navbar/wallet-dark.png"),
        light: require("../../../../Images/pages/layout/Navbar/wallet-light.png"),
        gray: require("../../../../Images/pages/layout/Navbar/wallet-gray.png"),
      },
      shown: true,
    },
  ]);

  return (
    <Menu
      customBurgerIcon={
        <img
          src={require(`../../../../Images/pages/layout/MobileTopBar/menu-${oppositeTheme}.png`)}
        />
      }
      customCrossIcon={
        <img
          src={require(`../../../../Images/arrow2-left-${oppositeTheme}.png`)}
        />
      }
      burgerButtonClassName="w-6 h-6 mt-2"
      crossButtonClassName="mr-0.5 mt-3"
      className={`bg-${theme} -ml-4 -mt-13`}
      styles={{
        bmMenuWrap: { width: 270, height: "100vh", overflow: "hidden" },
        bmCrossButton: { width: 28, height: 28 },
      }}
      noOverlay
      onStateChange={switchBlur}
      isOpen={menuIsOpen}
      onOpen={() => setMenuIsOpen(true)}
      onClose={() => setMenuIsOpen(false)}
    >
      <div className="w-ful h-full px-5 mt-4">
        <div className="h-full flex flex-col pb-28">
          <div dir="ltr" className="flex w-full items-center">
            <img
              className="h-10 w-h-10"
              src={require("../../../../Images/pages/layout/logo.png")}
              alt="logo"
            />
            <div className="flex flex-col">
              <h1
                className={`font-${font}-bold text-xl text-yellow-gradient pt-1 -mt-1 -mb-3`}
              >
                {lang["logo-header"]}
              </h1>
              <h5
                className={`text-${oppositeTheme} mt-1 whitespace-nowrap font-${font}-thin text-sm`}
              >
                {font !== "Fa" ? lang["slogan"] : "⠀"}
              </h5>
            </div>
          </div>
          <div className="w-full mt-3 flex justify-between items-center">
            <div className="flex flex-col mt-7">
              <span
                className={`text-${oppositeTheme} text-2xl font-${font}-bold`}
              >
                {userInfo && userInfo["get_full_name"]
                  ? userInfo["get_full_name"]
                  : ""}
              </span>
              <span className={`text-gray -mt-2`}>
                {userInfo && userInfo["code"] ? userInfo["code"] : ""}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="w-full grid grid-cols-2 gap-y mt-2">
              {allLinks.map((link) => (
                <div className="col-span-2 w-full">
                  <Element data={link} onClick={() => setMenuIsOpen(false)} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
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
                  src={require("../../../../Images/pages/layout/Navbar/logout-gray.png")}
                />
                <img
                  className="w-8 h-8 transition-all duration-100 opacity-0 hover:opacity-100 absolute top-0 left-0"
                  src={require(`../../../../Images/pages/layout/Navbar/logout-${oppositeTheme}.png`)}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Menu>
  );
}

import React from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { Link, useLocation } from "react-router-dom";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useUserState } from "../../../Providers/UserProvider";
import { useFontState } from "../../../Providers/FontProvider";

export default function MobileBottomBar({ links, isBlur }) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { pathname } = useLocation();
  const user = useUserState();

  return (
    <div
      className={`absolute w-[100dvw] bottom-[0dvh] backdrop-blur-2xl z-[25] pt-3 ${
        "standalone" in navigator &&
        !navigator.standalone &&
        /iphone|ipod|ipad/gi.test(navigator.platform) &&
        /Safari/i.test(navigator.appVersion)
          ? "pb-2"
          : "pb-5"
      } flex shadow-md shadow-dark ${!isBlur ? "blur" : ""}`}
    >
      {links.map((link, index) => (
        <Link
          key={index}
          className="flex-1 flex flex-col items-center gap-y-2"
          to={link.route}
        >
          <img
            alt={link.title}
            src={pathname === link.route ? link.imgs.blue : link.imgs.gray}
            className="w-8 h-8"
          />
          <span
            className={`font-${font}-bold text-sm ${
              pathname === link.route
                ? "text-blue"
                : theme === "dark"
                ? `text-gray`
                : "text-gray"
            }`}
          >
            {link.title}
          </span>
        </Link>
      ))}
      <Link
        className="flex-1 flex flex-col items-center gap-y-2"
        to={"/profile"}
      >
        <img
          alt={lang["profile"]}
          src={
            user && user.avatar
              ? user.avatar
              : require("../../../Images/pages/layout/Profile/no-profile.png")
          }
          className={`w-8 h-8 rounded-full object-cover ${
            pathname === "/profile"
              ? "border-2 border-blue"
              : `border-2 border-gray`
          }`}
        />
        <span
          className={`font-${font}-bold text-sm ${
            pathname === "/profile"
              ? "text-blue"
              : theme === "dark"
              ? `text-gray`
              : "text-gray"
          }`}
        >
          {lang["profile"]}
        </span>
      </Link>
    </div>
  );
}

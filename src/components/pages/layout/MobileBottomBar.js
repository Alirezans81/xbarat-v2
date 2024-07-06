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
      className={`absolute w-[100dvw] bottom-[0dvh] backdrop-blur-xl backdrop-brightness-75 z-[25] flex shadow-md shadow-dark ${
        !isBlur ? "blur" : ""
      }`}
    >
      {links.map((link, index) => (
        <Link
          key={index}
          className="flex-1 flex flex-col items-center gap-y-2 pt-4 pb-2.5"
          to={link.route}
        >
          <img
            alt={link.title}
            src={
              pathname === link.route
                ? link.imgs.blue
                : theme === "dark"
                ? link.imgs.gray
                : link.imgs.dark
            }
            className="w-8 h-8"
          />
          <span
            className={`font-${font}-bold text-sm ${
              pathname === link.route
                ? "text-blue"
                : theme === "dark"
                ? `text-gray`
                : "text-dark"
            }`}
          >
            {link.title}
          </span>
        </Link>
      ))}
      {user && (
        <Link
          className="flex-1 flex flex-col items-center gap-y-2 pt-4 pb-2.5"
          to={"/profile"}
        >
          <img
            alt={lang["profile"]}
            src={
              user && user.avatar
                ? user.avatar
                : require("../../../Images/pages/layout/Profile/no-profile.png")
            }
            className={`w-8 h-8 rounded-full ${
              pathname === "/profile" ? "border-2 border-blue" : ""
            }`}
          />
          <span
            className={`font-${font}-bold text-sm ${
              pathname === "/profile"
                ? "text-blue"
                : theme === "dark"
                ? `text-gray`
                : "text-dark"
            }`}
          >
            {lang["profile"]}
          </span>
        </Link>
      )}
    </div>
  );
}

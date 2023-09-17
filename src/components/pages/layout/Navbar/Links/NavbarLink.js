import React from "react";
import { CustomTooltip } from "../../../../common/CustomTooltip";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { Link, useLocation } from "react-router-dom";

export default function NavbarLink({
  title,
  route,
  imgs,
  setActiveRouteShapeTopPosition,
  setActiveRouteShapeIsVisible,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const { pathname } = useLocation();
  const isActive = pathname === route;

  return (
    <div className="my-4">
      <CustomTooltip
        placement="right"
        content={title}
        className={`tooltip-${oppositeTheme}`}
        style={oppositeTheme}
      >
        <Link to={route}>
          <div
            onLoad={(e) => {
              if (isActive) {
                setActiveRouteShapeTopPosition(
                  e.target.getBoundingClientRect().top - 132
                );
                setActiveRouteShapeIsVisible(true);
              }
            }}
            className="relative top-0 left-0 flex justify-center items-center"
          >
            <img
              className={
                isActive ? "opacity-0 w-8 h-8 p-1" : "opacity-0 w-8 h-8"
              }
            />
            <img
              className={
                isActive
                  ? "transition-all duration-100 hover:opacity-0 absolute top-0 left-0 w-8 h-8 p-1"
                  : "transition-all duration-100 hover:opacity-0 absolute top-0 left-0 w-8 h-8"
              }
              src={isActive ? imgs.light : imgs.gray}
            />
            <img
              className={
                isActive
                  ? "transition-all duration-100 opacity-0 hover:opacity-100 absolute top-0 left-0 w-8 h-8 p-1"
                  : "transition-all duration-100 opacity-0 hover:opacity-100 absolute top-0 left-0 w-8 h-8"
              }
              src={imgs[`${oppositeTheme}`]}
            />
          </div>
        </Link>
      </CustomTooltip>
    </div>
  );
}

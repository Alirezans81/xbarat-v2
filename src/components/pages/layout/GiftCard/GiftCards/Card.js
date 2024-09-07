import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function Card({ data }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  return (
    <div
      className={`w-full h-44 bg-${theme}-back rounded-2xl pl-5 pr-4 pb-2.5 pt-4 flex flex-col justify-between`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-x-2 items-end">
          <div className="flex gap-x-2 items-center">
            <img alt="" className="w-7 h-7" />
            <span className={`text-2xl font-${font}-bold -mb-2`}>10</span>
          </div>
          <span className="text-blue">pending</span>
        </div>
        <button>
          <img
            alt=""
            className="w-7 h-7"
            src={require(`../../../../../Images/open-modal-${oppositeTheme}.png`)}
          />
        </button>
      </div>
      <span className="text-gray">2024/8/21 10:04</span>
    </div>
  );
}

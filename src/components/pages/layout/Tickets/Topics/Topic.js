import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function Topic({ data, selected, onSelect }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  return (
    <div
      className={`transition-all duration-200 ${
        selected ? "bg-blue" : `bg-${theme}-back`
      } min-h-[9rem] rounded-2xl px-4 py-3.5 flex flex-col gap-y-1`}
    >
      <div className="w-full flex justify-between items-center">
        <span className={`font-${font}-bold text-${oppositeTheme} text-xl`}>
          {data && data.title ? data.title : ""}
        </span>
        <button
          disabled={selected}
          onClick={onSelect}
          className={`transition-all duration-200 ${
            selected ? "opacity-0" : "opacity-100"
          }`}
        >
          <img
            alt="arrow"
            className="w-7 h-7"
            src={require(`../../../../../Images/arrow-right-${oppositeTheme}.png`)}
          />
        </button>
      </div>

      <span
        className={`w-full font-${font}-regular ${
          selected ? "text-light" : "text-gray"
        }`}
      >
        {data && data.description ? data.description : ""}
      </span>
    </div>
  );
}

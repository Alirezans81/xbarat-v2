import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../../Providers/FontProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";

export default function Topic({ data, selected, onSelect }) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();

  return (
    <button
      disabled={selected}
      onClick={onSelect}
      className={`w-full transition-all duration-200 ${
        selected ? "bg-blue" : `bg-${theme}-back`
      } min-h-[9rem] rounded-2xl px-4 py-3.5 flex flex-col gap-y-1`}
    >
      <div className="w-full flex justify-between items-center">
        <span
          className={`font-${font}-bold ${
            selected ? "text-light" : `text-${oppositeTheme}`
          } text-xl`}
        >
          {data && data.title
            ? lang && lang[data.title]
              ? lang[data.title]
              : ""
            : ""}
        </span>
        <div
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
        </div>
      </div>

      <span
        className={`w-full font-${font}-regular text-start ${
          selected ? "text-light" : "text-gray"
        }`}
      >
        {data && data.description
          ? lang && lang[data.description]
            ? lang[data.description]
            : ""
          : ""}
      </span>
    </button>
  );
}

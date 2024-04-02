import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";

export default function CurrencyCard({
  title,
  tankQuantity,
  onClick,
  isSelected,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const font = useFontState();
  const lang = useLanguageState();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full bg-${theme}-back pt-5 pb-4 rounded-2xl flex flex-col items-center relative w-5 xl:w-auto transition-all duration-300 ${
        isSelected ? "border-2 border-blue" : "border-2 border-gray"
      }`}
    >
      <span className={`text-${oppositeTheme} font-${font}-regular text-2xl`}>
        {title}
      </span>
      <span className={`text-gray font-${font}-regular text-lg`}>
        {tankQuantity + " " + lang["cards-profile"]}
      </span>
      <div className="h-full absolute right-5 -mt-4 flex flex-col justify-center">
        <img
          className="w-6 h-6"
          src={require(`../../../../Images/arrow-right-${oppositeTheme}.png`)}
        />
      </div>
    </button>
  );
}

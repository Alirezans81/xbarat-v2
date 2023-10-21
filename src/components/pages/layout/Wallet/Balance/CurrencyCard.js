import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";

export default function CurrencyCard({ balance }) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const addComma = useAddComma();

  return (
    <div
      className={`flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-4 pb-4 px-5`}
    >
      <div className="flex flex-row font-mine-bold text-xl">
        <img className="w-7 h-7 -mt-1" src={balance.imageSource.gray} />
        <span className={`text-${oppositeTheme}`}>
          {addComma(balance.money)}
        </span>
        <span className="text-gray mx-1">{balance.title}</span>
      </div>
      <div className="-mt-1.5  flex flex-col font-mine-regular items-center">
        <span className="text-green">
          {"+ " + addComma(balance.pending) + " " + lang["pending"]}
        </span>
        <span className="text-red -mt-1">
          {"- " + addComma(balance.locked) + " " + lang["locked"]}
        </span>
      </div>
      <div className="flex flex-col gap-y-2 font-mine-bold w-full text-sm items-center mt-1">
        <button className="border-2 border-blue text-blue rounded-lg pt-2 pb-0.5 w-9/12">
          {lang["transfer"]}
        </button>
        <button className="border-2 border-red text-red rounded-lg pt-2 pb-0.5 w-9/12">
          {lang["withdrawal"]}
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import { useFontState } from "../../../../../Providers/FontProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";

export default function Wallet({ balance, currency, pending, locked }) {
  const theme = useThemeState();
  const font = useFontState();
  const lang = useLanguageState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const addComma = useAddComma();

  return (
    <div className="flex flex-col ov">
      <div
        className={`w-[17.5rem] md:w-[20rem] ${
          balance >= 5555555555551 ? "overflow-x-auto scroll-horizental" : ""
        }`}
      >
        <span className={`text-2xl font-${font}-bold text-${oppositeTheme}`}>
          {addComma(balance, true)}
        </span>
        <span className={`text-2xl font-${font}-bold text-gray ml-1`}>
          {currency}
        </span>
      </div>
      <div className="flex flex-col justify-end -mt-0.5">
        {(pending || pending !== 0) && (
          <span
            dir="ltr"
            className={`w-fit text-sm whitespace-nowrap font-${font}-regular text-green`}
          >
            {"+ " + addComma(pending) + " " + lang["pending"]}
          </span>
        )}
        {(locked || locked !== 0) && (
          <span
            dir="ltr"
            className={`w-fit text-sm whitespace-nowrap font-${font}-regular text-red -mt-1`}
          >
            {"- " + addComma(locked) + " " + lang["locked"]}
          </span>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";

export default function Wallet({ balance, currency, pending, locked }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";

  const addComma = useAddComma();

  return (
    <div className="flex flex-col">
      <div className="">
        <span className={`text-2xl font-mine-bold text-${oppositeTheme}`}>
          {addComma(balance, true)}
        </span>
        <span className={`text-2xl font-mine-bold text-gray ml-1`}>
          {currency}
        </span>
      </div>
      <div className="flex flex-col justify-end -mt-0.5">
        {(pending || pending !== 0) && (
          <span
            dir="ltr"
            className="w-fit text-sm font-mine-regular text-green"
          >
            {"+ " + addComma(pending) + " pending"}
          </span>
        )}
        {(locked || locked !== 0) && (
          <span
            dir="ltr"
            className="w-fit text-sm font-mine-regular text-red -mt-1"
          >
            {"- " + addComma(locked) + " locked"}
          </span>
        )}
      </div>
    </div>
  );
}

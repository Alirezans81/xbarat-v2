import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import RequestStatus from "../../common/RequestStatus";
import { useFontState } from "../../../../../Providers/FontProvider";
export default function DepositCard({ lang, data }) {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const addComma = useAddComma();
  let DateVar = "";
  for (let i = 0; i < 19; i++) {
    if (data.datetime[i] === "-") {
      DateVar += "/";
    }
    if (data.datetime[i] === "T") {
      DateVar += " , ";
    }
    if (data.datetime[i] !== "T" && data.datetime[i] !== "-") {
      DateVar += data.datetime[i];
    }
  }
  return (
    <div
      className={`flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-4 pb-1 overflow-hidden`}
    >
      <div className="flex flex-col items-center">
        <div
          className={`flex flex-row text-${oppositeTheme} font-${font}-regular items-center`}
        >
          <span className="">{addComma(parseInt(data.amount))}</span>
          <span className="mx-1.5">{data.currency_abb}</span>
        </div>
        <div
          className={`flex flex-row text-${oppositeTheme} font-${font}-regular items-center -mt-1.5`}
        >
          <span className="">{lang["in"]}</span>
          {/* inja namosa nemifahmam */}
          <span className="mx-1.5">{data.country_title}</span>
        </div>
        <RequestStatus status={data.status} />
      </div>
      <span className={`font-${font}-regular text-sm text-gray mt-14 mb-2`}>
        {DateVar}
      </span>
    </div>
  );
}

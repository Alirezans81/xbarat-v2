import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";

export default function ExchangeCard({ lang, data }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const addComma = useAddComma();

  return (
    <div
      className={`flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-2 pb-1`}
    >
      <div className="flex flex-col items-center">
        <div className="flex justify-between">
          <span className="text-gray font-mine-regular">
            {lang["currency-pair"]}
          </span>
        </div>
        <div className="flex gap-1 -mt-0.5">
          <span className={`font-mine-regular mt-0.5 text-${oppositeTheme}`}>
            {addComma(data.amount) + " " + data.currencyPair.source.title}
          </span>
          <img
            className="w-6 h-6"
            src={require("../../../../../Images/arrow-right-blue.png")}
          />
          <span className={`font-mine-regular mt-0.5 text-${oppositeTheme}`}>
            {addComma(data.targetAmount) + " " + data.currencyPair.target.title}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center mt-1">
        <span className="text-gray font-mine-regular">Rate</span>
        <div className="flex gap-1">
          <span className={`font-mine-regular text-${oppositeTheme}`}>
            {addComma(data.rate)}
          </span>
          <span className={`font-mine-regular text-blue-gradient`}>
            {data.currencyPair.defaultRateType}
          </span>
        </div>
      </div>
      
      <span className={`font-mine-regular text-sm text-gray mt-8 mb-2`}>
        {data.date.toLocaleString()}
      </span>
    </div>
  );
}

import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import RequestStatus from "../../common/RequestStatus";

export default function WithdrawalCard({ lang, data }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const addComma = useAddComma();

  return (
    <div
      className={`flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-4 pb-1`}
    >
      <div className="flex flex-col items-center">
        <div
          className={`flex flex-row text-${oppositeTheme} font-mine-regular items-center`}
        >
          <span className="">{addComma(data.amount)}</span>
          <span className="mx-1.5">{data.currency}</span>
        </div>
        <div
          className={`flex flex-row text-${oppositeTheme} font-mine-regular items-center -mt-1.5`}
        >
          <span className="">{lang["in"]}</span>
          <span className="mx-1.5">{data.location}</span>
        </div>
        <RequestStatus status={data.status} />
      </div>
      <span className={`font-mine-regular text-sm text-gray mt-14 mb-2`}>
        {data.date.toLocaleString()}
      </span>
    </div>
  );
}

import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import { useConvertDateTime } from "../../../../../hooks/useConvertDateTime";
import RequestStatus from "../../common/RequestStatus";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function TransferCard({ lang, data }) {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const addComma = useAddComma();
  const convertDateTime = useConvertDateTime();

  return (
    <div
      className={`flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-4 pb-1`}
    >
      <div className="flex flex-col items-center">
        <div
          className={`flex flex-row text-${oppositeTheme} font-${font}-regular items-center`}
        >
          <span className="">{addComma(+data.amount)}</span>
          <span className="mx-1.5">{data.currency_abb}</span>
        </div>
        <div
          className={`flex flex-row text-${oppositeTheme} font-${font}-regular items-center -mt-1.5`}
        >
          <span className="">{lang["to"]}</span>
          <span className="mx-1.5">{data.user_receiver}</span>
        </div>
        <RequestStatus status={data.status} />
      </div>
      <span className={`font-${font}-regular text-sm text-gray mt-14 mb-2`}>
        {convertDateTime(data.datetime_done)}
      </span>
    </div>
  );
}

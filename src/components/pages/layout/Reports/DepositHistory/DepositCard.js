import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import RequestStatus from "../../common/RequestStatus";
import { useFontState } from "../../../../../Providers/FontProvider";
import { useConvertDateTime } from "../../../../../hooks/useConvertDateTime";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
export default function DepositCard({ data }) {
  const theme = useThemeState();
  const lang = useLanguageState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const addComma = useAddComma();
  const convertDateTime = useConvertDateTime();
  console.log(data);
  return (
    <div
      className={`flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-4 pb-1 overflow-hidden`}
    >
      <div className="flex flex-col items-center w-full">
        <div
          className={`flex flex-row text-${oppositeTheme} font-${font}-regular items-center`}
        >
          <span className="">{addComma(parseInt(+data.amount))}</span>
          <span className="mx-1.5">{data.currency_abb}</span>
        </div>
        <div
          className={`flex flex-row text-${oppositeTheme} font-${font}-regular items-center -mt-1.5`}
        >
          <span className="">{lang["to"]}</span>
          <span className="mx-1.5">{data.user_receiver_username}</span>
        </div>
        <RequestStatus status={data.status_title} />
      </div>
      <span className={`font-${font}-regular text-sm text-gray mt-20 mb-2`}>
        {convertDateTime(data.datetime_create)}
      </span>
    </div>
  );
}

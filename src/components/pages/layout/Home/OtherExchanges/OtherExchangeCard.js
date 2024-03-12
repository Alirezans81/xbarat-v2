import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useDirectionState } from "../../../../../Providers/DirectionProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import { useConvertDateTime } from "../../../../../hooks/useConvertDateTime";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function OtherExchangeCard({ selectedCurrecnyPair, data }) {
  const theme = useThemeState();
  const font = useFontState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { endComplete: endCompleteDirection } = useDirectionState();
  const addComma = useAddComma();
  const convertDateTime = useConvertDateTime();

  return (
    <div
      className={`flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-2 pb-1`}
    >
      <div className="flex flex-col items-center">
        <span className={`text-2xl font-${font}-regular text-${oppositeTheme}`}>
          {data.exchange_title}
        </span>
        <div className="flex flex-col gap-0.5 items-center">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <img
                className="w-8 h-8"
                src={
                  selectedCurrecnyPair &&
                  selectedCurrecnyPair.currency_source_sym_pic_gray
                    ? selectedCurrecnyPair.currency_source_sym_pic_gray
                    : ""
                }
              />
              <span className={`font-${font}-regular text-lg text-gray mt-1.5`}>
                {selectedCurrecnyPair &&
                selectedCurrecnyPair.currency_source_abb
                  ? selectedCurrecnyPair.currency_source_abb
                  : ""}
              </span>
            </div>
            <img
              className="w-6 h-6"
              src={require(`../../../../../Images/arrow-${endCompleteDirection}-blue.png`)}
            />
            <div className="flex items-center pr-2.5">
              <img
                className="w-8 h-8"
                src={
                  selectedCurrecnyPair &&
                  selectedCurrecnyPair.currency_destination_sym_pic_gray
                    ? selectedCurrecnyPair.currency_destination_sym_pic_gray
                    : ""
                }
              />
              <span className={`font-${font}-regular text-lg text-gray mt-2`}>
                {selectedCurrecnyPair &&
                selectedCurrecnyPair.currency_destination_abb
                  ? selectedCurrecnyPair.currency_destination_abb
                  : ""}
              </span>
            </div>
          </div>
          <div className="flex justify-center gap-1 -mt-2 mx-auto">
            <span className={`font-${font}-regular text-xl text-green`}>
              {addComma(data.source_to_destination_rate)}
            </span>
            <span className={`font-${font}-regular text-xl text-blue-gradient`}>
              {selectedCurrecnyPair &&
              selectedCurrecnyPair.default_rate_type_title
                ? selectedCurrecnyPair.default_rate_type_title
                : ""}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 items-center">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <img
                className="w-8 h-8"
                src={
                  selectedCurrecnyPair &&
                  selectedCurrecnyPair.currency_destination_sym_pic_gray
                    ? selectedCurrecnyPair.currency_destination_sym_pic_gray
                    : ""
                }
              />
              <span className={`font-${font}-regular text-lg text-gray mt-1.5`}>
                {selectedCurrecnyPair &&
                selectedCurrecnyPair.currency_destination_abb
                  ? selectedCurrecnyPair.currency_destination_abb
                  : ""}
              </span>
            </div>
            <img
              className="w-6 h-6"
              src={require(`../../../../../Images/arrow-${endCompleteDirection}-blue.png`)}
            />
            <div className="flex items-center pr-2.5">
              <img
                className="w-8 h-8"
                src={
                  selectedCurrecnyPair &&
                  selectedCurrecnyPair.currency_source_sym_pic_gray
                    ? selectedCurrecnyPair.currency_source_sym_pic_gray
                    : ""
                }
              />
              <span className={`font-${font}-regular text-lg text-gray mt-2`}>
                {selectedCurrecnyPair &&
                selectedCurrecnyPair.currency_source_abb
                  ? selectedCurrecnyPair.currency_source_abb
                  : ""}
              </span>
            </div>
          </div>
          <div className="flex justify-center gap-1 -mt-2 mx-auto">
            <span className={`font-${font}-regular text-xl text-red`}>
              {addComma(data.destination_to_source_rate)}
            </span>
            <span className={`font-${font}-regular text-xl text-blue-gradient`}>
              {selectedCurrecnyPair &&
              selectedCurrecnyPair.default_rate_type_title
                ? selectedCurrecnyPair.default_rate_type_title
                : ""}
            </span>
          </div>
        </div>
        <span className={`font-${font}-regular text-sm text-gray mt-3`}>
          {convertDateTime(data.datetime)}
        </span>
      </div>
    </div>
  );
}

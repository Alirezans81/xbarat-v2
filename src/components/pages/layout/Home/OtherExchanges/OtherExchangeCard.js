import React from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useDirectionState } from "../../../../../Providers/DirectionProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";

export default function OtherExchangeCard({ data }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { endComplete: endCompleteDirection } = useDirectionState();
  const addComma = useAddComma();

  return (
    <div
      className={`flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-2 pb-1`}
    >
      <div className="flex flex-col items-center">
        <span className={`text-2xl font-mine-regular text-${oppositeTheme}`}>
          {data.title}
        </span>
        <div className="flex flex-col gap-0.5 items-center">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <img className="w-8 h-8" src={data.buy.source.imageSource.gray} />
              <span className="font-mine-regular text-lg text-gray mt-1.5">
                {data.buy.source.title}
              </span>
            </div>
            <img
              className="w-6 h-6"
              src={require(`../../../../../Images/arrow-${endCompleteDirection}-blue.png`)}
            />
            <div className="flex items-center pr-2.5">
              <img className="w-8 h-8" src={data.buy.target.imageSource.gray} />
              <span className="font-mine-regular text-lg text-gray mt-2">
                {data.buy.target.title}
              </span>
            </div>
          </div>
          <div className="flex justify-center gap-1 -mt-2 mx-auto">
            <span className="font-mine-regular text-xl text-green">
              {addComma(data.buy.rate)}
            </span>
            <span className="font-mine-regular text-xl text-blue-gradient">
              {data.rateType}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 items-center">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <img
                className="w-8 h-8"
                src={data.sell.source.imageSource.gray}
              />
              <span className="font-mine-regular text-lg text-gray mt-1.5">
                {data.sell.source.title}
              </span>
            </div>
            <img
              className="w-6 h-6"
              src={require(`../../../../../Images/arrow-${endCompleteDirection}-blue.png`)}
            />
            <div className="flex items-center pr-2.5">
              <img
                className="w-8 h-8"
                src={data.sell.target.imageSource.gray}
              />
              <span className="font-mine-regular text-lg text-gray mt-2">
                {data.sell.target.title}
              </span>
            </div>
          </div>
          <div className="flex justify-center gap-1 -mt-2 mx-auto">
            <span className="font-mine-regular text-xl text-red">
              {addComma(data.sell.rate)}
            </span>
            <span className="font-mine-regular text-xl text-blue-gradient">
              {data.rateType}
            </span>
          </div>
        </div>
        <span className={`font-mine-regular text-sm text-gray mt-3`}>
          {data.date.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

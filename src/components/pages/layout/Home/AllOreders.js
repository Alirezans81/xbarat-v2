import React from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import CustomTable from "../../../common/CustomTable";

export default function AllOreders({
  selectedCurrecnyPair,
  setFormDefaultRate,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const { endComplete: direction } = useDirectionState();

  const data = {
    head: ["quantity", "amount", "rate"],
    data: [
      { quantity: 10, amount: 10000, rate: 497500 },
      { quantity: 10, amount: 10000, rate: 497500 },
      { quantity: 10, amount: 10000, rate: 497500 },
      { quantity: 10, amount: 10000, rate: 497500 },
      { quantity: 10, amount: 10000, rate: 497500 },
    ],
  };

  if (
    selectedCurrecnyPair &&
    selectedCurrecnyPair.source &&
    selectedCurrecnyPair.target
  ) {
    return (
      <div className="p-3 grid grid-cols-2 gap-y-2 mr-2">
        <div className="row-col-1 flex flex-col items-center overflow-visible">
          <div
            className={`flex items-center absolute -mt-8 bg-blue-gradient rounded-xl px-3 pt-2 pb-1.5`}
          >
            <div className="flex items-center">
              <img
                className="w-6 h-6"
                src={selectedCurrecnyPair.source.imageSource.light}
              />
              <span className={`text-light font-mine-bold -mb-1.5`}>
                {selectedCurrecnyPair.source.title}
              </span>
            </div>
            <img
              className="w-5 h-5"
              src={require(`../../../../Images/arrow-${direction}-light.png`)}
            />
            <div className="flex items-center">
              <img
                className="w-6 h-6"
                src={selectedCurrecnyPair.target.imageSource.light}
              />
              <span className={`text-light font-mine-bold -mb-1.5`}>
                {selectedCurrecnyPair.target.title}
              </span>
            </div>
          </div>
          <div className="w-full flex-1 pt-4 px-10">
            <CustomTable
              heads={data.head}
              rows={data.data}
              setFormDefaultRate={setFormDefaultRate}
            />
          </div>
        </div>
        <div className="row-col-1 flex flex-col items-center">
          <div
            className={`flex items-center absolute -mt-8 bg-blue-gradient rounded-xl px-3 pt-2 pb-1.5`}
          >
            <div className="flex items-center">
              <img
                className="w-6 h-6"
                src={selectedCurrecnyPair.target.imageSource.light}
              />
              <span className={`text-light font-mine-bold -mb-1.5`}>
                {selectedCurrecnyPair.target.title}
              </span>
            </div>
            <img
              className="w-5 h-5"
              src={require(`../../../../Images/arrow-${direction}-light.png`)}
            />
            <div className="flex items-center">
              <img
                className="w-6 h-6"
                src={selectedCurrecnyPair.source.imageSource.light}
              />
              <span className={`text-light font-mine-bold -mb-1.5`}>
                {selectedCurrecnyPair.source.title}
              </span>
            </div>
          </div>
          <div className="w-full flex-1 pt-4 px-10">
            <CustomTable
              heads={data.head}
              rows={data.data}
              setFormDefaultRate={setFormDefaultRate}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <span className={`text-3xl text-${oppositeTheme} font-mine-thin`}>
          {lang["select-currency-error"] + "."}
        </span>
      </div>
    );
  }
}

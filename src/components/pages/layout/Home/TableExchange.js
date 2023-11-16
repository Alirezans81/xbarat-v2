import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import CustomTable from "../../../common/CustomTable";
import { useGetTableExchange } from "../../../../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import { useTokenState } from "../../../../Providers/TokenProvider";

export default function AllOreders({
  selectedCurrecnyPair,
  setFormDefaultRate,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const setLoading = useIsLoadingSplashScreenSetState();
  const { endComplete: direction } = useDirectionState();

  const [tableExchangeData, setTableExchangeData] = useState([]);

  const { getTableExchange, isLoading: getTableExchangeIsLoading } =
    useGetTableExchange();
  useEffect(
    () => setLoading(getTableExchangeIsLoading),
    [getTableExchangeIsLoading]
  );

  useEffect(() => {
    selectedCurrecnyPair &&
      selectedCurrecnyPair.currency_source_slug &&
      selectedCurrecnyPair.currency_target_slug &&
      getTableExchange(
        {
          source: selectedCurrecnyPair.currency_source_slug,
          target: selectedCurrecnyPair.currency_target_slug,
        },
        setTableExchangeData
      );
  }, [selectedCurrecnyPair]);

  const head = [lang["quantity"], lang["amount"], lang["rate"]];
  const data = {
    SToT: [
      { quantity: 4, amount: 253500000, rate: 1.411 },
      { quantity: 16, amount: 916000000, rate: 1.412 },
      { quantity: 13, amount: 551000000, rate: 1.413 },
      { quantity: 17, amount: 728500000, rate: 1.414 },
      { quantity: 15, amount: 651500000, rate: 1.415 },
    ],
    TToS: [
      { quantity: 6, amount: 78200, rate: 1.408 },
      { quantity: 18, amount: 197900, rate: 1.407 },
      { quantity: 25, amount: 286500, rate: 1.406 },
      { quantity: 14, amount: 249500, rate: 1.405 },
      { quantity: 19, amount: 258300, rate: 1.404 },
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
              heads={head}
              rows={data.SToT}
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
              rows={data.TToS}
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

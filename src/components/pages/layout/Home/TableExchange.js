import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import CustomTable from "../../../common/CustomTable";
import { useGetTableExchange } from "../../../../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import { useAddComma } from "../../../../hooks/useNumberFunctions";

export default function AllOreders({
  selectedCurrecnyPair,
  setFormDefaultRate,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const addComma = useAddComma();
  const setLoading = useIsLoadingSplashScreenSetState();
  const { endComplete: direction } = useDirectionState();

  const [tableExchangeData, setTableExchangeData] = useState();

  const source_to_target_head = [
    lang["quantity"],
    lang["amount"],
    lang["rate"],
  ];
  const target_to_source_head = [
    lang["rate"],
    lang["amount"],
    lang["quantity"],
  ];
  const source_to_target_data =
    tableExchangeData && tableExchangeData.source_to_target
      ? tableExchangeData.source_to_target.map((row) => {
          let temp = {};
          temp.quantity = addComma(row.quantity);
          temp.total_amount = addComma(row.total_amount);
          temp.rate = addComma(row.rate);

          return temp;
        })
      : [];
  const target_to_source_data =
    tableExchangeData && tableExchangeData.target_to_source
      ? tableExchangeData.target_to_source.map((row) => {
          let temp = {};
          temp.rate = addComma(row.rate);
          temp.total_amount = addComma(row.total_amount);
          temp.quantity = addComma(row.quantity);

          return temp;
        })
      : [];

  const { getTableExchange, isLoading: getTableExchangeIsLoading } =
    useGetTableExchange();
  useEffect(
    () => setLoading(getTableExchangeIsLoading),
    [getTableExchangeIsLoading]
  );

  useEffect(() => {
    selectedCurrecnyPair &&
      selectedCurrecnyPair.currency_source_slug &&
      selectedCurrecnyPair.currency_destination_slug &&
      getTableExchange(
        {
          source: selectedCurrecnyPair.currency_source_slug,
          target: selectedCurrecnyPair.currency_destination_slug,
        },
        setTableExchangeData
      );
  }, [selectedCurrecnyPair]);

  if (
    selectedCurrecnyPair &&
    selectedCurrecnyPair.currency_source &&
    selectedCurrecnyPair.currency_destination
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
                src={selectedCurrecnyPair.currency_source_sym_pic_light}
              />
              <span className={`text-light font-mine-bold -mb-1.5`}>
                {selectedCurrecnyPair.currency_source_abb}
              </span>
            </div>
            <img
              className="w-5 h-5"
              src={require(`../../../../Images/arrow-${direction}-light.png`)}
            />
            <div className="flex items-center">
              <img
                className="w-6 h-6"
                src={selectedCurrecnyPair.currency_destination_sym_pic_light}
              />
              <span className={`text-light font-mine-bold -mb-1.5`}>
                {selectedCurrecnyPair.currency_destination_abb}
              </span>
            </div>
          </div>
          <div className="w-full flex-1 pt-4 px-10">
            <CustomTable
              heads={source_to_target_head}
              rows={source_to_target_data}
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
                src={selectedCurrecnyPair.currency_destination_sym_pic_light}
              />
              <span className={`text-light font-mine-bold -mb-1.5`}>
                {selectedCurrecnyPair.currency_destination_abb}
              </span>
            </div>
            <img
              className="w-5 h-5"
              src={require(`../../../../Images/arrow-${direction}-light.png`)}
            />
            <div className="flex items-center">
              <img
                className="w-6 h-6"
                src={selectedCurrecnyPair.currency_source_sym_pic_light}
              />
              <span className={`text-light font-mine-bold -mb-1.5`}>
                {selectedCurrecnyPair.currency_source_abb}
              </span>
            </div>
          </div>
          <div className="w-full flex-1 pt-4 px-10">
            <CustomTable
              heads={target_to_source_head}
              rows={target_to_source_data}
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

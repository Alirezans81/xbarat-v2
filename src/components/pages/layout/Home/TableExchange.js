import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import CustomTable from "../../../common/CustomTable";
import { useGetTableExchange } from "../../../../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import { useAddComma } from "../../../../hooks/useNumberFunctions";
import { CustomTooltip } from "../../../common/CustomTooltip";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function TableExchange({
  selectedSourceIndex,
  availableTargets,
  selectedTargetIndex,
  selectedCurrecnyPair,
  setFormDefaultRate,
  focusOnInput,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const addComma = useAddComma();
  const setLoading = useIsLoadingSplashScreenSetState();
  const { endComplete: direction } = useDirectionState();
  const currencies = useCurrenciesState();

  const [tableExchangeData, setTableExchangeData] = useState();

  const computeSourceToTargetReversedAmount = (amount, rate, multi) => {
    if (
      selectedCurrecnyPair &&
      selectedSourceIndex >= 0 &&
      selectedTargetIndex >= 0
    ) {
      const newAmount =
        +selectedCurrecnyPair.fee_percentage === 0
          ? amount
          : amount * ((100 - +selectedCurrecnyPair.fee_percentage) / 100);
      if (
        selectedCurrecnyPair.default_numerator ===
        availableTargets[selectedTargetIndex].url
      ) {
        return (newAmount * multi) / rate;
      } else {
        return (newAmount * rate) / multi;
      }
    } else return 0;
  };

  const computeTargetToSourceReversedAmount = (amount, rate, multi) => {
    if (
      selectedCurrecnyPair &&
      selectedSourceIndex >= 0 &&
      selectedTargetIndex >= 0
    ) {
      const newAmount =
        +selectedCurrecnyPair.fee_percentage === 0
          ? amount
          : amount * ((100 - +selectedCurrecnyPair.fee_percentage) / 100);
      if (
        selectedCurrecnyPair.default_numerator ===
        availableTargets[selectedTargetIndex].url
      ) {
        return (newAmount * rate) / multi;
      } else {
        return (newAmount * multi) / rate;
      }
    } else return 0;
  };

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
    tableExchangeData &&
    tableExchangeData.source_to_target &&
    selectedCurrecnyPair
      ? tableExchangeData.source_to_target.map((row) => {
          if (row.rate) {
            let temp = {};
            temp.quantity = addComma(row.quantity);
            temp.total_amount = (
              <CustomTooltip
                placement="top"
                content={
                  addComma(
                    computeSourceToTargetReversedAmount(
                      row.total_amount,
                      row.rate,
                      +selectedCurrecnyPair.rate_multiplier
                    ).toFixed(
                      availableTargets[selectedTargetIndex].floating_number
                    )
                  ) +
                  " " +
                  selectedCurrecnyPair.currency_destination_abb
                }
                className={`tooltip-${oppositeTheme}`}
                style={oppositeTheme}
              >
                <span>
                  {addComma(row.total_amount) +
                    " " +
                    selectedCurrecnyPair.currency_source_abb}
                </span>
              </CustomTooltip>
            );
            temp.rate = addComma(
              +row.rate.toFixed(selectedCurrecnyPair.floating_number)
            );

            return temp;
          }
        })
      : [];
  const target_to_source_data =
    tableExchangeData &&
    tableExchangeData.target_to_source &&
    selectedCurrecnyPair
      ? tableExchangeData.target_to_source.map((row) => {
          if (row.rate) {
            let temp = {};
            temp.rate = addComma(
              +row.rate.toFixed(selectedCurrecnyPair.floating_number)
            );
            temp.total_amount = (
              <CustomTooltip
                placement="top"
                content={
                  addComma(
                    computeTargetToSourceReversedAmount(
                      row.total_amount,
                      row.rate,
                      +selectedCurrecnyPair.rate_multiplier
                    ).toFixed(currencies[selectedSourceIndex].floating_number)
                  ) +
                  " " +
                  selectedCurrecnyPair.currency_source_abb
                }
                className={`tooltip-${oppositeTheme}`}
                style={oppositeTheme}
              >
                <span>
                  {addComma(row.total_amount) +
                    " " +
                    selectedCurrecnyPair.currency_destination_abb}
                </span>
              </CustomTooltip>
            );
            temp.quantity = addComma(row.quantity);

            return temp;
          }
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
      <div className="p-3 grid grid-cols-2 gap-y-16 mr-2">
        <div className="col-span-2  md:col-span-1 relative flex flex-col items-center overflow-visible">
          <div
            className={`flex items-center absolute -mt-8 bg-blue-gradient rounded-xl px-3 pt-2 pb-1.5`}
          >
            <div className="flex items-center">
              <img
                className="w-6 h-6"
                src={selectedCurrecnyPair.currency_source_sym_pic_light}
              />
              <span className={`text-light font-${font}-bold -mb-1.5`}>
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
              <span className={`text-light font-${font}-bold -mb-1.5`}>
                {selectedCurrecnyPair.currency_destination_abb}
              </span>
            </div>
          </div>
          <div className="w-full flex-1 pt-4 px-5">
            <CustomTable
              heads={source_to_target_head}
              rows={source_to_target_data}
              haverable={true}
              selectRow={(row) => {
                setFormDefaultRate(row.rate);
                focusOnInput();
              }}
            />
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 relative flex flex-col items-center">
          <div
            className={`flex items-center absolute -mt-8 bg-blue-gradient rounded-xl px-3 pt-2 pb-1.5`}
          >
            <div className="flex items-center">
              <img
                className="w-6 h-6"
                src={selectedCurrecnyPair.currency_destination_sym_pic_light}
              />
              <span className={`text-light font-${font}-bold -mb-1.5`}>
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
              <span className={`text-light font-${font}-bold -mb-1.5`}>
                {selectedCurrecnyPair.currency_source_abb}
              </span>
            </div>
          </div>
          <div className="w-full flex-1 pt-4 px-5">
            <CustomTable
              heads={target_to_source_head}
              rows={target_to_source_data}
              selectRow={(row) => {
                setFormDefaultRate(row.rate);
                focusOnInput();
              }}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full w-full flex justify-center items-center px-10">
        <span
          className={`text-2xl md:text-3xl text-center-important text-${oppositeTheme} font-${font}-thin`}
        >
          {lang["select-currency-error"] + "."}
        </span>
      </div>
    );
  }
}

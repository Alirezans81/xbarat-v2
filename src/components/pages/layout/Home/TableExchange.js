import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useDirectionState } from "../../../../Providers/DirectionProvider";
import CustomTable from "../../../common/CustomTable";
import { useGetTableExchange } from "../../../../apis/pages/Home/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import {
  roundDown,
  useAddComma,
  useCalculateReverseRate,
} from "../../../../hooks/useNumberFunctions";
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
  rateIsReversed,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const addComma = useAddComma();
  const setLoading = useIsLoadingSplashScreenSetState();
  const { endComplete: direction } = useDirectionState();
  const currencies = useCurrenciesState();
  const calculateReverseRate = useCalculateReverseRate();

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

  const [source_to_target_data, set_source_to_target_data] = useState([]);
  const [target_to_source_data, set_target_to_source_data] = useState([]);

  useEffect(() => {
    if (
      tableExchangeData &&
      tableExchangeData.source_to_target &&
      selectedCurrecnyPair
    ) {
      set_source_to_target_data(
        tableExchangeData.source_to_target.map((row) => {
          if (row.rate) {
            let temp = {};
            temp.quantity = addComma(row.quantity);
            temp.total_amount = (
              <CustomTooltip
                placement="top"
                content={
                  addComma(
                    roundDown(
                      computeSourceToTargetReversedAmount(
                        row.total_amount,
                        row.rate,
                        +selectedCurrecnyPair.rate_multiplier
                      ),
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
            temp.rate = rateIsReversed
              ? addComma(
                  calculateReverseRate(
                    +row.rate,
                    +selectedCurrecnyPair.rate_multiplier,
                    +selectedCurrecnyPair.floating_number
                  )
                )
              : addComma(+row.rate);

            return temp;
          }
        })
      );
      set_target_to_source_data(
        tableExchangeData.target_to_source.map((row) => {
          if (row.rate) {
            let temp = {};
            temp.rate = rateIsReversed
              ? addComma(
                  calculateReverseRate(
                    +row.rate,
                    +selectedCurrecnyPair.rate_multiplier,
                    +selectedCurrecnyPair.floating_number
                  )
                )
              : addComma(+row.rate);
            temp.total_amount = (
              <CustomTooltip
                placement="top"
                content={
                  addComma(
                    roundDown(
                      computeTargetToSourceReversedAmount(
                        row.total_amount,
                        row.rate,
                        +selectedCurrecnyPair.rate_multiplier
                      ),
                      +currencies[selectedSourceIndex].floating_number
                    )
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
      );
    } else {
      set_source_to_target_data([]);
      set_target_to_source_data([]);
    }
  }, [tableExchangeData, rateIsReversed]);

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
      <>
        <div className={`hidden md:flex w-full h-full max-h-[40dvh] `}>
          <div className=" w-full h-full grid grid-cols-2 grid-rows-1 gap-y-14 ">
            <div className="col-span-1 row-span-1 w-full flex flex-col items-center">
              <div
                className={`w-2/3 text-xl  font-${font}-regular flex items-center justify-center text-light  -mr-4 md:mr-0 bg-red rounded-xl px-3 pt-2 pb-1.5`}
              >
                {lang["list-sellers"]}
              </div>
              <div
                className={`bg-${theme} overflow-y-scroll rounded-l-2xl flex flex-1 w-full h-full pt-4 px-0 -mr-1.5 md:mr-0 md:px-5 pb-2`}
              >
                <CustomTable
                  color_text={`red`}
                  heads={source_to_target_head}
                  rows={source_to_target_data}
                  haverable
                  selectRow={(row) => {
                    setFormDefaultRate(row.rate);
                    focusOnInput();
                  }}
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1 w-full flex flex-col items-center">
              <div
                className={`w-2/3 bg-green text-light text-xl font-${font}-regular justify-center flex items-center   md:mr-0 rounded-xl px-3 pt-2 pb-1.5`}
              >
                {lang["list-buyers"]}
              </div>
              <div
                className={`bg-${theme} overflow-y-scroll flex flex-1 w-full h-full pt-4 px-0 -mr-1.5 md:mr-0 md:px-5 pb-2`}
              >
                <CustomTable
                  color_text={`green`}
                  heads={target_to_source_head}
                  rows={target_to_source_data}
                  haverable
                  selectRow={(row) => {
                    setFormDefaultRate(row.rate);
                    focusOnInput();
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* for screen < md */}
        <div
          className={`md:hidden w-full h-full max-h-[40dvh] min-w-[620px] overflow-scroll`}
        >
          <div className=" w-full grid grid-cols-2 grid-rows-1 gap-y-14  overflow-x-scroll h-full">
            <div className="col-span-1 row-span-1 w-full flex flex-col items-center">
              <div
                className={`w-2/3 text-xl  font-${font}-regular  flex items-center justify-center text-light  -mr-4 md:mr-0 bg-red rounded-xl px-3 pt-2 pb-1.5`}
              >
                {lang["list-sellers"]}
              </div>
              <div
                className={`bg-${theme} rounded-l-2xl w-full flex-1 pt-4 px-0 -mr-1.5 md:mr-0 md:px-5 pb-2 overflow-y-auto`}
              >
                <CustomTable
                  color_text={`red`}
                  heads={source_to_target_head}
                  rows={source_to_target_data}
                  haverable
                  selectRow={(row) => {
                    setFormDefaultRate(row.rate);
                    focusOnInput();
                  }}
                />
              </div>
            </div>
            <div className="col-span-1 row-span-1 w-full flex flex-col items-center">
              <div
                className={`w-2/3 bg-green text-light text-xl font-${font}-regular justify-center flex items-center   md:mr-0 rounded-xl px-3 pt-2 pb-1.5`}
              >
                {lang["list-buyers"]}
              </div>
              <div
                className={`bg-${theme} rounded-r-2xl w-full flex-1 pt-4 px-0 -mr-1.5 md:mr-0 md:px-5 pb-2 overflow-y-auto h-full`}
              >
                <CustomTable
                  color_text={`green`}
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
        </div>
      </>
    );
  } else {
    return (
      <div
        className={`bg-${theme} rounded-2xl h-full w-full flex justify-center items-center px-10`}
      >
        <span
          className={`text-2xl md:text-3xl text-center-important text-${oppositeTheme} font-${font}-thin`}
        >
          {lang["select-currency-error"] + "."}
        </span>
      </div>
    );
  }
}

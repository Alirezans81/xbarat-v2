import { React, useState, useEffect } from "react";
import { useFontState } from "../../../../Providers/FontProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import {
  useAddComma,
  roundDown,
  useCalculateReverseRate,
} from "../../../../hooks/useNumberFunctions";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import { useGetTableExchange } from "../../../../apis/pages/Home/hooks";
import CustomTable from "../../../common/CustomTable";
import { CustomTooltip } from "../../../common/CustomTooltip";
const TableExchangeExchanging = ({
  selectedSourceIndex,
  availableTargets,
  selectedTargetIndex,
  selectedCurrecnyPair,
  setFormDefaultRate,
  focusOnInput,
  rateIsReversed,
}) => {
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const addComma = useAddComma();
  const setLoading = useIsLoadingSplashScreenSetState();
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

  const source_to_target_head = [lang["amount"], lang["rate"]];
  const target_to_source_head = [lang["rate"], lang["amount"]];

  const [source_to_target_data, set_source_to_target_data] = useState([]);
  const [target_to_source_data, set_target_to_source_data] = useState([]);
  const selectRow = (row) => {
    setFormDefaultRate(row.rate);
    focusOnInput();
  };
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
      <div className="w-full h-full flex flex-col p-3 ">
        <div className="w-full h-fit flex flex-row gap-x-2">
          <div
            className={`bg-${theme}-back rounded-2xl flex flex-col w-1/2 h-full max-h-52`}
          >
            <div
              className={`font-${font}-regular p-2  text-light flex flex-row w-full h-fit justify-between`}
            >
              <span>Amount</span>
              <span>Rate</span>
            </div>
            <div className="flex-1 w-full h-full overflow-scroll flex flex-col pt-1">
              {selectRow
                ? source_to_target_data.map((row, trIndex) => (
                    <button
                      onClick={() => selectRow(row, trIndex)}
                      key={trIndex}
                      className={`font-${font}-regular bg-none flex justify-between px-1`}
                    >
                      {Object.values(row).map((value, tdIndex) => (
                        <span
                          key={tdIndex}
                          className={`text-sm mb-2 max-w-3 ${
                            tdIndex === 0 ? "text-red" : `text-${oppositeTheme}`
                          } overflow-x-scroll`}
                        >
                          {value}
                        </span>
                      ))}
                    </button>
                  ))
                : source_to_target_data.map((row, trIndex) => (
                    <button
                      onClick={() => selectRow(row, trIndex)}
                      key={trIndex}
                      className={`font-${font}-regular bg-none text-red flex justify-between`}
                    >
                      {Object.values(row).map((value, tdIndex) => (
                        <span
                          key={tdIndex}
                          className={`text-sm mb-2 max-w-3 ${
                            tdIndex === 0 ? "text-red" : `text-${oppositeTheme}`
                          } overflow-x-scroll`}
                        >
                          {value}
                        </span>
                      ))}
                    </button>
                  ))}
            </div>
          </div>

          <div
            className={`bg-${theme}-back rounded-2xl flex flex-col w-1/2 h-full max-h-52`}
          >
            <div
              className={`font-${font}-regular p-2  text-light flex flex-row w-full h-fit justify-between`}
            >
              <span>Rate</span>

              <span>Amount</span>
            </div>
            <div className="flex-1 w-full h-full overflow-scroll flex flex-col pt-1">
              {selectRow
                ? target_to_source_data.map((row, trIndex) => (
                    <button
                      onClick={() => selectRow(row, trIndex)}
                      key={trIndex}
                      className={`font-${font}-regular bg-none text-green flex justify-between px-1`}
                    >
                      {Object.values(row).map((value, tdIndex) => (
                        <span
                          key={tdIndex}
                          className={`text-sm mb-2 max-w-3 ${
                            tdIndex === 1
                              ? "text-green"
                              : `text-${oppositeTheme}`
                          } overflow-x-scroll`}
                        >
                          {value}
                        </span>
                      ))}
                    </button>
                  ))
                : target_to_source_data.map((row, trIndex) => (
                    <button
                      onClick={() => selectRow(row, trIndex)}
                      key={trIndex}
                      className={`font-${font}-regular bg-none text-green flex justify-between`}
                    >
                      {Object.values(row).map((value, tdIndex) => (
                        <span
                          key={tdIndex}
                          className={`text-sm mb-2 max-w-3 ${
                            tdIndex === 1
                              ? "text-green"
                              : `text-${oppositeTheme}`
                          } overflow-x-scroll`}
                        >
                          {value}
                        </span>
                      ))}
                    </button>
                  ))}
            </div>
          </div>
        </div>
        <div className="flex-1 w-full h-full"></div>
      </div>
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
};

export default TableExchangeExchanging;

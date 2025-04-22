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
import { CustomTooltip } from "../../../common/CustomTooltip";
import { useCurrencyPairsState } from "../../../../Providers/CurrencyPairsProvider";
import ExchangingSmallScreen from "./ExchangingSmallScreen";
const TableExchangeExchanging = ({
  selectedSourceIndex,
  availableTargets,
  selectedTargetIndex,
  selectedCurrecnyPair,
  setFormDefaultRate,
  focusOnInput,
  rateIsReversed,
  amountInputRef,
  setSelectedCurrencnyPair,
  formDefaultAmount,
  setFormDefaultAmount,
  formDefaultRate,
  setRateIsReversed,
  refreshPendingExchange,
  setSelectedSourceIndex,
  setAvailableTargets,
  setSelectedTargetIndex,
  selectedCurrecnyWalletData,
  findCurrencyBalanceInWallet,
  rateInputRef,
  isDemo,
  setSource,
  setTarget,
  focusOnRateInput,
}) => {
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const addComma = useAddComma();
  const setLoading = useIsLoadingSplashScreenSetState();
  const calculateReverseRate = useCalculateReverseRate();
  const pairs = useCurrencyPairsState();
  const [tableExchangeData, setTableExchangeData] = useState();

  const computeAmountToUSD = (amount, sourceCurrency, targetCurrency, rate) => {
    const rateToUSD = pairs.filter(
      (data) =>
        data.currency_destination_abb === "USD" &&
        data.currency_source_abb === sourceCurrency
    );
    const rateFromUSD = pairs.filter(
      (data) =>
        data.currency_destination_abb === sourceCurrency &&
        data.currency_source_abb === "USD"
    );

    if (sourceCurrency === "USD") {
      return [amount, ""];
    } else if (targetCurrency === "USD") {
      if (rateToUSD && rateToUSD.length !== 0) {
        return rateToUSD[0].has_reverse_rate
          ? [amount * rate, ""]
          : [amount / rate, ""];
      } else if (rateFromUSD && rateFromUSD.length !== 0) {
        return rateToUSD[0].has_reverse_rate
          ? [amount * rate, ""]
          : [amount / rate, ""];
      } else {
        return [amount, "No Currency Pair Between the Two"];
      }
    } else {
      if (rateToUSD && rateToUSD.length !== 0) {
        return rateToUSD[0].has_reverse_rate
          ? [amount * rateToUSD[0].rate, ""]
          : [amount / rateToUSD[0].rate, ""];
      }
      if (rateFromUSD && rateFromUSD.length !== 0) {
        return rateToUSD[0].has_reverse_rate
          ? [amount * rateFromUSD[0].rate, ""]
          : [amount / rateFromUSD[0].rate, ""];
      }
      return [amount, "No Currency Pair Between the Two"];
    }
  };
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
                      row.total_amount,
                      availableTargets[selectedTargetIndex].floating_number
                    )
                  ) +
                  " " +
                  selectedCurrecnyPair.currency_source_abb
                }
                className={`tooltip-${oppositeTheme}`}
                style={oppositeTheme}
              >
                <span>
                  {addComma(
                    roundDown(
                      computeAmountToUSD(
                        row.total_amount,
                        selectedCurrecnyPair.currency_source_abb,
                        selectedCurrecnyPair.currency_destination_abb,
                        row.rate
                      )[0],
                      availableTargets[selectedTargetIndex].floating_number
                    )
                  ) +
                    " " +
                    (computeAmountToUSD(
                      row.total_amount,
                      selectedCurrecnyPair.currency_source_abb,
                      selectedCurrecnyPair.currency_destination_abb,
                      row.rate
                    )[1] === "No Currency Pair Between the Two"
                      ? selectedCurrecnyPair.currency_source_abb
                      : "USD")}
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
                      row.total_amount,
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
                  {addComma(
                    roundDown(
                      computeAmountToUSD(
                        row.total_amount,
                        selectedCurrecnyPair.currency_destination_abb,
                        selectedCurrecnyPair.currency_source_abb,
                        row.rate
                      )[0],
                      availableTargets[selectedTargetIndex].floating_number
                    )
                  ) +
                    " " +
                    (computeAmountToUSD(
                      row.total_amount,
                      selectedCurrecnyPair.currency_destination_abb,
                      selectedCurrecnyPair.currency_source_abb,
                      row.rate
                    )[1] === "No Currency Pair Between the Two"
                      ? selectedCurrecnyPair.currency_destination_abb
                      : "USD")}
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
      <div className="w-full h-full flex flex-col gap-y-2 px-6 pt-5 pb-9">
        <h1
          className={`font-${font}-bold text-2xl text-${oppositeTheme} ${
            font === "Fa" || font === "Ar" ? "-mt-2" : ""
          }`}
        >
          {lang["exchange"]}
        </h1>
        <div className="w-full h-fit max-h-48 flex flex-row gap-x-2">
          <div
            className={`bg-${theme}-back rounded-2xl flex flex-col w-1/2 h-full `}
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
                          className={`text-sm mb-2 ${
                            tdIndex === 0 ? "text-red" : `text-${oppositeTheme}`
                          } `}
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
                          className={`text-sm mb-2 ${
                            tdIndex === 0 ? "text-red" : `text-${oppositeTheme}`
                          } `}
                        >
                          {value}
                        </span>
                      ))}
                    </button>
                  ))}
            </div>
          </div>

          <div
            className={`bg-${theme}-back rounded-2xl flex flex-col w-1/2 h-full max-h-48`}
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
                          className={`text-sm mb-2 ${
                            tdIndex === 1
                              ? "text-green"
                              : `text-${oppositeTheme}`
                          } `}
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
                          className={`text-sm mb-2  ${
                            tdIndex === 1
                              ? "text-green"
                              : `text-${oppositeTheme}`
                          } `}
                        >
                          {value}
                        </span>
                      ))}
                    </button>
                  ))}
            </div>
          </div>
        </div>
        <ExchangingSmallScreen
          selectedCurrecnyPair={selectedCurrecnyPair}
          setSelectedCurrencnyPair={setSelectedCurrencnyPair}
          formDefaultAmount={formDefaultAmount}
          setFormDefaultAmount={setFormDefaultAmount}
          formDefaultRate={formDefaultRate}
          setFormDefaultRate={setFormDefaultRate}
          rateIsReversed={rateIsReversed}
          setRateIsReversed={setRateIsReversed}
          refreshPendingExchange={refreshPendingExchange}
          selectedSourceIndex={selectedSourceIndex}
          setSelectedSourceIndex={setSelectedSourceIndex}
          availableTargets={availableTargets}
          selectedTargetIndex={selectedTargetIndex}
          setAvailableTargets={setAvailableTargets}
          setSelectedTargetIndex={setSelectedTargetIndex}
          selectedCurrecnyWalletData={selectedCurrecnyWalletData}
          findCurrencyBalanceInWallet={findCurrencyBalanceInWallet}
          amountInputRef={amountInputRef}
          rateInputRef={rateInputRef}
          focusOnInput={focusOnRateInput}
          isDemo={isDemo}
          setSource={setSource}
          setTarget={setTarget}
        />
      </div>
    );
  } else {
    return (
      <div className="w-full h-full flex flex-col gap-y-2 px-6 py-5">
        <h1
          className={`font-${font}-bold text-2xl text-${oppositeTheme} ${
            font === "Fa" || font === "Ar" ? "-mt-2" : ""
          }`}
        >
          {lang["exchange"]}
        </h1>
        <ExchangingSmallScreen
          selectedCurrecnyPair={selectedCurrecnyPair}
          setSelectedCurrencnyPair={setSelectedCurrencnyPair}
          formDefaultAmount={formDefaultAmount}
          setFormDefaultAmount={setFormDefaultAmount}
          formDefaultRate={formDefaultRate}
          setFormDefaultRate={setFormDefaultRate}
          rateIsReversed={rateIsReversed}
          setRateIsReversed={setRateIsReversed}
          refreshPendingExchange={refreshPendingExchange}
          selectedSourceIndex={selectedSourceIndex}
          setSelectedSourceIndex={setSelectedSourceIndex}
          availableTargets={availableTargets}
          selectedTargetIndex={selectedTargetIndex}
          setAvailableTargets={setAvailableTargets}
          setSelectedTargetIndex={setSelectedTargetIndex}
          selectedCurrecnyWalletData={selectedCurrecnyWalletData}
          findCurrencyBalanceInWallet={findCurrencyBalanceInWallet}
          amountInputRef={amountInputRef}
          rateInputRef={rateInputRef}
          focusOnInput={focusOnRateInput}
          isDemo={isDemo}
          setSource={setSource}
          setTarget={setTarget}
        />
      </div>
    );
  }
};

export default TableExchangeExchanging;

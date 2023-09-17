import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CustomDropdown, CustomItem } from "../../../../common/CustomDropdown";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useAreRatesReversedState } from "../../../../../Providers/AreRatesReversedProvider";
import {
  useAddComma,
  useReverseRate,
  useRemoveComma,
} from "../../../../../hooks/useNumberFunctions";
import commaNumber from "comma-number";
import { useDirectionState } from "../../../../../Providers/DirectionProvider";

export default function ExchangeForm({
  currencies,
  currencyPairs,
  selectedSourceIndex,
  setSelectedSourceIndex,
  availableTargets,
  setAvailableTargets,
  selectedTargetIndex,
  setSelectedTargetIndex,
  formDefaultRate,
  setFormDefaultRate,
  rateInputReversedEnabled,
  setRateInputReversedEnabled,
  defaultRateType,
}) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { one: oneDirection } = useDirectionState();

  const addComma = useAddComma();
  const removeComma = useRemoveComma();
  const areRatesReversed = useAreRatesReversedState();
  const reverseRate = useReverseRate();

  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const [sourceLabel, setSourceLabel] = useState(lang["source"]);

  const computingTargetAmount = (amount, rate) => {
    if (selectedSourceIndex >= 0 && selectedTargetIndex >= 0) {
      const selectedCurrencies = defaultRateType.split("/");
      if (
        currencies[selectedSourceIndex] &&
        currencies[selectedSourceIndex].title &&
        selectedCurrencies[0] === currencies[selectedSourceIndex].title
      ) {
        if (formDefaultRate) {
          return amount * formDefaultRate;
        } else {
          if (areRatesReversed) {
            return (amount / rate).toFixed();
          } else {
            return amount * rate;
          }
        }
      } else {
        if (formDefaultRate) {
          return (amount / formDefaultRate).toFixed();
        } else {
          if (areRatesReversed) {
            return amount * rate;
          } else {
            return (amount / rate).toFixed();
          }
        }
      }
    }
  };

  useEffect(() => {
    selectedSourceIndex >= 0 &&
      setSourceLabel(currencies[selectedSourceIndex].title);

    findPossiblePairs();
  }, [selectedSourceIndex]);

  useEffect(() => {
    selectedTargetIndex >= 0 &&
      setTargetLabel(availableTargets[selectedTargetIndex].title);
  }, [selectedTargetIndex]);

  const findPossiblePairs = () => {
    let pairs = [];
    for (let i = 0; i < currencyPairs.length; i++) {
      if (
        selectedSourceIndex >= 0 &&
        currencyPairs[i].source.id === currencies[selectedSourceIndex].id
      ) {
        pairs.push(currencyPairs[i].target);
      }
    }

    setAvailableTargets(pairs);
  };

  const [targetLabel, setTargetLabel] = useState(lang["target"]);

  useEffect(() => {
    selectedTargetIndex >= 0
      ? setTargetLabel(availableTargets[selectedTargetIndex].title)
      : setTargetLabel(lang["target"]);
  }, [selectedTargetIndex]);

  const [errorMessage, setErrorMessage] = useState();

  const exchange = (params) => {
    console.log(params);
    setIsLoadingSplashScreen(true);
  };

  return (
    <Formik
      initialValues={{
        amount: "",
        rate: "",
      }}
      onSubmit={(values) => {
        if (selectedSourceIndex >= 0 && selectedTargetIndex >= 0) {
          if (values.amount > 0 && (values.rate > 0 || formDefaultRate)) {
            setErrorMessage(null);

            values.sourceId = currencies[selectedSourceIndex].id;
            values.targetId = availableTargets[selectedTargetIndex].id;

            values.amount = +values.amount;
            values.rate = formDefaultRate
              ? formDefaultRate
              : removeComma(values.rate);

            exchange(values);
          } else {
            setErrorMessage(lang["empty-fields-error"]);
          }
        } else {
          setErrorMessage(lang["select-currency-error"]);
        }
      }}
    >
      {({ handleBlur, handleChange, values, handleSubmit }) => {
        return (
          <form className="mt-2 h-full">
            <div className="flex items-center gap-1">
              <CustomDropdown
                className="flex-1 font-mine-regular"
                label={
                  <div className="flex">
                    {selectedSourceIndex >= 0 && (
                      <img
                        className={`w-7 h-7 -mt-1.5 -m${oneDirection}-1`}
                        src={currencies[selectedSourceIndex].imageSource.gray}
                      />
                    )}
                    <span className={`-m${oneDirection}-0.5`}>
                      {sourceLabel}
                    </span>
                  </div>
                }
              >
                {currencies.map((currency, index) => {
                  if (
                    currency &&
                    currency.title &&
                    currency.imageSource &&
                    currency.imageSource.gray
                  ) {
                    if (index === 0) {
                      if (index === currencies.length - 1) {
                        return (
                          <CustomItem
                            onClick={() => setSelectedSourceIndex(index)}
                            className="rounded-xl"
                            key={index}
                          >
                            <div className="flex">
                              <img
                                className="w-7 h-7 -mt-1.5 mx-0.5"
                                src={currency.imageSource.gray}
                              />
                              <span>{currency.title}</span>
                            </div>
                          </CustomItem>
                        );
                      } else {
                        return (
                          <CustomItem
                            onClick={() => setSelectedSourceIndex(index)}
                            className="rounded-t-xl"
                            key={index}
                          >
                            <div className="flex">
                              <img
                                className="w-7 h-7 -mt-1.5 mx-0.5"
                                src={currency.imageSource.gray}
                              />
                              <span>{currency.title}</span>
                            </div>
                          </CustomItem>
                        );
                      }
                    } else if (index === currencies.length - 1) {
                      return (
                        <CustomItem
                          onClick={() => setSelectedSourceIndex(index)}
                          className="rounded-b-xl"
                          key={index}
                        >
                          <div className="flex">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.imageSource.gray}
                            />
                            <span>{currency.title}</span>
                          </div>
                        </CustomItem>
                      );
                    } else {
                      return (
                        <CustomItem
                          onClick={() => setSelectedSourceIndex(index)}
                          key={index}
                        >
                          <div className="flex">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.imageSource.gray}
                            />
                            <span>{currency.title}</span>
                          </div>
                        </CustomItem>
                      );
                    }
                  }
                })}
              </CustomDropdown>
              <img
                className="w-5 h-5"
                src={require("../../../../../Images/pages/layout/Home/exchange-arrow.png")}
              />
              <CustomDropdown
                className="flex-1 font-mine-regular"
                label={
                  <div className="flex">
                    {selectedTargetIndex >= 0 && (
                      <img
                        className="w-7 h-7 -mt-1.5 mx-0.5"
                        src={
                          availableTargets[selectedTargetIndex].imageSource.gray
                        }
                      />
                    )}
                    <span>{targetLabel}</span>
                  </div>
                }
              >
                {availableTargets.map((currency, index) => {
                  if (index === 0) {
                    if (index === availableTargets.length - 1) {
                      return (
                        <CustomItem
                          onClick={() => setSelectedTargetIndex(index)}
                          className="rounded-xl"
                          key={index}
                        >
                          <div className="flex">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.imageSource.gray}
                            />
                            <span>{currency.title}</span>
                          </div>
                        </CustomItem>
                      );
                    } else {
                      return (
                        <CustomItem
                          onClick={() => setSelectedTargetIndex(index)}
                          className="rounded-t-xl"
                          key={index}
                        >
                          <div className="flex">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.imageSource.gray}
                            />
                            <span>{currency.title}</span>
                          </div>
                        </CustomItem>
                      );
                    }
                  } else if (index === availableTargets.length - 1) {
                    return (
                      <CustomItem
                        onClick={() => setSelectedTargetIndex(index)}
                        className="rounded-b-xl"
                        key={index}
                      >
                        <div className="flex">
                          <img
                            className="w-7 h-7 -mt-1.5 mx-0.5"
                            src={currency.imageSource.gray}
                          />
                          <span>{currency.title}</span>
                        </div>
                      </CustomItem>
                    );
                  } else {
                    return (
                      <CustomItem
                        onClick={() => setSelectedTargetIndex(index)}
                        key={index}
                      >
                        <div className="flex">
                          <img
                            className="w-7 h-7 -mt-1.5 mx-0.5"
                            src={currency.imageSource.gray}
                          />
                          <span>{currency.title}</span>
                        </div>
                      </CustomItem>
                    );
                  }
                })}
              </CustomDropdown>
            </div>
            <div
              className={`flex items-center w-full gap-7 text-${oppositeTheme} font-mine-regular mt-2`}
            >
              <input
                className={`flex-1 hide-input-arrows bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                placeholder={lang["amount"]}
                disabled={selectedSourceIndex < 0 || selectedTargetIndex < 0}
                name="amount"
                onBlur={handleBlur("amount")}
                onChange={handleChange("amount")}
                value={addComma(values.amount, false)}
              />
              <input
                className={`flex-1 hide-input-arrows bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                placeholder={lang["rate"]}
                disabled={selectedSourceIndex < 0 || selectedTargetIndex < 0}
                name="rate"
                onBlur={handleBlur("rate")}
                onChange={(e) => {
                  setRateInputReversedEnabled(false);
                  setFormDefaultRate(null);
                  handleChange(e);
                }}
                value={
                  formDefaultRate
                    ? commaNumber(formDefaultRate)
                    : commaNumber(
                        rateInputReversedEnabled
                          ? reverseRate(+(values.rate + "").replace(",", ""))
                          : (values.rate + "").replace(",", "")
                      )
                }
              />
            </div>
            {values.amount &&
              removeComma(values.amount) !== 0 &&
              (formDefaultRate ||
                (values.rate && removeComma(values.rate) !== 0)) && (
                <div className="mt-1 flex items-center">
                  <img
                    className="w-5 h-5"
                    src={require(`../../../../../Images/arrow-right-${oppositeTheme}.png`)}
                  />
                  <span
                    className={`text-${oppositeTheme} font-mine-regular mt-0.5 text-sm`}
                  >
                    {addComma(
                      computingTargetAmount(
                        removeComma(values.amount),
                        removeComma(values.rate)
                      )
                    ) +
                      " " +
                      (availableTargets[selectedTargetIndex]
                        ? availableTargets[selectedTargetIndex].title
                        : "")}
                  </span>
                </div>
              )}
            <button
              type="submit"
              onClick={handleSubmit}
              className={
                values.amount &&
                removeComma(values.amount) !== 0 &&
                (formDefaultRate ||
                  (values.rate && removeComma(values.rate) !== 0))
                  ? "flex justify-center mt-0.5 items-center w-full bg-blue-gradient text-light h-9 rounded-lg font-mine-bold pt-2.5 pb-1 "
                  : "flex justify-center mt-7 items-center w-full bg-blue-gradient text-light h-9 rounded-lg font-mine-bold pt-2.5 pb-1 "
              }
            >
              Submit
            </button>
          </form>
        );
      }}
    </Formik>
  );
}

import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CustomDropdown, CustomItem } from "../../../../common/CustomDropdown";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import {
  useAddComma,
  useIsNumberFloat,
  useRemoveComma,
} from "../../../../../hooks/useNumberFunctions";
import { useDirectionState } from "../../../../../Providers/DirectionProvider";
import SubmitButton from "../../../../common/SubmitButton";
import { useUserState } from "../../../../../Providers/UserProvider";
import { useStatusesState } from "../../../../../Providers/StatusesProvider";
import { useExchange } from "../../../../../apis/pages/Home/hooks";

export default function ExchangeForm({
  walletBalance,
  selectedCurrecnyPair,
  currencies,
  selectedSourceIndex,
  setSelectedSourceIndex,
  sourceLabel,
  availableTargets,
  selectedTargetIndex,
  setSelectedTargetIndex,
  rateIsReversed,
  targetLabel,
  formDefaultRate,
  defaultRateType,
  refreshPendingExchange,
}) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { one: oneDirection } = useDirectionState();

  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const user = useUserState();
  const statuses = useStatusesState();
  const addComma = useAddComma();
  const removeComma = useRemoveComma();
  const isNumberFloat = useIsNumberFloat();

  const { exchange, isLoading: exchangeIsLoading } = useExchange();
  useEffect(
    () => setIsLoadingSplashScreen(exchangeIsLoading),
    [exchangeIsLoading]
  );

  const [errorMessage, setErrorMessage] = useState("");
  const computingTargetAmount = (amount, rate, multi) => {
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
        currencies[selectedSourceIndex].url
      ) {
        if (!rateIsReversed) {
          return (newAmount * rate) / multi;
        } else {
          return newAmount / rate;
        }
      } else {
        if (!rateIsReversed) {
          return newAmount / rate;
        } else {
          return (newAmount * rate) / multi;
        }
      }
    }
  };

  const findError = (amount, rate) => {
    if (selectedCurrecnyPair && +amount !== 0 && +rate !== 0) {
      const min_amount =
        selectedCurrecnyPair.min_limit_amount_lot *
        currencies[selectedSourceIndex].lot;
      const max_amount =
        selectedCurrecnyPair.max_limit_amount_lot *
        currencies[selectedSourceIndex].lot;

      let min_rate = (
        selectedCurrecnyPair.rate +
        +selectedCurrecnyPair.rate_lot_user *
          +selectedCurrecnyPair.min_limit_rate_lot_user
      ).toFixed(selectedCurrecnyPair.floating_number);
      let max_rate = (
        selectedCurrecnyPair.rate +
        +selectedCurrecnyPair.rate_lot_user *
          +selectedCurrecnyPair.max_limit_rate_lot_user
      ).toFixed(selectedCurrecnyPair.floating_number);
      if (rateIsReversed) {
        let temp = min_rate;
        min_rate = (
          (1 / max_rate) *
          selectedCurrecnyPair.rate_multiplier
        ).toFixed(selectedCurrecnyPair.floating_number);
        max_rate = ((1 / temp) * selectedCurrecnyPair.rate_multiplier).toFixed(
          selectedCurrecnyPair.floating_number
        );
      }

      if (+walletBalance < amount) {
        setErrorMessage(lang["not-enough-balance-error"] + ".");
        return false;
      } else if (amount < min_amount) {
        setErrorMessage(
          lang["low-amount-error"] + " " + addComma(min_amount) + "."
        );
        return false;
      } else if ((max_amount !== 0) & (amount > max_amount)) {
        setErrorMessage(
          lang["high-amount-error"] + " " + addComma(max_amount) + "."
        );
        return false;
      } else if (min_rate > rate || max_rate < rate) {
        setErrorMessage(
          lang["not-in-range-rate-error-1st"] +
            " " +
            addComma(min_rate) +
            " " +
            lang["not-in-range-rate-error-&"] +
            " " +
            addComma(max_rate) +
            (lang["not-in-range-rate-error-2nd"] === ""
              ? "."
              : " " + lang["not-in-range-rate-error-2nd"] + ".")
        );
        return false;
      } else {
        setErrorMessage(null);
        return true;
      }
    }
  };

  return (
    <Formik
      initialValues={{
        amount: "",
        rate: "",
      }}
      onSubmit={(values) => {
        const newAmount =
          +selectedCurrecnyPair.fee_percentage === 0
            ? +removeComma(values.amount)
            : +removeComma(values.amount) *
              ((100 - +selectedCurrecnyPair.fee_percentage) / 100);
        if (findError(+newAmount, +removeComma(values.rate))) {
          const params = {
            user: user && user.url ? user.url : "",
            currency_pair:
              selectedCurrecnyPair && selectedCurrecnyPair.url
                ? selectedCurrecnyPair.url
                : "",
            amount_source: +removeComma(values.amount),
            rate: +removeComma(values.rate),
            amount_destination:
              selectedCurrecnyPair && selectedCurrecnyPair.rate_multiplier
                ? computingTargetAmount(
                    removeComma(values.amount),
                    removeComma(values.rate),
                    selectedCurrecnyPair.rate_multiplier
                  ).toFixed(6)
                : 0,
            status:
              statuses.find((status) => status.title === "Pending").url || "",
          };

          console.log(params);
          exchange(params, refreshPendingExchange);
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
                        src={currencies[selectedSourceIndex].sym_pic_gray}
                      />
                    )}
                    <span className={`-m${oneDirection}-0.5`}>
                      {sourceLabel}
                    </span>
                  </div>
                }
              >
                {currencies.map((currency, index) => {
                  if (currency && currency.abbreviation) {
                    if (index === 0) {
                      if (index === currencies.length - 1) {
                        return (
                          <CustomItem
                            onClick={() => setSelectedSourceIndex(index)}
                            className="rounded-xl"
                            key={index}
                          >
                            <div className="flex pl-4">
                              <img
                                className="w-7 h-7 -mt-1.5 mx-0.5"
                                src={currency.sym_pic_gray}
                              />
                              <span>{currency.abbreviation}</span>
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
                            <div className="flex pl-4">
                              <img
                                className="w-7 h-7 -mt-1.5 mx-0.5"
                                src={currency.sym_pic_gray}
                              />
                              <span>{currency.abbreviation}</span>
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
                          <div className="flex pl-4">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.sym_pic_gray}
                            />
                            <span>{currency.abbreviation}</span>
                          </div>
                        </CustomItem>
                      );
                    } else {
                      return (
                        <CustomItem
                          onClick={() => setSelectedSourceIndex(index)}
                          key={index}
                        >
                          <div className="flex pl-4">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.sym_pic_gray}
                            />
                            <span>{currency.abbreviation}</span>
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
                        src={availableTargets[selectedTargetIndex].sym_pic_gray}
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
                          <div className="flex pl-4">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.sym_pic_gray}
                            />
                            <span>{currency.abbreviation}</span>
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
                          <div className="flex pl-4">
                            <img
                              className="w-7 h-7 -mt-1.5 mx-0.5"
                              src={currency.sym_pic_gray}
                            />
                            <span>{currency.abbreviation}</span>
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
                        <div className="flex pl-4">
                          <img
                            className="w-7 h-7 -mt-1.5 mx-0.5"
                            src={currency.sym_pic_gray}
                          />
                          <span>{currency.abbreviation}</span>
                        </div>
                      </CustomItem>
                    );
                  } else {
                    return (
                      <CustomItem
                        onClick={() => setSelectedTargetIndex(index)}
                        key={index}
                      >
                        <div className="flex pl-4">
                          <img
                            className="w-7 h-7 -mt-1.5 mx-0.5"
                            src={currency.sym_pic_gray}
                          />
                          <span>{currency.abbreviation}</span>
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
                onBlur={(e) => {
                  handleBlur(e);
                  findError(
                    removeComma(values.amount),
                    removeComma(values.rate)
                  );
                }}
                onChange={(e) => {
                  handleChange(e);
                  findError(
                    removeComma(values.amount),
                    removeComma(values.rate)
                  );
                }}
                value={addComma(values.amount, false)}
              />
              <input
                className={`flex-1 hide-input-arrows bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                placeholder={lang["rate"]}
                disabled={selectedSourceIndex < 0 || selectedTargetIndex < 0}
                name="rate"
                onBlur={(e) => {
                  handleBlur(e);
                  findError(
                    removeComma(values.amount),
                    removeComma(values.rate)
                  );
                }}
                onChange={(e) => {
                  handleChange(e);
                  findError(
                    removeComma(values.amount),
                    removeComma(values.rate)
                  );
                }}
                value={addComma(values.rate, true)}
              />
            </div>

            {values.amount &&
              removeComma(values.amount) !== 0 &&
              selectedCurrecnyPair &&
              (formDefaultRate ||
                (values.rate && removeComma(values.rate) !== 0)) && (
                <div className="mt-1 flex items-center">
                  {errorMessage && errorMessage !== "" ? (
                    <span
                      className={`text-red font-mine-regular mt-0.5 text-sm`}
                    >
                      {errorMessage}
                    </span>
                  ) : (
                    <>
                      <img
                        className="w-5 h-5"
                        src={require(`../../../../../Images/arrow-right-${oppositeTheme}.png`)}
                      />
                      <span
                        className={`text-${oppositeTheme} font-mine-regular mt-0.5 text-sm`}
                      >
                        {addComma(
                          isNumberFloat(
                            computingTargetAmount(
                              removeComma(values.amount),
                              removeComma(values.rate),
                              selectedCurrecnyPair.rate_multiplier
                            )
                          )
                            ? computingTargetAmount(
                                removeComma(values.amount),
                                removeComma(values.rate),
                                selectedCurrecnyPair.rate_multiplier
                              ).toFixed(selectedCurrecnyPair.floating_number)
                            : computingTargetAmount(
                                removeComma(values.amount),
                                removeComma(values.rate),
                                selectedCurrecnyPair.rate_multiplier
                              )
                        ) +
                          " " +
                          (availableTargets[selectedTargetIndex]
                            ? availableTargets[selectedTargetIndex].abbreviation
                            : "")}
                      </span>
                    </>
                  )}
                </div>
              )}

            <SubmitButton
              type="submit"
              onClick={handleSubmit}
              className={
                values.amount &&
                removeComma(values.amount) !== 0 &&
                (formDefaultRate ||
                  (values.rate && removeComma(values.rate) !== 0))
                  ? "flex justify-center mt-0.5 items-center w-full py-0.5"
                  : "flex justify-center mt-7 items-center w-full py-0.5"
              }
              rounded="lg"
            >
              {lang["submit"]}
            </SubmitButton>
          </form>
        );
      }}
    </Formik>
  );
}

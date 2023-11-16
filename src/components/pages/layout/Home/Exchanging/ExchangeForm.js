import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { CustomDropdown, CustomItem } from "../../../../common/CustomDropdown";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import {
  useAddComma,
  useRemoveComma,
} from "../../../../../hooks/useNumberFunctions";
import { useDirectionState } from "../../../../../Providers/DirectionProvider";
import SubmitButton from "../../../../common/SubmitButton";
import { useUserState } from "../../../../../Providers/UserProvider";
import { useExchange } from "../../../../../apis/pages/Home/hooks";

export default function ExchangeForm({
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
}) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const { one: oneDirection } = useDirectionState();

  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const user = useUserState();
  const addComma = useAddComma();
  const removeComma = useRemoveComma();

  const { exchange, isLoading: exchangeIsLoading } = useExchange();
  useEffect(
    () => setIsLoadingSplashScreen(exchangeIsLoading),
    [exchangeIsLoading]
  );

  const [errorMessage, setErrorMessage] = useState();
  const computingTargetAmount = (amount, rate, multi) => {
    if (selectedSourceIndex >= 0 && selectedTargetIndex >= 0) {
      if (!rateIsReversed) {
        return (amount * rate) / multi;
      } else {
        return amount / rate;
      }
    }
  };

  return (
    <Formik
      initialValues={{
        amount: "",
        rate: "",
      }}
      onSubmit={(values) => {}}
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
                  handleChange(e);
                }}
                value={values.rate}
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
                        ? availableTargets[selectedTargetIndex].abbreviation
                        : "")}
                  </span>
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

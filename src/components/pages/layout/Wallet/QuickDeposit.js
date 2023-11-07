import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { Formik } from "formik";
import { CustomDropdown, CustomItem } from "../../../common/CustomDropdown";
import SubmitButton from "../../../common/SubmitButton";
import { useGetCurrencies } from "../../../../apis/common/currency/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";

export default function QuickDeposit() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);
  const { getCurrencies, isLoading } = useGetCurrencies();
  useEffect(() => setIsLoadingSplashScreen(isLoading), [isLoading]);

  useEffect(() => {
    getCurrencies(setCurrencies);
  }, []);

  const locationDropdownClass =
    currencies[selectedCurrencyIndex] &&
    currencies[selectedCurrencyIndex].hasBranch
      ? "col-span-1 row-span-1 flex"
      : "hidden";
  const submitButtonClass =
    currencies[selectedCurrencyIndex] &&
    currencies[selectedCurrencyIndex].hasBranch
      ? "col-span-1 row-span-1 flex"
      : "col-span-2 row-span-1 flex";

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-row mb-2">
        <img
          className="w-7 h-7 -mt-1"
          src={require("../../../../Images/pages/layout/Wallet/deposit.png")}
        />
        <span className={`text-green text-xl font-mine-bold mx-1.5`}>
          {lang["deposit"]}
        </span>
      </div>
      <Formik initialValues={{ amount: "" }}>
        {({ handleChange, handleBlur, values, handleSubmit }) => (
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div className="col-span-1 row-span-1 flex">
              <CustomDropdown
                label={
                  selectedCurrencyIndex >= 0 &&
                  currencies[selectedCurrencyIndex] &&
                  currencies[selectedCurrencyIndex].abbreviation ? (
                    <span className={`text-${oppositeTheme} font-mine-regular`}>
                      {currencies[selectedCurrencyIndex].abbreviation}
                    </span>
                  ) : (
                    <span className="text-gray font-mine-regular">
                      {lang["currency"]}
                    </span>
                  )
                }
              >
                {currencies.map((currency, index) => {
                  if (index === 0 && index === currencies.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-xl"
                        onClick={() => setSelectedCurrencyIndex(index)}
                      >
                        {currency && currency.abbreviation
                          ? currency.abbreviation
                          : "error"}
                      </CustomItem>
                    );
                  } else if (index === 0) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-t-xl"
                        onClick={() => setSelectedCurrencyIndex(index)}
                      >
                        {currency && currency.abbreviation
                          ? currency.abbreviation
                          : "error"}
                      </CustomItem>
                    );
                  } else if (index === currencies.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-b-xl"
                        onClick={() => setSelectedCurrencyIndex(index)}
                      >
                        {currency && currency.abbreviation
                          ? currency.abbreviation
                          : "error"}
                      </CustomItem>
                    );
                  } else {
                    return (
                      <CustomItem
                        key={index}
                        onClick={() => setSelectedCurrencyIndex(index)}
                      >
                        {currency && currency.abbreviation
                          ? currency.abbreviation
                          : "error"}
                      </CustomItem>
                    );
                  }
                })}
              </CustomDropdown>
            </div>
            <div className={locationDropdownClass}>
              <CustomDropdown
                label={
                  <span className="text-gray font-mine-regular">
                    {lang["location"]}
                  </span>
                }
              ></CustomDropdown>
            </div>
            <div className="col-span-1 row-span-1 flex">
              <input
                className={`flex-1 hide-input-arrows text-center font-mine-regular text-${oppositeTheme} bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
                placeholder={lang["amount"]}
                name="amount"
                onBlur={handleBlur("amount")}
                onChange={handleChange("amount")}
                value={values.amount}
              />
            </div>
            <div className={submitButtonClass}>
              <SubmitButton
                className="w-full h-9"
                rounded="lg"
                onClick={handleSubmit}
              >
                Submit
              </SubmitButton>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

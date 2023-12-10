import { Formik } from "formik";
import React, { useState } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { CustomDropdown, CustomItem } from "../../../../common/CustomDropdown";
import { useCurrenciesState } from "../../../../../Providers/CurrenciesProvider";
import { useFontState } from "../../../../../Providers/FontProvider";

export default function Filters() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();

  const currencies = useCurrenciesState();
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState();

  return (
    <div className="h-full flex items-center">
      <Formik initialValues={{}}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <div className="flex-1 grid grid-cols-2 gap-5 grid-rows-2">
              <div className="col-span-1 row-span-1 flex flex-col">
                <span
                  className={`font-${font}-bold text-${oppositeTheme} text-lg`}
                >
                  {lang["person-code"]}
                </span>
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular py-1 mt-0.5 w-full rounded-lg text-${oppositeTheme}`}
                  type="text"
                  onChange={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  value={values.currentPassword}
                />
              </div>
              <div className="col-span-1 row-span-1 flex flex-col">
                <span
                  className={`font-${font}-bold text-${oppositeTheme} text-lg`}
                >
                  {lang["amount"]}
                </span>
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular py-1 mt-0.5 w-full rounded-lg text-${oppositeTheme}`}
                  type="text"
                  onChange={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  value={values.currentPassword}
                />
              </div>
              <div className="col-span-1 row-span-1 flex flex-col">
                <span
                  className={`font-${font}-bold text-${oppositeTheme} text-lg`}
                >
                  {lang["from-date"]}
                </span>
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular py-1 mt-0.5 w-full rounded-lg text-${oppositeTheme}`}
                  type="text"
                  onChange={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  value={values.currentPassword}
                />
              </div>
              <div className="col-span-1 row-span-1 flex flex-col">
                <span
                  className={`font-${font}-bold text-${oppositeTheme} text-lg`}
                >
                  {lang["until-date"]}
                </span>
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular py-1 mt-0.5 w-full rounded-lg text-${oppositeTheme}`}
                  type="text"
                  onChange={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  value={values.currentPassword}
                />
              </div>
            </div>
            <div className="flex flex-col mx-10 w-64">
              <span
                className={`font-${font}-bold text-${oppositeTheme} text-lg`}
              >
                {lang["currency"]}
              </span>
              <div className="w-full flex">
                <CustomDropdown
                  label={
                    selectedCurrencyIndex >= 0
                      ? currencies[selectedCurrencyIndex].abbreviation
                      : ""
                  }
                >
                  <CustomItem
                    key={0}
                    className="rounded-t-xl"
                    onClick={() => setSelectedCurrencyIndex(-1)}
                  >
                    ---
                  </CustomItem>
                  {currencies.map((currency, index) => {
                    if (index === currencies.length - 1) {
                      return (
                        <CustomItem
                          key={index + 1}
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
                          key={index + 1}
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
            </div>
            <div className="flex-1 grid grid-cols-2 gap-5 grid-rows-2">
              <div className="col-span-1 row-span-1 flex flex-col">
                <span
                  className={`font-${font}-bold text-${oppositeTheme} text-lg`}
                >
                  {lang["person-code"]}
                </span>
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular py-1 mt-0.5 w-full rounded-lg text-${oppositeTheme}`}
                  type="text"
                  onChange={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  value={values.currentPassword}
                />
              </div>
              <div className="col-span-1 row-span-1 flex flex-col">
                <span
                  className={`font-${font}-bold text-${oppositeTheme} text-lg`}
                >
                  {lang["amount"]}
                </span>
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular py-1 mt-0.5 w-full rounded-lg text-${oppositeTheme}`}
                  type="text"
                  onChange={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  value={values.currentPassword}
                />
              </div>
              <div className="col-span-1 row-span-1 flex flex-col">
                <span
                  className={`font-${font}-bold text-${oppositeTheme} text-lg`}
                >
                  {lang["from-date"]}
                </span>
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular py-1 mt-0.5 w-full rounded-lg text-${oppositeTheme}`}
                  type="text"
                  onChange={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  value={values.currentPassword}
                />
              </div>
              <div className="col-span-1 row-span-1 flex flex-col">
                <span
                  className={`font-${font}-bold text-${oppositeTheme} text-lg`}
                >
                  {lang["until-date"]}
                </span>
                <input
                  className={`bg-${theme} focus-outline-blue px-2.5 font-mint-regular py-1 mt-0.5 w-full rounded-lg text-${oppositeTheme}`}
                  type="text"
                  onChange={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  value={values.currentPassword}
                />
              </div>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}

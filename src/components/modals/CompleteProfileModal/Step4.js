import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";

import { CustomDropdown, CustomItem } from "../../common/CustomDropdown";
import { useGetCurrencies } from "../../../apis/common/currency/hooks";

export default function Step4({
  handleBlur,
  handleChange,
  values,
  setFieldValue,
  walletAsset,
  walletTank,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const { getCurrencies, isLoading: getCurrenciesIsLoading } =
    useGetCurrencies();
  useEffect(
    () => setIsLoadingSplashScreen(getCurrenciesIsLoading),
    [getCurrenciesIsLoading]
  );

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);
  useEffect(() => {
    getCurrencies(setCurrencies);
  }, []);

  

  if (handleBlur && handleChange && values) {
    return (
      <div className="w-full flex gap-x-10 my-5">
        <div className="flex-1">
          <form className="w-full h-full">
            <div className="flex-1 w-full flex flex-col gap-y-2">
              <span className={`font-mine-regular text-${oppositeTheme}`}>
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
            </div>
            <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
              <span className={`font-mine-regular text-${oppositeTheme}`}>
                {lang["number-of-document"]}
              </span>
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows bg-${theme}-back font-mine-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  name="identity_code"
                  onBlur={handleBlur("identity_code")}
                  onChange={handleChange("identity_code")}
                  value={values.identity_code ? values.identity_code : ""}
                />
              </div>
            </div>
            <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
              <span className={`font-mine-regular text-${oppositeTheme}`}>
                {lang["upload-document"]}
              </span>
              <div className="w-full flex"></div>
            </div>
          </form>
        </div>
        <div
          className={`flex-1 flex flex-col py-5 px-7 bg-${theme}-glass rounded-2xl`}
        >
          <div className="flex items-center gap-x-2">
            <img
              className="w-6 h-6"
              src={require(`../../../Images/common/info-${oppositeTheme}.png`)}
              alt="info"
            />
            <span className={`font-mine-bold text-${oppositeTheme} pt-1.5`}>
              {lang["note"]}
            </span>
          </div>
          <div className="mt-4 flex flex-col gap-y-3 text-gray font-mine-regular w-64">
            <span>{lang["complete-profile-modal-step4-note-1st"] + "."}</span>
            <span>{lang["complete-profile-modal-step4-note-2nd"] + "."}</span>
            <span>{lang["complete-profile-modal-step4-note-3rd"] + "."}</span>
          </div>
        </div>
      </div>
    );
  }
}

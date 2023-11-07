import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import { useGetCurrency } from "../../../../../apis/common/currency/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";

export default function CurrencyCard({ balance }) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const addComma = useAddComma();

  const { getCurrency, isLoading } = useGetCurrency();
  useEffect(() => setIsLoadingSplashScreen(isLoading), [isLoading]);

  const [currency, setCurrency] = useState();
  useEffect(() => {
    getCurrency(balance.currency, setCurrency);
  }, []);

  console.log(balance);

  if (currency) {
    return (
      <div
        className={`w-full flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-4 pb-4 px-5`}
      >
        <div className="flex flex-row font-mine-bold text-xl">
          {currency[`sym_pic_${oppositeTheme}`] ? (
            <img
              className="w-7 h-7 -mt-1"
              src={currency[`sym_pic_${oppositeTheme}`]}
            />
          ) : (
            <span className={`text-${oppositeTheme} font-mine-regular`}>
              {currency.abbreviation}
            </span>
          )}
          <span className={`text-${oppositeTheme}`}>
            {addComma(+balance.balance)}
          </span>
          <span className="text-gray mx-1">{balance.title}</span>
        </div>
        <div className="-mt-1.5  flex flex-col font-mine-regular items-center">
          <span className="text-green">
            {"+ " + addComma(+balance.pending) + " " + lang["pending"]}
          </span>
          <span className="text-red -mt-1">
            {"- " + addComma(+balance.locked) + " " + lang["locked"]}
          </span>
        </div>
        <div className="flex flex-col gap-y-2 font-mine-bold w-full text-sm items-center mt-1">
          <button className="border-2 border-blue text-blue rounded-lg pt-2 pb-0.5 w-9/12">
            {lang["transfer"]}
          </button>
          <button className="border-2 border-red text-red rounded-lg pt-2 pb-0.5 w-9/12">
            {lang["withdrawal"]}
          </button>
        </div>
      </div>
    );
  }
}

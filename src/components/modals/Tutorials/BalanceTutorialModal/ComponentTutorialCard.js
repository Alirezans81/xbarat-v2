import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { roundDown, useAddComma } from "../../../../hooks/useNumberFunctions";
import { useGetCurrency } from "../../../../apis/common/currency/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function ComponentTutorialCardBalance({
  walletAsset,
  setHovered,
  hovered,
}) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const addComma = useAddComma();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const { getCurrency, isLoading } = useGetCurrency();
  useEffect(() => setIsLoadingSplashScreen(isLoading), [isLoading]);

  const [currency, setCurrency] = useState();
  useEffect(() => {
    getCurrency(walletAsset.currency, setCurrency);
  }, []);
  useEffect(() => {
    console.log(hovered);
  }, [hovered]);
  if (currency) {
    return (
      <div
        className={`w-fit h-full flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-4 pb-4 px-10 gap-y-2`}
      >
        <div
          className={`flex flex-row font-${font}-bold text-xl max-w-[10rem] md:max-w-none overflow-x-auto scroll-horizental pt-2 bg-none  rounded-2xl `}
        >
          {currency[`sym_pic_${oppositeTheme}`] ? (
            <img
              className={`${
                hovered === "balance" ? "w-9 h-9" : "w-7 h-7"
              } -mt-1`}
              src={currency[`sym_pic_${oppositeTheme}`]}
            />
          ) : (
            <span
              className={`text-${oppositeTheme} text-${
                hovered === "balance" ? "3xl" : "xl"
              } font-${font}-regular`}
            >
              {currency && currency.abbreviation ? currency.abbreviation : ""}
            </span>
          )}
          <span
            className={`text-${oppositeTheme} text-${
              hovered === "balance" ? "3xl" : "xl"
            }`}
          >
            {addComma(
              roundDown(
                +walletAsset.balance,
                walletAsset.currency_floating_number || 0
              )
            )}
          </span>
          <span className="text-gray mx-1">{walletAsset.title}</span>
        </div>
        <div
          className={` md:mb-4 flex flex-col md:gap-y-0 font-${font}-regular items-center`}
        >
          <span
            className={`w-fit px-5 text-green text-center leading-none md:leading-snug -mt-1 transition-all duration-500 ${
              hovered === "pending" ? "font-black text-xl" : "font-light"
            } rounded-2xl`}
          >
            {"+ " +
              addComma(
                roundDown(
                  +walletAsset.pending,
                  walletAsset.currency_floating_number || 0
                )
              ) +
              " " +
              lang["pending"]}
          </span>
          <span
            className={`w-fit px-5 text-red text-center leading-none md:leading-snug mt-1 transition-all duration-500 ${
              hovered === "locked" ? "font-black text-xl" : "font-light"
            } rounded-2xl`}
          >
            {"+ " +
              addComma(
                roundDown(
                  +walletAsset.locked,
                  walletAsset.currency_floating_number || 0
                )
              ) +
              " " +
              lang["locked"]}
          </span>
        </div>
        <div
          className={`flex flex-col gap-y-2 font-${font}-bold w-fit text-sm items-center mt-5 md:mt-1`}
        >
          <div
            className={`border-2 border-blue border-solid text-blue rounded-lg  px-10 pt-2 pb-0.5 w-full  flex justify-center ${
              hovered === "transfer" ? "text-xl font-bold" : "text-sm"
            }`}
          >
            {lang["transfer"]}
          </div>
          <div
            className={`border-2 border-red border-solid text-red rounded-lg pt-2  px-10 pb-0.5 w-full transitioin-all duration-500 flex justify-center ${
              hovered === "withdraw" ? "text-xl font-bold" : "text-sm"
            }`}
          >
            {lang["withdrawal"]}
          </div>
        </div>
      </div>
    );
  }
}

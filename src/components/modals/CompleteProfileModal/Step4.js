import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import { CustomDropdown, CustomItem } from "../../common/CustomDropdown";
import { useGetWalletTankTypes } from "../../../apis/common/wallet/hooks";
import { useCurrenciesState } from "../../../Providers/CurrenciesProvider";
import { useFontState } from "../../../Providers/FontProvider";

export default function Step4({
  handleBlur,
  handleChange,
  values,
  setFieldValue,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const currencies = useCurrenciesState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const { getWalletTankTypes, isLoading: getWalletTankTypesIsLoading } =
    useGetWalletTankTypes();
  useEffect(
    () => setIsLoadingSplashScreen(getWalletTankTypesIsLoading),
    [getWalletTankTypesIsLoading]
  );

  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);
  const [walletTankTypes, setWalletTankTypes] = useState([]);
  const [selectedWalletTankType, setSelectedWalletTankType] = useState(-1);

  useEffect(() => {
    getWalletTankTypes({}, setWalletTankTypes);
  }, []);

  useEffect(() => {
    selectedCurrencyIndex >= 0 &&
      currencies[selectedCurrencyIndex] &&
      currencies[selectedCurrencyIndex].url &&
      setFieldValue(
        "wallet_asset_currency",
        currencies[selectedCurrencyIndex].url
      );
  }, [selectedCurrencyIndex]);
  useEffect(() => {
    selectedWalletTankType >= 0 &&
      walletTankTypes[selectedWalletTankType] &&
      walletTankTypes[selectedWalletTankType].url &&
      setFieldValue(
        "wallet_tank_type",
        walletTankTypes[selectedWalletTankType].url
      );
  }, [selectedWalletTankType]);

  if (handleBlur && handleChange && values) {
    return (
      <div className="w-full flex gap-x-10 my-5">
        <div className="flex-1">
          <form className="w-full h-full">
            <div className="flex-1 w-full flex flex-col gap-y-2">
              <span className={`font-${font}-regular text-${oppositeTheme}`}>
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
              <span className={`font-${font}-regular text-${oppositeTheme}`}>
                {lang["type-of-document"]}
              </span>
              <div className="w-full flex">
                <CustomDropdown
                  label={
                    selectedWalletTankType >= 0
                      ? walletTankTypes[selectedWalletTankType].title
                      : ""
                  }
                >
                  {walletTankTypes.map((walletTankType, index) => {
                    if (index === 0 && index === walletTankTypes.length - 1) {
                      return (
                        <CustomItem
                          key={index}
                          className="rounded-xl"
                          onClick={() => setSelectedWalletTankType(index)}
                        >
                          {walletTankType && walletTankType.title
                            ? walletTankType.title
                            : "error"}
                        </CustomItem>
                      );
                    } else if (index === 0) {
                      return (
                        <CustomItem
                          key={index}
                          className="rounded-t-xl"
                          onClick={() => setSelectedWalletTankType(index)}
                        >
                          {walletTankType && walletTankType.title
                            ? walletTankType.title
                            : "error"}
                        </CustomItem>
                      );
                    } else if (index === walletTankTypes.length - 1) {
                      return (
                        <CustomItem
                          key={index}
                          className="rounded-b-xl"
                          onClick={() => setSelectedWalletTankType(index)}
                        >
                          {walletTankType && walletTankType.title
                            ? walletTankType.title
                            : "error"}
                        </CustomItem>
                      );
                    } else {
                      return (
                        <CustomItem
                          key={index}
                          onClick={() => setSelectedWalletTankType(index)}
                        >
                          {walletTankType && walletTankType.title
                            ? walletTankType.title
                            : "error"}
                        </CustomItem>
                      );
                    }
                  })}
                </CustomDropdown>
              </div>
            </div>
            <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
              <span className={`font-${font}-regular text-${oppositeTheme}`}>
                {lang["bank-account-title"]}
              </span>
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows bg-${theme}-back font-${font}-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  name="title"
                  onBlur={handleBlur("title")}
                  onChange={handleChange("title")}
                  value={values.title ? values.title : ""}
                />
              </div>
            </div>
            <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
              <span className={`font-${font}-regular text-${oppositeTheme}`}>
                {lang["bank-account-number"]}
              </span>
              <div className="w-full flex">
                <input
                  className={`flex-1 hide-input-arrows bg-${theme}-back font-${font}-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                  name="bank_info"
                  onBlur={handleBlur("bank_info")}
                  onChange={handleChange("bank_info")}
                  value={values.bank_info ? values.bank_info : ""}
                />
              </div>
            </div>
          </form>
        </div>
        <div
          className={`flex-1 hidden md:flex flex-col py-5 px-7 bg-${theme}-glass rounded-2xl`}
        >
          <div className="flex items-center gap-x-2">
            <img
              className="w-6 h-6"
              src={require(`../../../Images/common/info-${oppositeTheme}.png`)}
              alt="info"
            />
            <span className={`font-${font}-bold text-${oppositeTheme} pt-1.5`}>
              {lang["note"]}
            </span>
          </div>
          <div
            className={`mt-4 flex flex-col gap-y-3 text-gray font-${font}-regular w-64`}
          >
            <span>{lang["complete-profile-modal-step4-note-1st"] + "."}</span>
            <span>{lang["complete-profile-modal-step4-note-2nd"] + "."}</span>
            <span>{lang["complete-profile-modal-step4-note-3rd"] + "."}</span>
          </div>
        </div>
      </div>
    );
  }
}

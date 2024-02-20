import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import { CustomDropdown, CustomItem } from "../../common/CustomDropdown";
import { useGetWalletTankTypes } from "../../../apis/common/wallet/hooks";
import { useFontState } from "../../../Providers/FontProvider";
import { CustomTooltip } from "../../common/CustomTooltip";

const Note = ({ lang, font }) => {
  return (
    <div
      className={`flex flex-col gap-y-5 text-gray font-${font}-regular w-72 px-2 pt-1.5 pb-0.5`}
    >
      <span>{"•	" + lang["complete-profile-modal-step4-note-1st"] + "."}</span>
      <span>{"•	" + lang["complete-profile-modal-step4-note-2nd"] + "."}</span>
      <span>{"•	" + lang["complete-profile-modal-step4-note-3rd"] + "."}</span>
    </div>
  );
};

export default function Step4({
  currencies,
  selectedCurrencyIndex,
  setSelectedCurrencyIndex,
  handleBlur,
  handleChange,
  values,
  setFieldValue,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const { getWalletTankTypes, isLoading: getWalletTankTypesIsLoading } =
    useGetWalletTankTypes();
  useEffect(
    () => setIsLoadingSplashScreen(getWalletTankTypesIsLoading),
    [getWalletTankTypesIsLoading]
  );

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
      <div className="flex flex-col">
        <div
          className={`w-full bg-${theme}-glass px-0.5 py-3 md:py-1 rounded-xl flex items-center`}
        >
          <img
            className="w-10 h-10"
            src={require(`../../../Images/exclamation.png`)}
            alt="info"
          />
          <span
            className={`text-yellow text-sm md:text-base font-${font}-regular -mb-1`}
          >
            {lang["complete-profile-step-4-not-required-message-1st"] +
              ". " +
              lang["complete-profile-step-4-not-required-message-2nd"] +
              "."}
          </span>
        </div>
        <div className="w-full flex gap-x-10 my-5 relative">
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
              <span
                className={`font-${font}-bold text-${oppositeTheme} pt-1.5`}
              >
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

          <div className="absolute md:hidden right-0 top-0">
            <CustomTooltip
              style={oppositeTheme}
              content={<Note lang={lang} font={font} theme={theme} />}
              placement="bottom"
            >
              <div className="flex items-center gap-x-1.5">
                <img
                  className="w-6 h-6"
                  src={require(`../../../Images/common/info-${oppositeTheme}.png`)}
                />
                <span
                  className={`font-${font}-bold text-${oppositeTheme} -mb-1.5`}
                >
                  {lang["note"]}
                </span>
              </div>
            </CustomTooltip>
          </div>
        </div>
      </div>
    );
  }
}

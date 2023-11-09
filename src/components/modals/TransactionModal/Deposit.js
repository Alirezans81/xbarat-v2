import React, { useEffect, useState } from "react";
import { useUserState } from "../../../Providers/UserProvider";
import { Formik } from "formik";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useGetCurrencies } from "../../../apis/common/currency/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import { CustomDropdown, CustomItem } from "../../common/CustomDropdown";
import {
  useGetWalletAssets,
  useGetWalletTanks,
} from "../../../apis/common/wallet/hooks";

export default function Deposit() {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const userInfo = useUserState();

  const { getCurrencies, isLoading: getCurrenciesIsLoading } =
    useGetCurrencies();
  useEffect(
    () => setIsLoadingSplashScreen(getCurrenciesIsLoading),
    [getCurrenciesIsLoading]
  );
  const { getWalletAssets, isLoading: getWalletAssetsIsLoading } =
    useGetWalletAssets();
  useEffect(
    () => setIsLoadingSplashScreen(getWalletAssetsIsLoading),
    [getWalletAssetsIsLoading]
  );
  const { getWalletTanks, isLoading: getWalletTanksIsLoading } =
    useGetWalletTanks();
  useEffect(
    () => setIsLoadingSplashScreen(getWalletTanksIsLoading),
    [getWalletTanksIsLoading]
  );

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);
  useEffect(() => {
    getCurrencies(setCurrencies);
  }, []);

  const [walletAssets, setWalletAssets] = useState([]);
  useEffect(() => {
    selectedCurrencyIndex >= 0 &&
      currencies[selectedCurrencyIndex] &&
      currencies[selectedCurrencyIndex].slug &&
      getWalletAssets(
        { currency: currencies[selectedCurrencyIndex].slug },
        setWalletAssets
      );
  }, [selectedCurrencyIndex]);
  const walletAsset = walletAssets[0] ? walletAssets[0] : null;

  const [walletTanks, setWalletTanks] = useState([]);
  useEffect(() => {
    walletAsset &&
      getWalletTanks(
        {
          wallet_asset: walletAsset && walletAsset.slug ? walletAsset.slug : "",
        },
        setWalletTanks
      );
  }, [walletAssets]);
  const [selectedWalletTankIndex, setSelectedWalletTankIndex] = useState(-1);

  return (
    <Formik initialValues={{}}>
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <form className="flex flex-col">
          <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
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
              {lang["bank-account"]}
            </span>
            <div className="w-full flex">
              <CustomDropdown
                label={
                  selectedWalletTankIndex >= 0
                    ? walletTanks[selectedWalletTankIndex].title
                    : ""
                }
              >
                {walletTanks.map((walletTank, index) => {
                  if (index === 0 && index === walletTanks.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-xl"
                        onClick={() => setSelectedWalletTankIndex(index)}
                      >
                        {walletTank && walletTank.title
                          ? walletTank.title
                          : "error"}
                      </CustomItem>
                    );
                  } else if (index === 0) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-t-xl"
                        onClick={() => setSelectedWalletTankIndex(index)}
                      >
                        {walletTank && walletTank.title
                          ? walletTank.title
                          : "error"}
                      </CustomItem>
                    );
                  } else if (index === walletTanks.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-b-xl"
                        onClick={() => setSelectedWalletTankIndex(index)}
                      >
                        {walletTank && walletTank.title
                          ? walletTank.title
                          : "error"}
                      </CustomItem>
                    );
                  } else {
                    return (
                      <CustomItem
                        key={index}
                        onClick={() => setSelectedWalletTankIndex(index)}
                      >
                        {walletTank && walletTank.title
                          ? walletTank.title
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
              {lang["amount"]}
            </span>
            <div className="w-full flex">
              <input
                className={`flex-1 hide-input-arrows bg-${theme}-back font-mine-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                name="amount"
                onBlur={handleBlur("amount")}
                onChange={handleChange("amount")}
                value={values.amount ? values.amount : ""}
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
}

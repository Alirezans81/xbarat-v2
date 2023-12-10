import React, { useEffect, useState } from "react";
import { useUserState } from "../../../Providers/UserProvider";
import { Formik } from "formik";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useGetBranches } from "../../../apis/common/branch/hooks";
import { useCreateWithdrawal } from "../../../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import { CustomDropdown, CustomItem } from "../../common/CustomDropdown";
import { useAddComma, useRemoveComma } from "../../../hooks/useNumberFunctions";
import SubmitButton from "../../common/SubmitButton";
import { useGetWalletTankByCurrency } from "../../../hooks/useWalletFilter";
import { useStatusesState } from "../../../Providers/StatusesProvider";
import { useFontState } from "../../../Providers/FontProvider";

export default function Withdrawal({
  currencies,
  data,
  closeModal,
  refreshPendingRequests,
  getWalletData,
}) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const addComma = useAddComma();
  const removeComma = useRemoveComma();

  const getWalletTankByCurrency = useGetWalletTankByCurrency();
  const userInfo = useUserState();
  const statuses = useStatusesState();

  const { getBranches, isLoading: getBranchesIsLoading } = useGetBranches();
  useEffect(
    () => setIsLoadingSplashScreen(getBranchesIsLoading),
    [getBranchesIsLoading]
  );
  const { createWithdrawal, isLoading: createWithdrawalIsLoading } =
    useCreateWithdrawal();
  useEffect(
    () => setIsLoadingSplashScreen(createWithdrawalIsLoading),
    [createWithdrawalIsLoading]
  );

  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);
  const [walletTanks, setWalletTanks] = useState([]);
  const [selectedWalletTankIndex, setSelectedWalletTankIndex] = useState(-1);
  const [locations, setLocations] = useState([]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
  const [locationDivClass, setLocationDivClass] = useState("");

  useEffect(() => {
    currencies[selectedCurrencyIndex] &&
      currencies[selectedCurrencyIndex].url &&
      setWalletTanks(
        getWalletTankByCurrency(currencies[selectedCurrencyIndex].url)
      );

    if (
      currencies[selectedCurrencyIndex] &&
      currencies[selectedCurrencyIndex].has_branches
    ) {
      getBranches(
        { currencies: currencies[selectedCurrencyIndex].slug },
        setLocations
      );
      setLocationDivClass("flex-1 w-full flex flex-col gap-y-2 mt-5");
    } else {
      setLocationDivClass("hidden");
    }
  }, [selectedCurrencyIndex]);

  return (
    <Formik
      initialValues={{ amount: "" }}
      onSubmit={(values) => {
        if (
          currencies[selectedCurrencyIndex] &&
          currencies[selectedCurrencyIndex].has_branches
        ) {
          createWithdrawal(
            {
              user_receiver: userInfo && userInfo.url ? userInfo.url : "",
              currency:
                currencies[selectedCurrencyIndex] &&
                currencies[selectedCurrencyIndex].url
                  ? currencies[selectedCurrencyIndex].url
                  : "",
              wallet_tank_receiver:
                walletTanks[selectedWalletTankIndex] &&
                walletTanks[selectedWalletTankIndex].url
                  ? walletTanks[selectedWalletTankIndex].url
                  : "",
              amount: removeComma(values.amount),
              status: statuses
                ? statuses.find((status) => status.title === "Admin Assign").url
                : "",
              branch:
                locations[selectedLocationIndex] &&
                locations[selectedLocationIndex].url
                  ? locations[selectedLocationIndex].url
                  : "",
            },
            () => {
              getWalletData();
              refreshPendingRequests();
              closeModal();
            }
          );
        } else {
          createWithdrawal(
            {
              user_receiver: userInfo && userInfo.url ? userInfo.url : "",
              currency:
                currencies[selectedCurrencyIndex] &&
                currencies[selectedCurrencyIndex].url
                  ? currencies[selectedCurrencyIndex].url
                  : "",
              wallet_tank_receiver:
                walletTanks[selectedWalletTankIndex] &&
                walletTanks[selectedWalletTankIndex].url
                  ? walletTanks[selectedWalletTankIndex].url
                  : "",
              amount: removeComma(values.amount),
              status: statuses
                ? statuses.find((status) => status.title === "Admin Assign").url
                : "",
            },
            () => {
              getWalletData();
              refreshPendingRequests();
              closeModal();
            }
          );
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <div className="flex flex-col">
          <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
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
              {lang["bank-account"]}
            </span>
            <div className="w-full flex">
              <CustomDropdown
                label={
                  selectedWalletTankIndex >= 0 &&
                  walletTanks[selectedWalletTankIndex] &&
                  walletTanks[selectedWalletTankIndex].title
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
                        {walletTank && walletTank.abbreviation
                          ? walletTank.abbreviation
                          : "error"}
                      </CustomItem>
                    );
                  }
                })}
              </CustomDropdown>
            </div>
          </div>
          <div className={locationDivClass}>
            <span className={`font-${font}-regular text-${oppositeTheme}`}>
              {lang["location"]}
            </span>
            <div className="w-full flex">
              <CustomDropdown
                label={
                  selectedLocationIndex >= 0 &&
                  locations[selectedLocationIndex] &&
                  locations[selectedLocationIndex].title
                    ? locations[selectedLocationIndex].title
                    : ""
                }
              >
                {locations.map((location, index) => {
                  if (index === 0 && index === locations.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-xl"
                        onClick={() => setSelectedLocationIndex(index)}
                      >
                        {location && location.title ? location.title : "error"}
                      </CustomItem>
                    );
                  } else if (index === 0) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-t-xl"
                        onClick={() => setSelectedLocationIndex(index)}
                      >
                        {location && location.title ? location.title : "error"}
                      </CustomItem>
                    );
                  } else if (index === locations.length - 1) {
                    return (
                      <CustomItem
                        key={index}
                        className="rounded-b-xl"
                        onClick={() => setSelectedLocationIndex(index)}
                      >
                        {location && location.title ? location.title : "error"}
                      </CustomItem>
                    );
                  } else {
                    return (
                      <CustomItem
                        key={index}
                        onClick={() => setSelectedLocationIndex(index)}
                      >
                        {location && location.title ? location.title : "error"}
                      </CustomItem>
                    );
                  }
                })}
              </CustomDropdown>
            </div>
          </div>
          <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
            <span className={`font-${font}-regular text-${oppositeTheme}`}>
              {lang["amount"]}
            </span>
            <div className="w-full flex">
              <input
                className={`flex-1 hide-input-arrows bg-${theme}-back font-${font}-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                name="amount"
                onBlur={handleBlur("amount")}
                onChange={handleChange("amount")}
                value={values.amount ? addComma(values.amount) : ""}
              />
            </div>
          </div>
          <div className="mt-10">
            <SubmitButton
              onClick={handleSubmit}
              className="w-full py-0.5 text-lg"
              rounded="lg"
            >
              {lang["submit"]}
            </SubmitButton>
          </div>
        </div>
      )}
    </Formik>
  );
}

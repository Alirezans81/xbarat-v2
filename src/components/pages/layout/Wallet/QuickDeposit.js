import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { Formik } from "formik";
import { CustomDropdown, CustomItem } from "../../../common/CustomDropdown";
import SubmitButton from "../../../common/SubmitButton";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import { useGetBranches } from "../../../../apis/common/branch/hooks";
import { useCreateDeposit } from "../../../../apis/common/wallet/hooks";
import { useUserState } from "../../../../Providers/UserProvider";
import {
  useAddComma,
  useRemoveComma,
} from "../../../../hooks/useNumberFunctions";
import { useStatusesState } from "../../../../Providers/StatusesProvider";
import { useCurrenciesState } from "../../../../Providers/CurrenciesProvider";
import { useGetWalletData } from "../../../../Providers/WalletProvider";
import { useFontState } from "../../../../Providers/FontProvider";

export default function QuickDeposit({ refreshPendingRequests }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const userInfo = useUserState();
  const addComma = useAddComma();
  const removeComma = useRemoveComma();

  const statuses = useStatusesState();
  const getWalletData = useGetWalletData();

  const currencies = useCurrenciesState();
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);
  const [locations, setLocations] = useState([]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);

  const { getBranches, isLoading: getBranchesIsLoading } = useGetBranches();
  useEffect(
    () => setIsLoadingSplashScreen(getBranchesIsLoading),
    [getBranchesIsLoading]
  );

  const [submitButtonClass, setSubmitButtonClass] = useState("");
  const [locationDropdownClass, setLocationDropdownClass] = useState("");
  useEffect(() => {
    if (
      currencies[selectedCurrencyIndex] &&
      currencies[selectedCurrencyIndex].has_branches
    ) {
      getBranches(
        { currencies: currencies[selectedCurrencyIndex].slug },
        setLocations
      );

      setLocationDropdownClass("col-span-1 row-span-1 flex");
      setSubmitButtonClass("col-span-1 row-span-1 flex");
    } else {
      setLocationDropdownClass("hidden");
      setSubmitButtonClass("col-span-2 row-span-1 flex");
    }
  }, [selectedCurrencyIndex]);

  const { createDeposit, isLoading: createDepositIsLoading } =
    useCreateDeposit();
  useEffect(
    () => setIsLoadingSplashScreen(createDepositIsLoading),
    [createDepositIsLoading]
  );

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-row mb-2">
        <img
          className="w-7 h-7 -mt-1"
          src={require("../../../../Images/pages/layout/Wallet/deposit.png")}
        />
        <span className={`text-green text-xl font-${font}-bold mx-1.5`}>
          {lang["deposit"]}
        </span>
      </div>
      <Formik
        initialValues={{ amount: "" }}
        onSubmit={(values) => {
          if (
            currencies[selectedCurrencyIndex] &&
            currencies[selectedCurrencyIndex].has_branches
          ) {
            createDeposit(
              {
                user_sender: userInfo && userInfo.url ? userInfo.url : "",
                currency:
                  currencies[selectedCurrencyIndex] &&
                  currencies[selectedCurrencyIndex].url
                    ? currencies[selectedCurrencyIndex].url
                    : "",
                amount: removeComma(values.amount),
                status: statuses
                  ? statuses.find((status) => status.title === "Admin Assign")
                      .url
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
              }
            );
          } else {
            createDeposit(
              {
                user_sender: userInfo && userInfo.url ? userInfo.url : "",
                currency:
                  currencies[selectedCurrencyIndex] &&
                  currencies[selectedCurrencyIndex].url
                    ? currencies[selectedCurrencyIndex].url
                    : "",
                amount: removeComma(values.amount),
                status: statuses
                  ? statuses.find((status) => status.title === "Admin Assign")
                      .url
                  : "",
              },
              () => {
                getWalletData();
                refreshPendingRequests();
              }
            );
          }
        }}
      >
        {({ handleChange, handleBlur, values, handleSubmit }) => (
          <div className="grid grid-cols-2 grid-rows-2 gap-2">
            <div className="col-span-1 row-span-1 flex">
              <CustomDropdown
                label={
                  selectedCurrencyIndex >= 0 &&
                  currencies[selectedCurrencyIndex] &&
                  currencies[selectedCurrencyIndex].abbreviation ? (
                    <span
                      className={`text-${oppositeTheme} font-${font}-regular`}
                    >
                      {currencies[selectedCurrencyIndex].abbreviation}
                    </span>
                  ) : (
                    <span className={`text-gray font-${font}-regular`}>
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
                  selectedLocationIndex >= 0 &&
                  locations[selectedLocationIndex] &&
                  locations[selectedLocationIndex].title ? (
                    locations[selectedLocationIndex].title
                  ) : (
                    <span className={`text-gray font-${font}-regular`}>
                      {lang["location"]}
                    </span>
                  )
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
            <div className="col-span-1 row-span-1 flex">
              <input
                className={`flex-1 hide-input-arrows text-center font-${font}-regular text-${oppositeTheme} bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
                placeholder={lang["amount"]}
                name="amount"
                onBlur={handleBlur("amount")}
                onChange={handleChange("amount")}
                value={values && values.amount ? addComma(values.amount) : ""}
              />
            </div>
            <div className={submitButtonClass}>
              <SubmitButton
                type="button"
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

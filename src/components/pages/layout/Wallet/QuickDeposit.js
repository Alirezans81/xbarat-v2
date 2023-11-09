import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { Formik } from "formik";
import { CustomDropdown, CustomItem } from "../../../common/CustomDropdown";
import SubmitButton from "../../../common/SubmitButton";
import { useGetCurrencies } from "../../../../apis/common/currency/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import { useGetBranches } from "../../../../apis/common/branch/hooks";
import { useCreateDeposit } from "../../../../apis/common/wallet/hooks";
import { useUserState } from "../../../../Providers/UserProvider";

export default function QuickDeposit() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const userInfo = useUserState();

  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);
  const [locations, setLocations] = useState([]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);
  const { getCurrencies, isLoading: getCurrenciesIsLoading } =
    useGetCurrencies();
  useEffect(
    () => setIsLoadingSplashScreen(getCurrenciesIsLoading),
    [getCurrenciesIsLoading]
  );
  const { getBranches, isLoading: getBranchesIsLoading } = useGetBranches();
  useEffect(
    () => setIsLoadingSplashScreen(getBranchesIsLoading),
    [getBranchesIsLoading]
  );

  useEffect(() => {
    getCurrencies(setCurrencies);
  }, []);

  const [locationDropdownClass, setLocationDropdownClass] = useState("");
  const [submitButtonClass, setSubmitButtonClass] = useState("");
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
      <Formik
        initialValues={{ amount: "" }}
        onSubmit={(values) => {
          createDeposit({
            user_sender: userInfo && userInfo.url ? userInfo.url : "",
            currency:
              currencies[selectedCurrencyIndex] &&
              currencies[selectedCurrencyIndex].url
                ? currencies[selectedCurrencyIndex].url
                : "",
            amount: values.amount,
            branch:
              locations[selectedLocationIndex] &&
              locations[selectedLocationIndex].url
                ? locations[selectedLocationIndex].url
                : "",
          });
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
                  selectedLocationIndex >= 0 &&
                  locations[selectedLocationIndex] &&
                  locations[selectedLocationIndex].title ? (
                    locations[selectedLocationIndex].title
                  ) : (
                    <span className="text-gray font-mine-regular">
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

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
import { useRefreshWallet } from "../../../../hooks/useRefreshWallet";
import { useFontState } from "../../../../Providers/FontProvider";
import { useToastDataSetState } from "../../../../Providers/ToastDataProvider";
import { useModalDataSetState } from "../../../../Providers/ModalDataProvider";
import CompleteProfileModal from "../../../modals/CompleteProfileModal";

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
  const refreshWallet = useRefreshWallet();

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

  const setToastData = useToastDataSetState();
  const openCompleteProfileMessageToast = () => {
    setToastData({
      status: "failed",
      message: lang["complete-profile-toast-message"] + ".",
      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };

  const setModalData = useModalDataSetState();
  const openCompleteProfileModal = () => {
    setModalData({
      title: "",
      children: <CompleteProfileModal />,
      canClose: false,
      isOpen: true,
    });
  };

  const openNotRightAmountToast = (min, max) => {
    setToastData({
      status: "failed",
      message:
        lang["deposit-amount-error-message-1st"] +
        " " +
        addComma(min) +
        " " +
        lang["deposit-amount-error-message-2nd"] +
        " " +
        addComma(max) +
        " " +
        lang["deposit-amount-error-message-3rd"] +
        ".",
      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };
  const openDepositSummary = (amount, currency) => {
    setToastData({
      status: "success",
      message:
        lang["your_deposit_of"] +
        " " +
        addComma(amount) +
        " " +
        currency.abbreviation +
        " " +
        lang["was_made_succesfully"],

      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };
  const checkAmount = (amount) => {
    if (currencies[selectedCurrencyIndex]) {
      const min =
        +currencies[selectedCurrencyIndex].min_deposit_lot *
        +currencies[selectedCurrencyIndex].lot;
      const max =
        +currencies[selectedCurrencyIndex].max_deposit_lot *
        +currencies[selectedCurrencyIndex].lot;

      if (min <= amount && max >= amount) {
        openDepositSummary(amount, currencies[selectedCurrencyIndex]);
        return true;
      } else {
        openNotRightAmountToast(min, max);
        return false;
      }
    }
  };

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
        onSubmit={(values, { resetForm }) => {
          if (userInfo && userInfo.is_verified) {
            if (checkAmount(+removeComma(values.amount))) {
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
                      ? statuses.find(
                          (status) => status.title === "Admin Assign"
                        ).url
                      : "",
                    branch:
                      locations[selectedLocationIndex] &&
                      locations[selectedLocationIndex].url
                        ? locations[selectedLocationIndex].url
                        : "",
                  },
                  () => {
                    setSelectedCurrencyIndex(-1);
                    resetForm();
                    refreshWallet();
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
                      ? statuses.find(
                          (status) => status.title === "Admin Assign"
                        ).url
                      : "",
                  },
                  () => {
                    setSelectedCurrencyIndex(-1);
                    resetForm();
                    refreshWallet();
                    refreshPendingRequests();
                  }
                );
              }
            }
          } else {
            openCompleteProfileMessageToast();
            openCompleteProfileModal();
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
                searchable
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
                searchable
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
                className={`flex-1 hide-input-arrows text-center-important font-${font}-regular text-${oppositeTheme} bg-${theme}-back px-3 outline-1 h-9 outline-white rounded-lg w-full pt-2 pb-1`}
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
                {lang["submit"]}
              </SubmitButton>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
}

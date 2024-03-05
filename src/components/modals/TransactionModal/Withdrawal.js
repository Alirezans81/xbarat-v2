import React, { useEffect, useState } from "react";
import { useUserState } from "../../../Providers/UserProvider";
import { Formik } from "formik";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useGetBranches } from "../../../apis/common/branch/hooks";
import {
  useCreateWalletTank,
  useCreateWithdrawal,
  useGetWalletTankTypes,
} from "../../../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import { CustomDropdown, CustomItem } from "../../common/CustomDropdown";
import { useAddComma, useRemoveComma } from "../../../hooks/useNumberFunctions";
import SubmitButton from "../../common/SubmitButton";
import {
  useGetWalletAssetByCurrency,
  useGetWalletTankByCurrency,
} from "../../../hooks/useWalletFilter";
import { useStatusesState } from "../../../Providers/StatusesProvider";
import { useFontState } from "../../../Providers/FontProvider";
import { useToastDataSetState } from "../../../Providers/ToastDataProvider";

export default function Withdrawal({
  currencies,
  data,
  closeModal,
  refreshPendingRequests,
  getWalletData,
  amount,
}) {
  const lang = useLanguageState();
  const font = useFontState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const user = useUserState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const addComma = useAddComma();
  const removeComma = useRemoveComma();

  const setToastData = useToastDataSetState();
  const openNotEnoughBalanceToast = () => {
    setToastData({
      status: "failed",
      message:
        lang["not-enough-balance-toast-message-1st"] +
        ". " +
        lang["not-enough-balance-toast-message-2nd"] +
        " " +
        addComma(+walletAsset.balance),
      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };

  const [walletAsset, setWalletAsset] = useState();
  const getWalletAssetByCurrency = useGetWalletAssetByCurrency();

  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);
  useEffect(() => {
    const currencyUrl = data && data.currency ? data.currency : "";
    const foundIndex = currencies.findIndex(
      (currency) => currency.url === currencyUrl
    );
    setSelectedCurrencyIndex(foundIndex);
  }, []);

  useEffect(() => {
    selectedCurrencyIndex >= 0 &&
      currencies[selectedCurrencyIndex] &&
      setWalletAsset(
        getWalletAssetByCurrency(currencies[selectedCurrencyIndex].url)
      );
  }, [selectedCurrencyIndex]);

  const [newCardMode, setNewCardMode] = useState(false);

  const getWalletTankByCurrency = useGetWalletTankByCurrency();
  const userInfo = useUserState();
  const statuses = useStatusesState();

  const { getBranches, isLoading: getBranchesIsLoading } = useGetBranches();
  useEffect(
    () => setIsLoadingSplashScreen(getBranchesIsLoading),
    [getBranchesIsLoading]
  );

  const { createWalletTank, isLoading: createWalletTankIsLoading } =
    useCreateWalletTank();
  useEffect(
    () => setIsLoadingSplashScreen(createWalletTankIsLoading),
    [createWalletTankIsLoading]
  );

  const { createWithdrawal, isLoading: createWithdrawalIsLoading } =
    useCreateWithdrawal();
  useEffect(
    () => setIsLoadingSplashScreen(createWithdrawalIsLoading),
    [createWithdrawalIsLoading]
  );

  const [walletTanks, setWalletTanks] = useState([]);
  const [selectedWalletTankIndex, setSelectedWalletTankIndex] = useState(-1);
  const [locations, setLocations] = useState([]);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState(-1);

  const [locationDivClass, setLocationDivClass] = useState("");
  const [bankAccountDivClass, setBankAccountDivClass] = useState("");

  const [walletTankTypes, setWalletTankTypes] = useState([]);
  const [selectedWalletTankType, setSelectedWalletTankType] = useState(-1);

  const { getWalletTankTypes, isLoading: getWalletTankTypesIsLoading } =
    useGetWalletTankTypes();
  useEffect(
    () => setIsLoadingSplashScreen(getWalletTankTypesIsLoading),
    [getWalletTankTypesIsLoading]
  );
  useEffect(() => {
    newCardMode && getWalletTankTypes({}, setWalletTankTypes);
  }, [newCardMode]);

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
      setBankAccountDivClass("hidden");
    } else {
      setLocationDivClass("hidden");
      setBankAccountDivClass("flex-1 w-full flex flex-col gap-y-2 mt-5");
    }
  }, [selectedCurrencyIndex]);

  const openNotRightAmountToast = (min, max) => {
    setToastData({
      status: "failed",
      message:
        lang["withdrawal-amount-error-message-1st"] +
        " " +
        addComma(min) +
        " " +
        lang["withdrawal-amount-error-message-2nd"] +
        " " +
        addComma(max) +
        " " +
        lang["withdrawal-amount-error-message-3rd"] +
        ".",
      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };
  const checkAmount = (amount) => {
    if (currencies[selectedCurrencyIndex]) {
      const min =
        +currencies[selectedCurrencyIndex].min_withdrawal_lot *
        +currencies[selectedCurrencyIndex].lot;
      const max =
        +currencies[selectedCurrencyIndex].max_withdrawal_lot *
        +currencies[selectedCurrencyIndex].lot;

      if (min <= amount && max >= amount) {
        return true;
      } else {
        openNotRightAmountToast(min, max);
        return false;
      }
    }
  };

  return (
    <Formik
      initialValues={{ amount: amount || "", title: "", bank_info: "" }}
      onSubmit={(values) => {
        if (checkAmount(+removeComma(values.amount))) {
          if (+removeComma(values.amount) <= +walletAsset.balance) {
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
                  closeModal();
                  refreshPendingRequests();
                  getWalletData();
                }
              );
            } else {
              if (newCardMode) {
                const createWalletTankParams = {
                  user: user && user.url ? user.url : "",
                  currency:
                    currencies[selectedCurrencyIndex] &&
                    currencies[selectedCurrencyIndex].url
                      ? currencies[selectedCurrencyIndex].url
                      : "",
                  title: values.title,
                  account_name: values.title,
                  wallet_tank_type:
                    walletTankTypes[selectedWalletTankType] &&
                    walletTankTypes[selectedWalletTankType].url
                      ? walletTankTypes[selectedWalletTankType].url
                      : "",
                  bank_info: values.bank_info,
                };
                createWalletTank(createWalletTankParams, null, (data) => {
                  createWithdrawal(
                    {
                      user_receiver:
                        userInfo && userInfo.url ? userInfo.url : "",
                      currency:
                        currencies[selectedCurrencyIndex] &&
                        currencies[selectedCurrencyIndex].url
                          ? currencies[selectedCurrencyIndex].url
                          : "",
                      wallet_tank_receiver: data && data.url ? data.url : "",
                      amount: removeComma(values.amount),
                      status: statuses
                        ? statuses.find(
                            (status) => status.title === "Admin Assign"
                          ).url
                        : "",
                    },
                    () => {
                      closeModal();
                      refreshPendingRequests();
                      getWalletData();
                    }
                  );
                });
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
                      ? statuses.find(
                          (status) => status.title === "Admin Assign"
                        ).url
                      : "",
                  },
                  () => {
                    closeModal();
                    refreshPendingRequests();
                    getWalletData();
                  }
                );
              }
            }
          } else openNotEnoughBalanceToast();
        }
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <div className="flex flex-col">
          <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
            <span className={`font-${font}-regular text-${oppositeTheme}`}>
              {lang["balance"]}
            </span>
            <div className="w-full flex -mt-1">
              <span
                className={`text-${oppositeTheme} font-${font}-bold text-2xl`}
              >
                {addComma(+data.balance) + " " + data.currency_abb}
              </span>
            </div>
          </div>

          {/* <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
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
                disabled
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
          </div> */}

          <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
            <span className={`font-${font}-regular text-${oppositeTheme}`}>
              {lang["amount"]}
            </span>
            <div className="w-full flex relative">
              <input
                className={`flex-1 hide-input-arrows bg-${theme}-back font-${font}-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                name="amount"
                onBlur={handleBlur("amount")}
                onChange={handleChange("amount")}
                value={values.amount ? addComma(values.amount) : ""}
              />
              {+data.balance !== 0 &&
                +removeComma(values.amount) < +data.balance && (
                  <button
                    type="button"
                    className="absolute right-4 top-1"
                    onClick={() =>
                      setFieldValue("amount", addComma(+data.balance))
                    }
                  >
                    <span className={`text-gray font-${font}-regular`}>
                      {lang["amount-input-max-button-label"]}
                    </span>
                  </button>
                )}
            </div>
          </div>
          {newCardMode ? (
            <div className="relative px-6 pb-6 border-2 border-dashed border-gray rounded-2xl mt-5">
              <button
                onClick={() => setNewCardMode(false)}
                type="button"
                className="absolute top-[1.15rem] right-6"
              >
                <span className={`text-blue font-${font}-thin`}>All Cards</span>
              </button>
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
            </div>
          ) : (
            <div className={bankAccountDivClass}>
              <span className={`font-${font}-regular text-${oppositeTheme}`}>
                {lang["bank-account"]}
              </span>
              <div className="w-full flex">
                <CustomDropdown
                  label={
                    selectedWalletTankIndex >= 0 &&
                    walletTanks[selectedWalletTankIndex] &&
                    walletTanks[selectedWalletTankIndex].account_name
                      ? walletTanks[selectedWalletTankIndex].account_name
                      : ""
                  }
                >
                  {walletTanks.map((walletTank, index) => {
                    if (index === 0) {
                      return (
                        <CustomItem
                          key={index}
                          className="rounded-t-xl"
                          onClick={() => setSelectedWalletTankIndex(index)}
                        >
                          {walletTank && walletTank.account_name
                            ? walletTank.account_name
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
                  {walletTanks.length === 0 ? (
                    <CustomItem
                      key={walletTanks.length}
                      onClick={() => {
                        setSelectedWalletTankIndex(-1);
                        setNewCardMode(true);
                      }}
                      className="rounded-xl"
                    >
                      {"+ " + lang["add-card"]}
                    </CustomItem>
                  ) : (
                    <CustomItem
                      key={walletTanks.length}
                      onClick={() => {
                        setSelectedWalletTankIndex(-1);
                        setNewCardMode(true);
                      }}
                      className="rounded-b-xl"
                    >
                      {"+ " + lang["add-card"]}
                    </CustomItem>
                  )}
                </CustomDropdown>
              </div>
            </div>
          )}
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

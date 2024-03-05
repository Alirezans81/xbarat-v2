import React, { useEffect, useState } from "react";
import { useUserState } from "../../../Providers/UserProvider";
import { Formik } from "formik";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useCreateTransfer } from "../../../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import { CustomDropdown, CustomItem } from "../../common/CustomDropdown";
import { useAddComma, useRemoveComma } from "../../../hooks/useNumberFunctions";
import SubmitButton from "../../common/SubmitButton";
import { useStatusesState } from "../../../Providers/StatusesProvider";
import { useFontState } from "../../../Providers/FontProvider";
import { useGetWalletAssetByCurrency } from "../../../hooks/useWalletFilter";
import { useToastDataSetState } from "../../../Providers/ToastDataProvider";

export default function Transfer({
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

  const userInfo = useUserState();
  const statuses = useStatusesState();

  const { createTransfer, isLoading: createTransferIsLoading } =
    useCreateTransfer();
  useEffect(
    () => setIsLoadingSplashScreen(createTransferIsLoading),
    [createTransferIsLoading]
  );

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

  const openNotRightAmountToast = (min, max) => {
    setToastData({
      status: "failed",
      message:
        lang["transfer-amount-error-message-1st"] +
        " " +
        addComma(min) +
        " " +
        lang["transfer-amount-error-message-2nd"] +
        " " +
        addComma(max) +
        " " +
        lang["transfer-amount-error-message-3rd"] +
        ".",
      canClose: true,
      isOpen: true,
      showTime: 10000,
    });
  };
  const checkAmount = (amount) => {
    if (currencies[selectedCurrencyIndex]) {
      const min =
        +currencies[selectedCurrencyIndex].min_transfer_lot *
        +currencies[selectedCurrencyIndex].lot;
      const max =
        +currencies[selectedCurrencyIndex].max_transfer_lot *
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
      initialValues={{ user_receiver: "", amount: amount || "" }}
      onSubmit={(values) => {
        if (checkAmount(+removeComma(values.amount))) {
          if (+removeComma(values.amount) <= +walletAsset.balance) {
            createTransfer(
              {
                user_sender: userInfo && userInfo.url ? userInfo.url : "",
                currency:
                  currencies[selectedCurrencyIndex] &&
                  currencies[selectedCurrencyIndex].url
                    ? currencies[selectedCurrencyIndex].url
                    : "",
                user_receiver: values.user_receiver,
                amount: removeComma(values.amount),
                status: statuses
                  ? statuses.find((status) => status.title === "Admin Approve")
                      .url
                  : "",
              },
              () => {
                closeModal();
                refreshPendingRequests();
                getWalletData();
              }
            );
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
          <div className="flex-1 w-full flex flex-col gap-y-2 mt-5">
            <span className={`font-${font}-regular text-${oppositeTheme}`}>
              {lang["user-code"]}
            </span>
            <div className="w-full flex">
              <input
                className={`flex-1 hide-input-arrows bg-${theme}-back font-${font}-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                name="user_receiver"
                onBlur={handleBlur("user_receiver")}
                onChange={handleChange("user_receiver")}
                value={values.user_receiver ? values.user_receiver : ""}
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

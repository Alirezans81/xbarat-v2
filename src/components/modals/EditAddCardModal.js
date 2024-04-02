import React, { useEffect, useState } from "react";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useThemeState } from "../../Providers/ThemeProvider";
import { Formik } from "formik";
import SubmitButton from "../common/SubmitButton";
import {
  useCreateWalletTank,
  useGetWalletTankTypes,
} from "../../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../Providers/IsLoadingSplashScreenProvider";
import { CustomDropdown, CustomItem } from "../common/CustomDropdown";
import { useModalDataClose } from "../../Providers/ModalDataProvider";
import { useUpdateWalletTank } from "../../apis/pages/Cards/hooks";
import { useUserState } from "../../Providers/UserProvider";
import { useRefreshWallet } from "../../hooks/useRefreshWallet";

export default function EditAddCardModal({
  data,
  currency,
  addWalletTankCard,
  replaceWalletTankCard,
}) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const closeModal = useModalDataClose();
  const userInfo = useUserState();
  const refreshWallet = useRefreshWallet();

  const [walletTankTypes, setWalletTankTypes] = useState([]);
  const [selectedWalletTankType, setSelectedWalletTankType] = useState(-1);

  const { getWalletTankTypes, isLoading: getWalletTankTypesIsLoading } =
    useGetWalletTankTypes();
  useEffect(
    () => setIsLoadingSplashScreen(getWalletTankTypesIsLoading),
    [getWalletTankTypesIsLoading]
  );
  useEffect(() => {
    currency &&
      getWalletTankTypes(
        {
          currencies: currency.slug,
        },
        setWalletTankTypes
      );
  }, []);

  const findWalletTankType = () => {
    if (data && data.wallet_tank_type) {
      walletTankTypes.map((walletTankType, index) => {
        if (data.wallet_tank_type === walletTankType.url) {
          setSelectedWalletTankType(index);
          return walletTankType.title;
        }
      });
    }
  };
  useEffect(() => {
    findWalletTankType();
  }, [walletTankTypes]);

  const { createWalletTank, isLoading: createWalletTankIsLoading } =
    useCreateWalletTank();
  useEffect(
    () => setIsLoadingSplashScreen(createWalletTankIsLoading),
    [createWalletTankIsLoading]
  );
  const { updateWalletTank, isLoading: updateWalletTankIsLoading } =
    useUpdateWalletTank();
  useEffect(
    () => setIsLoadingSplashScreen(updateWalletTankIsLoading),
    [updateWalletTankIsLoading]
  );

  const submit = (values) => {
    if (data) {
      if (selectedWalletTankType >= 0) {
        updateWalletTank(data.url, values, (data) => {
          replaceWalletTankCard(data);
          refreshWallet();
          closeModal();
        });
      }
    } else {
      createWalletTank(
        {
          ...values,
          wallet_tank_type: walletTankTypes[selectedWalletTankType].url,
          user: userInfo.url,
        },
        null,
        (data) => {
          addWalletTankCard(data);
          refreshWallet();
          closeModal();
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-y-4 min-w-[17rem]">
      <Formik
        initialValues={{
          currency: currency ? currency.url : "",
          account_name: data ? data.account_name : "",
          bank_info: data ? data.bank_info : "",
          bank_name: data ? data.bank_name : "",
        }}
        onSubmit={submit}
      >
        {({ handleBlur, handleChange, values, handleSubmit }) => (
          <>
            <div className="flex flex-col gap-y-0.5">
              <span className={`font-${font}-regular text-gray`}>
                {lang["currency"]}
              </span>
              <span className={`font-${font}-regular text-yellow text-2xl`}>
                {currency ? currency.abbreviation : ""}
              </span>
            </div>
            <div class="flex-1 w-full flex flex-col gap-y-1">
              <span class="font-En-regular text-gray">
                {lang["type-of-account"]}
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
            <div class="flex-1 w-full flex flex-col gap-y-1">
              <span class="font-En-regular text-gray">
                {lang["bank-account-title"]}
              </span>
              <div class="w-full flex relative">
                <input
                  class="flex-1 hide-input-arrows bg-dark-back font-En-regular text-light px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1"
                  name="account_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.account_name}
                />
              </div>
            </div>
            <div class="flex-1 w-full flex flex-col gap-y-1">
              <span class="font-En-regular text-gray">
                {lang["bank-account-number"]}
              </span>
              <div class="w-full flex relative">
                <input
                  class="flex-1 hide-input-arrows bg-dark-back font-En-regular text-light px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1"
                  name="bank_info"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bank_info}
                />
              </div>
            </div>
            <div class="flex-1 w-full flex flex-col gap-y-1">
              <span class="font-En-regular text-gray">{lang["Bank_Name"]}</span>
              <div class="w-full flex relative">
                <input
                  class="flex-1 hide-input-arrows bg-dark-back font-En-regular text-light px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1"
                  name="bank_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bank_name}
                />
              </div>
            </div>
            <SubmitButton
              type="button"
              className="mt-4 mb-2 py-0.5"
              onClick={handleSubmit}
              rounded="lg"
            >
              {lang["submit"]}
            </SubmitButton>
          </>
        )}
      </Formik>
    </div>
  );
}

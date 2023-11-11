import React, { useEffect, useState } from "react";
import { useUserState } from "../../../Providers/UserProvider";
import { Formik } from "formik";
import { useLanguageState } from "../../../Providers/LanguageProvider";
import { useThemeState } from "../../../Providers/ThemeProvider";
import { useGetCurrencies } from "../../../apis/common/currency/hooks";
import { useCreateTransfer } from "../../../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../Providers/IsLoadingSplashScreenProvider";
import { CustomDropdown, CustomItem } from "../../common/CustomDropdown";
import { useAddComma } from "../../../hooks/useNumberFunctions";
import SubmitButton from "../../common/SubmitButton";

export default function Transfer({ currencies, data }) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const addComma = useAddComma();

  const userInfo = useUserState();

  const { createTransfer, isLoading: createTransferIsLoading } =
    useCreateTransfer();
  useEffect(
    () => setIsLoadingSplashScreen(createTransferIsLoading),
    [createTransferIsLoading]
  );

  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(-1);

  return (
    <Formik
      initialValues={{ user_receiver: "", amount: "" }}
      onSubmit={(values) => {
        createTransfer({
          user_sender: userInfo && userInfo.url ? userInfo.url : "",
          currency:
            currencies[selectedCurrencyIndex] &&
            currencies[selectedCurrencyIndex].url
              ? currencies[selectedCurrencyIndex].url
              : "",
          user_receiver: values.user_receiver,
          amount: values.amount,
        });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <div className="flex flex-col">
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
              {lang["user-code"]}
            </span>
            <div className="w-full flex">
              <input
                className={`flex-1 hide-input-arrows bg-${theme}-back font-mine-regular text-${oppositeTheme} px-3 outline-1 h-9 outline-white rounded-lg w-0 pt-2 pb-1`}
                name="user_receiver"
                onBlur={handleBlur("user_receiver")}
                onChange={handleChange("user_receiver")}
                value={values.user_receiver ? values.user_receiver : ""}
              />
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

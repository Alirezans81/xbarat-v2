import React, { useEffect, useState } from "react";
import { useThemeState } from "../../../../../Providers/ThemeProvider";
import { useLanguageState } from "../../../../../Providers/LanguageProvider";
import { useAddComma } from "../../../../../hooks/useNumberFunctions";
import { useGetCurrency } from "../../../../../apis/common/currency/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../../Providers/IsLoadingSplashScreenProvider";
import { useModalDataSetState } from "../../../../../Providers/ModalDataProvider";
import TransactionModal from "../../../../modals/TransactionModal";

export default function CurrencyCard({ walletAsset, refreshPendingRequests }) {
  const lang = useLanguageState();
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const addComma = useAddComma();
  const setIsLoadingSplashScreen = useIsLoadingSplashScreenSetState();
  const setModalData = useModalDataSetState();

  const openTransactionModal = (defaultType) => {
    setModalData({
      title: lang["transaction"],
      children: (
        <TransactionModal
          refreshPendingRequests={refreshPendingRequests}
          data={walletAsset}
          defaultType={defaultType}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

  const { getCurrency, isLoading } = useGetCurrency();
  useEffect(() => setIsLoadingSplashScreen(isLoading), [isLoading]);

  const [currency, setCurrency] = useState();
  useEffect(() => {
    getCurrency(walletAsset.currency, setCurrency);
  }, []);

  if (currency) {
    return (
      <div
        className={`w-full flex flex-col justify-center items-center bg-${theme}-back rounded-3xl h-full pt-4 pb-4 px-5`}
      >
        <div className="flex flex-row font-mine-bold text-xl">
          {currency[`sym_pic_${oppositeTheme}`] ? (
            <img
              className="w-7 h-7 -mt-1"
              src={currency[`sym_pic_${oppositeTheme}`]}
            />
          ) : (
            <span className={`text-${oppositeTheme} font-mine-regular`}>
              {currency.abbreviation}
            </span>
          )}
          <span className={`text-${oppositeTheme}`}>
            {addComma(+walletAsset.balance)}
          </span>
          <span className="text-gray mx-1">{walletAsset.title}</span>
        </div>
        <div className="-mt-1.5  flex flex-col font-mine-regular items-center">
          <span className="text-green">
            {"+ " + addComma(+walletAsset.pending) + " " + lang["pending"]}
          </span>
          <span className="text-red -mt-1">
            {"- " + addComma(+walletAsset.locked) + " " + lang["locked"]}
          </span>
        </div>
        <div className="flex flex-col gap-y-2 font-mine-bold w-full text-sm items-center mt-1">
          <button
            onClick={() => openTransactionModal("transfer")}
            className="border-2 border-blue text-blue rounded-lg pt-2 pb-0.5 w-9/12"
          >
            {lang["transfer"]}
          </button>
          <button
            onClick={() => openTransactionModal("withdrawal")}
            className="border-2 border-red text-red rounded-lg pt-2 pb-0.5 w-9/12"
          >
            {lang["withdrawal"]}
          </button>
        </div>
      </div>
    );
  }
}

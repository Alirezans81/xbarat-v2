import React from "react";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import CustomSlider from "../../../common/CustomSlider";
import CurrencyCard from "./Balance/CurrencyCard";
import { useWalletState } from "../../../../Providers/WalletProvider";
import { useFontState } from "../../../../Providers/FontProvider";
import TransactionModal from "../../../modals/TransactionModal";
import { useModalDataSetState } from "../../../../Providers/ModalDataProvider";

export default function Balance({ refreshPendingRequests }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const font = useFontState();
  const setModalData = useModalDataSetState();

  const openTransactionModal = (defaultType) => {
    setModalData({
      title: lang["transaction"],
      children: (
        <TransactionModal
          refreshPendingRequests={refreshPendingRequests}
          defaultType={defaultType}
        />
      ),
      canClose: true,
      isOpen: true,
    });
  };

  const getQuantityOfCards = () => {
    if (window.innerWidth >= 1280) {
      return 3;
    } else if (window.innerWidth >= 1024) {
      return 4;
    } else if (window.innerWidth >= 768) {
      return 4;
    } else if (window.innerWidth >= 640) {
      return 2;
    } else {
      return 1;
    }
  };

  const wallet = useWalletState();
  const walletAssets = wallet && wallet.walletAssets ? wallet.walletAssets : [];

  if (walletAssets.length === 0) {
    return (
      <div className="h-full flex flex-col gap-y-2">
        <div className="w-full flex justify-between items-center">
          <span className={`font-${font}-bold text-${oppositeTheme} text-2xl`}>
            {lang["your-balance"]}
          </span>
          <button
            onClick={() => openTransactionModal("deposit")}
            className="hidden md:flex xl:hidden gap-x-2 items-center border border-green rounded-full px-4 pt-2 pb-1"
          >
            <img
              className="w-5 h-5 -mt-1"
              src={require("../../../../Images/pages/layout/Wallet/deposit.png")}
            />
            <span className={`text-green font-${font}-regular`}>
              {lang["deposit"]}
            </span>
          </button>
        </div>
        <div className="flex-1 px-7 relative">
          <div className="absolute left-0 h-full w-full top-0 flex justify-center items-center">
            <span
              className={`font-${font}-thin text-3xl text-${oppositeTheme}`}
            >
              {lang["no-data"]}
            </span>
          </div>
        </div>
      </div>
    );
  } else if (walletAssets.length < 3) {
    return (
      <div className="h-full flex flex-col gap-y-2">
        <div className="w-full flex justify-between">
          <span className={`font-${font}-bold text-${oppositeTheme} text-2xl`}>
            {lang["your-balance"]}
          </span>
        </div>
        <div className="flex-1 px-7 relative flex flex-row justify-center items-center w-full">
          {walletAssets.map((walletAsset, index) => (
            <div
              key={index}
              className="w-88 flex justify-center items-center h-full px-4"
            >
              <CurrencyCard
                refreshPendingRequests={refreshPendingRequests}
                walletAsset={walletAsset}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-full flex flex-col gap-y-2">
        <div className="w-full flex justify-between">
          <span className={`font-${font}-bold text-${oppositeTheme} text-2xl`}>
            {lang["your-balance"]}
          </span>
        </div>
        <div className="flex-1 px-7 relative">
          {walletAssets.length !== 0 ? (
            <CustomSlider
              slidesToScroll={getQuantityOfCards()}
              slidesToShow={getQuantityOfCards()}
            >
              {walletAssets.map((walletAsset, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center h-full px-4"
                >
                  <CurrencyCard walletAsset={walletAsset} />
                </div>
              ))}
            </CustomSlider>
          ) : (
            <div className="absolute left-0 h-full w-full top-0 flex justify-center items-center">
              <span
                className={`font-${font}-thin text-3xl text-${oppositeTheme}`}
              >
                {lang["no-data"]}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

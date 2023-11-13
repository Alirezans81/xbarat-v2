import React, { useEffect, useState } from "react";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import CustomSlider from "../../../common/CustomSlider";
import CurrencyCard from "./Balance/CurrencyCard";
import { useWalletState } from "../../../../Providers/WalletProvider";

export default function Balance({ refreshPendingRequests }) {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();

  const wallet = useWalletState();
  const walletAssets = wallet && wallet.walletAssets ? wallet.walletAssets : [];

  if (walletAssets.length === 0) {
    return (
      <div className="h-full flex flex-col gap-y-2">
        <span className={`font-mine-bold text-${oppositeTheme} text-2xl`}>
          {lang["your-balance"]}
        </span>
        <div className="flex-1 px-7 relative">
          <div className="absolute left-0 h-full w-full top-0 flex justify-center items-center">
            <span className={`font-mine-thin text-3xl text-${oppositeTheme}`}>
              {lang["no-data"]}
            </span>
          </div>
        </div>
      </div>
    );
  } else if (walletAssets.length < 3) {
    return (
      <div className="h-full flex flex-col gap-y-2">
        <span className={`font-mine-bold text-${oppositeTheme} text-2xl`}>
          {lang["your-balance"]}
        </span>
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
        <span className={`font-mine-bold text-${oppositeTheme} text-2xl`}>
          {lang["your-balance"]}
        </span>
        <div className="flex-1 px-7 relative">
          {walletAssets.length !== 0 ? (
            <CustomSlider slidesToScroll={3} slidesToShow={3} infinite>
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
              <span className={`font-mine-thin text-3xl text-${oppositeTheme}`}>
                {lang["no-data"]}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

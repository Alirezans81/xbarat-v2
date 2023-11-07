import React, { useEffect, useState } from "react";
import { useLanguageState } from "../../../../Providers/LanguageProvider";
import { useThemeState } from "../../../../Providers/ThemeProvider";
import CustomSlider from "../../../common/CustomSlider";
import CurrencyCard from "./Balance/CurrencyCard";
import {
  useGetWalletAssets,
  useGetWallets,
} from "../../../../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../../../../Providers/IsLoadingSplashScreenProvider";
import { useUserState } from "../../../../Providers/UserProvider";

export default function Balance() {
  const theme = useThemeState();
  const oppositeTheme = theme === "dark" ? "light" : "dark";
  const lang = useLanguageState();
  const userInfo = useUserState();
  const isLoadingSplashScreen = useIsLoadingSplashScreenSetState();

  const [wallets, setWallets] = useState([]);
  const wallet = wallets[0] ? wallets[0] : null;
  const [balances, setBalances] = useState([]);

  const { getWallets, isLoading: getWalletsIsLoading } = useGetWallets();
  useEffect(
    () => isLoadingSplashScreen(getWalletsIsLoading),
    [getWalletsIsLoading]
  );
  const { getWalletAssets, isLoading: getWalletAssetsIsLoading } =
    useGetWalletAssets();
  useEffect(
    () => isLoadingSplashScreen(getWalletAssetsIsLoading),
    [getWalletAssetsIsLoading]
  );

  useEffect(() => {
    userInfo &&
      userInfo.username &&
      getWallets({ user: userInfo.username }, setWallets);
  }, []);
  useEffect(() => {
    wallet &&
      wallet.slug &&
      getWalletAssets({ wallet: wallet.slug }, setBalances);
  }, [wallets]);

  if (balances.length === 0) {
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
  } else if (balances.length < 3) {
    return (
      <div className="h-full flex flex-col gap-y-2">
        <span className={`font-mine-bold text-${oppositeTheme} text-2xl`}>
          {lang["your-balance"]}
        </span>
        <div className="flex-1 px-7 relative flex flex-row justify-center items-center w-full">
          {balances.map((balance, index) => (
            <div
              key={index}
              className="w-88 flex justify-center items-center h-full px-4"
            >
              <CurrencyCard balance={balance} />
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
          {balances.length !== 0 ? (
            <CustomSlider slidesToScroll={3} slidesToShow={3} infinite>
              {balances.map((balance, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center h-full px-4"
                >
                  <CurrencyCard balance={balance} />
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

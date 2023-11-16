import React, { createContext, useContext, useEffect, useState } from "react";
import {
  useGetWallets,
  useGetWalletAssets,
  useGetWalletTanks,
} from "../apis/common/wallet/hooks";
import { useIsLoadingSplashScreenSetState } from "../Providers/IsLoadingSplashScreenProvider";
import { useUserState } from "./UserProvider";

const WalletContext = createContext();
const WalletContextSetState = createContext();
const getWalletDataContext = createContext();

const WalletProvider = ({ children }) => {
  const setLoading = useIsLoadingSplashScreenSetState();
  const user = useUserState();

  const [wallet, setWallet] = useState({
    wallets: [],
    walletAssets: [],
    walletTanks: [],
  });

  const setWallets = (data) => {
    if (wallet && data) {
      let temp = wallet;
      temp.wallets = data;
      setWallet(temp);
    }
  };
  const setWalletAssets = (data) => {
    if (wallet && data) {
      let temp = wallet;
      temp.walletAssets = data;
      setWallet(temp);
    }
  };
  const setWalletTanks = (data) => {
    if (wallet && data) {
      let temp = wallet;
      temp.walletTanks = data;
      setWallet(temp);
    }
  };

  const { getWallets, isLoading: getWalletsIsLoading } = useGetWallets();
  useEffect(() => setLoading(getWalletsIsLoading), [getWalletsIsLoading]);
  const { getWalletAssets, isLoading: getWalletAssetsIsLoading } =
    useGetWalletAssets();
  useEffect(
    () => setLoading(getWalletAssetsIsLoading),
    [getWalletAssetsIsLoading]
  );
  const { getWalletTanks, isLoading: getWalletTanksIsLoading } =
    useGetWalletTanks();
  useEffect(
    () => setLoading(getWalletTanksIsLoading),
    [getWalletTanksIsLoading]
  );

  const getWalletData = (username) => {
    if (username) {
      const userFilter = {
        user: username,
      };

      getWallets(userFilter, setWallets);
      getWalletAssets(userFilter, setWalletAssets);
      getWalletTanks(userFilter, setWalletTanks);
    } else if (user && user.username) {
      const userFilter = {
        user: user.username,
      };

      getWallets(userFilter, setWallets);
      getWalletAssets(userFilter, setWalletAssets);
      getWalletTanks(userFilter, setWalletTanks);
    }
  };

  return (
    <WalletContext.Provider value={wallet}>
      <WalletContextSetState.Provider value={setWallet}>
        <getWalletDataContext.Provider value={getWalletData}>
          {children}
        </getWalletDataContext.Provider>
      </WalletContextSetState.Provider>
    </WalletContext.Provider>
  );
};

const useWalletState = () => {
  return useContext(WalletContext);
};

const useWalletSetState = () => {
  return useContext(WalletContextSetState);
};

const useGetWalletData = () => {
  return useContext(getWalletDataContext);
};

export { WalletProvider, useWalletState, useWalletSetState, useGetWalletData };

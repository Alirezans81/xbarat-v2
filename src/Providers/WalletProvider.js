import React, { createContext, useContext, useState } from "react";

const WalletContext = createContext();
const WalletContextSetState = createContext();

const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    wallets: [],
    walletAssets: [],
    walletTanks: [],
  });

  return (
    <WalletContext.Provider value={wallet}>
      <WalletContextSetState.Provider value={setWallet}>
        {children}
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

export { WalletProvider, useWalletState, useWalletSetState };

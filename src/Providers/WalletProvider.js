import React, { createContext, useContext, useState } from "react";

const WalletContext = createContext();
const WalletContextSetState = createContext();

const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState([
    {
      currencyId: 1,
      title: "USD",
      imageSource: {
        gray: require("../Images/currency symbols/usd-gray.png"),
        dark: require("../Images/currency symbols/usd-dark.png"),
        light: require("../Images/currency symbols/usd-light.png"),
      },
      money: 1000,
      pneding: 100,
      locked: 50,
    },
    {
      currencyId: 2,
      title: "IRR",
      imageSource: {
        dark: require("../Images/currency symbols/irr-gray.png"),
        dark: require("../Images/currency symbols/irr-dark.png"),
        light: require("../Images/currency symbols/irr-light.png"),
      },
      money: 10000000,
      pneding: 100000,
      locked: 5000000,
    },
    {
      currencyId: 3,
      title: "AFN",
      imageSource: {
        gray: require("../Images/currency symbols/usd-gray.png"),
        dark: require("../Images/currency symbols/usd-dark.png"),
        light: require("../Images/currency symbols/usd-light.png"),
      },
      money: 2000,
      pneding: 1000,
      locked: 100,
    },
    {
      currencyId: 5,
      title: "EUR",
      imageSource: {
        gray: require("../Images/currency symbols/usd-gray.png"),
        dark: require("../Images/currency symbols/usd-dark.png"),
        light: require("../Images/currency symbols/usd-light.png"),
      },
      money: 100,
      pneding: 500,
      locked: 0,
    },
  ]);

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

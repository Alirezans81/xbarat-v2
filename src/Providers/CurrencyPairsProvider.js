import React, { createContext, useContext, useState } from "react";

const CurrencyPairsContext = createContext();
const CurrencyPairsContextSetState = createContext();

const CurrencyPairsProvider = ({ children }) => {
  const [CurrencyPairs, setCurrencyPairs] = useState([]);

  return (
    <CurrencyPairsContext.Provider value={CurrencyPairs}>
      <CurrencyPairsContextSetState.Provider value={setCurrencyPairs}>
        {children}
      </CurrencyPairsContextSetState.Provider>
    </CurrencyPairsContext.Provider>
  );
};

const useCurrencyPairsState = () => {
  return useContext(CurrencyPairsContext);
};

const useCurrencyPairsSetState = () => {
  return useContext(CurrencyPairsContextSetState);
};

export {
  CurrencyPairsProvider,
  useCurrencyPairsState,
  useCurrencyPairsSetState,
};

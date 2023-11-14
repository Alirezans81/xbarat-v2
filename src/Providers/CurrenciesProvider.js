import React, { createContext, useContext, useState } from "react";

const CurrenciesContext = createContext();
const CurrenciesContextSetState = createContext();

const CurrenciesProvider = ({ children }) => {
  const [Currencies, setCurrencies] = useState([]);

  return (
    <CurrenciesContext.Provider value={Currencies}>
      <CurrenciesContextSetState.Provider value={setCurrencies}>
        {children}
      </CurrenciesContextSetState.Provider>
    </CurrenciesContext.Provider>
  );
};

const useCurrenciesState = () => {
  return useContext(CurrenciesContext);
};

const useCurrenciesSetState = () => {
  return useContext(CurrenciesContextSetState);
};

export { CurrenciesProvider, useCurrenciesState, useCurrenciesSetState };

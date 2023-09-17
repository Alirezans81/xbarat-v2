import React, { createContext, useContext, useState } from "react";

const AreRatesReversedContext = createContext();
const AreRatesReversedContextSetState = createContext();

const AreRatesReversedProvider = ({ children }) => {
  const [AreRatesReversed, setAreRatesReversed] = useState(false);

  return (
    <AreRatesReversedContext.Provider value={AreRatesReversed}>
      <AreRatesReversedContextSetState.Provider value={setAreRatesReversed}>
        {children}
      </AreRatesReversedContextSetState.Provider>
    </AreRatesReversedContext.Provider>
  );
};

const useAreRatesReversedState = () => {
  return useContext(AreRatesReversedContext);
};

const useAreRatesReversedSetState = () => {
  return useContext(AreRatesReversedContextSetState);
};

export {
  AreRatesReversedProvider,
  useAreRatesReversedState,
  useAreRatesReversedSetState,
};

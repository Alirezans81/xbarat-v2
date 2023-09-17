import React, { createContext, useContext, useState } from "react";

const TokenContext = createContext();
const TokenContextSetState = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState();

  return (
    <TokenContext.Provider value={token}>
      <TokenContextSetState.Provider value={setToken}>
        {children}
      </TokenContextSetState.Provider>
    </TokenContext.Provider>
  );
};

const useTokenState = () => {
  return useContext(TokenContext);
};

const useTokenSetState = () => {
  return useContext(TokenContextSetState);
};

export { TokenProvider, useTokenState, useTokenSetState };

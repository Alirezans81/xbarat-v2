import React, { createContext, useContext, useState } from "react";

const FontContext = createContext();
const FontContextSetState = createContext();

const FontProvider = ({ children }) => {
  const [Font, setFont] = useState("En");

  return (
    <FontContext.Provider value={Font}>
      <FontContextSetState.Provider value={setFont}>
        {children}
      </FontContextSetState.Provider>
    </FontContext.Provider>
  );
};

const useFontState = () => {
  return useContext(FontContext);
};

const useFontSetState = () => {
  return useContext(FontContextSetState);
};

export { FontProvider, useFontState, useFontSetState };

import React, { createContext, useContext, useState } from "react";

const LanguageListContext = createContext();
const LanguageListContextSetState = createContext();

const LanguageListProvider = ({ children }) => {
  const [languageList, setLanguageList] = useState([]);

  return (
    <LanguageListContext.Provider value={languageList}>
      <LanguageListContextSetState.Provider value={setLanguageList}>
        {children}
      </LanguageListContextSetState.Provider>
    </LanguageListContext.Provider>
  );
};

const useLanguageListState = () => {
  return useContext(LanguageListContext);
};

const useLanguageListSetState = () => {
  return useContext(LanguageListContextSetState);
};

export { LanguageListProvider, useLanguageListState, useLanguageListSetState };

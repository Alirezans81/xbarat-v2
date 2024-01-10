import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();
const LanguageContextSetState = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState();

  return (
    <LanguageContext.Provider value={language}>
      <LanguageContextSetState.Provider value={setLanguage}>
        {children}
      </LanguageContextSetState.Provider>
    </LanguageContext.Provider>
  );
};

const useLanguageState = () => {
  return useContext(LanguageContext);
};

const useLanguageSetState = () => {
  return useContext(LanguageContextSetState);
};

export { LanguageProvider, useLanguageState, useLanguageSetState };

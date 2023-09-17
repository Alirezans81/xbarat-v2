import React, { createContext, useContext, useState } from "react";

const IsLoadingSplashScreenContext = createContext();
const IsLoadingSplashScreenContextSetState = createContext();

const IsLoadingSplashScreenProvider = ({ children }) => {
  const [isLoadingSplashScreen, setIsLoadingSplashScreen] = useState();

  return (
    <IsLoadingSplashScreenContext.Provider value={isLoadingSplashScreen}>
      <IsLoadingSplashScreenContextSetState.Provider
        value={setIsLoadingSplashScreen}
      >
        {children}
      </IsLoadingSplashScreenContextSetState.Provider>
    </IsLoadingSplashScreenContext.Provider>
  );
};

const useIsLoadingSplashScreenState = () => {
  return useContext(IsLoadingSplashScreenContext);
};

const useIsLoadingSplashScreenSetState = () => {
  return useContext(IsLoadingSplashScreenContextSetState);
};

export {
  IsLoadingSplashScreenProvider,
  useIsLoadingSplashScreenState,
  useIsLoadingSplashScreenSetState,
};

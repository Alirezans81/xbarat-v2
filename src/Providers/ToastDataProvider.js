import React, { createContext, useContext, useState } from "react";

const ToastDataContext = createContext();
const ToastDataContextSetState = createContext();

const ToastDataProvider = ({ children }) => {
  const [toastData, setToastData] = useState({
    status: "warning",
    message: "salam",
    canClose: true,
    isOpen: false,
    showTime: 10000,
  });

  return (
    <ToastDataContext.Provider value={toastData}>
      <ToastDataContextSetState.Provider value={setToastData}>
        {children}
      </ToastDataContextSetState.Provider>
    </ToastDataContext.Provider>
  );
};

const useToastDataState = () => {
  return useContext(ToastDataContext);
};

const useToastDataSetState = () => {
  return useContext(ToastDataContextSetState);
};

export { ToastDataProvider, useToastDataState, useToastDataSetState };

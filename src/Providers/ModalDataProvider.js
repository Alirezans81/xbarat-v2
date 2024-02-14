import React, { createContext, useContext, useState } from "react";

const ModalDataContext = createContext();
const ModalDataContextSetState = createContext();
const ModalDataContextClose = createContext();

const ModalDataProvider = ({ children }) => {
  const [modalData, setModalData] = useState({
    title: "Are you sure?",
    children: <></>,
    canClose: true,
    isOpen: false,
  });

  const closeModal = () => {
    setModalData({ ...modalData, children: <></>, isOpen: false });
  };

  return (
    <ModalDataContext.Provider value={modalData}>
      <ModalDataContextSetState.Provider value={setModalData}>
        <ModalDataContextClose.Provider value={closeModal}>
          {children}
        </ModalDataContextClose.Provider>
      </ModalDataContextSetState.Provider>
    </ModalDataContext.Provider>
  );
};

const useModalDataState = () => {
  return useContext(ModalDataContext);
};

const useModalDataSetState = () => {
  return useContext(ModalDataContextSetState);
};

const useModalDataClose = () => {
  return useContext(ModalDataContextClose);
};

export {
  ModalDataProvider,
  useModalDataState,
  useModalDataSetState,
  useModalDataClose,
};

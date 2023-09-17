import React, { createContext, useContext, useState } from "react";

const IsPagesModalOpenContext = createContext();
const TogglePagesModalContext = createContext();

const IsPagesModalOpenProvider = ({ children }) => {
  const [isPagesModalOpen, setIsPagesModalOpen] = useState(false);

  const togglePagesModal = () => {
    setIsPagesModalOpen(!isPagesModalOpen);
  };

  return (
    <IsPagesModalOpenContext.Provider value={isPagesModalOpen}>
      <TogglePagesModalContext.Provider value={togglePagesModal}>
        {children}
      </TogglePagesModalContext.Provider>
    </IsPagesModalOpenContext.Provider>
  );
};

const useIsPagesModalOpenState = () => {
  return useContext(IsPagesModalOpenContext);
};

const useTogglePagesModal = () => {
  return useContext(TogglePagesModalContext);
};

export {
  IsPagesModalOpenProvider,
  useIsPagesModalOpenState,
  useTogglePagesModal,
};

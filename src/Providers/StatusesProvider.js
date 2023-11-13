import React, { createContext, useContext, useState } from "react";

const StatusesContext = createContext();
const StatusesContextSetState = createContext();

const StatusesProvider = ({ children }) => {
  const [Statuses, setStatuses] = useState();

  return (
    <StatusesContext.Provider value={Statuses}>
      <StatusesContextSetState.Provider value={setStatuses}>
        {children}
      </StatusesContextSetState.Provider>
    </StatusesContext.Provider>
  );
};

const useStatusesState = () => {
  return useContext(StatusesContext);
};

const useStatusesSetState = () => {
  return useContext(StatusesContextSetState);
};

export { StatusesProvider, useStatusesState, useStatusesSetState };

import React, { createContext, useContext, useState } from "react";

const NotificationsContext = createContext();
const NotificationsContextSetState = createContext();

const NotificationsProvider = ({ children }) => {
  const [Notifications, setNotifications] = useState();

  return (
    <NotificationsContext.Provider value={Notifications}>
      <NotificationsContextSetState.Provider value={setNotifications}>
        {children}
      </NotificationsContextSetState.Provider>
    </NotificationsContext.Provider>
  );
};

const useNotificationsState = () => {
  return useContext(NotificationsContext);
};

const useNotificationsSetState = () => {
  return useContext(NotificationsContextSetState);
};

export {
  NotificationsProvider,
  useNotificationsState,
  useNotificationsSetState,
};

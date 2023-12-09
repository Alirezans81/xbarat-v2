import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
const UserContextSetState = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={user}>
      <UserContextSetState.Provider value={setUser}>
        {children}
      </UserContextSetState.Provider>
    </UserContext.Provider>
  );
};

const useUserState = () => {
  return useContext(UserContext);
};

const useUserSetState = () => {
  return useContext(UserContextSetState);
};

export { UserProvider, useUserState, useUserSetState };

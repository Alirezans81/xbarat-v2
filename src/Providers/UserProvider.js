import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
const UserContextSetState = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: "",
    name: "Alireza Nasiri",
    email: "alireza@gmail.com",
    phoneNumber: "+989386128492",
    nationality: { title: "Iranian" },
    country: { title: "Iran" },
    city: { title: "Mashhad" },
    personCode: "C102578432",
    nationalCode: "0926388053",
    role: "Supervisor",
    isActive: false,
    isAdmin: true,
  });

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

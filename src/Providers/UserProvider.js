import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();
const UserContextSetState = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    url: "",
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone: "",
    gender: "",
    is_active: false,
    nationality: "",
    nationality_number: "",
    passport_number: "",
    tazkare_number: "",
    avatar: "",
    document: "",
    get_full_name: "",
    country: "",
    city: "",
    nickname: "",
    referral_code: "",
    how_to_know: "",
    default_locale: "",
    signup_link: "",
    date_joined: "",
    is_staff: false,
    is_admin: false,
    is_ban: false,
    is_superuser: false,
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

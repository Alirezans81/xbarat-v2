import { useTokenSetState } from "../../../Providers/TokenProvider";
import { useUserSetState } from "../../../Providers/UserProvider";
import { logout } from "./apis";
import { useState } from "react";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const setToken = useTokenSetState();
  const setUser = useUserSetState();

  const fetch = async () => {
    setIsLoading(true);

    const token = window.localStorage.getItem("authToken");
    token &&
      logout(token)
        .then((data) => {
          process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);

          setUser(null);
          window.localStorage.removeItem("userInfo");

          setToken(null);
          window.localStorage.removeItem("authToken");

          window.localStorage.removeItem("expireTime");
          window.localStorage.removeItem("statuses");
          window.localStorage.removeItem("languageList");

          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setIsLoading(false);
        });
  };

  return { logout: fetch, error, isLoading };
};

export { useLogout };

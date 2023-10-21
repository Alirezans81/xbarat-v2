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

    const userInfo = window.localStorage.getItem("userInfo");
    const userId = userInfo && userInfo.id ? userInfo.id : null;
    logout(userId)
      .then((data) => {
        console.log(data);

        setUser(null);
        window.localStorage.removeItem("userInfo");

        setToken(null);
        window.localStorage.removeItem("authToken");

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

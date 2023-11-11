import { useTokenSetState } from "../../../Providers/TokenProvider";
import { useUserSetState } from "../../../Providers/UserProvider";
import { login } from "./apis";
import { useState } from "react";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const setToken = useTokenSetState();
  const setUser = useUserSetState();

  const fetch = async (params, customFunctionWithData, rememberMe) => {
    setIsLoading(true);
    login(params)
      .then((data) => {
        console.log(data);
        setUser(data.data.user);
        rememberMe &&
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(data.data.user)
          );

        setToken(data.data.token);
        rememberMe &&
          window.localStorage.setItem(
            "authToken",
            JSON.stringify(data.data.token)
          );

        customFunctionWithData && customFunctionWithData(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { login: fetch, error, isLoading };
};

export { useLogin };

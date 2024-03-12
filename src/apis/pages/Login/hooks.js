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
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
        setUser(data.data.results.user);
        setToken(data.data.results.token);

        if (rememberMe) {
          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(data.data.results.user)
          );
          window.localStorage.setItem(
            "authToken",
            JSON.stringify(data.data.results.token)
          );
        } else {
          const expireTime = new Date();
          expireTime.setDate(expireTime.getDate() + 1);
          window.localStorage.setItem("expireTime", expireTime.toISOString());

          window.localStorage.setItem(
            "userInfo",
            JSON.stringify(data.data.results.user)
          );
          window.localStorage.setItem(
            "authToken",
            JSON.stringify(data.data.results.token)
          );
        }

        customFunctionWithData && customFunctionWithData(data.data.results);
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

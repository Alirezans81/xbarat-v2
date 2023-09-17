import { useTokenSetState } from "../../../Providers/TokenProvider";
import { login } from "./apis";
import { useState } from "react";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const setToken = useTokenSetState();

  const fetch = async (params, customFunction, rememberMe) => {
    setIsLoading(true);
    login(params)
      .then((data) => {
        console.log(data);
        setToken(data.data);
        rememberMe &&
          window.localStorage.setItem("authToken", JSON.stringify(data.data));
        customFunction();
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

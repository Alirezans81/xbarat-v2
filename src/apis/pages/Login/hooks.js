import { useState } from "react";
import { useTokenSetState } from "../../../Providers/TokenProvider";
import { login } from "./apis";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const setToken = useTokenSetState();

  const fetch = async (params, customFunctionWithData, rememberMe) => {
    setIsLoading(true);
    login(params)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);

        setToken(data.data);
        if (rememberMe) {
          window.localStorage.setItem("authToken", JSON.stringify(data.data));
        } else {
          let temp = {
            access: data.data.access,
            exp_access: data.data.access_expiration,
            refresh: "",
            exp_refresh: Math.floor(Date.now() / 1000),
          };
          window.localStorage.setItem("authToken", JSON.stringify(temp));
        }

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

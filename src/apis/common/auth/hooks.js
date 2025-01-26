import {
  useTokenSetState,
  useTokenState,
} from "../../../Providers/TokenProvider";
import { refreshAccessToken } from "./apis";
import { useState } from "react";

const useRefreshAccessToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("init");

  const token = useTokenState();
  const setToken = useTokenSetState();
  const saveToken = (token) => {
    localStorage.setItem("authToken", JSON.stringify(token));
  };

  const fetch = async (customFunctionWithData, customFunctionOnError) => {
    setIsLoading(true);
    await refreshAccessToken(token.refresh)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);

        let temp = token;
        temp.access = data.data.access;
        temp.exp_access = data.data.exp_access;
        setToken(temp);
        saveToken(temp);

        customFunctionWithData && customFunctionWithData(data.data);
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        customFunctionOnError && customFunctionOnError();
        setIsLoading(false);
      });
  };

  return { refreshAccessToken: fetch, error, isLoading };
};

export { useRefreshAccessToken };

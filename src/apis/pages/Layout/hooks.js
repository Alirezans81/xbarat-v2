import { useTokenSetState } from "../../../Providers/TokenProvider";
import { useUserSetState } from "../../../Providers/UserProvider";
import { logout } from "./apis";
import { getNews } from "./apis";
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
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);

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
const useGetNews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState, customFunctionWithData) => {
    setIsLoading(true);
    await getNews()
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        customFunctionWithData && customFunctionWithData(data.data.results);
        setIsLoading(false);
        return data.data.results;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };
  return { getNews: fetch, error, isLoading };
};

export { useLogout, useGetNews };

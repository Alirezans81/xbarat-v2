import { useTokenSetState } from "../../../Providers/TokenProvider";
import { useUserSetState, useUserState } from "../../../Providers/UserProvider";
import { logout, getNews, getNotifs, deleteNotification } from "./apis";
import FilterIsActive from "../../../functions/filterIsActivefunction";
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

  const fetch = async (setState, customFunction, customFunctionWithData) => {
    setIsLoading(true);
    await getNews()
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        customFunction && customFunction();
        customFunctionWithData && customFunctionWithData(data.data.results);
        setIsLoading(false);
        return FilterIsActive(data.data.results);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getNews: fetch, error, isLoading };
};
const useGetNotifs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    username,
    setState,
    customFunction,
    customFunctionWithData
  ) => {
    setIsLoading(true);
    await getNotifs(username)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        customFunction && customFunction();
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

  return { getNotifs: fetch, error, isLoading };
};
const useDeleteNotification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (requestUrl, customFunction) => {
    setIsLoading(true);
    await deleteNotification(requestUrl)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        customFunction && customFunction();
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { deleteNotification: fetch, error, isLoading };
};

export { useLogout, useGetNews, useGetNotifs, useDeleteNotification };

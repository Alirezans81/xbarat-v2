import { getNews, getNotifs, deleteNotification } from "./apis";
import FilterIsActive from "../../../functions/filterIsActivefunction";
import { useState } from "react";
import { useTokenState } from "../../../Providers/TokenProvider";
import { useCheckTokenExpired } from "../../../hooks/useAuth";

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

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    username,
    setState,
    customFunction,
    customFunctionWithData
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getNotifs(username, token.access)
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
    });
  };

  return { getNotifs: fetch, error, isLoading };
};
const useDeleteNotification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (requestUrl, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await deleteNotification(requestUrl, token.access)
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
    });
  };

  return { deleteNotification: fetch, error, isLoading };
};

export { useGetNews, useGetNotifs, useDeleteNotification };

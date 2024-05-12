import { getNextData, getPreviousData } from "./apis";
import { useState } from "react";

const useGetNextData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    setState,
    customFunction,
    customFunctionWithData,
    setCount,
    setPreviousDataUrl,
    setNextDataUrl
  ) => {
    setIsLoading(true);
    await getNextData()
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        setCount && setCount(data.data.count);
        setPreviousDataUrl && setPreviousDataUrl(data.data.previous);
        setNextDataUrl && setNextDataUrl(data.data.next);
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

  return { getNextData: fetch, error, isLoading };
};

const useGetPreviousData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    setState,
    customFunction,
    customFunctionWithData,
    setCount,
    setPreviousDataUrl,
    setNextDataUrl
  ) => {
    setIsLoading(true);
    await getPreviousData()
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        setCount && setCount(data.data.count);
        setPreviousDataUrl && setPreviousDataUrl(data.data.previous);
        setNextDataUrl && setNextDataUrl(data.data.next);
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

  return { getNextData: fetch, error, isLoading };
};

export { useGetNextData, useGetPreviousData };

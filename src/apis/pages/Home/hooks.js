import {
  getTableExchange,
  exchange,
  getPendingExchanges,
  cancelPendingExchange,
} from "./apis";
import { useState } from "react";

const useGetTableExchange = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, setState, customFunctionWithData) => {
    setIsLoading(true);
    await getTableExchange(params)
      .then((data) => {
        console.log(data);
        setState(data.data);
        customFunctionWithData && customFunctionWithData(data.data);
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getTableExchange: fetch, error, isLoading };
};

const useExchange = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, setState, customFunctionWithData) => {
    setIsLoading(true);
    await exchange(params)
      .then((data) => {
        console.log(data);
        setState(data.data);
        customFunctionWithData && customFunctionWithData(data.data);
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { exchange: fetch, error, isLoading };
};

const useGetPendingExchanges = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (token, setState, customFunctionWithData) => {
    setIsLoading(true);
    await getPendingExchanges(token)
      .then((data) => {
        console.log(data);
        setState(data.data);
        customFunctionWithData && customFunctionWithData(data.data);
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getPendingExchanges: fetch, error, isLoading };
};

const useCancelPendingExchange = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (pendingExchangeUrl, customFunction) => {
    setIsLoading(true);
    await cancelPendingExchange(pendingExchangeUrl)
      .then((data) => {
        console.log(data);
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

  return { cancelPendingExchange: fetch, error, isLoading };
};

export {
  useGetTableExchange,
  useExchange,
  useGetPendingExchanges,
  useCancelPendingExchange,
};

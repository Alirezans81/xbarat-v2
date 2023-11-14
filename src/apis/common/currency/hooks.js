import { getCurrencies, getCurrency, getCurrencyPairs } from "./apis";
import { useState } from "react";

const useGetCurrencies = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState, customFunction) => {
    setIsLoading(true);
    await getCurrencies()
      .then((data) => {
        console.log(data);
        setState(data.data);
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

  return { getCurrencies: fetch, error, isLoading };
};

const useGetCurrency = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (currencyUrl, setState, customFunction) => {
    setIsLoading(true);
    await getCurrency(currencyUrl)
      .then((data) => {
        console.log(data);
        setState(data.data);
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

  return { getCurrency: fetch, error, isLoading };
};

const useGetCurrencyPairs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (filtersObject, setState, customFunctionWithData) => {
    setIsLoading(true);
    await getCurrencyPairs(filtersObject)
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

  return { getCurrencyPairs: fetch, error, isLoading };
};

export { useGetCurrencies, useGetCurrency, useGetCurrencyPairs };

import { getCurrencies, getCurrency } from "./apis";
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

export { useGetCurrencies, useGetCurrency };

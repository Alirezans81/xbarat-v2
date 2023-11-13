import { getStatuses } from "./apis";
import { useState } from "react";

const useGetStatuses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState, customFunction, customFunctionWithData) => {
    setIsLoading(true);
    await getStatuses()
      .then((data) => {
        console.log(data);
        setState(data.data);
        customFunction && customFunction();
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

  return { getStatuses: fetch, error, isLoading };
};

export { useGetStatuses };

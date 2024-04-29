import { getStatuses } from "./apis";
import { useState } from "react";
import FilterIsActive from "../../../functions/filterIsActivefunction";

const useGetStatuses = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState, customFunction, customFunctionWithData) => {
    setIsLoading(true);
    await getStatuses()
      .then((data) => {
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
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

  return { getStatuses: fetch, error, isLoading };
};

export { useGetStatuses };

import { getLanguageFile, getLanguages } from "./apis";
import { useState } from "react";
import FilterIsActive from "../../../functions/filterIsActivefunction";

const useGetLanguages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    setState,
    customFunction,
    customFunctionWithData,
    setStateOnError
  ) => {
    setIsLoading(true);
    await getLanguages()
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
        setStateOnError && setStateOnError();
        setError(error);
        setIsLoading(false);
      });
  };

  return { getLanguages: fetch, error, isLoading };
};

const useGetLanguageFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    fileUrl,
    setState,
    customFunction,
    customFunctionWithData,
    onError
  ) => {
    setIsLoading(true);
    await getLanguageFile(fileUrl)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState && setState(data.data);
        customFunction && customFunction();
        customFunctionWithData && customFunctionWithData(data.data);
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        onError && onError();
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getLanguageFile: fetch, error, isLoading };
};

export { useGetLanguages, useGetLanguageFile };

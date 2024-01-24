import { getLanguageFile, getLanguages } from "./apis";
import { useState } from "react";

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
        console.log(data);
        setState(data.data.results);
        customFunction && customFunction();
        customFunctionWithData && customFunctionWithData(data.data.results);
        setIsLoading(false);
        return data.data.results;
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
    customFunctionWithData
  ) => {
    setIsLoading(true);
    await getLanguageFile(fileUrl)
      .then((data) => {
        console.log(data);
        setState && setState(data.data);
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

  return { getLanguageFile: fetch, error, isLoading };
};

export { useGetLanguages, useGetLanguageFile };

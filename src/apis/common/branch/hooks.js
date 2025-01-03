import { getBranches, getBranch } from "./apis";
import FilterIsActive from "../../../functions/filterIsActivefunction";
import { useState } from "react";

const useGetBranches = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (filtersObject, setState, customFunction) => {
    setIsLoading(true);
    await getBranches(filtersObject)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        customFunction && customFunction();
        setIsLoading(false);
        return FilterIsActive(data.data.results);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getBranches: fetch, error, isLoading };
};

const useGetBranch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (branchUrl, setState, customFunction) => {
    setIsLoading(true);
    await getBranch(branchUrl)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
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

  return { getBranch: fetch, error, isLoading };
};

export { useGetBranches, useGetBranch };

import { getBranches, getBranch } from "./apis";
import FilterIsActive from "../../../functions/filterIsActivefunction";
import { useState } from "react";
import { useTokenState } from "../../../Providers/TokenProvider";
import { useCheckTokenExpired } from "../../../hooks/useAuth";

const useGetBranches = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (filtersObject, setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getBranches(filtersObject, token.access)
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
    });
  };

  return { getBranches: fetch, error, isLoading };
};

const useGetBranch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = async (branchUrl, setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getBranch(branchUrl, token.access)
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
    });
  };

  return { getBranch: fetch, error, isLoading };
};

export { useGetBranches, useGetBranch };

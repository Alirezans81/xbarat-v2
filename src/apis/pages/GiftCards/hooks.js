import { useCheckTokenExpired } from "../../../hooks/useAuth";
import { useTokenState } from "../../../Providers/TokenProvider";
import { getGiftCardSites } from "./apis";
import { useState } from "react";

const useGetGiftCardSites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getGiftCardSites(token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          setState(data.data.results);
          customFunction && customFunction();
          setIsLoading(false);
          return data.data.results;
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setIsLoading(false);
        });
    });
  };

  return { getGiftCardSites: fetch, error, isLoading };
};

export { useGetGiftCardSites };

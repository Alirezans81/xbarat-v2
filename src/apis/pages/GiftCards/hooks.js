import { getGiftCardSites } from "./apis";
import { useState } from "react";

const useGetGiftCardSites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState, customFunction) => {
    setIsLoading(true);
    await getGiftCardSites()
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
  };

  return { getGiftCardSites: fetch, error, isLoading };
};

export { useGetGiftCardSites };

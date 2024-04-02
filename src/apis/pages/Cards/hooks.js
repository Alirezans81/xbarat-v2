import { useState } from "react";
import { updateWalletTank } from "./apis";

const useUpdateWalletTank = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (walletTankUrl, params, customFunctionWithData) => {
    setIsLoading(true);
    await updateWalletTank(walletTankUrl, params)
      .then((data) => {
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
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

  return { updateWalletTank: fetch, error, isLoading };
};

export { useUpdateWalletTank };

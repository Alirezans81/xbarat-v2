import { useState } from "react";
import { deleteWalletTank, updateWalletTank } from "./apis";
import { useTokenState } from "../../../Providers/TokenProvider";
import { useCheckTokenExpired } from "../../../hooks/useAuth";

const useUpdateWalletTank = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (walletTankUrl, params, customFunctionWithData) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await updateWalletTank(walletTankUrl, params, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          customFunctionWithData && customFunctionWithData(data.data);
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

  return { updateWalletTank: fetch, error, isLoading };
};

const useDeleteWalletTank = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (walletTankUrl, customFunctionWithData) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await deleteWalletTank(walletTankUrl, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          customFunctionWithData && customFunctionWithData(data.data);
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

  return { deleteWalletTank: fetch, error, isLoading };
};

export { useUpdateWalletTank, useDeleteWalletTank };

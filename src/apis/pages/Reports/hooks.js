import { getDepositHistory,getWithdrawHistory,getTransferHistory,getExchangeHistory } from "./apis";
import { useState } from "react";

const useGetDepositHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState) => {
    setIsLoading(true);
    await getDepositHistory()
      .then((data) => {
        console.log(data);
        setState(data.data)
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getDepositHistory: fetch, error, isLoading };
};
const useGetTransferHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState) => {
    setIsLoading(true);
    await getTransferHistory()
      .then((data) => {
        console.log(data);
        setState(data.data)
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getTransferHistory: fetch, error, isLoading };
};
const useGetExchangeHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState) => {
    setIsLoading(true);
    await getExchangeHistory()
      .then((data) => {
        console.log(data);
        setState(data.data)
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getExchangeHistory: fetch, error, isLoading };
};
const useGetWithdrawHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (setState) => {
    setIsLoading(true);
    await getWithdrawHistory()
      .then((data) => {
        console.log(data);
        setState(data.data)
        setIsLoading(false);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getWithdrawHistory: fetch, error, isLoading };
};
export { useGetDepositHistory,useGetWithdrawHistory,useGetTransferHistory,useGetExchangeHistory };

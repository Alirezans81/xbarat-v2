import {
  getDepositHistory,
  getWithdrawHistory,
  getTransferHistory,
  getExchangeHistory,
  getTop5Report,
  getDepositHistorySingleUser,
  getExchangeHistorySingleUser,
  getWithdrawHistorySingleUser,
  getTransferHistorySingleUser,
} from "./apis";
import { useState } from "react";

const useGetDepositHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    setIsLoading(true);
    await getDepositHistory(filtersObject)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        setDataCount && setDataCount(data.data.count);
        setPreviousUrl && setPreviousUrl(data.data.previous);
        setNextUrl && setNextUrl(data.data.next);
        setIsLoading(false);
        return data.data.results;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getDepositHistory: fetch, error, isLoading };
};
const useGetDepositHistorySingleUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    setIsLoading(true);
    await getDepositHistorySingleUser(filtersObject)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        setDataCount && setDataCount(data.data.count);
        setPreviousUrl && setPreviousUrl(data.data.previous);
        setNextUrl && setNextUrl(data.data.next);
        setIsLoading(false);
        return data.data.results;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getDepositHistorySingleUser: fetch, error, isLoading };
};

const useGetExchangeHistorySingleUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    setIsLoading(true);
    await getExchangeHistorySingleUser(filtersObject)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        setDataCount && setDataCount(data.data.count);
        setPreviousUrl && setPreviousUrl(data.data.previous);
        setNextUrl && setNextUrl(data.data.next);
        setIsLoading(false);
        return data.data.results;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getExchangeHistorySingleUser: fetch, error, isLoading };
};

const useGetWithdrawHistorySingleUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    setIsLoading(true);
    await getWithdrawHistorySingleUser(filtersObject)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        setDataCount && setDataCount(data.data.count);
        setPreviousUrl && setPreviousUrl(data.data.previous);
        setNextUrl && setNextUrl(data.data.next);
        setIsLoading(false);
        return data.data.results;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getWithdrawHistorySingleUser: fetch, error, isLoading };
};
const useGetTransferHistorySingleUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    setIsLoading(true);
    await getTransferHistorySingleUser(filtersObject)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        setDataCount && setDataCount(data.data.count);
        setPreviousUrl && setPreviousUrl(data.data.previous);
        setNextUrl && setNextUrl(data.data.next);
        setIsLoading(false);
        return data.data.results;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getTransferHistorySingleUser: fetch, error, isLoading };
};

const useGetTransferHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    setIsLoading(true);
    await getTransferHistory(filtersObject)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        setIsLoading(false);
        return data.data.results;
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

  const fetch = async (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    setIsLoading(true);
    await getExchangeHistory(filtersObject)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        setIsLoading(false);
        return data.data.results;
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

  const fetch = async (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    setIsLoading(true);
    await getWithdrawHistory(filtersObject)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        setIsLoading(false);
        return data.data.results;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getWithdrawHistory: fetch, error, isLoading };
};

const useGetTop5Report = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (token, params, setState) => {
    setIsLoading(true);
    await getTop5Report(token, params)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
        setState(data.data.results);
        setIsLoading(false);
        return data.data.results;
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });
  };

  return { getTop5Report: fetch, error, isLoading };
};

export {
  useGetDepositHistory,
  useGetWithdrawHistory,
  useGetTransferHistory,
  useGetExchangeHistory,
  useGetDepositHistorySingleUser,
  useGetTop5Report,
  useGetWithdrawHistorySingleUser,
  useGetExchangeHistorySingleUser,
  useGetTransferHistorySingleUser,
};

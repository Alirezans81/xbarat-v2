import { useState } from "react";
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
import { useTokenState } from "../../../Providers/TokenProvider";
import { useCheckTokenExpired } from "../../../hooks/useAuth";

const useGetDepositHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getDepositHistory(filtersObject, token.access)
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
    });
  };

  return { getDepositHistory: fetch, error, isLoading };
};
const useGetDepositHistorySingleUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getDepositHistorySingleUser(filtersObject, token.access)
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
    });
  };

  return { getDepositHistorySingleUser: fetch, error, isLoading };
};

const useGetExchangeHistorySingleUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getExchangeHistorySingleUser(filtersObject, token.access)
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
    });
  };

  return { getExchangeHistorySingleUser: fetch, error, isLoading };
};

const useGetWithdrawHistorySingleUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getWithdrawHistorySingleUser(filtersObject, token.access)
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
    });
  };

  return { getWithdrawHistorySingleUser: fetch, error, isLoading };
};
const useGetTransferHistorySingleUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getTransferHistorySingleUser(filtersObject, token.access)
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
    });
  };

  return { getTransferHistorySingleUser: fetch, error, isLoading };
};

const useGetTransferHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getTransferHistory(filtersObject, token.access)
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
    });
  };

  return { getTransferHistory: fetch, error, isLoading };
};

const useGetExchangeHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getExchangeHistory(filtersObject, token.access)
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
    });
  };

  return { getExchangeHistory: fetch, error, isLoading };
};

const useGetWithdrawHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    setState,
    setDataCount,
    setPreviousUrl,
    setNextUrl,
    filtersObject
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getWithdrawHistory(filtersObject, token.access)
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
    });
  };

  return { getWithdrawHistory: fetch, error, isLoading };
};

const useGetTop5Report = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = async (_token, params, setState) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getTop5Report(token.access, params)
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

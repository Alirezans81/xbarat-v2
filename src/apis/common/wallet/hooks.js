import {
  getWallets,
  getWalletAssets,
  getWalletTanks,
  getWalletTankTypes,
  createWalletTank,
  createDeposit,
  createTransfer,
  createWithdrawal,
  editWalletTank,
} from "./apis";
import { useState } from "react";
import FilterIsActive from "../../../functions/filterIsActivefunction";
import { useTokenState } from "../../../Providers/TokenProvider";
import { useCheckTokenExpired } from "../../../hooks/useAuth";

const useGetWallets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    filtersObject,
    setState,
    customFunction,
    customFunctionWithData
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getWallets(filtersObject, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
          setState(FilterIsActive(data.data.results));
          customFunction && customFunction();
          customFunctionWithData && customFunctionWithData(data.data.results);
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

  return { getWallets: fetch, error, isLoading };
};

const useGetWalletAssets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    filtersObject,
    setState,
    customFunction,
    customFunctionWithData
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getWalletAssets(filtersObject, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          setState && setState(data.data.results);
          customFunction && customFunction();
          customFunctionWithData && customFunctionWithData(data.data.results);
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

  return { getWalletAssets: fetch, error, isLoading };
};

const useGetWalletTanks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (filtersObject, setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getWalletTanks(filtersObject, token.access)
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

  return { getWalletTanks: fetch, error, isLoading };
};

const useGetWalletTankTypes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (filtersObject, setState, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await getWalletTankTypes(filtersObject, token.access)
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

  return { getWalletTankTypes: fetch, error, isLoading };
};

const useCreateWalletTank = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (params, customFunction, customFunctionWithData) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await createWalletTank(params, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
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
    });
  };

  return { createWalletTank: fetch, error, isLoading };
};

const useEditWalletTanks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (
    walletTankUrl,
    params,
    customFunction,
    customFunctionWithData
  ) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await editWalletTank(
        walletTankUrl,
        params,
        customFunctionWithData,
        token.access
      )
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          customFunction && customFunction();
          customFunctionWithData &&
            customFunctionWithData(params.username, params.token);
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
  return { editWalletTank: fetch, error, isLoading };
};

const useCreateDeposit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (params, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await createDeposit(params, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
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

  return { createDeposit: fetch, error, isLoading };
};

const useCreateWithdrawal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (params, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await createWithdrawal(params, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
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

  return { createWithdrawal: fetch, error, isLoading };
};

const useCreateTransfer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (params, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await createTransfer(params, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
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

  return { createTransfer: fetch, error, isLoading };
};

export {
  useGetWallets,
  useGetWalletAssets,
  useGetWalletTanks,
  useGetWalletTankTypes,
  useCreateWalletTank,
  useCreateDeposit,
  useCreateWithdrawal,
  useCreateTransfer,
  useEditWalletTanks,
};

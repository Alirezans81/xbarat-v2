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
import FilterIsActive from "../../../components/functions/filterIsActivefunction";
const useGetWallets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    filtersObject,
    setState,
    customFunction,
    customFunctionWithData
  ) => {
    setIsLoading(true);
    await getWallets(filtersObject)
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
  };

  return { getWallets: fetch, error, isLoading };
};

const useGetWalletAssets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    token,
    filtersObject,
    setState,
    customFunction,
    customFunctionWithData
  ) => {
    setIsLoading(true);
    await getWalletAssets(filtersObject, token)
      .then((data) => {
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
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
  };

  return { getWalletAssets: fetch, error, isLoading };
};

const useGetWalletTanks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (filtersObject, setState, customFunction) => {
    setIsLoading(true);
    await getWalletTanks(filtersObject)
      .then((data) => {
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
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

  return { getWalletTanks: fetch, error, isLoading };
};

const useGetWalletTankTypes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (filtersObject, setState, customFunction) => {
    setIsLoading(true);
    await getWalletTankTypes(filtersObject)
      .then((data) => {
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
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

  return { getWalletTankTypes: fetch, error, isLoading };
};

const useCreateWalletTank = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, customFunction, customFunctionWithData) => {
    setIsLoading(true);
    await createWalletTank(params)
      .then((data) => {
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
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
  };

  return { createWalletTank: fetch, error, isLoading };
};

const useEditWalletTanks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (
    walletTankUrl,
    params,
    customFunction,
    customFunctionWithData
  ) => {
    setIsLoading(true);
    await editWalletTank(walletTankUrl, params, customFunctionWithData)
      .then((data) => {
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
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
  };
  return { editWalletTank: fetch, error, isLoading };
};

const useCreateDeposit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    await createDeposit(params)
      .then((data) => {
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
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

  return { createDeposit: fetch, error, isLoading };
};

const useCreateWithdrawal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    await createWithdrawal(params)
      .then((data) => {
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
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

  return { createWithdrawal: fetch, error, isLoading };
};

const useCreateTransfer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    await createTransfer(params)
      .then((data) => {
        process.env.REACT_APP_MODE === "PRODUCTION" && console.log(data);
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

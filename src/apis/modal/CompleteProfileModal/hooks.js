import { useUserSetState, useUserState } from "../../../Providers/UserProvider";
import { fetchStep1, fetchStep2, fetchStep3 } from "./apis";
import { useState } from "react";

const useFetchStep1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    userInfo && userInfo.username
      ? await fetchStep1(userInfo.username, params)
          .then((data) => {
            console.log(data);
            setUser(data.data);
            saveUser(data.data);
            customFunction();
            setIsLoading(false);
            return data.data;
          })
          .catch((error) => {
            console.log(error);
            setError(error);
            setIsLoading(false);
          })
      : setError("Somthing Wrong!");
  };

  return { fetchStep1: fetch, error, isLoading };
};

const useFetchStep2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    userInfo && userInfo.username
      ? await fetchStep2(userInfo.username, params)
          .then((data) => {
            console.log(data);
            setUser(data.data);
            saveUser(data.data);
            customFunction();
            setIsLoading(false);
            return data.data;
          })
          .catch((error) => {
            console.log(error);
            setError(error);
            setIsLoading(false);
          })
      : setError("Somthing Wrong!");
  };

  return { fetchStep2: fetch, error, isLoading };
};

const useFetchStep3 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    userInfo && userInfo.username
      ? await fetchStep3(userInfo.username, params)
          .then((data) => {
            console.log(data);
            setUser(data.data);
            saveUser(data.data);
            customFunction();
            setIsLoading(false);
            return data.data;
          })
          .catch((error) => {
            console.log(error);
            setError(error);
            setIsLoading(false);
          })
      : setError("Somthing Wrong!");
  };

  return { fetchStep3: fetch, error, isLoading };
};

export { useFetchStep1, useFetchStep2, useFetchStep3 };

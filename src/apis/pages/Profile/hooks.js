import { useUserSetState, useUserState } from "../../../Providers/UserProvider";
import {
  getUserInfo,
  updateDefaultLocale,
  updateNameAndAvatar,
  updateNationalInfo,
  updatePhone,
} from "./apis";
import { useState } from "react";

const useGetUserInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (customFunction, customFunctionWithData) => {
    if (userInfo && userInfo.username) {
      setIsLoading(true);
      await getUserInfo(userInfo.username)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          setUser(data.data);
          saveUser(data.data);
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
    }
  };

  return { getUserInfo: fetch, error, isLoading };
};

const useUpdateNameAndAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    userInfo && userInfo.username
      ? await updateNameAndAvatar(userInfo.username, params)
          .then((data) => {
            process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
            setUser(data.data.results);
            saveUser(data.data.results);
            customFunction();
            setIsLoading(false);
            return data.data.results;
          })
          .catch((error) => {
            console.log(error);
            setError(error);
            setIsLoading(false);
          })
      : setError("Somthing Wrong!");
  };

  return { updateNameAndAvatar: fetch, error, isLoading };
};

const useUpdatePhone = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    userInfo && userInfo.username
      ? await updatePhone(userInfo.username, params)
          .then((data) => {
            process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
            setUser(data.data.results);
            saveUser(data.data.results);
            customFunction && customFunction();
            setIsLoading(false);
            return data.data.results;
          })
          .catch((error) => {
            console.log(error);
            setError(error);
            setIsLoading(false);
          })
      : setError("Somthing Wrong!");
  };

  return { updatePhone: fetch, error, isLoading };
};

const useUpdateNationalInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunctionWithData) => {
    setIsLoading(true);
    userInfo && userInfo.username
      ? await updateNationalInfo(userInfo.username, params)
          .then((data) => {
            process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
            setUser(data.data.results);
            saveUser(data.data.results);
            customFunctionWithData && customFunctionWithData(data.data.results);
            setIsLoading(false);
            return data.data.results;
          })
          .catch((error) => {
            console.log(error);
            setError(error);
            setIsLoading(false);
          })
      : setError("Somthing Wrong!");
  };

  return { updateNationalInfo: fetch, error, isLoading };
};

const useUpdateDefaultLocale = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunctionWithData) => {
    setIsLoading(true);
    userInfo && userInfo.username
      ? await updateDefaultLocale(userInfo.username, params)
          .then((data) => {
            process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
            setUser(data.data.results);
            saveUser(data.data.results);
            customFunctionWithData && customFunctionWithData(data.data.results);
            setIsLoading(false);
            return data.data.results;
          })
          .catch((error) => {
            console.log(error);
            setError(error);
            setIsLoading(false);
          })
      : setError("Somthing Wrong!");
  };

  return { updateDefaultLocale: fetch, error, isLoading };
};

export {
  useGetUserInfo,
  useUpdateNameAndAvatar,
  useUpdatePhone,
  useUpdateNationalInfo,
  useUpdateDefaultLocale,
};

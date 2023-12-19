import { useUserSetState, useUserState } from "../../../Providers/UserProvider";
import {
  getUserInfo,
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

  const fetch = async (customFunction) => {
    setIsLoading(true);
    userInfo && userInfo.username
      ? await getUserInfo(userInfo.username)
          .then((data) => {
            console.log(data);
            setUser(data.data);
            saveUser(data.data);
            customFunction && customFunction();
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
            console.log(data);
            setUser(data.data);
            saveUser(data.data);
            customFunction && customFunction();
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
            console.log(data);
            setUser(data.data);
            saveUser(data.data);
            customFunctionWithData && customFunctionWithData(data.data);
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

  return { updateNationalInfo: fetch, error, isLoading };
};

export {
  useGetUserInfo,
  useUpdateNameAndAvatar,
  useUpdatePhone,
  useUpdateNationalInfo,
};

import { useCheckTokenExpired } from "../../../hooks/useAuth";
import { useTokenState } from "../../../Providers/TokenProvider";
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

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (_token, customFunction, customFunctionWithData) => {
    if (_token) {
      setIsLoading(true);
      await getUserInfo(_token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          setUser(data.data.results[0]);
          saveUser(data.data.results[0]);
          customFunction && customFunction();
          customFunctionWithData &&
            customFunctionWithData(data.data.results[0]);
          setIsLoading(false);
          return data.data.results[0];
        })
        .catch((error) => {
          console.log(error);
          setError(error);
          setIsLoading(false);
        });
    } else if (token) {
      checkTokenExpired(async () => {
        setIsLoading(true);
        await getUserInfo(token.access)
          .then((data) => {
            process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
            setUser(data.data.results[0]);
            saveUser(data.data.results[0]);
            customFunction && customFunction();
            customFunctionWithData &&
              customFunctionWithData(data.data.results[0]);
            setIsLoading(false);
            return data.data.results[0];
          })
          .catch((error) => {
            console.log(error);
            setError(error);
            setIsLoading(false);
          });
      });
    }
  };

  return { getUserInfo: fetch, error, isLoading };
};

const useUpdateNameAndAvatar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = (params, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      userInfo && userInfo.username
        ? await updateNameAndAvatar(userInfo.username, token.access, params)
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
    });
  };

  return { updateNameAndAvatar: fetch, error, isLoading };
};

const useUpdatePhone = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = (params, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      userInfo && userInfo.username
        ? await updatePhone(userInfo.username, token.access, params)
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
    });
  };

  return { updatePhone: fetch, error, isLoading };
};

const useUpdateNationalInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = (params, customFunctionWithData) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      userInfo && userInfo.username
        ? await updateNationalInfo(userInfo.username, token.access, params)
            .then((data) => {
              process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
              setUser(data.data.results);
              saveUser(data.data.results);
              customFunctionWithData &&
                customFunctionWithData(data.data.results);
              setIsLoading(false);
              return data.data.results;
            })
            .catch((error) => {
              console.log(error);
              setError(error);
              setIsLoading(false);
            })
        : setError("Somthing Wrong!");
    });
  };

  return { updateNationalInfo: fetch, error, isLoading };
};

const useUpdateDefaultLocale = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = (params, customFunctionWithData) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      userInfo && userInfo.username
        ? await updateDefaultLocale(userInfo.username, token.access, params)
            .then((data) => {
              process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
              setUser(data.data.results);
              saveUser(data.data.results);
              customFunctionWithData &&
                customFunctionWithData(data.data.results);
              setIsLoading(false);
              return data.data.results;
            })
            .catch((error) => {
              console.log(error);
              setError(error);
              setIsLoading(false);
            })
        : setError("Somthing Wrong!");
    });
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

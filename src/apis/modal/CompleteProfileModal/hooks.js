import { useUserSetState, useUserState } from "../../../Providers/UserProvider";
import {
  fetchStep1,
  fetchStep2,
  fetchStep3,
  fetchStep4,
  fetchStep5,
} from "./apis";
import { useState } from "react";

const useFetchStep1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    if (userInfo && userInfo.username) {
      setIsLoading(true);
      await fetchStep1(userInfo.username, params)
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
        });
    }
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
    if (userInfo && userInfo.username) {
      setIsLoading(true);
      await fetchStep2(userInfo.username, params)
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
        });
    }
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
    if (userInfo && userInfo.username) {
      setIsLoading(true);
      await fetchStep3(userInfo.username, params)
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
        });
    }
  };

  return { fetchStep3: fetch, error, isLoading };
};

const useFetchStep4 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    if (userInfo && userInfo.username) {
      setIsLoading(true);
      await fetchStep4(userInfo.username, params)
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
        });
    }
  };

  return { fetchStep4: fetch, error, isLoading };
};

const useFetchStep5 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const userInfo = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (customFunction) => {
    if (userInfo && userInfo.username) {
      setIsLoading(true);
      await fetchStep5(userInfo.username)
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
        });
    }
  };

  return { fetchStep5: fetch, error, isLoading };
};

export {
  useFetchStep1,
  useFetchStep2,
  useFetchStep3,
  useFetchStep4,
  useFetchStep5,
};

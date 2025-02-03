import { useTokenState } from "../../../Providers/TokenProvider";
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

  const token = useTokenState();

  const user = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    console.log(user);
    if (user && token) {
      setIsLoading(true);
      await fetchStep1(user.username, token.access, params)
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

  const token = useTokenState();

  const user = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    if (user && user.username && token) {
      setIsLoading(true);
      await fetchStep2(user.username, token.access, params)
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

  const token = useTokenState();

  const user = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    if (user && user.username && token) {
      setIsLoading(true);
      await fetchStep3(user.username, token.access, params)
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

  const token = useTokenState();

  const user = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (params, customFunction) => {
    if (user && user.username && token) {
      setIsLoading(true);
      await fetchStep4(user.username, token.access, params)
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

  const token = useTokenState();

  const user = useUserState();
  const setUser = useUserSetState();
  const saveUser = (value) =>
    window.localStorage.setItem("userInfo", JSON.stringify(value));

  const fetch = async (customFunction) => {
    if (user && user.username && token) {
      setIsLoading(true);
      await fetchStep5(user.username, token.access)
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

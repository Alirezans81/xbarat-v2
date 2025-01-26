import { useCheckTokenExpired } from "../../../hooks/useAuth";
import { useTokenState } from "../../../Providers/TokenProvider";
import {
  forgetPasswordCheck,
  forgetPasswordSendEmail,
  forgetPasswordSet,
} from "./apis";
import { useState } from "react";

const useForgetPasswordSendEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = async (params, customFunction) => {
    setIsLoading(true);
    await forgetPasswordSendEmail(params)
      .then((data) => {
        process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
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

  return { forgetPasswordSendEmail: fetch, error, isLoading };
};

const useForgetPasswordCheck = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (params, customFunction, customFunctionWithData) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await forgetPasswordCheck(params, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          customFunction && customFunction();
          customFunctionWithData && customFunctionWithData(data.data);
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

  return { forgetPasswordCheck: fetch, error, isLoading };
};

const useForgetPasswordSet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (params, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await forgetPasswordSet(params, token.access)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          customFunction && customFunction();
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

  return { forgetPasswordSet: fetch, error, isLoading };
};

export {
  useForgetPasswordSendEmail,
  useForgetPasswordCheck,
  useForgetPasswordSet,
};

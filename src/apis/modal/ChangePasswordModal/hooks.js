import { useCheckTokenExpired } from "../../../hooks/useAuth";
import { useTokenState } from "../../../Providers/TokenProvider";
import { changePassword } from "./apis";
import { useState } from "react";

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();
  const checkTokenExpired = useCheckTokenExpired();

  const fetch = (params, customFunction) => {
    checkTokenExpired(async () => {
      setIsLoading(true);
      await changePassword(params, token)
        .then((data) => {
          process.env.REACT_APP_MODE === "DEVELOPMENT" && console.log(data);
          customFunction();
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

  return { changePassword: fetch, error, isLoading };
};

export { useChangePassword };

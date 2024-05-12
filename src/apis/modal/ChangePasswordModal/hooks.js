import { useTokenState } from "../../../Providers/TokenProvider";
import { changePassword } from "./apis";
import { useState } from "react";

const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const token = useTokenState();

  const fetch = async (params, customFunction) => {
    if (token) {
      setIsLoading(true);
      await changePassword(token, params)
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
    }
  };

  return { changePassword: fetch, error, isLoading };
};

export { useChangePassword };
